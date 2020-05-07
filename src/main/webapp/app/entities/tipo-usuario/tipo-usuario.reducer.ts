/* eslint complexity: ["error", 100] */
import axios from 'axios';
import { ICrudGetAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { IPayload } from 'react-jhipster/src/type/redux-action.type';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { ITipoUsuario, defaultValue } from 'app/shared/model/tipo-usuario.model';

export const ACTION_TYPES = {
  FETCH_TIPOUSUARIO_LIST_EXPORT: 'tipoUsuario/FETCH_TIPOUSUARIO_LIST_EXPORT',
  FETCH_TIPOUSUARIO_LIST: 'tipoUsuario/FETCH_TIPOUSUARIO_LIST',
  FETCH_TIPOUSUARIO: 'tipoUsuario/FETCH_TIPOUSUARIO',
  CREATE_TIPOUSUARIO: 'tipoUsuario/CREATE_TIPOUSUARIO',
  UPDATE_TIPOUSUARIO: 'tipoUsuario/UPDATE_TIPOUSUARIO',
  DELETE_TIPOUSUARIO: 'tipoUsuario/DELETE_TIPOUSUARIO',
  RESET: 'tipoUsuario/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<ITipoUsuario>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type TipoUsuarioState = Readonly<typeof initialState>;

export interface ITipoUsuarioBaseState {
  baseFilters: any;
  tipoUsuario: any;
  ativo: any;
}

export interface ITipoUsuarioUpdateState {
  fieldsBase: ITipoUsuarioBaseState;
  isNew: boolean;
}

// Reducer

export default (state: TipoUsuarioState = initialState, action): TipoUsuarioState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_TIPOUSUARIO_LIST_EXPORT):
    case REQUEST(ACTION_TYPES.FETCH_TIPOUSUARIO_LIST):
    case REQUEST(ACTION_TYPES.FETCH_TIPOUSUARIO):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_TIPOUSUARIO):
    case REQUEST(ACTION_TYPES.UPDATE_TIPOUSUARIO):
    case REQUEST(ACTION_TYPES.DELETE_TIPOUSUARIO):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_TIPOUSUARIO_LIST_EXPORT):
    case FAILURE(ACTION_TYPES.FETCH_TIPOUSUARIO_LIST):
    case FAILURE(ACTION_TYPES.FETCH_TIPOUSUARIO):
    case FAILURE(ACTION_TYPES.CREATE_TIPOUSUARIO):
    case FAILURE(ACTION_TYPES.UPDATE_TIPOUSUARIO):
    case FAILURE(ACTION_TYPES.DELETE_TIPOUSUARIO):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_TIPOUSUARIO_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10)
      };
    case SUCCESS(ACTION_TYPES.FETCH_TIPOUSUARIO):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_TIPOUSUARIO):
    case SUCCESS(ACTION_TYPES.UPDATE_TIPOUSUARIO):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_TIPOUSUARIO):
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

const apiUrl = 'api/tipo-usuarios';

// Actions

// Actions
export type ICrudGetAllActionTipoUsuario<T> = (
  tipoUsuario?: any,
  ativo?: any,
  page?: number,
  size?: number,
  sort?: string
) => IPayload<T> | ((dispatch: any) => IPayload<T>);

export const getEntities: ICrudGetAllActionTipoUsuario<ITipoUsuario> = (tipoUsuario, ativo, page, size, sort) => {
  const tipoUsuarioRequest = tipoUsuario ? `tipoUsuario.contains=${tipoUsuario}&` : '';
  const ativoRequest = ativo ? `ativo.contains=${ativo}&` : '';

  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}&` : '?'}`;
  return {
    type: ACTION_TYPES.FETCH_TIPOUSUARIO_LIST,
    payload: axios.get<ITipoUsuario>(`${requestUrl}${tipoUsuarioRequest}${ativoRequest}cacheBuster=${new Date().getTime()}`)
  };
};
export const getEntity: ICrudGetAction<ITipoUsuario> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_TIPOUSUARIO,
    payload: axios.get<ITipoUsuario>(requestUrl)
  };
};

export const getEntitiesExport: ICrudGetAllActionTipoUsuario<ITipoUsuario> = (tipoUsuario, ativo, page, size, sort) => {
  const tipoUsuarioRequest = tipoUsuario ? `tipoUsuario.contains=${tipoUsuario}&` : '';
  const ativoRequest = ativo ? `ativo.contains=${ativo}&` : '';

  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}&` : '?'}`;
  return {
    type: ACTION_TYPES.FETCH_TIPOUSUARIO_LIST,
    payload: axios.get<ITipoUsuario>(`${requestUrl}${tipoUsuarioRequest}${ativoRequest}cacheBuster=${new Date().getTime()}`)
  };
};

export const createEntity: ICrudPutAction<ITipoUsuario> = entity => async dispatch => {
  entity = {
    ...entity
  };
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_TIPOUSUARIO,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<ITipoUsuario> = entity => async dispatch => {
  entity = { ...entity };
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_TIPOUSUARIO,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<ITipoUsuario> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_TIPOUSUARIO,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});

export const getTipoUsuarioState = (location): ITipoUsuarioBaseState => {
  const url = new URL(`http://localhost${location.search}`); // using a dummy url for parsing
  const baseFilters = url.searchParams.get('baseFilters') || '';
  const tipoUsuario = url.searchParams.get('tipoUsuario') || '';
  const ativo = url.searchParams.get('ativo') || '';

  return {
    baseFilters,
    tipoUsuario,
    ativo
  };
};
