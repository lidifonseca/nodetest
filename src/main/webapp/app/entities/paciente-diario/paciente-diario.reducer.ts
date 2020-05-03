/* eslint complexity: ["error", 100] */
import axios from 'axios';
import { ICrudGetAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { IPayload } from 'react-jhipster/src/type/redux-action.type';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IPacienteDiario, defaultValue } from 'app/shared/model/paciente-diario.model';

export const ACTION_TYPES = {
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

// Reducer

export default (state: PacienteDiarioState = initialState, action): PacienteDiarioState => {
  switch (action.type) {
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
      const { name, data, contentType } = action.payload;
      return {
        ...state,
        entity: {
          ...state.entity,
          [name]: data,
          [name + 'ContentType']: contentType
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
  idPaciente?: any,
  idUsuario?: any,
  page?: number,
  size?: number,
  sort?: string
) => IPayload<T> | ((dispatch: any) => IPayload<T>);

export const getEntities: ICrudGetAllActionPacienteDiario<IPacienteDiario> = (
  idOperadora,
  historico,
  ativo,
  idPaciente,
  idUsuario,
  page,
  size,
  sort
) => {
  const idOperadoraRequest = idOperadora ? `idOperadora.contains=${idOperadora}&` : '';
  const historicoRequest = historico ? `historico.contains=${historico}&` : '';
  const ativoRequest = ativo ? `ativo.contains=${ativo}&` : '';
  const idPacienteRequest = idPaciente ? `idPaciente.equals=${idPaciente}&` : '';
  const idUsuarioRequest = idUsuario ? `idUsuario.equals=${idUsuario}&` : '';

  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}&` : '?'}`;
  return {
    type: ACTION_TYPES.FETCH_PACIENTEDIARIO_LIST,
    payload: axios.get<IPacienteDiario>(
      `${requestUrl}${idOperadoraRequest}${historicoRequest}${ativoRequest}${idPacienteRequest}${idUsuarioRequest}cacheBuster=${new Date().getTime()}`
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

export const createEntity: ICrudPutAction<IPacienteDiario> = entity => async dispatch => {
  entity = {
    ...entity,
    idPaciente: entity.idPaciente === 'null' ? null : entity.idPaciente,
    idUsuario: entity.idUsuario === 'null' ? null : entity.idUsuario
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
    idPaciente: entity.idPaciente === 'null' ? null : entity.idPaciente,
    idUsuario: entity.idUsuario === 'null' ? null : entity.idUsuario
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

export const setBlob = (name, data, contentType?) => ({
  type: ACTION_TYPES.SET_BLOB,
  payload: {
    name,
    data,
    contentType
  }
});

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
