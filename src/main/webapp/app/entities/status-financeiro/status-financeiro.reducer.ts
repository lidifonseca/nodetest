/* eslint complexity: ["error", 100] */
import axios from 'axios';
import { ICrudGetAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { IPayload } from 'react-jhipster/src/type/redux-action.type';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IStatusFinanceiro, defaultValue } from 'app/shared/model/status-financeiro.model';

export const ACTION_TYPES = {
  FETCH_STATUSFINANCEIRO_LIST: 'statusFinanceiro/FETCH_STATUSFINANCEIRO_LIST',
  FETCH_STATUSFINANCEIRO: 'statusFinanceiro/FETCH_STATUSFINANCEIRO',
  CREATE_STATUSFINANCEIRO: 'statusFinanceiro/CREATE_STATUSFINANCEIRO',
  UPDATE_STATUSFINANCEIRO: 'statusFinanceiro/UPDATE_STATUSFINANCEIRO',
  DELETE_STATUSFINANCEIRO: 'statusFinanceiro/DELETE_STATUSFINANCEIRO',
  RESET: 'statusFinanceiro/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IStatusFinanceiro>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type StatusFinanceiroState = Readonly<typeof initialState>;

// Reducer

export default (state: StatusFinanceiroState = initialState, action): StatusFinanceiroState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_STATUSFINANCEIRO_LIST):
    case REQUEST(ACTION_TYPES.FETCH_STATUSFINANCEIRO):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_STATUSFINANCEIRO):
    case REQUEST(ACTION_TYPES.UPDATE_STATUSFINANCEIRO):
    case REQUEST(ACTION_TYPES.DELETE_STATUSFINANCEIRO):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_STATUSFINANCEIRO_LIST):
    case FAILURE(ACTION_TYPES.FETCH_STATUSFINANCEIRO):
    case FAILURE(ACTION_TYPES.CREATE_STATUSFINANCEIRO):
    case FAILURE(ACTION_TYPES.UPDATE_STATUSFINANCEIRO):
    case FAILURE(ACTION_TYPES.DELETE_STATUSFINANCEIRO):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_STATUSFINANCEIRO_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10)
      };
    case SUCCESS(ACTION_TYPES.FETCH_STATUSFINANCEIRO):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_STATUSFINANCEIRO):
    case SUCCESS(ACTION_TYPES.UPDATE_STATUSFINANCEIRO):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_STATUSFINANCEIRO):
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

const apiUrl = 'api/status-financeiros';

// Actions

// Actions
export type ICrudGetAllActionStatusFinanceiro<T> = (
  nome?: any,
  ativo?: any,
  dataPost?: any,
  page?: number,
  size?: number,
  sort?: string
) => IPayload<T> | ((dispatch: any) => IPayload<T>);

export const getEntities: ICrudGetAllActionStatusFinanceiro<IStatusFinanceiro> = (nome, ativo, dataPost, page, size, sort) => {
  const nomeRequest = nome ? `nome.contains=${nome}&` : '';
  const ativoRequest = ativo ? `ativo.contains=${ativo}&` : '';
  const dataPostRequest = dataPost ? `dataPost.contains=${dataPost}&` : '';

  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}&` : '?'}`;
  return {
    type: ACTION_TYPES.FETCH_STATUSFINANCEIRO_LIST,
    payload: axios.get<IStatusFinanceiro>(`${requestUrl}${nomeRequest}${ativoRequest}${dataPostRequest}cacheBuster=${new Date().getTime()}`)
  };
};
export const getEntity: ICrudGetAction<IStatusFinanceiro> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_STATUSFINANCEIRO,
    payload: axios.get<IStatusFinanceiro>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IStatusFinanceiro> = entity => async dispatch => {
  entity = {
    ...entity
  };
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_STATUSFINANCEIRO,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IStatusFinanceiro> = entity => async dispatch => {
  entity = { ...entity };
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_STATUSFINANCEIRO,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IStatusFinanceiro> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_STATUSFINANCEIRO,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
