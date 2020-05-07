/* eslint complexity: ["error", 100] */
import axios from 'axios';
import { ICrudGetAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { IPayload } from 'react-jhipster/src/type/redux-action.type';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IResultados, defaultValue } from 'app/shared/model/resultados.model';

export const ACTION_TYPES = {
  FETCH_RESULTADOS_LIST_EXPORT: 'resultados/FETCH_RESULTADOS_LIST_EXPORT',
  FETCH_RESULTADOS_LIST: 'resultados/FETCH_RESULTADOS_LIST',
  FETCH_RESULTADOS: 'resultados/FETCH_RESULTADOS',
  CREATE_RESULTADOS: 'resultados/CREATE_RESULTADOS',
  UPDATE_RESULTADOS: 'resultados/UPDATE_RESULTADOS',
  DELETE_RESULTADOS: 'resultados/DELETE_RESULTADOS',
  RESET: 'resultados/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IResultados>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type ResultadosState = Readonly<typeof initialState>;

export interface IResultadosBaseState {
  baseFilters: any;
  objetivo: any;
  valor: any;
  prazo: any;
  complemento: any;
  dataCadastro: any;
  dataVencimentoPrazo: any;
}

export interface IResultadosUpdateState {
  fieldsBase: IResultadosBaseState;
  isNew: boolean;
}

// Reducer

export default (state: ResultadosState = initialState, action): ResultadosState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_RESULTADOS_LIST_EXPORT):
    case REQUEST(ACTION_TYPES.FETCH_RESULTADOS_LIST):
    case REQUEST(ACTION_TYPES.FETCH_RESULTADOS):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_RESULTADOS):
    case REQUEST(ACTION_TYPES.UPDATE_RESULTADOS):
    case REQUEST(ACTION_TYPES.DELETE_RESULTADOS):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_RESULTADOS_LIST_EXPORT):
    case FAILURE(ACTION_TYPES.FETCH_RESULTADOS_LIST):
    case FAILURE(ACTION_TYPES.FETCH_RESULTADOS):
    case FAILURE(ACTION_TYPES.CREATE_RESULTADOS):
    case FAILURE(ACTION_TYPES.UPDATE_RESULTADOS):
    case FAILURE(ACTION_TYPES.DELETE_RESULTADOS):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_RESULTADOS_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10)
      };
    case SUCCESS(ACTION_TYPES.FETCH_RESULTADOS):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_RESULTADOS):
    case SUCCESS(ACTION_TYPES.UPDATE_RESULTADOS):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_RESULTADOS):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {}
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState
      };
    default:
      return state;
  }
};

const apiUrl = 'api/resultados';

// Actions

// Actions
export type ICrudGetAllActionResultados<T> = (
  objetivo?: any,
  valor?: any,
  prazo?: any,
  complemento?: any,
  dataCadastro?: any,
  dataVencimentoPrazo?: any,
  page?: number,
  size?: number,
  sort?: string
) => IPayload<T> | ((dispatch: any) => IPayload<T>);

export const getEntities: ICrudGetAllActionResultados<IResultados> = (
  objetivo,
  valor,
  prazo,
  complemento,
  dataCadastro,
  dataVencimentoPrazo,
  page,
  size,
  sort
) => {
  const objetivoRequest = objetivo ? `objetivo.contains=${objetivo}&` : '';
  const valorRequest = valor ? `valor.contains=${valor}&` : '';
  const prazoRequest = prazo ? `prazo.contains=${prazo}&` : '';
  const complementoRequest = complemento ? `complemento.contains=${complemento}&` : '';
  const dataCadastroRequest = dataCadastro ? `dataCadastro.contains=${dataCadastro}&` : '';
  const dataVencimentoPrazoRequest = dataVencimentoPrazo ? `dataVencimentoPrazo.equals=${dataVencimentoPrazo}&` : '';

  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}&` : '?'}`;
  return {
    type: ACTION_TYPES.FETCH_RESULTADOS_LIST,
    payload: axios.get<IResultados>(
      `${requestUrl}${objetivoRequest}${valorRequest}${prazoRequest}${complementoRequest}${dataCadastroRequest}${dataVencimentoPrazoRequest}cacheBuster=${new Date().getTime()}`
    )
  };
};
export const getEntity: ICrudGetAction<IResultados> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_RESULTADOS,
    payload: axios.get<IResultados>(requestUrl)
  };
};

export const getEntitiesExport: ICrudGetAllActionResultados<IResultados> = (
  objetivo,
  valor,
  prazo,
  complemento,
  dataCadastro,
  dataVencimentoPrazo,
  page,
  size,
  sort
) => {
  const objetivoRequest = objetivo ? `objetivo.contains=${objetivo}&` : '';
  const valorRequest = valor ? `valor.contains=${valor}&` : '';
  const prazoRequest = prazo ? `prazo.contains=${prazo}&` : '';
  const complementoRequest = complemento ? `complemento.contains=${complemento}&` : '';
  const dataCadastroRequest = dataCadastro ? `dataCadastro.contains=${dataCadastro}&` : '';
  const dataVencimentoPrazoRequest = dataVencimentoPrazo ? `dataVencimentoPrazo.equals=${dataVencimentoPrazo}&` : '';

  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}&` : '?'}`;
  return {
    type: ACTION_TYPES.FETCH_RESULTADOS_LIST,
    payload: axios.get<IResultados>(
      `${requestUrl}${objetivoRequest}${valorRequest}${prazoRequest}${complementoRequest}${dataCadastroRequest}${dataVencimentoPrazoRequest}cacheBuster=${new Date().getTime()}`
    )
  };
};

export const createEntity: ICrudPutAction<IResultados> = entity => async dispatch => {
  entity = {
    ...entity
  };
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_RESULTADOS,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IResultados> = entity => async dispatch => {
  entity = { ...entity };
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_RESULTADOS,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IResultados> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_RESULTADOS,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});

export const getResultadosState = (location): IResultadosBaseState => {
  const url = new URL(`http://localhost${location.search}`); // using a dummy url for parsing
  const baseFilters = url.searchParams.get('baseFilters') || '';
  const objetivo = url.searchParams.get('objetivo') || '';
  const valor = url.searchParams.get('valor') || '';
  const prazo = url.searchParams.get('prazo') || '';
  const complemento = url.searchParams.get('complemento') || '';
  const dataCadastro = url.searchParams.get('dataCadastro') || '';
  const dataVencimentoPrazo = url.searchParams.get('dataVencimentoPrazo') || '';

  return {
    baseFilters,
    objetivo,
    valor,
    prazo,
    complemento,
    dataCadastro,
    dataVencimentoPrazo
  };
};
