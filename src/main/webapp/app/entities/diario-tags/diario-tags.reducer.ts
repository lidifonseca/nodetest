/* eslint complexity: ["error", 100] */
import axios from 'axios';
import { ICrudGetAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { IPayload } from 'react-jhipster/src/type/redux-action.type';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IDiarioTags, defaultValue } from 'app/shared/model/diario-tags.model';

export const ACTION_TYPES = {
  FETCH_DIARIOTAGS_LIST_EXPORT: 'diarioTags/FETCH_DIARIOTAGS_LIST_EXPORT',
  FETCH_DIARIOTAGS_LIST: 'diarioTags/FETCH_DIARIOTAGS_LIST',
  FETCH_DIARIOTAGS: 'diarioTags/FETCH_DIARIOTAGS',
  CREATE_DIARIOTAGS: 'diarioTags/CREATE_DIARIOTAGS',
  UPDATE_DIARIOTAGS: 'diarioTags/UPDATE_DIARIOTAGS',
  DELETE_DIARIOTAGS: 'diarioTags/DELETE_DIARIOTAGS',
  RESET: 'diarioTags/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IDiarioTags>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type DiarioTagsState = Readonly<typeof initialState>;

export interface IDiarioTagsBaseState {
  baseFilters: any;
  nome: any;
  idPai: any;
  nomeId: any;
  ativo: any;
}

export interface IDiarioTagsUpdateState {
  fieldsBase: IDiarioTagsBaseState;

  isNew: boolean;
}

// Reducer

export default (state: DiarioTagsState = initialState, action): DiarioTagsState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_DIARIOTAGS_LIST_EXPORT):
    case REQUEST(ACTION_TYPES.FETCH_DIARIOTAGS_LIST):
    case REQUEST(ACTION_TYPES.FETCH_DIARIOTAGS):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_DIARIOTAGS):
    case REQUEST(ACTION_TYPES.UPDATE_DIARIOTAGS):
    case REQUEST(ACTION_TYPES.DELETE_DIARIOTAGS):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_DIARIOTAGS_LIST_EXPORT):
    case FAILURE(ACTION_TYPES.FETCH_DIARIOTAGS_LIST):
    case FAILURE(ACTION_TYPES.FETCH_DIARIOTAGS):
    case FAILURE(ACTION_TYPES.CREATE_DIARIOTAGS):
    case FAILURE(ACTION_TYPES.UPDATE_DIARIOTAGS):
    case FAILURE(ACTION_TYPES.DELETE_DIARIOTAGS):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_DIARIOTAGS_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10)
      };
    case SUCCESS(ACTION_TYPES.FETCH_DIARIOTAGS):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_DIARIOTAGS):
    case SUCCESS(ACTION_TYPES.UPDATE_DIARIOTAGS):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_DIARIOTAGS):
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

const apiUrl = 'api/diario-tags';

// Actions

// Actions
export type ICrudGetAllActionDiarioTags<T> = (
  nome?: any,
  idPai?: any,
  nomeId?: any,
  ativo?: any,
  page?: number,
  size?: number,
  sort?: string
) => IPayload<T> | ((dispatch: any) => IPayload<T>);

export const getEntities: ICrudGetAllActionDiarioTags<IDiarioTags> = (nome, idPai, nomeId, ativo, page, size, sort) => {
  const nomeRequest = nome ? `nome.contains=${nome}&` : '';
  const idPaiRequest = idPai ? `idPai.contains=${idPai}&` : '';
  const nomeIdRequest = nomeId ? `nomeId.contains=${nomeId}&` : '';
  const ativoRequest = ativo ? `ativo.contains=${ativo}&` : '';

  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}&` : '?'}`;
  return {
    type: ACTION_TYPES.FETCH_DIARIOTAGS_LIST,
    payload: axios.get<IDiarioTags>(
      `${requestUrl}${nomeRequest}${idPaiRequest}${nomeIdRequest}${ativoRequest}cacheBuster=${new Date().getTime()}`
    )
  };
};
export const getEntity: ICrudGetAction<IDiarioTags> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_DIARIOTAGS,
    payload: axios.get<IDiarioTags>(requestUrl)
  };
};

export const getEntitiesExport: ICrudGetAllActionDiarioTags<IDiarioTags> = (nome, idPai, nomeId, ativo, page, size, sort) => {
  const nomeRequest = nome ? `nome.contains=${nome}&` : '';
  const idPaiRequest = idPai ? `idPai.contains=${idPai}&` : '';
  const nomeIdRequest = nomeId ? `nomeId.contains=${nomeId}&` : '';
  const ativoRequest = ativo ? `ativo.contains=${ativo}&` : '';

  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}&` : '?'}`;
  return {
    type: ACTION_TYPES.FETCH_DIARIOTAGS_LIST,
    payload: axios.get<IDiarioTags>(
      `${requestUrl}${nomeRequest}${idPaiRequest}${nomeIdRequest}${ativoRequest}cacheBuster=${new Date().getTime()}`
    )
  };
};

export const createEntity: ICrudPutAction<IDiarioTags> = entity => async dispatch => {
  entity = {
    ...entity
  };
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_DIARIOTAGS,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IDiarioTags> = entity => async dispatch => {
  entity = { ...entity };
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_DIARIOTAGS,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IDiarioTags> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_DIARIOTAGS,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});

export const getDiarioTagsState = (location): IDiarioTagsBaseState => {
  const url = new URL(`http://localhost${location.search}`); // using a dummy url for parsing
  const baseFilters = url.searchParams.get('baseFilters') || '';
  const nome = url.searchParams.get('nome') || '';
  const idPai = url.searchParams.get('idPai') || '';
  const nomeId = url.searchParams.get('nomeId') || '';
  const ativo = url.searchParams.get('ativo') || '';

  return {
    baseFilters,
    nome,
    idPai,
    nomeId,
    ativo
  };
};
