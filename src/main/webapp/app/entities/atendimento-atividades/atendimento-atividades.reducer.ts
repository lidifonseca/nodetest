/* eslint complexity: ["error", 100] */
import axios from 'axios';
import { ICrudGetAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { IPayload } from 'react-jhipster/src/type/redux-action.type';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IAtendimentoAtividades, defaultValue } from 'app/shared/model/atendimento-atividades.model';

export const ACTION_TYPES = {
  FETCH_ATENDIMENTOATIVIDADES_LIST_EXPORT: 'atendimentoAtividades/FETCH_ATENDIMENTOATIVIDADES_LIST_EXPORT',
  FETCH_ATENDIMENTOATIVIDADES_LIST: 'atendimentoAtividades/FETCH_ATENDIMENTOATIVIDADES_LIST',
  FETCH_ATENDIMENTOATIVIDADES: 'atendimentoAtividades/FETCH_ATENDIMENTOATIVIDADES',
  CREATE_ATENDIMENTOATIVIDADES: 'atendimentoAtividades/CREATE_ATENDIMENTOATIVIDADES',
  UPDATE_ATENDIMENTOATIVIDADES: 'atendimentoAtividades/UPDATE_ATENDIMENTOATIVIDADES',
  DELETE_ATENDIMENTOATIVIDADES: 'atendimentoAtividades/DELETE_ATENDIMENTOATIVIDADES',
  RESET: 'atendimentoAtividades/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IAtendimentoAtividades>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type AtendimentoAtividadesState = Readonly<typeof initialState>;

export interface IAtendimentoAtividadesBaseState {
  baseFilters: any;
  feito: any;
  atendimento: any;
  atividade: any;
}

export interface IAtendimentoAtividadesUpdateState {
  fieldsBase: IAtendimentoAtividadesBaseState;

  atendimentoSelectValue: any;
  categoriaAtividadeSelectValue: any;
  isNew: boolean;
  atendimentoId: string;
  atividadeId: string;
}

// Reducer

export default (state: AtendimentoAtividadesState = initialState, action): AtendimentoAtividadesState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_ATENDIMENTOATIVIDADES_LIST_EXPORT):
    case REQUEST(ACTION_TYPES.FETCH_ATENDIMENTOATIVIDADES_LIST):
    case REQUEST(ACTION_TYPES.FETCH_ATENDIMENTOATIVIDADES):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_ATENDIMENTOATIVIDADES):
    case REQUEST(ACTION_TYPES.UPDATE_ATENDIMENTOATIVIDADES):
    case REQUEST(ACTION_TYPES.DELETE_ATENDIMENTOATIVIDADES):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_ATENDIMENTOATIVIDADES_LIST_EXPORT):
    case FAILURE(ACTION_TYPES.FETCH_ATENDIMENTOATIVIDADES_LIST):
    case FAILURE(ACTION_TYPES.FETCH_ATENDIMENTOATIVIDADES):
    case FAILURE(ACTION_TYPES.CREATE_ATENDIMENTOATIVIDADES):
    case FAILURE(ACTION_TYPES.UPDATE_ATENDIMENTOATIVIDADES):
    case FAILURE(ACTION_TYPES.DELETE_ATENDIMENTOATIVIDADES):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_ATENDIMENTOATIVIDADES_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10)
      };
    case SUCCESS(ACTION_TYPES.FETCH_ATENDIMENTOATIVIDADES):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_ATENDIMENTOATIVIDADES):
    case SUCCESS(ACTION_TYPES.UPDATE_ATENDIMENTOATIVIDADES):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_ATENDIMENTOATIVIDADES):
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

const apiUrl = 'api/atendimento-atividades';

// Actions

// Actions
export type ICrudGetAllActionAtendimentoAtividades<T> = (
  feito?: any,
  atendimento?: any,
  atividade?: any,
  page?: number,
  size?: number,
  sort?: string
) => IPayload<T> | ((dispatch: any) => IPayload<T>);

export const getEntities: ICrudGetAllActionAtendimentoAtividades<IAtendimentoAtividades> = (
  feito,
  atendimento,
  atividade,
  page,
  size,
  sort
) => {
  const feitoRequest = feito ? `feito.contains=${feito}&` : '';
  const atendimentoRequest = atendimento ? `atendimento.equals=${atendimento}&` : '';
  const atividadeRequest = atividade ? `atividade.equals=${atividade}&` : '';

  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}&` : '?'}`;
  return {
    type: ACTION_TYPES.FETCH_ATENDIMENTOATIVIDADES_LIST,
    payload: axios.get<IAtendimentoAtividades>(
      `${requestUrl}${feitoRequest}${atendimentoRequest}${atividadeRequest}cacheBuster=${new Date().getTime()}`
    )
  };
};
export const getEntity: ICrudGetAction<IAtendimentoAtividades> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_ATENDIMENTOATIVIDADES,
    payload: axios.get<IAtendimentoAtividades>(requestUrl)
  };
};

export const getEntitiesExport: ICrudGetAllActionAtendimentoAtividades<IAtendimentoAtividades> = (
  feito,
  atendimento,
  atividade,
  page,
  size,
  sort
) => {
  const feitoRequest = feito ? `feito.contains=${feito}&` : '';
  const atendimentoRequest = atendimento ? `atendimento.equals=${atendimento}&` : '';
  const atividadeRequest = atividade ? `atividade.equals=${atividade}&` : '';

  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}&` : '?'}`;
  return {
    type: ACTION_TYPES.FETCH_ATENDIMENTOATIVIDADES_LIST,
    payload: axios.get<IAtendimentoAtividades>(
      `${requestUrl}${feitoRequest}${atendimentoRequest}${atividadeRequest}cacheBuster=${new Date().getTime()}`
    )
  };
};

export const createEntity: ICrudPutAction<IAtendimentoAtividades> = entity => async dispatch => {
  entity = {
    ...entity,
    atendimento: entity.atendimento === 'null' ? null : entity.atendimento,
    atividade: entity.atividade === 'null' ? null : entity.atividade
  };
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_ATENDIMENTOATIVIDADES,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IAtendimentoAtividades> = entity => async dispatch => {
  entity = {
    ...entity,
    atendimento: entity.atendimento === 'null' ? null : entity.atendimento,
    atividade: entity.atividade === 'null' ? null : entity.atividade
  };
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_ATENDIMENTOATIVIDADES,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IAtendimentoAtividades> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_ATENDIMENTOATIVIDADES,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});

export const getAtendimentoAtividadesState = (location): IAtendimentoAtividadesBaseState => {
  const url = new URL(`http://localhost${location.search}`); // using a dummy url for parsing
  const baseFilters = url.searchParams.get('baseFilters') || '';
  const feito = url.searchParams.get('feito') || '';

  const atendimento = url.searchParams.get('atendimento') || '';
  const atividade = url.searchParams.get('atividade') || '';

  return {
    baseFilters,
    feito,
    atendimento,
    atividade
  };
};
