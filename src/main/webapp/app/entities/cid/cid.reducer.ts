/* eslint complexity: ["error", 100] */
import axios from 'axios';
import { ICrudGetAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { IPayload } from 'react-jhipster/src/type/redux-action.type';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { ICid, defaultValue } from 'app/shared/model/cid.model';

export const ACTION_TYPES = {
  FETCH_CID_LIST_EXPORT: 'cid/FETCH_CID_LIST_EXPORT',
  FETCH_CID_LIST: 'cid/FETCH_CID_LIST',
  FETCH_CID: 'cid/FETCH_CID',
  CREATE_CID: 'cid/CREATE_CID',
  UPDATE_CID: 'cid/UPDATE_CID',
  DELETE_CID: 'cid/DELETE_CID',
  RESET: 'cid/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<ICid>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type CidState = Readonly<typeof initialState>;

export interface ICidBaseState {
  baseFilters: any;
  codigo: any;
  diagnostico: any;
  gr: any;
  temp: any;
  apelido: any;
  cidXPtaNovo: any;
  pacienteDiagnostico: any;
  padCid: any;
}

export interface ICidUpdateState {
  fieldsBase: ICidBaseState;

  isNew: boolean;
}

// Reducer

export default (state: CidState = initialState, action): CidState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_CID_LIST_EXPORT):
    case REQUEST(ACTION_TYPES.FETCH_CID_LIST):
    case REQUEST(ACTION_TYPES.FETCH_CID):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_CID):
    case REQUEST(ACTION_TYPES.UPDATE_CID):
    case REQUEST(ACTION_TYPES.DELETE_CID):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_CID_LIST_EXPORT):
    case FAILURE(ACTION_TYPES.FETCH_CID_LIST):
    case FAILURE(ACTION_TYPES.FETCH_CID):
    case FAILURE(ACTION_TYPES.CREATE_CID):
    case FAILURE(ACTION_TYPES.UPDATE_CID):
    case FAILURE(ACTION_TYPES.DELETE_CID):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_CID_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10)
      };
    case SUCCESS(ACTION_TYPES.FETCH_CID):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_CID):
    case SUCCESS(ACTION_TYPES.UPDATE_CID):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_CID):
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

const apiUrl = 'api/cids';

// Actions

// Actions
export type ICrudGetAllActionCid<T> = (
  codigo?: any,
  diagnostico?: any,
  gr?: any,
  temp?: any,
  apelido?: any,
  cidXPtaNovo?: any,
  pacienteDiagnostico?: any,
  padCid?: any,
  page?: number,
  size?: number,
  sort?: string
) => IPayload<T> | ((dispatch: any) => IPayload<T>);

export const getEntities: ICrudGetAllActionCid<ICid> = (
  codigo,
  diagnostico,
  gr,
  temp,
  apelido,
  cidXPtaNovo,
  pacienteDiagnostico,
  padCid,
  page,
  size,
  sort
) => {
  const codigoRequest = codigo ? `codigo.contains=${codigo}&` : '';
  const diagnosticoRequest = diagnostico ? `diagnostico.contains=${diagnostico}&` : '';
  const grRequest = gr ? `gr.contains=${gr}&` : '';
  const tempRequest = temp ? `temp.contains=${temp}&` : '';
  const apelidoRequest = apelido ? `apelido.contains=${apelido}&` : '';
  const cidXPtaNovoRequest = cidXPtaNovo ? `cidXPtaNovo.equals=${cidXPtaNovo}&` : '';
  const pacienteDiagnosticoRequest = pacienteDiagnostico ? `pacienteDiagnostico.equals=${pacienteDiagnostico}&` : '';
  const padCidRequest = padCid ? `padCid.equals=${padCid}&` : '';

  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}&` : '?'}`;
  return {
    type: ACTION_TYPES.FETCH_CID_LIST,
    payload: axios.get<ICid>(
      `${requestUrl}${codigoRequest}${diagnosticoRequest}${grRequest}${tempRequest}${apelidoRequest}${cidXPtaNovoRequest}${pacienteDiagnosticoRequest}${padCidRequest}cacheBuster=${new Date().getTime()}`
    )
  };
};
export const getEntity: ICrudGetAction<ICid> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_CID,
    payload: axios.get<ICid>(requestUrl)
  };
};

export const getEntitiesExport: ICrudGetAllActionCid<ICid> = (
  codigo,
  diagnostico,
  gr,
  temp,
  apelido,
  cidXPtaNovo,
  pacienteDiagnostico,
  padCid,
  page,
  size,
  sort
) => {
  const codigoRequest = codigo ? `codigo.contains=${codigo}&` : '';
  const diagnosticoRequest = diagnostico ? `diagnostico.contains=${diagnostico}&` : '';
  const grRequest = gr ? `gr.contains=${gr}&` : '';
  const tempRequest = temp ? `temp.contains=${temp}&` : '';
  const apelidoRequest = apelido ? `apelido.contains=${apelido}&` : '';
  const cidXPtaNovoRequest = cidXPtaNovo ? `cidXPtaNovo.equals=${cidXPtaNovo}&` : '';
  const pacienteDiagnosticoRequest = pacienteDiagnostico ? `pacienteDiagnostico.equals=${pacienteDiagnostico}&` : '';
  const padCidRequest = padCid ? `padCid.equals=${padCid}&` : '';

  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}&` : '?'}`;
  return {
    type: ACTION_TYPES.FETCH_CID_LIST,
    payload: axios.get<ICid>(
      `${requestUrl}${codigoRequest}${diagnosticoRequest}${grRequest}${tempRequest}${apelidoRequest}${cidXPtaNovoRequest}${pacienteDiagnosticoRequest}${padCidRequest}cacheBuster=${new Date().getTime()}`
    )
  };
};

export const createEntity: ICrudPutAction<ICid> = entity => async dispatch => {
  entity = {
    ...entity
  };
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_CID,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<ICid> = entity => async dispatch => {
  entity = { ...entity };
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_CID,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<ICid> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_CID,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});

export const getCidState = (location): ICidBaseState => {
  const url = new URL(`http://localhost${location.search}`); // using a dummy url for parsing
  const baseFilters = url.searchParams.get('baseFilters') || '';
  const codigo = url.searchParams.get('codigo') || '';
  const diagnostico = url.searchParams.get('diagnostico') || '';
  const gr = url.searchParams.get('gr') || '';
  const temp = url.searchParams.get('temp') || '';
  const apelido = url.searchParams.get('apelido') || '';

  const cidXPtaNovo = url.searchParams.get('cidXPtaNovo') || '';
  const pacienteDiagnostico = url.searchParams.get('pacienteDiagnostico') || '';
  const padCid = url.searchParams.get('padCid') || '';

  return {
    baseFilters,
    codigo,
    diagnostico,
    gr,
    temp,
    apelido,
    cidXPtaNovo,
    pacienteDiagnostico,
    padCid
  };
};
