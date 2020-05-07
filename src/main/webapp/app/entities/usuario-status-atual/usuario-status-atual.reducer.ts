/* eslint complexity: ["error", 100] */
import axios from 'axios';
import { ICrudGetAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { IPayload } from 'react-jhipster/src/type/redux-action.type';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IUsuarioStatusAtual, defaultValue } from 'app/shared/model/usuario-status-atual.model';

export const ACTION_TYPES = {
  FETCH_USUARIOSTATUSATUAL_LIST_EXPORT: 'usuarioStatusAtual/FETCH_USUARIOSTATUSATUAL_LIST_EXPORT',
  FETCH_USUARIOSTATUSATUAL_LIST: 'usuarioStatusAtual/FETCH_USUARIOSTATUSATUAL_LIST',
  FETCH_USUARIOSTATUSATUAL: 'usuarioStatusAtual/FETCH_USUARIOSTATUSATUAL',
  CREATE_USUARIOSTATUSATUAL: 'usuarioStatusAtual/CREATE_USUARIOSTATUSATUAL',
  UPDATE_USUARIOSTATUSATUAL: 'usuarioStatusAtual/UPDATE_USUARIOSTATUSATUAL',
  DELETE_USUARIOSTATUSATUAL: 'usuarioStatusAtual/DELETE_USUARIOSTATUSATUAL',
  RESET: 'usuarioStatusAtual/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IUsuarioStatusAtual>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type UsuarioStatusAtualState = Readonly<typeof initialState>;

export interface IUsuarioStatusAtualBaseState {
  baseFilters: any;
  statusAtual: any;
  obs: any;
  ativo: any;
}

export interface IUsuarioStatusAtualUpdateState {
  fieldsBase: IUsuarioStatusAtualBaseState;
  isNew: boolean;
}

// Reducer

export default (state: UsuarioStatusAtualState = initialState, action): UsuarioStatusAtualState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_USUARIOSTATUSATUAL_LIST_EXPORT):
    case REQUEST(ACTION_TYPES.FETCH_USUARIOSTATUSATUAL_LIST):
    case REQUEST(ACTION_TYPES.FETCH_USUARIOSTATUSATUAL):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_USUARIOSTATUSATUAL):
    case REQUEST(ACTION_TYPES.UPDATE_USUARIOSTATUSATUAL):
    case REQUEST(ACTION_TYPES.DELETE_USUARIOSTATUSATUAL):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_USUARIOSTATUSATUAL_LIST_EXPORT):
    case FAILURE(ACTION_TYPES.FETCH_USUARIOSTATUSATUAL_LIST):
    case FAILURE(ACTION_TYPES.FETCH_USUARIOSTATUSATUAL):
    case FAILURE(ACTION_TYPES.CREATE_USUARIOSTATUSATUAL):
    case FAILURE(ACTION_TYPES.UPDATE_USUARIOSTATUSATUAL):
    case FAILURE(ACTION_TYPES.DELETE_USUARIOSTATUSATUAL):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_USUARIOSTATUSATUAL_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10)
      };
    case SUCCESS(ACTION_TYPES.FETCH_USUARIOSTATUSATUAL):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_USUARIOSTATUSATUAL):
    case SUCCESS(ACTION_TYPES.UPDATE_USUARIOSTATUSATUAL):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_USUARIOSTATUSATUAL):
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

const apiUrl = 'api/usuario-status-atuals';

// Actions

// Actions
export type ICrudGetAllActionUsuarioStatusAtual<T> = (
  statusAtual?: any,
  obs?: any,
  ativo?: any,
  page?: number,
  size?: number,
  sort?: string
) => IPayload<T> | ((dispatch: any) => IPayload<T>);

export const getEntities: ICrudGetAllActionUsuarioStatusAtual<IUsuarioStatusAtual> = (statusAtual, obs, ativo, page, size, sort) => {
  const statusAtualRequest = statusAtual ? `statusAtual.contains=${statusAtual}&` : '';
  const obsRequest = obs ? `obs.contains=${obs}&` : '';
  const ativoRequest = ativo ? `ativo.contains=${ativo}&` : '';

  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}&` : '?'}`;
  return {
    type: ACTION_TYPES.FETCH_USUARIOSTATUSATUAL_LIST,
    payload: axios.get<IUsuarioStatusAtual>(
      `${requestUrl}${statusAtualRequest}${obsRequest}${ativoRequest}cacheBuster=${new Date().getTime()}`
    )
  };
};
export const getEntity: ICrudGetAction<IUsuarioStatusAtual> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_USUARIOSTATUSATUAL,
    payload: axios.get<IUsuarioStatusAtual>(requestUrl)
  };
};

export const getEntitiesExport: ICrudGetAllActionUsuarioStatusAtual<IUsuarioStatusAtual> = (statusAtual, obs, ativo, page, size, sort) => {
  const statusAtualRequest = statusAtual ? `statusAtual.contains=${statusAtual}&` : '';
  const obsRequest = obs ? `obs.contains=${obs}&` : '';
  const ativoRequest = ativo ? `ativo.contains=${ativo}&` : '';

  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}&` : '?'}`;
  return {
    type: ACTION_TYPES.FETCH_USUARIOSTATUSATUAL_LIST,
    payload: axios.get<IUsuarioStatusAtual>(
      `${requestUrl}${statusAtualRequest}${obsRequest}${ativoRequest}cacheBuster=${new Date().getTime()}`
    )
  };
};

export const createEntity: ICrudPutAction<IUsuarioStatusAtual> = entity => async dispatch => {
  entity = {
    ...entity
  };
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_USUARIOSTATUSATUAL,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IUsuarioStatusAtual> = entity => async dispatch => {
  entity = { ...entity };
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_USUARIOSTATUSATUAL,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IUsuarioStatusAtual> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_USUARIOSTATUSATUAL,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});

export const getUsuarioStatusAtualState = (location): IUsuarioStatusAtualBaseState => {
  const url = new URL(`http://localhost${location.search}`); // using a dummy url for parsing
  const baseFilters = url.searchParams.get('baseFilters') || '';
  const statusAtual = url.searchParams.get('statusAtual') || '';
  const obs = url.searchParams.get('obs') || '';
  const ativo = url.searchParams.get('ativo') || '';

  return {
    baseFilters,
    statusAtual,
    obs,
    ativo
  };
};
