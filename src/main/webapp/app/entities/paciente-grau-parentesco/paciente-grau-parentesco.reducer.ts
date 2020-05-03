/* eslint complexity: ["error", 100] */
import axios from 'axios';
import { ICrudGetAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { IPayload } from 'react-jhipster/src/type/redux-action.type';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IPacienteGrauParentesco, defaultValue } from 'app/shared/model/paciente-grau-parentesco.model';

export const ACTION_TYPES = {
  FETCH_PACIENTEGRAUPARENTESCO_LIST: 'pacienteGrauParentesco/FETCH_PACIENTEGRAUPARENTESCO_LIST',
  FETCH_PACIENTEGRAUPARENTESCO: 'pacienteGrauParentesco/FETCH_PACIENTEGRAUPARENTESCO',
  CREATE_PACIENTEGRAUPARENTESCO: 'pacienteGrauParentesco/CREATE_PACIENTEGRAUPARENTESCO',
  UPDATE_PACIENTEGRAUPARENTESCO: 'pacienteGrauParentesco/UPDATE_PACIENTEGRAUPARENTESCO',
  DELETE_PACIENTEGRAUPARENTESCO: 'pacienteGrauParentesco/DELETE_PACIENTEGRAUPARENTESCO',
  RESET: 'pacienteGrauParentesco/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IPacienteGrauParentesco>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type PacienteGrauParentescoState = Readonly<typeof initialState>;

// Reducer

export default (state: PacienteGrauParentescoState = initialState, action): PacienteGrauParentescoState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_PACIENTEGRAUPARENTESCO_LIST):
    case REQUEST(ACTION_TYPES.FETCH_PACIENTEGRAUPARENTESCO):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_PACIENTEGRAUPARENTESCO):
    case REQUEST(ACTION_TYPES.UPDATE_PACIENTEGRAUPARENTESCO):
    case REQUEST(ACTION_TYPES.DELETE_PACIENTEGRAUPARENTESCO):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_PACIENTEGRAUPARENTESCO_LIST):
    case FAILURE(ACTION_TYPES.FETCH_PACIENTEGRAUPARENTESCO):
    case FAILURE(ACTION_TYPES.CREATE_PACIENTEGRAUPARENTESCO):
    case FAILURE(ACTION_TYPES.UPDATE_PACIENTEGRAUPARENTESCO):
    case FAILURE(ACTION_TYPES.DELETE_PACIENTEGRAUPARENTESCO):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_PACIENTEGRAUPARENTESCO_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10)
      };
    case SUCCESS(ACTION_TYPES.FETCH_PACIENTEGRAUPARENTESCO):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_PACIENTEGRAUPARENTESCO):
    case SUCCESS(ACTION_TYPES.UPDATE_PACIENTEGRAUPARENTESCO):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_PACIENTEGRAUPARENTESCO):
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

const apiUrl = 'api/paciente-grau-parentescos';

// Actions

// Actions
export type ICrudGetAllActionPacienteGrauParentesco<T> = (
  grauParentesco?: any,
  ativo?: any,
  page?: number,
  size?: number,
  sort?: string
) => IPayload<T> | ((dispatch: any) => IPayload<T>);

export const getEntities: ICrudGetAllActionPacienteGrauParentesco<IPacienteGrauParentesco> = (grauParentesco, ativo, page, size, sort) => {
  const grauParentescoRequest = grauParentesco ? `grauParentesco.contains=${grauParentesco}&` : '';
  const ativoRequest = ativo ? `ativo.contains=${ativo}&` : '';

  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}&` : '?'}`;
  return {
    type: ACTION_TYPES.FETCH_PACIENTEGRAUPARENTESCO_LIST,
    payload: axios.get<IPacienteGrauParentesco>(`${requestUrl}${grauParentescoRequest}${ativoRequest}cacheBuster=${new Date().getTime()}`)
  };
};
export const getEntity: ICrudGetAction<IPacienteGrauParentesco> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_PACIENTEGRAUPARENTESCO,
    payload: axios.get<IPacienteGrauParentesco>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IPacienteGrauParentesco> = entity => async dispatch => {
  entity = {
    ...entity
  };
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_PACIENTEGRAUPARENTESCO,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IPacienteGrauParentesco> = entity => async dispatch => {
  entity = { ...entity };
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_PACIENTEGRAUPARENTESCO,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IPacienteGrauParentesco> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_PACIENTEGRAUPARENTESCO,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
