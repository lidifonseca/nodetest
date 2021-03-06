/* eslint complexity: ["error", 100] */
import axios from 'axios';
import { ICrudGetAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { IPayload } from 'react-jhipster/src/type/redux-action.type';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IPacienteOperadora, defaultValue } from 'app/shared/model/paciente-operadora.model';

export const ACTION_TYPES = {
  FETCH_PACIENTEOPERADORA_LIST_EXPORT: 'pacienteOperadora/FETCH_PACIENTEOPERADORA_LIST_EXPORT',
  FETCH_PACIENTEOPERADORA_LIST: 'pacienteOperadora/FETCH_PACIENTEOPERADORA_LIST',
  FETCH_PACIENTEOPERADORA: 'pacienteOperadora/FETCH_PACIENTEOPERADORA',
  CREATE_PACIENTEOPERADORA: 'pacienteOperadora/CREATE_PACIENTEOPERADORA',
  UPDATE_PACIENTEOPERADORA: 'pacienteOperadora/UPDATE_PACIENTEOPERADORA',
  DELETE_PACIENTEOPERADORA: 'pacienteOperadora/DELETE_PACIENTEOPERADORA',
  RESET: 'pacienteOperadora/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IPacienteOperadora>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type PacienteOperadoraState = Readonly<typeof initialState>;

export interface IPacienteOperadoraBaseState {
  baseFilters: any;
  registro: any;
  ativo: any;
  paciente: any;
  operadora: any;
}

export interface IPacienteOperadoraUpdateState {
  fieldsBase: IPacienteOperadoraBaseState;

  pacienteSelectValue: any;
  operadoraSelectValue: any;
  isNew: boolean;
  pacienteId: string;
  operadoraId: string;
}

// Reducer

export default (state: PacienteOperadoraState = initialState, action): PacienteOperadoraState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_PACIENTEOPERADORA_LIST_EXPORT):
    case REQUEST(ACTION_TYPES.FETCH_PACIENTEOPERADORA_LIST):
    case REQUEST(ACTION_TYPES.FETCH_PACIENTEOPERADORA):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_PACIENTEOPERADORA):
    case REQUEST(ACTION_TYPES.UPDATE_PACIENTEOPERADORA):
    case REQUEST(ACTION_TYPES.DELETE_PACIENTEOPERADORA):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_PACIENTEOPERADORA_LIST_EXPORT):
    case FAILURE(ACTION_TYPES.FETCH_PACIENTEOPERADORA_LIST):
    case FAILURE(ACTION_TYPES.FETCH_PACIENTEOPERADORA):
    case FAILURE(ACTION_TYPES.CREATE_PACIENTEOPERADORA):
    case FAILURE(ACTION_TYPES.UPDATE_PACIENTEOPERADORA):
    case FAILURE(ACTION_TYPES.DELETE_PACIENTEOPERADORA):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_PACIENTEOPERADORA_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10)
      };
    case SUCCESS(ACTION_TYPES.FETCH_PACIENTEOPERADORA):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_PACIENTEOPERADORA):
    case SUCCESS(ACTION_TYPES.UPDATE_PACIENTEOPERADORA):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_PACIENTEOPERADORA):
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

const apiUrl = 'api/paciente-operadoras';

// Actions

// Actions
export type ICrudGetAllActionPacienteOperadora<T> = (
  registro?: any,
  ativo?: any,
  paciente?: any,
  operadora?: any,
  page?: number,
  size?: number,
  sort?: string
) => IPayload<T> | ((dispatch: any) => IPayload<T>);

export const getEntities: ICrudGetAllActionPacienteOperadora<IPacienteOperadora> = (
  registro,
  ativo,
  paciente,
  operadora,
  page,
  size,
  sort
) => {
  const registroRequest = registro ? `registro.contains=${registro}&` : '';
  const ativoRequest = ativo ? `ativo.contains=${ativo}&` : '';
  const pacienteRequest = paciente ? `paciente.equals=${paciente}&` : '';
  const operadoraRequest = operadora ? `operadora.equals=${operadora}&` : '';

  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}&` : '?'}`;
  return {
    type: ACTION_TYPES.FETCH_PACIENTEOPERADORA_LIST,
    payload: axios.get<IPacienteOperadora>(
      `${requestUrl}${registroRequest}${ativoRequest}${pacienteRequest}${operadoraRequest}cacheBuster=${new Date().getTime()}`
    )
  };
};
export const getEntity: ICrudGetAction<IPacienteOperadora> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_PACIENTEOPERADORA,
    payload: axios.get<IPacienteOperadora>(requestUrl)
  };
};

export const getEntitiesExport: ICrudGetAllActionPacienteOperadora<IPacienteOperadora> = (
  registro,
  ativo,
  paciente,
  operadora,
  page,
  size,
  sort
) => {
  const registroRequest = registro ? `registro.contains=${registro}&` : '';
  const ativoRequest = ativo ? `ativo.contains=${ativo}&` : '';
  const pacienteRequest = paciente ? `paciente.equals=${paciente}&` : '';
  const operadoraRequest = operadora ? `operadora.equals=${operadora}&` : '';

  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}&` : '?'}`;
  return {
    type: ACTION_TYPES.FETCH_PACIENTEOPERADORA_LIST,
    payload: axios.get<IPacienteOperadora>(
      `${requestUrl}${registroRequest}${ativoRequest}${pacienteRequest}${operadoraRequest}cacheBuster=${new Date().getTime()}`
    )
  };
};

export const createEntity: ICrudPutAction<IPacienteOperadora> = entity => async dispatch => {
  entity = {
    ...entity,
    paciente: entity.paciente === 'null' ? null : entity.paciente,
    operadora: entity.operadora === 'null' ? null : entity.operadora
  };
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_PACIENTEOPERADORA,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IPacienteOperadora> = entity => async dispatch => {
  entity = {
    ...entity,
    paciente: entity.paciente === 'null' ? null : entity.paciente,
    operadora: entity.operadora === 'null' ? null : entity.operadora
  };
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_PACIENTEOPERADORA,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IPacienteOperadora> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_PACIENTEOPERADORA,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});

export const getPacienteOperadoraState = (location): IPacienteOperadoraBaseState => {
  const url = new URL(`http://localhost${location.search}`); // using a dummy url for parsing
  const baseFilters = url.searchParams.get('baseFilters') || '';
  const registro = url.searchParams.get('registro') || '';
  const ativo = url.searchParams.get('ativo') || '';

  const paciente = url.searchParams.get('paciente') || '';
  const operadora = url.searchParams.get('operadora') || '';

  return {
    baseFilters,
    registro,
    ativo,
    paciente,
    operadora
  };
};
