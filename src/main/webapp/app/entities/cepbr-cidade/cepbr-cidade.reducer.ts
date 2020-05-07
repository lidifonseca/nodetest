/* eslint complexity: ["error", 100] */
import axios from 'axios';
import { ICrudGetAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { IPayload } from 'react-jhipster/src/type/redux-action.type';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { ICepbrCidade, defaultValue } from 'app/shared/model/cepbr-cidade.model';

export const ACTION_TYPES = {
  FETCH_CEPBRCIDADE_LIST_EXPORT: 'cepbrCidade/FETCH_CEPBRCIDADE_LIST_EXPORT',
  FETCH_CEPBRCIDADE_LIST: 'cepbrCidade/FETCH_CEPBRCIDADE_LIST',
  FETCH_CEPBRCIDADE: 'cepbrCidade/FETCH_CEPBRCIDADE',
  CREATE_CEPBRCIDADE: 'cepbrCidade/CREATE_CEPBRCIDADE',
  UPDATE_CEPBRCIDADE: 'cepbrCidade/UPDATE_CEPBRCIDADE',
  DELETE_CEPBRCIDADE: 'cepbrCidade/DELETE_CEPBRCIDADE',
  RESET: 'cepbrCidade/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<ICepbrCidade>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type CepbrCidadeState = Readonly<typeof initialState>;

export interface ICepbrCidadeBaseState {
  baseFilters: any;
  idCidade: any;
  cidade: any;
  codIbge: any;
  area: any;
}

export interface ICepbrCidadeUpdateState {
  fieldsBase: ICepbrCidadeBaseState;
  isNew: boolean;
}

// Reducer

export default (state: CepbrCidadeState = initialState, action): CepbrCidadeState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_CEPBRCIDADE_LIST_EXPORT):
    case REQUEST(ACTION_TYPES.FETCH_CEPBRCIDADE_LIST):
    case REQUEST(ACTION_TYPES.FETCH_CEPBRCIDADE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_CEPBRCIDADE):
    case REQUEST(ACTION_TYPES.UPDATE_CEPBRCIDADE):
    case REQUEST(ACTION_TYPES.DELETE_CEPBRCIDADE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_CEPBRCIDADE_LIST_EXPORT):
    case FAILURE(ACTION_TYPES.FETCH_CEPBRCIDADE_LIST):
    case FAILURE(ACTION_TYPES.FETCH_CEPBRCIDADE):
    case FAILURE(ACTION_TYPES.CREATE_CEPBRCIDADE):
    case FAILURE(ACTION_TYPES.UPDATE_CEPBRCIDADE):
    case FAILURE(ACTION_TYPES.DELETE_CEPBRCIDADE):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_CEPBRCIDADE_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10)
      };
    case SUCCESS(ACTION_TYPES.FETCH_CEPBRCIDADE):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_CEPBRCIDADE):
    case SUCCESS(ACTION_TYPES.UPDATE_CEPBRCIDADE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_CEPBRCIDADE):
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

const apiUrl = 'api/cepbr-cidades';

// Actions

// Actions
export type ICrudGetAllActionCepbrCidade<T> = (
  idCidade?: any,
  cidade?: any,
  codIbge?: any,
  area?: any,
  page?: number,
  size?: number,
  sort?: string
) => IPayload<T> | ((dispatch: any) => IPayload<T>);

export const getEntities: ICrudGetAllActionCepbrCidade<ICepbrCidade> = (idCidade, cidade, codIbge, area, page, size, sort) => {
  const idCidadeRequest = idCidade ? `idCidade.contains=${idCidade}&` : '';
  const cidadeRequest = cidade ? `cidade.contains=${cidade}&` : '';
  const codIbgeRequest = codIbge ? `codIbge.contains=${codIbge}&` : '';
  const areaRequest = area ? `area.contains=${area}&` : '';

  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}&` : '?'}`;
  return {
    type: ACTION_TYPES.FETCH_CEPBRCIDADE_LIST,
    payload: axios.get<ICepbrCidade>(
      `${requestUrl}${idCidadeRequest}${cidadeRequest}${codIbgeRequest}${areaRequest}cacheBuster=${new Date().getTime()}`
    )
  };
};
export const getEntity: ICrudGetAction<ICepbrCidade> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_CEPBRCIDADE,
    payload: axios.get<ICepbrCidade>(requestUrl)
  };
};

export const getEntitiesExport: ICrudGetAllActionCepbrCidade<ICepbrCidade> = (idCidade, cidade, codIbge, area, page, size, sort) => {
  const idCidadeRequest = idCidade ? `idCidade.contains=${idCidade}&` : '';
  const cidadeRequest = cidade ? `cidade.contains=${cidade}&` : '';
  const codIbgeRequest = codIbge ? `codIbge.contains=${codIbge}&` : '';
  const areaRequest = area ? `area.contains=${area}&` : '';

  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}&` : '?'}`;
  return {
    type: ACTION_TYPES.FETCH_CEPBRCIDADE_LIST,
    payload: axios.get<ICepbrCidade>(
      `${requestUrl}${idCidadeRequest}${cidadeRequest}${codIbgeRequest}${areaRequest}cacheBuster=${new Date().getTime()}`
    )
  };
};

export const createEntity: ICrudPutAction<ICepbrCidade> = entity => async dispatch => {
  entity = {
    ...entity
  };
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_CEPBRCIDADE,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<ICepbrCidade> = entity => async dispatch => {
  entity = { ...entity };
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_CEPBRCIDADE,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<ICepbrCidade> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_CEPBRCIDADE,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});

export const getCepbrCidadeState = (location): ICepbrCidadeBaseState => {
  const url = new URL(`http://localhost${location.search}`); // using a dummy url for parsing
  const baseFilters = url.searchParams.get('baseFilters') || '';
  const idCidade = url.searchParams.get('idCidade') || '';
  const cidade = url.searchParams.get('cidade') || '';
  const codIbge = url.searchParams.get('codIbge') || '';
  const area = url.searchParams.get('area') || '';

  return {
    baseFilters,
    idCidade,
    cidade,
    codIbge,
    area
  };
};
