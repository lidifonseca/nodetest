/* eslint complexity: ["error", 100] */
import axios from 'axios';
import { ICrudGetAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { IPayload } from 'react-jhipster/src/type/redux-action.type';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { ITokenUsuario, defaultValue } from 'app/shared/model/token-usuario.model';

export const ACTION_TYPES = {
  FETCH_TOKENUSUARIO_LIST_EXPORT: 'tokenUsuario/FETCH_TOKENUSUARIO_LIST_EXPORT',
  FETCH_TOKENUSUARIO_LIST: 'tokenUsuario/FETCH_TOKENUSUARIO_LIST',
  FETCH_TOKENUSUARIO: 'tokenUsuario/FETCH_TOKENUSUARIO',
  CREATE_TOKENUSUARIO: 'tokenUsuario/CREATE_TOKENUSUARIO',
  UPDATE_TOKENUSUARIO: 'tokenUsuario/UPDATE_TOKENUSUARIO',
  DELETE_TOKENUSUARIO: 'tokenUsuario/DELETE_TOKENUSUARIO',
  RESET: 'tokenUsuario/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<ITokenUsuario>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type TokenUsuarioState = Readonly<typeof initialState>;

export interface ITokenUsuarioBaseState {
  baseFilters: any;
  idPaciente: any;
  token: any;
  dataValida: any;
}

export interface ITokenUsuarioUpdateState {
  fieldsBase: ITokenUsuarioBaseState;
  isNew: boolean;
}

// Reducer

export default (state: TokenUsuarioState = initialState, action): TokenUsuarioState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_TOKENUSUARIO_LIST_EXPORT):
    case REQUEST(ACTION_TYPES.FETCH_TOKENUSUARIO_LIST):
    case REQUEST(ACTION_TYPES.FETCH_TOKENUSUARIO):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_TOKENUSUARIO):
    case REQUEST(ACTION_TYPES.UPDATE_TOKENUSUARIO):
    case REQUEST(ACTION_TYPES.DELETE_TOKENUSUARIO):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_TOKENUSUARIO_LIST_EXPORT):
    case FAILURE(ACTION_TYPES.FETCH_TOKENUSUARIO_LIST):
    case FAILURE(ACTION_TYPES.FETCH_TOKENUSUARIO):
    case FAILURE(ACTION_TYPES.CREATE_TOKENUSUARIO):
    case FAILURE(ACTION_TYPES.UPDATE_TOKENUSUARIO):
    case FAILURE(ACTION_TYPES.DELETE_TOKENUSUARIO):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_TOKENUSUARIO_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10)
      };
    case SUCCESS(ACTION_TYPES.FETCH_TOKENUSUARIO):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_TOKENUSUARIO):
    case SUCCESS(ACTION_TYPES.UPDATE_TOKENUSUARIO):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_TOKENUSUARIO):
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

const apiUrl = 'api/token-usuarios';

// Actions

// Actions
export type ICrudGetAllActionTokenUsuario<T> = (
  idPaciente?: any,
  token?: any,
  dataValida?: any,
  page?: number,
  size?: number,
  sort?: string
) => IPayload<T> | ((dispatch: any) => IPayload<T>);

export const getEntities: ICrudGetAllActionTokenUsuario<ITokenUsuario> = (idPaciente, token, dataValida, page, size, sort) => {
  const idPacienteRequest = idPaciente ? `idPaciente.contains=${idPaciente}&` : '';
  const tokenRequest = token ? `token.contains=${token}&` : '';
  const dataValidaRequest = dataValida ? `dataValida.contains=${dataValida}&` : '';

  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}&` : '?'}`;
  return {
    type: ACTION_TYPES.FETCH_TOKENUSUARIO_LIST,
    payload: axios.get<ITokenUsuario>(
      `${requestUrl}${idPacienteRequest}${tokenRequest}${dataValidaRequest}cacheBuster=${new Date().getTime()}`
    )
  };
};
export const getEntity: ICrudGetAction<ITokenUsuario> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_TOKENUSUARIO,
    payload: axios.get<ITokenUsuario>(requestUrl)
  };
};

export const getEntitiesExport: ICrudGetAllActionTokenUsuario<ITokenUsuario> = (idPaciente, token, dataValida, page, size, sort) => {
  const idPacienteRequest = idPaciente ? `idPaciente.contains=${idPaciente}&` : '';
  const tokenRequest = token ? `token.contains=${token}&` : '';
  const dataValidaRequest = dataValida ? `dataValida.contains=${dataValida}&` : '';

  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}&` : '?'}`;
  return {
    type: ACTION_TYPES.FETCH_TOKENUSUARIO_LIST,
    payload: axios.get<ITokenUsuario>(
      `${requestUrl}${idPacienteRequest}${tokenRequest}${dataValidaRequest}cacheBuster=${new Date().getTime()}`
    )
  };
};

export const createEntity: ICrudPutAction<ITokenUsuario> = entity => async dispatch => {
  entity = {
    ...entity
  };
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_TOKENUSUARIO,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<ITokenUsuario> = entity => async dispatch => {
  entity = { ...entity };
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_TOKENUSUARIO,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<ITokenUsuario> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_TOKENUSUARIO,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});

export const getTokenUsuarioState = (location): ITokenUsuarioBaseState => {
  const url = new URL(`http://localhost${location.search}`); // using a dummy url for parsing
  const baseFilters = url.searchParams.get('baseFilters') || '';
  const idPaciente = url.searchParams.get('idPaciente') || '';
  const token = url.searchParams.get('token') || '';
  const dataValida = url.searchParams.get('dataValida') || '';

  return {
    baseFilters,
    idPaciente,
    token,
    dataValida
  };
};
