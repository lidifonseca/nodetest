/* eslint complexity: ["error", 100] */
import axios from 'axios';
import { ICrudGetAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { IPayload } from 'react-jhipster/src/type/redux-action.type';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IAtendimentoSorteioFeito, defaultValue } from 'app/shared/model/atendimento-sorteio-feito.model';

export const ACTION_TYPES = {
  FETCH_ATENDIMENTOSORTEIOFEITO_LIST_EXPORT: 'atendimentoSorteioFeito/FETCH_ATENDIMENTOSORTEIOFEITO_LIST_EXPORT',
  FETCH_ATENDIMENTOSORTEIOFEITO_LIST: 'atendimentoSorteioFeito/FETCH_ATENDIMENTOSORTEIOFEITO_LIST',
  FETCH_ATENDIMENTOSORTEIOFEITO: 'atendimentoSorteioFeito/FETCH_ATENDIMENTOSORTEIOFEITO',
  CREATE_ATENDIMENTOSORTEIOFEITO: 'atendimentoSorteioFeito/CREATE_ATENDIMENTOSORTEIOFEITO',
  UPDATE_ATENDIMENTOSORTEIOFEITO: 'atendimentoSorteioFeito/UPDATE_ATENDIMENTOSORTEIOFEITO',
  DELETE_ATENDIMENTOSORTEIOFEITO: 'atendimentoSorteioFeito/DELETE_ATENDIMENTOSORTEIOFEITO',
  RESET: 'atendimentoSorteioFeito/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IAtendimentoSorteioFeito>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type AtendimentoSorteioFeitoState = Readonly<typeof initialState>;

export interface IAtendimentoSorteioFeitoBaseState {
  baseFilters: any;
  sorteioFeito: any;
}

export interface IAtendimentoSorteioFeitoUpdateState {
  fieldsBase: IAtendimentoSorteioFeitoBaseState;
  isNew: boolean;
}

// Reducer

export default (state: AtendimentoSorteioFeitoState = initialState, action): AtendimentoSorteioFeitoState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_ATENDIMENTOSORTEIOFEITO_LIST_EXPORT):
    case REQUEST(ACTION_TYPES.FETCH_ATENDIMENTOSORTEIOFEITO_LIST):
    case REQUEST(ACTION_TYPES.FETCH_ATENDIMENTOSORTEIOFEITO):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_ATENDIMENTOSORTEIOFEITO):
    case REQUEST(ACTION_TYPES.UPDATE_ATENDIMENTOSORTEIOFEITO):
    case REQUEST(ACTION_TYPES.DELETE_ATENDIMENTOSORTEIOFEITO):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_ATENDIMENTOSORTEIOFEITO_LIST_EXPORT):
    case FAILURE(ACTION_TYPES.FETCH_ATENDIMENTOSORTEIOFEITO_LIST):
    case FAILURE(ACTION_TYPES.FETCH_ATENDIMENTOSORTEIOFEITO):
    case FAILURE(ACTION_TYPES.CREATE_ATENDIMENTOSORTEIOFEITO):
    case FAILURE(ACTION_TYPES.UPDATE_ATENDIMENTOSORTEIOFEITO):
    case FAILURE(ACTION_TYPES.DELETE_ATENDIMENTOSORTEIOFEITO):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_ATENDIMENTOSORTEIOFEITO_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10)
      };
    case SUCCESS(ACTION_TYPES.FETCH_ATENDIMENTOSORTEIOFEITO):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_ATENDIMENTOSORTEIOFEITO):
    case SUCCESS(ACTION_TYPES.UPDATE_ATENDIMENTOSORTEIOFEITO):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_ATENDIMENTOSORTEIOFEITO):
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

const apiUrl = 'api/atendimento-sorteio-feitos';

// Actions

// Actions
export type ICrudGetAllActionAtendimentoSorteioFeito<T> = (
  sorteioFeito?: any,
  page?: number,
  size?: number,
  sort?: string
) => IPayload<T> | ((dispatch: any) => IPayload<T>);

export const getEntities: ICrudGetAllActionAtendimentoSorteioFeito<IAtendimentoSorteioFeito> = (sorteioFeito, page, size, sort) => {
  const sorteioFeitoRequest = sorteioFeito ? `sorteioFeito.contains=${sorteioFeito}&` : '';

  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}&` : '?'}`;
  return {
    type: ACTION_TYPES.FETCH_ATENDIMENTOSORTEIOFEITO_LIST,
    payload: axios.get<IAtendimentoSorteioFeito>(`${requestUrl}${sorteioFeitoRequest}cacheBuster=${new Date().getTime()}`)
  };
};
export const getEntity: ICrudGetAction<IAtendimentoSorteioFeito> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_ATENDIMENTOSORTEIOFEITO,
    payload: axios.get<IAtendimentoSorteioFeito>(requestUrl)
  };
};

export const getEntitiesExport: ICrudGetAllActionAtendimentoSorteioFeito<IAtendimentoSorteioFeito> = (sorteioFeito, page, size, sort) => {
  const sorteioFeitoRequest = sorteioFeito ? `sorteioFeito.contains=${sorteioFeito}&` : '';

  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}&` : '?'}`;
  return {
    type: ACTION_TYPES.FETCH_ATENDIMENTOSORTEIOFEITO_LIST,
    payload: axios.get<IAtendimentoSorteioFeito>(`${requestUrl}${sorteioFeitoRequest}cacheBuster=${new Date().getTime()}`)
  };
};

export const createEntity: ICrudPutAction<IAtendimentoSorteioFeito> = entity => async dispatch => {
  entity = {
    ...entity
  };
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_ATENDIMENTOSORTEIOFEITO,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IAtendimentoSorteioFeito> = entity => async dispatch => {
  entity = { ...entity };
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_ATENDIMENTOSORTEIOFEITO,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IAtendimentoSorteioFeito> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_ATENDIMENTOSORTEIOFEITO,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});

export const getAtendimentoSorteioFeitoState = (location): IAtendimentoSorteioFeitoBaseState => {
  const url = new URL(`http://localhost${location.search}`); // using a dummy url for parsing
  const baseFilters = url.searchParams.get('baseFilters') || '';
  const sorteioFeito = url.searchParams.get('sorteioFeito') || '';

  return {
    baseFilters,
    sorteioFeito
  };
};
