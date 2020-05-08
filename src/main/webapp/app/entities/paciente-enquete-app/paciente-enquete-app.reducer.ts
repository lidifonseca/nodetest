/* eslint complexity: ["error", 100] */
import axios from 'axios';
import { ICrudGetAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { IPayload } from 'react-jhipster/src/type/redux-action.type';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IPacienteEnqueteApp, defaultValue } from 'app/shared/model/paciente-enquete-app.model';

export const ACTION_TYPES = {
  FETCH_PACIENTEENQUETEAPP_LIST_EXPORT: 'pacienteEnqueteApp/FETCH_PACIENTEENQUETEAPP_LIST_EXPORT',
  FETCH_PACIENTEENQUETEAPP_LIST: 'pacienteEnqueteApp/FETCH_PACIENTEENQUETEAPP_LIST',
  FETCH_PACIENTEENQUETEAPP: 'pacienteEnqueteApp/FETCH_PACIENTEENQUETEAPP',
  CREATE_PACIENTEENQUETEAPP: 'pacienteEnqueteApp/CREATE_PACIENTEENQUETEAPP',
  UPDATE_PACIENTEENQUETEAPP: 'pacienteEnqueteApp/UPDATE_PACIENTEENQUETEAPP',
  DELETE_PACIENTEENQUETEAPP: 'pacienteEnqueteApp/DELETE_PACIENTEENQUETEAPP',
  RESET: 'pacienteEnqueteApp/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IPacienteEnqueteApp>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type PacienteEnqueteAppState = Readonly<typeof initialState>;

export interface IPacienteEnqueteAppBaseState {
  baseFilters: any;
  votacao: any;
}

export interface IPacienteEnqueteAppUpdateState {
  fieldsBase: IPacienteEnqueteAppBaseState;

  isNew: boolean;
}

// Reducer

export default (state: PacienteEnqueteAppState = initialState, action): PacienteEnqueteAppState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_PACIENTEENQUETEAPP_LIST_EXPORT):
    case REQUEST(ACTION_TYPES.FETCH_PACIENTEENQUETEAPP_LIST):
    case REQUEST(ACTION_TYPES.FETCH_PACIENTEENQUETEAPP):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_PACIENTEENQUETEAPP):
    case REQUEST(ACTION_TYPES.UPDATE_PACIENTEENQUETEAPP):
    case REQUEST(ACTION_TYPES.DELETE_PACIENTEENQUETEAPP):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_PACIENTEENQUETEAPP_LIST_EXPORT):
    case FAILURE(ACTION_TYPES.FETCH_PACIENTEENQUETEAPP_LIST):
    case FAILURE(ACTION_TYPES.FETCH_PACIENTEENQUETEAPP):
    case FAILURE(ACTION_TYPES.CREATE_PACIENTEENQUETEAPP):
    case FAILURE(ACTION_TYPES.UPDATE_PACIENTEENQUETEAPP):
    case FAILURE(ACTION_TYPES.DELETE_PACIENTEENQUETEAPP):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_PACIENTEENQUETEAPP_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10)
      };
    case SUCCESS(ACTION_TYPES.FETCH_PACIENTEENQUETEAPP):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_PACIENTEENQUETEAPP):
    case SUCCESS(ACTION_TYPES.UPDATE_PACIENTEENQUETEAPP):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_PACIENTEENQUETEAPP):
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

const apiUrl = 'api/paciente-enquete-apps';

// Actions

// Actions
export type ICrudGetAllActionPacienteEnqueteApp<T> = (
  votacao?: any,
  page?: number,
  size?: number,
  sort?: string
) => IPayload<T> | ((dispatch: any) => IPayload<T>);

export const getEntities: ICrudGetAllActionPacienteEnqueteApp<IPacienteEnqueteApp> = (votacao, page, size, sort) => {
  const votacaoRequest = votacao ? `votacao.contains=${votacao}&` : '';

  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}&` : '?'}`;
  return {
    type: ACTION_TYPES.FETCH_PACIENTEENQUETEAPP_LIST,
    payload: axios.get<IPacienteEnqueteApp>(`${requestUrl}${votacaoRequest}cacheBuster=${new Date().getTime()}`)
  };
};
export const getEntity: ICrudGetAction<IPacienteEnqueteApp> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_PACIENTEENQUETEAPP,
    payload: axios.get<IPacienteEnqueteApp>(requestUrl)
  };
};

export const getEntitiesExport: ICrudGetAllActionPacienteEnqueteApp<IPacienteEnqueteApp> = (votacao, page, size, sort) => {
  const votacaoRequest = votacao ? `votacao.contains=${votacao}&` : '';

  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}&` : '?'}`;
  return {
    type: ACTION_TYPES.FETCH_PACIENTEENQUETEAPP_LIST,
    payload: axios.get<IPacienteEnqueteApp>(`${requestUrl}${votacaoRequest}cacheBuster=${new Date().getTime()}`)
  };
};

export const createEntity: ICrudPutAction<IPacienteEnqueteApp> = entity => async dispatch => {
  entity = {
    ...entity
  };
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_PACIENTEENQUETEAPP,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IPacienteEnqueteApp> = entity => async dispatch => {
  entity = { ...entity };
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_PACIENTEENQUETEAPP,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IPacienteEnqueteApp> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_PACIENTEENQUETEAPP,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});

export const getPacienteEnqueteAppState = (location): IPacienteEnqueteAppBaseState => {
  const url = new URL(`http://localhost${location.search}`); // using a dummy url for parsing
  const baseFilters = url.searchParams.get('baseFilters') || '';
  const votacao = url.searchParams.get('votacao') || '';

  return {
    baseFilters,
    votacao
  };
};
