/* eslint complexity: ["error", 100] */
import axios from 'axios';
import { ICrudGetAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { IPayload } from 'react-jhipster/src/type/redux-action.type';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IPushnotificationEnvios, defaultValue } from 'app/shared/model/pushnotification-envios.model';

export const ACTION_TYPES = {
  FETCH_PUSHNOTIFICATIONENVIOS_LIST_EXPORT: 'pushnotificationEnvios/FETCH_PUSHNOTIFICATIONENVIOS_LIST_EXPORT',
  FETCH_PUSHNOTIFICATIONENVIOS_LIST: 'pushnotificationEnvios/FETCH_PUSHNOTIFICATIONENVIOS_LIST',
  FETCH_PUSHNOTIFICATIONENVIOS: 'pushnotificationEnvios/FETCH_PUSHNOTIFICATIONENVIOS',
  CREATE_PUSHNOTIFICATIONENVIOS: 'pushnotificationEnvios/CREATE_PUSHNOTIFICATIONENVIOS',
  UPDATE_PUSHNOTIFICATIONENVIOS: 'pushnotificationEnvios/UPDATE_PUSHNOTIFICATIONENVIOS',
  DELETE_PUSHNOTIFICATIONENVIOS: 'pushnotificationEnvios/DELETE_PUSHNOTIFICATIONENVIOS',
  RESET: 'pushnotificationEnvios/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IPushnotificationEnvios>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type PushnotificationEnviosState = Readonly<typeof initialState>;

export interface IPushnotificationEnviosBaseState {
  baseFilters: any;
  referencia: any;
  ultimoEnvio: any;
}

export interface IPushnotificationEnviosUpdateState {
  fieldsBase: IPushnotificationEnviosBaseState;
  isNew: boolean;
}

// Reducer

export default (state: PushnotificationEnviosState = initialState, action): PushnotificationEnviosState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_PUSHNOTIFICATIONENVIOS_LIST_EXPORT):
    case REQUEST(ACTION_TYPES.FETCH_PUSHNOTIFICATIONENVIOS_LIST):
    case REQUEST(ACTION_TYPES.FETCH_PUSHNOTIFICATIONENVIOS):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_PUSHNOTIFICATIONENVIOS):
    case REQUEST(ACTION_TYPES.UPDATE_PUSHNOTIFICATIONENVIOS):
    case REQUEST(ACTION_TYPES.DELETE_PUSHNOTIFICATIONENVIOS):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_PUSHNOTIFICATIONENVIOS_LIST_EXPORT):
    case FAILURE(ACTION_TYPES.FETCH_PUSHNOTIFICATIONENVIOS_LIST):
    case FAILURE(ACTION_TYPES.FETCH_PUSHNOTIFICATIONENVIOS):
    case FAILURE(ACTION_TYPES.CREATE_PUSHNOTIFICATIONENVIOS):
    case FAILURE(ACTION_TYPES.UPDATE_PUSHNOTIFICATIONENVIOS):
    case FAILURE(ACTION_TYPES.DELETE_PUSHNOTIFICATIONENVIOS):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_PUSHNOTIFICATIONENVIOS_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10)
      };
    case SUCCESS(ACTION_TYPES.FETCH_PUSHNOTIFICATIONENVIOS):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_PUSHNOTIFICATIONENVIOS):
    case SUCCESS(ACTION_TYPES.UPDATE_PUSHNOTIFICATIONENVIOS):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_PUSHNOTIFICATIONENVIOS):
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

const apiUrl = 'api/pushnotification-envios';

// Actions

// Actions
export type ICrudGetAllActionPushnotificationEnvios<T> = (
  referencia?: any,
  ultimoEnvio?: any,
  page?: number,
  size?: number,
  sort?: string
) => IPayload<T> | ((dispatch: any) => IPayload<T>);

export const getEntities: ICrudGetAllActionPushnotificationEnvios<IPushnotificationEnvios> = (
  referencia,
  ultimoEnvio,
  page,
  size,
  sort
) => {
  const referenciaRequest = referencia ? `referencia.contains=${referencia}&` : '';
  const ultimoEnvioRequest = ultimoEnvio ? `ultimoEnvio.contains=${ultimoEnvio}&` : '';

  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}&` : '?'}`;
  return {
    type: ACTION_TYPES.FETCH_PUSHNOTIFICATIONENVIOS_LIST,
    payload: axios.get<IPushnotificationEnvios>(`${requestUrl}${referenciaRequest}${ultimoEnvioRequest}cacheBuster=${new Date().getTime()}`)
  };
};
export const getEntity: ICrudGetAction<IPushnotificationEnvios> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_PUSHNOTIFICATIONENVIOS,
    payload: axios.get<IPushnotificationEnvios>(requestUrl)
  };
};

export const getEntitiesExport: ICrudGetAllActionPushnotificationEnvios<IPushnotificationEnvios> = (
  referencia,
  ultimoEnvio,
  page,
  size,
  sort
) => {
  const referenciaRequest = referencia ? `referencia.contains=${referencia}&` : '';
  const ultimoEnvioRequest = ultimoEnvio ? `ultimoEnvio.contains=${ultimoEnvio}&` : '';

  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}&` : '?'}`;
  return {
    type: ACTION_TYPES.FETCH_PUSHNOTIFICATIONENVIOS_LIST,
    payload: axios.get<IPushnotificationEnvios>(`${requestUrl}${referenciaRequest}${ultimoEnvioRequest}cacheBuster=${new Date().getTime()}`)
  };
};

export const createEntity: ICrudPutAction<IPushnotificationEnvios> = entity => async dispatch => {
  entity = {
    ...entity
  };
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_PUSHNOTIFICATIONENVIOS,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IPushnotificationEnvios> = entity => async dispatch => {
  entity = { ...entity };
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_PUSHNOTIFICATIONENVIOS,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IPushnotificationEnvios> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_PUSHNOTIFICATIONENVIOS,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});

export const getPushnotificationEnviosState = (location): IPushnotificationEnviosBaseState => {
  const url = new URL(`http://localhost${location.search}`); // using a dummy url for parsing
  const baseFilters = url.searchParams.get('baseFilters') || '';
  const referencia = url.searchParams.get('referencia') || '';
  const ultimoEnvio = url.searchParams.get('ultimoEnvio') || '';

  return {
    baseFilters,
    referencia,
    ultimoEnvio
  };
};
