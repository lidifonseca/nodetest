import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IAudiencia, defaultValue } from 'app/shared/model/audiencia.model';

export const ACTION_TYPES = {
  FETCH_AUDIENCIA_LIST: 'audiencia/FETCH_AUDIENCIA_LIST',
  FETCH_AUDIENCIA: 'audiencia/FETCH_AUDIENCIA',
  CREATE_AUDIENCIA: 'audiencia/CREATE_AUDIENCIA',
  UPDATE_AUDIENCIA: 'audiencia/UPDATE_AUDIENCIA',
  DELETE_AUDIENCIA: 'audiencia/DELETE_AUDIENCIA',
  RESET: 'audiencia/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IAudiencia>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type AudienciaState = Readonly<typeof initialState>;

// Reducer

export default (state: AudienciaState = initialState, action): AudienciaState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_AUDIENCIA_LIST):
    case REQUEST(ACTION_TYPES.FETCH_AUDIENCIA):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_AUDIENCIA):
    case REQUEST(ACTION_TYPES.UPDATE_AUDIENCIA):
    case REQUEST(ACTION_TYPES.DELETE_AUDIENCIA):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_AUDIENCIA_LIST):
    case FAILURE(ACTION_TYPES.FETCH_AUDIENCIA):
    case FAILURE(ACTION_TYPES.CREATE_AUDIENCIA):
    case FAILURE(ACTION_TYPES.UPDATE_AUDIENCIA):
    case FAILURE(ACTION_TYPES.DELETE_AUDIENCIA):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_AUDIENCIA_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10)
      };
    case SUCCESS(ACTION_TYPES.FETCH_AUDIENCIA):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_AUDIENCIA):
    case SUCCESS(ACTION_TYPES.UPDATE_AUDIENCIA):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_AUDIENCIA):
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

const apiUrl = 'api/audiencias';

// Actions

export const getEntities: ICrudGetAllAction<IAudiencia> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_AUDIENCIA_LIST,
    payload: axios.get<IAudiencia>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`)
  };
};

export const getEntity: ICrudGetAction<IAudiencia> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_AUDIENCIA,
    payload: axios.get<IAudiencia>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IAudiencia> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_AUDIENCIA,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IAudiencia> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_AUDIENCIA,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IAudiencia> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_AUDIENCIA,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
