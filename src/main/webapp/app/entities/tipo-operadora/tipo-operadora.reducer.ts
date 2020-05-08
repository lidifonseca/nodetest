/* eslint complexity: ["error", 100] */
import axios from 'axios';
import { ICrudGetAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { IPayload } from 'react-jhipster/src/type/redux-action.type';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { ITipoOperadora, defaultValue } from 'app/shared/model/tipo-operadora.model';

export const ACTION_TYPES = {
  FETCH_TIPOOPERADORA_LIST_EXPORT: 'tipoOperadora/FETCH_TIPOOPERADORA_LIST_EXPORT',
  FETCH_TIPOOPERADORA_LIST: 'tipoOperadora/FETCH_TIPOOPERADORA_LIST',
  FETCH_TIPOOPERADORA: 'tipoOperadora/FETCH_TIPOOPERADORA',
  CREATE_TIPOOPERADORA: 'tipoOperadora/CREATE_TIPOOPERADORA',
  UPDATE_TIPOOPERADORA: 'tipoOperadora/UPDATE_TIPOOPERADORA',
  DELETE_TIPOOPERADORA: 'tipoOperadora/DELETE_TIPOOPERADORA',
  RESET: 'tipoOperadora/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<ITipoOperadora>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type TipoOperadoraState = Readonly<typeof initialState>;

export interface ITipoOperadoraBaseState {
  baseFilters: any;
  tipo: any;
  ativo: any;
}

export interface ITipoOperadoraUpdateState {
  fieldsBase: ITipoOperadoraBaseState;

  isNew: boolean;
}

// Reducer

export default (state: TipoOperadoraState = initialState, action): TipoOperadoraState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_TIPOOPERADORA_LIST_EXPORT):
    case REQUEST(ACTION_TYPES.FETCH_TIPOOPERADORA_LIST):
    case REQUEST(ACTION_TYPES.FETCH_TIPOOPERADORA):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_TIPOOPERADORA):
    case REQUEST(ACTION_TYPES.UPDATE_TIPOOPERADORA):
    case REQUEST(ACTION_TYPES.DELETE_TIPOOPERADORA):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_TIPOOPERADORA_LIST_EXPORT):
    case FAILURE(ACTION_TYPES.FETCH_TIPOOPERADORA_LIST):
    case FAILURE(ACTION_TYPES.FETCH_TIPOOPERADORA):
    case FAILURE(ACTION_TYPES.CREATE_TIPOOPERADORA):
    case FAILURE(ACTION_TYPES.UPDATE_TIPOOPERADORA):
    case FAILURE(ACTION_TYPES.DELETE_TIPOOPERADORA):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_TIPOOPERADORA_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10)
      };
    case SUCCESS(ACTION_TYPES.FETCH_TIPOOPERADORA):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_TIPOOPERADORA):
    case SUCCESS(ACTION_TYPES.UPDATE_TIPOOPERADORA):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_TIPOOPERADORA):
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

const apiUrl = 'api/tipo-operadoras';

// Actions

// Actions
export type ICrudGetAllActionTipoOperadora<T> = (
  tipo?: any,
  ativo?: any,
  page?: number,
  size?: number,
  sort?: string
) => IPayload<T> | ((dispatch: any) => IPayload<T>);

export const getEntities: ICrudGetAllActionTipoOperadora<ITipoOperadora> = (tipo, ativo, page, size, sort) => {
  const tipoRequest = tipo ? `tipo.contains=${tipo}&` : '';
  const ativoRequest = ativo ? `ativo.contains=${ativo}&` : '';

  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}&` : '?'}`;
  return {
    type: ACTION_TYPES.FETCH_TIPOOPERADORA_LIST,
    payload: axios.get<ITipoOperadora>(`${requestUrl}${tipoRequest}${ativoRequest}cacheBuster=${new Date().getTime()}`)
  };
};
export const getEntity: ICrudGetAction<ITipoOperadora> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_TIPOOPERADORA,
    payload: axios.get<ITipoOperadora>(requestUrl)
  };
};

export const getEntitiesExport: ICrudGetAllActionTipoOperadora<ITipoOperadora> = (tipo, ativo, page, size, sort) => {
  const tipoRequest = tipo ? `tipo.contains=${tipo}&` : '';
  const ativoRequest = ativo ? `ativo.contains=${ativo}&` : '';

  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}&` : '?'}`;
  return {
    type: ACTION_TYPES.FETCH_TIPOOPERADORA_LIST,
    payload: axios.get<ITipoOperadora>(`${requestUrl}${tipoRequest}${ativoRequest}cacheBuster=${new Date().getTime()}`)
  };
};

export const createEntity: ICrudPutAction<ITipoOperadora> = entity => async dispatch => {
  entity = {
    ...entity
  };
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_TIPOOPERADORA,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<ITipoOperadora> = entity => async dispatch => {
  entity = { ...entity };
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_TIPOOPERADORA,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<ITipoOperadora> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_TIPOOPERADORA,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});

export const getTipoOperadoraState = (location): ITipoOperadoraBaseState => {
  const url = new URL(`http://localhost${location.search}`); // using a dummy url for parsing
  const baseFilters = url.searchParams.get('baseFilters') || '';
  const tipo = url.searchParams.get('tipo') || '';
  const ativo = url.searchParams.get('ativo') || '';

  return {
    baseFilters,
    tipo,
    ativo
  };
};
