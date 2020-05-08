/* eslint complexity: ["error", 100] */
import axios from 'axios';
import { ICrudGetAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { IPayload } from 'react-jhipster/src/type/redux-action.type';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IMotivoPs, defaultValue } from 'app/shared/model/motivo-ps.model';

export const ACTION_TYPES = {
  FETCH_MOTIVOPS_LIST_EXPORT: 'motivoPs/FETCH_MOTIVOPS_LIST_EXPORT',
  FETCH_MOTIVOPS_LIST: 'motivoPs/FETCH_MOTIVOPS_LIST',
  FETCH_MOTIVOPS: 'motivoPs/FETCH_MOTIVOPS',
  CREATE_MOTIVOPS: 'motivoPs/CREATE_MOTIVOPS',
  UPDATE_MOTIVOPS: 'motivoPs/UPDATE_MOTIVOPS',
  DELETE_MOTIVOPS: 'motivoPs/DELETE_MOTIVOPS',
  RESET: 'motivoPs/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IMotivoPs>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type MotivoPsState = Readonly<typeof initialState>;

export interface IMotivoPsBaseState {
  baseFilters: any;
  nome: any;
  idPai: any;
  ativo: any;
  classe: any;
  name: any;
}

export interface IMotivoPsUpdateState {
  fieldsBase: IMotivoPsBaseState;

  isNew: boolean;
}

// Reducer

export default (state: MotivoPsState = initialState, action): MotivoPsState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_MOTIVOPS_LIST_EXPORT):
    case REQUEST(ACTION_TYPES.FETCH_MOTIVOPS_LIST):
    case REQUEST(ACTION_TYPES.FETCH_MOTIVOPS):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_MOTIVOPS):
    case REQUEST(ACTION_TYPES.UPDATE_MOTIVOPS):
    case REQUEST(ACTION_TYPES.DELETE_MOTIVOPS):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_MOTIVOPS_LIST_EXPORT):
    case FAILURE(ACTION_TYPES.FETCH_MOTIVOPS_LIST):
    case FAILURE(ACTION_TYPES.FETCH_MOTIVOPS):
    case FAILURE(ACTION_TYPES.CREATE_MOTIVOPS):
    case FAILURE(ACTION_TYPES.UPDATE_MOTIVOPS):
    case FAILURE(ACTION_TYPES.DELETE_MOTIVOPS):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_MOTIVOPS_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10)
      };
    case SUCCESS(ACTION_TYPES.FETCH_MOTIVOPS):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_MOTIVOPS):
    case SUCCESS(ACTION_TYPES.UPDATE_MOTIVOPS):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_MOTIVOPS):
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

const apiUrl = 'api/motivo-ps';

// Actions

// Actions
export type ICrudGetAllActionMotivoPs<T> = (
  nome?: any,
  idPai?: any,
  ativo?: any,
  classe?: any,
  name?: any,
  page?: number,
  size?: number,
  sort?: string
) => IPayload<T> | ((dispatch: any) => IPayload<T>);

export const getEntities: ICrudGetAllActionMotivoPs<IMotivoPs> = (nome, idPai, ativo, classe, name, page, size, sort) => {
  const nomeRequest = nome ? `nome.contains=${nome}&` : '';
  const idPaiRequest = idPai ? `idPai.contains=${idPai}&` : '';
  const ativoRequest = ativo ? `ativo.contains=${ativo}&` : '';
  const classeRequest = classe ? `classe.contains=${classe}&` : '';
  const nameRequest = name ? `name.contains=${name}&` : '';

  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}&` : '?'}`;
  return {
    type: ACTION_TYPES.FETCH_MOTIVOPS_LIST,
    payload: axios.get<IMotivoPs>(
      `${requestUrl}${nomeRequest}${idPaiRequest}${ativoRequest}${classeRequest}${nameRequest}cacheBuster=${new Date().getTime()}`
    )
  };
};
export const getEntity: ICrudGetAction<IMotivoPs> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_MOTIVOPS,
    payload: axios.get<IMotivoPs>(requestUrl)
  };
};

export const getEntitiesExport: ICrudGetAllActionMotivoPs<IMotivoPs> = (nome, idPai, ativo, classe, name, page, size, sort) => {
  const nomeRequest = nome ? `nome.contains=${nome}&` : '';
  const idPaiRequest = idPai ? `idPai.contains=${idPai}&` : '';
  const ativoRequest = ativo ? `ativo.contains=${ativo}&` : '';
  const classeRequest = classe ? `classe.contains=${classe}&` : '';
  const nameRequest = name ? `name.contains=${name}&` : '';

  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}&` : '?'}`;
  return {
    type: ACTION_TYPES.FETCH_MOTIVOPS_LIST,
    payload: axios.get<IMotivoPs>(
      `${requestUrl}${nomeRequest}${idPaiRequest}${ativoRequest}${classeRequest}${nameRequest}cacheBuster=${new Date().getTime()}`
    )
  };
};

export const createEntity: ICrudPutAction<IMotivoPs> = entity => async dispatch => {
  entity = {
    ...entity
  };
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_MOTIVOPS,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IMotivoPs> = entity => async dispatch => {
  entity = { ...entity };
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_MOTIVOPS,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IMotivoPs> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_MOTIVOPS,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});

export const getMotivoPsState = (location): IMotivoPsBaseState => {
  const url = new URL(`http://localhost${location.search}`); // using a dummy url for parsing
  const baseFilters = url.searchParams.get('baseFilters') || '';
  const nome = url.searchParams.get('nome') || '';
  const idPai = url.searchParams.get('idPai') || '';
  const ativo = url.searchParams.get('ativo') || '';
  const classe = url.searchParams.get('classe') || '';
  const name = url.searchParams.get('name') || '';

  return {
    baseFilters,
    nome,
    idPai,
    ativo,
    classe,
    name
  };
};
