/* eslint complexity: ["error", 100] */
import axios from 'axios';
import { ICrudGetAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { IPayload } from 'react-jhipster/src/type/redux-action.type';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IGrupoRisco, defaultValue } from 'app/shared/model/grupo-risco.model';

export const ACTION_TYPES = {
  FETCH_GRUPORISCO_LIST: 'grupoRisco/FETCH_GRUPORISCO_LIST',
  FETCH_GRUPORISCO: 'grupoRisco/FETCH_GRUPORISCO',
  CREATE_GRUPORISCO: 'grupoRisco/CREATE_GRUPORISCO',
  UPDATE_GRUPORISCO: 'grupoRisco/UPDATE_GRUPORISCO',
  DELETE_GRUPORISCO: 'grupoRisco/DELETE_GRUPORISCO',
  RESET: 'grupoRisco/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IGrupoRisco>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type GrupoRiscoState = Readonly<typeof initialState>;

// Reducer

export default (state: GrupoRiscoState = initialState, action): GrupoRiscoState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_GRUPORISCO_LIST):
    case REQUEST(ACTION_TYPES.FETCH_GRUPORISCO):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_GRUPORISCO):
    case REQUEST(ACTION_TYPES.UPDATE_GRUPORISCO):
    case REQUEST(ACTION_TYPES.DELETE_GRUPORISCO):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_GRUPORISCO_LIST):
    case FAILURE(ACTION_TYPES.FETCH_GRUPORISCO):
    case FAILURE(ACTION_TYPES.CREATE_GRUPORISCO):
    case FAILURE(ACTION_TYPES.UPDATE_GRUPORISCO):
    case FAILURE(ACTION_TYPES.DELETE_GRUPORISCO):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_GRUPORISCO_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10)
      };
    case SUCCESS(ACTION_TYPES.FETCH_GRUPORISCO):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_GRUPORISCO):
    case SUCCESS(ACTION_TYPES.UPDATE_GRUPORISCO):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_GRUPORISCO):
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

const apiUrl = 'api/grupo-riscos';

// Actions

// Actions
export type ICrudGetAllActionGrupoRisco<T> = (
  grupoRisco?: any,
  styleLabel?: any,
  dataPost?: any,
  page?: number,
  size?: number,
  sort?: string
) => IPayload<T> | ((dispatch: any) => IPayload<T>);

export const getEntities: ICrudGetAllActionGrupoRisco<IGrupoRisco> = (grupoRisco, styleLabel, dataPost, page, size, sort) => {
  const grupoRiscoRequest = grupoRisco ? `grupoRisco.contains=${grupoRisco}&` : '';
  const styleLabelRequest = styleLabel ? `styleLabel.contains=${styleLabel}&` : '';
  const dataPostRequest = dataPost ? `dataPost.contains=${dataPost}&` : '';

  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}&` : '?'}`;
  return {
    type: ACTION_TYPES.FETCH_GRUPORISCO_LIST,
    payload: axios.get<IGrupoRisco>(
      `${requestUrl}${grupoRiscoRequest}${styleLabelRequest}${dataPostRequest}cacheBuster=${new Date().getTime()}`
    )
  };
};
export const getEntity: ICrudGetAction<IGrupoRisco> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_GRUPORISCO,
    payload: axios.get<IGrupoRisco>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IGrupoRisco> = entity => async dispatch => {
  entity = {
    ...entity
  };
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_GRUPORISCO,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IGrupoRisco> = entity => async dispatch => {
  entity = { ...entity };
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_GRUPORISCO,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IGrupoRisco> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_GRUPORISCO,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
