/* eslint complexity: ["error", 100] */
import axios from 'axios';
import { ICrudGetAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { IPayload } from 'react-jhipster/src/type/redux-action.type';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IPadPta, defaultValue } from 'app/shared/model/pad-pta.model';

export const ACTION_TYPES = {
  FETCH_PADPTA_LIST_EXPORT: 'padPta/FETCH_PADPTA_LIST_EXPORT',
  FETCH_PADPTA_LIST: 'padPta/FETCH_PADPTA_LIST',
  FETCH_PADPTA: 'padPta/FETCH_PADPTA',
  CREATE_PADPTA: 'padPta/CREATE_PADPTA',
  UPDATE_PADPTA: 'padPta/UPDATE_PADPTA',
  DELETE_PADPTA: 'padPta/DELETE_PADPTA',
  RESET: 'padPta/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IPadPta>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type PadPtaState = Readonly<typeof initialState>;

export interface IPadPtaBaseState {
  baseFilters: any;
  idPad: any;
  idDescPta: any;
  idCid: any;
  idCidXPtaNovo: any;
}

export interface IPadPtaUpdateState {
  fieldsBase: IPadPtaBaseState;
  isNew: boolean;
}

// Reducer

export default (state: PadPtaState = initialState, action): PadPtaState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_PADPTA_LIST_EXPORT):
    case REQUEST(ACTION_TYPES.FETCH_PADPTA_LIST):
    case REQUEST(ACTION_TYPES.FETCH_PADPTA):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_PADPTA):
    case REQUEST(ACTION_TYPES.UPDATE_PADPTA):
    case REQUEST(ACTION_TYPES.DELETE_PADPTA):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_PADPTA_LIST_EXPORT):
    case FAILURE(ACTION_TYPES.FETCH_PADPTA_LIST):
    case FAILURE(ACTION_TYPES.FETCH_PADPTA):
    case FAILURE(ACTION_TYPES.CREATE_PADPTA):
    case FAILURE(ACTION_TYPES.UPDATE_PADPTA):
    case FAILURE(ACTION_TYPES.DELETE_PADPTA):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_PADPTA_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10)
      };
    case SUCCESS(ACTION_TYPES.FETCH_PADPTA):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_PADPTA):
    case SUCCESS(ACTION_TYPES.UPDATE_PADPTA):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_PADPTA):
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

const apiUrl = 'api/pad-ptas';

// Actions

// Actions
export type ICrudGetAllActionPadPta<T> = (
  idPad?: any,
  idDescPta?: any,
  idCid?: any,
  idCidXPtaNovo?: any,
  page?: number,
  size?: number,
  sort?: string
) => IPayload<T> | ((dispatch: any) => IPayload<T>);

export const getEntities: ICrudGetAllActionPadPta<IPadPta> = (idPad, idDescPta, idCid, idCidXPtaNovo, page, size, sort) => {
  const idPadRequest = idPad ? `idPad.contains=${idPad}&` : '';
  const idDescPtaRequest = idDescPta ? `idDescPta.contains=${idDescPta}&` : '';
  const idCidRequest = idCid ? `idCid.contains=${idCid}&` : '';
  const idCidXPtaNovoRequest = idCidXPtaNovo ? `idCidXPtaNovo.contains=${idCidXPtaNovo}&` : '';

  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}&` : '?'}`;
  return {
    type: ACTION_TYPES.FETCH_PADPTA_LIST,
    payload: axios.get<IPadPta>(
      `${requestUrl}${idPadRequest}${idDescPtaRequest}${idCidRequest}${idCidXPtaNovoRequest}cacheBuster=${new Date().getTime()}`
    )
  };
};
export const getEntity: ICrudGetAction<IPadPta> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_PADPTA,
    payload: axios.get<IPadPta>(requestUrl)
  };
};

export const getEntitiesExport: ICrudGetAllActionPadPta<IPadPta> = (idPad, idDescPta, idCid, idCidXPtaNovo, page, size, sort) => {
  const idPadRequest = idPad ? `idPad.contains=${idPad}&` : '';
  const idDescPtaRequest = idDescPta ? `idDescPta.contains=${idDescPta}&` : '';
  const idCidRequest = idCid ? `idCid.contains=${idCid}&` : '';
  const idCidXPtaNovoRequest = idCidXPtaNovo ? `idCidXPtaNovo.contains=${idCidXPtaNovo}&` : '';

  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}&` : '?'}`;
  return {
    type: ACTION_TYPES.FETCH_PADPTA_LIST,
    payload: axios.get<IPadPta>(
      `${requestUrl}${idPadRequest}${idDescPtaRequest}${idCidRequest}${idCidXPtaNovoRequest}cacheBuster=${new Date().getTime()}`
    )
  };
};

export const createEntity: ICrudPutAction<IPadPta> = entity => async dispatch => {
  entity = {
    ...entity
  };
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_PADPTA,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IPadPta> = entity => async dispatch => {
  entity = { ...entity };
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_PADPTA,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IPadPta> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_PADPTA,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});

export const getPadPtaState = (location): IPadPtaBaseState => {
  const url = new URL(`http://localhost${location.search}`); // using a dummy url for parsing
  const baseFilters = url.searchParams.get('baseFilters') || '';
  const idPad = url.searchParams.get('idPad') || '';
  const idDescPta = url.searchParams.get('idDescPta') || '';
  const idCid = url.searchParams.get('idCid') || '';
  const idCidXPtaNovo = url.searchParams.get('idCidXPtaNovo') || '';

  return {
    baseFilters,
    idPad,
    idDescPta,
    idCid,
    idCidXPtaNovo
  };
};
