/* eslint complexity: ["error", 100] */
import axios from 'axios';
import { ICrudGetAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { IPayload } from 'react-jhipster/src/type/redux-action.type';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IAlertasResultadosEsperados, defaultValue } from 'app/shared/model/alertas-resultados-esperados.model';

export const ACTION_TYPES = {
  FETCH_ALERTASRESULTADOSESPERADOS_LIST_EXPORT: 'alertasResultadosEsperados/FETCH_ALERTASRESULTADOSESPERADOS_LIST_EXPORT',
  FETCH_ALERTASRESULTADOSESPERADOS_LIST: 'alertasResultadosEsperados/FETCH_ALERTASRESULTADOSESPERADOS_LIST',
  FETCH_ALERTASRESULTADOSESPERADOS: 'alertasResultadosEsperados/FETCH_ALERTASRESULTADOSESPERADOS',
  CREATE_ALERTASRESULTADOSESPERADOS: 'alertasResultadosEsperados/CREATE_ALERTASRESULTADOSESPERADOS',
  UPDATE_ALERTASRESULTADOSESPERADOS: 'alertasResultadosEsperados/UPDATE_ALERTASRESULTADOSESPERADOS',
  DELETE_ALERTASRESULTADOSESPERADOS: 'alertasResultadosEsperados/DELETE_ALERTASRESULTADOSESPERADOS',
  RESET: 'alertasResultadosEsperados/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IAlertasResultadosEsperados>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type AlertasResultadosEsperadosState = Readonly<typeof initialState>;

export interface IAlertasResultadosEsperadosBaseState {
  baseFilters: any;
  pontuacao: any;
  alteracaoEsperada: any;
  observacoes: any;
  usuarioId: any;
  valor: any;
}

export interface IAlertasResultadosEsperadosUpdateState {
  fieldsBase: IAlertasResultadosEsperadosBaseState;
  isNew: boolean;
}

// Reducer

export default (state: AlertasResultadosEsperadosState = initialState, action): AlertasResultadosEsperadosState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_ALERTASRESULTADOSESPERADOS_LIST_EXPORT):
    case REQUEST(ACTION_TYPES.FETCH_ALERTASRESULTADOSESPERADOS_LIST):
    case REQUEST(ACTION_TYPES.FETCH_ALERTASRESULTADOSESPERADOS):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_ALERTASRESULTADOSESPERADOS):
    case REQUEST(ACTION_TYPES.UPDATE_ALERTASRESULTADOSESPERADOS):
    case REQUEST(ACTION_TYPES.DELETE_ALERTASRESULTADOSESPERADOS):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_ALERTASRESULTADOSESPERADOS_LIST_EXPORT):
    case FAILURE(ACTION_TYPES.FETCH_ALERTASRESULTADOSESPERADOS_LIST):
    case FAILURE(ACTION_TYPES.FETCH_ALERTASRESULTADOSESPERADOS):
    case FAILURE(ACTION_TYPES.CREATE_ALERTASRESULTADOSESPERADOS):
    case FAILURE(ACTION_TYPES.UPDATE_ALERTASRESULTADOSESPERADOS):
    case FAILURE(ACTION_TYPES.DELETE_ALERTASRESULTADOSESPERADOS):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_ALERTASRESULTADOSESPERADOS_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10)
      };
    case SUCCESS(ACTION_TYPES.FETCH_ALERTASRESULTADOSESPERADOS):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_ALERTASRESULTADOSESPERADOS):
    case SUCCESS(ACTION_TYPES.UPDATE_ALERTASRESULTADOSESPERADOS):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_ALERTASRESULTADOSESPERADOS):
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

const apiUrl = 'api/alertas-resultados-esperados';

// Actions

// Actions
export type ICrudGetAllActionAlertasResultadosEsperados<T> = (
  pontuacao?: any,
  alteracaoEsperada?: any,
  observacoes?: any,
  usuarioId?: any,
  valor?: any,
  page?: number,
  size?: number,
  sort?: string
) => IPayload<T> | ((dispatch: any) => IPayload<T>);

export const getEntities: ICrudGetAllActionAlertasResultadosEsperados<IAlertasResultadosEsperados> = (
  pontuacao,
  alteracaoEsperada,
  observacoes,
  usuarioId,
  valor,
  page,
  size,
  sort
) => {
  const pontuacaoRequest = pontuacao ? `pontuacao.contains=${pontuacao}&` : '';
  const alteracaoEsperadaRequest = alteracaoEsperada ? `alteracaoEsperada.contains=${alteracaoEsperada}&` : '';
  const observacoesRequest = observacoes ? `observacoes.contains=${observacoes}&` : '';
  const usuarioIdRequest = usuarioId ? `usuarioId.contains=${usuarioId}&` : '';
  const valorRequest = valor ? `valor.contains=${valor}&` : '';

  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}&` : '?'}`;
  return {
    type: ACTION_TYPES.FETCH_ALERTASRESULTADOSESPERADOS_LIST,
    payload: axios.get<IAlertasResultadosEsperados>(
      `${requestUrl}${pontuacaoRequest}${alteracaoEsperadaRequest}${observacoesRequest}${usuarioIdRequest}${valorRequest}cacheBuster=${new Date().getTime()}`
    )
  };
};
export const getEntity: ICrudGetAction<IAlertasResultadosEsperados> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_ALERTASRESULTADOSESPERADOS,
    payload: axios.get<IAlertasResultadosEsperados>(requestUrl)
  };
};

export const getEntitiesExport: ICrudGetAllActionAlertasResultadosEsperados<IAlertasResultadosEsperados> = (
  pontuacao,
  alteracaoEsperada,
  observacoes,
  usuarioId,
  valor,
  page,
  size,
  sort
) => {
  const pontuacaoRequest = pontuacao ? `pontuacao.contains=${pontuacao}&` : '';
  const alteracaoEsperadaRequest = alteracaoEsperada ? `alteracaoEsperada.contains=${alteracaoEsperada}&` : '';
  const observacoesRequest = observacoes ? `observacoes.contains=${observacoes}&` : '';
  const usuarioIdRequest = usuarioId ? `usuarioId.contains=${usuarioId}&` : '';
  const valorRequest = valor ? `valor.contains=${valor}&` : '';

  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}&` : '?'}`;
  return {
    type: ACTION_TYPES.FETCH_ALERTASRESULTADOSESPERADOS_LIST,
    payload: axios.get<IAlertasResultadosEsperados>(
      `${requestUrl}${pontuacaoRequest}${alteracaoEsperadaRequest}${observacoesRequest}${usuarioIdRequest}${valorRequest}cacheBuster=${new Date().getTime()}`
    )
  };
};

export const createEntity: ICrudPutAction<IAlertasResultadosEsperados> = entity => async dispatch => {
  entity = {
    ...entity
  };
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_ALERTASRESULTADOSESPERADOS,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IAlertasResultadosEsperados> = entity => async dispatch => {
  entity = { ...entity };
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_ALERTASRESULTADOSESPERADOS,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IAlertasResultadosEsperados> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_ALERTASRESULTADOSESPERADOS,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});

export const getAlertasResultadosEsperadosState = (location): IAlertasResultadosEsperadosBaseState => {
  const url = new URL(`http://localhost${location.search}`); // using a dummy url for parsing
  const baseFilters = url.searchParams.get('baseFilters') || '';
  const pontuacao = url.searchParams.get('pontuacao') || '';
  const alteracaoEsperada = url.searchParams.get('alteracaoEsperada') || '';
  const observacoes = url.searchParams.get('observacoes') || '';
  const usuarioId = url.searchParams.get('usuarioId') || '';
  const valor = url.searchParams.get('valor') || '';

  return {
    baseFilters,
    pontuacao,
    alteracaoEsperada,
    observacoes,
    usuarioId,
    valor
  };
};
