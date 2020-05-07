/* eslint complexity: ["error", 100] */
import axios from 'axios';
import { ICrudGetAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { IPayload } from 'react-jhipster/src/type/redux-action.type';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { ICidXPtaNovo, defaultValue } from 'app/shared/model/cid-x-pta-novo.model';

export const ACTION_TYPES = {
  FETCH_CIDXPTANOVO_LIST_EXPORT: 'cidXPtaNovo/FETCH_CIDXPTANOVO_LIST_EXPORT',
  FETCH_CIDXPTANOVO_LIST: 'cidXPtaNovo/FETCH_CIDXPTANOVO_LIST',
  FETCH_CIDXPTANOVO: 'cidXPtaNovo/FETCH_CIDXPTANOVO',
  CREATE_CIDXPTANOVO: 'cidXPtaNovo/CREATE_CIDXPTANOVO',
  UPDATE_CIDXPTANOVO: 'cidXPtaNovo/UPDATE_CIDXPTANOVO',
  DELETE_CIDXPTANOVO: 'cidXPtaNovo/DELETE_CIDXPTANOVO',
  RESET: 'cidXPtaNovo/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<ICidXPtaNovo>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type CidXPtaNovoState = Readonly<typeof initialState>;

export interface ICidXPtaNovoBaseState {
  baseFilters: any;
  complexidade: any;
  versao: any;
  score: any;
  titulo: any;
}

export interface ICidXPtaNovoUpdateState {
  fieldsBase: ICidXPtaNovoBaseState;
  isNew: boolean;
}

// Reducer

export default (state: CidXPtaNovoState = initialState, action): CidXPtaNovoState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_CIDXPTANOVO_LIST_EXPORT):
    case REQUEST(ACTION_TYPES.FETCH_CIDXPTANOVO_LIST):
    case REQUEST(ACTION_TYPES.FETCH_CIDXPTANOVO):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_CIDXPTANOVO):
    case REQUEST(ACTION_TYPES.UPDATE_CIDXPTANOVO):
    case REQUEST(ACTION_TYPES.DELETE_CIDXPTANOVO):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_CIDXPTANOVO_LIST_EXPORT):
    case FAILURE(ACTION_TYPES.FETCH_CIDXPTANOVO_LIST):
    case FAILURE(ACTION_TYPES.FETCH_CIDXPTANOVO):
    case FAILURE(ACTION_TYPES.CREATE_CIDXPTANOVO):
    case FAILURE(ACTION_TYPES.UPDATE_CIDXPTANOVO):
    case FAILURE(ACTION_TYPES.DELETE_CIDXPTANOVO):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_CIDXPTANOVO_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10)
      };
    case SUCCESS(ACTION_TYPES.FETCH_CIDXPTANOVO):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_CIDXPTANOVO):
    case SUCCESS(ACTION_TYPES.UPDATE_CIDXPTANOVO):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_CIDXPTANOVO):
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

const apiUrl = 'api/cid-x-pta-novos';

// Actions

// Actions
export type ICrudGetAllActionCidXPtaNovo<T> = (
  complexidade?: any,
  versao?: any,
  score?: any,
  titulo?: any,
  page?: number,
  size?: number,
  sort?: string
) => IPayload<T> | ((dispatch: any) => IPayload<T>);

export const getEntities: ICrudGetAllActionCidXPtaNovo<ICidXPtaNovo> = (complexidade, versao, score, titulo, page, size, sort) => {
  const complexidadeRequest = complexidade ? `complexidade.contains=${complexidade}&` : '';
  const versaoRequest = versao ? `versao.contains=${versao}&` : '';
  const scoreRequest = score ? `score.contains=${score}&` : '';
  const tituloRequest = titulo ? `titulo.contains=${titulo}&` : '';

  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}&` : '?'}`;
  return {
    type: ACTION_TYPES.FETCH_CIDXPTANOVO_LIST,
    payload: axios.get<ICidXPtaNovo>(
      `${requestUrl}${complexidadeRequest}${versaoRequest}${scoreRequest}${tituloRequest}cacheBuster=${new Date().getTime()}`
    )
  };
};
export const getEntity: ICrudGetAction<ICidXPtaNovo> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_CIDXPTANOVO,
    payload: axios.get<ICidXPtaNovo>(requestUrl)
  };
};

export const getEntitiesExport: ICrudGetAllActionCidXPtaNovo<ICidXPtaNovo> = (complexidade, versao, score, titulo, page, size, sort) => {
  const complexidadeRequest = complexidade ? `complexidade.contains=${complexidade}&` : '';
  const versaoRequest = versao ? `versao.contains=${versao}&` : '';
  const scoreRequest = score ? `score.contains=${score}&` : '';
  const tituloRequest = titulo ? `titulo.contains=${titulo}&` : '';

  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}&` : '?'}`;
  return {
    type: ACTION_TYPES.FETCH_CIDXPTANOVO_LIST,
    payload: axios.get<ICidXPtaNovo>(
      `${requestUrl}${complexidadeRequest}${versaoRequest}${scoreRequest}${tituloRequest}cacheBuster=${new Date().getTime()}`
    )
  };
};

export const createEntity: ICrudPutAction<ICidXPtaNovo> = entity => async dispatch => {
  entity = {
    ...entity
  };
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_CIDXPTANOVO,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<ICidXPtaNovo> = entity => async dispatch => {
  entity = { ...entity };
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_CIDXPTANOVO,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<ICidXPtaNovo> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_CIDXPTANOVO,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});

export const getCidXPtaNovoState = (location): ICidXPtaNovoBaseState => {
  const url = new URL(`http://localhost${location.search}`); // using a dummy url for parsing
  const baseFilters = url.searchParams.get('baseFilters') || '';
  const complexidade = url.searchParams.get('complexidade') || '';
  const versao = url.searchParams.get('versao') || '';
  const score = url.searchParams.get('score') || '';
  const titulo = url.searchParams.get('titulo') || '';

  return {
    baseFilters,
    complexidade,
    versao,
    score,
    titulo
  };
};
