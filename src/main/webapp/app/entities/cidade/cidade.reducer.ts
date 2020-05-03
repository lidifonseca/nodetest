/* eslint complexity: ["error", 100] */
import axios from 'axios';
import { ICrudGetAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { IPayload } from 'react-jhipster/src/type/redux-action.type';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { ICidade, defaultValue } from 'app/shared/model/cidade.model';

export const ACTION_TYPES = {
  FETCH_CIDADE_LIST: 'cidade/FETCH_CIDADE_LIST',
  FETCH_CIDADE: 'cidade/FETCH_CIDADE',
  CREATE_CIDADE: 'cidade/CREATE_CIDADE',
  UPDATE_CIDADE: 'cidade/UPDATE_CIDADE',
  DELETE_CIDADE: 'cidade/DELETE_CIDADE',
  RESET: 'cidade/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<ICidade>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type CidadeState = Readonly<typeof initialState>;

// Reducer

export default (state: CidadeState = initialState, action): CidadeState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_CIDADE_LIST):
    case REQUEST(ACTION_TYPES.FETCH_CIDADE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_CIDADE):
    case REQUEST(ACTION_TYPES.UPDATE_CIDADE):
    case REQUEST(ACTION_TYPES.DELETE_CIDADE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_CIDADE_LIST):
    case FAILURE(ACTION_TYPES.FETCH_CIDADE):
    case FAILURE(ACTION_TYPES.CREATE_CIDADE):
    case FAILURE(ACTION_TYPES.UPDATE_CIDADE):
    case FAILURE(ACTION_TYPES.DELETE_CIDADE):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_CIDADE_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10)
      };
    case SUCCESS(ACTION_TYPES.FETCH_CIDADE):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_CIDADE):
    case SUCCESS(ACTION_TYPES.UPDATE_CIDADE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_CIDADE):
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

const apiUrl = 'api/cidades';

// Actions

// Actions
export type ICrudGetAllActionCidade<T> = (
  descrCidade?: any,
  atendimento?: any,
  empresa?: any,
  idUf?: any,
  page?: number,
  size?: number,
  sort?: string
) => IPayload<T> | ((dispatch: any) => IPayload<T>);

export const getEntities: ICrudGetAllActionCidade<ICidade> = (descrCidade, atendimento, empresa, idUf, page, size, sort) => {
  const descrCidadeRequest = descrCidade ? `descrCidade.contains=${descrCidade}&` : '';
  const atendimentoRequest = atendimento ? `atendimento.equals=${atendimento}&` : '';
  const empresaRequest = empresa ? `empresa.equals=${empresa}&` : '';
  const idUfRequest = idUf ? `idUf.equals=${idUf}&` : '';

  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}&` : '?'}`;
  return {
    type: ACTION_TYPES.FETCH_CIDADE_LIST,
    payload: axios.get<ICidade>(
      `${requestUrl}${descrCidadeRequest}${atendimentoRequest}${empresaRequest}${idUfRequest}cacheBuster=${new Date().getTime()}`
    )
  };
};
export const getEntity: ICrudGetAction<ICidade> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_CIDADE,
    payload: axios.get<ICidade>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<ICidade> = entity => async dispatch => {
  entity = {
    ...entity,
    idUf: entity.idUf === 'null' ? null : entity.idUf
  };
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_CIDADE,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<ICidade> = entity => async dispatch => {
  entity = { ...entity, idUf: entity.idUf === 'null' ? null : entity.idUf };
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_CIDADE,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<ICidade> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_CIDADE,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
