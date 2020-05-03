/* eslint complexity: ["error", 100] */
import axios from 'axios';
import { ICrudGetAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { IPayload } from 'react-jhipster/src/type/redux-action.type';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IPadItemHistDataIncComp, defaultValue } from 'app/shared/model/pad-item-hist-data-inc-comp.model';

export const ACTION_TYPES = {
  FETCH_PADITEMHISTDATAINCCOMP_LIST: 'padItemHistDataIncComp/FETCH_PADITEMHISTDATAINCCOMP_LIST',
  FETCH_PADITEMHISTDATAINCCOMP: 'padItemHistDataIncComp/FETCH_PADITEMHISTDATAINCCOMP',
  CREATE_PADITEMHISTDATAINCCOMP: 'padItemHistDataIncComp/CREATE_PADITEMHISTDATAINCCOMP',
  UPDATE_PADITEMHISTDATAINCCOMP: 'padItemHistDataIncComp/UPDATE_PADITEMHISTDATAINCCOMP',
  DELETE_PADITEMHISTDATAINCCOMP: 'padItemHistDataIncComp/DELETE_PADITEMHISTDATAINCCOMP',
  RESET: 'padItemHistDataIncComp/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IPadItemHistDataIncComp>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type PadItemHistDataIncCompState = Readonly<typeof initialState>;

// Reducer

export default (state: PadItemHistDataIncCompState = initialState, action): PadItemHistDataIncCompState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_PADITEMHISTDATAINCCOMP_LIST):
    case REQUEST(ACTION_TYPES.FETCH_PADITEMHISTDATAINCCOMP):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_PADITEMHISTDATAINCCOMP):
    case REQUEST(ACTION_TYPES.UPDATE_PADITEMHISTDATAINCCOMP):
    case REQUEST(ACTION_TYPES.DELETE_PADITEMHISTDATAINCCOMP):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_PADITEMHISTDATAINCCOMP_LIST):
    case FAILURE(ACTION_TYPES.FETCH_PADITEMHISTDATAINCCOMP):
    case FAILURE(ACTION_TYPES.CREATE_PADITEMHISTDATAINCCOMP):
    case FAILURE(ACTION_TYPES.UPDATE_PADITEMHISTDATAINCCOMP):
    case FAILURE(ACTION_TYPES.DELETE_PADITEMHISTDATAINCCOMP):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_PADITEMHISTDATAINCCOMP_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10)
      };
    case SUCCESS(ACTION_TYPES.FETCH_PADITEMHISTDATAINCCOMP):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_PADITEMHISTDATAINCCOMP):
    case SUCCESS(ACTION_TYPES.UPDATE_PADITEMHISTDATAINCCOMP):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_PADITEMHISTDATAINCCOMP):
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

const apiUrl = 'api/pad-item-hist-data-inc-comps';

// Actions

// Actions
export type ICrudGetAllActionPadItemHistDataIncComp<T> = (
  idPadItem?: any,
  dataPadItemIncompleto?: any,
  dataPadItemCompleto?: any,
  page?: number,
  size?: number,
  sort?: string
) => IPayload<T> | ((dispatch: any) => IPayload<T>);

export const getEntities: ICrudGetAllActionPadItemHistDataIncComp<IPadItemHistDataIncComp> = (
  idPadItem,
  dataPadItemIncompleto,
  dataPadItemCompleto,
  page,
  size,
  sort
) => {
  const idPadItemRequest = idPadItem ? `idPadItem.contains=${idPadItem}&` : '';
  const dataPadItemIncompletoRequest = dataPadItemIncompleto ? `dataPadItemIncompleto.contains=${dataPadItemIncompleto}&` : '';
  const dataPadItemCompletoRequest = dataPadItemCompleto ? `dataPadItemCompleto.contains=${dataPadItemCompleto}&` : '';

  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}&` : '?'}`;
  return {
    type: ACTION_TYPES.FETCH_PADITEMHISTDATAINCCOMP_LIST,
    payload: axios.get<IPadItemHistDataIncComp>(
      `${requestUrl}${idPadItemRequest}${dataPadItemIncompletoRequest}${dataPadItemCompletoRequest}cacheBuster=${new Date().getTime()}`
    )
  };
};
export const getEntity: ICrudGetAction<IPadItemHistDataIncComp> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_PADITEMHISTDATAINCCOMP,
    payload: axios.get<IPadItemHistDataIncComp>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IPadItemHistDataIncComp> = entity => async dispatch => {
  entity = {
    ...entity
  };
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_PADITEMHISTDATAINCCOMP,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IPadItemHistDataIncComp> = entity => async dispatch => {
  entity = { ...entity };
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_PADITEMHISTDATAINCCOMP,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IPadItemHistDataIncComp> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_PADITEMHISTDATAINCCOMP,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
