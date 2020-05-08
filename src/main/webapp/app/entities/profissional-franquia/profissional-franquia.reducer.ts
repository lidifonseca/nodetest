/* eslint complexity: ["error", 100] */
import axios from 'axios';
import { ICrudGetAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { IPayload } from 'react-jhipster/src/type/redux-action.type';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IProfissionalFranquia, defaultValue } from 'app/shared/model/profissional-franquia.model';

export const ACTION_TYPES = {
  FETCH_PROFISSIONALFRANQUIA_LIST_EXPORT: 'profissionalFranquia/FETCH_PROFISSIONALFRANQUIA_LIST_EXPORT',
  FETCH_PROFISSIONALFRANQUIA_LIST: 'profissionalFranquia/FETCH_PROFISSIONALFRANQUIA_LIST',
  FETCH_PROFISSIONALFRANQUIA: 'profissionalFranquia/FETCH_PROFISSIONALFRANQUIA',
  CREATE_PROFISSIONALFRANQUIA: 'profissionalFranquia/CREATE_PROFISSIONALFRANQUIA',
  UPDATE_PROFISSIONALFRANQUIA: 'profissionalFranquia/UPDATE_PROFISSIONALFRANQUIA',
  DELETE_PROFISSIONALFRANQUIA: 'profissionalFranquia/DELETE_PROFISSIONALFRANQUIA',
  RESET: 'profissionalFranquia/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IProfissionalFranquia>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type ProfissionalFranquiaState = Readonly<typeof initialState>;

export interface IProfissionalFranquiaBaseState {
  baseFilters: any;
  idProfissional: any;
  idFranquia: any;
}

export interface IProfissionalFranquiaUpdateState {
  fieldsBase: IProfissionalFranquiaBaseState;

  isNew: boolean;
}

// Reducer

export default (state: ProfissionalFranquiaState = initialState, action): ProfissionalFranquiaState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_PROFISSIONALFRANQUIA_LIST_EXPORT):
    case REQUEST(ACTION_TYPES.FETCH_PROFISSIONALFRANQUIA_LIST):
    case REQUEST(ACTION_TYPES.FETCH_PROFISSIONALFRANQUIA):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_PROFISSIONALFRANQUIA):
    case REQUEST(ACTION_TYPES.UPDATE_PROFISSIONALFRANQUIA):
    case REQUEST(ACTION_TYPES.DELETE_PROFISSIONALFRANQUIA):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_PROFISSIONALFRANQUIA_LIST_EXPORT):
    case FAILURE(ACTION_TYPES.FETCH_PROFISSIONALFRANQUIA_LIST):
    case FAILURE(ACTION_TYPES.FETCH_PROFISSIONALFRANQUIA):
    case FAILURE(ACTION_TYPES.CREATE_PROFISSIONALFRANQUIA):
    case FAILURE(ACTION_TYPES.UPDATE_PROFISSIONALFRANQUIA):
    case FAILURE(ACTION_TYPES.DELETE_PROFISSIONALFRANQUIA):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_PROFISSIONALFRANQUIA_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10)
      };
    case SUCCESS(ACTION_TYPES.FETCH_PROFISSIONALFRANQUIA):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_PROFISSIONALFRANQUIA):
    case SUCCESS(ACTION_TYPES.UPDATE_PROFISSIONALFRANQUIA):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_PROFISSIONALFRANQUIA):
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

const apiUrl = 'api/profissional-franquias';

// Actions

// Actions
export type ICrudGetAllActionProfissionalFranquia<T> = (
  idProfissional?: any,
  idFranquia?: any,
  page?: number,
  size?: number,
  sort?: string
) => IPayload<T> | ((dispatch: any) => IPayload<T>);

export const getEntities: ICrudGetAllActionProfissionalFranquia<IProfissionalFranquia> = (idProfissional, idFranquia, page, size, sort) => {
  const idProfissionalRequest = idProfissional ? `idProfissional.contains=${idProfissional}&` : '';
  const idFranquiaRequest = idFranquia ? `idFranquia.contains=${idFranquia}&` : '';

  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}&` : '?'}`;
  return {
    type: ACTION_TYPES.FETCH_PROFISSIONALFRANQUIA_LIST,
    payload: axios.get<IProfissionalFranquia>(
      `${requestUrl}${idProfissionalRequest}${idFranquiaRequest}cacheBuster=${new Date().getTime()}`
    )
  };
};
export const getEntity: ICrudGetAction<IProfissionalFranquia> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_PROFISSIONALFRANQUIA,
    payload: axios.get<IProfissionalFranquia>(requestUrl)
  };
};

export const getEntitiesExport: ICrudGetAllActionProfissionalFranquia<IProfissionalFranquia> = (
  idProfissional,
  idFranquia,
  page,
  size,
  sort
) => {
  const idProfissionalRequest = idProfissional ? `idProfissional.contains=${idProfissional}&` : '';
  const idFranquiaRequest = idFranquia ? `idFranquia.contains=${idFranquia}&` : '';

  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}&` : '?'}`;
  return {
    type: ACTION_TYPES.FETCH_PROFISSIONALFRANQUIA_LIST,
    payload: axios.get<IProfissionalFranquia>(
      `${requestUrl}${idProfissionalRequest}${idFranquiaRequest}cacheBuster=${new Date().getTime()}`
    )
  };
};

export const createEntity: ICrudPutAction<IProfissionalFranquia> = entity => async dispatch => {
  entity = {
    ...entity
  };
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_PROFISSIONALFRANQUIA,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IProfissionalFranquia> = entity => async dispatch => {
  entity = { ...entity };
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_PROFISSIONALFRANQUIA,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IProfissionalFranquia> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_PROFISSIONALFRANQUIA,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});

export const getProfissionalFranquiaState = (location): IProfissionalFranquiaBaseState => {
  const url = new URL(`http://localhost${location.search}`); // using a dummy url for parsing
  const baseFilters = url.searchParams.get('baseFilters') || '';
  const idProfissional = url.searchParams.get('idProfissional') || '';
  const idFranquia = url.searchParams.get('idFranquia') || '';

  return {
    baseFilters,
    idProfissional,
    idFranquia
  };
};
