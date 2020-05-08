/* eslint complexity: ["error", 100] */
import axios from 'axios';
import { ICrudGetAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { IPayload } from 'react-jhipster/src/type/redux-action.type';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IUsuarioPanico, defaultValue } from 'app/shared/model/usuario-panico.model';

export const ACTION_TYPES = {
  FETCH_USUARIOPANICO_LIST_EXPORT: 'usuarioPanico/FETCH_USUARIOPANICO_LIST_EXPORT',
  FETCH_USUARIOPANICO_LIST: 'usuarioPanico/FETCH_USUARIOPANICO_LIST',
  FETCH_USUARIOPANICO: 'usuarioPanico/FETCH_USUARIOPANICO',
  CREATE_USUARIOPANICO: 'usuarioPanico/CREATE_USUARIOPANICO',
  UPDATE_USUARIOPANICO: 'usuarioPanico/UPDATE_USUARIOPANICO',
  DELETE_USUARIOPANICO: 'usuarioPanico/DELETE_USUARIOPANICO',
  RESET: 'usuarioPanico/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IUsuarioPanico>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type UsuarioPanicoState = Readonly<typeof initialState>;

export interface IUsuarioPanicoBaseState {
  baseFilters: any;
  idPaciente: any;
  idProfissional: any;
  observacao: any;
  resolvido: any;
  idUserResolvido: any;
}

export interface IUsuarioPanicoUpdateState {
  fieldsBase: IUsuarioPanicoBaseState;

  isNew: boolean;
}

// Reducer

export default (state: UsuarioPanicoState = initialState, action): UsuarioPanicoState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_USUARIOPANICO_LIST_EXPORT):
    case REQUEST(ACTION_TYPES.FETCH_USUARIOPANICO_LIST):
    case REQUEST(ACTION_TYPES.FETCH_USUARIOPANICO):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_USUARIOPANICO):
    case REQUEST(ACTION_TYPES.UPDATE_USUARIOPANICO):
    case REQUEST(ACTION_TYPES.DELETE_USUARIOPANICO):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_USUARIOPANICO_LIST_EXPORT):
    case FAILURE(ACTION_TYPES.FETCH_USUARIOPANICO_LIST):
    case FAILURE(ACTION_TYPES.FETCH_USUARIOPANICO):
    case FAILURE(ACTION_TYPES.CREATE_USUARIOPANICO):
    case FAILURE(ACTION_TYPES.UPDATE_USUARIOPANICO):
    case FAILURE(ACTION_TYPES.DELETE_USUARIOPANICO):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_USUARIOPANICO_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10)
      };
    case SUCCESS(ACTION_TYPES.FETCH_USUARIOPANICO):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_USUARIOPANICO):
    case SUCCESS(ACTION_TYPES.UPDATE_USUARIOPANICO):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_USUARIOPANICO):
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

const apiUrl = 'api/usuario-panicos';

// Actions

// Actions
export type ICrudGetAllActionUsuarioPanico<T> = (
  idPaciente?: any,
  idProfissional?: any,
  observacao?: any,
  resolvido?: any,
  idUserResolvido?: any,
  page?: number,
  size?: number,
  sort?: string
) => IPayload<T> | ((dispatch: any) => IPayload<T>);

export const getEntities: ICrudGetAllActionUsuarioPanico<IUsuarioPanico> = (
  idPaciente,
  idProfissional,
  observacao,
  resolvido,
  idUserResolvido,
  page,
  size,
  sort
) => {
  const idPacienteRequest = idPaciente ? `idPaciente.contains=${idPaciente}&` : '';
  const idProfissionalRequest = idProfissional ? `idProfissional.contains=${idProfissional}&` : '';
  const observacaoRequest = observacao ? `observacao.contains=${observacao}&` : '';
  const resolvidoRequest = resolvido ? `resolvido.contains=${resolvido}&` : '';
  const idUserResolvidoRequest = idUserResolvido ? `idUserResolvido.contains=${idUserResolvido}&` : '';

  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}&` : '?'}`;
  return {
    type: ACTION_TYPES.FETCH_USUARIOPANICO_LIST,
    payload: axios.get<IUsuarioPanico>(
      `${requestUrl}${idPacienteRequest}${idProfissionalRequest}${observacaoRequest}${resolvidoRequest}${idUserResolvidoRequest}cacheBuster=${new Date().getTime()}`
    )
  };
};
export const getEntity: ICrudGetAction<IUsuarioPanico> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_USUARIOPANICO,
    payload: axios.get<IUsuarioPanico>(requestUrl)
  };
};

export const getEntitiesExport: ICrudGetAllActionUsuarioPanico<IUsuarioPanico> = (
  idPaciente,
  idProfissional,
  observacao,
  resolvido,
  idUserResolvido,
  page,
  size,
  sort
) => {
  const idPacienteRequest = idPaciente ? `idPaciente.contains=${idPaciente}&` : '';
  const idProfissionalRequest = idProfissional ? `idProfissional.contains=${idProfissional}&` : '';
  const observacaoRequest = observacao ? `observacao.contains=${observacao}&` : '';
  const resolvidoRequest = resolvido ? `resolvido.contains=${resolvido}&` : '';
  const idUserResolvidoRequest = idUserResolvido ? `idUserResolvido.contains=${idUserResolvido}&` : '';

  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}&` : '?'}`;
  return {
    type: ACTION_TYPES.FETCH_USUARIOPANICO_LIST,
    payload: axios.get<IUsuarioPanico>(
      `${requestUrl}${idPacienteRequest}${idProfissionalRequest}${observacaoRequest}${resolvidoRequest}${idUserResolvidoRequest}cacheBuster=${new Date().getTime()}`
    )
  };
};

export const createEntity: ICrudPutAction<IUsuarioPanico> = entity => async dispatch => {
  entity = {
    ...entity
  };
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_USUARIOPANICO,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IUsuarioPanico> = entity => async dispatch => {
  entity = { ...entity };
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_USUARIOPANICO,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IUsuarioPanico> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_USUARIOPANICO,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});

export const getUsuarioPanicoState = (location): IUsuarioPanicoBaseState => {
  const url = new URL(`http://localhost${location.search}`); // using a dummy url for parsing
  const baseFilters = url.searchParams.get('baseFilters') || '';
  const idPaciente = url.searchParams.get('idPaciente') || '';
  const idProfissional = url.searchParams.get('idProfissional') || '';
  const observacao = url.searchParams.get('observacao') || '';
  const resolvido = url.searchParams.get('resolvido') || '';
  const idUserResolvido = url.searchParams.get('idUserResolvido') || '';

  return {
    baseFilters,
    idPaciente,
    idProfissional,
    observacao,
    resolvido,
    idUserResolvido
  };
};
