import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IIncidente, defaultValue } from 'app/shared/model/incidente.model';

export const ACTION_TYPES = {
  FETCH_INCIDENTE_LIST: 'incidente/FETCH_INCIDENTE_LIST',
  FETCH_INCIDENTE: 'incidente/FETCH_INCIDENTE',
  CREATE_INCIDENTE: 'incidente/CREATE_INCIDENTE',
  UPDATE_INCIDENTE: 'incidente/UPDATE_INCIDENTE',
  DELETE_INCIDENTE: 'incidente/DELETE_INCIDENTE',
  RESET: 'incidente/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IIncidente>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type IncidenteState = Readonly<typeof initialState>;

// Reducer

export default (state: IncidenteState = initialState, action): IncidenteState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_INCIDENTE_LIST):
    case REQUEST(ACTION_TYPES.FETCH_INCIDENTE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_INCIDENTE):
    case REQUEST(ACTION_TYPES.UPDATE_INCIDENTE):
    case REQUEST(ACTION_TYPES.DELETE_INCIDENTE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_INCIDENTE_LIST):
    case FAILURE(ACTION_TYPES.FETCH_INCIDENTE):
    case FAILURE(ACTION_TYPES.CREATE_INCIDENTE):
    case FAILURE(ACTION_TYPES.UPDATE_INCIDENTE):
    case FAILURE(ACTION_TYPES.DELETE_INCIDENTE):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_INCIDENTE_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10)
      };
    case SUCCESS(ACTION_TYPES.FETCH_INCIDENTE):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_INCIDENTE):
    case SUCCESS(ACTION_TYPES.UPDATE_INCIDENTE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_INCIDENTE):
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

const apiUrl = 'api/incidentes';

// Actions

export const getEntities: ICrudGetAllAction<IIncidente> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_INCIDENTE_LIST,
    payload: axios.get<IIncidente>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`)
  };
};

export const getEntity: ICrudGetAction<IIncidente> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_INCIDENTE,
    payload: axios.get<IIncidente>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IIncidente> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_INCIDENTE,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IIncidente> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_INCIDENTE,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IIncidente> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_INCIDENTE,
    payload: axios.delete(requestUrl)
  });
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
