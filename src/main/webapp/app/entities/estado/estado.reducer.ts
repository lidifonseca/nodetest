import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IEstado, defaultValue } from 'app/shared/model/estado.model';

export const ACTION_TYPES = {
  FETCH_ESTADO_LIST: 'estado/FETCH_ESTADO_LIST',
  FETCH_ESTADO: 'estado/FETCH_ESTADO',
  CREATE_ESTADO: 'estado/CREATE_ESTADO',
  UPDATE_ESTADO: 'estado/UPDATE_ESTADO',
  DELETE_ESTADO: 'estado/DELETE_ESTADO',
  RESET: 'estado/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IEstado>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type EstadoState = Readonly<typeof initialState>;

// Reducer

export default (state: EstadoState = initialState, action): EstadoState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_ESTADO_LIST):
    case REQUEST(ACTION_TYPES.FETCH_ESTADO):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_ESTADO):
    case REQUEST(ACTION_TYPES.UPDATE_ESTADO):
    case REQUEST(ACTION_TYPES.DELETE_ESTADO):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_ESTADO_LIST):
    case FAILURE(ACTION_TYPES.FETCH_ESTADO):
    case FAILURE(ACTION_TYPES.CREATE_ESTADO):
    case FAILURE(ACTION_TYPES.UPDATE_ESTADO):
    case FAILURE(ACTION_TYPES.DELETE_ESTADO):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_ESTADO_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10)
      };
    case SUCCESS(ACTION_TYPES.FETCH_ESTADO):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_ESTADO):
    case SUCCESS(ACTION_TYPES.UPDATE_ESTADO):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_ESTADO):
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

const apiUrl = 'api/estados';

// Actions

export const getEntities: ICrudGetAllAction<IEstado> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_ESTADO_LIST,
    payload: axios.get<IEstado>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`)
  };
};

export const getEntity: ICrudGetAction<IEstado> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_ESTADO,
    payload: axios.get<IEstado>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IEstado> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_ESTADO,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IEstado> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_ESTADO,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IEstado> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_ESTADO,
    payload: axios.delete(requestUrl)
  });
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
