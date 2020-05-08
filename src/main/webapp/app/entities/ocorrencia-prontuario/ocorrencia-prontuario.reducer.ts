/* eslint complexity: ["error", 100] */
import axios from 'axios';
import { ICrudGetAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { IPayload } from 'react-jhipster/src/type/redux-action.type';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IOcorrenciaProntuario, defaultValue } from 'app/shared/model/ocorrencia-prontuario.model';

export const ACTION_TYPES = {
  FETCH_OCORRENCIAPRONTUARIO_LIST_EXPORT: 'ocorrenciaProntuario/FETCH_OCORRENCIAPRONTUARIO_LIST_EXPORT',
  FETCH_OCORRENCIAPRONTUARIO_LIST: 'ocorrenciaProntuario/FETCH_OCORRENCIAPRONTUARIO_LIST',
  FETCH_OCORRENCIAPRONTUARIO: 'ocorrenciaProntuario/FETCH_OCORRENCIAPRONTUARIO',
  CREATE_OCORRENCIAPRONTUARIO: 'ocorrenciaProntuario/CREATE_OCORRENCIAPRONTUARIO',
  UPDATE_OCORRENCIAPRONTUARIO: 'ocorrenciaProntuario/UPDATE_OCORRENCIAPRONTUARIO',
  DELETE_OCORRENCIAPRONTUARIO: 'ocorrenciaProntuario/DELETE_OCORRENCIAPRONTUARIO',
  RESET: 'ocorrenciaProntuario/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IOcorrenciaProntuario>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type OcorrenciaProntuarioState = Readonly<typeof initialState>;

export interface IOcorrenciaProntuarioBaseState {
  baseFilters: any;
  nome: any;
  ativo: any;
}

export interface IOcorrenciaProntuarioUpdateState {
  fieldsBase: IOcorrenciaProntuarioBaseState;

  isNew: boolean;
}

// Reducer

export default (state: OcorrenciaProntuarioState = initialState, action): OcorrenciaProntuarioState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_OCORRENCIAPRONTUARIO_LIST_EXPORT):
    case REQUEST(ACTION_TYPES.FETCH_OCORRENCIAPRONTUARIO_LIST):
    case REQUEST(ACTION_TYPES.FETCH_OCORRENCIAPRONTUARIO):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_OCORRENCIAPRONTUARIO):
    case REQUEST(ACTION_TYPES.UPDATE_OCORRENCIAPRONTUARIO):
    case REQUEST(ACTION_TYPES.DELETE_OCORRENCIAPRONTUARIO):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_OCORRENCIAPRONTUARIO_LIST_EXPORT):
    case FAILURE(ACTION_TYPES.FETCH_OCORRENCIAPRONTUARIO_LIST):
    case FAILURE(ACTION_TYPES.FETCH_OCORRENCIAPRONTUARIO):
    case FAILURE(ACTION_TYPES.CREATE_OCORRENCIAPRONTUARIO):
    case FAILURE(ACTION_TYPES.UPDATE_OCORRENCIAPRONTUARIO):
    case FAILURE(ACTION_TYPES.DELETE_OCORRENCIAPRONTUARIO):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_OCORRENCIAPRONTUARIO_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10)
      };
    case SUCCESS(ACTION_TYPES.FETCH_OCORRENCIAPRONTUARIO):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_OCORRENCIAPRONTUARIO):
    case SUCCESS(ACTION_TYPES.UPDATE_OCORRENCIAPRONTUARIO):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_OCORRENCIAPRONTUARIO):
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

const apiUrl = 'api/ocorrencia-prontuarios';

// Actions

// Actions
export type ICrudGetAllActionOcorrenciaProntuario<T> = (
  nome?: any,
  ativo?: any,
  page?: number,
  size?: number,
  sort?: string
) => IPayload<T> | ((dispatch: any) => IPayload<T>);

export const getEntities: ICrudGetAllActionOcorrenciaProntuario<IOcorrenciaProntuario> = (nome, ativo, page, size, sort) => {
  const nomeRequest = nome ? `nome.contains=${nome}&` : '';
  const ativoRequest = ativo ? `ativo.contains=${ativo}&` : '';

  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}&` : '?'}`;
  return {
    type: ACTION_TYPES.FETCH_OCORRENCIAPRONTUARIO_LIST,
    payload: axios.get<IOcorrenciaProntuario>(`${requestUrl}${nomeRequest}${ativoRequest}cacheBuster=${new Date().getTime()}`)
  };
};
export const getEntity: ICrudGetAction<IOcorrenciaProntuario> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_OCORRENCIAPRONTUARIO,
    payload: axios.get<IOcorrenciaProntuario>(requestUrl)
  };
};

export const getEntitiesExport: ICrudGetAllActionOcorrenciaProntuario<IOcorrenciaProntuario> = (nome, ativo, page, size, sort) => {
  const nomeRequest = nome ? `nome.contains=${nome}&` : '';
  const ativoRequest = ativo ? `ativo.contains=${ativo}&` : '';

  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}&` : '?'}`;
  return {
    type: ACTION_TYPES.FETCH_OCORRENCIAPRONTUARIO_LIST,
    payload: axios.get<IOcorrenciaProntuario>(`${requestUrl}${nomeRequest}${ativoRequest}cacheBuster=${new Date().getTime()}`)
  };
};

export const createEntity: ICrudPutAction<IOcorrenciaProntuario> = entity => async dispatch => {
  entity = {
    ...entity
  };
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_OCORRENCIAPRONTUARIO,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IOcorrenciaProntuario> = entity => async dispatch => {
  entity = { ...entity };
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_OCORRENCIAPRONTUARIO,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IOcorrenciaProntuario> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_OCORRENCIAPRONTUARIO,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});

export const getOcorrenciaProntuarioState = (location): IOcorrenciaProntuarioBaseState => {
  const url = new URL(`http://localhost${location.search}`); // using a dummy url for parsing
  const baseFilters = url.searchParams.get('baseFilters') || '';
  const nome = url.searchParams.get('nome') || '';
  const ativo = url.searchParams.get('ativo') || '';

  return {
    baseFilters,
    nome,
    ativo
  };
};
