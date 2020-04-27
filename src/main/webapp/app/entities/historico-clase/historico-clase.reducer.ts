import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IHistoricoClase, defaultValue } from 'app/shared/model/historico-clase.model';

export const ACTION_TYPES = {
  FETCH_HISTORICOCLASE_LIST: 'historicoClase/FETCH_HISTORICOCLASE_LIST',
  FETCH_HISTORICOCLASE: 'historicoClase/FETCH_HISTORICOCLASE',
  CREATE_HISTORICOCLASE: 'historicoClase/CREATE_HISTORICOCLASE',
  UPDATE_HISTORICOCLASE: 'historicoClase/UPDATE_HISTORICOCLASE',
  DELETE_HISTORICOCLASE: 'historicoClase/DELETE_HISTORICOCLASE',
  RESET: 'historicoClase/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IHistoricoClase>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type HistoricoClaseState = Readonly<typeof initialState>;

// Reducer

export default (state: HistoricoClaseState = initialState, action): HistoricoClaseState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_HISTORICOCLASE_LIST):
    case REQUEST(ACTION_TYPES.FETCH_HISTORICOCLASE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_HISTORICOCLASE):
    case REQUEST(ACTION_TYPES.UPDATE_HISTORICOCLASE):
    case REQUEST(ACTION_TYPES.DELETE_HISTORICOCLASE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_HISTORICOCLASE_LIST):
    case FAILURE(ACTION_TYPES.FETCH_HISTORICOCLASE):
    case FAILURE(ACTION_TYPES.CREATE_HISTORICOCLASE):
    case FAILURE(ACTION_TYPES.UPDATE_HISTORICOCLASE):
    case FAILURE(ACTION_TYPES.DELETE_HISTORICOCLASE):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_HISTORICOCLASE_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10)
      };
    case SUCCESS(ACTION_TYPES.FETCH_HISTORICOCLASE):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_HISTORICOCLASE):
    case SUCCESS(ACTION_TYPES.UPDATE_HISTORICOCLASE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_HISTORICOCLASE):
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

const apiUrl = 'api/historico-clases';

// Actions

export const getEntities: ICrudGetAllAction<IHistoricoClase> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_HISTORICOCLASE_LIST,
    payload: axios.get<IHistoricoClase>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`)
  };
};

export const getEntity: ICrudGetAction<IHistoricoClase> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_HISTORICOCLASE,
    payload: axios.get<IHistoricoClase>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IHistoricoClase> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_HISTORICOCLASE,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IHistoricoClase> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_HISTORICOCLASE,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IHistoricoClase> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_HISTORICOCLASE,
    payload: axios.delete(requestUrl)
  });
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
