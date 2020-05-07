/* eslint complexity: ["error", 100] */
import axios from 'axios';
import { ICrudGetAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { IPayload } from 'react-jhipster/src/type/redux-action.type';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { INotificacaoConfigUsuario, defaultValue } from 'app/shared/model/notificacao-config-usuario.model';

export const ACTION_TYPES = {
  FETCH_NOTIFICACAOCONFIGUSUARIO_LIST_EXPORT: 'notificacaoConfigUsuario/FETCH_NOTIFICACAOCONFIGUSUARIO_LIST_EXPORT',
  FETCH_NOTIFICACAOCONFIGUSUARIO_LIST: 'notificacaoConfigUsuario/FETCH_NOTIFICACAOCONFIGUSUARIO_LIST',
  FETCH_NOTIFICACAOCONFIGUSUARIO: 'notificacaoConfigUsuario/FETCH_NOTIFICACAOCONFIGUSUARIO',
  CREATE_NOTIFICACAOCONFIGUSUARIO: 'notificacaoConfigUsuario/CREATE_NOTIFICACAOCONFIGUSUARIO',
  UPDATE_NOTIFICACAOCONFIGUSUARIO: 'notificacaoConfigUsuario/UPDATE_NOTIFICACAOCONFIGUSUARIO',
  DELETE_NOTIFICACAOCONFIGUSUARIO: 'notificacaoConfigUsuario/DELETE_NOTIFICACAOCONFIGUSUARIO',
  RESET: 'notificacaoConfigUsuario/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<INotificacaoConfigUsuario>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type NotificacaoConfigUsuarioState = Readonly<typeof initialState>;

export interface INotificacaoConfigUsuarioBaseState {
  baseFilters: any;
  notificacaoConfigId: any;
  profissionalId: any;
  pacienteId: any;
  atualizadoEm: any;
  atualizadoPor: any;
  enviarPush: any;
  enviarEmail: any;
  observacao: any;
}

export interface INotificacaoConfigUsuarioUpdateState {
  fieldsBase: INotificacaoConfigUsuarioBaseState;
  isNew: boolean;
}

// Reducer

export default (state: NotificacaoConfigUsuarioState = initialState, action): NotificacaoConfigUsuarioState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_NOTIFICACAOCONFIGUSUARIO_LIST_EXPORT):
    case REQUEST(ACTION_TYPES.FETCH_NOTIFICACAOCONFIGUSUARIO_LIST):
    case REQUEST(ACTION_TYPES.FETCH_NOTIFICACAOCONFIGUSUARIO):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_NOTIFICACAOCONFIGUSUARIO):
    case REQUEST(ACTION_TYPES.UPDATE_NOTIFICACAOCONFIGUSUARIO):
    case REQUEST(ACTION_TYPES.DELETE_NOTIFICACAOCONFIGUSUARIO):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_NOTIFICACAOCONFIGUSUARIO_LIST_EXPORT):
    case FAILURE(ACTION_TYPES.FETCH_NOTIFICACAOCONFIGUSUARIO_LIST):
    case FAILURE(ACTION_TYPES.FETCH_NOTIFICACAOCONFIGUSUARIO):
    case FAILURE(ACTION_TYPES.CREATE_NOTIFICACAOCONFIGUSUARIO):
    case FAILURE(ACTION_TYPES.UPDATE_NOTIFICACAOCONFIGUSUARIO):
    case FAILURE(ACTION_TYPES.DELETE_NOTIFICACAOCONFIGUSUARIO):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_NOTIFICACAOCONFIGUSUARIO_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10)
      };
    case SUCCESS(ACTION_TYPES.FETCH_NOTIFICACAOCONFIGUSUARIO):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_NOTIFICACAOCONFIGUSUARIO):
    case SUCCESS(ACTION_TYPES.UPDATE_NOTIFICACAOCONFIGUSUARIO):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_NOTIFICACAOCONFIGUSUARIO):
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

const apiUrl = 'api/notificacao-config-usuarios';

// Actions

// Actions
export type ICrudGetAllActionNotificacaoConfigUsuario<T> = (
  notificacaoConfigId?: any,
  profissionalId?: any,
  pacienteId?: any,
  atualizadoEm?: any,
  atualizadoPor?: any,
  enviarPush?: any,
  enviarEmail?: any,
  observacao?: any,
  page?: number,
  size?: number,
  sort?: string
) => IPayload<T> | ((dispatch: any) => IPayload<T>);

export const getEntities: ICrudGetAllActionNotificacaoConfigUsuario<INotificacaoConfigUsuario> = (
  notificacaoConfigId,
  profissionalId,
  pacienteId,
  atualizadoEm,
  atualizadoPor,
  enviarPush,
  enviarEmail,
  observacao,
  page,
  size,
  sort
) => {
  const notificacaoConfigIdRequest = notificacaoConfigId ? `notificacaoConfigId.contains=${notificacaoConfigId}&` : '';
  const profissionalIdRequest = profissionalId ? `profissionalId.contains=${profissionalId}&` : '';
  const pacienteIdRequest = pacienteId ? `pacienteId.contains=${pacienteId}&` : '';
  const atualizadoEmRequest = atualizadoEm ? `atualizadoEm.contains=${atualizadoEm}&` : '';
  const atualizadoPorRequest = atualizadoPor ? `atualizadoPor.contains=${atualizadoPor}&` : '';
  const enviarPushRequest = enviarPush ? `enviarPush.contains=${enviarPush}&` : '';
  const enviarEmailRequest = enviarEmail ? `enviarEmail.contains=${enviarEmail}&` : '';
  const observacaoRequest = observacao ? `observacao.contains=${observacao}&` : '';

  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}&` : '?'}`;
  return {
    type: ACTION_TYPES.FETCH_NOTIFICACAOCONFIGUSUARIO_LIST,
    payload: axios.get<INotificacaoConfigUsuario>(
      `${requestUrl}${notificacaoConfigIdRequest}${profissionalIdRequest}${pacienteIdRequest}${atualizadoEmRequest}${atualizadoPorRequest}${enviarPushRequest}${enviarEmailRequest}${observacaoRequest}cacheBuster=${new Date().getTime()}`
    )
  };
};
export const getEntity: ICrudGetAction<INotificacaoConfigUsuario> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_NOTIFICACAOCONFIGUSUARIO,
    payload: axios.get<INotificacaoConfigUsuario>(requestUrl)
  };
};

export const getEntitiesExport: ICrudGetAllActionNotificacaoConfigUsuario<INotificacaoConfigUsuario> = (
  notificacaoConfigId,
  profissionalId,
  pacienteId,
  atualizadoEm,
  atualizadoPor,
  enviarPush,
  enviarEmail,
  observacao,
  page,
  size,
  sort
) => {
  const notificacaoConfigIdRequest = notificacaoConfigId ? `notificacaoConfigId.contains=${notificacaoConfigId}&` : '';
  const profissionalIdRequest = profissionalId ? `profissionalId.contains=${profissionalId}&` : '';
  const pacienteIdRequest = pacienteId ? `pacienteId.contains=${pacienteId}&` : '';
  const atualizadoEmRequest = atualizadoEm ? `atualizadoEm.contains=${atualizadoEm}&` : '';
  const atualizadoPorRequest = atualizadoPor ? `atualizadoPor.contains=${atualizadoPor}&` : '';
  const enviarPushRequest = enviarPush ? `enviarPush.contains=${enviarPush}&` : '';
  const enviarEmailRequest = enviarEmail ? `enviarEmail.contains=${enviarEmail}&` : '';
  const observacaoRequest = observacao ? `observacao.contains=${observacao}&` : '';

  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}&` : '?'}`;
  return {
    type: ACTION_TYPES.FETCH_NOTIFICACAOCONFIGUSUARIO_LIST,
    payload: axios.get<INotificacaoConfigUsuario>(
      `${requestUrl}${notificacaoConfigIdRequest}${profissionalIdRequest}${pacienteIdRequest}${atualizadoEmRequest}${atualizadoPorRequest}${enviarPushRequest}${enviarEmailRequest}${observacaoRequest}cacheBuster=${new Date().getTime()}`
    )
  };
};

export const createEntity: ICrudPutAction<INotificacaoConfigUsuario> = entity => async dispatch => {
  entity = {
    ...entity
  };
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_NOTIFICACAOCONFIGUSUARIO,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<INotificacaoConfigUsuario> = entity => async dispatch => {
  entity = { ...entity };
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_NOTIFICACAOCONFIGUSUARIO,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<INotificacaoConfigUsuario> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_NOTIFICACAOCONFIGUSUARIO,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});

export const getNotificacaoConfigUsuarioState = (location): INotificacaoConfigUsuarioBaseState => {
  const url = new URL(`http://localhost${location.search}`); // using a dummy url for parsing
  const baseFilters = url.searchParams.get('baseFilters') || '';
  const notificacaoConfigId = url.searchParams.get('notificacaoConfigId') || '';
  const profissionalId = url.searchParams.get('profissionalId') || '';
  const pacienteId = url.searchParams.get('pacienteId') || '';
  const atualizadoEm = url.searchParams.get('atualizadoEm') || '';
  const atualizadoPor = url.searchParams.get('atualizadoPor') || '';
  const enviarPush = url.searchParams.get('enviarPush') || '';
  const enviarEmail = url.searchParams.get('enviarEmail') || '';
  const observacao = url.searchParams.get('observacao') || '';

  return {
    baseFilters,
    notificacaoConfigId,
    profissionalId,
    pacienteId,
    atualizadoEm,
    atualizadoPor,
    enviarPush,
    enviarEmail,
    observacao
  };
};
