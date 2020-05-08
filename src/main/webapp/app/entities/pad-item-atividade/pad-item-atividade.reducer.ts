/* eslint complexity: ["error", 100] */
import axios from 'axios';
import { ICrudGetAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { IPayload } from 'react-jhipster/src/type/redux-action.type';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IPadItemAtividade, defaultValue } from 'app/shared/model/pad-item-atividade.model';

export const ACTION_TYPES = {
  FETCH_PADITEMATIVIDADE_LIST_EXPORT: 'padItemAtividade/FETCH_PADITEMATIVIDADE_LIST_EXPORT',
  FETCH_PADITEMATIVIDADE_LIST: 'padItemAtividade/FETCH_PADITEMATIVIDADE_LIST',
  FETCH_PADITEMATIVIDADE: 'padItemAtividade/FETCH_PADITEMATIVIDADE',
  CREATE_PADITEMATIVIDADE: 'padItemAtividade/CREATE_PADITEMATIVIDADE',
  UPDATE_PADITEMATIVIDADE: 'padItemAtividade/UPDATE_PADITEMATIVIDADE',
  DELETE_PADITEMATIVIDADE: 'padItemAtividade/DELETE_PADITEMATIVIDADE',
  RESET: 'padItemAtividade/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IPadItemAtividade>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type PadItemAtividadeState = Readonly<typeof initialState>;

export interface IPadItemAtividadeBaseState {
  baseFilters: any;
  dataInicio: any;
  dataFim: any;
  atividade: any;
  padItem: any;
}

export interface IPadItemAtividadeUpdateState {
  fieldsBase: IPadItemAtividadeBaseState;

  categoriaAtividadeSelectValue: any;
  padItemSelectValue: any;
  isNew: boolean;
  atividadeId: string;
  padItemId: string;
}

// Reducer

export default (state: PadItemAtividadeState = initialState, action): PadItemAtividadeState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_PADITEMATIVIDADE_LIST_EXPORT):
    case REQUEST(ACTION_TYPES.FETCH_PADITEMATIVIDADE_LIST):
    case REQUEST(ACTION_TYPES.FETCH_PADITEMATIVIDADE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_PADITEMATIVIDADE):
    case REQUEST(ACTION_TYPES.UPDATE_PADITEMATIVIDADE):
    case REQUEST(ACTION_TYPES.DELETE_PADITEMATIVIDADE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_PADITEMATIVIDADE_LIST_EXPORT):
    case FAILURE(ACTION_TYPES.FETCH_PADITEMATIVIDADE_LIST):
    case FAILURE(ACTION_TYPES.FETCH_PADITEMATIVIDADE):
    case FAILURE(ACTION_TYPES.CREATE_PADITEMATIVIDADE):
    case FAILURE(ACTION_TYPES.UPDATE_PADITEMATIVIDADE):
    case FAILURE(ACTION_TYPES.DELETE_PADITEMATIVIDADE):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_PADITEMATIVIDADE_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10)
      };
    case SUCCESS(ACTION_TYPES.FETCH_PADITEMATIVIDADE):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_PADITEMATIVIDADE):
    case SUCCESS(ACTION_TYPES.UPDATE_PADITEMATIVIDADE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_PADITEMATIVIDADE):
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

const apiUrl = 'api/pad-item-atividades';

// Actions

// Actions
export type ICrudGetAllActionPadItemAtividade<T> = (
  dataInicio?: any,
  dataFim?: any,
  atividade?: any,
  padItem?: any,
  page?: number,
  size?: number,
  sort?: string
) => IPayload<T> | ((dispatch: any) => IPayload<T>);

export const getEntities: ICrudGetAllActionPadItemAtividade<IPadItemAtividade> = (
  dataInicio,
  dataFim,
  atividade,
  padItem,
  page,
  size,
  sort
) => {
  const dataInicioRequest = dataInicio ? `dataInicio.equals=${dataInicio}&` : '';
  const dataFimRequest = dataFim ? `dataFim.equals=${dataFim}&` : '';
  const atividadeRequest = atividade ? `atividade.equals=${atividade}&` : '';
  const padItemRequest = padItem ? `padItem.equals=${padItem}&` : '';

  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}&` : '?'}`;
  return {
    type: ACTION_TYPES.FETCH_PADITEMATIVIDADE_LIST,
    payload: axios.get<IPadItemAtividade>(
      `${requestUrl}${dataInicioRequest}${dataFimRequest}${atividadeRequest}${padItemRequest}cacheBuster=${new Date().getTime()}`
    )
  };
};
export const getEntity: ICrudGetAction<IPadItemAtividade> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_PADITEMATIVIDADE,
    payload: axios.get<IPadItemAtividade>(requestUrl)
  };
};

export const getEntitiesExport: ICrudGetAllActionPadItemAtividade<IPadItemAtividade> = (
  dataInicio,
  dataFim,
  atividade,
  padItem,
  page,
  size,
  sort
) => {
  const dataInicioRequest = dataInicio ? `dataInicio.equals=${dataInicio}&` : '';
  const dataFimRequest = dataFim ? `dataFim.equals=${dataFim}&` : '';
  const atividadeRequest = atividade ? `atividade.equals=${atividade}&` : '';
  const padItemRequest = padItem ? `padItem.equals=${padItem}&` : '';

  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}&` : '?'}`;
  return {
    type: ACTION_TYPES.FETCH_PADITEMATIVIDADE_LIST,
    payload: axios.get<IPadItemAtividade>(
      `${requestUrl}${dataInicioRequest}${dataFimRequest}${atividadeRequest}${padItemRequest}cacheBuster=${new Date().getTime()}`
    )
  };
};

export const createEntity: ICrudPutAction<IPadItemAtividade> = entity => async dispatch => {
  entity = {
    ...entity,
    atividade: entity.atividade === 'null' ? null : entity.atividade,
    padItem: entity.padItem === 'null' ? null : entity.padItem
  };
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_PADITEMATIVIDADE,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IPadItemAtividade> = entity => async dispatch => {
  entity = {
    ...entity,
    atividade: entity.atividade === 'null' ? null : entity.atividade,
    padItem: entity.padItem === 'null' ? null : entity.padItem
  };
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_PADITEMATIVIDADE,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IPadItemAtividade> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_PADITEMATIVIDADE,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});

export const getPadItemAtividadeState = (location): IPadItemAtividadeBaseState => {
  const url = new URL(`http://localhost${location.search}`); // using a dummy url for parsing
  const baseFilters = url.searchParams.get('baseFilters') || '';
  const dataInicio = url.searchParams.get('dataInicio') || '';
  const dataFim = url.searchParams.get('dataFim') || '';

  const atividade = url.searchParams.get('atividade') || '';
  const padItem = url.searchParams.get('padItem') || '';

  return {
    baseFilters,
    dataInicio,
    dataFim,
    atividade,
    padItem
  };
};
