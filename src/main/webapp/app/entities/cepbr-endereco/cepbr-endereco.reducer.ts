/* eslint complexity: ["error", 100] */
import axios from 'axios';
import { ICrudGetAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { IPayload } from 'react-jhipster/src/type/redux-action.type';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { ICepbrEndereco, defaultValue } from 'app/shared/model/cepbr-endereco.model';

export const ACTION_TYPES = {
  FETCH_CEPBRENDERECO_LIST_EXPORT: 'cepbrEndereco/FETCH_CEPBRENDERECO_LIST_EXPORT',
  FETCH_CEPBRENDERECO_LIST: 'cepbrEndereco/FETCH_CEPBRENDERECO_LIST',
  FETCH_CEPBRENDERECO: 'cepbrEndereco/FETCH_CEPBRENDERECO',
  CREATE_CEPBRENDERECO: 'cepbrEndereco/CREATE_CEPBRENDERECO',
  UPDATE_CEPBRENDERECO: 'cepbrEndereco/UPDATE_CEPBRENDERECO',
  DELETE_CEPBRENDERECO: 'cepbrEndereco/DELETE_CEPBRENDERECO',
  RESET: 'cepbrEndereco/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<ICepbrEndereco>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type CepbrEnderecoState = Readonly<typeof initialState>;

export interface ICepbrEnderecoBaseState {
  baseFilters: any;
  cep: any;
  logradouro: any;
  tipoLogradouro: any;
  complemento: any;
  local: any;
}

export interface ICepbrEnderecoUpdateState {
  fieldsBase: ICepbrEnderecoBaseState;
  isNew: boolean;
}

// Reducer

export default (state: CepbrEnderecoState = initialState, action): CepbrEnderecoState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_CEPBRENDERECO_LIST_EXPORT):
    case REQUEST(ACTION_TYPES.FETCH_CEPBRENDERECO_LIST):
    case REQUEST(ACTION_TYPES.FETCH_CEPBRENDERECO):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_CEPBRENDERECO):
    case REQUEST(ACTION_TYPES.UPDATE_CEPBRENDERECO):
    case REQUEST(ACTION_TYPES.DELETE_CEPBRENDERECO):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_CEPBRENDERECO_LIST_EXPORT):
    case FAILURE(ACTION_TYPES.FETCH_CEPBRENDERECO_LIST):
    case FAILURE(ACTION_TYPES.FETCH_CEPBRENDERECO):
    case FAILURE(ACTION_TYPES.CREATE_CEPBRENDERECO):
    case FAILURE(ACTION_TYPES.UPDATE_CEPBRENDERECO):
    case FAILURE(ACTION_TYPES.DELETE_CEPBRENDERECO):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_CEPBRENDERECO_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10)
      };
    case SUCCESS(ACTION_TYPES.FETCH_CEPBRENDERECO):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_CEPBRENDERECO):
    case SUCCESS(ACTION_TYPES.UPDATE_CEPBRENDERECO):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_CEPBRENDERECO):
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

const apiUrl = 'api/cepbr-enderecos';

// Actions

// Actions
export type ICrudGetAllActionCepbrEndereco<T> = (
  cep?: any,
  logradouro?: any,
  tipoLogradouro?: any,
  complemento?: any,
  local?: any,
  page?: number,
  size?: number,
  sort?: string
) => IPayload<T> | ((dispatch: any) => IPayload<T>);

export const getEntities: ICrudGetAllActionCepbrEndereco<ICepbrEndereco> = (
  cep,
  logradouro,
  tipoLogradouro,
  complemento,
  local,
  page,
  size,
  sort
) => {
  const cepRequest = cep ? `cep.contains=${cep}&` : '';
  const logradouroRequest = logradouro ? `logradouro.contains=${logradouro}&` : '';
  const tipoLogradouroRequest = tipoLogradouro ? `tipoLogradouro.contains=${tipoLogradouro}&` : '';
  const complementoRequest = complemento ? `complemento.contains=${complemento}&` : '';
  const localRequest = local ? `local.contains=${local}&` : '';

  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}&` : '?'}`;
  return {
    type: ACTION_TYPES.FETCH_CEPBRENDERECO_LIST,
    payload: axios.get<ICepbrEndereco>(
      `${requestUrl}${cepRequest}${logradouroRequest}${tipoLogradouroRequest}${complementoRequest}${localRequest}cacheBuster=${new Date().getTime()}`
    )
  };
};
export const getEntity: ICrudGetAction<ICepbrEndereco> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_CEPBRENDERECO,
    payload: axios.get<ICepbrEndereco>(requestUrl)
  };
};

export const getEntitiesExport: ICrudGetAllActionCepbrEndereco<ICepbrEndereco> = (
  cep,
  logradouro,
  tipoLogradouro,
  complemento,
  local,
  page,
  size,
  sort
) => {
  const cepRequest = cep ? `cep.contains=${cep}&` : '';
  const logradouroRequest = logradouro ? `logradouro.contains=${logradouro}&` : '';
  const tipoLogradouroRequest = tipoLogradouro ? `tipoLogradouro.contains=${tipoLogradouro}&` : '';
  const complementoRequest = complemento ? `complemento.contains=${complemento}&` : '';
  const localRequest = local ? `local.contains=${local}&` : '';

  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}&` : '?'}`;
  return {
    type: ACTION_TYPES.FETCH_CEPBRENDERECO_LIST,
    payload: axios.get<ICepbrEndereco>(
      `${requestUrl}${cepRequest}${logradouroRequest}${tipoLogradouroRequest}${complementoRequest}${localRequest}cacheBuster=${new Date().getTime()}`
    )
  };
};

export const createEntity: ICrudPutAction<ICepbrEndereco> = entity => async dispatch => {
  entity = {
    ...entity
  };
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_CEPBRENDERECO,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<ICepbrEndereco> = entity => async dispatch => {
  entity = { ...entity };
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_CEPBRENDERECO,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<ICepbrEndereco> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_CEPBRENDERECO,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});

export const getCepbrEnderecoState = (location): ICepbrEnderecoBaseState => {
  const url = new URL(`http://localhost${location.search}`); // using a dummy url for parsing
  const baseFilters = url.searchParams.get('baseFilters') || '';
  const cep = url.searchParams.get('cep') || '';
  const logradouro = url.searchParams.get('logradouro') || '';
  const tipoLogradouro = url.searchParams.get('tipoLogradouro') || '';
  const complemento = url.searchParams.get('complemento') || '';
  const local = url.searchParams.get('local') || '';

  return {
    baseFilters,
    cep,
    logradouro,
    tipoLogradouro,
    complemento,
    local
  };
};
