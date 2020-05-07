/* eslint complexity: ["error", 100] */
import axios from 'axios';
import { ICrudGetAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { IPayload } from 'react-jhipster/src/type/redux-action.type';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IModulosPadConfig, defaultValue } from 'app/shared/model/modulos-pad-config.model';

export const ACTION_TYPES = {
  FETCH_MODULOSPADCONFIG_LIST_EXPORT: 'modulosPadConfig/FETCH_MODULOSPADCONFIG_LIST_EXPORT',
  FETCH_MODULOSPADCONFIG_LIST: 'modulosPadConfig/FETCH_MODULOSPADCONFIG_LIST',
  FETCH_MODULOSPADCONFIG: 'modulosPadConfig/FETCH_MODULOSPADCONFIG',
  CREATE_MODULOSPADCONFIG: 'modulosPadConfig/CREATE_MODULOSPADCONFIG',
  UPDATE_MODULOSPADCONFIG: 'modulosPadConfig/UPDATE_MODULOSPADCONFIG',
  DELETE_MODULOSPADCONFIG: 'modulosPadConfig/DELETE_MODULOSPADCONFIG',
  RESET: 'modulosPadConfig/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IModulosPadConfig>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type ModulosPadConfigState = Readonly<typeof initialState>;

export interface IModulosPadConfigBaseState {
  baseFilters: any;
  idModulosPad: any;
  idEspecialidade: any;
  idPeriodicidade: any;
}

export interface IModulosPadConfigUpdateState {
  fieldsBase: IModulosPadConfigBaseState;
  isNew: boolean;
}

// Reducer

export default (state: ModulosPadConfigState = initialState, action): ModulosPadConfigState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_MODULOSPADCONFIG_LIST_EXPORT):
    case REQUEST(ACTION_TYPES.FETCH_MODULOSPADCONFIG_LIST):
    case REQUEST(ACTION_TYPES.FETCH_MODULOSPADCONFIG):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_MODULOSPADCONFIG):
    case REQUEST(ACTION_TYPES.UPDATE_MODULOSPADCONFIG):
    case REQUEST(ACTION_TYPES.DELETE_MODULOSPADCONFIG):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_MODULOSPADCONFIG_LIST_EXPORT):
    case FAILURE(ACTION_TYPES.FETCH_MODULOSPADCONFIG_LIST):
    case FAILURE(ACTION_TYPES.FETCH_MODULOSPADCONFIG):
    case FAILURE(ACTION_TYPES.CREATE_MODULOSPADCONFIG):
    case FAILURE(ACTION_TYPES.UPDATE_MODULOSPADCONFIG):
    case FAILURE(ACTION_TYPES.DELETE_MODULOSPADCONFIG):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_MODULOSPADCONFIG_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10)
      };
    case SUCCESS(ACTION_TYPES.FETCH_MODULOSPADCONFIG):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_MODULOSPADCONFIG):
    case SUCCESS(ACTION_TYPES.UPDATE_MODULOSPADCONFIG):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_MODULOSPADCONFIG):
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

const apiUrl = 'api/modulos-pad-configs';

// Actions

// Actions
export type ICrudGetAllActionModulosPadConfig<T> = (
  idModulosPad?: any,
  idEspecialidade?: any,
  idPeriodicidade?: any,
  page?: number,
  size?: number,
  sort?: string
) => IPayload<T> | ((dispatch: any) => IPayload<T>);

export const getEntities: ICrudGetAllActionModulosPadConfig<IModulosPadConfig> = (
  idModulosPad,
  idEspecialidade,
  idPeriodicidade,
  page,
  size,
  sort
) => {
  const idModulosPadRequest = idModulosPad ? `idModulosPad.contains=${idModulosPad}&` : '';
  const idEspecialidadeRequest = idEspecialidade ? `idEspecialidade.contains=${idEspecialidade}&` : '';
  const idPeriodicidadeRequest = idPeriodicidade ? `idPeriodicidade.contains=${idPeriodicidade}&` : '';

  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}&` : '?'}`;
  return {
    type: ACTION_TYPES.FETCH_MODULOSPADCONFIG_LIST,
    payload: axios.get<IModulosPadConfig>(
      `${requestUrl}${idModulosPadRequest}${idEspecialidadeRequest}${idPeriodicidadeRequest}cacheBuster=${new Date().getTime()}`
    )
  };
};
export const getEntity: ICrudGetAction<IModulosPadConfig> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_MODULOSPADCONFIG,
    payload: axios.get<IModulosPadConfig>(requestUrl)
  };
};

export const getEntitiesExport: ICrudGetAllActionModulosPadConfig<IModulosPadConfig> = (
  idModulosPad,
  idEspecialidade,
  idPeriodicidade,
  page,
  size,
  sort
) => {
  const idModulosPadRequest = idModulosPad ? `idModulosPad.contains=${idModulosPad}&` : '';
  const idEspecialidadeRequest = idEspecialidade ? `idEspecialidade.contains=${idEspecialidade}&` : '';
  const idPeriodicidadeRequest = idPeriodicidade ? `idPeriodicidade.contains=${idPeriodicidade}&` : '';

  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}&` : '?'}`;
  return {
    type: ACTION_TYPES.FETCH_MODULOSPADCONFIG_LIST,
    payload: axios.get<IModulosPadConfig>(
      `${requestUrl}${idModulosPadRequest}${idEspecialidadeRequest}${idPeriodicidadeRequest}cacheBuster=${new Date().getTime()}`
    )
  };
};

export const createEntity: ICrudPutAction<IModulosPadConfig> = entity => async dispatch => {
  entity = {
    ...entity
  };
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_MODULOSPADCONFIG,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IModulosPadConfig> = entity => async dispatch => {
  entity = { ...entity };
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_MODULOSPADCONFIG,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IModulosPadConfig> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_MODULOSPADCONFIG,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});

export const getModulosPadConfigState = (location): IModulosPadConfigBaseState => {
  const url = new URL(`http://localhost${location.search}`); // using a dummy url for parsing
  const baseFilters = url.searchParams.get('baseFilters') || '';
  const idModulosPad = url.searchParams.get('idModulosPad') || '';
  const idEspecialidade = url.searchParams.get('idEspecialidade') || '';
  const idPeriodicidade = url.searchParams.get('idPeriodicidade') || '';

  return {
    baseFilters,
    idModulosPad,
    idEspecialidade,
    idPeriodicidade
  };
};
