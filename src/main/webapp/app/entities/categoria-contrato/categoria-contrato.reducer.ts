/* eslint complexity: ["error", 100] */
import axios from 'axios';
import { ICrudGetAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { IPayload } from 'react-jhipster/src/type/redux-action.type';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { ICategoriaContrato, defaultValue } from 'app/shared/model/categoria-contrato.model';

export const ACTION_TYPES = {
  FETCH_CATEGORIACONTRATO_LIST_EXPORT: 'categoriaContrato/FETCH_CATEGORIACONTRATO_LIST_EXPORT',
  FETCH_CATEGORIACONTRATO_LIST: 'categoriaContrato/FETCH_CATEGORIACONTRATO_LIST',
  FETCH_CATEGORIACONTRATO: 'categoriaContrato/FETCH_CATEGORIACONTRATO',
  CREATE_CATEGORIACONTRATO: 'categoriaContrato/CREATE_CATEGORIACONTRATO',
  UPDATE_CATEGORIACONTRATO: 'categoriaContrato/UPDATE_CATEGORIACONTRATO',
  DELETE_CATEGORIACONTRATO: 'categoriaContrato/DELETE_CATEGORIACONTRATO',
  RESET: 'categoriaContrato/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<ICategoriaContrato>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type CategoriaContratoState = Readonly<typeof initialState>;

export interface ICategoriaContratoBaseState {
  contrato: any;
  ativo: any;
  idCategoria: any;
}

// Reducer

export default (state: CategoriaContratoState = initialState, action): CategoriaContratoState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_CATEGORIACONTRATO_LIST_EXPORT):
    case REQUEST(ACTION_TYPES.FETCH_CATEGORIACONTRATO_LIST):
    case REQUEST(ACTION_TYPES.FETCH_CATEGORIACONTRATO):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_CATEGORIACONTRATO):
    case REQUEST(ACTION_TYPES.UPDATE_CATEGORIACONTRATO):
    case REQUEST(ACTION_TYPES.DELETE_CATEGORIACONTRATO):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_CATEGORIACONTRATO_LIST_EXPORT):
    case FAILURE(ACTION_TYPES.FETCH_CATEGORIACONTRATO_LIST):
    case FAILURE(ACTION_TYPES.FETCH_CATEGORIACONTRATO):
    case FAILURE(ACTION_TYPES.CREATE_CATEGORIACONTRATO):
    case FAILURE(ACTION_TYPES.UPDATE_CATEGORIACONTRATO):
    case FAILURE(ACTION_TYPES.DELETE_CATEGORIACONTRATO):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_CATEGORIACONTRATO_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10)
      };
    case SUCCESS(ACTION_TYPES.FETCH_CATEGORIACONTRATO):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_CATEGORIACONTRATO):
    case SUCCESS(ACTION_TYPES.UPDATE_CATEGORIACONTRATO):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_CATEGORIACONTRATO):
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

const apiUrl = 'api/categoria-contratoes';

// Actions

// Actions
export type ICrudGetAllActionCategoriaContrato<T> = (
  contrato?: any,
  ativo?: any,
  idCategoria?: any,
  page?: number,
  size?: number,
  sort?: string
) => IPayload<T> | ((dispatch: any) => IPayload<T>);

export const getEntities: ICrudGetAllActionCategoriaContrato<ICategoriaContrato> = (contrato, ativo, idCategoria, page, size, sort) => {
  const contratoRequest = contrato ? `contrato.contains=${contrato}&` : '';
  const ativoRequest = ativo ? `ativo.contains=${ativo}&` : '';
  const idCategoriaRequest = idCategoria ? `idCategoria.equals=${idCategoria}&` : '';

  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}&` : '?'}`;
  return {
    type: ACTION_TYPES.FETCH_CATEGORIACONTRATO_LIST,
    payload: axios.get<ICategoriaContrato>(
      `${requestUrl}${contratoRequest}${ativoRequest}${idCategoriaRequest}cacheBuster=${new Date().getTime()}`
    )
  };
};
export const getEntity: ICrudGetAction<ICategoriaContrato> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_CATEGORIACONTRATO,
    payload: axios.get<ICategoriaContrato>(requestUrl)
  };
};

export const getEntitiesExport: ICrudGetAllActionCategoriaContrato<ICategoriaContrato> = (
  contrato,
  ativo,
  idCategoria,
  page,
  size,
  sort
) => {
  const contratoRequest = contrato ? `contrato.contains=${contrato}&` : '';
  const ativoRequest = ativo ? `ativo.contains=${ativo}&` : '';
  const idCategoriaRequest = idCategoria ? `idCategoria.equals=${idCategoria}&` : '';

  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}&` : '?'}`;
  return {
    type: ACTION_TYPES.FETCH_CATEGORIACONTRATO_LIST,
    payload: axios.get<ICategoriaContrato>(
      `${requestUrl}${contratoRequest}${ativoRequest}${idCategoriaRequest}cacheBuster=${new Date().getTime()}`
    )
  };
};

export const createEntity: ICrudPutAction<ICategoriaContrato> = entity => async dispatch => {
  entity = {
    ...entity,
    idCategoria: entity.idCategoria === 'null' ? null : entity.idCategoria
  };
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_CATEGORIACONTRATO,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<ICategoriaContrato> = entity => async dispatch => {
  entity = { ...entity, idCategoria: entity.idCategoria === 'null' ? null : entity.idCategoria };
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_CATEGORIACONTRATO,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<ICategoriaContrato> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_CATEGORIACONTRATO,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});

export const getCategoriaContratoState = (location): ICategoriaContratoBaseState => {
  const url = new URL(`http://localhost${location.search}`); // using a dummy url for parsing
  const contrato = url.searchParams.get('contrato') || '';
  const ativo = url.searchParams.get('ativo') || '';

  const idCategoria = url.searchParams.get('idCategoria') || '';

  return {
    contrato,
    ativo,
    idCategoria
  };
};
