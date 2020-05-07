/* eslint complexity: ["error", 100] */
import axios from 'axios';
import { ICrudGetAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { IPayload } from 'react-jhipster/src/type/redux-action.type';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { ICidXPtaNovoPadItemIndi, defaultValue } from 'app/shared/model/cid-x-pta-novo-pad-item-indi.model';

export const ACTION_TYPES = {
  FETCH_CIDXPTANOVOPADITEMINDI_LIST_EXPORT: 'cidXPtaNovoPadItemIndi/FETCH_CIDXPTANOVOPADITEMINDI_LIST_EXPORT',
  FETCH_CIDXPTANOVOPADITEMINDI_LIST: 'cidXPtaNovoPadItemIndi/FETCH_CIDXPTANOVOPADITEMINDI_LIST',
  FETCH_CIDXPTANOVOPADITEMINDI: 'cidXPtaNovoPadItemIndi/FETCH_CIDXPTANOVOPADITEMINDI',
  CREATE_CIDXPTANOVOPADITEMINDI: 'cidXPtaNovoPadItemIndi/CREATE_CIDXPTANOVOPADITEMINDI',
  UPDATE_CIDXPTANOVOPADITEMINDI: 'cidXPtaNovoPadItemIndi/UPDATE_CIDXPTANOVOPADITEMINDI',
  DELETE_CIDXPTANOVOPADITEMINDI: 'cidXPtaNovoPadItemIndi/DELETE_CIDXPTANOVOPADITEMINDI',
  RESET: 'cidXPtaNovoPadItemIndi/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<ICidXPtaNovoPadItemIndi>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type CidXPtaNovoPadItemIndiState = Readonly<typeof initialState>;

export interface ICidXPtaNovoPadItemIndiBaseState {
  baseFilters: any;
  meta: any;
  maximo: any;
  minimo: any;
  unidadeMedidaExtra: any;
  unidadeMedidaId: any;
  score: any;
}

export interface ICidXPtaNovoPadItemIndiUpdateState {
  fieldsBase: ICidXPtaNovoPadItemIndiBaseState;
  isNew: boolean;
}

// Reducer

export default (state: CidXPtaNovoPadItemIndiState = initialState, action): CidXPtaNovoPadItemIndiState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_CIDXPTANOVOPADITEMINDI_LIST_EXPORT):
    case REQUEST(ACTION_TYPES.FETCH_CIDXPTANOVOPADITEMINDI_LIST):
    case REQUEST(ACTION_TYPES.FETCH_CIDXPTANOVOPADITEMINDI):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_CIDXPTANOVOPADITEMINDI):
    case REQUEST(ACTION_TYPES.UPDATE_CIDXPTANOVOPADITEMINDI):
    case REQUEST(ACTION_TYPES.DELETE_CIDXPTANOVOPADITEMINDI):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_CIDXPTANOVOPADITEMINDI_LIST_EXPORT):
    case FAILURE(ACTION_TYPES.FETCH_CIDXPTANOVOPADITEMINDI_LIST):
    case FAILURE(ACTION_TYPES.FETCH_CIDXPTANOVOPADITEMINDI):
    case FAILURE(ACTION_TYPES.CREATE_CIDXPTANOVOPADITEMINDI):
    case FAILURE(ACTION_TYPES.UPDATE_CIDXPTANOVOPADITEMINDI):
    case FAILURE(ACTION_TYPES.DELETE_CIDXPTANOVOPADITEMINDI):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_CIDXPTANOVOPADITEMINDI_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10)
      };
    case SUCCESS(ACTION_TYPES.FETCH_CIDXPTANOVOPADITEMINDI):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_CIDXPTANOVOPADITEMINDI):
    case SUCCESS(ACTION_TYPES.UPDATE_CIDXPTANOVOPADITEMINDI):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_CIDXPTANOVOPADITEMINDI):
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

const apiUrl = 'api/cid-x-pta-novo-pad-item-indis';

// Actions

// Actions
export type ICrudGetAllActionCidXPtaNovoPadItemIndi<T> = (
  meta?: any,
  maximo?: any,
  minimo?: any,
  unidadeMedidaExtra?: any,
  unidadeMedidaId?: any,
  score?: any,
  page?: number,
  size?: number,
  sort?: string
) => IPayload<T> | ((dispatch: any) => IPayload<T>);

export const getEntities: ICrudGetAllActionCidXPtaNovoPadItemIndi<ICidXPtaNovoPadItemIndi> = (
  meta,
  maximo,
  minimo,
  unidadeMedidaExtra,
  unidadeMedidaId,
  score,
  page,
  size,
  sort
) => {
  const metaRequest = meta ? `meta.contains=${meta}&` : '';
  const maximoRequest = maximo ? `maximo.contains=${maximo}&` : '';
  const minimoRequest = minimo ? `minimo.contains=${minimo}&` : '';
  const unidadeMedidaExtraRequest = unidadeMedidaExtra ? `unidadeMedidaExtra.contains=${unidadeMedidaExtra}&` : '';
  const unidadeMedidaIdRequest = unidadeMedidaId ? `unidadeMedidaId.contains=${unidadeMedidaId}&` : '';
  const scoreRequest = score ? `score.contains=${score}&` : '';

  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}&` : '?'}`;
  return {
    type: ACTION_TYPES.FETCH_CIDXPTANOVOPADITEMINDI_LIST,
    payload: axios.get<ICidXPtaNovoPadItemIndi>(
      `${requestUrl}${metaRequest}${maximoRequest}${minimoRequest}${unidadeMedidaExtraRequest}${unidadeMedidaIdRequest}${scoreRequest}cacheBuster=${new Date().getTime()}`
    )
  };
};
export const getEntity: ICrudGetAction<ICidXPtaNovoPadItemIndi> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_CIDXPTANOVOPADITEMINDI,
    payload: axios.get<ICidXPtaNovoPadItemIndi>(requestUrl)
  };
};

export const getEntitiesExport: ICrudGetAllActionCidXPtaNovoPadItemIndi<ICidXPtaNovoPadItemIndi> = (
  meta,
  maximo,
  minimo,
  unidadeMedidaExtra,
  unidadeMedidaId,
  score,
  page,
  size,
  sort
) => {
  const metaRequest = meta ? `meta.contains=${meta}&` : '';
  const maximoRequest = maximo ? `maximo.contains=${maximo}&` : '';
  const minimoRequest = minimo ? `minimo.contains=${minimo}&` : '';
  const unidadeMedidaExtraRequest = unidadeMedidaExtra ? `unidadeMedidaExtra.contains=${unidadeMedidaExtra}&` : '';
  const unidadeMedidaIdRequest = unidadeMedidaId ? `unidadeMedidaId.contains=${unidadeMedidaId}&` : '';
  const scoreRequest = score ? `score.contains=${score}&` : '';

  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}&` : '?'}`;
  return {
    type: ACTION_TYPES.FETCH_CIDXPTANOVOPADITEMINDI_LIST,
    payload: axios.get<ICidXPtaNovoPadItemIndi>(
      `${requestUrl}${metaRequest}${maximoRequest}${minimoRequest}${unidadeMedidaExtraRequest}${unidadeMedidaIdRequest}${scoreRequest}cacheBuster=${new Date().getTime()}`
    )
  };
};

export const createEntity: ICrudPutAction<ICidXPtaNovoPadItemIndi> = entity => async dispatch => {
  entity = {
    ...entity
  };
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_CIDXPTANOVOPADITEMINDI,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<ICidXPtaNovoPadItemIndi> = entity => async dispatch => {
  entity = { ...entity };
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_CIDXPTANOVOPADITEMINDI,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<ICidXPtaNovoPadItemIndi> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_CIDXPTANOVOPADITEMINDI,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});

export const getCidXPtaNovoPadItemIndiState = (location): ICidXPtaNovoPadItemIndiBaseState => {
  const url = new URL(`http://localhost${location.search}`); // using a dummy url for parsing
  const baseFilters = url.searchParams.get('baseFilters') || '';
  const meta = url.searchParams.get('meta') || '';
  const maximo = url.searchParams.get('maximo') || '';
  const minimo = url.searchParams.get('minimo') || '';
  const unidadeMedidaExtra = url.searchParams.get('unidadeMedidaExtra') || '';
  const unidadeMedidaId = url.searchParams.get('unidadeMedidaId') || '';
  const score = url.searchParams.get('score') || '';

  return {
    baseFilters,
    meta,
    maximo,
    minimo,
    unidadeMedidaExtra,
    unidadeMedidaId,
    score
  };
};
