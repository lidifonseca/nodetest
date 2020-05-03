/* eslint complexity: ["error", 100] */
import axios from 'axios';
import { ICrudGetAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { IPayload } from 'react-jhipster/src/type/redux-action.type';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IAtendimentoImagem, defaultValue } from 'app/shared/model/atendimento-imagem.model';

export const ACTION_TYPES = {
  FETCH_ATENDIMENTOIMAGEM_LIST: 'atendimentoImagem/FETCH_ATENDIMENTOIMAGEM_LIST',
  FETCH_ATENDIMENTOIMAGEM: 'atendimentoImagem/FETCH_ATENDIMENTOIMAGEM',
  CREATE_ATENDIMENTOIMAGEM: 'atendimentoImagem/CREATE_ATENDIMENTOIMAGEM',
  UPDATE_ATENDIMENTOIMAGEM: 'atendimentoImagem/UPDATE_ATENDIMENTOIMAGEM',
  DELETE_ATENDIMENTOIMAGEM: 'atendimentoImagem/DELETE_ATENDIMENTOIMAGEM',
  RESET: 'atendimentoImagem/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IAtendimentoImagem>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type AtendimentoImagemState = Readonly<typeof initialState>;

// Reducer

export default (state: AtendimentoImagemState = initialState, action): AtendimentoImagemState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_ATENDIMENTOIMAGEM_LIST):
    case REQUEST(ACTION_TYPES.FETCH_ATENDIMENTOIMAGEM):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_ATENDIMENTOIMAGEM):
    case REQUEST(ACTION_TYPES.UPDATE_ATENDIMENTOIMAGEM):
    case REQUEST(ACTION_TYPES.DELETE_ATENDIMENTOIMAGEM):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_ATENDIMENTOIMAGEM_LIST):
    case FAILURE(ACTION_TYPES.FETCH_ATENDIMENTOIMAGEM):
    case FAILURE(ACTION_TYPES.CREATE_ATENDIMENTOIMAGEM):
    case FAILURE(ACTION_TYPES.UPDATE_ATENDIMENTOIMAGEM):
    case FAILURE(ACTION_TYPES.DELETE_ATENDIMENTOIMAGEM):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_ATENDIMENTOIMAGEM_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10)
      };
    case SUCCESS(ACTION_TYPES.FETCH_ATENDIMENTOIMAGEM):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_ATENDIMENTOIMAGEM):
    case SUCCESS(ACTION_TYPES.UPDATE_ATENDIMENTOIMAGEM):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_ATENDIMENTOIMAGEM):
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

const apiUrl = 'api/atendimento-imagems';

// Actions

// Actions
export type ICrudGetAllActionAtendimentoImagem<T> = (
  atendimentoId?: any,
  imagem?: any,
  criadoEm?: any,
  page?: number,
  size?: number,
  sort?: string
) => IPayload<T> | ((dispatch: any) => IPayload<T>);

export const getEntities: ICrudGetAllActionAtendimentoImagem<IAtendimentoImagem> = (atendimentoId, imagem, criadoEm, page, size, sort) => {
  const atendimentoIdRequest = atendimentoId ? `atendimentoId.contains=${atendimentoId}&` : '';
  const imagemRequest = imagem ? `imagem.contains=${imagem}&` : '';
  const criadoEmRequest = criadoEm ? `criadoEm.contains=${criadoEm}&` : '';

  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}&` : '?'}`;
  return {
    type: ACTION_TYPES.FETCH_ATENDIMENTOIMAGEM_LIST,
    payload: axios.get<IAtendimentoImagem>(
      `${requestUrl}${atendimentoIdRequest}${imagemRequest}${criadoEmRequest}cacheBuster=${new Date().getTime()}`
    )
  };
};
export const getEntity: ICrudGetAction<IAtendimentoImagem> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_ATENDIMENTOIMAGEM,
    payload: axios.get<IAtendimentoImagem>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IAtendimentoImagem> = entity => async dispatch => {
  entity = {
    ...entity
  };
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_ATENDIMENTOIMAGEM,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IAtendimentoImagem> = entity => async dispatch => {
  entity = { ...entity };
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_ATENDIMENTOIMAGEM,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IAtendimentoImagem> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_ATENDIMENTOIMAGEM,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
