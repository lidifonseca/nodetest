/* eslint complexity: ["error", 100] */
import axios from 'axios';
import { ICrudGetAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { IPayload } from 'react-jhipster/src/type/redux-action.type';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { ITipoUnidade, defaultValue } from 'app/shared/model/tipo-unidade.model';

export const ACTION_TYPES = {
  FETCH_TIPOUNIDADE_LIST: 'tipoUnidade/FETCH_TIPOUNIDADE_LIST',
  FETCH_TIPOUNIDADE: 'tipoUnidade/FETCH_TIPOUNIDADE',
  CREATE_TIPOUNIDADE: 'tipoUnidade/CREATE_TIPOUNIDADE',
  UPDATE_TIPOUNIDADE: 'tipoUnidade/UPDATE_TIPOUNIDADE',
  DELETE_TIPOUNIDADE: 'tipoUnidade/DELETE_TIPOUNIDADE',
  RESET: 'tipoUnidade/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<ITipoUnidade>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type TipoUnidadeState = Readonly<typeof initialState>;

// Reducer

export default (state: TipoUnidadeState = initialState, action): TipoUnidadeState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_TIPOUNIDADE_LIST):
    case REQUEST(ACTION_TYPES.FETCH_TIPOUNIDADE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_TIPOUNIDADE):
    case REQUEST(ACTION_TYPES.UPDATE_TIPOUNIDADE):
    case REQUEST(ACTION_TYPES.DELETE_TIPOUNIDADE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_TIPOUNIDADE_LIST):
    case FAILURE(ACTION_TYPES.FETCH_TIPOUNIDADE):
    case FAILURE(ACTION_TYPES.CREATE_TIPOUNIDADE):
    case FAILURE(ACTION_TYPES.UPDATE_TIPOUNIDADE):
    case FAILURE(ACTION_TYPES.DELETE_TIPOUNIDADE):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_TIPOUNIDADE_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10)
      };
    case SUCCESS(ACTION_TYPES.FETCH_TIPOUNIDADE):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_TIPOUNIDADE):
    case SUCCESS(ACTION_TYPES.UPDATE_TIPOUNIDADE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_TIPOUNIDADE):
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

const apiUrl = 'api/tipo-unidades';

// Actions

// Actions
export type ICrudGetAllActionTipoUnidade<T> = (
  tipoUnidade?: any,
  especialidade?: any,
  page?: number,
  size?: number,
  sort?: string
) => IPayload<T> | ((dispatch: any) => IPayload<T>);

export const getEntities: ICrudGetAllActionTipoUnidade<ITipoUnidade> = (tipoUnidade, especialidade, page, size, sort) => {
  const tipoUnidadeRequest = tipoUnidade ? `tipoUnidade.contains=${tipoUnidade}&` : '';
  const especialidadeRequest = especialidade ? `especialidade.equals=${especialidade}&` : '';

  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}&` : '?'}`;
  return {
    type: ACTION_TYPES.FETCH_TIPOUNIDADE_LIST,
    payload: axios.get<ITipoUnidade>(`${requestUrl}${tipoUnidadeRequest}${especialidadeRequest}cacheBuster=${new Date().getTime()}`)
  };
};
export const getEntity: ICrudGetAction<ITipoUnidade> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_TIPOUNIDADE,
    payload: axios.get<ITipoUnidade>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<ITipoUnidade> = entity => async dispatch => {
  entity = {
    ...entity
  };
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_TIPOUNIDADE,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<ITipoUnidade> = entity => async dispatch => {
  entity = { ...entity };
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_TIPOUNIDADE,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<ITipoUnidade> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_TIPOUNIDADE,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
