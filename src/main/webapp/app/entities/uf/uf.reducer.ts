/* eslint complexity: ["error", 100] */
import axios from 'axios';
import { ICrudGetAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { IPayload } from 'react-jhipster/src/type/redux-action.type';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IUf, defaultValue } from 'app/shared/model/uf.model';

export const ACTION_TYPES = {
  FETCH_UF_LIST_EXPORT: 'uf/FETCH_UF_LIST_EXPORT',
  FETCH_UF_LIST: 'uf/FETCH_UF_LIST',
  FETCH_UF: 'uf/FETCH_UF',
  CREATE_UF: 'uf/CREATE_UF',
  UPDATE_UF: 'uf/UPDATE_UF',
  DELETE_UF: 'uf/DELETE_UF',
  RESET: 'uf/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IUf>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type UfState = Readonly<typeof initialState>;

export interface IUfBaseState {
  baseFilters: any;
  siglaUf: any;
  descrUf: any;
}

export interface IUfUpdateState {
  fieldsBase: IUfBaseState;
  isNew: boolean;
}

// Reducer

export default (state: UfState = initialState, action): UfState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_UF_LIST_EXPORT):
    case REQUEST(ACTION_TYPES.FETCH_UF_LIST):
    case REQUEST(ACTION_TYPES.FETCH_UF):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_UF):
    case REQUEST(ACTION_TYPES.UPDATE_UF):
    case REQUEST(ACTION_TYPES.DELETE_UF):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_UF_LIST_EXPORT):
    case FAILURE(ACTION_TYPES.FETCH_UF_LIST):
    case FAILURE(ACTION_TYPES.FETCH_UF):
    case FAILURE(ACTION_TYPES.CREATE_UF):
    case FAILURE(ACTION_TYPES.UPDATE_UF):
    case FAILURE(ACTION_TYPES.DELETE_UF):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_UF_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10)
      };
    case SUCCESS(ACTION_TYPES.FETCH_UF):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_UF):
    case SUCCESS(ACTION_TYPES.UPDATE_UF):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_UF):
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

const apiUrl = 'api/ufs';

// Actions

// Actions
export type ICrudGetAllActionUf<T> = (
  siglaUf?: any,
  descrUf?: any,
  page?: number,
  size?: number,
  sort?: string
) => IPayload<T> | ((dispatch: any) => IPayload<T>);

export const getEntities: ICrudGetAllActionUf<IUf> = (siglaUf, descrUf, page, size, sort) => {
  const siglaUfRequest = siglaUf ? `siglaUf.contains=${siglaUf}&` : '';
  const descrUfRequest = descrUf ? `descrUf.contains=${descrUf}&` : '';

  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}&` : '?'}`;
  return {
    type: ACTION_TYPES.FETCH_UF_LIST,
    payload: axios.get<IUf>(`${requestUrl}${siglaUfRequest}${descrUfRequest}cacheBuster=${new Date().getTime()}`)
  };
};
export const getEntity: ICrudGetAction<IUf> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_UF,
    payload: axios.get<IUf>(requestUrl)
  };
};

export const getEntitiesExport: ICrudGetAllActionUf<IUf> = (siglaUf, descrUf, page, size, sort) => {
  const siglaUfRequest = siglaUf ? `siglaUf.contains=${siglaUf}&` : '';
  const descrUfRequest = descrUf ? `descrUf.contains=${descrUf}&` : '';

  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}&` : '?'}`;
  return {
    type: ACTION_TYPES.FETCH_UF_LIST,
    payload: axios.get<IUf>(`${requestUrl}${siglaUfRequest}${descrUfRequest}cacheBuster=${new Date().getTime()}`)
  };
};

export const createEntity: ICrudPutAction<IUf> = entity => async dispatch => {
  entity = {
    ...entity
  };
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_UF,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IUf> = entity => async dispatch => {
  entity = { ...entity };
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_UF,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IUf> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_UF,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});

export const getUfState = (location): IUfBaseState => {
  const url = new URL(`http://localhost${location.search}`); // using a dummy url for parsing
  const baseFilters = url.searchParams.get('baseFilters') || '';
  const siglaUf = url.searchParams.get('siglaUf') || '';
  const descrUf = url.searchParams.get('descrUf') || '';

  return {
    baseFilters,
    siglaUf,
    descrUf
  };
};
