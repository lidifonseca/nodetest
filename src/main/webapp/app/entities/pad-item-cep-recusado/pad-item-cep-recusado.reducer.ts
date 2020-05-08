/* eslint complexity: ["error", 100] */
import axios from 'axios';
import { ICrudGetAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { IPayload } from 'react-jhipster/src/type/redux-action.type';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IPadItemCepRecusado, defaultValue } from 'app/shared/model/pad-item-cep-recusado.model';

export const ACTION_TYPES = {
  FETCH_PADITEMCEPRECUSADO_LIST_EXPORT: 'padItemCepRecusado/FETCH_PADITEMCEPRECUSADO_LIST_EXPORT',
  FETCH_PADITEMCEPRECUSADO_LIST: 'padItemCepRecusado/FETCH_PADITEMCEPRECUSADO_LIST',
  FETCH_PADITEMCEPRECUSADO: 'padItemCepRecusado/FETCH_PADITEMCEPRECUSADO',
  CREATE_PADITEMCEPRECUSADO: 'padItemCepRecusado/CREATE_PADITEMCEPRECUSADO',
  UPDATE_PADITEMCEPRECUSADO: 'padItemCepRecusado/UPDATE_PADITEMCEPRECUSADO',
  DELETE_PADITEMCEPRECUSADO: 'padItemCepRecusado/DELETE_PADITEMCEPRECUSADO',
  RESET: 'padItemCepRecusado/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IPadItemCepRecusado>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type PadItemCepRecusadoState = Readonly<typeof initialState>;

export interface IPadItemCepRecusadoBaseState {
  baseFilters: any;
  cep: any;
}

export interface IPadItemCepRecusadoUpdateState {
  fieldsBase: IPadItemCepRecusadoBaseState;

  isNew: boolean;
}

// Reducer

export default (state: PadItemCepRecusadoState = initialState, action): PadItemCepRecusadoState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_PADITEMCEPRECUSADO_LIST_EXPORT):
    case REQUEST(ACTION_TYPES.FETCH_PADITEMCEPRECUSADO_LIST):
    case REQUEST(ACTION_TYPES.FETCH_PADITEMCEPRECUSADO):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_PADITEMCEPRECUSADO):
    case REQUEST(ACTION_TYPES.UPDATE_PADITEMCEPRECUSADO):
    case REQUEST(ACTION_TYPES.DELETE_PADITEMCEPRECUSADO):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_PADITEMCEPRECUSADO_LIST_EXPORT):
    case FAILURE(ACTION_TYPES.FETCH_PADITEMCEPRECUSADO_LIST):
    case FAILURE(ACTION_TYPES.FETCH_PADITEMCEPRECUSADO):
    case FAILURE(ACTION_TYPES.CREATE_PADITEMCEPRECUSADO):
    case FAILURE(ACTION_TYPES.UPDATE_PADITEMCEPRECUSADO):
    case FAILURE(ACTION_TYPES.DELETE_PADITEMCEPRECUSADO):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_PADITEMCEPRECUSADO_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10)
      };
    case SUCCESS(ACTION_TYPES.FETCH_PADITEMCEPRECUSADO):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_PADITEMCEPRECUSADO):
    case SUCCESS(ACTION_TYPES.UPDATE_PADITEMCEPRECUSADO):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_PADITEMCEPRECUSADO):
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

const apiUrl = 'api/pad-item-cep-recusados';

// Actions

// Actions
export type ICrudGetAllActionPadItemCepRecusado<T> = (
  cep?: any,
  page?: number,
  size?: number,
  sort?: string
) => IPayload<T> | ((dispatch: any) => IPayload<T>);

export const getEntities: ICrudGetAllActionPadItemCepRecusado<IPadItemCepRecusado> = (cep, page, size, sort) => {
  const cepRequest = cep ? `cep.contains=${cep}&` : '';

  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}&` : '?'}`;
  return {
    type: ACTION_TYPES.FETCH_PADITEMCEPRECUSADO_LIST,
    payload: axios.get<IPadItemCepRecusado>(`${requestUrl}${cepRequest}cacheBuster=${new Date().getTime()}`)
  };
};
export const getEntity: ICrudGetAction<IPadItemCepRecusado> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_PADITEMCEPRECUSADO,
    payload: axios.get<IPadItemCepRecusado>(requestUrl)
  };
};

export const getEntitiesExport: ICrudGetAllActionPadItemCepRecusado<IPadItemCepRecusado> = (cep, page, size, sort) => {
  const cepRequest = cep ? `cep.contains=${cep}&` : '';

  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}&` : '?'}`;
  return {
    type: ACTION_TYPES.FETCH_PADITEMCEPRECUSADO_LIST,
    payload: axios.get<IPadItemCepRecusado>(`${requestUrl}${cepRequest}cacheBuster=${new Date().getTime()}`)
  };
};

export const createEntity: ICrudPutAction<IPadItemCepRecusado> = entity => async dispatch => {
  entity = {
    ...entity
  };
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_PADITEMCEPRECUSADO,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IPadItemCepRecusado> = entity => async dispatch => {
  entity = { ...entity };
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_PADITEMCEPRECUSADO,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IPadItemCepRecusado> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_PADITEMCEPRECUSADO,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});

export const getPadItemCepRecusadoState = (location): IPadItemCepRecusadoBaseState => {
  const url = new URL(`http://localhost${location.search}`); // using a dummy url for parsing
  const baseFilters = url.searchParams.get('baseFilters') || '';
  const cep = url.searchParams.get('cep') || '';

  return {
    baseFilters,
    cep
  };
};
