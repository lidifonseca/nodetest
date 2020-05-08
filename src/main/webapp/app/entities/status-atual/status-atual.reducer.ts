/* eslint complexity: ["error", 100] */
import axios from 'axios';
import { ICrudGetAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { IPayload } from 'react-jhipster/src/type/redux-action.type';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IStatusAtual, defaultValue } from 'app/shared/model/status-atual.model';

export const ACTION_TYPES = {
  FETCH_STATUSATUAL_LIST_EXPORT: 'statusAtual/FETCH_STATUSATUAL_LIST_EXPORT',
  FETCH_STATUSATUAL_LIST: 'statusAtual/FETCH_STATUSATUAL_LIST',
  FETCH_STATUSATUAL: 'statusAtual/FETCH_STATUSATUAL',
  CREATE_STATUSATUAL: 'statusAtual/CREATE_STATUSATUAL',
  UPDATE_STATUSATUAL: 'statusAtual/UPDATE_STATUSATUAL',
  DELETE_STATUSATUAL: 'statusAtual/DELETE_STATUSATUAL',
  RESET: 'statusAtual/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IStatusAtual>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type StatusAtualState = Readonly<typeof initialState>;

export interface IStatusAtualBaseState {
  baseFilters: any;
  statusAtual: any;
  styleLabel: any;
}

export interface IStatusAtualUpdateState {
  fieldsBase: IStatusAtualBaseState;

  isNew: boolean;
}

// Reducer

export default (state: StatusAtualState = initialState, action): StatusAtualState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_STATUSATUAL_LIST_EXPORT):
    case REQUEST(ACTION_TYPES.FETCH_STATUSATUAL_LIST):
    case REQUEST(ACTION_TYPES.FETCH_STATUSATUAL):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_STATUSATUAL):
    case REQUEST(ACTION_TYPES.UPDATE_STATUSATUAL):
    case REQUEST(ACTION_TYPES.DELETE_STATUSATUAL):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_STATUSATUAL_LIST_EXPORT):
    case FAILURE(ACTION_TYPES.FETCH_STATUSATUAL_LIST):
    case FAILURE(ACTION_TYPES.FETCH_STATUSATUAL):
    case FAILURE(ACTION_TYPES.CREATE_STATUSATUAL):
    case FAILURE(ACTION_TYPES.UPDATE_STATUSATUAL):
    case FAILURE(ACTION_TYPES.DELETE_STATUSATUAL):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_STATUSATUAL_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10)
      };
    case SUCCESS(ACTION_TYPES.FETCH_STATUSATUAL):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_STATUSATUAL):
    case SUCCESS(ACTION_TYPES.UPDATE_STATUSATUAL):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_STATUSATUAL):
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

const apiUrl = 'api/status-atuals';

// Actions

// Actions
export type ICrudGetAllActionStatusAtual<T> = (
  statusAtual?: any,
  styleLabel?: any,
  page?: number,
  size?: number,
  sort?: string
) => IPayload<T> | ((dispatch: any) => IPayload<T>);

export const getEntities: ICrudGetAllActionStatusAtual<IStatusAtual> = (statusAtual, styleLabel, page, size, sort) => {
  const statusAtualRequest = statusAtual ? `statusAtual.contains=${statusAtual}&` : '';
  const styleLabelRequest = styleLabel ? `styleLabel.contains=${styleLabel}&` : '';

  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}&` : '?'}`;
  return {
    type: ACTION_TYPES.FETCH_STATUSATUAL_LIST,
    payload: axios.get<IStatusAtual>(`${requestUrl}${statusAtualRequest}${styleLabelRequest}cacheBuster=${new Date().getTime()}`)
  };
};
export const getEntity: ICrudGetAction<IStatusAtual> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_STATUSATUAL,
    payload: axios.get<IStatusAtual>(requestUrl)
  };
};

export const getEntitiesExport: ICrudGetAllActionStatusAtual<IStatusAtual> = (statusAtual, styleLabel, page, size, sort) => {
  const statusAtualRequest = statusAtual ? `statusAtual.contains=${statusAtual}&` : '';
  const styleLabelRequest = styleLabel ? `styleLabel.contains=${styleLabel}&` : '';

  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}&` : '?'}`;
  return {
    type: ACTION_TYPES.FETCH_STATUSATUAL_LIST,
    payload: axios.get<IStatusAtual>(`${requestUrl}${statusAtualRequest}${styleLabelRequest}cacheBuster=${new Date().getTime()}`)
  };
};

export const createEntity: ICrudPutAction<IStatusAtual> = entity => async dispatch => {
  entity = {
    ...entity
  };
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_STATUSATUAL,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IStatusAtual> = entity => async dispatch => {
  entity = { ...entity };
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_STATUSATUAL,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IStatusAtual> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_STATUSATUAL,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});

export const getStatusAtualState = (location): IStatusAtualBaseState => {
  const url = new URL(`http://localhost${location.search}`); // using a dummy url for parsing
  const baseFilters = url.searchParams.get('baseFilters') || '';
  const statusAtual = url.searchParams.get('statusAtual') || '';
  const styleLabel = url.searchParams.get('styleLabel') || '';

  return {
    baseFilters,
    statusAtual,
    styleLabel
  };
};
