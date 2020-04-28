import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IParte, defaultValue } from 'app/shared/model/parte.model';

export const ACTION_TYPES = {
  FETCH_PARTE_LIST: 'parte/FETCH_PARTE_LIST',
  FETCH_PARTE: 'parte/FETCH_PARTE',
  CREATE_PARTE: 'parte/CREATE_PARTE',
  UPDATE_PARTE: 'parte/UPDATE_PARTE',
  DELETE_PARTE: 'parte/DELETE_PARTE',
  SET_BLOB: 'parte/SET_BLOB',
  RESET: 'parte/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IParte>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type ParteState = Readonly<typeof initialState>;

// Reducer

export default (state: ParteState = initialState, action): ParteState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_PARTE_LIST):
    case REQUEST(ACTION_TYPES.FETCH_PARTE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_PARTE):
    case REQUEST(ACTION_TYPES.UPDATE_PARTE):
    case REQUEST(ACTION_TYPES.DELETE_PARTE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_PARTE_LIST):
    case FAILURE(ACTION_TYPES.FETCH_PARTE):
    case FAILURE(ACTION_TYPES.CREATE_PARTE):
    case FAILURE(ACTION_TYPES.UPDATE_PARTE):
    case FAILURE(ACTION_TYPES.DELETE_PARTE):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_PARTE_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10)
      };
    case SUCCESS(ACTION_TYPES.FETCH_PARTE):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_PARTE):
    case SUCCESS(ACTION_TYPES.UPDATE_PARTE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_PARTE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {}
      };
    case ACTION_TYPES.SET_BLOB: {
      const { name, data, contentType } = action.payload;
      return {
        ...state,
        entity: {
          ...state.entity,
          [name]: data,
          [name + 'ContentType']: contentType
        }
      };
    }
    case ACTION_TYPES.RESET:
      return {
        ...initialState
      };
    default:
      return state;
  }
};

const apiUrl = 'api/partes';

// Actions

export const getEntities: ICrudGetAllAction<IParte> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_PARTE_LIST,
    payload: axios.get<IParte>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`)
  };
};

export const getEntity: ICrudGetAction<IParte> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_PARTE,
    payload: axios.get<IParte>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IParte> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_PARTE,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IParte> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_PARTE,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IParte> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_PARTE,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const setBlob = (name, data, contentType?) => ({
  type: ACTION_TYPES.SET_BLOB,
  payload: {
    name,
    data,
    contentType
  }
});

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
