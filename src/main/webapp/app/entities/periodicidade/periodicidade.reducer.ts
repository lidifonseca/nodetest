/* eslint complexity: ["error", 100] */
import axios from 'axios';
import { ICrudGetAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { IPayload } from 'react-jhipster/src/type/redux-action.type';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IPeriodicidade, defaultValue } from 'app/shared/model/periodicidade.model';

export const ACTION_TYPES = {
  FETCH_PERIODICIDADE_LIST_EXPORT: 'periodicidade/FETCH_PERIODICIDADE_LIST_EXPORT',
  FETCH_PERIODICIDADE_LIST: 'periodicidade/FETCH_PERIODICIDADE_LIST',
  FETCH_PERIODICIDADE: 'periodicidade/FETCH_PERIODICIDADE',
  CREATE_PERIODICIDADE: 'periodicidade/CREATE_PERIODICIDADE',
  UPDATE_PERIODICIDADE: 'periodicidade/UPDATE_PERIODICIDADE',
  DELETE_PERIODICIDADE: 'periodicidade/DELETE_PERIODICIDADE',
  RESET: 'periodicidade/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IPeriodicidade>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type PeriodicidadeState = Readonly<typeof initialState>;

export interface IPeriodicidadeBaseState {
  baseFilters: any;
  periodicidade: any;
  ativo: any;
}

export interface IPeriodicidadeUpdateState {
  fieldsBase: IPeriodicidadeBaseState;
  isNew: boolean;
}

// Reducer

export default (state: PeriodicidadeState = initialState, action): PeriodicidadeState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_PERIODICIDADE_LIST_EXPORT):
    case REQUEST(ACTION_TYPES.FETCH_PERIODICIDADE_LIST):
    case REQUEST(ACTION_TYPES.FETCH_PERIODICIDADE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_PERIODICIDADE):
    case REQUEST(ACTION_TYPES.UPDATE_PERIODICIDADE):
    case REQUEST(ACTION_TYPES.DELETE_PERIODICIDADE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_PERIODICIDADE_LIST_EXPORT):
    case FAILURE(ACTION_TYPES.FETCH_PERIODICIDADE_LIST):
    case FAILURE(ACTION_TYPES.FETCH_PERIODICIDADE):
    case FAILURE(ACTION_TYPES.CREATE_PERIODICIDADE):
    case FAILURE(ACTION_TYPES.UPDATE_PERIODICIDADE):
    case FAILURE(ACTION_TYPES.DELETE_PERIODICIDADE):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_PERIODICIDADE_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10)
      };
    case SUCCESS(ACTION_TYPES.FETCH_PERIODICIDADE):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_PERIODICIDADE):
    case SUCCESS(ACTION_TYPES.UPDATE_PERIODICIDADE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_PERIODICIDADE):
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

const apiUrl = 'api/periodicidades';

// Actions

// Actions
export type ICrudGetAllActionPeriodicidade<T> = (
  periodicidade?: any,
  ativo?: any,
  page?: number,
  size?: number,
  sort?: string
) => IPayload<T> | ((dispatch: any) => IPayload<T>);

export const getEntities: ICrudGetAllActionPeriodicidade<IPeriodicidade> = (periodicidade, ativo, page, size, sort) => {
  const periodicidadeRequest = periodicidade ? `periodicidade.contains=${periodicidade}&` : '';
  const ativoRequest = ativo ? `ativo.contains=${ativo}&` : '';

  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}&` : '?'}`;
  return {
    type: ACTION_TYPES.FETCH_PERIODICIDADE_LIST,
    payload: axios.get<IPeriodicidade>(`${requestUrl}${periodicidadeRequest}${ativoRequest}cacheBuster=${new Date().getTime()}`)
  };
};
export const getEntity: ICrudGetAction<IPeriodicidade> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_PERIODICIDADE,
    payload: axios.get<IPeriodicidade>(requestUrl)
  };
};

export const getEntitiesExport: ICrudGetAllActionPeriodicidade<IPeriodicidade> = (periodicidade, ativo, page, size, sort) => {
  const periodicidadeRequest = periodicidade ? `periodicidade.contains=${periodicidade}&` : '';
  const ativoRequest = ativo ? `ativo.contains=${ativo}&` : '';

  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}&` : '?'}`;
  return {
    type: ACTION_TYPES.FETCH_PERIODICIDADE_LIST,
    payload: axios.get<IPeriodicidade>(`${requestUrl}${periodicidadeRequest}${ativoRequest}cacheBuster=${new Date().getTime()}`)
  };
};

export const createEntity: ICrudPutAction<IPeriodicidade> = entity => async dispatch => {
  entity = {
    ...entity
  };
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_PERIODICIDADE,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IPeriodicidade> = entity => async dispatch => {
  entity = { ...entity };
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_PERIODICIDADE,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IPeriodicidade> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_PERIODICIDADE,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});

export const getPeriodicidadeState = (location): IPeriodicidadeBaseState => {
  const url = new URL(`http://localhost${location.search}`); // using a dummy url for parsing
  const baseFilters = url.searchParams.get('baseFilters') || '';
  const periodicidade = url.searchParams.get('periodicidade') || '';
  const ativo = url.searchParams.get('ativo') || '';

  return {
    baseFilters,
    periodicidade,
    ativo
  };
};
