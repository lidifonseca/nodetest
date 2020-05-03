/* eslint complexity: ["error", 100] */
import axios from 'axios';
import { ICrudGetAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { IPayload } from 'react-jhipster/src/type/redux-action.type';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { ICategoriaUnidade, defaultValue } from 'app/shared/model/categoria-unidade.model';

export const ACTION_TYPES = {
  FETCH_CATEGORIAUNIDADE_LIST: 'categoriaUnidade/FETCH_CATEGORIAUNIDADE_LIST',
  FETCH_CATEGORIAUNIDADE: 'categoriaUnidade/FETCH_CATEGORIAUNIDADE',
  CREATE_CATEGORIAUNIDADE: 'categoriaUnidade/CREATE_CATEGORIAUNIDADE',
  UPDATE_CATEGORIAUNIDADE: 'categoriaUnidade/UPDATE_CATEGORIAUNIDADE',
  DELETE_CATEGORIAUNIDADE: 'categoriaUnidade/DELETE_CATEGORIAUNIDADE',
  RESET: 'categoriaUnidade/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<ICategoriaUnidade>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type CategoriaUnidadeState = Readonly<typeof initialState>;

// Reducer

export default (state: CategoriaUnidadeState = initialState, action): CategoriaUnidadeState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_CATEGORIAUNIDADE_LIST):
    case REQUEST(ACTION_TYPES.FETCH_CATEGORIAUNIDADE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_CATEGORIAUNIDADE):
    case REQUEST(ACTION_TYPES.UPDATE_CATEGORIAUNIDADE):
    case REQUEST(ACTION_TYPES.DELETE_CATEGORIAUNIDADE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_CATEGORIAUNIDADE_LIST):
    case FAILURE(ACTION_TYPES.FETCH_CATEGORIAUNIDADE):
    case FAILURE(ACTION_TYPES.CREATE_CATEGORIAUNIDADE):
    case FAILURE(ACTION_TYPES.UPDATE_CATEGORIAUNIDADE):
    case FAILURE(ACTION_TYPES.DELETE_CATEGORIAUNIDADE):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_CATEGORIAUNIDADE_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10)
      };
    case SUCCESS(ACTION_TYPES.FETCH_CATEGORIAUNIDADE):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_CATEGORIAUNIDADE):
    case SUCCESS(ACTION_TYPES.UPDATE_CATEGORIAUNIDADE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_CATEGORIAUNIDADE):
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

const apiUrl = 'api/categoria-unidades';

// Actions

// Actions
export type ICrudGetAllActionCategoriaUnidade<T> = (
  dataPost?: any,
  idUnidade?: any,
  idCategoria?: any,
  page?: number,
  size?: number,
  sort?: string
) => IPayload<T> | ((dispatch: any) => IPayload<T>);

export const getEntities: ICrudGetAllActionCategoriaUnidade<ICategoriaUnidade> = (dataPost, idUnidade, idCategoria, page, size, sort) => {
  const dataPostRequest = dataPost ? `dataPost.contains=${dataPost}&` : '';
  const idUnidadeRequest = idUnidade ? `idUnidade.equals=${idUnidade}&` : '';
  const idCategoriaRequest = idCategoria ? `idCategoria.equals=${idCategoria}&` : '';

  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}&` : '?'}`;
  return {
    type: ACTION_TYPES.FETCH_CATEGORIAUNIDADE_LIST,
    payload: axios.get<ICategoriaUnidade>(
      `${requestUrl}${dataPostRequest}${idUnidadeRequest}${idCategoriaRequest}cacheBuster=${new Date().getTime()}`
    )
  };
};
export const getEntity: ICrudGetAction<ICategoriaUnidade> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_CATEGORIAUNIDADE,
    payload: axios.get<ICategoriaUnidade>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<ICategoriaUnidade> = entity => async dispatch => {
  entity = {
    ...entity,
    idUnidade: entity.idUnidade === 'null' ? null : entity.idUnidade,
    idCategoria: entity.idCategoria === 'null' ? null : entity.idCategoria
  };
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_CATEGORIAUNIDADE,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<ICategoriaUnidade> = entity => async dispatch => {
  entity = {
    ...entity,
    idUnidade: entity.idUnidade === 'null' ? null : entity.idUnidade,
    idCategoria: entity.idCategoria === 'null' ? null : entity.idCategoria
  };
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_CATEGORIAUNIDADE,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<ICategoriaUnidade> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_CATEGORIAUNIDADE,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
