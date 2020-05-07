/* eslint complexity: ["error", 100] */
import axios from 'axios';
import { ICrudGetAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { IPayload } from 'react-jhipster/src/type/redux-action.type';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IJulho, defaultValue } from 'app/shared/model/julho.model';

export const ACTION_TYPES = {
  FETCH_JULHO_LIST_EXPORT: 'julho/FETCH_JULHO_LIST_EXPORT',
  FETCH_JULHO_LIST: 'julho/FETCH_JULHO_LIST',
  FETCH_JULHO: 'julho/FETCH_JULHO',
  CREATE_JULHO: 'julho/CREATE_JULHO',
  UPDATE_JULHO: 'julho/UPDATE_JULHO',
  DELETE_JULHO: 'julho/DELETE_JULHO',
  RESET: 'julho/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IJulho>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type JulhoState = Readonly<typeof initialState>;

export interface IJulhoBaseState {
  baseFilters: any;
  dataInicio: any;
  dataFim: any;
  especialidade: any;
  periodicidade: any;
  periodo: any;
  qtd: any;
}

export interface IJulhoUpdateState {
  fieldsBase: IJulhoBaseState;
  isNew: boolean;
}

// Reducer

export default (state: JulhoState = initialState, action): JulhoState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_JULHO_LIST_EXPORT):
    case REQUEST(ACTION_TYPES.FETCH_JULHO_LIST):
    case REQUEST(ACTION_TYPES.FETCH_JULHO):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_JULHO):
    case REQUEST(ACTION_TYPES.UPDATE_JULHO):
    case REQUEST(ACTION_TYPES.DELETE_JULHO):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_JULHO_LIST_EXPORT):
    case FAILURE(ACTION_TYPES.FETCH_JULHO_LIST):
    case FAILURE(ACTION_TYPES.FETCH_JULHO):
    case FAILURE(ACTION_TYPES.CREATE_JULHO):
    case FAILURE(ACTION_TYPES.UPDATE_JULHO):
    case FAILURE(ACTION_TYPES.DELETE_JULHO):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_JULHO_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10)
      };
    case SUCCESS(ACTION_TYPES.FETCH_JULHO):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_JULHO):
    case SUCCESS(ACTION_TYPES.UPDATE_JULHO):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_JULHO):
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

const apiUrl = 'api/julhos';

// Actions

// Actions
export type ICrudGetAllActionJulho<T> = (
  dataInicio?: any,
  dataFim?: any,
  especialidade?: any,
  periodicidade?: any,
  periodo?: any,
  qtd?: any,
  page?: number,
  size?: number,
  sort?: string
) => IPayload<T> | ((dispatch: any) => IPayload<T>);

export const getEntities: ICrudGetAllActionJulho<IJulho> = (
  dataInicio,
  dataFim,
  especialidade,
  periodicidade,
  periodo,
  qtd,
  page,
  size,
  sort
) => {
  const dataInicioRequest = dataInicio ? `dataInicio.contains=${dataInicio}&` : '';
  const dataFimRequest = dataFim ? `dataFim.contains=${dataFim}&` : '';
  const especialidadeRequest = especialidade ? `especialidade.contains=${especialidade}&` : '';
  const periodicidadeRequest = periodicidade ? `periodicidade.contains=${periodicidade}&` : '';
  const periodoRequest = periodo ? `periodo.contains=${periodo}&` : '';
  const qtdRequest = qtd ? `qtd.contains=${qtd}&` : '';

  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}&` : '?'}`;
  return {
    type: ACTION_TYPES.FETCH_JULHO_LIST,
    payload: axios.get<IJulho>(
      `${requestUrl}${dataInicioRequest}${dataFimRequest}${especialidadeRequest}${periodicidadeRequest}${periodoRequest}${qtdRequest}cacheBuster=${new Date().getTime()}`
    )
  };
};
export const getEntity: ICrudGetAction<IJulho> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_JULHO,
    payload: axios.get<IJulho>(requestUrl)
  };
};

export const getEntitiesExport: ICrudGetAllActionJulho<IJulho> = (
  dataInicio,
  dataFim,
  especialidade,
  periodicidade,
  periodo,
  qtd,
  page,
  size,
  sort
) => {
  const dataInicioRequest = dataInicio ? `dataInicio.contains=${dataInicio}&` : '';
  const dataFimRequest = dataFim ? `dataFim.contains=${dataFim}&` : '';
  const especialidadeRequest = especialidade ? `especialidade.contains=${especialidade}&` : '';
  const periodicidadeRequest = periodicidade ? `periodicidade.contains=${periodicidade}&` : '';
  const periodoRequest = periodo ? `periodo.contains=${periodo}&` : '';
  const qtdRequest = qtd ? `qtd.contains=${qtd}&` : '';

  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}&` : '?'}`;
  return {
    type: ACTION_TYPES.FETCH_JULHO_LIST,
    payload: axios.get<IJulho>(
      `${requestUrl}${dataInicioRequest}${dataFimRequest}${especialidadeRequest}${periodicidadeRequest}${periodoRequest}${qtdRequest}cacheBuster=${new Date().getTime()}`
    )
  };
};

export const createEntity: ICrudPutAction<IJulho> = entity => async dispatch => {
  entity = {
    ...entity
  };
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_JULHO,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IJulho> = entity => async dispatch => {
  entity = { ...entity };
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_JULHO,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IJulho> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_JULHO,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});

export const getJulhoState = (location): IJulhoBaseState => {
  const url = new URL(`http://localhost${location.search}`); // using a dummy url for parsing
  const baseFilters = url.searchParams.get('baseFilters') || '';
  const dataInicio = url.searchParams.get('dataInicio') || '';
  const dataFim = url.searchParams.get('dataFim') || '';
  const especialidade = url.searchParams.get('especialidade') || '';
  const periodicidade = url.searchParams.get('periodicidade') || '';
  const periodo = url.searchParams.get('periodo') || '';
  const qtd = url.searchParams.get('qtd') || '';

  return {
    baseFilters,
    dataInicio,
    dataFim,
    especialidade,
    periodicidade,
    periodo,
    qtd
  };
};
