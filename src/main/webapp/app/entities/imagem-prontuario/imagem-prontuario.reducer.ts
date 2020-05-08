/* eslint complexity: ["error", 100] */
import axios from 'axios';
import { ICrudGetAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { IPayload } from 'react-jhipster/src/type/redux-action.type';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IImagemProntuario, defaultValue } from 'app/shared/model/imagem-prontuario.model';

export const ACTION_TYPES = {
  FETCH_IMAGEMPRONTUARIO_LIST_EXPORT: 'imagemProntuario/FETCH_IMAGEMPRONTUARIO_LIST_EXPORT',
  FETCH_IMAGEMPRONTUARIO_LIST: 'imagemProntuario/FETCH_IMAGEMPRONTUARIO_LIST',
  FETCH_IMAGEMPRONTUARIO: 'imagemProntuario/FETCH_IMAGEMPRONTUARIO',
  CREATE_IMAGEMPRONTUARIO: 'imagemProntuario/CREATE_IMAGEMPRONTUARIO',
  UPDATE_IMAGEMPRONTUARIO: 'imagemProntuario/UPDATE_IMAGEMPRONTUARIO',
  DELETE_IMAGEMPRONTUARIO: 'imagemProntuario/DELETE_IMAGEMPRONTUARIO',
  RESET: 'imagemProntuario/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IImagemProntuario>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type ImagemProntuarioState = Readonly<typeof initialState>;

export interface IImagemProntuarioBaseState {
  baseFilters: any;
  idProntuario: any;
  imagem: any;
  ativo: any;
  diretorio: any;
}

export interface IImagemProntuarioUpdateState {
  fieldsBase: IImagemProntuarioBaseState;

  isNew: boolean;
}

// Reducer

export default (state: ImagemProntuarioState = initialState, action): ImagemProntuarioState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_IMAGEMPRONTUARIO_LIST_EXPORT):
    case REQUEST(ACTION_TYPES.FETCH_IMAGEMPRONTUARIO_LIST):
    case REQUEST(ACTION_TYPES.FETCH_IMAGEMPRONTUARIO):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_IMAGEMPRONTUARIO):
    case REQUEST(ACTION_TYPES.UPDATE_IMAGEMPRONTUARIO):
    case REQUEST(ACTION_TYPES.DELETE_IMAGEMPRONTUARIO):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_IMAGEMPRONTUARIO_LIST_EXPORT):
    case FAILURE(ACTION_TYPES.FETCH_IMAGEMPRONTUARIO_LIST):
    case FAILURE(ACTION_TYPES.FETCH_IMAGEMPRONTUARIO):
    case FAILURE(ACTION_TYPES.CREATE_IMAGEMPRONTUARIO):
    case FAILURE(ACTION_TYPES.UPDATE_IMAGEMPRONTUARIO):
    case FAILURE(ACTION_TYPES.DELETE_IMAGEMPRONTUARIO):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_IMAGEMPRONTUARIO_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10)
      };
    case SUCCESS(ACTION_TYPES.FETCH_IMAGEMPRONTUARIO):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_IMAGEMPRONTUARIO):
    case SUCCESS(ACTION_TYPES.UPDATE_IMAGEMPRONTUARIO):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_IMAGEMPRONTUARIO):
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

const apiUrl = 'api/imagem-prontuarios';

// Actions

// Actions
export type ICrudGetAllActionImagemProntuario<T> = (
  idProntuario?: any,
  imagem?: any,
  ativo?: any,
  diretorio?: any,
  page?: number,
  size?: number,
  sort?: string
) => IPayload<T> | ((dispatch: any) => IPayload<T>);

export const getEntities: ICrudGetAllActionImagemProntuario<IImagemProntuario> = (
  idProntuario,
  imagem,
  ativo,
  diretorio,
  page,
  size,
  sort
) => {
  const idProntuarioRequest = idProntuario ? `idProntuario.contains=${idProntuario}&` : '';
  const imagemRequest = imagem ? `imagem.contains=${imagem}&` : '';
  const ativoRequest = ativo ? `ativo.contains=${ativo}&` : '';
  const diretorioRequest = diretorio ? `diretorio.contains=${diretorio}&` : '';

  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}&` : '?'}`;
  return {
    type: ACTION_TYPES.FETCH_IMAGEMPRONTUARIO_LIST,
    payload: axios.get<IImagemProntuario>(
      `${requestUrl}${idProntuarioRequest}${imagemRequest}${ativoRequest}${diretorioRequest}cacheBuster=${new Date().getTime()}`
    )
  };
};
export const getEntity: ICrudGetAction<IImagemProntuario> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_IMAGEMPRONTUARIO,
    payload: axios.get<IImagemProntuario>(requestUrl)
  };
};

export const getEntitiesExport: ICrudGetAllActionImagemProntuario<IImagemProntuario> = (
  idProntuario,
  imagem,
  ativo,
  diretorio,
  page,
  size,
  sort
) => {
  const idProntuarioRequest = idProntuario ? `idProntuario.contains=${idProntuario}&` : '';
  const imagemRequest = imagem ? `imagem.contains=${imagem}&` : '';
  const ativoRequest = ativo ? `ativo.contains=${ativo}&` : '';
  const diretorioRequest = diretorio ? `diretorio.contains=${diretorio}&` : '';

  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}&` : '?'}`;
  return {
    type: ACTION_TYPES.FETCH_IMAGEMPRONTUARIO_LIST,
    payload: axios.get<IImagemProntuario>(
      `${requestUrl}${idProntuarioRequest}${imagemRequest}${ativoRequest}${diretorioRequest}cacheBuster=${new Date().getTime()}`
    )
  };
};

export const createEntity: ICrudPutAction<IImagemProntuario> = entity => async dispatch => {
  entity = {
    ...entity
  };
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_IMAGEMPRONTUARIO,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IImagemProntuario> = entity => async dispatch => {
  entity = { ...entity };
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_IMAGEMPRONTUARIO,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IImagemProntuario> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_IMAGEMPRONTUARIO,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});

export const getImagemProntuarioState = (location): IImagemProntuarioBaseState => {
  const url = new URL(`http://localhost${location.search}`); // using a dummy url for parsing
  const baseFilters = url.searchParams.get('baseFilters') || '';
  const idProntuario = url.searchParams.get('idProntuario') || '';
  const imagem = url.searchParams.get('imagem') || '';
  const ativo = url.searchParams.get('ativo') || '';
  const diretorio = url.searchParams.get('diretorio') || '';

  return {
    baseFilters,
    idProntuario,
    imagem,
    ativo,
    diretorio
  };
};
