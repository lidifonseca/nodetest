/* eslint complexity: ["error", 100] */
import axios from 'axios';
import { ICrudGetAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { IPayload } from 'react-jhipster/src/type/redux-action.type';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IAtendimentoStatusFinanceiro, defaultValue } from 'app/shared/model/atendimento-status-financeiro.model';

export const ACTION_TYPES = {
  FETCH_ATENDIMENTOSTATUSFINANCEIRO_LIST_EXPORT: 'atendimentoStatusFinanceiro/FETCH_ATENDIMENTOSTATUSFINANCEIRO_LIST_EXPORT',
  FETCH_ATENDIMENTOSTATUSFINANCEIRO_LIST: 'atendimentoStatusFinanceiro/FETCH_ATENDIMENTOSTATUSFINANCEIRO_LIST',
  FETCH_ATENDIMENTOSTATUSFINANCEIRO: 'atendimentoStatusFinanceiro/FETCH_ATENDIMENTOSTATUSFINANCEIRO',
  CREATE_ATENDIMENTOSTATUSFINANCEIRO: 'atendimentoStatusFinanceiro/CREATE_ATENDIMENTOSTATUSFINANCEIRO',
  UPDATE_ATENDIMENTOSTATUSFINANCEIRO: 'atendimentoStatusFinanceiro/UPDATE_ATENDIMENTOSTATUSFINANCEIRO',
  DELETE_ATENDIMENTOSTATUSFINANCEIRO: 'atendimentoStatusFinanceiro/DELETE_ATENDIMENTOSTATUSFINANCEIRO',
  RESET: 'atendimentoStatusFinanceiro/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IAtendimentoStatusFinanceiro>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type AtendimentoStatusFinanceiroState = Readonly<typeof initialState>;

export interface IAtendimentoStatusFinanceiroBaseState {
  baseFilters: any;
  idAtendimento: any;
  idStatusFinanceiro: any;
}

export interface IAtendimentoStatusFinanceiroUpdateState {
  fieldsBase: IAtendimentoStatusFinanceiroBaseState;

  isNew: boolean;
}

// Reducer

export default (state: AtendimentoStatusFinanceiroState = initialState, action): AtendimentoStatusFinanceiroState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_ATENDIMENTOSTATUSFINANCEIRO_LIST_EXPORT):
    case REQUEST(ACTION_TYPES.FETCH_ATENDIMENTOSTATUSFINANCEIRO_LIST):
    case REQUEST(ACTION_TYPES.FETCH_ATENDIMENTOSTATUSFINANCEIRO):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_ATENDIMENTOSTATUSFINANCEIRO):
    case REQUEST(ACTION_TYPES.UPDATE_ATENDIMENTOSTATUSFINANCEIRO):
    case REQUEST(ACTION_TYPES.DELETE_ATENDIMENTOSTATUSFINANCEIRO):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_ATENDIMENTOSTATUSFINANCEIRO_LIST_EXPORT):
    case FAILURE(ACTION_TYPES.FETCH_ATENDIMENTOSTATUSFINANCEIRO_LIST):
    case FAILURE(ACTION_TYPES.FETCH_ATENDIMENTOSTATUSFINANCEIRO):
    case FAILURE(ACTION_TYPES.CREATE_ATENDIMENTOSTATUSFINANCEIRO):
    case FAILURE(ACTION_TYPES.UPDATE_ATENDIMENTOSTATUSFINANCEIRO):
    case FAILURE(ACTION_TYPES.DELETE_ATENDIMENTOSTATUSFINANCEIRO):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_ATENDIMENTOSTATUSFINANCEIRO_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10)
      };
    case SUCCESS(ACTION_TYPES.FETCH_ATENDIMENTOSTATUSFINANCEIRO):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_ATENDIMENTOSTATUSFINANCEIRO):
    case SUCCESS(ACTION_TYPES.UPDATE_ATENDIMENTOSTATUSFINANCEIRO):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_ATENDIMENTOSTATUSFINANCEIRO):
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

const apiUrl = 'api/atendimento-status-financeiros';

// Actions

// Actions
export type ICrudGetAllActionAtendimentoStatusFinanceiro<T> = (
  idAtendimento?: any,
  idStatusFinanceiro?: any,
  page?: number,
  size?: number,
  sort?: string
) => IPayload<T> | ((dispatch: any) => IPayload<T>);

export const getEntities: ICrudGetAllActionAtendimentoStatusFinanceiro<IAtendimentoStatusFinanceiro> = (
  idAtendimento,
  idStatusFinanceiro,
  page,
  size,
  sort
) => {
  const idAtendimentoRequest = idAtendimento ? `idAtendimento.contains=${idAtendimento}&` : '';
  const idStatusFinanceiroRequest = idStatusFinanceiro ? `idStatusFinanceiro.contains=${idStatusFinanceiro}&` : '';

  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}&` : '?'}`;
  return {
    type: ACTION_TYPES.FETCH_ATENDIMENTOSTATUSFINANCEIRO_LIST,
    payload: axios.get<IAtendimentoStatusFinanceiro>(
      `${requestUrl}${idAtendimentoRequest}${idStatusFinanceiroRequest}cacheBuster=${new Date().getTime()}`
    )
  };
};
export const getEntity: ICrudGetAction<IAtendimentoStatusFinanceiro> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_ATENDIMENTOSTATUSFINANCEIRO,
    payload: axios.get<IAtendimentoStatusFinanceiro>(requestUrl)
  };
};

export const getEntitiesExport: ICrudGetAllActionAtendimentoStatusFinanceiro<IAtendimentoStatusFinanceiro> = (
  idAtendimento,
  idStatusFinanceiro,
  page,
  size,
  sort
) => {
  const idAtendimentoRequest = idAtendimento ? `idAtendimento.contains=${idAtendimento}&` : '';
  const idStatusFinanceiroRequest = idStatusFinanceiro ? `idStatusFinanceiro.contains=${idStatusFinanceiro}&` : '';

  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}&` : '?'}`;
  return {
    type: ACTION_TYPES.FETCH_ATENDIMENTOSTATUSFINANCEIRO_LIST,
    payload: axios.get<IAtendimentoStatusFinanceiro>(
      `${requestUrl}${idAtendimentoRequest}${idStatusFinanceiroRequest}cacheBuster=${new Date().getTime()}`
    )
  };
};

export const createEntity: ICrudPutAction<IAtendimentoStatusFinanceiro> = entity => async dispatch => {
  entity = {
    ...entity
  };
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_ATENDIMENTOSTATUSFINANCEIRO,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IAtendimentoStatusFinanceiro> = entity => async dispatch => {
  entity = { ...entity };
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_ATENDIMENTOSTATUSFINANCEIRO,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IAtendimentoStatusFinanceiro> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_ATENDIMENTOSTATUSFINANCEIRO,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});

export const getAtendimentoStatusFinanceiroState = (location): IAtendimentoStatusFinanceiroBaseState => {
  const url = new URL(`http://localhost${location.search}`); // using a dummy url for parsing
  const baseFilters = url.searchParams.get('baseFilters') || '';
  const idAtendimento = url.searchParams.get('idAtendimento') || '';
  const idStatusFinanceiro = url.searchParams.get('idStatusFinanceiro') || '';

  return {
    baseFilters,
    idAtendimento,
    idStatusFinanceiro
  };
};
