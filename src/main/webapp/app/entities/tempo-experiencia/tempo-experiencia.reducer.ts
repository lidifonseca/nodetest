/* eslint complexity: ["error", 100] */
import axios from 'axios';
import { ICrudGetAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { IPayload } from 'react-jhipster/src/type/redux-action.type';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { ITempoExperiencia, defaultValue } from 'app/shared/model/tempo-experiencia.model';

export const ACTION_TYPES = {
  FETCH_TEMPOEXPERIENCIA_LIST: 'tempoExperiencia/FETCH_TEMPOEXPERIENCIA_LIST',
  FETCH_TEMPOEXPERIENCIA: 'tempoExperiencia/FETCH_TEMPOEXPERIENCIA',
  CREATE_TEMPOEXPERIENCIA: 'tempoExperiencia/CREATE_TEMPOEXPERIENCIA',
  UPDATE_TEMPOEXPERIENCIA: 'tempoExperiencia/UPDATE_TEMPOEXPERIENCIA',
  DELETE_TEMPOEXPERIENCIA: 'tempoExperiencia/DELETE_TEMPOEXPERIENCIA',
  RESET: 'tempoExperiencia/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<ITempoExperiencia>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type TempoExperienciaState = Readonly<typeof initialState>;

// Reducer

export default (state: TempoExperienciaState = initialState, action): TempoExperienciaState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_TEMPOEXPERIENCIA_LIST):
    case REQUEST(ACTION_TYPES.FETCH_TEMPOEXPERIENCIA):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_TEMPOEXPERIENCIA):
    case REQUEST(ACTION_TYPES.UPDATE_TEMPOEXPERIENCIA):
    case REQUEST(ACTION_TYPES.DELETE_TEMPOEXPERIENCIA):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_TEMPOEXPERIENCIA_LIST):
    case FAILURE(ACTION_TYPES.FETCH_TEMPOEXPERIENCIA):
    case FAILURE(ACTION_TYPES.CREATE_TEMPOEXPERIENCIA):
    case FAILURE(ACTION_TYPES.UPDATE_TEMPOEXPERIENCIA):
    case FAILURE(ACTION_TYPES.DELETE_TEMPOEXPERIENCIA):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_TEMPOEXPERIENCIA_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10)
      };
    case SUCCESS(ACTION_TYPES.FETCH_TEMPOEXPERIENCIA):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_TEMPOEXPERIENCIA):
    case SUCCESS(ACTION_TYPES.UPDATE_TEMPOEXPERIENCIA):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_TEMPOEXPERIENCIA):
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

const apiUrl = 'api/tempo-experiencias';

// Actions

// Actions
export type ICrudGetAllActionTempoExperiencia<T> = (
  tempoExperiencia?: any,
  dataPost?: any,
  page?: number,
  size?: number,
  sort?: string
) => IPayload<T> | ((dispatch: any) => IPayload<T>);

export const getEntities: ICrudGetAllActionTempoExperiencia<ITempoExperiencia> = (tempoExperiencia, dataPost, page, size, sort) => {
  const tempoExperienciaRequest = tempoExperiencia ? `tempoExperiencia.contains=${tempoExperiencia}&` : '';
  const dataPostRequest = dataPost ? `dataPost.contains=${dataPost}&` : '';

  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}&` : '?'}`;
  return {
    type: ACTION_TYPES.FETCH_TEMPOEXPERIENCIA_LIST,
    payload: axios.get<ITempoExperiencia>(`${requestUrl}${tempoExperienciaRequest}${dataPostRequest}cacheBuster=${new Date().getTime()}`)
  };
};
export const getEntity: ICrudGetAction<ITempoExperiencia> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_TEMPOEXPERIENCIA,
    payload: axios.get<ITempoExperiencia>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<ITempoExperiencia> = entity => async dispatch => {
  entity = {
    ...entity
  };
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_TEMPOEXPERIENCIA,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<ITempoExperiencia> = entity => async dispatch => {
  entity = { ...entity };
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_TEMPOEXPERIENCIA,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<ITempoExperiencia> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_TEMPOEXPERIENCIA,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
