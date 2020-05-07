/* eslint complexity: ["error", 100] */
import axios from 'axios';
import { ICrudGetAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { IPayload } from 'react-jhipster/src/type/redux-action.type';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IProfissionalCategoriaContrato, defaultValue } from 'app/shared/model/profissional-categoria-contrato.model';

export const ACTION_TYPES = {
  FETCH_PROFISSIONALCATEGORIACONTRATO_LIST_EXPORT: 'profissionalCategoriaContrato/FETCH_PROFISSIONALCATEGORIACONTRATO_LIST_EXPORT',
  FETCH_PROFISSIONALCATEGORIACONTRATO_LIST: 'profissionalCategoriaContrato/FETCH_PROFISSIONALCATEGORIACONTRATO_LIST',
  FETCH_PROFISSIONALCATEGORIACONTRATO: 'profissionalCategoriaContrato/FETCH_PROFISSIONALCATEGORIACONTRATO',
  CREATE_PROFISSIONALCATEGORIACONTRATO: 'profissionalCategoriaContrato/CREATE_PROFISSIONALCATEGORIACONTRATO',
  UPDATE_PROFISSIONALCATEGORIACONTRATO: 'profissionalCategoriaContrato/UPDATE_PROFISSIONALCATEGORIACONTRATO',
  DELETE_PROFISSIONALCATEGORIACONTRATO: 'profissionalCategoriaContrato/DELETE_PROFISSIONALCATEGORIACONTRATO',
  RESET: 'profissionalCategoriaContrato/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IProfissionalCategoriaContrato>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type ProfissionalCategoriaContratoState = Readonly<typeof initialState>;

export interface IProfissionalCategoriaContratoBaseState {
  baseFilters: any;
  idProfissional: any;
  idCategoriaContrato: any;
  aceito: any;
}

export interface IProfissionalCategoriaContratoUpdateState {
  fieldsBase: IProfissionalCategoriaContratoBaseState;
  isNew: boolean;
}

// Reducer

export default (state: ProfissionalCategoriaContratoState = initialState, action): ProfissionalCategoriaContratoState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_PROFISSIONALCATEGORIACONTRATO_LIST_EXPORT):
    case REQUEST(ACTION_TYPES.FETCH_PROFISSIONALCATEGORIACONTRATO_LIST):
    case REQUEST(ACTION_TYPES.FETCH_PROFISSIONALCATEGORIACONTRATO):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_PROFISSIONALCATEGORIACONTRATO):
    case REQUEST(ACTION_TYPES.UPDATE_PROFISSIONALCATEGORIACONTRATO):
    case REQUEST(ACTION_TYPES.DELETE_PROFISSIONALCATEGORIACONTRATO):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_PROFISSIONALCATEGORIACONTRATO_LIST_EXPORT):
    case FAILURE(ACTION_TYPES.FETCH_PROFISSIONALCATEGORIACONTRATO_LIST):
    case FAILURE(ACTION_TYPES.FETCH_PROFISSIONALCATEGORIACONTRATO):
    case FAILURE(ACTION_TYPES.CREATE_PROFISSIONALCATEGORIACONTRATO):
    case FAILURE(ACTION_TYPES.UPDATE_PROFISSIONALCATEGORIACONTRATO):
    case FAILURE(ACTION_TYPES.DELETE_PROFISSIONALCATEGORIACONTRATO):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_PROFISSIONALCATEGORIACONTRATO_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10)
      };
    case SUCCESS(ACTION_TYPES.FETCH_PROFISSIONALCATEGORIACONTRATO):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_PROFISSIONALCATEGORIACONTRATO):
    case SUCCESS(ACTION_TYPES.UPDATE_PROFISSIONALCATEGORIACONTRATO):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_PROFISSIONALCATEGORIACONTRATO):
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

const apiUrl = 'api/profissional-categoria-contratoes';

// Actions

// Actions
export type ICrudGetAllActionProfissionalCategoriaContrato<T> = (
  idProfissional?: any,
  idCategoriaContrato?: any,
  aceito?: any,
  page?: number,
  size?: number,
  sort?: string
) => IPayload<T> | ((dispatch: any) => IPayload<T>);

export const getEntities: ICrudGetAllActionProfissionalCategoriaContrato<IProfissionalCategoriaContrato> = (
  idProfissional,
  idCategoriaContrato,
  aceito,
  page,
  size,
  sort
) => {
  const idProfissionalRequest = idProfissional ? `idProfissional.contains=${idProfissional}&` : '';
  const idCategoriaContratoRequest = idCategoriaContrato ? `idCategoriaContrato.contains=${idCategoriaContrato}&` : '';
  const aceitoRequest = aceito ? `aceito.contains=${aceito}&` : '';

  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}&` : '?'}`;
  return {
    type: ACTION_TYPES.FETCH_PROFISSIONALCATEGORIACONTRATO_LIST,
    payload: axios.get<IProfissionalCategoriaContrato>(
      `${requestUrl}${idProfissionalRequest}${idCategoriaContratoRequest}${aceitoRequest}cacheBuster=${new Date().getTime()}`
    )
  };
};
export const getEntity: ICrudGetAction<IProfissionalCategoriaContrato> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_PROFISSIONALCATEGORIACONTRATO,
    payload: axios.get<IProfissionalCategoriaContrato>(requestUrl)
  };
};

export const getEntitiesExport: ICrudGetAllActionProfissionalCategoriaContrato<IProfissionalCategoriaContrato> = (
  idProfissional,
  idCategoriaContrato,
  aceito,
  page,
  size,
  sort
) => {
  const idProfissionalRequest = idProfissional ? `idProfissional.contains=${idProfissional}&` : '';
  const idCategoriaContratoRequest = idCategoriaContrato ? `idCategoriaContrato.contains=${idCategoriaContrato}&` : '';
  const aceitoRequest = aceito ? `aceito.contains=${aceito}&` : '';

  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}&` : '?'}`;
  return {
    type: ACTION_TYPES.FETCH_PROFISSIONALCATEGORIACONTRATO_LIST,
    payload: axios.get<IProfissionalCategoriaContrato>(
      `${requestUrl}${idProfissionalRequest}${idCategoriaContratoRequest}${aceitoRequest}cacheBuster=${new Date().getTime()}`
    )
  };
};

export const createEntity: ICrudPutAction<IProfissionalCategoriaContrato> = entity => async dispatch => {
  entity = {
    ...entity
  };
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_PROFISSIONALCATEGORIACONTRATO,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IProfissionalCategoriaContrato> = entity => async dispatch => {
  entity = { ...entity };
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_PROFISSIONALCATEGORIACONTRATO,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IProfissionalCategoriaContrato> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_PROFISSIONALCATEGORIACONTRATO,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});

export const getProfissionalCategoriaContratoState = (location): IProfissionalCategoriaContratoBaseState => {
  const url = new URL(`http://localhost${location.search}`); // using a dummy url for parsing
  const baseFilters = url.searchParams.get('baseFilters') || '';
  const idProfissional = url.searchParams.get('idProfissional') || '';
  const idCategoriaContrato = url.searchParams.get('idCategoriaContrato') || '';
  const aceito = url.searchParams.get('aceito') || '';

  return {
    baseFilters,
    idProfissional,
    idCategoriaContrato,
    aceito
  };
};
