/* eslint complexity: ["error", 100] */
import axios from 'axios';
import { ICrudGetAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { IPayload } from 'react-jhipster/src/type/redux-action.type';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IProtocolos, defaultValue } from 'app/shared/model/protocolos.model';

export const ACTION_TYPES = {
  FETCH_PROTOCOLOS_LIST_EXPORT: 'protocolos/FETCH_PROTOCOLOS_LIST_EXPORT',
  FETCH_PROTOCOLOS_LIST: 'protocolos/FETCH_PROTOCOLOS_LIST',
  FETCH_PROTOCOLOS: 'protocolos/FETCH_PROTOCOLOS',
  CREATE_PROTOCOLOS: 'protocolos/CREATE_PROTOCOLOS',
  UPDATE_PROTOCOLOS: 'protocolos/UPDATE_PROTOCOLOS',
  DELETE_PROTOCOLOS: 'protocolos/DELETE_PROTOCOLOS',
  RESET: 'protocolos/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IProtocolos>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type ProtocolosState = Readonly<typeof initialState>;

export interface IProtocolosBaseState {
  baseFilters: any;
  protocolo: any;
}

export interface IProtocolosUpdateState {
  fieldsBase: IProtocolosBaseState;
  isNew: boolean;
}

// Reducer

export default (state: ProtocolosState = initialState, action): ProtocolosState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_PROTOCOLOS_LIST_EXPORT):
    case REQUEST(ACTION_TYPES.FETCH_PROTOCOLOS_LIST):
    case REQUEST(ACTION_TYPES.FETCH_PROTOCOLOS):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_PROTOCOLOS):
    case REQUEST(ACTION_TYPES.UPDATE_PROTOCOLOS):
    case REQUEST(ACTION_TYPES.DELETE_PROTOCOLOS):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_PROTOCOLOS_LIST_EXPORT):
    case FAILURE(ACTION_TYPES.FETCH_PROTOCOLOS_LIST):
    case FAILURE(ACTION_TYPES.FETCH_PROTOCOLOS):
    case FAILURE(ACTION_TYPES.CREATE_PROTOCOLOS):
    case FAILURE(ACTION_TYPES.UPDATE_PROTOCOLOS):
    case FAILURE(ACTION_TYPES.DELETE_PROTOCOLOS):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_PROTOCOLOS_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10)
      };
    case SUCCESS(ACTION_TYPES.FETCH_PROTOCOLOS):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_PROTOCOLOS):
    case SUCCESS(ACTION_TYPES.UPDATE_PROTOCOLOS):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_PROTOCOLOS):
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

const apiUrl = 'api/protocolos';

// Actions

// Actions
export type ICrudGetAllActionProtocolos<T> = (
  protocolo?: any,
  page?: number,
  size?: number,
  sort?: string
) => IPayload<T> | ((dispatch: any) => IPayload<T>);

export const getEntities: ICrudGetAllActionProtocolos<IProtocolos> = (protocolo, page, size, sort) => {
  const protocoloRequest = protocolo ? `protocolo.contains=${protocolo}&` : '';

  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}&` : '?'}`;
  return {
    type: ACTION_TYPES.FETCH_PROTOCOLOS_LIST,
    payload: axios.get<IProtocolos>(`${requestUrl}${protocoloRequest}cacheBuster=${new Date().getTime()}`)
  };
};
export const getEntity: ICrudGetAction<IProtocolos> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_PROTOCOLOS,
    payload: axios.get<IProtocolos>(requestUrl)
  };
};

export const getEntitiesExport: ICrudGetAllActionProtocolos<IProtocolos> = (protocolo, page, size, sort) => {
  const protocoloRequest = protocolo ? `protocolo.contains=${protocolo}&` : '';

  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}&` : '?'}`;
  return {
    type: ACTION_TYPES.FETCH_PROTOCOLOS_LIST,
    payload: axios.get<IProtocolos>(`${requestUrl}${protocoloRequest}cacheBuster=${new Date().getTime()}`)
  };
};

export const createEntity: ICrudPutAction<IProtocolos> = entity => async dispatch => {
  entity = {
    ...entity
  };
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_PROTOCOLOS,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IProtocolos> = entity => async dispatch => {
  entity = { ...entity };
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_PROTOCOLOS,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IProtocolos> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_PROTOCOLOS,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});

export const getProtocolosState = (location): IProtocolosBaseState => {
  const url = new URL(`http://localhost${location.search}`); // using a dummy url for parsing
  const baseFilters = url.searchParams.get('baseFilters') || '';
  const protocolo = url.searchParams.get('protocolo') || '';

  return {
    baseFilters,
    protocolo
  };
};
