/* eslint complexity: ["error", 100] */
import axios from 'axios';
import { ICrudGetAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { IPayload } from 'react-jhipster/src/type/redux-action.type';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IQuestionarios, defaultValue } from 'app/shared/model/questionarios.model';

export const ACTION_TYPES = {
  FETCH_QUESTIONARIOS_LIST: 'questionarios/FETCH_QUESTIONARIOS_LIST',
  FETCH_QUESTIONARIOS: 'questionarios/FETCH_QUESTIONARIOS',
  CREATE_QUESTIONARIOS: 'questionarios/CREATE_QUESTIONARIOS',
  UPDATE_QUESTIONARIOS: 'questionarios/UPDATE_QUESTIONARIOS',
  DELETE_QUESTIONARIOS: 'questionarios/DELETE_QUESTIONARIOS',
  RESET: 'questionarios/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IQuestionarios>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type QuestionariosState = Readonly<typeof initialState>;

// Reducer

export default (state: QuestionariosState = initialState, action): QuestionariosState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_QUESTIONARIOS_LIST):
    case REQUEST(ACTION_TYPES.FETCH_QUESTIONARIOS):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_QUESTIONARIOS):
    case REQUEST(ACTION_TYPES.UPDATE_QUESTIONARIOS):
    case REQUEST(ACTION_TYPES.DELETE_QUESTIONARIOS):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_QUESTIONARIOS_LIST):
    case FAILURE(ACTION_TYPES.FETCH_QUESTIONARIOS):
    case FAILURE(ACTION_TYPES.CREATE_QUESTIONARIOS):
    case FAILURE(ACTION_TYPES.UPDATE_QUESTIONARIOS):
    case FAILURE(ACTION_TYPES.DELETE_QUESTIONARIOS):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_QUESTIONARIOS_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10)
      };
    case SUCCESS(ACTION_TYPES.FETCH_QUESTIONARIOS):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_QUESTIONARIOS):
    case SUCCESS(ACTION_TYPES.UPDATE_QUESTIONARIOS):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_QUESTIONARIOS):
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

const apiUrl = 'api/questionarios';

// Actions

// Actions
export type ICrudGetAllActionQuestionarios<T> = (
  dataCadastro?: any,
  etapaAtual?: any,
  finalizado?: any,
  ultimaPerguntaRespondida?: any,
  respostasQuestionarios?: any,
  pacienteId?: any,
  page?: number,
  size?: number,
  sort?: string
) => IPayload<T> | ((dispatch: any) => IPayload<T>);

export const getEntities: ICrudGetAllActionQuestionarios<IQuestionarios> = (
  dataCadastro,
  etapaAtual,
  finalizado,
  ultimaPerguntaRespondida,
  respostasQuestionarios,
  pacienteId,
  page,
  size,
  sort
) => {
  const dataCadastroRequest = dataCadastro ? `dataCadastro.contains=${dataCadastro}&` : '';
  const etapaAtualRequest = etapaAtual ? `etapaAtual.contains=${etapaAtual}&` : '';
  const finalizadoRequest = finalizado ? `finalizado.contains=${finalizado}&` : '';
  const ultimaPerguntaRespondidaRequest = ultimaPerguntaRespondida ? `ultimaPerguntaRespondida.contains=${ultimaPerguntaRespondida}&` : '';
  const respostasQuestionariosRequest = respostasQuestionarios ? `respostasQuestionarios.equals=${respostasQuestionarios}&` : '';
  const pacienteIdRequest = pacienteId ? `pacienteId.equals=${pacienteId}&` : '';

  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}&` : '?'}`;
  return {
    type: ACTION_TYPES.FETCH_QUESTIONARIOS_LIST,
    payload: axios.get<IQuestionarios>(
      `${requestUrl}${dataCadastroRequest}${etapaAtualRequest}${finalizadoRequest}${ultimaPerguntaRespondidaRequest}${respostasQuestionariosRequest}${pacienteIdRequest}cacheBuster=${new Date().getTime()}`
    )
  };
};
export const getEntity: ICrudGetAction<IQuestionarios> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_QUESTIONARIOS,
    payload: axios.get<IQuestionarios>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IQuestionarios> = entity => async dispatch => {
  entity = {
    ...entity,
    pacienteId: entity.pacienteId === 'null' ? null : entity.pacienteId
  };
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_QUESTIONARIOS,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IQuestionarios> = entity => async dispatch => {
  entity = { ...entity, pacienteId: entity.pacienteId === 'null' ? null : entity.pacienteId };
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_QUESTIONARIOS,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IQuestionarios> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_QUESTIONARIOS,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
