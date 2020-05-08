/* eslint complexity: ["error", 100] */
import axios from 'axios';
import { ICrudGetAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { IPayload } from 'react-jhipster/src/type/redux-action.type';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IPacienteHospital, defaultValue } from 'app/shared/model/paciente-hospital.model';

export const ACTION_TYPES = {
  FETCH_PACIENTEHOSPITAL_LIST_EXPORT: 'pacienteHospital/FETCH_PACIENTEHOSPITAL_LIST_EXPORT',
  FETCH_PACIENTEHOSPITAL_LIST: 'pacienteHospital/FETCH_PACIENTEHOSPITAL_LIST',
  FETCH_PACIENTEHOSPITAL: 'pacienteHospital/FETCH_PACIENTEHOSPITAL',
  CREATE_PACIENTEHOSPITAL: 'pacienteHospital/CREATE_PACIENTEHOSPITAL',
  UPDATE_PACIENTEHOSPITAL: 'pacienteHospital/UPDATE_PACIENTEHOSPITAL',
  DELETE_PACIENTEHOSPITAL: 'pacienteHospital/DELETE_PACIENTEHOSPITAL',
  RESET: 'pacienteHospital/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IPacienteHospital>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type PacienteHospitalState = Readonly<typeof initialState>;

export interface IPacienteHospitalBaseState {
  baseFilters: any;
  servico: any;
  styleLabel: any;
}

export interface IPacienteHospitalUpdateState {
  fieldsBase: IPacienteHospitalBaseState;

  isNew: boolean;
}

// Reducer

export default (state: PacienteHospitalState = initialState, action): PacienteHospitalState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_PACIENTEHOSPITAL_LIST_EXPORT):
    case REQUEST(ACTION_TYPES.FETCH_PACIENTEHOSPITAL_LIST):
    case REQUEST(ACTION_TYPES.FETCH_PACIENTEHOSPITAL):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_PACIENTEHOSPITAL):
    case REQUEST(ACTION_TYPES.UPDATE_PACIENTEHOSPITAL):
    case REQUEST(ACTION_TYPES.DELETE_PACIENTEHOSPITAL):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_PACIENTEHOSPITAL_LIST_EXPORT):
    case FAILURE(ACTION_TYPES.FETCH_PACIENTEHOSPITAL_LIST):
    case FAILURE(ACTION_TYPES.FETCH_PACIENTEHOSPITAL):
    case FAILURE(ACTION_TYPES.CREATE_PACIENTEHOSPITAL):
    case FAILURE(ACTION_TYPES.UPDATE_PACIENTEHOSPITAL):
    case FAILURE(ACTION_TYPES.DELETE_PACIENTEHOSPITAL):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_PACIENTEHOSPITAL_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10)
      };
    case SUCCESS(ACTION_TYPES.FETCH_PACIENTEHOSPITAL):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_PACIENTEHOSPITAL):
    case SUCCESS(ACTION_TYPES.UPDATE_PACIENTEHOSPITAL):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_PACIENTEHOSPITAL):
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

const apiUrl = 'api/paciente-hospitals';

// Actions

// Actions
export type ICrudGetAllActionPacienteHospital<T> = (
  servico?: any,
  styleLabel?: any,
  page?: number,
  size?: number,
  sort?: string
) => IPayload<T> | ((dispatch: any) => IPayload<T>);

export const getEntities: ICrudGetAllActionPacienteHospital<IPacienteHospital> = (servico, styleLabel, page, size, sort) => {
  const servicoRequest = servico ? `servico.contains=${servico}&` : '';
  const styleLabelRequest = styleLabel ? `styleLabel.contains=${styleLabel}&` : '';

  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}&` : '?'}`;
  return {
    type: ACTION_TYPES.FETCH_PACIENTEHOSPITAL_LIST,
    payload: axios.get<IPacienteHospital>(`${requestUrl}${servicoRequest}${styleLabelRequest}cacheBuster=${new Date().getTime()}`)
  };
};
export const getEntity: ICrudGetAction<IPacienteHospital> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_PACIENTEHOSPITAL,
    payload: axios.get<IPacienteHospital>(requestUrl)
  };
};

export const getEntitiesExport: ICrudGetAllActionPacienteHospital<IPacienteHospital> = (servico, styleLabel, page, size, sort) => {
  const servicoRequest = servico ? `servico.contains=${servico}&` : '';
  const styleLabelRequest = styleLabel ? `styleLabel.contains=${styleLabel}&` : '';

  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}&` : '?'}`;
  return {
    type: ACTION_TYPES.FETCH_PACIENTEHOSPITAL_LIST,
    payload: axios.get<IPacienteHospital>(`${requestUrl}${servicoRequest}${styleLabelRequest}cacheBuster=${new Date().getTime()}`)
  };
};

export const createEntity: ICrudPutAction<IPacienteHospital> = entity => async dispatch => {
  entity = {
    ...entity
  };
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_PACIENTEHOSPITAL,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IPacienteHospital> = entity => async dispatch => {
  entity = { ...entity };
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_PACIENTEHOSPITAL,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IPacienteHospital> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_PACIENTEHOSPITAL,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});

export const getPacienteHospitalState = (location): IPacienteHospitalBaseState => {
  const url = new URL(`http://localhost${location.search}`); // using a dummy url for parsing
  const baseFilters = url.searchParams.get('baseFilters') || '';
  const servico = url.searchParams.get('servico') || '';
  const styleLabel = url.searchParams.get('styleLabel') || '';

  return {
    baseFilters,
    servico,
    styleLabel
  };
};
