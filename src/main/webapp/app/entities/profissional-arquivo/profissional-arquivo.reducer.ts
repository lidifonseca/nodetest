/* eslint complexity: ["error", 100] */
import axios from 'axios';
import { ICrudGetAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { IPayload } from 'react-jhipster/src/type/redux-action.type';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IProfissionalArquivo, defaultValue } from 'app/shared/model/profissional-arquivo.model';

export const ACTION_TYPES = {
  FETCH_PROFISSIONALARQUIVO_LIST: 'profissionalArquivo/FETCH_PROFISSIONALARQUIVO_LIST',
  FETCH_PROFISSIONALARQUIVO: 'profissionalArquivo/FETCH_PROFISSIONALARQUIVO',
  CREATE_PROFISSIONALARQUIVO: 'profissionalArquivo/CREATE_PROFISSIONALARQUIVO',
  UPDATE_PROFISSIONALARQUIVO: 'profissionalArquivo/UPDATE_PROFISSIONALARQUIVO',
  DELETE_PROFISSIONALARQUIVO: 'profissionalArquivo/DELETE_PROFISSIONALARQUIVO',
  RESET: 'profissionalArquivo/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IProfissionalArquivo>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type ProfissionalArquivoState = Readonly<typeof initialState>;

// Reducer

export default (state: ProfissionalArquivoState = initialState, action): ProfissionalArquivoState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_PROFISSIONALARQUIVO_LIST):
    case REQUEST(ACTION_TYPES.FETCH_PROFISSIONALARQUIVO):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_PROFISSIONALARQUIVO):
    case REQUEST(ACTION_TYPES.UPDATE_PROFISSIONALARQUIVO):
    case REQUEST(ACTION_TYPES.DELETE_PROFISSIONALARQUIVO):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_PROFISSIONALARQUIVO_LIST):
    case FAILURE(ACTION_TYPES.FETCH_PROFISSIONALARQUIVO):
    case FAILURE(ACTION_TYPES.CREATE_PROFISSIONALARQUIVO):
    case FAILURE(ACTION_TYPES.UPDATE_PROFISSIONALARQUIVO):
    case FAILURE(ACTION_TYPES.DELETE_PROFISSIONALARQUIVO):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_PROFISSIONALARQUIVO_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10)
      };
    case SUCCESS(ACTION_TYPES.FETCH_PROFISSIONALARQUIVO):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_PROFISSIONALARQUIVO):
    case SUCCESS(ACTION_TYPES.UPDATE_PROFISSIONALARQUIVO):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_PROFISSIONALARQUIVO):
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

const apiUrl = 'api/profissional-arquivos';

// Actions

// Actions
export type ICrudGetAllActionProfissionalArquivo<T> = (
  idProfissional?: any,
  arquivo?: any,
  ativo?: any,
  dataPost?: any,
  page?: number,
  size?: number,
  sort?: string
) => IPayload<T> | ((dispatch: any) => IPayload<T>);

export const getEntities: ICrudGetAllActionProfissionalArquivo<IProfissionalArquivo> = (
  idProfissional,
  arquivo,
  ativo,
  dataPost,
  page,
  size,
  sort
) => {
  const idProfissionalRequest = idProfissional ? `idProfissional.contains=${idProfissional}&` : '';
  const arquivoRequest = arquivo ? `arquivo.contains=${arquivo}&` : '';
  const ativoRequest = ativo ? `ativo.contains=${ativo}&` : '';
  const dataPostRequest = dataPost ? `dataPost.contains=${dataPost}&` : '';

  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}&` : '?'}`;
  return {
    type: ACTION_TYPES.FETCH_PROFISSIONALARQUIVO_LIST,
    payload: axios.get<IProfissionalArquivo>(
      `${requestUrl}${idProfissionalRequest}${arquivoRequest}${ativoRequest}${dataPostRequest}cacheBuster=${new Date().getTime()}`
    )
  };
};
export const getEntity: ICrudGetAction<IProfissionalArquivo> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_PROFISSIONALARQUIVO,
    payload: axios.get<IProfissionalArquivo>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IProfissionalArquivo> = entity => async dispatch => {
  entity = {
    ...entity
  };
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_PROFISSIONALARQUIVO,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IProfissionalArquivo> = entity => async dispatch => {
  entity = { ...entity };
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_PROFISSIONALARQUIVO,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IProfissionalArquivo> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_PROFISSIONALARQUIVO,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
