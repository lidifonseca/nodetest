/* eslint complexity: ["error", 100] */
import axios from 'axios';
import { ICrudGetAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { IPayload } from 'react-jhipster/src/type/redux-action.type';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IAtendimentoGlosado, defaultValue } from 'app/shared/model/atendimento-glosado.model';

export const ACTION_TYPES = {
  FETCH_ATENDIMENTOGLOSADO_LIST_EXPORT: 'atendimentoGlosado/FETCH_ATENDIMENTOGLOSADO_LIST_EXPORT',
  FETCH_ATENDIMENTOGLOSADO_LIST: 'atendimentoGlosado/FETCH_ATENDIMENTOGLOSADO_LIST',
  FETCH_ATENDIMENTOGLOSADO: 'atendimentoGlosado/FETCH_ATENDIMENTOGLOSADO',
  CREATE_ATENDIMENTOGLOSADO: 'atendimentoGlosado/CREATE_ATENDIMENTOGLOSADO',
  UPDATE_ATENDIMENTOGLOSADO: 'atendimentoGlosado/UPDATE_ATENDIMENTOGLOSADO',
  DELETE_ATENDIMENTOGLOSADO: 'atendimentoGlosado/DELETE_ATENDIMENTOGLOSADO',
  RESET: 'atendimentoGlosado/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IAtendimentoGlosado>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type AtendimentoGlosadoState = Readonly<typeof initialState>;

export interface IAtendimentoGlosadoBaseState {
  baseFilters: any;
  idAtendimento: any;
  glosado: any;
}

export interface IAtendimentoGlosadoUpdateState {
  fieldsBase: IAtendimentoGlosadoBaseState;

  isNew: boolean;
}

// Reducer

export default (state: AtendimentoGlosadoState = initialState, action): AtendimentoGlosadoState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_ATENDIMENTOGLOSADO_LIST_EXPORT):
    case REQUEST(ACTION_TYPES.FETCH_ATENDIMENTOGLOSADO_LIST):
    case REQUEST(ACTION_TYPES.FETCH_ATENDIMENTOGLOSADO):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_ATENDIMENTOGLOSADO):
    case REQUEST(ACTION_TYPES.UPDATE_ATENDIMENTOGLOSADO):
    case REQUEST(ACTION_TYPES.DELETE_ATENDIMENTOGLOSADO):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_ATENDIMENTOGLOSADO_LIST_EXPORT):
    case FAILURE(ACTION_TYPES.FETCH_ATENDIMENTOGLOSADO_LIST):
    case FAILURE(ACTION_TYPES.FETCH_ATENDIMENTOGLOSADO):
    case FAILURE(ACTION_TYPES.CREATE_ATENDIMENTOGLOSADO):
    case FAILURE(ACTION_TYPES.UPDATE_ATENDIMENTOGLOSADO):
    case FAILURE(ACTION_TYPES.DELETE_ATENDIMENTOGLOSADO):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_ATENDIMENTOGLOSADO_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10)
      };
    case SUCCESS(ACTION_TYPES.FETCH_ATENDIMENTOGLOSADO):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_ATENDIMENTOGLOSADO):
    case SUCCESS(ACTION_TYPES.UPDATE_ATENDIMENTOGLOSADO):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_ATENDIMENTOGLOSADO):
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

const apiUrl = 'api/atendimento-glosados';

// Actions

// Actions
export type ICrudGetAllActionAtendimentoGlosado<T> = (
  idAtendimento?: any,
  glosado?: any,
  page?: number,
  size?: number,
  sort?: string
) => IPayload<T> | ((dispatch: any) => IPayload<T>);

export const getEntities: ICrudGetAllActionAtendimentoGlosado<IAtendimentoGlosado> = (idAtendimento, glosado, page, size, sort) => {
  const idAtendimentoRequest = idAtendimento ? `idAtendimento.contains=${idAtendimento}&` : '';
  const glosadoRequest = glosado ? `glosado.contains=${glosado}&` : '';

  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}&` : '?'}`;
  return {
    type: ACTION_TYPES.FETCH_ATENDIMENTOGLOSADO_LIST,
    payload: axios.get<IAtendimentoGlosado>(`${requestUrl}${idAtendimentoRequest}${glosadoRequest}cacheBuster=${new Date().getTime()}`)
  };
};
export const getEntity: ICrudGetAction<IAtendimentoGlosado> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_ATENDIMENTOGLOSADO,
    payload: axios.get<IAtendimentoGlosado>(requestUrl)
  };
};

export const getEntitiesExport: ICrudGetAllActionAtendimentoGlosado<IAtendimentoGlosado> = (idAtendimento, glosado, page, size, sort) => {
  const idAtendimentoRequest = idAtendimento ? `idAtendimento.contains=${idAtendimento}&` : '';
  const glosadoRequest = glosado ? `glosado.contains=${glosado}&` : '';

  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}&` : '?'}`;
  return {
    type: ACTION_TYPES.FETCH_ATENDIMENTOGLOSADO_LIST,
    payload: axios.get<IAtendimentoGlosado>(`${requestUrl}${idAtendimentoRequest}${glosadoRequest}cacheBuster=${new Date().getTime()}`)
  };
};

export const createEntity: ICrudPutAction<IAtendimentoGlosado> = entity => async dispatch => {
  entity = {
    ...entity
  };
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_ATENDIMENTOGLOSADO,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IAtendimentoGlosado> = entity => async dispatch => {
  entity = { ...entity };
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_ATENDIMENTOGLOSADO,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IAtendimentoGlosado> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_ATENDIMENTOGLOSADO,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});

export const getAtendimentoGlosadoState = (location): IAtendimentoGlosadoBaseState => {
  const url = new URL(`http://localhost${location.search}`); // using a dummy url for parsing
  const baseFilters = url.searchParams.get('baseFilters') || '';
  const idAtendimento = url.searchParams.get('idAtendimento') || '';
  const glosado = url.searchParams.get('glosado') || '';

  return {
    baseFilters,
    idAtendimento,
    glosado
  };
};
