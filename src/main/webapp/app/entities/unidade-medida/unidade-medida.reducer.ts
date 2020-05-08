/* eslint complexity: ["error", 100] */
import axios from 'axios';
import { ICrudGetAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { IPayload } from 'react-jhipster/src/type/redux-action.type';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IUnidadeMedida, defaultValue } from 'app/shared/model/unidade-medida.model';

export const ACTION_TYPES = {
  FETCH_UNIDADEMEDIDA_LIST_EXPORT: 'unidadeMedida/FETCH_UNIDADEMEDIDA_LIST_EXPORT',
  FETCH_UNIDADEMEDIDA_LIST: 'unidadeMedida/FETCH_UNIDADEMEDIDA_LIST',
  FETCH_UNIDADEMEDIDA: 'unidadeMedida/FETCH_UNIDADEMEDIDA',
  CREATE_UNIDADEMEDIDA: 'unidadeMedida/CREATE_UNIDADEMEDIDA',
  UPDATE_UNIDADEMEDIDA: 'unidadeMedida/UPDATE_UNIDADEMEDIDA',
  DELETE_UNIDADEMEDIDA: 'unidadeMedida/DELETE_UNIDADEMEDIDA',
  RESET: 'unidadeMedida/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IUnidadeMedida>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type UnidadeMedidaState = Readonly<typeof initialState>;

export interface IUnidadeMedidaBaseState {
  baseFilters: any;
  unidade: any;
  descricao: any;
}

export interface IUnidadeMedidaUpdateState {
  fieldsBase: IUnidadeMedidaBaseState;

  isNew: boolean;
}

// Reducer

export default (state: UnidadeMedidaState = initialState, action): UnidadeMedidaState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_UNIDADEMEDIDA_LIST_EXPORT):
    case REQUEST(ACTION_TYPES.FETCH_UNIDADEMEDIDA_LIST):
    case REQUEST(ACTION_TYPES.FETCH_UNIDADEMEDIDA):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_UNIDADEMEDIDA):
    case REQUEST(ACTION_TYPES.UPDATE_UNIDADEMEDIDA):
    case REQUEST(ACTION_TYPES.DELETE_UNIDADEMEDIDA):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_UNIDADEMEDIDA_LIST_EXPORT):
    case FAILURE(ACTION_TYPES.FETCH_UNIDADEMEDIDA_LIST):
    case FAILURE(ACTION_TYPES.FETCH_UNIDADEMEDIDA):
    case FAILURE(ACTION_TYPES.CREATE_UNIDADEMEDIDA):
    case FAILURE(ACTION_TYPES.UPDATE_UNIDADEMEDIDA):
    case FAILURE(ACTION_TYPES.DELETE_UNIDADEMEDIDA):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_UNIDADEMEDIDA_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10)
      };
    case SUCCESS(ACTION_TYPES.FETCH_UNIDADEMEDIDA):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_UNIDADEMEDIDA):
    case SUCCESS(ACTION_TYPES.UPDATE_UNIDADEMEDIDA):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_UNIDADEMEDIDA):
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

const apiUrl = 'api/unidade-medidas';

// Actions

// Actions
export type ICrudGetAllActionUnidadeMedida<T> = (
  unidade?: any,
  descricao?: any,
  page?: number,
  size?: number,
  sort?: string
) => IPayload<T> | ((dispatch: any) => IPayload<T>);

export const getEntities: ICrudGetAllActionUnidadeMedida<IUnidadeMedida> = (unidade, descricao, page, size, sort) => {
  const unidadeRequest = unidade ? `unidade.contains=${unidade}&` : '';
  const descricaoRequest = descricao ? `descricao.contains=${descricao}&` : '';

  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}&` : '?'}`;
  return {
    type: ACTION_TYPES.FETCH_UNIDADEMEDIDA_LIST,
    payload: axios.get<IUnidadeMedida>(`${requestUrl}${unidadeRequest}${descricaoRequest}cacheBuster=${new Date().getTime()}`)
  };
};
export const getEntity: ICrudGetAction<IUnidadeMedida> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_UNIDADEMEDIDA,
    payload: axios.get<IUnidadeMedida>(requestUrl)
  };
};

export const getEntitiesExport: ICrudGetAllActionUnidadeMedida<IUnidadeMedida> = (unidade, descricao, page, size, sort) => {
  const unidadeRequest = unidade ? `unidade.contains=${unidade}&` : '';
  const descricaoRequest = descricao ? `descricao.contains=${descricao}&` : '';

  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}&` : '?'}`;
  return {
    type: ACTION_TYPES.FETCH_UNIDADEMEDIDA_LIST,
    payload: axios.get<IUnidadeMedida>(`${requestUrl}${unidadeRequest}${descricaoRequest}cacheBuster=${new Date().getTime()}`)
  };
};

export const createEntity: ICrudPutAction<IUnidadeMedida> = entity => async dispatch => {
  entity = {
    ...entity
  };
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_UNIDADEMEDIDA,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IUnidadeMedida> = entity => async dispatch => {
  entity = { ...entity };
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_UNIDADEMEDIDA,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IUnidadeMedida> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_UNIDADEMEDIDA,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});

export const getUnidadeMedidaState = (location): IUnidadeMedidaBaseState => {
  const url = new URL(`http://localhost${location.search}`); // using a dummy url for parsing
  const baseFilters = url.searchParams.get('baseFilters') || '';
  const unidade = url.searchParams.get('unidade') || '';
  const descricao = url.searchParams.get('descricao') || '';

  return {
    baseFilters,
    unidade,
    descricao
  };
};
