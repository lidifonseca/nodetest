import axios from 'axios';
import { ICrudGetAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { IPayload } from 'react-jhipster/src/type/redux-action.type';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IApenso, defaultValue } from 'app/shared/model/apenso.model';

export const ACTION_TYPES = {
  FETCH_APENSO_LIST: 'apenso/FETCH_APENSO_LIST',
  FETCH_APENSO: 'apenso/FETCH_APENSO',
  CREATE_APENSO: 'apenso/CREATE_APENSO',
  UPDATE_APENSO: 'apenso/UPDATE_APENSO',
  DELETE_APENSO: 'apenso/DELETE_APENSO',
  RESET: 'apenso/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IApenso>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type ApensoState = Readonly<typeof initialState>;

// Reducer

export default (state: ApensoState = initialState, action): ApensoState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_APENSO_LIST):
    case REQUEST(ACTION_TYPES.FETCH_APENSO):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_APENSO):
    case REQUEST(ACTION_TYPES.UPDATE_APENSO):
    case REQUEST(ACTION_TYPES.DELETE_APENSO):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_APENSO_LIST):
    case FAILURE(ACTION_TYPES.FETCH_APENSO):
    case FAILURE(ACTION_TYPES.CREATE_APENSO):
    case FAILURE(ACTION_TYPES.UPDATE_APENSO):
    case FAILURE(ACTION_TYPES.DELETE_APENSO):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_APENSO_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10)
      };
    case SUCCESS(ACTION_TYPES.FETCH_APENSO):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_APENSO):
    case SUCCESS(ACTION_TYPES.UPDATE_APENSO):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_APENSO):
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

const apiUrl = 'api/apensos';

// Actions

// Actions
export type ICrudGetAllActionApenso<T> = (
  numero?: any,
  clase?: any,
  apensamento?: any,
  motivo?: any,
  processo?: any,
  page?: Number,
  size?: Number,
  sort?: String
) => IPayload<T> | ((dispatch: any) => IPayload<T>);

export const getEntities: ICrudGetAllActionApenso<IApenso> = (numero, clase, apensamento, motivo, processo, page, size, sort) => {
  const numeroRequest = numero ? `numero.contains=${numero}&` : '';
  const claseRequest = clase ? `clase.contains=${clase}&` : '';
  const apensamentoRequest = apensamento ? `apensamento.equals=${apensamento}&` : '';
  const motivoRequest = motivo ? `motivo.contains=${motivo}&` : '';
  const processoRequest = processo ? `processoId.equals=${processo}&` : '';

  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}&` : '?'}`;
  return {
    type: ACTION_TYPES.FETCH_APENSO_LIST,
    payload: axios.get<IApenso>(
      `${requestUrl}${numeroRequest}${claseRequest}${apensamentoRequest}${motivoRequest}${processoRequest}cacheBuster=${new Date().getTime()}`
    )
  };
};
export const getEntity: ICrudGetAction<IApenso> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_APENSO,
    payload: axios.get<IApenso>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IApenso> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_APENSO,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IApenso> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_APENSO,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IApenso> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_APENSO,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
