/* eslint complexity: ["error", 100] */
import axios from 'axios';
import { ICrudGetAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { IPayload } from 'react-jhipster/src/type/redux-action.type';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IPacienteStatusAtual, defaultValue } from 'app/shared/model/paciente-status-atual.model';

export const ACTION_TYPES = {
  FETCH_PACIENTESTATUSATUAL_LIST_EXPORT: 'pacienteStatusAtual/FETCH_PACIENTESTATUSATUAL_LIST_EXPORT',
  FETCH_PACIENTESTATUSATUAL_LIST: 'pacienteStatusAtual/FETCH_PACIENTESTATUSATUAL_LIST',
  FETCH_PACIENTESTATUSATUAL: 'pacienteStatusAtual/FETCH_PACIENTESTATUSATUAL',
  CREATE_PACIENTESTATUSATUAL: 'pacienteStatusAtual/CREATE_PACIENTESTATUSATUAL',
  UPDATE_PACIENTESTATUSATUAL: 'pacienteStatusAtual/UPDATE_PACIENTESTATUSATUAL',
  DELETE_PACIENTESTATUSATUAL: 'pacienteStatusAtual/DELETE_PACIENTESTATUSATUAL',
  RESET: 'pacienteStatusAtual/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IPacienteStatusAtual>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type PacienteStatusAtualState = Readonly<typeof initialState>;

export interface IPacienteStatusAtualBaseState {
  dataStatus: any;
  observacao: any;
  ativo: any;
  idUsuario: any;
  paciente: any;
  status: any;
}

// Reducer

export default (state: PacienteStatusAtualState = initialState, action): PacienteStatusAtualState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_PACIENTESTATUSATUAL_LIST_EXPORT):
    case REQUEST(ACTION_TYPES.FETCH_PACIENTESTATUSATUAL_LIST):
    case REQUEST(ACTION_TYPES.FETCH_PACIENTESTATUSATUAL):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_PACIENTESTATUSATUAL):
    case REQUEST(ACTION_TYPES.UPDATE_PACIENTESTATUSATUAL):
    case REQUEST(ACTION_TYPES.DELETE_PACIENTESTATUSATUAL):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_PACIENTESTATUSATUAL_LIST_EXPORT):
    case FAILURE(ACTION_TYPES.FETCH_PACIENTESTATUSATUAL_LIST):
    case FAILURE(ACTION_TYPES.FETCH_PACIENTESTATUSATUAL):
    case FAILURE(ACTION_TYPES.CREATE_PACIENTESTATUSATUAL):
    case FAILURE(ACTION_TYPES.UPDATE_PACIENTESTATUSATUAL):
    case FAILURE(ACTION_TYPES.DELETE_PACIENTESTATUSATUAL):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_PACIENTESTATUSATUAL_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10)
      };
    case SUCCESS(ACTION_TYPES.FETCH_PACIENTESTATUSATUAL):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_PACIENTESTATUSATUAL):
    case SUCCESS(ACTION_TYPES.UPDATE_PACIENTESTATUSATUAL):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_PACIENTESTATUSATUAL):
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

const apiUrl = 'api/paciente-status-atuals';

// Actions

// Actions
export type ICrudGetAllActionPacienteStatusAtual<T> = (
  dataStatus?: any,
  observacao?: any,
  ativo?: any,
  idUsuario?: any,
  paciente?: any,
  status?: any,
  page?: number,
  size?: number,
  sort?: string
) => IPayload<T> | ((dispatch: any) => IPayload<T>);

export const getEntities: ICrudGetAllActionPacienteStatusAtual<IPacienteStatusAtual> = (
  dataStatus,
  observacao,
  ativo,
  idUsuario,
  paciente,
  status,
  page,
  size,
  sort
) => {
  const dataStatusRequest = dataStatus ? `dataStatus.equals=${dataStatus}&` : '';
  const observacaoRequest = observacao ? `observacao.contains=${observacao}&` : '';
  const ativoRequest = ativo ? `ativo.contains=${ativo}&` : '';
  const idUsuarioRequest = idUsuario ? `idUsuario.contains=${idUsuario}&` : '';
  const pacienteRequest = paciente ? `paciente.equals=${paciente}&` : '';
  const statusRequest = status ? `status.equals=${status}&` : '';

  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}&` : '?'}`;
  return {
    type: ACTION_TYPES.FETCH_PACIENTESTATUSATUAL_LIST,
    payload: axios.get<IPacienteStatusAtual>(
      `${requestUrl}${dataStatusRequest}${observacaoRequest}${ativoRequest}${idUsuarioRequest}${pacienteRequest}${statusRequest}cacheBuster=${new Date().getTime()}`
    )
  };
};
export const getEntity: ICrudGetAction<IPacienteStatusAtual> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_PACIENTESTATUSATUAL,
    payload: axios.get<IPacienteStatusAtual>(requestUrl)
  };
};

export const getEntitiesExport: ICrudGetAllActionPacienteStatusAtual<IPacienteStatusAtual> = (
  dataStatus,
  observacao,
  ativo,
  idUsuario,
  paciente,
  status,
  page,
  size,
  sort
) => {
  const dataStatusRequest = dataStatus ? `dataStatus.equals=${dataStatus}&` : '';
  const observacaoRequest = observacao ? `observacao.contains=${observacao}&` : '';
  const ativoRequest = ativo ? `ativo.contains=${ativo}&` : '';
  const idUsuarioRequest = idUsuario ? `idUsuario.contains=${idUsuario}&` : '';
  const pacienteRequest = paciente ? `paciente.equals=${paciente}&` : '';
  const statusRequest = status ? `status.equals=${status}&` : '';

  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}&` : '?'}`;
  return {
    type: ACTION_TYPES.FETCH_PACIENTESTATUSATUAL_LIST,
    payload: axios.get<IPacienteStatusAtual>(
      `${requestUrl}${dataStatusRequest}${observacaoRequest}${ativoRequest}${idUsuarioRequest}${pacienteRequest}${statusRequest}cacheBuster=${new Date().getTime()}`
    )
  };
};

export const createEntity: ICrudPutAction<IPacienteStatusAtual> = entity => async dispatch => {
  entity = {
    ...entity,
    paciente: entity.paciente === 'null' ? null : entity.paciente,
    status: entity.status === 'null' ? null : entity.status
  };
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_PACIENTESTATUSATUAL,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IPacienteStatusAtual> = entity => async dispatch => {
  entity = {
    ...entity,
    paciente: entity.paciente === 'null' ? null : entity.paciente,
    status: entity.status === 'null' ? null : entity.status
  };
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_PACIENTESTATUSATUAL,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IPacienteStatusAtual> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_PACIENTESTATUSATUAL,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});

export const getPacienteStatusAtualState = (location): IPacienteStatusAtualBaseState => {
  const url = new URL(`http://localhost${location.search}`); // using a dummy url for parsing
  const dataStatus = url.searchParams.get('dataStatus') || '';
  const observacao = url.searchParams.get('observacao') || '';
  const ativo = url.searchParams.get('ativo') || '';
  const idUsuario = url.searchParams.get('idUsuario') || '';

  const paciente = url.searchParams.get('paciente') || '';
  const status = url.searchParams.get('status') || '';

  return {
    dataStatus,
    observacao,
    ativo,
    idUsuario,
    paciente,
    status
  };
};
