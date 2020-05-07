/* eslint complexity: ["error", 100] */
import axios from 'axios';
import { ICrudGetAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { IPayload } from 'react-jhipster/src/type/redux-action.type';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IBanco, defaultValue } from 'app/shared/model/banco.model';

export const ACTION_TYPES = {
  FETCH_BANCO_LIST_EXPORT: 'banco/FETCH_BANCO_LIST_EXPORT',
  FETCH_BANCO_LIST: 'banco/FETCH_BANCO_LIST',
  FETCH_BANCO: 'banco/FETCH_BANCO',
  CREATE_BANCO: 'banco/CREATE_BANCO',
  UPDATE_BANCO: 'banco/UPDATE_BANCO',
  DELETE_BANCO: 'banco/DELETE_BANCO',
  RESET: 'banco/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IBanco>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type BancoState = Readonly<typeof initialState>;

export interface IBancoBaseState {
  baseFilters: any;
  codBanco: any;
  banco: any;
}

export interface IBancoUpdateState {
  fieldsBase: IBancoBaseState;
  isNew: boolean;
}

// Reducer

export default (state: BancoState = initialState, action): BancoState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_BANCO_LIST_EXPORT):
    case REQUEST(ACTION_TYPES.FETCH_BANCO_LIST):
    case REQUEST(ACTION_TYPES.FETCH_BANCO):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_BANCO):
    case REQUEST(ACTION_TYPES.UPDATE_BANCO):
    case REQUEST(ACTION_TYPES.DELETE_BANCO):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_BANCO_LIST_EXPORT):
    case FAILURE(ACTION_TYPES.FETCH_BANCO_LIST):
    case FAILURE(ACTION_TYPES.FETCH_BANCO):
    case FAILURE(ACTION_TYPES.CREATE_BANCO):
    case FAILURE(ACTION_TYPES.UPDATE_BANCO):
    case FAILURE(ACTION_TYPES.DELETE_BANCO):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_BANCO_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10)
      };
    case SUCCESS(ACTION_TYPES.FETCH_BANCO):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_BANCO):
    case SUCCESS(ACTION_TYPES.UPDATE_BANCO):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_BANCO):
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

const apiUrl = 'api/bancos';

// Actions

// Actions
export type ICrudGetAllActionBanco<T> = (
  codBanco?: any,
  banco?: any,
  page?: number,
  size?: number,
  sort?: string
) => IPayload<T> | ((dispatch: any) => IPayload<T>);

export const getEntities: ICrudGetAllActionBanco<IBanco> = (codBanco, banco, page, size, sort) => {
  const codBancoRequest = codBanco ? `codBanco.contains=${codBanco}&` : '';
  const bancoRequest = banco ? `banco.contains=${banco}&` : '';

  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}&` : '?'}`;
  return {
    type: ACTION_TYPES.FETCH_BANCO_LIST,
    payload: axios.get<IBanco>(`${requestUrl}${codBancoRequest}${bancoRequest}cacheBuster=${new Date().getTime()}`)
  };
};
export const getEntity: ICrudGetAction<IBanco> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_BANCO,
    payload: axios.get<IBanco>(requestUrl)
  };
};

export const getEntitiesExport: ICrudGetAllActionBanco<IBanco> = (codBanco, banco, page, size, sort) => {
  const codBancoRequest = codBanco ? `codBanco.contains=${codBanco}&` : '';
  const bancoRequest = banco ? `banco.contains=${banco}&` : '';

  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}&` : '?'}`;
  return {
    type: ACTION_TYPES.FETCH_BANCO_LIST,
    payload: axios.get<IBanco>(`${requestUrl}${codBancoRequest}${bancoRequest}cacheBuster=${new Date().getTime()}`)
  };
};

export const createEntity: ICrudPutAction<IBanco> = entity => async dispatch => {
  entity = {
    ...entity
  };
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_BANCO,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IBanco> = entity => async dispatch => {
  entity = { ...entity };
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_BANCO,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IBanco> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_BANCO,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});

export const getBancoState = (location): IBancoBaseState => {
  const url = new URL(`http://localhost${location.search}`); // using a dummy url for parsing
  const baseFilters = url.searchParams.get('baseFilters') || '';
  const codBanco = url.searchParams.get('codBanco') || '';
  const banco = url.searchParams.get('banco') || '';

  return {
    baseFilters,
    codBanco,
    banco
  };
};
