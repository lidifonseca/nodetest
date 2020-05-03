/* eslint complexity: ["error", 100] */
import axios from 'axios';
import { ICrudGetAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { IPayload } from 'react-jhipster/src/type/redux-action.type';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IPadItemIndicadores, defaultValue } from 'app/shared/model/pad-item-indicadores.model';

export const ACTION_TYPES = {
  FETCH_PADITEMINDICADORES_LIST: 'padItemIndicadores/FETCH_PADITEMINDICADORES_LIST',
  FETCH_PADITEMINDICADORES: 'padItemIndicadores/FETCH_PADITEMINDICADORES',
  CREATE_PADITEMINDICADORES: 'padItemIndicadores/CREATE_PADITEMINDICADORES',
  UPDATE_PADITEMINDICADORES: 'padItemIndicadores/UPDATE_PADITEMINDICADORES',
  DELETE_PADITEMINDICADORES: 'padItemIndicadores/DELETE_PADITEMINDICADORES',
  RESET: 'padItemIndicadores/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IPadItemIndicadores>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type PadItemIndicadoresState = Readonly<typeof initialState>;

// Reducer

export default (state: PadItemIndicadoresState = initialState, action): PadItemIndicadoresState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_PADITEMINDICADORES_LIST):
    case REQUEST(ACTION_TYPES.FETCH_PADITEMINDICADORES):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_PADITEMINDICADORES):
    case REQUEST(ACTION_TYPES.UPDATE_PADITEMINDICADORES):
    case REQUEST(ACTION_TYPES.DELETE_PADITEMINDICADORES):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_PADITEMINDICADORES_LIST):
    case FAILURE(ACTION_TYPES.FETCH_PADITEMINDICADORES):
    case FAILURE(ACTION_TYPES.CREATE_PADITEMINDICADORES):
    case FAILURE(ACTION_TYPES.UPDATE_PADITEMINDICADORES):
    case FAILURE(ACTION_TYPES.DELETE_PADITEMINDICADORES):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_PADITEMINDICADORES_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10)
      };
    case SUCCESS(ACTION_TYPES.FETCH_PADITEMINDICADORES):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_PADITEMINDICADORES):
    case SUCCESS(ACTION_TYPES.UPDATE_PADITEMINDICADORES):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_PADITEMINDICADORES):
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

const apiUrl = 'api/pad-item-indicadores';

// Actions

// Actions
export type ICrudGetAllActionPadItemIndicadores<T> = (
  idUnidadeMedida?: any,
  titulo?: any,
  descricao?: any,
  meta?: any,
  maximoSt?: any,
  minimoSt?: any,
  cidXPtaNovoPadItemIndi?: any,
  page?: number,
  size?: number,
  sort?: string
) => IPayload<T> | ((dispatch: any) => IPayload<T>);

export const getEntities: ICrudGetAllActionPadItemIndicadores<IPadItemIndicadores> = (
  idUnidadeMedida,
  titulo,
  descricao,
  meta,
  maximoSt,
  minimoSt,
  cidXPtaNovoPadItemIndi,
  page,
  size,
  sort
) => {
  const idUnidadeMedidaRequest = idUnidadeMedida ? `idUnidadeMedida.contains=${idUnidadeMedida}&` : '';
  const tituloRequest = titulo ? `titulo.contains=${titulo}&` : '';
  const descricaoRequest = descricao ? `descricao.contains=${descricao}&` : '';
  const metaRequest = meta ? `meta.contains=${meta}&` : '';
  const maximoStRequest = maximoSt ? `maximoSt.contains=${maximoSt}&` : '';
  const minimoStRequest = minimoSt ? `minimoSt.contains=${minimoSt}&` : '';
  const cidXPtaNovoPadItemIndiRequest = cidXPtaNovoPadItemIndi ? `cidXPtaNovoPadItemIndi.equals=${cidXPtaNovoPadItemIndi}&` : '';

  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}&` : '?'}`;
  return {
    type: ACTION_TYPES.FETCH_PADITEMINDICADORES_LIST,
    payload: axios.get<IPadItemIndicadores>(
      `${requestUrl}${idUnidadeMedidaRequest}${tituloRequest}${descricaoRequest}${metaRequest}${maximoStRequest}${minimoStRequest}${cidXPtaNovoPadItemIndiRequest}cacheBuster=${new Date().getTime()}`
    )
  };
};
export const getEntity: ICrudGetAction<IPadItemIndicadores> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_PADITEMINDICADORES,
    payload: axios.get<IPadItemIndicadores>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IPadItemIndicadores> = entity => async dispatch => {
  entity = {
    ...entity
  };
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_PADITEMINDICADORES,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IPadItemIndicadores> = entity => async dispatch => {
  entity = { ...entity };
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_PADITEMINDICADORES,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IPadItemIndicadores> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_PADITEMINDICADORES,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
