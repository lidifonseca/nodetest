/* eslint complexity: ["error", 100] */
import axios from 'axios';
import { ICrudGetAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { IPayload } from 'react-jhipster/src/type/redux-action.type';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { ICategoriaAtividade, defaultValue } from 'app/shared/model/categoria-atividade.model';

export const ACTION_TYPES = {
  FETCH_CATEGORIAATIVIDADE_LIST_EXPORT: 'categoriaAtividade/FETCH_CATEGORIAATIVIDADE_LIST_EXPORT',
  FETCH_CATEGORIAATIVIDADE_LIST: 'categoriaAtividade/FETCH_CATEGORIAATIVIDADE_LIST',
  FETCH_CATEGORIAATIVIDADE: 'categoriaAtividade/FETCH_CATEGORIAATIVIDADE',
  CREATE_CATEGORIAATIVIDADE: 'categoriaAtividade/CREATE_CATEGORIAATIVIDADE',
  UPDATE_CATEGORIAATIVIDADE: 'categoriaAtividade/UPDATE_CATEGORIAATIVIDADE',
  DELETE_CATEGORIAATIVIDADE: 'categoriaAtividade/DELETE_CATEGORIAATIVIDADE',
  RESET: 'categoriaAtividade/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<ICategoriaAtividade>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type CategoriaAtividadeState = Readonly<typeof initialState>;

export interface ICategoriaAtividadeBaseState {
  baseFilters: any;
  atividade: any;
  atendimentoAtividades: any;
  padItemAtividade: any;
  unidade: any;
  categoria: any;
}

export interface ICategoriaAtividadeUpdateState {
  fieldsBase: ICategoriaAtividadeBaseState;

  unidadeEasySelectValue: any;
  categoriaSelectValue: any;
  isNew: boolean;
  unidadeId: string;
  categoriaId: string;
}

// Reducer

export default (state: CategoriaAtividadeState = initialState, action): CategoriaAtividadeState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_CATEGORIAATIVIDADE_LIST_EXPORT):
    case REQUEST(ACTION_TYPES.FETCH_CATEGORIAATIVIDADE_LIST):
    case REQUEST(ACTION_TYPES.FETCH_CATEGORIAATIVIDADE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_CATEGORIAATIVIDADE):
    case REQUEST(ACTION_TYPES.UPDATE_CATEGORIAATIVIDADE):
    case REQUEST(ACTION_TYPES.DELETE_CATEGORIAATIVIDADE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_CATEGORIAATIVIDADE_LIST_EXPORT):
    case FAILURE(ACTION_TYPES.FETCH_CATEGORIAATIVIDADE_LIST):
    case FAILURE(ACTION_TYPES.FETCH_CATEGORIAATIVIDADE):
    case FAILURE(ACTION_TYPES.CREATE_CATEGORIAATIVIDADE):
    case FAILURE(ACTION_TYPES.UPDATE_CATEGORIAATIVIDADE):
    case FAILURE(ACTION_TYPES.DELETE_CATEGORIAATIVIDADE):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_CATEGORIAATIVIDADE_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10)
      };
    case SUCCESS(ACTION_TYPES.FETCH_CATEGORIAATIVIDADE):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_CATEGORIAATIVIDADE):
    case SUCCESS(ACTION_TYPES.UPDATE_CATEGORIAATIVIDADE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_CATEGORIAATIVIDADE):
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

const apiUrl = 'api/categoria-atividades';

// Actions

// Actions
export type ICrudGetAllActionCategoriaAtividade<T> = (
  atividade?: any,
  atendimentoAtividades?: any,
  padItemAtividade?: any,
  unidade?: any,
  categoria?: any,
  page?: number,
  size?: number,
  sort?: string
) => IPayload<T> | ((dispatch: any) => IPayload<T>);

export const getEntities: ICrudGetAllActionCategoriaAtividade<ICategoriaAtividade> = (
  atividade,
  atendimentoAtividades,
  padItemAtividade,
  unidade,
  categoria,
  page,
  size,
  sort
) => {
  const atividadeRequest = atividade ? `atividade.contains=${atividade}&` : '';
  const atendimentoAtividadesRequest = atendimentoAtividades ? `atendimentoAtividades.equals=${atendimentoAtividades}&` : '';
  const padItemAtividadeRequest = padItemAtividade ? `padItemAtividade.equals=${padItemAtividade}&` : '';
  const unidadeRequest = unidade ? `unidade.equals=${unidade}&` : '';
  const categoriaRequest = categoria ? `categoria.equals=${categoria}&` : '';

  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}&` : '?'}`;
  return {
    type: ACTION_TYPES.FETCH_CATEGORIAATIVIDADE_LIST,
    payload: axios.get<ICategoriaAtividade>(
      `${requestUrl}${atividadeRequest}${atendimentoAtividadesRequest}${padItemAtividadeRequest}${unidadeRequest}${categoriaRequest}cacheBuster=${new Date().getTime()}`
    )
  };
};
export const getEntity: ICrudGetAction<ICategoriaAtividade> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_CATEGORIAATIVIDADE,
    payload: axios.get<ICategoriaAtividade>(requestUrl)
  };
};

export const getEntitiesExport: ICrudGetAllActionCategoriaAtividade<ICategoriaAtividade> = (
  atividade,
  atendimentoAtividades,
  padItemAtividade,
  unidade,
  categoria,
  page,
  size,
  sort
) => {
  const atividadeRequest = atividade ? `atividade.contains=${atividade}&` : '';
  const atendimentoAtividadesRequest = atendimentoAtividades ? `atendimentoAtividades.equals=${atendimentoAtividades}&` : '';
  const padItemAtividadeRequest = padItemAtividade ? `padItemAtividade.equals=${padItemAtividade}&` : '';
  const unidadeRequest = unidade ? `unidade.equals=${unidade}&` : '';
  const categoriaRequest = categoria ? `categoria.equals=${categoria}&` : '';

  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}&` : '?'}`;
  return {
    type: ACTION_TYPES.FETCH_CATEGORIAATIVIDADE_LIST,
    payload: axios.get<ICategoriaAtividade>(
      `${requestUrl}${atividadeRequest}${atendimentoAtividadesRequest}${padItemAtividadeRequest}${unidadeRequest}${categoriaRequest}cacheBuster=${new Date().getTime()}`
    )
  };
};

export const createEntity: ICrudPutAction<ICategoriaAtividade> = entity => async dispatch => {
  entity = {
    ...entity,
    unidade: entity.unidade === 'null' ? null : entity.unidade,
    categoria: entity.categoria === 'null' ? null : entity.categoria
  };
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_CATEGORIAATIVIDADE,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<ICategoriaAtividade> = entity => async dispatch => {
  entity = {
    ...entity,
    unidade: entity.unidade === 'null' ? null : entity.unidade,
    categoria: entity.categoria === 'null' ? null : entity.categoria
  };
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_CATEGORIAATIVIDADE,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<ICategoriaAtividade> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_CATEGORIAATIVIDADE,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});

export const getCategoriaAtividadeState = (location): ICategoriaAtividadeBaseState => {
  const url = new URL(`http://localhost${location.search}`); // using a dummy url for parsing
  const baseFilters = url.searchParams.get('baseFilters') || '';
  const atividade = url.searchParams.get('atividade') || '';

  const atendimentoAtividades = url.searchParams.get('atendimentoAtividades') || '';
  const padItemAtividade = url.searchParams.get('padItemAtividade') || '';
  const unidade = url.searchParams.get('unidade') || '';
  const categoria = url.searchParams.get('categoria') || '';

  return {
    baseFilters,
    atividade,
    atendimentoAtividades,
    padItemAtividade,
    unidade,
    categoria
  };
};
