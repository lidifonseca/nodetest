/* eslint complexity: ["error", 100] */
import axios from 'axios';
import { ICrudGetAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { IPayload } from 'react-jhipster/src/type/redux-action.type';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IPacienteServico, defaultValue } from 'app/shared/model/paciente-servico.model';

export const ACTION_TYPES = {
  FETCH_PACIENTESERVICO_LIST_EXPORT: 'pacienteServico/FETCH_PACIENTESERVICO_LIST_EXPORT',
  FETCH_PACIENTESERVICO_LIST: 'pacienteServico/FETCH_PACIENTESERVICO_LIST',
  FETCH_PACIENTESERVICO: 'pacienteServico/FETCH_PACIENTESERVICO',
  CREATE_PACIENTESERVICO: 'pacienteServico/CREATE_PACIENTESERVICO',
  UPDATE_PACIENTESERVICO: 'pacienteServico/UPDATE_PACIENTESERVICO',
  DELETE_PACIENTESERVICO: 'pacienteServico/DELETE_PACIENTESERVICO',
  RESET: 'pacienteServico/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IPacienteServico>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type PacienteServicoState = Readonly<typeof initialState>;

export interface IPacienteServicoBaseState {
  baseFilters: any;
  idPaciente: any;
  servico: any;
}

export interface IPacienteServicoUpdateState {
  fieldsBase: IPacienteServicoBaseState;
  isNew: boolean;
}

// Reducer

export default (state: PacienteServicoState = initialState, action): PacienteServicoState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_PACIENTESERVICO_LIST_EXPORT):
    case REQUEST(ACTION_TYPES.FETCH_PACIENTESERVICO_LIST):
    case REQUEST(ACTION_TYPES.FETCH_PACIENTESERVICO):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_PACIENTESERVICO):
    case REQUEST(ACTION_TYPES.UPDATE_PACIENTESERVICO):
    case REQUEST(ACTION_TYPES.DELETE_PACIENTESERVICO):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_PACIENTESERVICO_LIST_EXPORT):
    case FAILURE(ACTION_TYPES.FETCH_PACIENTESERVICO_LIST):
    case FAILURE(ACTION_TYPES.FETCH_PACIENTESERVICO):
    case FAILURE(ACTION_TYPES.CREATE_PACIENTESERVICO):
    case FAILURE(ACTION_TYPES.UPDATE_PACIENTESERVICO):
    case FAILURE(ACTION_TYPES.DELETE_PACIENTESERVICO):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_PACIENTESERVICO_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10)
      };
    case SUCCESS(ACTION_TYPES.FETCH_PACIENTESERVICO):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_PACIENTESERVICO):
    case SUCCESS(ACTION_TYPES.UPDATE_PACIENTESERVICO):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_PACIENTESERVICO):
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

const apiUrl = 'api/paciente-servicos';

// Actions

// Actions
export type ICrudGetAllActionPacienteServico<T> = (
  idPaciente?: any,
  servico?: any,
  page?: number,
  size?: number,
  sort?: string
) => IPayload<T> | ((dispatch: any) => IPayload<T>);

export const getEntities: ICrudGetAllActionPacienteServico<IPacienteServico> = (idPaciente, servico, page, size, sort) => {
  const idPacienteRequest = idPaciente ? `idPaciente.contains=${idPaciente}&` : '';
  const servicoRequest = servico ? `servico.contains=${servico}&` : '';

  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}&` : '?'}`;
  return {
    type: ACTION_TYPES.FETCH_PACIENTESERVICO_LIST,
    payload: axios.get<IPacienteServico>(`${requestUrl}${idPacienteRequest}${servicoRequest}cacheBuster=${new Date().getTime()}`)
  };
};
export const getEntity: ICrudGetAction<IPacienteServico> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_PACIENTESERVICO,
    payload: axios.get<IPacienteServico>(requestUrl)
  };
};

export const getEntitiesExport: ICrudGetAllActionPacienteServico<IPacienteServico> = (idPaciente, servico, page, size, sort) => {
  const idPacienteRequest = idPaciente ? `idPaciente.contains=${idPaciente}&` : '';
  const servicoRequest = servico ? `servico.contains=${servico}&` : '';

  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}&` : '?'}`;
  return {
    type: ACTION_TYPES.FETCH_PACIENTESERVICO_LIST,
    payload: axios.get<IPacienteServico>(`${requestUrl}${idPacienteRequest}${servicoRequest}cacheBuster=${new Date().getTime()}`)
  };
};

export const createEntity: ICrudPutAction<IPacienteServico> = entity => async dispatch => {
  entity = {
    ...entity
  };
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_PACIENTESERVICO,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IPacienteServico> = entity => async dispatch => {
  entity = { ...entity };
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_PACIENTESERVICO,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IPacienteServico> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_PACIENTESERVICO,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});

export const getPacienteServicoState = (location): IPacienteServicoBaseState => {
  const url = new URL(`http://localhost${location.search}`); // using a dummy url for parsing
  const baseFilters = url.searchParams.get('baseFilters') || '';
  const idPaciente = url.searchParams.get('idPaciente') || '';
  const servico = url.searchParams.get('servico') || '';

  return {
    baseFilters,
    idPaciente,
    servico
  };
};
