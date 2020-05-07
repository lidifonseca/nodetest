/* eslint complexity: ["error", 100] */
import axios from 'axios';
import { ICrudGetAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { IPayload } from 'react-jhipster/src/type/redux-action.type';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IMatMed, defaultValue } from 'app/shared/model/mat-med.model';

export const ACTION_TYPES = {
  FETCH_MATMED_LIST_EXPORT: 'matMed/FETCH_MATMED_LIST_EXPORT',
  FETCH_MATMED_LIST: 'matMed/FETCH_MATMED_LIST',
  FETCH_MATMED: 'matMed/FETCH_MATMED',
  CREATE_MATMED: 'matMed/CREATE_MATMED',
  UPDATE_MATMED: 'matMed/UPDATE_MATMED',
  DELETE_MATMED: 'matMed/DELETE_MATMED',
  RESET: 'matMed/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IMatMed>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type MatMedState = Readonly<typeof initialState>;

export interface IMatMedBaseState {
  baseFilters: any;
  nome: any;
  idTipoMatMed: any;
  valor: any;
  ativo: any;
}

export interface IMatMedUpdateState {
  fieldsBase: IMatMedBaseState;
  isNew: boolean;
}

// Reducer

export default (state: MatMedState = initialState, action): MatMedState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_MATMED_LIST_EXPORT):
    case REQUEST(ACTION_TYPES.FETCH_MATMED_LIST):
    case REQUEST(ACTION_TYPES.FETCH_MATMED):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_MATMED):
    case REQUEST(ACTION_TYPES.UPDATE_MATMED):
    case REQUEST(ACTION_TYPES.DELETE_MATMED):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_MATMED_LIST_EXPORT):
    case FAILURE(ACTION_TYPES.FETCH_MATMED_LIST):
    case FAILURE(ACTION_TYPES.FETCH_MATMED):
    case FAILURE(ACTION_TYPES.CREATE_MATMED):
    case FAILURE(ACTION_TYPES.UPDATE_MATMED):
    case FAILURE(ACTION_TYPES.DELETE_MATMED):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_MATMED_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10)
      };
    case SUCCESS(ACTION_TYPES.FETCH_MATMED):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_MATMED):
    case SUCCESS(ACTION_TYPES.UPDATE_MATMED):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_MATMED):
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

const apiUrl = 'api/mat-meds';

// Actions

// Actions
export type ICrudGetAllActionMatMed<T> = (
  nome?: any,
  idTipoMatMed?: any,
  valor?: any,
  ativo?: any,
  page?: number,
  size?: number,
  sort?: string
) => IPayload<T> | ((dispatch: any) => IPayload<T>);

export const getEntities: ICrudGetAllActionMatMed<IMatMed> = (nome, idTipoMatMed, valor, ativo, page, size, sort) => {
  const nomeRequest = nome ? `nome.contains=${nome}&` : '';
  const idTipoMatMedRequest = idTipoMatMed ? `idTipoMatMed.contains=${idTipoMatMed}&` : '';
  const valorRequest = valor ? `valor.contains=${valor}&` : '';
  const ativoRequest = ativo ? `ativo.contains=${ativo}&` : '';

  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}&` : '?'}`;
  return {
    type: ACTION_TYPES.FETCH_MATMED_LIST,
    payload: axios.get<IMatMed>(
      `${requestUrl}${nomeRequest}${idTipoMatMedRequest}${valorRequest}${ativoRequest}cacheBuster=${new Date().getTime()}`
    )
  };
};
export const getEntity: ICrudGetAction<IMatMed> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_MATMED,
    payload: axios.get<IMatMed>(requestUrl)
  };
};

export const getEntitiesExport: ICrudGetAllActionMatMed<IMatMed> = (nome, idTipoMatMed, valor, ativo, page, size, sort) => {
  const nomeRequest = nome ? `nome.contains=${nome}&` : '';
  const idTipoMatMedRequest = idTipoMatMed ? `idTipoMatMed.contains=${idTipoMatMed}&` : '';
  const valorRequest = valor ? `valor.contains=${valor}&` : '';
  const ativoRequest = ativo ? `ativo.contains=${ativo}&` : '';

  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}&` : '?'}`;
  return {
    type: ACTION_TYPES.FETCH_MATMED_LIST,
    payload: axios.get<IMatMed>(
      `${requestUrl}${nomeRequest}${idTipoMatMedRequest}${valorRequest}${ativoRequest}cacheBuster=${new Date().getTime()}`
    )
  };
};

export const createEntity: ICrudPutAction<IMatMed> = entity => async dispatch => {
  entity = {
    ...entity
  };
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_MATMED,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IMatMed> = entity => async dispatch => {
  entity = { ...entity };
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_MATMED,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IMatMed> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_MATMED,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});

export const getMatMedState = (location): IMatMedBaseState => {
  const url = new URL(`http://localhost${location.search}`); // using a dummy url for parsing
  const baseFilters = url.searchParams.get('baseFilters') || '';
  const nome = url.searchParams.get('nome') || '';
  const idTipoMatMed = url.searchParams.get('idTipoMatMed') || '';
  const valor = url.searchParams.get('valor') || '';
  const ativo = url.searchParams.get('ativo') || '';

  return {
    baseFilters,
    nome,
    idTipoMatMed,
    valor,
    ativo
  };
};
