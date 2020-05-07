/* eslint complexity: ["error", 100] */
import axios from 'axios';
import { ICrudGetAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { IPayload } from 'react-jhipster/src/type/redux-action.type';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IServico, defaultValue } from 'app/shared/model/servico.model';

export const ACTION_TYPES = {
  FETCH_SERVICO_LIST_EXPORT: 'servico/FETCH_SERVICO_LIST_EXPORT',
  FETCH_SERVICO_LIST: 'servico/FETCH_SERVICO_LIST',
  FETCH_SERVICO: 'servico/FETCH_SERVICO',
  CREATE_SERVICO: 'servico/CREATE_SERVICO',
  UPDATE_SERVICO: 'servico/UPDATE_SERVICO',
  DELETE_SERVICO: 'servico/DELETE_SERVICO',
  RESET: 'servico/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IServico>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type ServicoState = Readonly<typeof initialState>;

export interface IServicoBaseState {
  baseFilters: any;
  servico: any;
  styleLabel: any;
}

export interface IServicoUpdateState {
  fieldsBase: IServicoBaseState;
  isNew: boolean;
}

// Reducer

export default (state: ServicoState = initialState, action): ServicoState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_SERVICO_LIST_EXPORT):
    case REQUEST(ACTION_TYPES.FETCH_SERVICO_LIST):
    case REQUEST(ACTION_TYPES.FETCH_SERVICO):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_SERVICO):
    case REQUEST(ACTION_TYPES.UPDATE_SERVICO):
    case REQUEST(ACTION_TYPES.DELETE_SERVICO):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_SERVICO_LIST_EXPORT):
    case FAILURE(ACTION_TYPES.FETCH_SERVICO_LIST):
    case FAILURE(ACTION_TYPES.FETCH_SERVICO):
    case FAILURE(ACTION_TYPES.CREATE_SERVICO):
    case FAILURE(ACTION_TYPES.UPDATE_SERVICO):
    case FAILURE(ACTION_TYPES.DELETE_SERVICO):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_SERVICO_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10)
      };
    case SUCCESS(ACTION_TYPES.FETCH_SERVICO):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_SERVICO):
    case SUCCESS(ACTION_TYPES.UPDATE_SERVICO):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_SERVICO):
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

const apiUrl = 'api/servicos';

// Actions

// Actions
export type ICrudGetAllActionServico<T> = (
  servico?: any,
  styleLabel?: any,
  page?: number,
  size?: number,
  sort?: string
) => IPayload<T> | ((dispatch: any) => IPayload<T>);

export const getEntities: ICrudGetAllActionServico<IServico> = (servico, styleLabel, page, size, sort) => {
  const servicoRequest = servico ? `servico.contains=${servico}&` : '';
  const styleLabelRequest = styleLabel ? `styleLabel.contains=${styleLabel}&` : '';

  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}&` : '?'}`;
  return {
    type: ACTION_TYPES.FETCH_SERVICO_LIST,
    payload: axios.get<IServico>(`${requestUrl}${servicoRequest}${styleLabelRequest}cacheBuster=${new Date().getTime()}`)
  };
};
export const getEntity: ICrudGetAction<IServico> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_SERVICO,
    payload: axios.get<IServico>(requestUrl)
  };
};

export const getEntitiesExport: ICrudGetAllActionServico<IServico> = (servico, styleLabel, page, size, sort) => {
  const servicoRequest = servico ? `servico.contains=${servico}&` : '';
  const styleLabelRequest = styleLabel ? `styleLabel.contains=${styleLabel}&` : '';

  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}&` : '?'}`;
  return {
    type: ACTION_TYPES.FETCH_SERVICO_LIST,
    payload: axios.get<IServico>(`${requestUrl}${servicoRequest}${styleLabelRequest}cacheBuster=${new Date().getTime()}`)
  };
};

export const createEntity: ICrudPutAction<IServico> = entity => async dispatch => {
  entity = {
    ...entity
  };
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_SERVICO,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IServico> = entity => async dispatch => {
  entity = { ...entity };
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_SERVICO,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IServico> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_SERVICO,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});

export const getServicoState = (location): IServicoBaseState => {
  const url = new URL(`http://localhost${location.search}`); // using a dummy url for parsing
  const baseFilters = url.searchParams.get('baseFilters') || '';
  const servico = url.searchParams.get('servico') || '';
  const styleLabel = url.searchParams.get('styleLabel') || '';

  return {
    baseFilters,
    servico,
    styleLabel
  };
};
