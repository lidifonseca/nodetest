/* eslint complexity: ["error", 100] */
import axios from 'axios';
import { ICrudGetAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { IPayload } from 'react-jhipster/src/type/redux-action.type';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IAtendimentoAcompanhamentoPush, defaultValue } from 'app/shared/model/atendimento-acompanhamento-push.model';

export const ACTION_TYPES = {
  FETCH_ATENDIMENTOACOMPANHAMENTOPUSH_LIST: 'atendimentoAcompanhamentoPush/FETCH_ATENDIMENTOACOMPANHAMENTOPUSH_LIST',
  FETCH_ATENDIMENTOACOMPANHAMENTOPUSH: 'atendimentoAcompanhamentoPush/FETCH_ATENDIMENTOACOMPANHAMENTOPUSH',
  CREATE_ATENDIMENTOACOMPANHAMENTOPUSH: 'atendimentoAcompanhamentoPush/CREATE_ATENDIMENTOACOMPANHAMENTOPUSH',
  UPDATE_ATENDIMENTOACOMPANHAMENTOPUSH: 'atendimentoAcompanhamentoPush/UPDATE_ATENDIMENTOACOMPANHAMENTOPUSH',
  DELETE_ATENDIMENTOACOMPANHAMENTOPUSH: 'atendimentoAcompanhamentoPush/DELETE_ATENDIMENTOACOMPANHAMENTOPUSH',
  RESET: 'atendimentoAcompanhamentoPush/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IAtendimentoAcompanhamentoPush>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type AtendimentoAcompanhamentoPushState = Readonly<typeof initialState>;

// Reducer

export default (state: AtendimentoAcompanhamentoPushState = initialState, action): AtendimentoAcompanhamentoPushState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_ATENDIMENTOACOMPANHAMENTOPUSH_LIST):
    case REQUEST(ACTION_TYPES.FETCH_ATENDIMENTOACOMPANHAMENTOPUSH):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_ATENDIMENTOACOMPANHAMENTOPUSH):
    case REQUEST(ACTION_TYPES.UPDATE_ATENDIMENTOACOMPANHAMENTOPUSH):
    case REQUEST(ACTION_TYPES.DELETE_ATENDIMENTOACOMPANHAMENTOPUSH):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_ATENDIMENTOACOMPANHAMENTOPUSH_LIST):
    case FAILURE(ACTION_TYPES.FETCH_ATENDIMENTOACOMPANHAMENTOPUSH):
    case FAILURE(ACTION_TYPES.CREATE_ATENDIMENTOACOMPANHAMENTOPUSH):
    case FAILURE(ACTION_TYPES.UPDATE_ATENDIMENTOACOMPANHAMENTOPUSH):
    case FAILURE(ACTION_TYPES.DELETE_ATENDIMENTOACOMPANHAMENTOPUSH):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_ATENDIMENTOACOMPANHAMENTOPUSH_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10)
      };
    case SUCCESS(ACTION_TYPES.FETCH_ATENDIMENTOACOMPANHAMENTOPUSH):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_ATENDIMENTOACOMPANHAMENTOPUSH):
    case SUCCESS(ACTION_TYPES.UPDATE_ATENDIMENTOACOMPANHAMENTOPUSH):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_ATENDIMENTOACOMPANHAMENTOPUSH):
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

const apiUrl = 'api/atendimento-acompanhamento-pushes';

// Actions

// Actions
export type ICrudGetAllActionAtendimentoAcompanhamentoPush<T> = (
  atendimentoId?: any,
  pacienteId?: any,
  profissionalId?: any,
  timestampAtendimento?: any,
  nomePaciente?: any,
  nomeProfissioinal?: any,
  timestampConfirmacao?: any,
  dataPost?: any,
  page?: number,
  size?: number,
  sort?: string
) => IPayload<T> | ((dispatch: any) => IPayload<T>);

export const getEntities: ICrudGetAllActionAtendimentoAcompanhamentoPush<IAtendimentoAcompanhamentoPush> = (
  atendimentoId,
  pacienteId,
  profissionalId,
  timestampAtendimento,
  nomePaciente,
  nomeProfissioinal,
  timestampConfirmacao,
  dataPost,
  page,
  size,
  sort
) => {
  const atendimentoIdRequest = atendimentoId ? `atendimentoId.contains=${atendimentoId}&` : '';
  const pacienteIdRequest = pacienteId ? `pacienteId.contains=${pacienteId}&` : '';
  const profissionalIdRequest = profissionalId ? `profissionalId.contains=${profissionalId}&` : '';
  const timestampAtendimentoRequest = timestampAtendimento ? `timestampAtendimento.contains=${timestampAtendimento}&` : '';
  const nomePacienteRequest = nomePaciente ? `nomePaciente.contains=${nomePaciente}&` : '';
  const nomeProfissioinalRequest = nomeProfissioinal ? `nomeProfissioinal.contains=${nomeProfissioinal}&` : '';
  const timestampConfirmacaoRequest = timestampConfirmacao ? `timestampConfirmacao.contains=${timestampConfirmacao}&` : '';
  const dataPostRequest = dataPost ? `dataPost.contains=${dataPost}&` : '';

  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}&` : '?'}`;
  return {
    type: ACTION_TYPES.FETCH_ATENDIMENTOACOMPANHAMENTOPUSH_LIST,
    payload: axios.get<IAtendimentoAcompanhamentoPush>(
      `${requestUrl}${atendimentoIdRequest}${pacienteIdRequest}${profissionalIdRequest}${timestampAtendimentoRequest}${nomePacienteRequest}${nomeProfissioinalRequest}${timestampConfirmacaoRequest}${dataPostRequest}cacheBuster=${new Date().getTime()}`
    )
  };
};
export const getEntity: ICrudGetAction<IAtendimentoAcompanhamentoPush> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_ATENDIMENTOACOMPANHAMENTOPUSH,
    payload: axios.get<IAtendimentoAcompanhamentoPush>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IAtendimentoAcompanhamentoPush> = entity => async dispatch => {
  entity = {
    ...entity
  };
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_ATENDIMENTOACOMPANHAMENTOPUSH,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IAtendimentoAcompanhamentoPush> = entity => async dispatch => {
  entity = { ...entity };
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_ATENDIMENTOACOMPANHAMENTOPUSH,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IAtendimentoAcompanhamentoPush> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_ATENDIMENTOACOMPANHAMENTOPUSH,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
