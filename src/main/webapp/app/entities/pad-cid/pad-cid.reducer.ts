/* eslint complexity: ["error", 100] */
import axios from 'axios';
import { ICrudGetAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { IPayload } from 'react-jhipster/src/type/redux-action.type';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IPadCid, defaultValue } from 'app/shared/model/pad-cid.model';

export const ACTION_TYPES = {
  FETCH_PADCID_LIST_EXPORT: 'padCid/FETCH_PADCID_LIST_EXPORT',
  FETCH_PADCID_LIST: 'padCid/FETCH_PADCID_LIST',
  FETCH_PADCID: 'padCid/FETCH_PADCID',
  CREATE_PADCID: 'padCid/CREATE_PADCID',
  UPDATE_PADCID: 'padCid/UPDATE_PADCID',
  DELETE_PADCID: 'padCid/DELETE_PADCID',
  RESET: 'padCid/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IPadCid>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type PadCidState = Readonly<typeof initialState>;

export interface IPadCidBaseState {
  baseFilters: any;
  observacao: any;
  ativo: any;
  pad: any;
  cid: any;
}

export interface IPadCidUpdateState {
  fieldsBase: IPadCidBaseState;

  padSelectValue: any;
  cidSelectValue: any;
  isNew: boolean;
  padId: string;
  cidId: string;
}

// Reducer

export default (state: PadCidState = initialState, action): PadCidState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_PADCID_LIST_EXPORT):
    case REQUEST(ACTION_TYPES.FETCH_PADCID_LIST):
    case REQUEST(ACTION_TYPES.FETCH_PADCID):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_PADCID):
    case REQUEST(ACTION_TYPES.UPDATE_PADCID):
    case REQUEST(ACTION_TYPES.DELETE_PADCID):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_PADCID_LIST_EXPORT):
    case FAILURE(ACTION_TYPES.FETCH_PADCID_LIST):
    case FAILURE(ACTION_TYPES.FETCH_PADCID):
    case FAILURE(ACTION_TYPES.CREATE_PADCID):
    case FAILURE(ACTION_TYPES.UPDATE_PADCID):
    case FAILURE(ACTION_TYPES.DELETE_PADCID):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_PADCID_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10)
      };
    case SUCCESS(ACTION_TYPES.FETCH_PADCID):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_PADCID):
    case SUCCESS(ACTION_TYPES.UPDATE_PADCID):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_PADCID):
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

const apiUrl = 'api/pad-cids';

// Actions

// Actions
export type ICrudGetAllActionPadCid<T> = (
  observacao?: any,
  ativo?: any,
  pad?: any,
  cid?: any,
  page?: number,
  size?: number,
  sort?: string
) => IPayload<T> | ((dispatch: any) => IPayload<T>);

export const getEntities: ICrudGetAllActionPadCid<IPadCid> = (observacao, ativo, pad, cid, page, size, sort) => {
  const observacaoRequest = observacao ? `observacao.contains=${observacao}&` : '';
  const ativoRequest = ativo ? `ativo.contains=${ativo}&` : '';
  const padRequest = pad ? `pad.equals=${pad}&` : '';
  const cidRequest = cid ? `cid.equals=${cid}&` : '';

  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}&` : '?'}`;
  return {
    type: ACTION_TYPES.FETCH_PADCID_LIST,
    payload: axios.get<IPadCid>(
      `${requestUrl}${observacaoRequest}${ativoRequest}${padRequest}${cidRequest}cacheBuster=${new Date().getTime()}`
    )
  };
};
export const getEntity: ICrudGetAction<IPadCid> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_PADCID,
    payload: axios.get<IPadCid>(requestUrl)
  };
};

export const getEntitiesExport: ICrudGetAllActionPadCid<IPadCid> = (observacao, ativo, pad, cid, page, size, sort) => {
  const observacaoRequest = observacao ? `observacao.contains=${observacao}&` : '';
  const ativoRequest = ativo ? `ativo.contains=${ativo}&` : '';
  const padRequest = pad ? `pad.equals=${pad}&` : '';
  const cidRequest = cid ? `cid.equals=${cid}&` : '';

  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}&` : '?'}`;
  return {
    type: ACTION_TYPES.FETCH_PADCID_LIST,
    payload: axios.get<IPadCid>(
      `${requestUrl}${observacaoRequest}${ativoRequest}${padRequest}${cidRequest}cacheBuster=${new Date().getTime()}`
    )
  };
};

export const createEntity: ICrudPutAction<IPadCid> = entity => async dispatch => {
  entity = {
    ...entity,
    pad: entity.pad === 'null' ? null : entity.pad,
    cid: entity.cid === 'null' ? null : entity.cid
  };
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_PADCID,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IPadCid> = entity => async dispatch => {
  entity = { ...entity, pad: entity.pad === 'null' ? null : entity.pad, cid: entity.cid === 'null' ? null : entity.cid };
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_PADCID,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IPadCid> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_PADCID,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});

export const getPadCidState = (location): IPadCidBaseState => {
  const url = new URL(`http://localhost${location.search}`); // using a dummy url for parsing
  const baseFilters = url.searchParams.get('baseFilters') || '';
  const observacao = url.searchParams.get('observacao') || '';
  const ativo = url.searchParams.get('ativo') || '';

  const pad = url.searchParams.get('pad') || '';
  const cid = url.searchParams.get('cid') || '';

  return {
    baseFilters,
    observacao,
    ativo,
    pad,
    cid
  };
};
