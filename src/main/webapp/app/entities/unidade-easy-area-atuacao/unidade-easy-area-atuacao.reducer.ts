/* eslint complexity: ["error", 100] */
import axios from 'axios';
import { ICrudGetAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { IPayload } from 'react-jhipster/src/type/redux-action.type';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IUnidadeEasyAreaAtuacao, defaultValue } from 'app/shared/model/unidade-easy-area-atuacao.model';

export const ACTION_TYPES = {
  FETCH_UNIDADEEASYAREAATUACAO_LIST_EXPORT: 'unidadeEasyAreaAtuacao/FETCH_UNIDADEEASYAREAATUACAO_LIST_EXPORT',
  FETCH_UNIDADEEASYAREAATUACAO_LIST: 'unidadeEasyAreaAtuacao/FETCH_UNIDADEEASYAREAATUACAO_LIST',
  FETCH_UNIDADEEASYAREAATUACAO: 'unidadeEasyAreaAtuacao/FETCH_UNIDADEEASYAREAATUACAO',
  CREATE_UNIDADEEASYAREAATUACAO: 'unidadeEasyAreaAtuacao/CREATE_UNIDADEEASYAREAATUACAO',
  UPDATE_UNIDADEEASYAREAATUACAO: 'unidadeEasyAreaAtuacao/UPDATE_UNIDADEEASYAREAATUACAO',
  DELETE_UNIDADEEASYAREAATUACAO: 'unidadeEasyAreaAtuacao/DELETE_UNIDADEEASYAREAATUACAO',
  RESET: 'unidadeEasyAreaAtuacao/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IUnidadeEasyAreaAtuacao>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type UnidadeEasyAreaAtuacaoState = Readonly<typeof initialState>;

export interface IUnidadeEasyAreaAtuacaoBaseState {
  baseFilters: any;
  cepInicial: any;
  cepFinal: any;
  unidade: any;
}

export interface IUnidadeEasyAreaAtuacaoUpdateState {
  fieldsBase: IUnidadeEasyAreaAtuacaoBaseState;

  unidadeEasySelectValue: any;
  isNew: boolean;
  unidadeId: string;
}

// Reducer

export default (state: UnidadeEasyAreaAtuacaoState = initialState, action): UnidadeEasyAreaAtuacaoState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_UNIDADEEASYAREAATUACAO_LIST_EXPORT):
    case REQUEST(ACTION_TYPES.FETCH_UNIDADEEASYAREAATUACAO_LIST):
    case REQUEST(ACTION_TYPES.FETCH_UNIDADEEASYAREAATUACAO):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_UNIDADEEASYAREAATUACAO):
    case REQUEST(ACTION_TYPES.UPDATE_UNIDADEEASYAREAATUACAO):
    case REQUEST(ACTION_TYPES.DELETE_UNIDADEEASYAREAATUACAO):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_UNIDADEEASYAREAATUACAO_LIST_EXPORT):
    case FAILURE(ACTION_TYPES.FETCH_UNIDADEEASYAREAATUACAO_LIST):
    case FAILURE(ACTION_TYPES.FETCH_UNIDADEEASYAREAATUACAO):
    case FAILURE(ACTION_TYPES.CREATE_UNIDADEEASYAREAATUACAO):
    case FAILURE(ACTION_TYPES.UPDATE_UNIDADEEASYAREAATUACAO):
    case FAILURE(ACTION_TYPES.DELETE_UNIDADEEASYAREAATUACAO):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_UNIDADEEASYAREAATUACAO_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10)
      };
    case SUCCESS(ACTION_TYPES.FETCH_UNIDADEEASYAREAATUACAO):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_UNIDADEEASYAREAATUACAO):
    case SUCCESS(ACTION_TYPES.UPDATE_UNIDADEEASYAREAATUACAO):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_UNIDADEEASYAREAATUACAO):
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

const apiUrl = 'api/unidade-easy-area-atuacaos';

// Actions

// Actions
export type ICrudGetAllActionUnidadeEasyAreaAtuacao<T> = (
  cepInicial?: any,
  cepFinal?: any,
  unidade?: any,
  page?: number,
  size?: number,
  sort?: string
) => IPayload<T> | ((dispatch: any) => IPayload<T>);

export const getEntities: ICrudGetAllActionUnidadeEasyAreaAtuacao<IUnidadeEasyAreaAtuacao> = (
  cepInicial,
  cepFinal,
  unidade,
  page,
  size,
  sort
) => {
  const cepInicialRequest = cepInicial ? `cepInicial.contains=${cepInicial}&` : '';
  const cepFinalRequest = cepFinal ? `cepFinal.contains=${cepFinal}&` : '';
  const unidadeRequest = unidade ? `unidade.equals=${unidade}&` : '';

  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}&` : '?'}`;
  return {
    type: ACTION_TYPES.FETCH_UNIDADEEASYAREAATUACAO_LIST,
    payload: axios.get<IUnidadeEasyAreaAtuacao>(
      `${requestUrl}${cepInicialRequest}${cepFinalRequest}${unidadeRequest}cacheBuster=${new Date().getTime()}`
    )
  };
};
export const getEntity: ICrudGetAction<IUnidadeEasyAreaAtuacao> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_UNIDADEEASYAREAATUACAO,
    payload: axios.get<IUnidadeEasyAreaAtuacao>(requestUrl)
  };
};

export const getEntitiesExport: ICrudGetAllActionUnidadeEasyAreaAtuacao<IUnidadeEasyAreaAtuacao> = (
  cepInicial,
  cepFinal,
  unidade,
  page,
  size,
  sort
) => {
  const cepInicialRequest = cepInicial ? `cepInicial.contains=${cepInicial}&` : '';
  const cepFinalRequest = cepFinal ? `cepFinal.contains=${cepFinal}&` : '';
  const unidadeRequest = unidade ? `unidade.equals=${unidade}&` : '';

  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}&` : '?'}`;
  return {
    type: ACTION_TYPES.FETCH_UNIDADEEASYAREAATUACAO_LIST,
    payload: axios.get<IUnidadeEasyAreaAtuacao>(
      `${requestUrl}${cepInicialRequest}${cepFinalRequest}${unidadeRequest}cacheBuster=${new Date().getTime()}`
    )
  };
};

export const createEntity: ICrudPutAction<IUnidadeEasyAreaAtuacao> = entity => async dispatch => {
  entity = {
    ...entity,
    unidade: entity.unidade === 'null' ? null : entity.unidade
  };
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_UNIDADEEASYAREAATUACAO,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IUnidadeEasyAreaAtuacao> = entity => async dispatch => {
  entity = { ...entity, unidade: entity.unidade === 'null' ? null : entity.unidade };
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_UNIDADEEASYAREAATUACAO,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IUnidadeEasyAreaAtuacao> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_UNIDADEEASYAREAATUACAO,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});

export const getUnidadeEasyAreaAtuacaoState = (location): IUnidadeEasyAreaAtuacaoBaseState => {
  const url = new URL(`http://localhost${location.search}`); // using a dummy url for parsing
  const baseFilters = url.searchParams.get('baseFilters') || '';
  const cepInicial = url.searchParams.get('cepInicial') || '';
  const cepFinal = url.searchParams.get('cepFinal') || '';

  const unidade = url.searchParams.get('unidade') || '';

  return {
    baseFilters,
    cepInicial,
    cepFinal,
    unidade
  };
};
