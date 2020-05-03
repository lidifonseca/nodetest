/* eslint complexity: ["error", 100] */
import axios from 'axios';
import { ICrudGetAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { IPayload } from 'react-jhipster/src/type/redux-action.type';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IAcao, defaultValue } from 'app/shared/model/acao.model';

export const ACTION_TYPES = {
  FETCH_ACAO_LIST: 'acao/FETCH_ACAO_LIST',
  FETCH_ACAO: 'acao/FETCH_ACAO',
  CREATE_ACAO: 'acao/CREATE_ACAO',
  UPDATE_ACAO: 'acao/UPDATE_ACAO',
  DELETE_ACAO: 'acao/DELETE_ACAO',
  RESET: 'acao/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IAcao>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type AcaoState = Readonly<typeof initialState>;

// Reducer

export default (state: AcaoState = initialState, action): AcaoState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_ACAO_LIST):
    case REQUEST(ACTION_TYPES.FETCH_ACAO):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_ACAO):
    case REQUEST(ACTION_TYPES.UPDATE_ACAO):
    case REQUEST(ACTION_TYPES.DELETE_ACAO):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_ACAO_LIST):
    case FAILURE(ACTION_TYPES.FETCH_ACAO):
    case FAILURE(ACTION_TYPES.CREATE_ACAO):
    case FAILURE(ACTION_TYPES.UPDATE_ACAO):
    case FAILURE(ACTION_TYPES.DELETE_ACAO):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_ACAO_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10)
      };
    case SUCCESS(ACTION_TYPES.FETCH_ACAO):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_ACAO):
    case SUCCESS(ACTION_TYPES.UPDATE_ACAO):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_ACAO):
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

const apiUrl = 'api/acaos';

// Actions

// Actions
export type ICrudGetAllActionAcao<T> = (
  acao?: any,
  logUser?: any,
  logUserFranquia?: any,
  usuarioAcao?: any,
  page?: number,
  size?: number,
  sort?: string
) => IPayload<T> | ((dispatch: any) => IPayload<T>);

export const getEntities: ICrudGetAllActionAcao<IAcao> = (acao, logUser, logUserFranquia, usuarioAcao, page, size, sort) => {
  const acaoRequest = acao ? `acao.contains=${acao}&` : '';
  const logUserRequest = logUser ? `logUser.equals=${logUser}&` : '';
  const logUserFranquiaRequest = logUserFranquia ? `logUserFranquia.equals=${logUserFranquia}&` : '';
  const usuarioAcaoRequest = usuarioAcao ? `usuarioAcao.equals=${usuarioAcao}&` : '';

  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}&` : '?'}`;
  return {
    type: ACTION_TYPES.FETCH_ACAO_LIST,
    payload: axios.get<IAcao>(
      `${requestUrl}${acaoRequest}${logUserRequest}${logUserFranquiaRequest}${usuarioAcaoRequest}cacheBuster=${new Date().getTime()}`
    )
  };
};
export const getEntity: ICrudGetAction<IAcao> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_ACAO,
    payload: axios.get<IAcao>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IAcao> = entity => async dispatch => {
  entity = {
    ...entity
  };
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_ACAO,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IAcao> = entity => async dispatch => {
  entity = { ...entity };
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_ACAO,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IAcao> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_ACAO,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
