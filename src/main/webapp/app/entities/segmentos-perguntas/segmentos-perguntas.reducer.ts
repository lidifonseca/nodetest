/* eslint complexity: ["error", 100] */
import axios from 'axios';
import { ICrudGetAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { IPayload } from 'react-jhipster/src/type/redux-action.type';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { ISegmentosPerguntas, defaultValue } from 'app/shared/model/segmentos-perguntas.model';

export const ACTION_TYPES = {
  FETCH_SEGMENTOSPERGUNTAS_LIST_EXPORT: 'segmentosPerguntas/FETCH_SEGMENTOSPERGUNTAS_LIST_EXPORT',
  FETCH_SEGMENTOSPERGUNTAS_LIST: 'segmentosPerguntas/FETCH_SEGMENTOSPERGUNTAS_LIST',
  FETCH_SEGMENTOSPERGUNTAS: 'segmentosPerguntas/FETCH_SEGMENTOSPERGUNTAS',
  CREATE_SEGMENTOSPERGUNTAS: 'segmentosPerguntas/CREATE_SEGMENTOSPERGUNTAS',
  UPDATE_SEGMENTOSPERGUNTAS: 'segmentosPerguntas/UPDATE_SEGMENTOSPERGUNTAS',
  DELETE_SEGMENTOSPERGUNTAS: 'segmentosPerguntas/DELETE_SEGMENTOSPERGUNTAS',
  RESET: 'segmentosPerguntas/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<ISegmentosPerguntas>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type SegmentosPerguntasState = Readonly<typeof initialState>;

export interface ISegmentosPerguntasBaseState {
  baseFilters: any;
  segmento: any;
  perguntasQuestionario: any;
}

export interface ISegmentosPerguntasUpdateState {
  fieldsBase: ISegmentosPerguntasBaseState;

  isNew: boolean;
}

// Reducer

export default (state: SegmentosPerguntasState = initialState, action): SegmentosPerguntasState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_SEGMENTOSPERGUNTAS_LIST_EXPORT):
    case REQUEST(ACTION_TYPES.FETCH_SEGMENTOSPERGUNTAS_LIST):
    case REQUEST(ACTION_TYPES.FETCH_SEGMENTOSPERGUNTAS):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_SEGMENTOSPERGUNTAS):
    case REQUEST(ACTION_TYPES.UPDATE_SEGMENTOSPERGUNTAS):
    case REQUEST(ACTION_TYPES.DELETE_SEGMENTOSPERGUNTAS):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_SEGMENTOSPERGUNTAS_LIST_EXPORT):
    case FAILURE(ACTION_TYPES.FETCH_SEGMENTOSPERGUNTAS_LIST):
    case FAILURE(ACTION_TYPES.FETCH_SEGMENTOSPERGUNTAS):
    case FAILURE(ACTION_TYPES.CREATE_SEGMENTOSPERGUNTAS):
    case FAILURE(ACTION_TYPES.UPDATE_SEGMENTOSPERGUNTAS):
    case FAILURE(ACTION_TYPES.DELETE_SEGMENTOSPERGUNTAS):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_SEGMENTOSPERGUNTAS_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10)
      };
    case SUCCESS(ACTION_TYPES.FETCH_SEGMENTOSPERGUNTAS):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_SEGMENTOSPERGUNTAS):
    case SUCCESS(ACTION_TYPES.UPDATE_SEGMENTOSPERGUNTAS):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_SEGMENTOSPERGUNTAS):
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

const apiUrl = 'api/segmentos-perguntas';

// Actions

// Actions
export type ICrudGetAllActionSegmentosPerguntas<T> = (
  segmento?: any,
  perguntasQuestionario?: any,
  page?: number,
  size?: number,
  sort?: string
) => IPayload<T> | ((dispatch: any) => IPayload<T>);

export const getEntities: ICrudGetAllActionSegmentosPerguntas<ISegmentosPerguntas> = (
  segmento,
  perguntasQuestionario,
  page,
  size,
  sort
) => {
  const segmentoRequest = segmento ? `segmento.contains=${segmento}&` : '';
  const perguntasQuestionarioRequest = perguntasQuestionario ? `perguntasQuestionario.equals=${perguntasQuestionario}&` : '';

  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}&` : '?'}`;
  return {
    type: ACTION_TYPES.FETCH_SEGMENTOSPERGUNTAS_LIST,
    payload: axios.get<ISegmentosPerguntas>(
      `${requestUrl}${segmentoRequest}${perguntasQuestionarioRequest}cacheBuster=${new Date().getTime()}`
    )
  };
};
export const getEntity: ICrudGetAction<ISegmentosPerguntas> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_SEGMENTOSPERGUNTAS,
    payload: axios.get<ISegmentosPerguntas>(requestUrl)
  };
};

export const getEntitiesExport: ICrudGetAllActionSegmentosPerguntas<ISegmentosPerguntas> = (
  segmento,
  perguntasQuestionario,
  page,
  size,
  sort
) => {
  const segmentoRequest = segmento ? `segmento.contains=${segmento}&` : '';
  const perguntasQuestionarioRequest = perguntasQuestionario ? `perguntasQuestionario.equals=${perguntasQuestionario}&` : '';

  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}&` : '?'}`;
  return {
    type: ACTION_TYPES.FETCH_SEGMENTOSPERGUNTAS_LIST,
    payload: axios.get<ISegmentosPerguntas>(
      `${requestUrl}${segmentoRequest}${perguntasQuestionarioRequest}cacheBuster=${new Date().getTime()}`
    )
  };
};

export const createEntity: ICrudPutAction<ISegmentosPerguntas> = entity => async dispatch => {
  entity = {
    ...entity
  };
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_SEGMENTOSPERGUNTAS,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<ISegmentosPerguntas> = entity => async dispatch => {
  entity = { ...entity };
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_SEGMENTOSPERGUNTAS,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<ISegmentosPerguntas> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_SEGMENTOSPERGUNTAS,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});

export const getSegmentosPerguntasState = (location): ISegmentosPerguntasBaseState => {
  const url = new URL(`http://localhost${location.search}`); // using a dummy url for parsing
  const baseFilters = url.searchParams.get('baseFilters') || '';
  const segmento = url.searchParams.get('segmento') || '';

  const perguntasQuestionario = url.searchParams.get('perguntasQuestionario') || '';

  return {
    baseFilters,
    segmento,
    perguntasQuestionario
  };
};
