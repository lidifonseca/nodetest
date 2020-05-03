/* eslint complexity: ["error", 100] */
import axios from 'axios';
import { ICrudGetAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { IPayload } from 'react-jhipster/src/type/redux-action.type';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IPacienteMotivoInternacao, defaultValue } from 'app/shared/model/paciente-motivo-internacao.model';

export const ACTION_TYPES = {
  FETCH_PACIENTEMOTIVOINTERNACAO_LIST: 'pacienteMotivoInternacao/FETCH_PACIENTEMOTIVOINTERNACAO_LIST',
  FETCH_PACIENTEMOTIVOINTERNACAO: 'pacienteMotivoInternacao/FETCH_PACIENTEMOTIVOINTERNACAO',
  CREATE_PACIENTEMOTIVOINTERNACAO: 'pacienteMotivoInternacao/CREATE_PACIENTEMOTIVOINTERNACAO',
  UPDATE_PACIENTEMOTIVOINTERNACAO: 'pacienteMotivoInternacao/UPDATE_PACIENTEMOTIVOINTERNACAO',
  DELETE_PACIENTEMOTIVOINTERNACAO: 'pacienteMotivoInternacao/DELETE_PACIENTEMOTIVOINTERNACAO',
  RESET: 'pacienteMotivoInternacao/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IPacienteMotivoInternacao>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type PacienteMotivoInternacaoState = Readonly<typeof initialState>;

// Reducer

export default (state: PacienteMotivoInternacaoState = initialState, action): PacienteMotivoInternacaoState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_PACIENTEMOTIVOINTERNACAO_LIST):
    case REQUEST(ACTION_TYPES.FETCH_PACIENTEMOTIVOINTERNACAO):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_PACIENTEMOTIVOINTERNACAO):
    case REQUEST(ACTION_TYPES.UPDATE_PACIENTEMOTIVOINTERNACAO):
    case REQUEST(ACTION_TYPES.DELETE_PACIENTEMOTIVOINTERNACAO):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_PACIENTEMOTIVOINTERNACAO_LIST):
    case FAILURE(ACTION_TYPES.FETCH_PACIENTEMOTIVOINTERNACAO):
    case FAILURE(ACTION_TYPES.CREATE_PACIENTEMOTIVOINTERNACAO):
    case FAILURE(ACTION_TYPES.UPDATE_PACIENTEMOTIVOINTERNACAO):
    case FAILURE(ACTION_TYPES.DELETE_PACIENTEMOTIVOINTERNACAO):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_PACIENTEMOTIVOINTERNACAO_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10)
      };
    case SUCCESS(ACTION_TYPES.FETCH_PACIENTEMOTIVOINTERNACAO):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_PACIENTEMOTIVOINTERNACAO):
    case SUCCESS(ACTION_TYPES.UPDATE_PACIENTEMOTIVOINTERNACAO):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_PACIENTEMOTIVOINTERNACAO):
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

const apiUrl = 'api/paciente-motivo-internacaos';

// Actions

// Actions
export type ICrudGetAllActionPacienteMotivoInternacao<T> = (
  idPaciente?: any,
  idMotivoInternacao?: any,
  idUsuario?: any,
  dataPost?: any,
  page?: number,
  size?: number,
  sort?: string
) => IPayload<T> | ((dispatch: any) => IPayload<T>);

export const getEntities: ICrudGetAllActionPacienteMotivoInternacao<IPacienteMotivoInternacao> = (
  idPaciente,
  idMotivoInternacao,
  idUsuario,
  dataPost,
  page,
  size,
  sort
) => {
  const idPacienteRequest = idPaciente ? `idPaciente.contains=${idPaciente}&` : '';
  const idMotivoInternacaoRequest = idMotivoInternacao ? `idMotivoInternacao.contains=${idMotivoInternacao}&` : '';
  const idUsuarioRequest = idUsuario ? `idUsuario.contains=${idUsuario}&` : '';
  const dataPostRequest = dataPost ? `dataPost.contains=${dataPost}&` : '';

  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}&` : '?'}`;
  return {
    type: ACTION_TYPES.FETCH_PACIENTEMOTIVOINTERNACAO_LIST,
    payload: axios.get<IPacienteMotivoInternacao>(
      `${requestUrl}${idPacienteRequest}${idMotivoInternacaoRequest}${idUsuarioRequest}${dataPostRequest}cacheBuster=${new Date().getTime()}`
    )
  };
};
export const getEntity: ICrudGetAction<IPacienteMotivoInternacao> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_PACIENTEMOTIVOINTERNACAO,
    payload: axios.get<IPacienteMotivoInternacao>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IPacienteMotivoInternacao> = entity => async dispatch => {
  entity = {
    ...entity
  };
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_PACIENTEMOTIVOINTERNACAO,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IPacienteMotivoInternacao> = entity => async dispatch => {
  entity = { ...entity };
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_PACIENTEMOTIVOINTERNACAO,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IPacienteMotivoInternacao> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_PACIENTEMOTIVOINTERNACAO,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
