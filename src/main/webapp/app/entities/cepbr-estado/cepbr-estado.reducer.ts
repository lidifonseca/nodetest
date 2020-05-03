/* eslint complexity: ["error", 100] */
import axios from 'axios';
import { ICrudGetAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { IPayload } from 'react-jhipster/src/type/redux-action.type';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { ICepbrEstado, defaultValue } from 'app/shared/model/cepbr-estado.model';

export const ACTION_TYPES = {
  FETCH_CEPBRESTADO_LIST: 'cepbrEstado/FETCH_CEPBRESTADO_LIST',
  FETCH_CEPBRESTADO: 'cepbrEstado/FETCH_CEPBRESTADO',
  CREATE_CEPBRESTADO: 'cepbrEstado/CREATE_CEPBRESTADO',
  UPDATE_CEPBRESTADO: 'cepbrEstado/UPDATE_CEPBRESTADO',
  DELETE_CEPBRESTADO: 'cepbrEstado/DELETE_CEPBRESTADO',
  RESET: 'cepbrEstado/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<ICepbrEstado>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type CepbrEstadoState = Readonly<typeof initialState>;

// Reducer

export default (state: CepbrEstadoState = initialState, action): CepbrEstadoState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_CEPBRESTADO_LIST):
    case REQUEST(ACTION_TYPES.FETCH_CEPBRESTADO):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_CEPBRESTADO):
    case REQUEST(ACTION_TYPES.UPDATE_CEPBRESTADO):
    case REQUEST(ACTION_TYPES.DELETE_CEPBRESTADO):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_CEPBRESTADO_LIST):
    case FAILURE(ACTION_TYPES.FETCH_CEPBRESTADO):
    case FAILURE(ACTION_TYPES.CREATE_CEPBRESTADO):
    case FAILURE(ACTION_TYPES.UPDATE_CEPBRESTADO):
    case FAILURE(ACTION_TYPES.DELETE_CEPBRESTADO):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_CEPBRESTADO_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10)
      };
    case SUCCESS(ACTION_TYPES.FETCH_CEPBRESTADO):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_CEPBRESTADO):
    case SUCCESS(ACTION_TYPES.UPDATE_CEPBRESTADO):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_CEPBRESTADO):
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

const apiUrl = 'api/cepbr-estados';

// Actions

// Actions
export type ICrudGetAllActionCepbrEstado<T> = (
  uf?: any,
  estado?: any,
  codIbge?: any,
  cepbrCidade?: any,
  page?: number,
  size?: number,
  sort?: string
) => IPayload<T> | ((dispatch: any) => IPayload<T>);

export const getEntities: ICrudGetAllActionCepbrEstado<ICepbrEstado> = (uf, estado, codIbge, cepbrCidade, page, size, sort) => {
  const ufRequest = uf ? `uf.contains=${uf}&` : '';
  const estadoRequest = estado ? `estado.contains=${estado}&` : '';
  const codIbgeRequest = codIbge ? `codIbge.contains=${codIbge}&` : '';
  const cepbrCidadeRequest = cepbrCidade ? `cepbrCidade.equals=${cepbrCidade}&` : '';

  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}&` : '?'}`;
  return {
    type: ACTION_TYPES.FETCH_CEPBRESTADO_LIST,
    payload: axios.get<ICepbrEstado>(
      `${requestUrl}${ufRequest}${estadoRequest}${codIbgeRequest}${cepbrCidadeRequest}cacheBuster=${new Date().getTime()}`
    )
  };
};
export const getEntity: ICrudGetAction<ICepbrEstado> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_CEPBRESTADO,
    payload: axios.get<ICepbrEstado>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<ICepbrEstado> = entity => async dispatch => {
  entity = {
    ...entity
  };
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_CEPBRESTADO,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<ICepbrEstado> = entity => async dispatch => {
  entity = { ...entity };
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_CEPBRESTADO,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<ICepbrEstado> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_CEPBRESTADO,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
