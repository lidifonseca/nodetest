/* eslint complexity: ["error", 100] */
import axios from 'axios';
import { ICrudGetAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { IPayload } from 'react-jhipster/src/type/redux-action.type';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IRespostasQuestionarios, defaultValue } from 'app/shared/model/respostas-questionarios.model';

export const ACTION_TYPES = {
  FETCH_RESPOSTASQUESTIONARIOS_LIST_EXPORT: 'respostasQuestionarios/FETCH_RESPOSTASQUESTIONARIOS_LIST_EXPORT',
  FETCH_RESPOSTASQUESTIONARIOS_LIST: 'respostasQuestionarios/FETCH_RESPOSTASQUESTIONARIOS_LIST',
  FETCH_RESPOSTASQUESTIONARIOS: 'respostasQuestionarios/FETCH_RESPOSTASQUESTIONARIOS',
  CREATE_RESPOSTASQUESTIONARIOS: 'respostasQuestionarios/CREATE_RESPOSTASQUESTIONARIOS',
  UPDATE_RESPOSTASQUESTIONARIOS: 'respostasQuestionarios/UPDATE_RESPOSTASQUESTIONARIOS',
  DELETE_RESPOSTASQUESTIONARIOS: 'respostasQuestionarios/DELETE_RESPOSTASQUESTIONARIOS',
  RESET: 'respostasQuestionarios/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IRespostasQuestionarios>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type RespostasQuestionariosState = Readonly<typeof initialState>;

export interface IRespostasQuestionariosBaseState {
  baseFilters: any;
  dataResposta: any;
  informacaoAdicional: any;
  questionarioId: any;
}

export interface IRespostasQuestionariosUpdateState {
  fieldsBase: IRespostasQuestionariosBaseState;
  isNew: boolean;
}

// Reducer

export default (state: RespostasQuestionariosState = initialState, action): RespostasQuestionariosState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_RESPOSTASQUESTIONARIOS_LIST_EXPORT):
    case REQUEST(ACTION_TYPES.FETCH_RESPOSTASQUESTIONARIOS_LIST):
    case REQUEST(ACTION_TYPES.FETCH_RESPOSTASQUESTIONARIOS):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_RESPOSTASQUESTIONARIOS):
    case REQUEST(ACTION_TYPES.UPDATE_RESPOSTASQUESTIONARIOS):
    case REQUEST(ACTION_TYPES.DELETE_RESPOSTASQUESTIONARIOS):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_RESPOSTASQUESTIONARIOS_LIST_EXPORT):
    case FAILURE(ACTION_TYPES.FETCH_RESPOSTASQUESTIONARIOS_LIST):
    case FAILURE(ACTION_TYPES.FETCH_RESPOSTASQUESTIONARIOS):
    case FAILURE(ACTION_TYPES.CREATE_RESPOSTASQUESTIONARIOS):
    case FAILURE(ACTION_TYPES.UPDATE_RESPOSTASQUESTIONARIOS):
    case FAILURE(ACTION_TYPES.DELETE_RESPOSTASQUESTIONARIOS):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_RESPOSTASQUESTIONARIOS_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10)
      };
    case SUCCESS(ACTION_TYPES.FETCH_RESPOSTASQUESTIONARIOS):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_RESPOSTASQUESTIONARIOS):
    case SUCCESS(ACTION_TYPES.UPDATE_RESPOSTASQUESTIONARIOS):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_RESPOSTASQUESTIONARIOS):
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

const apiUrl = 'api/respostas-questionarios';

// Actions

// Actions
export type ICrudGetAllActionRespostasQuestionarios<T> = (
  dataResposta?: any,
  informacaoAdicional?: any,
  questionarioId?: any,
  page?: number,
  size?: number,
  sort?: string
) => IPayload<T> | ((dispatch: any) => IPayload<T>);

export const getEntities: ICrudGetAllActionRespostasQuestionarios<IRespostasQuestionarios> = (
  dataResposta,
  informacaoAdicional,
  questionarioId,
  page,
  size,
  sort
) => {
  const dataRespostaRequest = dataResposta ? `dataResposta.contains=${dataResposta}&` : '';
  const informacaoAdicionalRequest = informacaoAdicional ? `informacaoAdicional.contains=${informacaoAdicional}&` : '';
  const questionarioIdRequest = questionarioId ? `questionarioId.contains=${questionarioId}&` : '';

  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}&` : '?'}`;
  return {
    type: ACTION_TYPES.FETCH_RESPOSTASQUESTIONARIOS_LIST,
    payload: axios.get<IRespostasQuestionarios>(
      `${requestUrl}${dataRespostaRequest}${informacaoAdicionalRequest}${questionarioIdRequest}cacheBuster=${new Date().getTime()}`
    )
  };
};
export const getEntity: ICrudGetAction<IRespostasQuestionarios> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_RESPOSTASQUESTIONARIOS,
    payload: axios.get<IRespostasQuestionarios>(requestUrl)
  };
};

export const getEntitiesExport: ICrudGetAllActionRespostasQuestionarios<IRespostasQuestionarios> = (
  dataResposta,
  informacaoAdicional,
  questionarioId,
  page,
  size,
  sort
) => {
  const dataRespostaRequest = dataResposta ? `dataResposta.contains=${dataResposta}&` : '';
  const informacaoAdicionalRequest = informacaoAdicional ? `informacaoAdicional.contains=${informacaoAdicional}&` : '';
  const questionarioIdRequest = questionarioId ? `questionarioId.contains=${questionarioId}&` : '';

  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}&` : '?'}`;
  return {
    type: ACTION_TYPES.FETCH_RESPOSTASQUESTIONARIOS_LIST,
    payload: axios.get<IRespostasQuestionarios>(
      `${requestUrl}${dataRespostaRequest}${informacaoAdicionalRequest}${questionarioIdRequest}cacheBuster=${new Date().getTime()}`
    )
  };
};

export const createEntity: ICrudPutAction<IRespostasQuestionarios> = entity => async dispatch => {
  entity = {
    ...entity
  };
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_RESPOSTASQUESTIONARIOS,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IRespostasQuestionarios> = entity => async dispatch => {
  entity = { ...entity };
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_RESPOSTASQUESTIONARIOS,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IRespostasQuestionarios> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_RESPOSTASQUESTIONARIOS,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});

export const getRespostasQuestionariosState = (location): IRespostasQuestionariosBaseState => {
  const url = new URL(`http://localhost${location.search}`); // using a dummy url for parsing
  const baseFilters = url.searchParams.get('baseFilters') || '';
  const dataResposta = url.searchParams.get('dataResposta') || '';
  const informacaoAdicional = url.searchParams.get('informacaoAdicional') || '';
  const questionarioId = url.searchParams.get('questionarioId') || '';

  return {
    baseFilters,
    dataResposta,
    informacaoAdicional,
    questionarioId
  };
};
