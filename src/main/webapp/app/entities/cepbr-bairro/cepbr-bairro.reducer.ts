/* eslint complexity: ["error", 100] */
import axios from 'axios';
import { ICrudGetAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { IPayload } from 'react-jhipster/src/type/redux-action.type';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { ICepbrBairro, defaultValue } from 'app/shared/model/cepbr-bairro.model';

export const ACTION_TYPES = {
  FETCH_CEPBRBAIRRO_LIST_EXPORT: 'cepbrBairro/FETCH_CEPBRBAIRRO_LIST_EXPORT',
  FETCH_CEPBRBAIRRO_LIST: 'cepbrBairro/FETCH_CEPBRBAIRRO_LIST',
  FETCH_CEPBRBAIRRO: 'cepbrBairro/FETCH_CEPBRBAIRRO',
  CREATE_CEPBRBAIRRO: 'cepbrBairro/CREATE_CEPBRBAIRRO',
  UPDATE_CEPBRBAIRRO: 'cepbrBairro/UPDATE_CEPBRBAIRRO',
  DELETE_CEPBRBAIRRO: 'cepbrBairro/DELETE_CEPBRBAIRRO',
  RESET: 'cepbrBairro/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<ICepbrBairro>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type CepbrBairroState = Readonly<typeof initialState>;

export interface ICepbrBairroBaseState {
  baseFilters: any;
  idBairro: any;
  bairro: any;
}

export interface ICepbrBairroUpdateState {
  fieldsBase: ICepbrBairroBaseState;
  isNew: boolean;
}

// Reducer

export default (state: CepbrBairroState = initialState, action): CepbrBairroState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_CEPBRBAIRRO_LIST_EXPORT):
    case REQUEST(ACTION_TYPES.FETCH_CEPBRBAIRRO_LIST):
    case REQUEST(ACTION_TYPES.FETCH_CEPBRBAIRRO):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_CEPBRBAIRRO):
    case REQUEST(ACTION_TYPES.UPDATE_CEPBRBAIRRO):
    case REQUEST(ACTION_TYPES.DELETE_CEPBRBAIRRO):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_CEPBRBAIRRO_LIST_EXPORT):
    case FAILURE(ACTION_TYPES.FETCH_CEPBRBAIRRO_LIST):
    case FAILURE(ACTION_TYPES.FETCH_CEPBRBAIRRO):
    case FAILURE(ACTION_TYPES.CREATE_CEPBRBAIRRO):
    case FAILURE(ACTION_TYPES.UPDATE_CEPBRBAIRRO):
    case FAILURE(ACTION_TYPES.DELETE_CEPBRBAIRRO):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_CEPBRBAIRRO_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10)
      };
    case SUCCESS(ACTION_TYPES.FETCH_CEPBRBAIRRO):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_CEPBRBAIRRO):
    case SUCCESS(ACTION_TYPES.UPDATE_CEPBRBAIRRO):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_CEPBRBAIRRO):
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

const apiUrl = 'api/cepbr-bairros';

// Actions

// Actions
export type ICrudGetAllActionCepbrBairro<T> = (
  idBairro?: any,
  bairro?: any,
  page?: number,
  size?: number,
  sort?: string
) => IPayload<T> | ((dispatch: any) => IPayload<T>);

export const getEntities: ICrudGetAllActionCepbrBairro<ICepbrBairro> = (idBairro, bairro, page, size, sort) => {
  const idBairroRequest = idBairro ? `idBairro.contains=${idBairro}&` : '';
  const bairroRequest = bairro ? `bairro.contains=${bairro}&` : '';

  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}&` : '?'}`;
  return {
    type: ACTION_TYPES.FETCH_CEPBRBAIRRO_LIST,
    payload: axios.get<ICepbrBairro>(`${requestUrl}${idBairroRequest}${bairroRequest}cacheBuster=${new Date().getTime()}`)
  };
};
export const getEntity: ICrudGetAction<ICepbrBairro> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_CEPBRBAIRRO,
    payload: axios.get<ICepbrBairro>(requestUrl)
  };
};

export const getEntitiesExport: ICrudGetAllActionCepbrBairro<ICepbrBairro> = (idBairro, bairro, page, size, sort) => {
  const idBairroRequest = idBairro ? `idBairro.contains=${idBairro}&` : '';
  const bairroRequest = bairro ? `bairro.contains=${bairro}&` : '';

  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}&` : '?'}`;
  return {
    type: ACTION_TYPES.FETCH_CEPBRBAIRRO_LIST,
    payload: axios.get<ICepbrBairro>(`${requestUrl}${idBairroRequest}${bairroRequest}cacheBuster=${new Date().getTime()}`)
  };
};

export const createEntity: ICrudPutAction<ICepbrBairro> = entity => async dispatch => {
  entity = {
    ...entity
  };
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_CEPBRBAIRRO,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<ICepbrBairro> = entity => async dispatch => {
  entity = { ...entity };
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_CEPBRBAIRRO,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<ICepbrBairro> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_CEPBRBAIRRO,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});

export const getCepbrBairroState = (location): ICepbrBairroBaseState => {
  const url = new URL(`http://localhost${location.search}`); // using a dummy url for parsing
  const baseFilters = url.searchParams.get('baseFilters') || '';
  const idBairro = url.searchParams.get('idBairro') || '';
  const bairro = url.searchParams.get('bairro') || '';

  return {
    baseFilters,
    idBairro,
    bairro
  };
};
