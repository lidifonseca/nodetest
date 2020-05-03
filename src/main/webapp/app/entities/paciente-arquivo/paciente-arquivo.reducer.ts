/* eslint complexity: ["error", 100] */
import axios from 'axios';
import { ICrudGetAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { IPayload } from 'react-jhipster/src/type/redux-action.type';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IPacienteArquivo, defaultValue } from 'app/shared/model/paciente-arquivo.model';

export const ACTION_TYPES = {
  FETCH_PACIENTEARQUIVO_LIST: 'pacienteArquivo/FETCH_PACIENTEARQUIVO_LIST',
  FETCH_PACIENTEARQUIVO: 'pacienteArquivo/FETCH_PACIENTEARQUIVO',
  CREATE_PACIENTEARQUIVO: 'pacienteArquivo/CREATE_PACIENTEARQUIVO',
  UPDATE_PACIENTEARQUIVO: 'pacienteArquivo/UPDATE_PACIENTEARQUIVO',
  DELETE_PACIENTEARQUIVO: 'pacienteArquivo/DELETE_PACIENTEARQUIVO',
  RESET: 'pacienteArquivo/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IPacienteArquivo>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type PacienteArquivoState = Readonly<typeof initialState>;

// Reducer

export default (state: PacienteArquivoState = initialState, action): PacienteArquivoState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_PACIENTEARQUIVO_LIST):
    case REQUEST(ACTION_TYPES.FETCH_PACIENTEARQUIVO):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_PACIENTEARQUIVO):
    case REQUEST(ACTION_TYPES.UPDATE_PACIENTEARQUIVO):
    case REQUEST(ACTION_TYPES.DELETE_PACIENTEARQUIVO):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_PACIENTEARQUIVO_LIST):
    case FAILURE(ACTION_TYPES.FETCH_PACIENTEARQUIVO):
    case FAILURE(ACTION_TYPES.CREATE_PACIENTEARQUIVO):
    case FAILURE(ACTION_TYPES.UPDATE_PACIENTEARQUIVO):
    case FAILURE(ACTION_TYPES.DELETE_PACIENTEARQUIVO):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_PACIENTEARQUIVO_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10)
      };
    case SUCCESS(ACTION_TYPES.FETCH_PACIENTEARQUIVO):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_PACIENTEARQUIVO):
    case SUCCESS(ACTION_TYPES.UPDATE_PACIENTEARQUIVO):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_PACIENTEARQUIVO):
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

const apiUrl = 'api/paciente-arquivos';

// Actions

// Actions
export type ICrudGetAllActionPacienteArquivo<T> = (
  idPaciente?: any,
  arquivo?: any,
  ativo?: any,
  dataPost?: any,
  page?: number,
  size?: number,
  sort?: string
) => IPayload<T> | ((dispatch: any) => IPayload<T>);

export const getEntities: ICrudGetAllActionPacienteArquivo<IPacienteArquivo> = (idPaciente, arquivo, ativo, dataPost, page, size, sort) => {
  const idPacienteRequest = idPaciente ? `idPaciente.contains=${idPaciente}&` : '';
  const arquivoRequest = arquivo ? `arquivo.contains=${arquivo}&` : '';
  const ativoRequest = ativo ? `ativo.contains=${ativo}&` : '';
  const dataPostRequest = dataPost ? `dataPost.contains=${dataPost}&` : '';

  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}&` : '?'}`;
  return {
    type: ACTION_TYPES.FETCH_PACIENTEARQUIVO_LIST,
    payload: axios.get<IPacienteArquivo>(
      `${requestUrl}${idPacienteRequest}${arquivoRequest}${ativoRequest}${dataPostRequest}cacheBuster=${new Date().getTime()}`
    )
  };
};
export const getEntity: ICrudGetAction<IPacienteArquivo> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_PACIENTEARQUIVO,
    payload: axios.get<IPacienteArquivo>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IPacienteArquivo> = entity => async dispatch => {
  entity = {
    ...entity
  };
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_PACIENTEARQUIVO,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IPacienteArquivo> = entity => async dispatch => {
  entity = { ...entity };
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_PACIENTEARQUIVO,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IPacienteArquivo> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_PACIENTEARQUIVO,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
