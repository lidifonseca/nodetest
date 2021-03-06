/* eslint complexity: ["error", 100] */
import axios from 'axios';
import { ICrudGetAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { IPayload } from 'react-jhipster/src/type/redux-action.type';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IPadItemSorteioFeito, defaultValue } from 'app/shared/model/pad-item-sorteio-feito.model';

export const ACTION_TYPES = {
  FETCH_PADITEMSORTEIOFEITO_LIST_EXPORT: 'padItemSorteioFeito/FETCH_PADITEMSORTEIOFEITO_LIST_EXPORT',
  FETCH_PADITEMSORTEIOFEITO_LIST: 'padItemSorteioFeito/FETCH_PADITEMSORTEIOFEITO_LIST',
  FETCH_PADITEMSORTEIOFEITO: 'padItemSorteioFeito/FETCH_PADITEMSORTEIOFEITO',
  CREATE_PADITEMSORTEIOFEITO: 'padItemSorteioFeito/CREATE_PADITEMSORTEIOFEITO',
  UPDATE_PADITEMSORTEIOFEITO: 'padItemSorteioFeito/UPDATE_PADITEMSORTEIOFEITO',
  DELETE_PADITEMSORTEIOFEITO: 'padItemSorteioFeito/DELETE_PADITEMSORTEIOFEITO',
  RESET: 'padItemSorteioFeito/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IPadItemSorteioFeito>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type PadItemSorteioFeitoState = Readonly<typeof initialState>;

export interface IPadItemSorteioFeitoBaseState {
  baseFilters: any;
  sorteioFeito: any;
  padItem: any;
}

export interface IPadItemSorteioFeitoUpdateState {
  fieldsBase: IPadItemSorteioFeitoBaseState;

  padItemSelectValue: any;
  isNew: boolean;
  padItemId: string;
}

// Reducer

export default (state: PadItemSorteioFeitoState = initialState, action): PadItemSorteioFeitoState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_PADITEMSORTEIOFEITO_LIST_EXPORT):
    case REQUEST(ACTION_TYPES.FETCH_PADITEMSORTEIOFEITO_LIST):
    case REQUEST(ACTION_TYPES.FETCH_PADITEMSORTEIOFEITO):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_PADITEMSORTEIOFEITO):
    case REQUEST(ACTION_TYPES.UPDATE_PADITEMSORTEIOFEITO):
    case REQUEST(ACTION_TYPES.DELETE_PADITEMSORTEIOFEITO):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_PADITEMSORTEIOFEITO_LIST_EXPORT):
    case FAILURE(ACTION_TYPES.FETCH_PADITEMSORTEIOFEITO_LIST):
    case FAILURE(ACTION_TYPES.FETCH_PADITEMSORTEIOFEITO):
    case FAILURE(ACTION_TYPES.CREATE_PADITEMSORTEIOFEITO):
    case FAILURE(ACTION_TYPES.UPDATE_PADITEMSORTEIOFEITO):
    case FAILURE(ACTION_TYPES.DELETE_PADITEMSORTEIOFEITO):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_PADITEMSORTEIOFEITO_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10)
      };
    case SUCCESS(ACTION_TYPES.FETCH_PADITEMSORTEIOFEITO):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_PADITEMSORTEIOFEITO):
    case SUCCESS(ACTION_TYPES.UPDATE_PADITEMSORTEIOFEITO):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_PADITEMSORTEIOFEITO):
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

const apiUrl = 'api/pad-item-sorteio-feitos';

// Actions

// Actions
export type ICrudGetAllActionPadItemSorteioFeito<T> = (
  sorteioFeito?: any,
  padItem?: any,
  page?: number,
  size?: number,
  sort?: string
) => IPayload<T> | ((dispatch: any) => IPayload<T>);

export const getEntities: ICrudGetAllActionPadItemSorteioFeito<IPadItemSorteioFeito> = (sorteioFeito, padItem, page, size, sort) => {
  const sorteioFeitoRequest = sorteioFeito ? `sorteioFeito.contains=${sorteioFeito}&` : '';
  const padItemRequest = padItem ? `padItem.equals=${padItem}&` : '';

  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}&` : '?'}`;
  return {
    type: ACTION_TYPES.FETCH_PADITEMSORTEIOFEITO_LIST,
    payload: axios.get<IPadItemSorteioFeito>(`${requestUrl}${sorteioFeitoRequest}${padItemRequest}cacheBuster=${new Date().getTime()}`)
  };
};
export const getEntity: ICrudGetAction<IPadItemSorteioFeito> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_PADITEMSORTEIOFEITO,
    payload: axios.get<IPadItemSorteioFeito>(requestUrl)
  };
};

export const getEntitiesExport: ICrudGetAllActionPadItemSorteioFeito<IPadItemSorteioFeito> = (sorteioFeito, padItem, page, size, sort) => {
  const sorteioFeitoRequest = sorteioFeito ? `sorteioFeito.contains=${sorteioFeito}&` : '';
  const padItemRequest = padItem ? `padItem.equals=${padItem}&` : '';

  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}&` : '?'}`;
  return {
    type: ACTION_TYPES.FETCH_PADITEMSORTEIOFEITO_LIST,
    payload: axios.get<IPadItemSorteioFeito>(`${requestUrl}${sorteioFeitoRequest}${padItemRequest}cacheBuster=${new Date().getTime()}`)
  };
};

export const createEntity: ICrudPutAction<IPadItemSorteioFeito> = entity => async dispatch => {
  entity = {
    ...entity,
    padItem: entity.padItem === 'null' ? null : entity.padItem
  };
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_PADITEMSORTEIOFEITO,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IPadItemSorteioFeito> = entity => async dispatch => {
  entity = { ...entity, padItem: entity.padItem === 'null' ? null : entity.padItem };
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_PADITEMSORTEIOFEITO,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IPadItemSorteioFeito> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_PADITEMSORTEIOFEITO,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});

export const getPadItemSorteioFeitoState = (location): IPadItemSorteioFeitoBaseState => {
  const url = new URL(`http://localhost${location.search}`); // using a dummy url for parsing
  const baseFilters = url.searchParams.get('baseFilters') || '';
  const sorteioFeito = url.searchParams.get('sorteioFeito') || '';

  const padItem = url.searchParams.get('padItem') || '';

  return {
    baseFilters,
    sorteioFeito,
    padItem
  };
};
