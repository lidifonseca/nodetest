/* eslint complexity: ["error", 100] */
import axios from 'axios';
import { ICrudGetAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { IPayload } from 'react-jhipster/src/type/redux-action.type';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IApiName, defaultValue } from 'app/shared/model/api-name.model';

export const ACTION_TYPES = {
  FETCH_APINAME_LIST: 'apiName/FETCH_APINAME_LIST',
  FETCH_APINAME: 'apiName/FETCH_APINAME',
  CREATE_APINAME: 'apiName/CREATE_APINAME',
  UPDATE_APINAME: 'apiName/UPDATE_APINAME',
  DELETE_APINAME: 'apiName/DELETE_APINAME',
  RESET: 'apiName/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IApiName>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type ApiNameState = Readonly<typeof initialState>;

// Reducer

export default (state: ApiNameState = initialState, action): ApiNameState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_APINAME_LIST):
    case REQUEST(ACTION_TYPES.FETCH_APINAME):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_APINAME):
    case REQUEST(ACTION_TYPES.UPDATE_APINAME):
    case REQUEST(ACTION_TYPES.DELETE_APINAME):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_APINAME_LIST):
    case FAILURE(ACTION_TYPES.FETCH_APINAME):
    case FAILURE(ACTION_TYPES.CREATE_APINAME):
    case FAILURE(ACTION_TYPES.UPDATE_APINAME):
    case FAILURE(ACTION_TYPES.DELETE_APINAME):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_APINAME_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10)
      };
    case SUCCESS(ACTION_TYPES.FETCH_APINAME):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_APINAME):
    case SUCCESS(ACTION_TYPES.UPDATE_APINAME):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_APINAME):
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

const apiUrl = 'api/api-names';

// Actions

// Actions
export type ICrudGetAllActionApiName<T> = (
  apiName?: any,
  apiReceiver?: any,
  apiObs?: any,
  ativo?: any,
  page?: number,
  size?: number,
  sort?: string
) => IPayload<T> | ((dispatch: any) => IPayload<T>);

export const getEntities: ICrudGetAllActionApiName<IApiName> = (apiName, apiReceiver, apiObs, ativo, page, size, sort) => {
  const apiNameRequest = apiName ? `apiName.contains=${apiName}&` : '';
  const apiReceiverRequest = apiReceiver ? `apiReceiver.contains=${apiReceiver}&` : '';
  const apiObsRequest = apiObs ? `apiObs.contains=${apiObs}&` : '';
  const ativoRequest = ativo ? `ativo.contains=${ativo}&` : '';

  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}&` : '?'}`;
  return {
    type: ACTION_TYPES.FETCH_APINAME_LIST,
    payload: axios.get<IApiName>(
      `${requestUrl}${apiNameRequest}${apiReceiverRequest}${apiObsRequest}${ativoRequest}cacheBuster=${new Date().getTime()}`
    )
  };
};
export const getEntity: ICrudGetAction<IApiName> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_APINAME,
    payload: axios.get<IApiName>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IApiName> = entity => async dispatch => {
  entity = {
    ...entity
  };
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_APINAME,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IApiName> = entity => async dispatch => {
  entity = { ...entity };
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_APINAME,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IApiName> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_APINAME,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
