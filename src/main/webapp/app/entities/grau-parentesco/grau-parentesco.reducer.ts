/* eslint complexity: ["error", 100] */
import axios from 'axios';
import { ICrudGetAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { IPayload } from 'react-jhipster/src/type/redux-action.type';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IGrauParentesco, defaultValue } from 'app/shared/model/grau-parentesco.model';

export const ACTION_TYPES = {
  FETCH_GRAUPARENTESCO_LIST: 'grauParentesco/FETCH_GRAUPARENTESCO_LIST',
  FETCH_GRAUPARENTESCO: 'grauParentesco/FETCH_GRAUPARENTESCO',
  CREATE_GRAUPARENTESCO: 'grauParentesco/CREATE_GRAUPARENTESCO',
  UPDATE_GRAUPARENTESCO: 'grauParentesco/UPDATE_GRAUPARENTESCO',
  DELETE_GRAUPARENTESCO: 'grauParentesco/DELETE_GRAUPARENTESCO',
  RESET: 'grauParentesco/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IGrauParentesco>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type GrauParentescoState = Readonly<typeof initialState>;

// Reducer

export default (state: GrauParentescoState = initialState, action): GrauParentescoState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_GRAUPARENTESCO_LIST):
    case REQUEST(ACTION_TYPES.FETCH_GRAUPARENTESCO):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_GRAUPARENTESCO):
    case REQUEST(ACTION_TYPES.UPDATE_GRAUPARENTESCO):
    case REQUEST(ACTION_TYPES.DELETE_GRAUPARENTESCO):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_GRAUPARENTESCO_LIST):
    case FAILURE(ACTION_TYPES.FETCH_GRAUPARENTESCO):
    case FAILURE(ACTION_TYPES.CREATE_GRAUPARENTESCO):
    case FAILURE(ACTION_TYPES.UPDATE_GRAUPARENTESCO):
    case FAILURE(ACTION_TYPES.DELETE_GRAUPARENTESCO):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_GRAUPARENTESCO_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10)
      };
    case SUCCESS(ACTION_TYPES.FETCH_GRAUPARENTESCO):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_GRAUPARENTESCO):
    case SUCCESS(ACTION_TYPES.UPDATE_GRAUPARENTESCO):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_GRAUPARENTESCO):
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

const apiUrl = 'api/grau-parentescos';

// Actions

// Actions
export type ICrudGetAllActionGrauParentesco<T> = (
  grauParentesco?: any,
  page?: number,
  size?: number,
  sort?: string
) => IPayload<T> | ((dispatch: any) => IPayload<T>);

export const getEntities: ICrudGetAllActionGrauParentesco<IGrauParentesco> = (grauParentesco, page, size, sort) => {
  const grauParentescoRequest = grauParentesco ? `grauParentesco.contains=${grauParentesco}&` : '';

  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}&` : '?'}`;
  return {
    type: ACTION_TYPES.FETCH_GRAUPARENTESCO_LIST,
    payload: axios.get<IGrauParentesco>(`${requestUrl}${grauParentescoRequest}cacheBuster=${new Date().getTime()}`)
  };
};
export const getEntity: ICrudGetAction<IGrauParentesco> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_GRAUPARENTESCO,
    payload: axios.get<IGrauParentesco>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IGrauParentesco> = entity => async dispatch => {
  entity = {
    ...entity
  };
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_GRAUPARENTESCO,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IGrauParentesco> = entity => async dispatch => {
  entity = { ...entity };
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_GRAUPARENTESCO,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IGrauParentesco> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_GRAUPARENTESCO,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
