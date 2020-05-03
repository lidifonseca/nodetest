/* eslint complexity: ["error", 100] */
import axios from 'axios';
import { ICrudGetAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { IPayload } from 'react-jhipster/src/type/redux-action.type';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { ILogPacAcesso, defaultValue } from 'app/shared/model/log-pac-acesso.model';

export const ACTION_TYPES = {
  FETCH_LOGPACACESSO_LIST: 'logPacAcesso/FETCH_LOGPACACESSO_LIST',
  FETCH_LOGPACACESSO: 'logPacAcesso/FETCH_LOGPACACESSO',
  CREATE_LOGPACACESSO: 'logPacAcesso/CREATE_LOGPACACESSO',
  UPDATE_LOGPACACESSO: 'logPacAcesso/UPDATE_LOGPACACESSO',
  DELETE_LOGPACACESSO: 'logPacAcesso/DELETE_LOGPACACESSO',
  RESET: 'logPacAcesso/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<ILogPacAcesso>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type LogPacAcessoState = Readonly<typeof initialState>;

// Reducer

export default (state: LogPacAcessoState = initialState, action): LogPacAcessoState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_LOGPACACESSO_LIST):
    case REQUEST(ACTION_TYPES.FETCH_LOGPACACESSO):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_LOGPACACESSO):
    case REQUEST(ACTION_TYPES.UPDATE_LOGPACACESSO):
    case REQUEST(ACTION_TYPES.DELETE_LOGPACACESSO):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_LOGPACACESSO_LIST):
    case FAILURE(ACTION_TYPES.FETCH_LOGPACACESSO):
    case FAILURE(ACTION_TYPES.CREATE_LOGPACACESSO):
    case FAILURE(ACTION_TYPES.UPDATE_LOGPACACESSO):
    case FAILURE(ACTION_TYPES.DELETE_LOGPACACESSO):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_LOGPACACESSO_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10)
      };
    case SUCCESS(ACTION_TYPES.FETCH_LOGPACACESSO):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_LOGPACACESSO):
    case SUCCESS(ACTION_TYPES.UPDATE_LOGPACACESSO):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_LOGPACACESSO):
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

const apiUrl = 'api/log-pac-acessos';

// Actions

// Actions
export type ICrudGetAllActionLogPacAcesso<T> = (
  idPaciente?: any,
  profissional?: any,
  token?: any,
  ipLocal?: any,
  inforAcesso?: any,
  dataPost?: any,
  page?: number,
  size?: number,
  sort?: string
) => IPayload<T> | ((dispatch: any) => IPayload<T>);

export const getEntities: ICrudGetAllActionLogPacAcesso<ILogPacAcesso> = (
  idPaciente,
  profissional,
  token,
  ipLocal,
  inforAcesso,
  dataPost,
  page,
  size,
  sort
) => {
  const idPacienteRequest = idPaciente ? `idPaciente.contains=${idPaciente}&` : '';
  const profissionalRequest = profissional ? `profissional.contains=${profissional}&` : '';
  const tokenRequest = token ? `token.contains=${token}&` : '';
  const ipLocalRequest = ipLocal ? `ipLocal.contains=${ipLocal}&` : '';
  const inforAcessoRequest = inforAcesso ? `inforAcesso.contains=${inforAcesso}&` : '';
  const dataPostRequest = dataPost ? `dataPost.contains=${dataPost}&` : '';

  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}&` : '?'}`;
  return {
    type: ACTION_TYPES.FETCH_LOGPACACESSO_LIST,
    payload: axios.get<ILogPacAcesso>(
      `${requestUrl}${idPacienteRequest}${profissionalRequest}${tokenRequest}${ipLocalRequest}${inforAcessoRequest}${dataPostRequest}cacheBuster=${new Date().getTime()}`
    )
  };
};
export const getEntity: ICrudGetAction<ILogPacAcesso> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_LOGPACACESSO,
    payload: axios.get<ILogPacAcesso>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<ILogPacAcesso> = entity => async dispatch => {
  entity = {
    ...entity
  };
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_LOGPACACESSO,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<ILogPacAcesso> = entity => async dispatch => {
  entity = { ...entity };
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_LOGPACACESSO,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<ILogPacAcesso> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_LOGPACACESSO,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
