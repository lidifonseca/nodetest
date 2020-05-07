/* eslint complexity: ["error", 100] */
import axios from 'axios';
import { ICrudGetAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { IPayload } from 'react-jhipster/src/type/redux-action.type';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IIndicadores, defaultValue } from 'app/shared/model/indicadores.model';

export const ACTION_TYPES = {
  FETCH_INDICADORES_LIST_EXPORT: 'indicadores/FETCH_INDICADORES_LIST_EXPORT',
  FETCH_INDICADORES_LIST: 'indicadores/FETCH_INDICADORES_LIST',
  FETCH_INDICADORES: 'indicadores/FETCH_INDICADORES',
  CREATE_INDICADORES: 'indicadores/CREATE_INDICADORES',
  UPDATE_INDICADORES: 'indicadores/UPDATE_INDICADORES',
  DELETE_INDICADORES: 'indicadores/DELETE_INDICADORES',
  RESET: 'indicadores/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IIndicadores>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type IndicadoresState = Readonly<typeof initialState>;

export interface IIndicadoresBaseState {
  baseFilters: any;
  titulo: any;
}

export interface IIndicadoresUpdateState {
  fieldsBase: IIndicadoresBaseState;
  isNew: boolean;
}

// Reducer

export default (state: IndicadoresState = initialState, action): IndicadoresState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_INDICADORES_LIST_EXPORT):
    case REQUEST(ACTION_TYPES.FETCH_INDICADORES_LIST):
    case REQUEST(ACTION_TYPES.FETCH_INDICADORES):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_INDICADORES):
    case REQUEST(ACTION_TYPES.UPDATE_INDICADORES):
    case REQUEST(ACTION_TYPES.DELETE_INDICADORES):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_INDICADORES_LIST_EXPORT):
    case FAILURE(ACTION_TYPES.FETCH_INDICADORES_LIST):
    case FAILURE(ACTION_TYPES.FETCH_INDICADORES):
    case FAILURE(ACTION_TYPES.CREATE_INDICADORES):
    case FAILURE(ACTION_TYPES.UPDATE_INDICADORES):
    case FAILURE(ACTION_TYPES.DELETE_INDICADORES):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_INDICADORES_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10)
      };
    case SUCCESS(ACTION_TYPES.FETCH_INDICADORES):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_INDICADORES):
    case SUCCESS(ACTION_TYPES.UPDATE_INDICADORES):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_INDICADORES):
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

const apiUrl = 'api/indicadores';

// Actions

// Actions
export type ICrudGetAllActionIndicadores<T> = (
  titulo?: any,
  page?: number,
  size?: number,
  sort?: string
) => IPayload<T> | ((dispatch: any) => IPayload<T>);

export const getEntities: ICrudGetAllActionIndicadores<IIndicadores> = (titulo, page, size, sort) => {
  const tituloRequest = titulo ? `titulo.contains=${titulo}&` : '';

  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}&` : '?'}`;
  return {
    type: ACTION_TYPES.FETCH_INDICADORES_LIST,
    payload: axios.get<IIndicadores>(`${requestUrl}${tituloRequest}cacheBuster=${new Date().getTime()}`)
  };
};
export const getEntity: ICrudGetAction<IIndicadores> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_INDICADORES,
    payload: axios.get<IIndicadores>(requestUrl)
  };
};

export const getEntitiesExport: ICrudGetAllActionIndicadores<IIndicadores> = (titulo, page, size, sort) => {
  const tituloRequest = titulo ? `titulo.contains=${titulo}&` : '';

  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}&` : '?'}`;
  return {
    type: ACTION_TYPES.FETCH_INDICADORES_LIST,
    payload: axios.get<IIndicadores>(`${requestUrl}${tituloRequest}cacheBuster=${new Date().getTime()}`)
  };
};

export const createEntity: ICrudPutAction<IIndicadores> = entity => async dispatch => {
  entity = {
    ...entity
  };
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_INDICADORES,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IIndicadores> = entity => async dispatch => {
  entity = { ...entity };
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_INDICADORES,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IIndicadores> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_INDICADORES,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});

export const getIndicadoresState = (location): IIndicadoresBaseState => {
  const url = new URL(`http://localhost${location.search}`); // using a dummy url for parsing
  const baseFilters = url.searchParams.get('baseFilters') || '';
  const titulo = url.searchParams.get('titulo') || '';

  return {
    baseFilters,
    titulo
  };
};
