/* eslint complexity: ["error", 100] */
import axios from 'axios';
import { ICrudGetAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { IPayload } from 'react-jhipster/src/type/redux-action.type';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IGeoPanico, defaultValue } from 'app/shared/model/geo-panico.model';

export const ACTION_TYPES = {
  FETCH_GEOPANICO_LIST: 'geoPanico/FETCH_GEOPANICO_LIST',
  FETCH_GEOPANICO: 'geoPanico/FETCH_GEOPANICO',
  CREATE_GEOPANICO: 'geoPanico/CREATE_GEOPANICO',
  UPDATE_GEOPANICO: 'geoPanico/UPDATE_GEOPANICO',
  DELETE_GEOPANICO: 'geoPanico/DELETE_GEOPANICO',
  RESET: 'geoPanico/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IGeoPanico>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type GeoPanicoState = Readonly<typeof initialState>;

// Reducer

export default (state: GeoPanicoState = initialState, action): GeoPanicoState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_GEOPANICO_LIST):
    case REQUEST(ACTION_TYPES.FETCH_GEOPANICO):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_GEOPANICO):
    case REQUEST(ACTION_TYPES.UPDATE_GEOPANICO):
    case REQUEST(ACTION_TYPES.DELETE_GEOPANICO):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_GEOPANICO_LIST):
    case FAILURE(ACTION_TYPES.FETCH_GEOPANICO):
    case FAILURE(ACTION_TYPES.CREATE_GEOPANICO):
    case FAILURE(ACTION_TYPES.UPDATE_GEOPANICO):
    case FAILURE(ACTION_TYPES.DELETE_GEOPANICO):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_GEOPANICO_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10)
      };
    case SUCCESS(ACTION_TYPES.FETCH_GEOPANICO):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_GEOPANICO):
    case SUCCESS(ACTION_TYPES.UPDATE_GEOPANICO):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_GEOPANICO):
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

const apiUrl = 'api/geo-panicos';

// Actions

// Actions
export type ICrudGetAllActionGeoPanico<T> = (
  idPanico?: any,
  idPaciente?: any,
  latitude?: any,
  longitude?: any,
  page?: number,
  size?: number,
  sort?: string
) => IPayload<T> | ((dispatch: any) => IPayload<T>);

export const getEntities: ICrudGetAllActionGeoPanico<IGeoPanico> = (idPanico, idPaciente, latitude, longitude, page, size, sort) => {
  const idPanicoRequest = idPanico ? `idPanico.contains=${idPanico}&` : '';
  const idPacienteRequest = idPaciente ? `idPaciente.contains=${idPaciente}&` : '';
  const latitudeRequest = latitude ? `latitude.contains=${latitude}&` : '';
  const longitudeRequest = longitude ? `longitude.contains=${longitude}&` : '';

  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}&` : '?'}`;
  return {
    type: ACTION_TYPES.FETCH_GEOPANICO_LIST,
    payload: axios.get<IGeoPanico>(
      `${requestUrl}${idPanicoRequest}${idPacienteRequest}${latitudeRequest}${longitudeRequest}cacheBuster=${new Date().getTime()}`
    )
  };
};
export const getEntity: ICrudGetAction<IGeoPanico> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_GEOPANICO,
    payload: axios.get<IGeoPanico>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IGeoPanico> = entity => async dispatch => {
  entity = {
    ...entity
  };
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_GEOPANICO,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IGeoPanico> = entity => async dispatch => {
  entity = { ...entity };
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_GEOPANICO,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IGeoPanico> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_GEOPANICO,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
