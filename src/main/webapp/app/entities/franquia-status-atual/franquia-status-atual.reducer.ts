/* eslint complexity: ["error", 100] */
import axios from 'axios';
import { ICrudGetAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { IPayload } from 'react-jhipster/src/type/redux-action.type';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IFranquiaStatusAtual, defaultValue } from 'app/shared/model/franquia-status-atual.model';

export const ACTION_TYPES = {
  FETCH_FRANQUIASTATUSATUAL_LIST_EXPORT: 'franquiaStatusAtual/FETCH_FRANQUIASTATUSATUAL_LIST_EXPORT',
  FETCH_FRANQUIASTATUSATUAL_LIST: 'franquiaStatusAtual/FETCH_FRANQUIASTATUSATUAL_LIST',
  FETCH_FRANQUIASTATUSATUAL: 'franquiaStatusAtual/FETCH_FRANQUIASTATUSATUAL',
  CREATE_FRANQUIASTATUSATUAL: 'franquiaStatusAtual/CREATE_FRANQUIASTATUSATUAL',
  UPDATE_FRANQUIASTATUSATUAL: 'franquiaStatusAtual/UPDATE_FRANQUIASTATUSATUAL',
  DELETE_FRANQUIASTATUSATUAL: 'franquiaStatusAtual/DELETE_FRANQUIASTATUSATUAL',
  RESET: 'franquiaStatusAtual/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IFranquiaStatusAtual>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type FranquiaStatusAtualState = Readonly<typeof initialState>;

export interface IFranquiaStatusAtualBaseState {
  baseFilters: any;
  statusAtual: any;
  obs: any;
  ativo: any;
}

export interface IFranquiaStatusAtualUpdateState {
  fieldsBase: IFranquiaStatusAtualBaseState;

  isNew: boolean;
}

// Reducer

export default (state: FranquiaStatusAtualState = initialState, action): FranquiaStatusAtualState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_FRANQUIASTATUSATUAL_LIST_EXPORT):
    case REQUEST(ACTION_TYPES.FETCH_FRANQUIASTATUSATUAL_LIST):
    case REQUEST(ACTION_TYPES.FETCH_FRANQUIASTATUSATUAL):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_FRANQUIASTATUSATUAL):
    case REQUEST(ACTION_TYPES.UPDATE_FRANQUIASTATUSATUAL):
    case REQUEST(ACTION_TYPES.DELETE_FRANQUIASTATUSATUAL):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_FRANQUIASTATUSATUAL_LIST_EXPORT):
    case FAILURE(ACTION_TYPES.FETCH_FRANQUIASTATUSATUAL_LIST):
    case FAILURE(ACTION_TYPES.FETCH_FRANQUIASTATUSATUAL):
    case FAILURE(ACTION_TYPES.CREATE_FRANQUIASTATUSATUAL):
    case FAILURE(ACTION_TYPES.UPDATE_FRANQUIASTATUSATUAL):
    case FAILURE(ACTION_TYPES.DELETE_FRANQUIASTATUSATUAL):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_FRANQUIASTATUSATUAL_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10)
      };
    case SUCCESS(ACTION_TYPES.FETCH_FRANQUIASTATUSATUAL):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_FRANQUIASTATUSATUAL):
    case SUCCESS(ACTION_TYPES.UPDATE_FRANQUIASTATUSATUAL):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_FRANQUIASTATUSATUAL):
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

const apiUrl = 'api/franquia-status-atuals';

// Actions

// Actions
export type ICrudGetAllActionFranquiaStatusAtual<T> = (
  statusAtual?: any,
  obs?: any,
  ativo?: any,
  page?: number,
  size?: number,
  sort?: string
) => IPayload<T> | ((dispatch: any) => IPayload<T>);

export const getEntities: ICrudGetAllActionFranquiaStatusAtual<IFranquiaStatusAtual> = (statusAtual, obs, ativo, page, size, sort) => {
  const statusAtualRequest = statusAtual ? `statusAtual.contains=${statusAtual}&` : '';
  const obsRequest = obs ? `obs.contains=${obs}&` : '';
  const ativoRequest = ativo ? `ativo.contains=${ativo}&` : '';

  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}&` : '?'}`;
  return {
    type: ACTION_TYPES.FETCH_FRANQUIASTATUSATUAL_LIST,
    payload: axios.get<IFranquiaStatusAtual>(
      `${requestUrl}${statusAtualRequest}${obsRequest}${ativoRequest}cacheBuster=${new Date().getTime()}`
    )
  };
};
export const getEntity: ICrudGetAction<IFranquiaStatusAtual> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_FRANQUIASTATUSATUAL,
    payload: axios.get<IFranquiaStatusAtual>(requestUrl)
  };
};

export const getEntitiesExport: ICrudGetAllActionFranquiaStatusAtual<IFranquiaStatusAtual> = (
  statusAtual,
  obs,
  ativo,
  page,
  size,
  sort
) => {
  const statusAtualRequest = statusAtual ? `statusAtual.contains=${statusAtual}&` : '';
  const obsRequest = obs ? `obs.contains=${obs}&` : '';
  const ativoRequest = ativo ? `ativo.contains=${ativo}&` : '';

  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}&` : '?'}`;
  return {
    type: ACTION_TYPES.FETCH_FRANQUIASTATUSATUAL_LIST,
    payload: axios.get<IFranquiaStatusAtual>(
      `${requestUrl}${statusAtualRequest}${obsRequest}${ativoRequest}cacheBuster=${new Date().getTime()}`
    )
  };
};

export const createEntity: ICrudPutAction<IFranquiaStatusAtual> = entity => async dispatch => {
  entity = {
    ...entity
  };
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_FRANQUIASTATUSATUAL,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IFranquiaStatusAtual> = entity => async dispatch => {
  entity = { ...entity };
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_FRANQUIASTATUSATUAL,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IFranquiaStatusAtual> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_FRANQUIASTATUSATUAL,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});

export const getFranquiaStatusAtualState = (location): IFranquiaStatusAtualBaseState => {
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
