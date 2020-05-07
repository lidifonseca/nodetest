/* eslint complexity: ["error", 100] */
import axios from 'axios';
import { ICrudGetAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { IPayload } from 'react-jhipster/src/type/redux-action.type';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { ILogUser, defaultValue } from 'app/shared/model/log-user.model';

export const ACTION_TYPES = {
  FETCH_LOGUSER_LIST_EXPORT: 'logUser/FETCH_LOGUSER_LIST_EXPORT',
  FETCH_LOGUSER_LIST: 'logUser/FETCH_LOGUSER_LIST',
  FETCH_LOGUSER: 'logUser/FETCH_LOGUSER',
  CREATE_LOGUSER: 'logUser/CREATE_LOGUSER',
  UPDATE_LOGUSER: 'logUser/UPDATE_LOGUSER',
  DELETE_LOGUSER: 'logUser/DELETE_LOGUSER',
  SET_BLOB: 'logUser/SET_BLOB',
  RESET: 'logUser/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<ILogUser>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type LogUserState = Readonly<typeof initialState>;

export interface ILogUserBaseState {
  baseFilters: any;
  descricao: any;
}

export interface ILogUserUpdateState {
  fieldsBase: ILogUserBaseState;
  isNew: boolean;
}

// Reducer

export default (state: LogUserState = initialState, action): LogUserState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_LOGUSER_LIST_EXPORT):
    case REQUEST(ACTION_TYPES.FETCH_LOGUSER_LIST):
    case REQUEST(ACTION_TYPES.FETCH_LOGUSER):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_LOGUSER):
    case REQUEST(ACTION_TYPES.UPDATE_LOGUSER):
    case REQUEST(ACTION_TYPES.DELETE_LOGUSER):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_LOGUSER_LIST_EXPORT):
    case FAILURE(ACTION_TYPES.FETCH_LOGUSER_LIST):
    case FAILURE(ACTION_TYPES.FETCH_LOGUSER):
    case FAILURE(ACTION_TYPES.CREATE_LOGUSER):
    case FAILURE(ACTION_TYPES.UPDATE_LOGUSER):
    case FAILURE(ACTION_TYPES.DELETE_LOGUSER):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_LOGUSER_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10)
      };
    case SUCCESS(ACTION_TYPES.FETCH_LOGUSER):
      action.payload.data.descricao = action.payload.data.descricao
        ? Buffer.from(action.payload.data.descricao).toString()
        : action.payload.data.descricao;
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_LOGUSER):
    case SUCCESS(ACTION_TYPES.UPDATE_LOGUSER):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_LOGUSER):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {}
      };
    case ACTION_TYPES.SET_BLOB: {
      const { name, data, contentType, fileName } = action.payload;
      return {
        ...state,
        entity: {
          ...state.entity,
          [name + 'Base64']: data,
          [name + 'ContentType']: contentType,
          [name + 'FileName']: fileName
        }
      };
    }
    case ACTION_TYPES.RESET:
      return {
        ...initialState
      };
    default:
      return state;
  }
};

const apiUrl = 'api/log-users';

// Actions

// Actions
export type ICrudGetAllActionLogUser<T> = (
  descricao?: any,
  page?: number,
  size?: number,
  sort?: string
) => IPayload<T> | ((dispatch: any) => IPayload<T>);

export const getEntities: ICrudGetAllActionLogUser<ILogUser> = (descricao, page, size, sort) => {
  const descricaoRequest = descricao ? `descricao.contains=${descricao}&` : '';

  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}&` : '?'}`;
  return {
    type: ACTION_TYPES.FETCH_LOGUSER_LIST,
    payload: axios.get<ILogUser>(`${requestUrl}${descricaoRequest}cacheBuster=${new Date().getTime()}`)
  };
};
export const getEntity: ICrudGetAction<ILogUser> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_LOGUSER,
    payload: axios.get<ILogUser>(requestUrl)
  };
};

export const getEntitiesExport: ICrudGetAllActionLogUser<ILogUser> = (descricao, page, size, sort) => {
  const descricaoRequest = descricao ? `descricao.contains=${descricao}&` : '';

  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}&` : '?'}`;
  return {
    type: ACTION_TYPES.FETCH_LOGUSER_LIST,
    payload: axios.get<ILogUser>(`${requestUrl}${descricaoRequest}cacheBuster=${new Date().getTime()}`)
  };
};

export const createEntity: ICrudPutAction<ILogUser> = entity => async dispatch => {
  entity = {
    ...entity
  };
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_LOGUSER,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<ILogUser> = entity => async dispatch => {
  entity = { ...entity };
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_LOGUSER,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<ILogUser> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_LOGUSER,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const setBlob = (name, data, contentType?, fileName?) => ({
  type: ACTION_TYPES.SET_BLOB,
  payload: {
    name,
    data,
    contentType,
    fileName
  }
});

export const reset = () => ({
  type: ACTION_TYPES.RESET
});

export const getLogUserState = (location): ILogUserBaseState => {
  const url = new URL(`http://localhost${location.search}`); // using a dummy url for parsing
  const baseFilters = url.searchParams.get('baseFilters') || '';
  const descricao = url.searchParams.get('descricao') || '';

  return {
    baseFilters,
    descricao
  };
};
