/* eslint complexity: ["error", 100] */
import axios from 'axios';
import { ICrudGetAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { IPayload } from 'react-jhipster/src/type/redux-action.type';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { ICidPta, defaultValue } from 'app/shared/model/cid-pta.model';

export const ACTION_TYPES = {
  FETCH_CIDPTA_LIST_EXPORT: 'cidPta/FETCH_CIDPTA_LIST_EXPORT',
  FETCH_CIDPTA_LIST: 'cidPta/FETCH_CIDPTA_LIST',
  FETCH_CIDPTA: 'cidPta/FETCH_CIDPTA',
  CREATE_CIDPTA: 'cidPta/CREATE_CIDPTA',
  UPDATE_CIDPTA: 'cidPta/UPDATE_CIDPTA',
  DELETE_CIDPTA: 'cidPta/DELETE_CIDPTA',
  RESET: 'cidPta/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<ICidPta>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type CidPtaState = Readonly<typeof initialState>;

export interface ICidPtaBaseState {
  baseFilters: any;
  idDescPta: any;
  idCid: any;
  idAtividade: any;
  ativo: any;
}

export interface ICidPtaUpdateState {
  fieldsBase: ICidPtaBaseState;

  isNew: boolean;
}

// Reducer

export default (state: CidPtaState = initialState, action): CidPtaState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_CIDPTA_LIST_EXPORT):
    case REQUEST(ACTION_TYPES.FETCH_CIDPTA_LIST):
    case REQUEST(ACTION_TYPES.FETCH_CIDPTA):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_CIDPTA):
    case REQUEST(ACTION_TYPES.UPDATE_CIDPTA):
    case REQUEST(ACTION_TYPES.DELETE_CIDPTA):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_CIDPTA_LIST_EXPORT):
    case FAILURE(ACTION_TYPES.FETCH_CIDPTA_LIST):
    case FAILURE(ACTION_TYPES.FETCH_CIDPTA):
    case FAILURE(ACTION_TYPES.CREATE_CIDPTA):
    case FAILURE(ACTION_TYPES.UPDATE_CIDPTA):
    case FAILURE(ACTION_TYPES.DELETE_CIDPTA):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_CIDPTA_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10)
      };
    case SUCCESS(ACTION_TYPES.FETCH_CIDPTA):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_CIDPTA):
    case SUCCESS(ACTION_TYPES.UPDATE_CIDPTA):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_CIDPTA):
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

const apiUrl = 'api/cid-ptas';

// Actions

// Actions
export type ICrudGetAllActionCidPta<T> = (
  idDescPta?: any,
  idCid?: any,
  idAtividade?: any,
  ativo?: any,
  page?: number,
  size?: number,
  sort?: string
) => IPayload<T> | ((dispatch: any) => IPayload<T>);

export const getEntities: ICrudGetAllActionCidPta<ICidPta> = (idDescPta, idCid, idAtividade, ativo, page, size, sort) => {
  const idDescPtaRequest = idDescPta ? `idDescPta.contains=${idDescPta}&` : '';
  const idCidRequest = idCid ? `idCid.contains=${idCid}&` : '';
  const idAtividadeRequest = idAtividade ? `idAtividade.contains=${idAtividade}&` : '';
  const ativoRequest = ativo ? `ativo.contains=${ativo}&` : '';

  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}&` : '?'}`;
  return {
    type: ACTION_TYPES.FETCH_CIDPTA_LIST,
    payload: axios.get<ICidPta>(
      `${requestUrl}${idDescPtaRequest}${idCidRequest}${idAtividadeRequest}${ativoRequest}cacheBuster=${new Date().getTime()}`
    )
  };
};
export const getEntity: ICrudGetAction<ICidPta> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_CIDPTA,
    payload: axios.get<ICidPta>(requestUrl)
  };
};

export const getEntitiesExport: ICrudGetAllActionCidPta<ICidPta> = (idDescPta, idCid, idAtividade, ativo, page, size, sort) => {
  const idDescPtaRequest = idDescPta ? `idDescPta.contains=${idDescPta}&` : '';
  const idCidRequest = idCid ? `idCid.contains=${idCid}&` : '';
  const idAtividadeRequest = idAtividade ? `idAtividade.contains=${idAtividade}&` : '';
  const ativoRequest = ativo ? `ativo.contains=${ativo}&` : '';

  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}&` : '?'}`;
  return {
    type: ACTION_TYPES.FETCH_CIDPTA_LIST,
    payload: axios.get<ICidPta>(
      `${requestUrl}${idDescPtaRequest}${idCidRequest}${idAtividadeRequest}${ativoRequest}cacheBuster=${new Date().getTime()}`
    )
  };
};

export const createEntity: ICrudPutAction<ICidPta> = entity => async dispatch => {
  entity = {
    ...entity
  };
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_CIDPTA,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<ICidPta> = entity => async dispatch => {
  entity = { ...entity };
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_CIDPTA,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<ICidPta> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_CIDPTA,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});

export const getCidPtaState = (location): ICidPtaBaseState => {
  const url = new URL(`http://localhost${location.search}`); // using a dummy url for parsing
  const baseFilters = url.searchParams.get('baseFilters') || '';
  const idDescPta = url.searchParams.get('idDescPta') || '';
  const idCid = url.searchParams.get('idCid') || '';
  const idAtividade = url.searchParams.get('idAtividade') || '';
  const ativo = url.searchParams.get('ativo') || '';

  return {
    baseFilters,
    idDescPta,
    idCid,
    idAtividade,
    ativo
  };
};
