/* eslint complexity: ["error", 100] */
import axios from 'axios';
import { ICrudGetAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { IPayload } from 'react-jhipster/src/type/redux-action.type';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IRespostas, defaultValue } from 'app/shared/model/respostas.model';

export const ACTION_TYPES = {
  FETCH_RESPOSTAS_LIST_EXPORT: 'respostas/FETCH_RESPOSTAS_LIST_EXPORT',
  FETCH_RESPOSTAS_LIST: 'respostas/FETCH_RESPOSTAS_LIST',
  FETCH_RESPOSTAS: 'respostas/FETCH_RESPOSTAS',
  CREATE_RESPOSTAS: 'respostas/CREATE_RESPOSTAS',
  UPDATE_RESPOSTAS: 'respostas/UPDATE_RESPOSTAS',
  DELETE_RESPOSTAS: 'respostas/DELETE_RESPOSTAS',
  RESET: 'respostas/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IRespostas>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type RespostasState = Readonly<typeof initialState>;

export interface IRespostasBaseState {
  baseFilters: any;
  resposta: any;
  pontuacao: any;
  respostaAtiva: any;
  acoesRespostas: any;
  perguntasQuestionario: any;
}

export interface IRespostasUpdateState {
  fieldsBase: IRespostasBaseState;

  perguntasQuestionarioSelectValue: any;
  isNew: boolean;
  perguntasQuestionarioId: string;
}

// Reducer

export default (state: RespostasState = initialState, action): RespostasState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_RESPOSTAS_LIST_EXPORT):
    case REQUEST(ACTION_TYPES.FETCH_RESPOSTAS_LIST):
    case REQUEST(ACTION_TYPES.FETCH_RESPOSTAS):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_RESPOSTAS):
    case REQUEST(ACTION_TYPES.UPDATE_RESPOSTAS):
    case REQUEST(ACTION_TYPES.DELETE_RESPOSTAS):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_RESPOSTAS_LIST_EXPORT):
    case FAILURE(ACTION_TYPES.FETCH_RESPOSTAS_LIST):
    case FAILURE(ACTION_TYPES.FETCH_RESPOSTAS):
    case FAILURE(ACTION_TYPES.CREATE_RESPOSTAS):
    case FAILURE(ACTION_TYPES.UPDATE_RESPOSTAS):
    case FAILURE(ACTION_TYPES.DELETE_RESPOSTAS):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_RESPOSTAS_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10)
      };
    case SUCCESS(ACTION_TYPES.FETCH_RESPOSTAS):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_RESPOSTAS):
    case SUCCESS(ACTION_TYPES.UPDATE_RESPOSTAS):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_RESPOSTAS):
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

const apiUrl = 'api/respostas';

// Actions

// Actions
export type ICrudGetAllActionRespostas<T> = (
  resposta?: any,
  pontuacao?: any,
  respostaAtiva?: any,
  acoesRespostas?: any,
  perguntasQuestionario?: any,
  page?: number,
  size?: number,
  sort?: string
) => IPayload<T> | ((dispatch: any) => IPayload<T>);

export const getEntities: ICrudGetAllActionRespostas<IRespostas> = (
  resposta,
  pontuacao,
  respostaAtiva,
  acoesRespostas,
  perguntasQuestionario,
  page,
  size,
  sort
) => {
  const respostaRequest = resposta ? `resposta.contains=${resposta}&` : '';
  const pontuacaoRequest = pontuacao ? `pontuacao.contains=${pontuacao}&` : '';
  const respostaAtivaRequest = respostaAtiva ? `respostaAtiva.contains=${respostaAtiva}&` : '';
  const acoesRespostasRequest = acoesRespostas ? `acoesRespostas.equals=${acoesRespostas}&` : '';
  const perguntasQuestionarioRequest = perguntasQuestionario ? `perguntasQuestionario.equals=${perguntasQuestionario}&` : '';

  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}&` : '?'}`;
  return {
    type: ACTION_TYPES.FETCH_RESPOSTAS_LIST,
    payload: axios.get<IRespostas>(
      `${requestUrl}${respostaRequest}${pontuacaoRequest}${respostaAtivaRequest}${acoesRespostasRequest}${perguntasQuestionarioRequest}cacheBuster=${new Date().getTime()}`
    )
  };
};
export const getEntity: ICrudGetAction<IRespostas> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_RESPOSTAS,
    payload: axios.get<IRespostas>(requestUrl)
  };
};

export const getEntitiesExport: ICrudGetAllActionRespostas<IRespostas> = (
  resposta,
  pontuacao,
  respostaAtiva,
  acoesRespostas,
  perguntasQuestionario,
  page,
  size,
  sort
) => {
  const respostaRequest = resposta ? `resposta.contains=${resposta}&` : '';
  const pontuacaoRequest = pontuacao ? `pontuacao.contains=${pontuacao}&` : '';
  const respostaAtivaRequest = respostaAtiva ? `respostaAtiva.contains=${respostaAtiva}&` : '';
  const acoesRespostasRequest = acoesRespostas ? `acoesRespostas.equals=${acoesRespostas}&` : '';
  const perguntasQuestionarioRequest = perguntasQuestionario ? `perguntasQuestionario.equals=${perguntasQuestionario}&` : '';

  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}&` : '?'}`;
  return {
    type: ACTION_TYPES.FETCH_RESPOSTAS_LIST,
    payload: axios.get<IRespostas>(
      `${requestUrl}${respostaRequest}${pontuacaoRequest}${respostaAtivaRequest}${acoesRespostasRequest}${perguntasQuestionarioRequest}cacheBuster=${new Date().getTime()}`
    )
  };
};

export const createEntity: ICrudPutAction<IRespostas> = entity => async dispatch => {
  entity = {
    ...entity,
    perguntasQuestionario: entity.perguntasQuestionario === 'null' ? null : entity.perguntasQuestionario
  };
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_RESPOSTAS,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IRespostas> = entity => async dispatch => {
  entity = { ...entity, perguntasQuestionario: entity.perguntasQuestionario === 'null' ? null : entity.perguntasQuestionario };
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_RESPOSTAS,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IRespostas> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_RESPOSTAS,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});

export const getRespostasState = (location): IRespostasBaseState => {
  const url = new URL(`http://localhost${location.search}`); // using a dummy url for parsing
  const baseFilters = url.searchParams.get('baseFilters') || '';
  const resposta = url.searchParams.get('resposta') || '';
  const pontuacao = url.searchParams.get('pontuacao') || '';
  const respostaAtiva = url.searchParams.get('respostaAtiva') || '';

  const acoesRespostas = url.searchParams.get('acoesRespostas') || '';
  const perguntasQuestionario = url.searchParams.get('perguntasQuestionario') || '';

  return {
    baseFilters,
    resposta,
    pontuacao,
    respostaAtiva,
    acoesRespostas,
    perguntasQuestionario
  };
};
