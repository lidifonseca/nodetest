/* eslint complexity: ["error", 100] */
import axios from 'axios';
import { ICrudGetAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { IPayload } from 'react-jhipster/src/type/redux-action.type';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IPacientePush, defaultValue } from 'app/shared/model/paciente-push.model';

export const ACTION_TYPES = {
  FETCH_PACIENTEPUSH_LIST_EXPORT: 'pacientePush/FETCH_PACIENTEPUSH_LIST_EXPORT',
  FETCH_PACIENTEPUSH_LIST: 'pacientePush/FETCH_PACIENTEPUSH_LIST',
  FETCH_PACIENTEPUSH: 'pacientePush/FETCH_PACIENTEPUSH',
  CREATE_PACIENTEPUSH: 'pacientePush/CREATE_PACIENTEPUSH',
  UPDATE_PACIENTEPUSH: 'pacientePush/UPDATE_PACIENTEPUSH',
  DELETE_PACIENTEPUSH: 'pacientePush/DELETE_PACIENTEPUSH',
  RESET: 'pacientePush/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IPacientePush>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type PacientePushState = Readonly<typeof initialState>;

export interface IPacientePushBaseState {
  baseFilters: any;
  idFranquia: any;
  mensagem: any;
  ativo: any;
}

export interface IPacientePushUpdateState {
  fieldsBase: IPacientePushBaseState;

  isNew: boolean;
}

// Reducer

export default (state: PacientePushState = initialState, action): PacientePushState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_PACIENTEPUSH_LIST_EXPORT):
    case REQUEST(ACTION_TYPES.FETCH_PACIENTEPUSH_LIST):
    case REQUEST(ACTION_TYPES.FETCH_PACIENTEPUSH):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_PACIENTEPUSH):
    case REQUEST(ACTION_TYPES.UPDATE_PACIENTEPUSH):
    case REQUEST(ACTION_TYPES.DELETE_PACIENTEPUSH):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_PACIENTEPUSH_LIST_EXPORT):
    case FAILURE(ACTION_TYPES.FETCH_PACIENTEPUSH_LIST):
    case FAILURE(ACTION_TYPES.FETCH_PACIENTEPUSH):
    case FAILURE(ACTION_TYPES.CREATE_PACIENTEPUSH):
    case FAILURE(ACTION_TYPES.UPDATE_PACIENTEPUSH):
    case FAILURE(ACTION_TYPES.DELETE_PACIENTEPUSH):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_PACIENTEPUSH_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10)
      };
    case SUCCESS(ACTION_TYPES.FETCH_PACIENTEPUSH):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_PACIENTEPUSH):
    case SUCCESS(ACTION_TYPES.UPDATE_PACIENTEPUSH):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_PACIENTEPUSH):
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

const apiUrl = 'api/paciente-pushes';

// Actions

// Actions
export type ICrudGetAllActionPacientePush<T> = (
  idFranquia?: any,
  mensagem?: any,
  ativo?: any,
  page?: number,
  size?: number,
  sort?: string
) => IPayload<T> | ((dispatch: any) => IPayload<T>);

export const getEntities: ICrudGetAllActionPacientePush<IPacientePush> = (idFranquia, mensagem, ativo, page, size, sort) => {
  const idFranquiaRequest = idFranquia ? `idFranquia.contains=${idFranquia}&` : '';
  const mensagemRequest = mensagem ? `mensagem.contains=${mensagem}&` : '';
  const ativoRequest = ativo ? `ativo.contains=${ativo}&` : '';

  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}&` : '?'}`;
  return {
    type: ACTION_TYPES.FETCH_PACIENTEPUSH_LIST,
    payload: axios.get<IPacientePush>(
      `${requestUrl}${idFranquiaRequest}${mensagemRequest}${ativoRequest}cacheBuster=${new Date().getTime()}`
    )
  };
};
export const getEntity: ICrudGetAction<IPacientePush> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_PACIENTEPUSH,
    payload: axios.get<IPacientePush>(requestUrl)
  };
};

export const getEntitiesExport: ICrudGetAllActionPacientePush<IPacientePush> = (idFranquia, mensagem, ativo, page, size, sort) => {
  const idFranquiaRequest = idFranquia ? `idFranquia.contains=${idFranquia}&` : '';
  const mensagemRequest = mensagem ? `mensagem.contains=${mensagem}&` : '';
  const ativoRequest = ativo ? `ativo.contains=${ativo}&` : '';

  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}&` : '?'}`;
  return {
    type: ACTION_TYPES.FETCH_PACIENTEPUSH_LIST,
    payload: axios.get<IPacientePush>(
      `${requestUrl}${idFranquiaRequest}${mensagemRequest}${ativoRequest}cacheBuster=${new Date().getTime()}`
    )
  };
};

export const createEntity: ICrudPutAction<IPacientePush> = entity => async dispatch => {
  entity = {
    ...entity
  };
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_PACIENTEPUSH,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IPacientePush> = entity => async dispatch => {
  entity = { ...entity };
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_PACIENTEPUSH,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IPacientePush> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_PACIENTEPUSH,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});

export const getPacientePushState = (location): IPacientePushBaseState => {
  const url = new URL(`http://localhost${location.search}`); // using a dummy url for parsing
  const baseFilters = url.searchParams.get('baseFilters') || '';
  const idFranquia = url.searchParams.get('idFranquia') || '';
  const mensagem = url.searchParams.get('mensagem') || '';
  const ativo = url.searchParams.get('ativo') || '';

  return {
    baseFilters,
    idFranquia,
    mensagem,
    ativo
  };
};
