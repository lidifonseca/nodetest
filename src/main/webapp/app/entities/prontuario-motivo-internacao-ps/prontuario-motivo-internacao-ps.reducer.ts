/* eslint complexity: ["error", 100] */
import axios from 'axios';
import { ICrudGetAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { IPayload } from 'react-jhipster/src/type/redux-action.type';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IProntuarioMotivoInternacaoPs, defaultValue } from 'app/shared/model/prontuario-motivo-internacao-ps.model';

export const ACTION_TYPES = {
  FETCH_PRONTUARIOMOTIVOINTERNACAOPS_LIST: 'prontuarioMotivoInternacaoPs/FETCH_PRONTUARIOMOTIVOINTERNACAOPS_LIST',
  FETCH_PRONTUARIOMOTIVOINTERNACAOPS: 'prontuarioMotivoInternacaoPs/FETCH_PRONTUARIOMOTIVOINTERNACAOPS',
  CREATE_PRONTUARIOMOTIVOINTERNACAOPS: 'prontuarioMotivoInternacaoPs/CREATE_PRONTUARIOMOTIVOINTERNACAOPS',
  UPDATE_PRONTUARIOMOTIVOINTERNACAOPS: 'prontuarioMotivoInternacaoPs/UPDATE_PRONTUARIOMOTIVOINTERNACAOPS',
  DELETE_PRONTUARIOMOTIVOINTERNACAOPS: 'prontuarioMotivoInternacaoPs/DELETE_PRONTUARIOMOTIVOINTERNACAOPS',
  RESET: 'prontuarioMotivoInternacaoPs/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IProntuarioMotivoInternacaoPs>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type ProntuarioMotivoInternacaoPsState = Readonly<typeof initialState>;

// Reducer

export default (state: ProntuarioMotivoInternacaoPsState = initialState, action): ProntuarioMotivoInternacaoPsState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_PRONTUARIOMOTIVOINTERNACAOPS_LIST):
    case REQUEST(ACTION_TYPES.FETCH_PRONTUARIOMOTIVOINTERNACAOPS):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_PRONTUARIOMOTIVOINTERNACAOPS):
    case REQUEST(ACTION_TYPES.UPDATE_PRONTUARIOMOTIVOINTERNACAOPS):
    case REQUEST(ACTION_TYPES.DELETE_PRONTUARIOMOTIVOINTERNACAOPS):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_PRONTUARIOMOTIVOINTERNACAOPS_LIST):
    case FAILURE(ACTION_TYPES.FETCH_PRONTUARIOMOTIVOINTERNACAOPS):
    case FAILURE(ACTION_TYPES.CREATE_PRONTUARIOMOTIVOINTERNACAOPS):
    case FAILURE(ACTION_TYPES.UPDATE_PRONTUARIOMOTIVOINTERNACAOPS):
    case FAILURE(ACTION_TYPES.DELETE_PRONTUARIOMOTIVOINTERNACAOPS):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_PRONTUARIOMOTIVOINTERNACAOPS_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10)
      };
    case SUCCESS(ACTION_TYPES.FETCH_PRONTUARIOMOTIVOINTERNACAOPS):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_PRONTUARIOMOTIVOINTERNACAOPS):
    case SUCCESS(ACTION_TYPES.UPDATE_PRONTUARIOMOTIVOINTERNACAOPS):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_PRONTUARIOMOTIVOINTERNACAOPS):
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

const apiUrl = 'api/prontuario-motivo-internacao-ps';

// Actions

// Actions
export type ICrudGetAllActionProntuarioMotivoInternacaoPs<T> = (
  idProntuario?: any,
  idPaciente?: any,
  idMotivo?: any,
  idUsuario?: any,
  page?: number,
  size?: number,
  sort?: string
) => IPayload<T> | ((dispatch: any) => IPayload<T>);

export const getEntities: ICrudGetAllActionProntuarioMotivoInternacaoPs<IProntuarioMotivoInternacaoPs> = (
  idProntuario,
  idPaciente,
  idMotivo,
  idUsuario,
  page,
  size,
  sort
) => {
  const idProntuarioRequest = idProntuario ? `idProntuario.contains=${idProntuario}&` : '';
  const idPacienteRequest = idPaciente ? `idPaciente.contains=${idPaciente}&` : '';
  const idMotivoRequest = idMotivo ? `idMotivo.contains=${idMotivo}&` : '';
  const idUsuarioRequest = idUsuario ? `idUsuario.contains=${idUsuario}&` : '';

  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}&` : '?'}`;
  return {
    type: ACTION_TYPES.FETCH_PRONTUARIOMOTIVOINTERNACAOPS_LIST,
    payload: axios.get<IProntuarioMotivoInternacaoPs>(
      `${requestUrl}${idProntuarioRequest}${idPacienteRequest}${idMotivoRequest}${idUsuarioRequest}cacheBuster=${new Date().getTime()}`
    )
  };
};
export const getEntity: ICrudGetAction<IProntuarioMotivoInternacaoPs> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_PRONTUARIOMOTIVOINTERNACAOPS,
    payload: axios.get<IProntuarioMotivoInternacaoPs>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IProntuarioMotivoInternacaoPs> = entity => async dispatch => {
  entity = {
    ...entity
  };
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_PRONTUARIOMOTIVOINTERNACAOPS,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IProntuarioMotivoInternacaoPs> = entity => async dispatch => {
  entity = { ...entity };
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_PRONTUARIOMOTIVOINTERNACAOPS,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IProntuarioMotivoInternacaoPs> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_PRONTUARIOMOTIVOINTERNACAOPS,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
