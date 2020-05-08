/* eslint complexity: ["error", 100] */
import axios from 'axios';
import { ICrudGetAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { IPayload } from 'react-jhipster/src/type/redux-action.type';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IAtendimentoAceite, defaultValue } from 'app/shared/model/atendimento-aceite.model';

export const ACTION_TYPES = {
  FETCH_ATENDIMENTOACEITE_LIST_EXPORT: 'atendimentoAceite/FETCH_ATENDIMENTOACEITE_LIST_EXPORT',
  FETCH_ATENDIMENTOACEITE_LIST: 'atendimentoAceite/FETCH_ATENDIMENTOACEITE_LIST',
  FETCH_ATENDIMENTOACEITE: 'atendimentoAceite/FETCH_ATENDIMENTOACEITE',
  CREATE_ATENDIMENTOACEITE: 'atendimentoAceite/CREATE_ATENDIMENTOACEITE',
  UPDATE_ATENDIMENTOACEITE: 'atendimentoAceite/UPDATE_ATENDIMENTOACEITE',
  DELETE_ATENDIMENTOACEITE: 'atendimentoAceite/DELETE_ATENDIMENTOACEITE',
  RESET: 'atendimentoAceite/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IAtendimentoAceite>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type AtendimentoAceiteState = Readonly<typeof initialState>;

export interface IAtendimentoAceiteBaseState {
  baseFilters: any;
  msgPush: any;
}

export interface IAtendimentoAceiteUpdateState {
  fieldsBase: IAtendimentoAceiteBaseState;

  isNew: boolean;
}

// Reducer

export default (state: AtendimentoAceiteState = initialState, action): AtendimentoAceiteState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_ATENDIMENTOACEITE_LIST_EXPORT):
    case REQUEST(ACTION_TYPES.FETCH_ATENDIMENTOACEITE_LIST):
    case REQUEST(ACTION_TYPES.FETCH_ATENDIMENTOACEITE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_ATENDIMENTOACEITE):
    case REQUEST(ACTION_TYPES.UPDATE_ATENDIMENTOACEITE):
    case REQUEST(ACTION_TYPES.DELETE_ATENDIMENTOACEITE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_ATENDIMENTOACEITE_LIST_EXPORT):
    case FAILURE(ACTION_TYPES.FETCH_ATENDIMENTOACEITE_LIST):
    case FAILURE(ACTION_TYPES.FETCH_ATENDIMENTOACEITE):
    case FAILURE(ACTION_TYPES.CREATE_ATENDIMENTOACEITE):
    case FAILURE(ACTION_TYPES.UPDATE_ATENDIMENTOACEITE):
    case FAILURE(ACTION_TYPES.DELETE_ATENDIMENTOACEITE):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_ATENDIMENTOACEITE_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10)
      };
    case SUCCESS(ACTION_TYPES.FETCH_ATENDIMENTOACEITE):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_ATENDIMENTOACEITE):
    case SUCCESS(ACTION_TYPES.UPDATE_ATENDIMENTOACEITE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_ATENDIMENTOACEITE):
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

const apiUrl = 'api/atendimento-aceites';

// Actions

// Actions
export type ICrudGetAllActionAtendimentoAceite<T> = (
  msgPush?: any,
  page?: number,
  size?: number,
  sort?: string
) => IPayload<T> | ((dispatch: any) => IPayload<T>);

export const getEntities: ICrudGetAllActionAtendimentoAceite<IAtendimentoAceite> = (msgPush, page, size, sort) => {
  const msgPushRequest = msgPush ? `msgPush.contains=${msgPush}&` : '';

  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}&` : '?'}`;
  return {
    type: ACTION_TYPES.FETCH_ATENDIMENTOACEITE_LIST,
    payload: axios.get<IAtendimentoAceite>(`${requestUrl}${msgPushRequest}cacheBuster=${new Date().getTime()}`)
  };
};
export const getEntity: ICrudGetAction<IAtendimentoAceite> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_ATENDIMENTOACEITE,
    payload: axios.get<IAtendimentoAceite>(requestUrl)
  };
};

export const getEntitiesExport: ICrudGetAllActionAtendimentoAceite<IAtendimentoAceite> = (msgPush, page, size, sort) => {
  const msgPushRequest = msgPush ? `msgPush.contains=${msgPush}&` : '';

  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}&` : '?'}`;
  return {
    type: ACTION_TYPES.FETCH_ATENDIMENTOACEITE_LIST,
    payload: axios.get<IAtendimentoAceite>(`${requestUrl}${msgPushRequest}cacheBuster=${new Date().getTime()}`)
  };
};

export const createEntity: ICrudPutAction<IAtendimentoAceite> = entity => async dispatch => {
  entity = {
    ...entity
  };
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_ATENDIMENTOACEITE,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IAtendimentoAceite> = entity => async dispatch => {
  entity = { ...entity };
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_ATENDIMENTOACEITE,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IAtendimentoAceite> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_ATENDIMENTOACEITE,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});

export const getAtendimentoAceiteState = (location): IAtendimentoAceiteBaseState => {
  const url = new URL(`http://localhost${location.search}`); // using a dummy url for parsing
  const baseFilters = url.searchParams.get('baseFilters') || '';
  const msgPush = url.searchParams.get('msgPush') || '';

  return {
    baseFilters,
    msgPush
  };
};
