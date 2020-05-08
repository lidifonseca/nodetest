/* eslint complexity: ["error", 100] */
import axios from 'axios';
import { ICrudGetAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { IPayload } from 'react-jhipster/src/type/redux-action.type';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IAtendimentoAssinaturas, defaultValue } from 'app/shared/model/atendimento-assinaturas.model';

export const ACTION_TYPES = {
  FETCH_ATENDIMENTOASSINATURAS_LIST_EXPORT: 'atendimentoAssinaturas/FETCH_ATENDIMENTOASSINATURAS_LIST_EXPORT',
  FETCH_ATENDIMENTOASSINATURAS_LIST: 'atendimentoAssinaturas/FETCH_ATENDIMENTOASSINATURAS_LIST',
  FETCH_ATENDIMENTOASSINATURAS: 'atendimentoAssinaturas/FETCH_ATENDIMENTOASSINATURAS',
  CREATE_ATENDIMENTOASSINATURAS: 'atendimentoAssinaturas/CREATE_ATENDIMENTOASSINATURAS',
  UPDATE_ATENDIMENTOASSINATURAS: 'atendimentoAssinaturas/UPDATE_ATENDIMENTOASSINATURAS',
  DELETE_ATENDIMENTOASSINATURAS: 'atendimentoAssinaturas/DELETE_ATENDIMENTOASSINATURAS',
  RESET: 'atendimentoAssinaturas/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IAtendimentoAssinaturas>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type AtendimentoAssinaturasState = Readonly<typeof initialState>;

export interface IAtendimentoAssinaturasBaseState {
  baseFilters: any;
  arquivoAssinatura: any;
}

export interface IAtendimentoAssinaturasUpdateState {
  fieldsBase: IAtendimentoAssinaturasBaseState;

  isNew: boolean;
}

// Reducer

export default (state: AtendimentoAssinaturasState = initialState, action): AtendimentoAssinaturasState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_ATENDIMENTOASSINATURAS_LIST_EXPORT):
    case REQUEST(ACTION_TYPES.FETCH_ATENDIMENTOASSINATURAS_LIST):
    case REQUEST(ACTION_TYPES.FETCH_ATENDIMENTOASSINATURAS):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_ATENDIMENTOASSINATURAS):
    case REQUEST(ACTION_TYPES.UPDATE_ATENDIMENTOASSINATURAS):
    case REQUEST(ACTION_TYPES.DELETE_ATENDIMENTOASSINATURAS):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_ATENDIMENTOASSINATURAS_LIST_EXPORT):
    case FAILURE(ACTION_TYPES.FETCH_ATENDIMENTOASSINATURAS_LIST):
    case FAILURE(ACTION_TYPES.FETCH_ATENDIMENTOASSINATURAS):
    case FAILURE(ACTION_TYPES.CREATE_ATENDIMENTOASSINATURAS):
    case FAILURE(ACTION_TYPES.UPDATE_ATENDIMENTOASSINATURAS):
    case FAILURE(ACTION_TYPES.DELETE_ATENDIMENTOASSINATURAS):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_ATENDIMENTOASSINATURAS_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10)
      };
    case SUCCESS(ACTION_TYPES.FETCH_ATENDIMENTOASSINATURAS):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_ATENDIMENTOASSINATURAS):
    case SUCCESS(ACTION_TYPES.UPDATE_ATENDIMENTOASSINATURAS):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_ATENDIMENTOASSINATURAS):
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

const apiUrl = 'api/atendimento-assinaturas';

// Actions

// Actions
export type ICrudGetAllActionAtendimentoAssinaturas<T> = (
  arquivoAssinatura?: any,
  page?: number,
  size?: number,
  sort?: string
) => IPayload<T> | ((dispatch: any) => IPayload<T>);

export const getEntities: ICrudGetAllActionAtendimentoAssinaturas<IAtendimentoAssinaturas> = (arquivoAssinatura, page, size, sort) => {
  const arquivoAssinaturaRequest = arquivoAssinatura ? `arquivoAssinatura.contains=${arquivoAssinatura}&` : '';

  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}&` : '?'}`;
  return {
    type: ACTION_TYPES.FETCH_ATENDIMENTOASSINATURAS_LIST,
    payload: axios.get<IAtendimentoAssinaturas>(`${requestUrl}${arquivoAssinaturaRequest}cacheBuster=${new Date().getTime()}`)
  };
};
export const getEntity: ICrudGetAction<IAtendimentoAssinaturas> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_ATENDIMENTOASSINATURAS,
    payload: axios.get<IAtendimentoAssinaturas>(requestUrl)
  };
};

export const getEntitiesExport: ICrudGetAllActionAtendimentoAssinaturas<IAtendimentoAssinaturas> = (
  arquivoAssinatura,
  page,
  size,
  sort
) => {
  const arquivoAssinaturaRequest = arquivoAssinatura ? `arquivoAssinatura.contains=${arquivoAssinatura}&` : '';

  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}&` : '?'}`;
  return {
    type: ACTION_TYPES.FETCH_ATENDIMENTOASSINATURAS_LIST,
    payload: axios.get<IAtendimentoAssinaturas>(`${requestUrl}${arquivoAssinaturaRequest}cacheBuster=${new Date().getTime()}`)
  };
};

export const createEntity: ICrudPutAction<IAtendimentoAssinaturas> = entity => async dispatch => {
  entity = {
    ...entity
  };
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_ATENDIMENTOASSINATURAS,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IAtendimentoAssinaturas> = entity => async dispatch => {
  entity = { ...entity };
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_ATENDIMENTOASSINATURAS,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IAtendimentoAssinaturas> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_ATENDIMENTOASSINATURAS,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});

export const getAtendimentoAssinaturasState = (location): IAtendimentoAssinaturasBaseState => {
  const url = new URL(`http://localhost${location.search}`); // using a dummy url for parsing
  const baseFilters = url.searchParams.get('baseFilters') || '';
  const arquivoAssinatura = url.searchParams.get('arquivoAssinatura') || '';

  return {
    baseFilters,
    arquivoAssinatura
  };
};
