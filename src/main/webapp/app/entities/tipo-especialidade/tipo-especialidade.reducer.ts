/* eslint complexity: ["error", 100] */
import axios from 'axios';
import { ICrudGetAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { IPayload } from 'react-jhipster/src/type/redux-action.type';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { ITipoEspecialidade, defaultValue } from 'app/shared/model/tipo-especialidade.model';

export const ACTION_TYPES = {
  FETCH_TIPOESPECIALIDADE_LIST_EXPORT: 'tipoEspecialidade/FETCH_TIPOESPECIALIDADE_LIST_EXPORT',
  FETCH_TIPOESPECIALIDADE_LIST: 'tipoEspecialidade/FETCH_TIPOESPECIALIDADE_LIST',
  FETCH_TIPOESPECIALIDADE: 'tipoEspecialidade/FETCH_TIPOESPECIALIDADE',
  CREATE_TIPOESPECIALIDADE: 'tipoEspecialidade/CREATE_TIPOESPECIALIDADE',
  UPDATE_TIPOESPECIALIDADE: 'tipoEspecialidade/UPDATE_TIPOESPECIALIDADE',
  DELETE_TIPOESPECIALIDADE: 'tipoEspecialidade/DELETE_TIPOESPECIALIDADE',
  RESET: 'tipoEspecialidade/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<ITipoEspecialidade>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type TipoEspecialidadeState = Readonly<typeof initialState>;

export interface ITipoEspecialidadeBaseState {
  baseFilters: any;
  tipoEspecialidade: any;
}

export interface ITipoEspecialidadeUpdateState {
  fieldsBase: ITipoEspecialidadeBaseState;

  isNew: boolean;
}

// Reducer

export default (state: TipoEspecialidadeState = initialState, action): TipoEspecialidadeState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_TIPOESPECIALIDADE_LIST_EXPORT):
    case REQUEST(ACTION_TYPES.FETCH_TIPOESPECIALIDADE_LIST):
    case REQUEST(ACTION_TYPES.FETCH_TIPOESPECIALIDADE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_TIPOESPECIALIDADE):
    case REQUEST(ACTION_TYPES.UPDATE_TIPOESPECIALIDADE):
    case REQUEST(ACTION_TYPES.DELETE_TIPOESPECIALIDADE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_TIPOESPECIALIDADE_LIST_EXPORT):
    case FAILURE(ACTION_TYPES.FETCH_TIPOESPECIALIDADE_LIST):
    case FAILURE(ACTION_TYPES.FETCH_TIPOESPECIALIDADE):
    case FAILURE(ACTION_TYPES.CREATE_TIPOESPECIALIDADE):
    case FAILURE(ACTION_TYPES.UPDATE_TIPOESPECIALIDADE):
    case FAILURE(ACTION_TYPES.DELETE_TIPOESPECIALIDADE):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_TIPOESPECIALIDADE_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10)
      };
    case SUCCESS(ACTION_TYPES.FETCH_TIPOESPECIALIDADE):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_TIPOESPECIALIDADE):
    case SUCCESS(ACTION_TYPES.UPDATE_TIPOESPECIALIDADE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_TIPOESPECIALIDADE):
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

const apiUrl = 'api/tipo-especialidades';

// Actions

// Actions
export type ICrudGetAllActionTipoEspecialidade<T> = (
  tipoEspecialidade?: any,
  page?: number,
  size?: number,
  sort?: string
) => IPayload<T> | ((dispatch: any) => IPayload<T>);

export const getEntities: ICrudGetAllActionTipoEspecialidade<ITipoEspecialidade> = (tipoEspecialidade, page, size, sort) => {
  const tipoEspecialidadeRequest = tipoEspecialidade ? `tipoEspecialidade.contains=${tipoEspecialidade}&` : '';

  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}&` : '?'}`;
  return {
    type: ACTION_TYPES.FETCH_TIPOESPECIALIDADE_LIST,
    payload: axios.get<ITipoEspecialidade>(`${requestUrl}${tipoEspecialidadeRequest}cacheBuster=${new Date().getTime()}`)
  };
};
export const getEntity: ICrudGetAction<ITipoEspecialidade> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_TIPOESPECIALIDADE,
    payload: axios.get<ITipoEspecialidade>(requestUrl)
  };
};

export const getEntitiesExport: ICrudGetAllActionTipoEspecialidade<ITipoEspecialidade> = (tipoEspecialidade, page, size, sort) => {
  const tipoEspecialidadeRequest = tipoEspecialidade ? `tipoEspecialidade.contains=${tipoEspecialidade}&` : '';

  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}&` : '?'}`;
  return {
    type: ACTION_TYPES.FETCH_TIPOESPECIALIDADE_LIST,
    payload: axios.get<ITipoEspecialidade>(`${requestUrl}${tipoEspecialidadeRequest}cacheBuster=${new Date().getTime()}`)
  };
};

export const createEntity: ICrudPutAction<ITipoEspecialidade> = entity => async dispatch => {
  entity = {
    ...entity
  };
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_TIPOESPECIALIDADE,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<ITipoEspecialidade> = entity => async dispatch => {
  entity = { ...entity };
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_TIPOESPECIALIDADE,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<ITipoEspecialidade> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_TIPOESPECIALIDADE,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});

export const getTipoEspecialidadeState = (location): ITipoEspecialidadeBaseState => {
  const url = new URL(`http://localhost${location.search}`); // using a dummy url for parsing
  const baseFilters = url.searchParams.get('baseFilters') || '';
  const tipoEspecialidade = url.searchParams.get('tipoEspecialidade') || '';

  return {
    baseFilters,
    tipoEspecialidade
  };
};
