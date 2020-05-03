/* eslint complexity: ["error", 100] */
import axios from 'axios';
import { ICrudGetAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { IPayload } from 'react-jhipster/src/type/redux-action.type';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IApiInput, defaultValue } from 'app/shared/model/api-input.model';

export const ACTION_TYPES = {
  FETCH_APIINPUT_LIST: 'apiInput/FETCH_APIINPUT_LIST',
  FETCH_APIINPUT: 'apiInput/FETCH_APIINPUT',
  CREATE_APIINPUT: 'apiInput/CREATE_APIINPUT',
  UPDATE_APIINPUT: 'apiInput/UPDATE_APIINPUT',
  DELETE_APIINPUT: 'apiInput/DELETE_APIINPUT',
  RESET: 'apiInput/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IApiInput>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type ApiInputState = Readonly<typeof initialState>;

// Reducer

export default (state: ApiInputState = initialState, action): ApiInputState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_APIINPUT_LIST):
    case REQUEST(ACTION_TYPES.FETCH_APIINPUT):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_APIINPUT):
    case REQUEST(ACTION_TYPES.UPDATE_APIINPUT):
    case REQUEST(ACTION_TYPES.DELETE_APIINPUT):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_APIINPUT_LIST):
    case FAILURE(ACTION_TYPES.FETCH_APIINPUT):
    case FAILURE(ACTION_TYPES.CREATE_APIINPUT):
    case FAILURE(ACTION_TYPES.UPDATE_APIINPUT):
    case FAILURE(ACTION_TYPES.DELETE_APIINPUT):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_APIINPUT_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10)
      };
    case SUCCESS(ACTION_TYPES.FETCH_APIINPUT):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_APIINPUT):
    case SUCCESS(ACTION_TYPES.UPDATE_APIINPUT):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_APIINPUT):
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

const apiUrl = 'api/api-inputs';

// Actions

// Actions
export type ICrudGetAllActionApiInput<T> = (
  idApiName?: any,
  apiInput?: any,
  apiType?: any,
  obs?: any,
  ativo?: any,
  page?: number,
  size?: number,
  sort?: string
) => IPayload<T> | ((dispatch: any) => IPayload<T>);

export const getEntities: ICrudGetAllActionApiInput<IApiInput> = (idApiName, apiInput, apiType, obs, ativo, page, size, sort) => {
  const idApiNameRequest = idApiName ? `idApiName.contains=${idApiName}&` : '';
  const apiInputRequest = apiInput ? `apiInput.contains=${apiInput}&` : '';
  const apiTypeRequest = apiType ? `apiType.contains=${apiType}&` : '';
  const obsRequest = obs ? `obs.contains=${obs}&` : '';
  const ativoRequest = ativo ? `ativo.contains=${ativo}&` : '';

  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}&` : '?'}`;
  return {
    type: ACTION_TYPES.FETCH_APIINPUT_LIST,
    payload: axios.get<IApiInput>(
      `${requestUrl}${idApiNameRequest}${apiInputRequest}${apiTypeRequest}${obsRequest}${ativoRequest}cacheBuster=${new Date().getTime()}`
    )
  };
};
export const getEntity: ICrudGetAction<IApiInput> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_APIINPUT,
    payload: axios.get<IApiInput>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IApiInput> = entity => async dispatch => {
  entity = {
    ...entity
  };
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_APIINPUT,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IApiInput> = entity => async dispatch => {
  entity = { ...entity };
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_APIINPUT,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IApiInput> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_APIINPUT,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
