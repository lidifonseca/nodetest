/* eslint complexity: ["error", 100] */
import axios from 'axios';
import { ICrudGetAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { IPayload } from 'react-jhipster/src/type/redux-action.type';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IPadItemAlerta, defaultValue } from 'app/shared/model/pad-item-alerta.model';

export const ACTION_TYPES = {
  FETCH_PADITEMALERTA_LIST_EXPORT: 'padItemAlerta/FETCH_PADITEMALERTA_LIST_EXPORT',
  FETCH_PADITEMALERTA_LIST: 'padItemAlerta/FETCH_PADITEMALERTA_LIST',
  FETCH_PADITEMALERTA: 'padItemAlerta/FETCH_PADITEMALERTA',
  CREATE_PADITEMALERTA: 'padItemAlerta/CREATE_PADITEMALERTA',
  UPDATE_PADITEMALERTA: 'padItemAlerta/UPDATE_PADITEMALERTA',
  DELETE_PADITEMALERTA: 'padItemAlerta/DELETE_PADITEMALERTA',
  RESET: 'padItemAlerta/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IPadItemAlerta>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type PadItemAlertaState = Readonly<typeof initialState>;

export interface IPadItemAlertaBaseState {
  baseFilters: any;
  padItemMetaId: any;
  envioEmailEm: any;
  visualizadoEm: any;
  criadoEm: any;
  ativo: any;
  mensagem: any;
}

export interface IPadItemAlertaUpdateState {
  fieldsBase: IPadItemAlertaBaseState;

  isNew: boolean;
}

// Reducer

export default (state: PadItemAlertaState = initialState, action): PadItemAlertaState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_PADITEMALERTA_LIST_EXPORT):
    case REQUEST(ACTION_TYPES.FETCH_PADITEMALERTA_LIST):
    case REQUEST(ACTION_TYPES.FETCH_PADITEMALERTA):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_PADITEMALERTA):
    case REQUEST(ACTION_TYPES.UPDATE_PADITEMALERTA):
    case REQUEST(ACTION_TYPES.DELETE_PADITEMALERTA):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_PADITEMALERTA_LIST_EXPORT):
    case FAILURE(ACTION_TYPES.FETCH_PADITEMALERTA_LIST):
    case FAILURE(ACTION_TYPES.FETCH_PADITEMALERTA):
    case FAILURE(ACTION_TYPES.CREATE_PADITEMALERTA):
    case FAILURE(ACTION_TYPES.UPDATE_PADITEMALERTA):
    case FAILURE(ACTION_TYPES.DELETE_PADITEMALERTA):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_PADITEMALERTA_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10)
      };
    case SUCCESS(ACTION_TYPES.FETCH_PADITEMALERTA):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_PADITEMALERTA):
    case SUCCESS(ACTION_TYPES.UPDATE_PADITEMALERTA):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_PADITEMALERTA):
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

const apiUrl = 'api/pad-item-alertas';

// Actions

// Actions
export type ICrudGetAllActionPadItemAlerta<T> = (
  padItemMetaId?: any,
  envioEmailEm?: any,
  visualizadoEm?: any,
  criadoEm?: any,
  ativo?: any,
  mensagem?: any,
  page?: number,
  size?: number,
  sort?: string
) => IPayload<T> | ((dispatch: any) => IPayload<T>);

export const getEntities: ICrudGetAllActionPadItemAlerta<IPadItemAlerta> = (
  padItemMetaId,
  envioEmailEm,
  visualizadoEm,
  criadoEm,
  ativo,
  mensagem,
  page,
  size,
  sort
) => {
  const padItemMetaIdRequest = padItemMetaId ? `padItemMetaId.contains=${padItemMetaId}&` : '';
  const envioEmailEmRequest = envioEmailEm ? `envioEmailEm.contains=${envioEmailEm}&` : '';
  const visualizadoEmRequest = visualizadoEm ? `visualizadoEm.contains=${visualizadoEm}&` : '';
  const criadoEmRequest = criadoEm ? `criadoEm.contains=${criadoEm}&` : '';
  const ativoRequest = ativo ? `ativo.contains=${ativo}&` : '';
  const mensagemRequest = mensagem ? `mensagem.contains=${mensagem}&` : '';

  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}&` : '?'}`;
  return {
    type: ACTION_TYPES.FETCH_PADITEMALERTA_LIST,
    payload: axios.get<IPadItemAlerta>(
      `${requestUrl}${padItemMetaIdRequest}${envioEmailEmRequest}${visualizadoEmRequest}${criadoEmRequest}${ativoRequest}${mensagemRequest}cacheBuster=${new Date().getTime()}`
    )
  };
};
export const getEntity: ICrudGetAction<IPadItemAlerta> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_PADITEMALERTA,
    payload: axios.get<IPadItemAlerta>(requestUrl)
  };
};

export const getEntitiesExport: ICrudGetAllActionPadItemAlerta<IPadItemAlerta> = (
  padItemMetaId,
  envioEmailEm,
  visualizadoEm,
  criadoEm,
  ativo,
  mensagem,
  page,
  size,
  sort
) => {
  const padItemMetaIdRequest = padItemMetaId ? `padItemMetaId.contains=${padItemMetaId}&` : '';
  const envioEmailEmRequest = envioEmailEm ? `envioEmailEm.contains=${envioEmailEm}&` : '';
  const visualizadoEmRequest = visualizadoEm ? `visualizadoEm.contains=${visualizadoEm}&` : '';
  const criadoEmRequest = criadoEm ? `criadoEm.contains=${criadoEm}&` : '';
  const ativoRequest = ativo ? `ativo.contains=${ativo}&` : '';
  const mensagemRequest = mensagem ? `mensagem.contains=${mensagem}&` : '';

  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}&` : '?'}`;
  return {
    type: ACTION_TYPES.FETCH_PADITEMALERTA_LIST,
    payload: axios.get<IPadItemAlerta>(
      `${requestUrl}${padItemMetaIdRequest}${envioEmailEmRequest}${visualizadoEmRequest}${criadoEmRequest}${ativoRequest}${mensagemRequest}cacheBuster=${new Date().getTime()}`
    )
  };
};

export const createEntity: ICrudPutAction<IPadItemAlerta> = entity => async dispatch => {
  entity = {
    ...entity
  };
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_PADITEMALERTA,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IPadItemAlerta> = entity => async dispatch => {
  entity = { ...entity };
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_PADITEMALERTA,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IPadItemAlerta> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_PADITEMALERTA,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});

export const getPadItemAlertaState = (location): IPadItemAlertaBaseState => {
  const url = new URL(`http://localhost${location.search}`); // using a dummy url for parsing
  const baseFilters = url.searchParams.get('baseFilters') || '';
  const padItemMetaId = url.searchParams.get('padItemMetaId') || '';
  const envioEmailEm = url.searchParams.get('envioEmailEm') || '';
  const visualizadoEm = url.searchParams.get('visualizadoEm') || '';
  const criadoEm = url.searchParams.get('criadoEm') || '';
  const ativo = url.searchParams.get('ativo') || '';
  const mensagem = url.searchParams.get('mensagem') || '';

  return {
    baseFilters,
    padItemMetaId,
    envioEmailEm,
    visualizadoEm,
    criadoEm,
    ativo,
    mensagem
  };
};
