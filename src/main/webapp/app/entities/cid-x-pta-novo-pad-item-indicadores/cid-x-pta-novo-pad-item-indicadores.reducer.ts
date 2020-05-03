/* eslint complexity: ["error", 100] */
import axios from 'axios';
import { ICrudGetAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { IPayload } from 'react-jhipster/src/type/redux-action.type';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { ICidXPtaNovoPadItemIndicadores, defaultValue } from 'app/shared/model/cid-x-pta-novo-pad-item-indicadores.model';

export const ACTION_TYPES = {
  FETCH_CIDXPTANOVOPADITEMINDICADORES_LIST: 'cidXPtaNovoPadItemIndicadores/FETCH_CIDXPTANOVOPADITEMINDICADORES_LIST',
  FETCH_CIDXPTANOVOPADITEMINDICADORES: 'cidXPtaNovoPadItemIndicadores/FETCH_CIDXPTANOVOPADITEMINDICADORES',
  CREATE_CIDXPTANOVOPADITEMINDICADORES: 'cidXPtaNovoPadItemIndicadores/CREATE_CIDXPTANOVOPADITEMINDICADORES',
  UPDATE_CIDXPTANOVOPADITEMINDICADORES: 'cidXPtaNovoPadItemIndicadores/UPDATE_CIDXPTANOVOPADITEMINDICADORES',
  DELETE_CIDXPTANOVOPADITEMINDICADORES: 'cidXPtaNovoPadItemIndicadores/DELETE_CIDXPTANOVOPADITEMINDICADORES',
  RESET: 'cidXPtaNovoPadItemIndicadores/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<ICidXPtaNovoPadItemIndicadores>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type CidXPtaNovoPadItemIndicadoresState = Readonly<typeof initialState>;

// Reducer

export default (state: CidXPtaNovoPadItemIndicadoresState = initialState, action): CidXPtaNovoPadItemIndicadoresState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_CIDXPTANOVOPADITEMINDICADORES_LIST):
    case REQUEST(ACTION_TYPES.FETCH_CIDXPTANOVOPADITEMINDICADORES):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_CIDXPTANOVOPADITEMINDICADORES):
    case REQUEST(ACTION_TYPES.UPDATE_CIDXPTANOVOPADITEMINDICADORES):
    case REQUEST(ACTION_TYPES.DELETE_CIDXPTANOVOPADITEMINDICADORES):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_CIDXPTANOVOPADITEMINDICADORES_LIST):
    case FAILURE(ACTION_TYPES.FETCH_CIDXPTANOVOPADITEMINDICADORES):
    case FAILURE(ACTION_TYPES.CREATE_CIDXPTANOVOPADITEMINDICADORES):
    case FAILURE(ACTION_TYPES.UPDATE_CIDXPTANOVOPADITEMINDICADORES):
    case FAILURE(ACTION_TYPES.DELETE_CIDXPTANOVOPADITEMINDICADORES):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_CIDXPTANOVOPADITEMINDICADORES_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10)
      };
    case SUCCESS(ACTION_TYPES.FETCH_CIDXPTANOVOPADITEMINDICADORES):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_CIDXPTANOVOPADITEMINDICADORES):
    case SUCCESS(ACTION_TYPES.UPDATE_CIDXPTANOVOPADITEMINDICADORES):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_CIDXPTANOVOPADITEMINDICADORES):
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

const apiUrl = 'api/cid-x-pta-novo-pad-item-indicadores';

// Actions

// Actions
export type ICrudGetAllActionCidXPtaNovoPadItemIndicadores<T> = (
  meta?: any,
  maximo?: any,
  minimo?: any,
  unidadeMedidaExtra?: any,
  unidadeMedidaId?: any,
  score?: any,
  alertasIndicadores?: any,
  padItemIndicadoresId?: any,
  categoriasId?: any,
  cidXPtaNovoId?: any,
  page?: number,
  size?: number,
  sort?: string
) => IPayload<T> | ((dispatch: any) => IPayload<T>);

export const getEntities: ICrudGetAllActionCidXPtaNovoPadItemIndicadores<ICidXPtaNovoPadItemIndicadores> = (
  meta,
  maximo,
  minimo,
  unidadeMedidaExtra,
  unidadeMedidaId,
  score,
  alertasIndicadores,
  padItemIndicadoresId,
  categoriasId,
  cidXPtaNovoId,
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
  const alertasIndicadoresRequest = alertasIndicadores ? `alertasIndicadores.equals=${alertasIndicadores}&` : '';
  const padItemIndicadoresIdRequest = padItemIndicadoresId ? `padItemIndicadoresId.equals=${padItemIndicadoresId}&` : '';
  const categoriasIdRequest = categoriasId ? `categoriasId.equals=${categoriasId}&` : '';
  const cidXPtaNovoIdRequest = cidXPtaNovoId ? `cidXPtaNovoId.equals=${cidXPtaNovoId}&` : '';

  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}&` : '?'}`;
  return {
    type: ACTION_TYPES.FETCH_CIDXPTANOVOPADITEMINDICADORES_LIST,
    payload: axios.get<ICidXPtaNovoPadItemIndicadores>(
      `${requestUrl}${metaRequest}${maximoRequest}${minimoRequest}${unidadeMedidaExtraRequest}${unidadeMedidaIdRequest}${scoreRequest}${alertasIndicadoresRequest}${padItemIndicadoresIdRequest}${categoriasIdRequest}${cidXPtaNovoIdRequest}cacheBuster=${new Date().getTime()}`
    )
  };
};
export const getEntity: ICrudGetAction<ICidXPtaNovoPadItemIndicadores> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_CIDXPTANOVOPADITEMINDICADORES,
    payload: axios.get<ICidXPtaNovoPadItemIndicadores>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<ICidXPtaNovoPadItemIndicadores> = entity => async dispatch => {
  entity = {
    ...entity,
    padItemIndicadoresId: entity.padItemIndicadoresId === 'null' ? null : entity.padItemIndicadoresId,
    categoriasId: entity.categoriasId === 'null' ? null : entity.categoriasId,
    cidXPtaNovoId: entity.cidXPtaNovoId === 'null' ? null : entity.cidXPtaNovoId
  };
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_CIDXPTANOVOPADITEMINDICADORES,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<ICidXPtaNovoPadItemIndicadores> = entity => async dispatch => {
  entity = {
    ...entity,
    padItemIndicadoresId: entity.padItemIndicadoresId === 'null' ? null : entity.padItemIndicadoresId,
    categoriasId: entity.categoriasId === 'null' ? null : entity.categoriasId,
    cidXPtaNovoId: entity.cidXPtaNovoId === 'null' ? null : entity.cidXPtaNovoId
  };
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_CIDXPTANOVOPADITEMINDICADORES,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<ICidXPtaNovoPadItemIndicadores> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_CIDXPTANOVOPADITEMINDICADORES,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
