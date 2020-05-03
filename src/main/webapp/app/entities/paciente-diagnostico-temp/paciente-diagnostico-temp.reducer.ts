/* eslint complexity: ["error", 100] */
import axios from 'axios';
import { ICrudGetAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { IPayload } from 'react-jhipster/src/type/redux-action.type';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IPacienteDiagnosticoTemp, defaultValue } from 'app/shared/model/paciente-diagnostico-temp.model';

export const ACTION_TYPES = {
  FETCH_PACIENTEDIAGNOSTICOTEMP_LIST: 'pacienteDiagnosticoTemp/FETCH_PACIENTEDIAGNOSTICOTEMP_LIST',
  FETCH_PACIENTEDIAGNOSTICOTEMP: 'pacienteDiagnosticoTemp/FETCH_PACIENTEDIAGNOSTICOTEMP',
  CREATE_PACIENTEDIAGNOSTICOTEMP: 'pacienteDiagnosticoTemp/CREATE_PACIENTEDIAGNOSTICOTEMP',
  UPDATE_PACIENTEDIAGNOSTICOTEMP: 'pacienteDiagnosticoTemp/UPDATE_PACIENTEDIAGNOSTICOTEMP',
  DELETE_PACIENTEDIAGNOSTICOTEMP: 'pacienteDiagnosticoTemp/DELETE_PACIENTEDIAGNOSTICOTEMP',
  RESET: 'pacienteDiagnosticoTemp/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IPacienteDiagnosticoTemp>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type PacienteDiagnosticoTempState = Readonly<typeof initialState>;

// Reducer

export default (state: PacienteDiagnosticoTempState = initialState, action): PacienteDiagnosticoTempState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_PACIENTEDIAGNOSTICOTEMP_LIST):
    case REQUEST(ACTION_TYPES.FETCH_PACIENTEDIAGNOSTICOTEMP):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_PACIENTEDIAGNOSTICOTEMP):
    case REQUEST(ACTION_TYPES.UPDATE_PACIENTEDIAGNOSTICOTEMP):
    case REQUEST(ACTION_TYPES.DELETE_PACIENTEDIAGNOSTICOTEMP):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_PACIENTEDIAGNOSTICOTEMP_LIST):
    case FAILURE(ACTION_TYPES.FETCH_PACIENTEDIAGNOSTICOTEMP):
    case FAILURE(ACTION_TYPES.CREATE_PACIENTEDIAGNOSTICOTEMP):
    case FAILURE(ACTION_TYPES.UPDATE_PACIENTEDIAGNOSTICOTEMP):
    case FAILURE(ACTION_TYPES.DELETE_PACIENTEDIAGNOSTICOTEMP):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_PACIENTEDIAGNOSTICOTEMP_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10)
      };
    case SUCCESS(ACTION_TYPES.FETCH_PACIENTEDIAGNOSTICOTEMP):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_PACIENTEDIAGNOSTICOTEMP):
    case SUCCESS(ACTION_TYPES.UPDATE_PACIENTEDIAGNOSTICOTEMP):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_PACIENTEDIAGNOSTICOTEMP):
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

const apiUrl = 'api/paciente-diagnostico-temps';

// Actions

// Actions
export type ICrudGetAllActionPacienteDiagnosticoTemp<T> = (
  idCid?: any,
  cidPrimario?: any,
  complexidade?: any,
  createdAt?: any,
  sessionId?: any,
  observacao?: any,
  page?: number,
  size?: number,
  sort?: string
) => IPayload<T> | ((dispatch: any) => IPayload<T>);

export const getEntities: ICrudGetAllActionPacienteDiagnosticoTemp<IPacienteDiagnosticoTemp> = (
  idCid,
  cidPrimario,
  complexidade,
  createdAt,
  sessionId,
  observacao,
  page,
  size,
  sort
) => {
  const idCidRequest = idCid ? `idCid.contains=${idCid}&` : '';
  const cidPrimarioRequest = cidPrimario ? `cidPrimario.contains=${cidPrimario}&` : '';
  const complexidadeRequest = complexidade ? `complexidade.contains=${complexidade}&` : '';
  const createdAtRequest = createdAt ? `createdAt.equals=${createdAt}&` : '';
  const sessionIdRequest = sessionId ? `sessionId.contains=${sessionId}&` : '';
  const observacaoRequest = observacao ? `observacao.contains=${observacao}&` : '';

  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}&` : '?'}`;
  return {
    type: ACTION_TYPES.FETCH_PACIENTEDIAGNOSTICOTEMP_LIST,
    payload: axios.get<IPacienteDiagnosticoTemp>(
      `${requestUrl}${idCidRequest}${cidPrimarioRequest}${complexidadeRequest}${createdAtRequest}${sessionIdRequest}${observacaoRequest}cacheBuster=${new Date().getTime()}`
    )
  };
};
export const getEntity: ICrudGetAction<IPacienteDiagnosticoTemp> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_PACIENTEDIAGNOSTICOTEMP,
    payload: axios.get<IPacienteDiagnosticoTemp>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IPacienteDiagnosticoTemp> = entity => async dispatch => {
  entity = {
    ...entity
  };
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_PACIENTEDIAGNOSTICOTEMP,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IPacienteDiagnosticoTemp> = entity => async dispatch => {
  entity = { ...entity };
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_PACIENTEDIAGNOSTICOTEMP,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IPacienteDiagnosticoTemp> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_PACIENTEDIAGNOSTICOTEMP,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
