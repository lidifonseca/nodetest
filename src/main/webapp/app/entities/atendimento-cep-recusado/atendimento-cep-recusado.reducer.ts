/* eslint complexity: ["error", 100] */
import axios from 'axios';
import { ICrudGetAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { IPayload } from 'react-jhipster/src/type/redux-action.type';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IAtendimentoCepRecusado, defaultValue } from 'app/shared/model/atendimento-cep-recusado.model';

export const ACTION_TYPES = {
  FETCH_ATENDIMENTOCEPRECUSADO_LIST_EXPORT: 'atendimentoCepRecusado/FETCH_ATENDIMENTOCEPRECUSADO_LIST_EXPORT',
  FETCH_ATENDIMENTOCEPRECUSADO_LIST: 'atendimentoCepRecusado/FETCH_ATENDIMENTOCEPRECUSADO_LIST',
  FETCH_ATENDIMENTOCEPRECUSADO: 'atendimentoCepRecusado/FETCH_ATENDIMENTOCEPRECUSADO',
  CREATE_ATENDIMENTOCEPRECUSADO: 'atendimentoCepRecusado/CREATE_ATENDIMENTOCEPRECUSADO',
  UPDATE_ATENDIMENTOCEPRECUSADO: 'atendimentoCepRecusado/UPDATE_ATENDIMENTOCEPRECUSADO',
  DELETE_ATENDIMENTOCEPRECUSADO: 'atendimentoCepRecusado/DELETE_ATENDIMENTOCEPRECUSADO',
  RESET: 'atendimentoCepRecusado/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IAtendimentoCepRecusado>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type AtendimentoCepRecusadoState = Readonly<typeof initialState>;

export interface IAtendimentoCepRecusadoBaseState {
  baseFilters: any;
  cep: any;
  padItem: any;
}

export interface IAtendimentoCepRecusadoUpdateState {
  fieldsBase: IAtendimentoCepRecusadoBaseState;

  padItemSelectValue: any;
  isNew: boolean;
  padItemId: string;
}

// Reducer

export default (state: AtendimentoCepRecusadoState = initialState, action): AtendimentoCepRecusadoState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_ATENDIMENTOCEPRECUSADO_LIST_EXPORT):
    case REQUEST(ACTION_TYPES.FETCH_ATENDIMENTOCEPRECUSADO_LIST):
    case REQUEST(ACTION_TYPES.FETCH_ATENDIMENTOCEPRECUSADO):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_ATENDIMENTOCEPRECUSADO):
    case REQUEST(ACTION_TYPES.UPDATE_ATENDIMENTOCEPRECUSADO):
    case REQUEST(ACTION_TYPES.DELETE_ATENDIMENTOCEPRECUSADO):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_ATENDIMENTOCEPRECUSADO_LIST_EXPORT):
    case FAILURE(ACTION_TYPES.FETCH_ATENDIMENTOCEPRECUSADO_LIST):
    case FAILURE(ACTION_TYPES.FETCH_ATENDIMENTOCEPRECUSADO):
    case FAILURE(ACTION_TYPES.CREATE_ATENDIMENTOCEPRECUSADO):
    case FAILURE(ACTION_TYPES.UPDATE_ATENDIMENTOCEPRECUSADO):
    case FAILURE(ACTION_TYPES.DELETE_ATENDIMENTOCEPRECUSADO):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_ATENDIMENTOCEPRECUSADO_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10)
      };
    case SUCCESS(ACTION_TYPES.FETCH_ATENDIMENTOCEPRECUSADO):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_ATENDIMENTOCEPRECUSADO):
    case SUCCESS(ACTION_TYPES.UPDATE_ATENDIMENTOCEPRECUSADO):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_ATENDIMENTOCEPRECUSADO):
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

const apiUrl = 'api/atendimento-cep-recusados';

// Actions

// Actions
export type ICrudGetAllActionAtendimentoCepRecusado<T> = (
  cep?: any,
  padItem?: any,
  page?: number,
  size?: number,
  sort?: string
) => IPayload<T> | ((dispatch: any) => IPayload<T>);

export const getEntities: ICrudGetAllActionAtendimentoCepRecusado<IAtendimentoCepRecusado> = (cep, padItem, page, size, sort) => {
  const cepRequest = cep ? `cep.contains=${cep}&` : '';
  const padItemRequest = padItem ? `padItem.equals=${padItem}&` : '';

  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}&` : '?'}`;
  return {
    type: ACTION_TYPES.FETCH_ATENDIMENTOCEPRECUSADO_LIST,
    payload: axios.get<IAtendimentoCepRecusado>(`${requestUrl}${cepRequest}${padItemRequest}cacheBuster=${new Date().getTime()}`)
  };
};
export const getEntity: ICrudGetAction<IAtendimentoCepRecusado> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_ATENDIMENTOCEPRECUSADO,
    payload: axios.get<IAtendimentoCepRecusado>(requestUrl)
  };
};

export const getEntitiesExport: ICrudGetAllActionAtendimentoCepRecusado<IAtendimentoCepRecusado> = (cep, padItem, page, size, sort) => {
  const cepRequest = cep ? `cep.contains=${cep}&` : '';
  const padItemRequest = padItem ? `padItem.equals=${padItem}&` : '';

  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}&` : '?'}`;
  return {
    type: ACTION_TYPES.FETCH_ATENDIMENTOCEPRECUSADO_LIST,
    payload: axios.get<IAtendimentoCepRecusado>(`${requestUrl}${cepRequest}${padItemRequest}cacheBuster=${new Date().getTime()}`)
  };
};

export const createEntity: ICrudPutAction<IAtendimentoCepRecusado> = entity => async dispatch => {
  entity = {
    ...entity,
    padItem: entity.padItem === 'null' ? null : entity.padItem
  };
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_ATENDIMENTOCEPRECUSADO,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IAtendimentoCepRecusado> = entity => async dispatch => {
  entity = { ...entity, padItem: entity.padItem === 'null' ? null : entity.padItem };
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_ATENDIMENTOCEPRECUSADO,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IAtendimentoCepRecusado> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_ATENDIMENTOCEPRECUSADO,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});

export const getAtendimentoCepRecusadoState = (location): IAtendimentoCepRecusadoBaseState => {
  const url = new URL(`http://localhost${location.search}`); // using a dummy url for parsing
  const baseFilters = url.searchParams.get('baseFilters') || '';
  const cep = url.searchParams.get('cep') || '';

  const padItem = url.searchParams.get('padItem') || '';

  return {
    baseFilters,
    cep,
    padItem
  };
};
