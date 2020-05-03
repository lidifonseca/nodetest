/* eslint complexity: ["error", 100] */
import axios from 'axios';
import { ICrudGetAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { IPayload } from 'react-jhipster/src/type/redux-action.type';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { ICategoria, defaultValue } from 'app/shared/model/categoria.model';

export const ACTION_TYPES = {
  FETCH_CATEGORIA_LIST: 'categoria/FETCH_CATEGORIA_LIST',
  FETCH_CATEGORIA: 'categoria/FETCH_CATEGORIA',
  CREATE_CATEGORIA: 'categoria/CREATE_CATEGORIA',
  UPDATE_CATEGORIA: 'categoria/UPDATE_CATEGORIA',
  DELETE_CATEGORIA: 'categoria/DELETE_CATEGORIA',
  RESET: 'categoria/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<ICategoria>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type CategoriaState = Readonly<typeof initialState>;

// Reducer

export default (state: CategoriaState = initialState, action): CategoriaState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_CATEGORIA_LIST):
    case REQUEST(ACTION_TYPES.FETCH_CATEGORIA):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_CATEGORIA):
    case REQUEST(ACTION_TYPES.UPDATE_CATEGORIA):
    case REQUEST(ACTION_TYPES.DELETE_CATEGORIA):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_CATEGORIA_LIST):
    case FAILURE(ACTION_TYPES.FETCH_CATEGORIA):
    case FAILURE(ACTION_TYPES.CREATE_CATEGORIA):
    case FAILURE(ACTION_TYPES.UPDATE_CATEGORIA):
    case FAILURE(ACTION_TYPES.DELETE_CATEGORIA):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_CATEGORIA_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10)
      };
    case SUCCESS(ACTION_TYPES.FETCH_CATEGORIA):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_CATEGORIA):
    case SUCCESS(ACTION_TYPES.UPDATE_CATEGORIA):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_CATEGORIA):
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

const apiUrl = 'api/categorias';

// Actions

// Actions
export type ICrudGetAllActionCategoria<T> = (
  categoria?: any,
  styleCategoria?: any,
  icon?: any,
  publicar?: any,
  ordem?: any,
  publicarSite?: any,
  categoriaAtividade?: any,
  categoriaContrato?: any,
  categoriaUnidade?: any,
  cidXPtaNovoPadItemIndi?: any,
  especialidade?: any,
  page?: number,
  size?: number,
  sort?: string
) => IPayload<T> | ((dispatch: any) => IPayload<T>);

export const getEntities: ICrudGetAllActionCategoria<ICategoria> = (
  categoria,
  styleCategoria,
  icon,
  publicar,
  ordem,
  publicarSite,
  categoriaAtividade,
  categoriaContrato,
  categoriaUnidade,
  cidXPtaNovoPadItemIndi,
  especialidade,
  page,
  size,
  sort
) => {
  const categoriaRequest = categoria ? `categoria.contains=${categoria}&` : '';
  const styleCategoriaRequest = styleCategoria ? `styleCategoria.contains=${styleCategoria}&` : '';
  const iconRequest = icon ? `icon.contains=${icon}&` : '';
  const publicarRequest = publicar ? `publicar.contains=${publicar}&` : '';
  const ordemRequest = ordem ? `ordem.contains=${ordem}&` : '';
  const publicarSiteRequest = publicarSite ? `publicarSite.contains=${publicarSite}&` : '';
  const categoriaAtividadeRequest = categoriaAtividade ? `categoriaAtividade.equals=${categoriaAtividade}&` : '';
  const categoriaContratoRequest = categoriaContrato ? `categoriaContrato.equals=${categoriaContrato}&` : '';
  const categoriaUnidadeRequest = categoriaUnidade ? `categoriaUnidade.equals=${categoriaUnidade}&` : '';
  const cidXPtaNovoPadItemIndiRequest = cidXPtaNovoPadItemIndi ? `cidXPtaNovoPadItemIndi.equals=${cidXPtaNovoPadItemIndi}&` : '';
  const especialidadeRequest = especialidade ? `especialidade.equals=${especialidade}&` : '';

  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}&` : '?'}`;
  return {
    type: ACTION_TYPES.FETCH_CATEGORIA_LIST,
    payload: axios.get<ICategoria>(
      `${requestUrl}${categoriaRequest}${styleCategoriaRequest}${iconRequest}${publicarRequest}${ordemRequest}${publicarSiteRequest}${categoriaAtividadeRequest}${categoriaContratoRequest}${categoriaUnidadeRequest}${cidXPtaNovoPadItemIndiRequest}${especialidadeRequest}cacheBuster=${new Date().getTime()}`
    )
  };
};
export const getEntity: ICrudGetAction<ICategoria> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_CATEGORIA,
    payload: axios.get<ICategoria>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<ICategoria> = entity => async dispatch => {
  entity = {
    ...entity
  };
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_CATEGORIA,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<ICategoria> = entity => async dispatch => {
  entity = { ...entity };
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_CATEGORIA,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<ICategoria> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_CATEGORIA,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
