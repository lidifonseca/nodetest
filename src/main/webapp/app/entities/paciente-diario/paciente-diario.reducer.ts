/* eslint complexity: ["error", 100] */
import axios from 'axios';
import { ICrudGetAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { IPayload } from 'react-jhipster/src/type/redux-action.type';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IPacienteDiario, defaultValue } from 'app/shared/model/paciente-diario.model';

export const ACTION_TYPES = {
  FETCH_PACIENTEDIARIO_LIST_EXPORT: 'pacienteDiario/FETCH_PACIENTEDIARIO_LIST_EXPORT',
  FETCH_PACIENTEDIARIO_LIST: 'pacienteDiario/FETCH_PACIENTEDIARIO_LIST',
  FETCH_PACIENTEDIARIO: 'pacienteDiario/FETCH_PACIENTEDIARIO',
  CREATE_PACIENTEDIARIO: 'pacienteDiario/CREATE_PACIENTEDIARIO',
  UPDATE_PACIENTEDIARIO: 'pacienteDiario/UPDATE_PACIENTEDIARIO',
  DELETE_PACIENTEDIARIO: 'pacienteDiario/DELETE_PACIENTEDIARIO',
  SET_BLOB: 'pacienteDiario/SET_BLOB',
  RESET: 'pacienteDiario/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IPacienteDiario>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type PacienteDiarioState = Readonly<typeof initialState>;

export interface IPacienteDiarioBaseState {
  baseFilters: any;
  idOperadora: any;
  historico: any;
  ativo: any;
  paciente: any;
  usuario: any;
}

export interface IPacienteDiarioUpdateState {
  fieldsBase: IPacienteDiarioBaseState;

  pacienteSelectValue: any;
  usuarioSelectValue: any;
  isNew: boolean;
  pacienteId: string;
  usuarioId: string;
}

// Reducer

export default (state: PacienteDiarioState = initialState, action): PacienteDiarioState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_PACIENTEDIARIO_LIST_EXPORT):
    case REQUEST(ACTION_TYPES.FETCH_PACIENTEDIARIO_LIST):
    case REQUEST(ACTION_TYPES.FETCH_PACIENTEDIARIO):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_PACIENTEDIARIO):
    case REQUEST(ACTION_TYPES.UPDATE_PACIENTEDIARIO):
    case REQUEST(ACTION_TYPES.DELETE_PACIENTEDIARIO):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_PACIENTEDIARIO_LIST_EXPORT):
    case FAILURE(ACTION_TYPES.FETCH_PACIENTEDIARIO_LIST):
    case FAILURE(ACTION_TYPES.FETCH_PACIENTEDIARIO):
    case FAILURE(ACTION_TYPES.CREATE_PACIENTEDIARIO):
    case FAILURE(ACTION_TYPES.UPDATE_PACIENTEDIARIO):
    case FAILURE(ACTION_TYPES.DELETE_PACIENTEDIARIO):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_PACIENTEDIARIO_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10)
      };
    case SUCCESS(ACTION_TYPES.FETCH_PACIENTEDIARIO):
      action.payload.data.historico = action.payload.data.historico
        ? Buffer.from(action.payload.data.historico).toString()
        : action.payload.data.historico;
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_PACIENTEDIARIO):
    case SUCCESS(ACTION_TYPES.UPDATE_PACIENTEDIARIO):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_PACIENTEDIARIO):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {}
      };
    case ACTION_TYPES.SET_BLOB: {
      const { name, data, contentType, fileName } = action.payload;
      return {
        ...state,
        entity: {
          ...state.entity,
          [name + 'Base64']: data,
          [name + 'ContentType']: contentType,
          [name + 'FileName']: fileName
        }
      };
    }
    case ACTION_TYPES.RESET:
      return {
        ...initialState
      };
    default:
      return state;
  }
};

const apiUrl = 'api/paciente-diarios';

// Actions

// Actions
export type ICrudGetAllActionPacienteDiario<T> = (
  idOperadora?: any,
  historico?: any,
  ativo?: any,
  paciente?: any,
  usuario?: any,
  page?: number,
  size?: number,
  sort?: string
) => IPayload<T> | ((dispatch: any) => IPayload<T>);

export const getEntities: ICrudGetAllActionPacienteDiario<IPacienteDiario> = (
  idOperadora,
  historico,
  ativo,
  paciente,
  usuario,
  page,
  size,
  sort
) => {
  const idOperadoraRequest = idOperadora ? `idOperadora.contains=${idOperadora}&` : '';
  const historicoRequest = historico ? `historico.contains=${historico}&` : '';
  const ativoRequest = ativo ? `ativo.contains=${ativo}&` : '';
  const pacienteRequest = paciente ? `paciente.equals=${paciente}&` : '';
  const usuarioRequest = usuario ? `usuario.equals=${usuario}&` : '';

  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}&` : '?'}`;
  return {
    type: ACTION_TYPES.FETCH_PACIENTEDIARIO_LIST,
    payload: axios.get<IPacienteDiario>(
      `${requestUrl}${idOperadoraRequest}${historicoRequest}${ativoRequest}${pacienteRequest}${usuarioRequest}cacheBuster=${new Date().getTime()}`
    )
  };
};
export const getEntity: ICrudGetAction<IPacienteDiario> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_PACIENTEDIARIO,
    payload: axios.get<IPacienteDiario>(requestUrl)
  };
};

export const getEntitiesExport: ICrudGetAllActionPacienteDiario<IPacienteDiario> = (
  idOperadora,
  historico,
  ativo,
  paciente,
  usuario,
  page,
  size,
  sort
) => {
  const idOperadoraRequest = idOperadora ? `idOperadora.contains=${idOperadora}&` : '';
  const historicoRequest = historico ? `historico.contains=${historico}&` : '';
  const ativoRequest = ativo ? `ativo.contains=${ativo}&` : '';
  const pacienteRequest = paciente ? `paciente.equals=${paciente}&` : '';
  const usuarioRequest = usuario ? `usuario.equals=${usuario}&` : '';

  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}&` : '?'}`;
  return {
    type: ACTION_TYPES.FETCH_PACIENTEDIARIO_LIST,
    payload: axios.get<IPacienteDiario>(
      `${requestUrl}${idOperadoraRequest}${historicoRequest}${ativoRequest}${pacienteRequest}${usuarioRequest}cacheBuster=${new Date().getTime()}`
    )
  };
};

export const createEntity: ICrudPutAction<IPacienteDiario> = entity => async dispatch => {
  entity = {
    ...entity,
    paciente: entity.paciente === 'null' ? null : entity.paciente,
    usuario: entity.usuario === 'null' ? null : entity.usuario
  };
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_PACIENTEDIARIO,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IPacienteDiario> = entity => async dispatch => {
  entity = {
    ...entity,
    paciente: entity.paciente === 'null' ? null : entity.paciente,
    usuario: entity.usuario === 'null' ? null : entity.usuario
  };
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_PACIENTEDIARIO,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IPacienteDiario> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_PACIENTEDIARIO,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const setBlob = (name, data, contentType?, fileName?) => ({
  type: ACTION_TYPES.SET_BLOB,
  payload: {
    name,
    data,
    contentType,
    fileName
  }
});

export const reset = () => ({
  type: ACTION_TYPES.RESET
});

export const getPacienteDiarioState = (location): IPacienteDiarioBaseState => {
  const url = new URL(`http://localhost${location.search}`); // using a dummy url for parsing
  const baseFilters = url.searchParams.get('baseFilters') || '';
  const idOperadora = url.searchParams.get('idOperadora') || '';
  const historico = url.searchParams.get('historico') || '';
  const ativo = url.searchParams.get('ativo') || '';

  const paciente = url.searchParams.get('paciente') || '';
  const usuario = url.searchParams.get('usuario') || '';

  return {
    baseFilters,
    idOperadora,
    historico,
    ativo,
    paciente,
    usuario
  };
};
