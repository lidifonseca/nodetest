/* eslint complexity: ["error", 100] */
import axios from 'axios';
import { ICrudGetAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { IPayload } from 'react-jhipster/src/type/redux-action.type';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IAtividades, defaultValue } from 'app/shared/model/atividades.model';

export const ACTION_TYPES = {
  FETCH_ATIVIDADES_LIST: 'atividades/FETCH_ATIVIDADES_LIST',
  FETCH_ATIVIDADES: 'atividades/FETCH_ATIVIDADES',
  CREATE_ATIVIDADES: 'atividades/CREATE_ATIVIDADES',
  UPDATE_ATIVIDADES: 'atividades/UPDATE_ATIVIDADES',
  DELETE_ATIVIDADES: 'atividades/DELETE_ATIVIDADES',
  RESET: 'atividades/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IAtividades>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type AtividadesState = Readonly<typeof initialState>;

// Reducer

export default (state: AtividadesState = initialState, action): AtividadesState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_ATIVIDADES_LIST):
    case REQUEST(ACTION_TYPES.FETCH_ATIVIDADES):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_ATIVIDADES):
    case REQUEST(ACTION_TYPES.UPDATE_ATIVIDADES):
    case REQUEST(ACTION_TYPES.DELETE_ATIVIDADES):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_ATIVIDADES_LIST):
    case FAILURE(ACTION_TYPES.FETCH_ATIVIDADES):
    case FAILURE(ACTION_TYPES.CREATE_ATIVIDADES):
    case FAILURE(ACTION_TYPES.UPDATE_ATIVIDADES):
    case FAILURE(ACTION_TYPES.DELETE_ATIVIDADES):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_ATIVIDADES_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10)
      };
    case SUCCESS(ACTION_TYPES.FETCH_ATIVIDADES):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_ATIVIDADES):
    case SUCCESS(ACTION_TYPES.UPDATE_ATIVIDADES):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_ATIVIDADES):
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

const apiUrl = 'api/atividades';

// Actions

// Actions
export type ICrudGetAllActionAtividades<T> = (
  atividade?: any,
  ativo?: any,
  page?: number,
  size?: number,
  sort?: string
) => IPayload<T> | ((dispatch: any) => IPayload<T>);

export const getEntities: ICrudGetAllActionAtividades<IAtividades> = (atividade, ativo, page, size, sort) => {
  const atividadeRequest = atividade ? `atividade.contains=${atividade}&` : '';
  const ativoRequest = ativo ? `ativo.contains=${ativo}&` : '';

  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}&` : '?'}`;
  return {
    type: ACTION_TYPES.FETCH_ATIVIDADES_LIST,
    payload: axios.get<IAtividades>(`${requestUrl}${atividadeRequest}${ativoRequest}cacheBuster=${new Date().getTime()}`)
  };
};
export const getEntity: ICrudGetAction<IAtividades> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_ATIVIDADES,
    payload: axios.get<IAtividades>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IAtividades> = entity => async dispatch => {
  entity = {
    ...entity
  };
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_ATIVIDADES,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IAtividades> = entity => async dispatch => {
  entity = { ...entity };
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_ATIVIDADES,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IAtividades> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_ATIVIDADES,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
