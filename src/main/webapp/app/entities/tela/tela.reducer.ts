/* eslint complexity: ["error", 100] */
import axios from 'axios';
import { ICrudGetAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { IPayload } from 'react-jhipster/src/type/redux-action.type';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { ITela, defaultValue } from 'app/shared/model/tela.model';

export const ACTION_TYPES = {
  FETCH_TELA_LIST: 'tela/FETCH_TELA_LIST',
  FETCH_TELA: 'tela/FETCH_TELA',
  CREATE_TELA: 'tela/CREATE_TELA',
  UPDATE_TELA: 'tela/UPDATE_TELA',
  DELETE_TELA: 'tela/DELETE_TELA',
  RESET: 'tela/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<ITela>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type TelaState = Readonly<typeof initialState>;

// Reducer

export default (state: TelaState = initialState, action): TelaState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_TELA_LIST):
    case REQUEST(ACTION_TYPES.FETCH_TELA):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_TELA):
    case REQUEST(ACTION_TYPES.UPDATE_TELA):
    case REQUEST(ACTION_TYPES.DELETE_TELA):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_TELA_LIST):
    case FAILURE(ACTION_TYPES.FETCH_TELA):
    case FAILURE(ACTION_TYPES.CREATE_TELA):
    case FAILURE(ACTION_TYPES.UPDATE_TELA):
    case FAILURE(ACTION_TYPES.DELETE_TELA):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_TELA_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10)
      };
    case SUCCESS(ACTION_TYPES.FETCH_TELA):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_TELA):
    case SUCCESS(ACTION_TYPES.UPDATE_TELA):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_TELA):
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

const apiUrl = 'api/telas';

// Actions

// Actions
export type ICrudGetAllActionTela<T> = (
  tela?: any,
  logUser?: any,
  logUserFranquia?: any,
  usuarioAcao?: any,
  page?: number,
  size?: number,
  sort?: string
) => IPayload<T> | ((dispatch: any) => IPayload<T>);

export const getEntities: ICrudGetAllActionTela<ITela> = (tela, logUser, logUserFranquia, usuarioAcao, page, size, sort) => {
  const telaRequest = tela ? `tela.contains=${tela}&` : '';
  const logUserRequest = logUser ? `logUser.equals=${logUser}&` : '';
  const logUserFranquiaRequest = logUserFranquia ? `logUserFranquia.equals=${logUserFranquia}&` : '';
  const usuarioAcaoRequest = usuarioAcao ? `usuarioAcao.equals=${usuarioAcao}&` : '';

  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}&` : '?'}`;
  return {
    type: ACTION_TYPES.FETCH_TELA_LIST,
    payload: axios.get<ITela>(
      `${requestUrl}${telaRequest}${logUserRequest}${logUserFranquiaRequest}${usuarioAcaoRequest}cacheBuster=${new Date().getTime()}`
    )
  };
};
export const getEntity: ICrudGetAction<ITela> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_TELA,
    payload: axios.get<ITela>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<ITela> = entity => async dispatch => {
  entity = {
    ...entity
  };
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_TELA,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<ITela> = entity => async dispatch => {
  entity = { ...entity };
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_TELA,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<ITela> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_TELA,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
