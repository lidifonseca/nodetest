/* eslint complexity: ["error", 100] */
import axios from 'axios';
import { ICrudGetAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { IPayload } from 'react-jhipster/src/type/redux-action.type';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IPacienteCaracteristicaAtual, defaultValue } from 'app/shared/model/paciente-caracteristica-atual.model';

export const ACTION_TYPES = {
  FETCH_PACIENTECARACTERISTICAATUAL_LIST_EXPORT: 'pacienteCaracteristicaAtual/FETCH_PACIENTECARACTERISTICAATUAL_LIST_EXPORT',
  FETCH_PACIENTECARACTERISTICAATUAL_LIST: 'pacienteCaracteristicaAtual/FETCH_PACIENTECARACTERISTICAATUAL_LIST',
  FETCH_PACIENTECARACTERISTICAATUAL: 'pacienteCaracteristicaAtual/FETCH_PACIENTECARACTERISTICAATUAL',
  CREATE_PACIENTECARACTERISTICAATUAL: 'pacienteCaracteristicaAtual/CREATE_PACIENTECARACTERISTICAATUAL',
  UPDATE_PACIENTECARACTERISTICAATUAL: 'pacienteCaracteristicaAtual/UPDATE_PACIENTECARACTERISTICAATUAL',
  DELETE_PACIENTECARACTERISTICAATUAL: 'pacienteCaracteristicaAtual/DELETE_PACIENTECARACTERISTICAATUAL',
  RESET: 'pacienteCaracteristicaAtual/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IPacienteCaracteristicaAtual>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type PacienteCaracteristicaAtualState = Readonly<typeof initialState>;

export interface IPacienteCaracteristicaAtualBaseState {
  baseFilters: any;
  idPaciente: any;
  idPacienteCaracteristica: any;
}

export interface IPacienteCaracteristicaAtualUpdateState {
  fieldsBase: IPacienteCaracteristicaAtualBaseState;
  isNew: boolean;
}

// Reducer

export default (state: PacienteCaracteristicaAtualState = initialState, action): PacienteCaracteristicaAtualState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_PACIENTECARACTERISTICAATUAL_LIST_EXPORT):
    case REQUEST(ACTION_TYPES.FETCH_PACIENTECARACTERISTICAATUAL_LIST):
    case REQUEST(ACTION_TYPES.FETCH_PACIENTECARACTERISTICAATUAL):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_PACIENTECARACTERISTICAATUAL):
    case REQUEST(ACTION_TYPES.UPDATE_PACIENTECARACTERISTICAATUAL):
    case REQUEST(ACTION_TYPES.DELETE_PACIENTECARACTERISTICAATUAL):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_PACIENTECARACTERISTICAATUAL_LIST_EXPORT):
    case FAILURE(ACTION_TYPES.FETCH_PACIENTECARACTERISTICAATUAL_LIST):
    case FAILURE(ACTION_TYPES.FETCH_PACIENTECARACTERISTICAATUAL):
    case FAILURE(ACTION_TYPES.CREATE_PACIENTECARACTERISTICAATUAL):
    case FAILURE(ACTION_TYPES.UPDATE_PACIENTECARACTERISTICAATUAL):
    case FAILURE(ACTION_TYPES.DELETE_PACIENTECARACTERISTICAATUAL):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_PACIENTECARACTERISTICAATUAL_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10)
      };
    case SUCCESS(ACTION_TYPES.FETCH_PACIENTECARACTERISTICAATUAL):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_PACIENTECARACTERISTICAATUAL):
    case SUCCESS(ACTION_TYPES.UPDATE_PACIENTECARACTERISTICAATUAL):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_PACIENTECARACTERISTICAATUAL):
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

const apiUrl = 'api/paciente-caracteristica-atuals';

// Actions

// Actions
export type ICrudGetAllActionPacienteCaracteristicaAtual<T> = (
  idPaciente?: any,
  idPacienteCaracteristica?: any,
  page?: number,
  size?: number,
  sort?: string
) => IPayload<T> | ((dispatch: any) => IPayload<T>);

export const getEntities: ICrudGetAllActionPacienteCaracteristicaAtual<IPacienteCaracteristicaAtual> = (
  idPaciente,
  idPacienteCaracteristica,
  page,
  size,
  sort
) => {
  const idPacienteRequest = idPaciente ? `idPaciente.contains=${idPaciente}&` : '';
  const idPacienteCaracteristicaRequest = idPacienteCaracteristica ? `idPacienteCaracteristica.contains=${idPacienteCaracteristica}&` : '';

  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}&` : '?'}`;
  return {
    type: ACTION_TYPES.FETCH_PACIENTECARACTERISTICAATUAL_LIST,
    payload: axios.get<IPacienteCaracteristicaAtual>(
      `${requestUrl}${idPacienteRequest}${idPacienteCaracteristicaRequest}cacheBuster=${new Date().getTime()}`
    )
  };
};
export const getEntity: ICrudGetAction<IPacienteCaracteristicaAtual> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_PACIENTECARACTERISTICAATUAL,
    payload: axios.get<IPacienteCaracteristicaAtual>(requestUrl)
  };
};

export const getEntitiesExport: ICrudGetAllActionPacienteCaracteristicaAtual<IPacienteCaracteristicaAtual> = (
  idPaciente,
  idPacienteCaracteristica,
  page,
  size,
  sort
) => {
  const idPacienteRequest = idPaciente ? `idPaciente.contains=${idPaciente}&` : '';
  const idPacienteCaracteristicaRequest = idPacienteCaracteristica ? `idPacienteCaracteristica.contains=${idPacienteCaracteristica}&` : '';

  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}&` : '?'}`;
  return {
    type: ACTION_TYPES.FETCH_PACIENTECARACTERISTICAATUAL_LIST,
    payload: axios.get<IPacienteCaracteristicaAtual>(
      `${requestUrl}${idPacienteRequest}${idPacienteCaracteristicaRequest}cacheBuster=${new Date().getTime()}`
    )
  };
};

export const createEntity: ICrudPutAction<IPacienteCaracteristicaAtual> = entity => async dispatch => {
  entity = {
    ...entity
  };
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_PACIENTECARACTERISTICAATUAL,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IPacienteCaracteristicaAtual> = entity => async dispatch => {
  entity = { ...entity };
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_PACIENTECARACTERISTICAATUAL,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IPacienteCaracteristicaAtual> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_PACIENTECARACTERISTICAATUAL,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});

export const getPacienteCaracteristicaAtualState = (location): IPacienteCaracteristicaAtualBaseState => {
  const url = new URL(`http://localhost${location.search}`); // using a dummy url for parsing
  const baseFilters = url.searchParams.get('baseFilters') || '';
  const idPaciente = url.searchParams.get('idPaciente') || '';
  const idPacienteCaracteristica = url.searchParams.get('idPacienteCaracteristica') || '';

  return {
    baseFilters,
    idPaciente,
    idPacienteCaracteristica
  };
};
