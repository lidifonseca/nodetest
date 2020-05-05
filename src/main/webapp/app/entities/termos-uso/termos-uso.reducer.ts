/* eslint complexity: ["error", 100] */
import axios from 'axios';
import { ICrudGetAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { IPayload } from 'react-jhipster/src/type/redux-action.type';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { ITermosUso, defaultValue } from 'app/shared/model/termos-uso.model';

export const ACTION_TYPES = {
  FETCH_TERMOSUSO_LIST_EXPORT: 'termosUso/FETCH_TERMOSUSO_LIST_EXPORT',
  FETCH_TERMOSUSO_LIST: 'termosUso/FETCH_TERMOSUSO_LIST',
  FETCH_TERMOSUSO: 'termosUso/FETCH_TERMOSUSO',
  CREATE_TERMOSUSO: 'termosUso/CREATE_TERMOSUSO',
  UPDATE_TERMOSUSO: 'termosUso/UPDATE_TERMOSUSO',
  DELETE_TERMOSUSO: 'termosUso/DELETE_TERMOSUSO',
  RESET: 'termosUso/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<ITermosUso>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type TermosUsoState = Readonly<typeof initialState>;

export interface ITermosUsoBaseState {
  termosUso: any;
  tipo: any;
}

// Reducer

export default (state: TermosUsoState = initialState, action): TermosUsoState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_TERMOSUSO_LIST_EXPORT):
    case REQUEST(ACTION_TYPES.FETCH_TERMOSUSO_LIST):
    case REQUEST(ACTION_TYPES.FETCH_TERMOSUSO):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_TERMOSUSO):
    case REQUEST(ACTION_TYPES.UPDATE_TERMOSUSO):
    case REQUEST(ACTION_TYPES.DELETE_TERMOSUSO):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_TERMOSUSO_LIST_EXPORT):
    case FAILURE(ACTION_TYPES.FETCH_TERMOSUSO_LIST):
    case FAILURE(ACTION_TYPES.FETCH_TERMOSUSO):
    case FAILURE(ACTION_TYPES.CREATE_TERMOSUSO):
    case FAILURE(ACTION_TYPES.UPDATE_TERMOSUSO):
    case FAILURE(ACTION_TYPES.DELETE_TERMOSUSO):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_TERMOSUSO_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10)
      };
    case SUCCESS(ACTION_TYPES.FETCH_TERMOSUSO):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_TERMOSUSO):
    case SUCCESS(ACTION_TYPES.UPDATE_TERMOSUSO):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_TERMOSUSO):
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

const apiUrl = 'api/termos-usos';

// Actions

// Actions
export type ICrudGetAllActionTermosUso<T> = (
  termosUso?: any,
  tipo?: any,
  page?: number,
  size?: number,
  sort?: string
) => IPayload<T> | ((dispatch: any) => IPayload<T>);

export const getEntities: ICrudGetAllActionTermosUso<ITermosUso> = (termosUso, tipo, page, size, sort) => {
  const termosUsoRequest = termosUso ? `termosUso.contains=${termosUso}&` : '';
  const tipoRequest = tipo ? `tipo.contains=${tipo}&` : '';

  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}&` : '?'}`;
  return {
    type: ACTION_TYPES.FETCH_TERMOSUSO_LIST,
    payload: axios.get<ITermosUso>(`${requestUrl}${termosUsoRequest}${tipoRequest}cacheBuster=${new Date().getTime()}`)
  };
};
export const getEntity: ICrudGetAction<ITermosUso> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_TERMOSUSO,
    payload: axios.get<ITermosUso>(requestUrl)
  };
};

export const getEntitiesExport: ICrudGetAllActionTermosUso<ITermosUso> = (termosUso, tipo, page, size, sort) => {
  const termosUsoRequest = termosUso ? `termosUso.contains=${termosUso}&` : '';
  const tipoRequest = tipo ? `tipo.contains=${tipo}&` : '';

  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}&` : '?'}`;
  return {
    type: ACTION_TYPES.FETCH_TERMOSUSO_LIST,
    payload: axios.get<ITermosUso>(`${requestUrl}${termosUsoRequest}${tipoRequest}cacheBuster=${new Date().getTime()}`)
  };
};

export const createEntity: ICrudPutAction<ITermosUso> = entity => async dispatch => {
  entity = {
    ...entity
  };
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_TERMOSUSO,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<ITermosUso> = entity => async dispatch => {
  entity = { ...entity };
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_TERMOSUSO,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<ITermosUso> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_TERMOSUSO,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});

export const getTermosUsoState = (location): ITermosUsoBaseState => {
  const url = new URL(`http://localhost${location.search}`); // using a dummy url for parsing
  const termosUso = url.searchParams.get('termosUso') || '';
  const tipo = url.searchParams.get('tipo') || '';

  return {
    termosUso,
    tipo
  };
};
