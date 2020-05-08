/* eslint complexity: ["error", 100] */
import axios from 'axios';
import { ICrudGetAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { IPayload } from 'react-jhipster/src/type/redux-action.type';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IDiario, defaultValue } from 'app/shared/model/diario.model';

export const ACTION_TYPES = {
  FETCH_DIARIO_LIST_EXPORT: 'diario/FETCH_DIARIO_LIST_EXPORT',
  FETCH_DIARIO_LIST: 'diario/FETCH_DIARIO_LIST',
  FETCH_DIARIO: 'diario/FETCH_DIARIO',
  CREATE_DIARIO: 'diario/CREATE_DIARIO',
  UPDATE_DIARIO: 'diario/UPDATE_DIARIO',
  DELETE_DIARIO: 'diario/DELETE_DIARIO',
  RESET: 'diario/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IDiario>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type DiarioState = Readonly<typeof initialState>;

export interface IDiarioBaseState {
  baseFilters: any;
  historico: any;
  gerarPdf: any;
}

export interface IDiarioUpdateState {
  fieldsBase: IDiarioBaseState;

  isNew: boolean;
}

// Reducer

export default (state: DiarioState = initialState, action): DiarioState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_DIARIO_LIST_EXPORT):
    case REQUEST(ACTION_TYPES.FETCH_DIARIO_LIST):
    case REQUEST(ACTION_TYPES.FETCH_DIARIO):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_DIARIO):
    case REQUEST(ACTION_TYPES.UPDATE_DIARIO):
    case REQUEST(ACTION_TYPES.DELETE_DIARIO):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_DIARIO_LIST_EXPORT):
    case FAILURE(ACTION_TYPES.FETCH_DIARIO_LIST):
    case FAILURE(ACTION_TYPES.FETCH_DIARIO):
    case FAILURE(ACTION_TYPES.CREATE_DIARIO):
    case FAILURE(ACTION_TYPES.UPDATE_DIARIO):
    case FAILURE(ACTION_TYPES.DELETE_DIARIO):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_DIARIO_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10)
      };
    case SUCCESS(ACTION_TYPES.FETCH_DIARIO):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_DIARIO):
    case SUCCESS(ACTION_TYPES.UPDATE_DIARIO):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_DIARIO):
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

const apiUrl = 'api/diarios';

// Actions

// Actions
export type ICrudGetAllActionDiario<T> = (
  historico?: any,
  gerarPdf?: any,
  page?: number,
  size?: number,
  sort?: string
) => IPayload<T> | ((dispatch: any) => IPayload<T>);

export const getEntities: ICrudGetAllActionDiario<IDiario> = (historico, gerarPdf, page, size, sort) => {
  const historicoRequest = historico ? `historico.contains=${historico}&` : '';
  const gerarPdfRequest = gerarPdf ? `gerarPdf.contains=${gerarPdf}&` : '';

  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}&` : '?'}`;
  return {
    type: ACTION_TYPES.FETCH_DIARIO_LIST,
    payload: axios.get<IDiario>(`${requestUrl}${historicoRequest}${gerarPdfRequest}cacheBuster=${new Date().getTime()}`)
  };
};
export const getEntity: ICrudGetAction<IDiario> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_DIARIO,
    payload: axios.get<IDiario>(requestUrl)
  };
};

export const getEntitiesExport: ICrudGetAllActionDiario<IDiario> = (historico, gerarPdf, page, size, sort) => {
  const historicoRequest = historico ? `historico.contains=${historico}&` : '';
  const gerarPdfRequest = gerarPdf ? `gerarPdf.contains=${gerarPdf}&` : '';

  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}&` : '?'}`;
  return {
    type: ACTION_TYPES.FETCH_DIARIO_LIST,
    payload: axios.get<IDiario>(`${requestUrl}${historicoRequest}${gerarPdfRequest}cacheBuster=${new Date().getTime()}`)
  };
};

export const createEntity: ICrudPutAction<IDiario> = entity => async dispatch => {
  entity = {
    ...entity
  };
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_DIARIO,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IDiario> = entity => async dispatch => {
  entity = { ...entity };
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_DIARIO,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IDiario> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_DIARIO,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});

export const getDiarioState = (location): IDiarioBaseState => {
  const url = new URL(`http://localhost${location.search}`); // using a dummy url for parsing
  const baseFilters = url.searchParams.get('baseFilters') || '';
  const historico = url.searchParams.get('historico') || '';
  const gerarPdf = url.searchParams.get('gerarPdf') || '';

  return {
    baseFilters,
    historico,
    gerarPdf
  };
};
