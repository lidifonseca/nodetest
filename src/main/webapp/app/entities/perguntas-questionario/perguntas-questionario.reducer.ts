/* eslint complexity: ["error", 100] */
import axios from 'axios';
import { ICrudGetAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { IPayload } from 'react-jhipster/src/type/redux-action.type';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IPerguntasQuestionario, defaultValue } from 'app/shared/model/perguntas-questionario.model';

export const ACTION_TYPES = {
  FETCH_PERGUNTASQUESTIONARIO_LIST: 'perguntasQuestionario/FETCH_PERGUNTASQUESTIONARIO_LIST',
  FETCH_PERGUNTASQUESTIONARIO: 'perguntasQuestionario/FETCH_PERGUNTASQUESTIONARIO',
  CREATE_PERGUNTASQUESTIONARIO: 'perguntasQuestionario/CREATE_PERGUNTASQUESTIONARIO',
  UPDATE_PERGUNTASQUESTIONARIO: 'perguntasQuestionario/UPDATE_PERGUNTASQUESTIONARIO',
  DELETE_PERGUNTASQUESTIONARIO: 'perguntasQuestionario/DELETE_PERGUNTASQUESTIONARIO',
  RESET: 'perguntasQuestionario/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IPerguntasQuestionario>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type PerguntasQuestionarioState = Readonly<typeof initialState>;

// Reducer

export default (state: PerguntasQuestionarioState = initialState, action): PerguntasQuestionarioState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_PERGUNTASQUESTIONARIO_LIST):
    case REQUEST(ACTION_TYPES.FETCH_PERGUNTASQUESTIONARIO):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_PERGUNTASQUESTIONARIO):
    case REQUEST(ACTION_TYPES.UPDATE_PERGUNTASQUESTIONARIO):
    case REQUEST(ACTION_TYPES.DELETE_PERGUNTASQUESTIONARIO):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_PERGUNTASQUESTIONARIO_LIST):
    case FAILURE(ACTION_TYPES.FETCH_PERGUNTASQUESTIONARIO):
    case FAILURE(ACTION_TYPES.CREATE_PERGUNTASQUESTIONARIO):
    case FAILURE(ACTION_TYPES.UPDATE_PERGUNTASQUESTIONARIO):
    case FAILURE(ACTION_TYPES.DELETE_PERGUNTASQUESTIONARIO):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_PERGUNTASQUESTIONARIO_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10)
      };
    case SUCCESS(ACTION_TYPES.FETCH_PERGUNTASQUESTIONARIO):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_PERGUNTASQUESTIONARIO):
    case SUCCESS(ACTION_TYPES.UPDATE_PERGUNTASQUESTIONARIO):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_PERGUNTASQUESTIONARIO):
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

const apiUrl = 'api/perguntas-questionarios';

// Actions

// Actions
export type ICrudGetAllActionPerguntasQuestionario<T> = (
  pergunta?: any,
  tipoResposta?: any,
  obrigatorio?: any,
  tipoCampo?: any,
  acoesRespostas?: any,
  respostas?: any,
  segmentosPerguntasId?: any,
  page?: number,
  size?: number,
  sort?: string
) => IPayload<T> | ((dispatch: any) => IPayload<T>);

export const getEntities: ICrudGetAllActionPerguntasQuestionario<IPerguntasQuestionario> = (
  pergunta,
  tipoResposta,
  obrigatorio,
  tipoCampo,
  acoesRespostas,
  respostas,
  segmentosPerguntasId,
  page,
  size,
  sort
) => {
  const perguntaRequest = pergunta ? `pergunta.contains=${pergunta}&` : '';
  const tipoRespostaRequest = tipoResposta ? `tipoResposta.contains=${tipoResposta}&` : '';
  const obrigatorioRequest = obrigatorio ? `obrigatorio.contains=${obrigatorio}&` : '';
  const tipoCampoRequest = tipoCampo ? `tipoCampo.contains=${tipoCampo}&` : '';
  const acoesRespostasRequest = acoesRespostas ? `acoesRespostas.equals=${acoesRespostas}&` : '';
  const respostasRequest = respostas ? `respostas.equals=${respostas}&` : '';
  const segmentosPerguntasIdRequest = segmentosPerguntasId ? `segmentosPerguntasId.equals=${segmentosPerguntasId}&` : '';

  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}&` : '?'}`;
  return {
    type: ACTION_TYPES.FETCH_PERGUNTASQUESTIONARIO_LIST,
    payload: axios.get<IPerguntasQuestionario>(
      `${requestUrl}${perguntaRequest}${tipoRespostaRequest}${obrigatorioRequest}${tipoCampoRequest}${acoesRespostasRequest}${respostasRequest}${segmentosPerguntasIdRequest}cacheBuster=${new Date().getTime()}`
    )
  };
};
export const getEntity: ICrudGetAction<IPerguntasQuestionario> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_PERGUNTASQUESTIONARIO,
    payload: axios.get<IPerguntasQuestionario>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IPerguntasQuestionario> = entity => async dispatch => {
  entity = {
    ...entity,
    segmentosPerguntasId: entity.segmentosPerguntasId === 'null' ? null : entity.segmentosPerguntasId
  };
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_PERGUNTASQUESTIONARIO,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IPerguntasQuestionario> = entity => async dispatch => {
  entity = { ...entity, segmentosPerguntasId: entity.segmentosPerguntasId === 'null' ? null : entity.segmentosPerguntasId };
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_PERGUNTASQUESTIONARIO,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IPerguntasQuestionario> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_PERGUNTASQUESTIONARIO,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});