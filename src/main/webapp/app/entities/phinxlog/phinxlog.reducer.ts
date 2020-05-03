/* eslint complexity: ["error", 100] */
import axios from 'axios';
import { ICrudGetAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { IPayload } from 'react-jhipster/src/type/redux-action.type';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IPhinxlog, defaultValue } from 'app/shared/model/phinxlog.model';

export const ACTION_TYPES = {
  FETCH_PHINXLOG_LIST: 'phinxlog/FETCH_PHINXLOG_LIST',
  FETCH_PHINXLOG: 'phinxlog/FETCH_PHINXLOG',
  CREATE_PHINXLOG: 'phinxlog/CREATE_PHINXLOG',
  UPDATE_PHINXLOG: 'phinxlog/UPDATE_PHINXLOG',
  DELETE_PHINXLOG: 'phinxlog/DELETE_PHINXLOG',
  RESET: 'phinxlog/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IPhinxlog>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type PhinxlogState = Readonly<typeof initialState>;

// Reducer

export default (state: PhinxlogState = initialState, action): PhinxlogState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_PHINXLOG_LIST):
    case REQUEST(ACTION_TYPES.FETCH_PHINXLOG):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_PHINXLOG):
    case REQUEST(ACTION_TYPES.UPDATE_PHINXLOG):
    case REQUEST(ACTION_TYPES.DELETE_PHINXLOG):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_PHINXLOG_LIST):
    case FAILURE(ACTION_TYPES.FETCH_PHINXLOG):
    case FAILURE(ACTION_TYPES.CREATE_PHINXLOG):
    case FAILURE(ACTION_TYPES.UPDATE_PHINXLOG):
    case FAILURE(ACTION_TYPES.DELETE_PHINXLOG):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_PHINXLOG_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10)
      };
    case SUCCESS(ACTION_TYPES.FETCH_PHINXLOG):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_PHINXLOG):
    case SUCCESS(ACTION_TYPES.UPDATE_PHINXLOG):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_PHINXLOG):
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

const apiUrl = 'api/phinxlogs';

// Actions

// Actions
export type ICrudGetAllActionPhinxlog<T> = (
  version?: any,
  migrationName?: any,
  startTime?: any,
  endTime?: any,
  breakpoint?: any,
  page?: number,
  size?: number,
  sort?: string
) => IPayload<T> | ((dispatch: any) => IPayload<T>);

export const getEntities: ICrudGetAllActionPhinxlog<IPhinxlog> = (
  version,
  migrationName,
  startTime,
  endTime,
  breakpoint,
  page,
  size,
  sort
) => {
  const versionRequest = version ? `version.contains=${version}&` : '';
  const migrationNameRequest = migrationName ? `migrationName.contains=${migrationName}&` : '';
  const startTimeRequest = startTime ? `startTime.contains=${startTime}&` : '';
  const endTimeRequest = endTime ? `endTime.contains=${endTime}&` : '';
  const breakpointRequest = breakpoint ? `breakpoint.contains=${breakpoint}&` : '';

  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}&` : '?'}`;
  return {
    type: ACTION_TYPES.FETCH_PHINXLOG_LIST,
    payload: axios.get<IPhinxlog>(
      `${requestUrl}${versionRequest}${migrationNameRequest}${startTimeRequest}${endTimeRequest}${breakpointRequest}cacheBuster=${new Date().getTime()}`
    )
  };
};
export const getEntity: ICrudGetAction<IPhinxlog> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_PHINXLOG,
    payload: axios.get<IPhinxlog>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IPhinxlog> = entity => async dispatch => {
  entity = {
    ...entity
  };
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_PHINXLOG,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IPhinxlog> = entity => async dispatch => {
  entity = { ...entity };
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_PHINXLOG,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IPhinxlog> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_PHINXLOG,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
