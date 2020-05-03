/* eslint complexity: ["error", 100] */
import axios from 'axios';
import { ICrudGetAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { IPayload } from 'react-jhipster/src/type/redux-action.type';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IApiReturn, defaultValue } from 'app/shared/model/api-return.model';

export const ACTION_TYPES = {
  FETCH_APIRETURN_LIST: 'apiReturn/FETCH_APIRETURN_LIST',
  FETCH_APIRETURN: 'apiReturn/FETCH_APIRETURN',
  CREATE_APIRETURN: 'apiReturn/CREATE_APIRETURN',
  UPDATE_APIRETURN: 'apiReturn/UPDATE_APIRETURN',
  DELETE_APIRETURN: 'apiReturn/DELETE_APIRETURN',
  RESET: 'apiReturn/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IApiReturn>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type ApiReturnState = Readonly<typeof initialState>;

// Reducer

export default (state: ApiReturnState = initialState, action): ApiReturnState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_APIRETURN_LIST):
    case REQUEST(ACTION_TYPES.FETCH_APIRETURN):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_APIRETURN):
    case REQUEST(ACTION_TYPES.UPDATE_APIRETURN):
    case REQUEST(ACTION_TYPES.DELETE_APIRETURN):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_APIRETURN_LIST):
    case FAILURE(ACTION_TYPES.FETCH_APIRETURN):
    case FAILURE(ACTION_TYPES.CREATE_APIRETURN):
    case FAILURE(ACTION_TYPES.UPDATE_APIRETURN):
    case FAILURE(ACTION_TYPES.DELETE_APIRETURN):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_APIRETURN_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10)
      };
    case SUCCESS(ACTION_TYPES.FETCH_APIRETURN):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_APIRETURN):
    case SUCCESS(ACTION_TYPES.UPDATE_APIRETURN):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_APIRETURN):
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

const apiUrl = 'api/api-returns';

// Actions

// Actions
export type ICrudGetAllActionApiReturn<T> = (
  idApiName?: any,
  apiReturn?: any,
  apiType?: any,
  obs?: any,
  ativo?: any,
  page?: number,
  size?: number,
  sort?: string
) => IPayload<T> | ((dispatch: any) => IPayload<T>);

export const getEntities: ICrudGetAllActionApiReturn<IApiReturn> = (idApiName, apiReturn, apiType, obs, ativo, page, size, sort) => {
  const idApiNameRequest = idApiName ? `idApiName.contains=${idApiName}&` : '';
  const apiReturnRequest = apiReturn ? `apiReturn.contains=${apiReturn}&` : '';
  const apiTypeRequest = apiType ? `apiType.contains=${apiType}&` : '';
  const obsRequest = obs ? `obs.contains=${obs}&` : '';
  const ativoRequest = ativo ? `ativo.contains=${ativo}&` : '';

  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}&` : '?'}`;
  return {
    type: ACTION_TYPES.FETCH_APIRETURN_LIST,
    payload: axios.get<IApiReturn>(
      `${requestUrl}${idApiNameRequest}${apiReturnRequest}${apiTypeRequest}${obsRequest}${ativoRequest}cacheBuster=${new Date().getTime()}`
    )
  };
};
export const getEntity: ICrudGetAction<IApiReturn> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_APIRETURN,
    payload: axios.get<IApiReturn>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IApiReturn> = entity => async dispatch => {
  entity = {
    ...entity
  };
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_APIRETURN,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IApiReturn> = entity => async dispatch => {
  entity = { ...entity };
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_APIRETURN,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IApiReturn> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_APIRETURN,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
