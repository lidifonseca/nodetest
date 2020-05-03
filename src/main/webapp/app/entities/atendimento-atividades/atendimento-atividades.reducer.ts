/* eslint complexity: ["error", 100] */
import axios from 'axios';
import { ICrudGetAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { IPayload } from 'react-jhipster/src/type/redux-action.type';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IAtendimentoAtividades, defaultValue } from 'app/shared/model/atendimento-atividades.model';

export const ACTION_TYPES = {
  FETCH_ATENDIMENTOATIVIDADES_LIST: 'atendimentoAtividades/FETCH_ATENDIMENTOATIVIDADES_LIST',
  FETCH_ATENDIMENTOATIVIDADES: 'atendimentoAtividades/FETCH_ATENDIMENTOATIVIDADES',
  CREATE_ATENDIMENTOATIVIDADES: 'atendimentoAtividades/CREATE_ATENDIMENTOATIVIDADES',
  UPDATE_ATENDIMENTOATIVIDADES: 'atendimentoAtividades/UPDATE_ATENDIMENTOATIVIDADES',
  DELETE_ATENDIMENTOATIVIDADES: 'atendimentoAtividades/DELETE_ATENDIMENTOATIVIDADES',
  RESET: 'atendimentoAtividades/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IAtendimentoAtividades>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type AtendimentoAtividadesState = Readonly<typeof initialState>;

// Reducer

export default (state: AtendimentoAtividadesState = initialState, action): AtendimentoAtividadesState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_ATENDIMENTOATIVIDADES_LIST):
    case REQUEST(ACTION_TYPES.FETCH_ATENDIMENTOATIVIDADES):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_ATENDIMENTOATIVIDADES):
    case REQUEST(ACTION_TYPES.UPDATE_ATENDIMENTOATIVIDADES):
    case REQUEST(ACTION_TYPES.DELETE_ATENDIMENTOATIVIDADES):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_ATENDIMENTOATIVIDADES_LIST):
    case FAILURE(ACTION_TYPES.FETCH_ATENDIMENTOATIVIDADES):
    case FAILURE(ACTION_TYPES.CREATE_ATENDIMENTOATIVIDADES):
    case FAILURE(ACTION_TYPES.UPDATE_ATENDIMENTOATIVIDADES):
    case FAILURE(ACTION_TYPES.DELETE_ATENDIMENTOATIVIDADES):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_ATENDIMENTOATIVIDADES_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10)
      };
    case SUCCESS(ACTION_TYPES.FETCH_ATENDIMENTOATIVIDADES):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_ATENDIMENTOATIVIDADES):
    case SUCCESS(ACTION_TYPES.UPDATE_ATENDIMENTOATIVIDADES):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_ATENDIMENTOATIVIDADES):
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

const apiUrl = 'api/atendimento-atividades';

// Actions

// Actions
export type ICrudGetAllActionAtendimentoAtividades<T> = (
  feito?: any,
  idAtividade?: any,
  idAtendimento?: any,
  page?: number,
  size?: number,
  sort?: string
) => IPayload<T> | ((dispatch: any) => IPayload<T>);

export const getEntities: ICrudGetAllActionAtendimentoAtividades<IAtendimentoAtividades> = (
  feito,
  idAtividade,
  idAtendimento,
  page,
  size,
  sort
) => {
  const feitoRequest = feito ? `feito.contains=${feito}&` : '';
  const idAtividadeRequest = idAtividade ? `idAtividade.equals=${idAtividade}&` : '';
  const idAtendimentoRequest = idAtendimento ? `idAtendimento.equals=${idAtendimento}&` : '';

  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}&` : '?'}`;
  return {
    type: ACTION_TYPES.FETCH_ATENDIMENTOATIVIDADES_LIST,
    payload: axios.get<IAtendimentoAtividades>(
      `${requestUrl}${feitoRequest}${idAtividadeRequest}${idAtendimentoRequest}cacheBuster=${new Date().getTime()}`
    )
  };
};
export const getEntity: ICrudGetAction<IAtendimentoAtividades> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_ATENDIMENTOATIVIDADES,
    payload: axios.get<IAtendimentoAtividades>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IAtendimentoAtividades> = entity => async dispatch => {
  entity = {
    ...entity,
    idAtividade: entity.idAtividade === 'null' ? null : entity.idAtividade,
    idAtendimento: entity.idAtendimento === 'null' ? null : entity.idAtendimento
  };
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_ATENDIMENTOATIVIDADES,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IAtendimentoAtividades> = entity => async dispatch => {
  entity = {
    ...entity,
    idAtividade: entity.idAtividade === 'null' ? null : entity.idAtividade,
    idAtendimento: entity.idAtendimento === 'null' ? null : entity.idAtendimento
  };
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_ATENDIMENTOATIVIDADES,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IAtendimentoAtividades> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_ATENDIMENTOATIVIDADES,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
