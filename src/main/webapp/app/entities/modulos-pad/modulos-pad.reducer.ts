/* eslint complexity: ["error", 100] */
import axios from 'axios';
import { ICrudGetAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { IPayload } from 'react-jhipster/src/type/redux-action.type';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IModulosPad, defaultValue } from 'app/shared/model/modulos-pad.model';

export const ACTION_TYPES = {
  FETCH_MODULOSPAD_LIST: 'modulosPad/FETCH_MODULOSPAD_LIST',
  FETCH_MODULOSPAD: 'modulosPad/FETCH_MODULOSPAD',
  CREATE_MODULOSPAD: 'modulosPad/CREATE_MODULOSPAD',
  UPDATE_MODULOSPAD: 'modulosPad/UPDATE_MODULOSPAD',
  DELETE_MODULOSPAD: 'modulosPad/DELETE_MODULOSPAD',
  RESET: 'modulosPad/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IModulosPad>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type ModulosPadState = Readonly<typeof initialState>;

// Reducer

export default (state: ModulosPadState = initialState, action): ModulosPadState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_MODULOSPAD_LIST):
    case REQUEST(ACTION_TYPES.FETCH_MODULOSPAD):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_MODULOSPAD):
    case REQUEST(ACTION_TYPES.UPDATE_MODULOSPAD):
    case REQUEST(ACTION_TYPES.DELETE_MODULOSPAD):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_MODULOSPAD_LIST):
    case FAILURE(ACTION_TYPES.FETCH_MODULOSPAD):
    case FAILURE(ACTION_TYPES.CREATE_MODULOSPAD):
    case FAILURE(ACTION_TYPES.UPDATE_MODULOSPAD):
    case FAILURE(ACTION_TYPES.DELETE_MODULOSPAD):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_MODULOSPAD_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10)
      };
    case SUCCESS(ACTION_TYPES.FETCH_MODULOSPAD):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_MODULOSPAD):
    case SUCCESS(ACTION_TYPES.UPDATE_MODULOSPAD):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_MODULOSPAD):
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

const apiUrl = 'api/modulos-pads';

// Actions

// Actions
export type ICrudGetAllActionModulosPad<T> = (
  nomeModulo?: any,
  ativo?: any,
  dataPost?: any,
  page?: number,
  size?: number,
  sort?: string
) => IPayload<T> | ((dispatch: any) => IPayload<T>);

export const getEntities: ICrudGetAllActionModulosPad<IModulosPad> = (nomeModulo, ativo, dataPost, page, size, sort) => {
  const nomeModuloRequest = nomeModulo ? `nomeModulo.contains=${nomeModulo}&` : '';
  const ativoRequest = ativo ? `ativo.contains=${ativo}&` : '';
  const dataPostRequest = dataPost ? `dataPost.equals=${dataPost}&` : '';

  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}&` : '?'}`;
  return {
    type: ACTION_TYPES.FETCH_MODULOSPAD_LIST,
    payload: axios.get<IModulosPad>(`${requestUrl}${nomeModuloRequest}${ativoRequest}${dataPostRequest}cacheBuster=${new Date().getTime()}`)
  };
};
export const getEntity: ICrudGetAction<IModulosPad> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_MODULOSPAD,
    payload: axios.get<IModulosPad>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IModulosPad> = entity => async dispatch => {
  entity = {
    ...entity
  };
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_MODULOSPAD,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IModulosPad> = entity => async dispatch => {
  entity = { ...entity };
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_MODULOSPAD,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IModulosPad> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_MODULOSPAD,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
