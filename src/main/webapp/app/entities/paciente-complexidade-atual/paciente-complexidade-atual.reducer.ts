/* eslint complexity: ["error", 100] */
import axios from 'axios';
import { ICrudGetAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { IPayload } from 'react-jhipster/src/type/redux-action.type';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IPacienteComplexidadeAtual, defaultValue } from 'app/shared/model/paciente-complexidade-atual.model';

export const ACTION_TYPES = {
  FETCH_PACIENTECOMPLEXIDADEATUAL_LIST: 'pacienteComplexidadeAtual/FETCH_PACIENTECOMPLEXIDADEATUAL_LIST',
  FETCH_PACIENTECOMPLEXIDADEATUAL: 'pacienteComplexidadeAtual/FETCH_PACIENTECOMPLEXIDADEATUAL',
  CREATE_PACIENTECOMPLEXIDADEATUAL: 'pacienteComplexidadeAtual/CREATE_PACIENTECOMPLEXIDADEATUAL',
  UPDATE_PACIENTECOMPLEXIDADEATUAL: 'pacienteComplexidadeAtual/UPDATE_PACIENTECOMPLEXIDADEATUAL',
  DELETE_PACIENTECOMPLEXIDADEATUAL: 'pacienteComplexidadeAtual/DELETE_PACIENTECOMPLEXIDADEATUAL',
  RESET: 'pacienteComplexidadeAtual/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IPacienteComplexidadeAtual>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type PacienteComplexidadeAtualState = Readonly<typeof initialState>;

// Reducer

export default (state: PacienteComplexidadeAtualState = initialState, action): PacienteComplexidadeAtualState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_PACIENTECOMPLEXIDADEATUAL_LIST):
    case REQUEST(ACTION_TYPES.FETCH_PACIENTECOMPLEXIDADEATUAL):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_PACIENTECOMPLEXIDADEATUAL):
    case REQUEST(ACTION_TYPES.UPDATE_PACIENTECOMPLEXIDADEATUAL):
    case REQUEST(ACTION_TYPES.DELETE_PACIENTECOMPLEXIDADEATUAL):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_PACIENTECOMPLEXIDADEATUAL_LIST):
    case FAILURE(ACTION_TYPES.FETCH_PACIENTECOMPLEXIDADEATUAL):
    case FAILURE(ACTION_TYPES.CREATE_PACIENTECOMPLEXIDADEATUAL):
    case FAILURE(ACTION_TYPES.UPDATE_PACIENTECOMPLEXIDADEATUAL):
    case FAILURE(ACTION_TYPES.DELETE_PACIENTECOMPLEXIDADEATUAL):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_PACIENTECOMPLEXIDADEATUAL_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10)
      };
    case SUCCESS(ACTION_TYPES.FETCH_PACIENTECOMPLEXIDADEATUAL):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_PACIENTECOMPLEXIDADEATUAL):
    case SUCCESS(ACTION_TYPES.UPDATE_PACIENTECOMPLEXIDADEATUAL):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_PACIENTECOMPLEXIDADEATUAL):
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

const apiUrl = 'api/paciente-complexidade-atuals';

// Actions

// Actions
export type ICrudGetAllActionPacienteComplexidadeAtual<T> = (
  idPaciente?: any,
  idPacienteComplexidade?: any,
  baixa?: any,
  media?: any,
  alta?: any,
  ventilacaoMecanica?: any,
  telemonitoramente?: any,
  idUsuario?: any,
  dataPost?: any,
  page?: number,
  size?: number,
  sort?: string
) => IPayload<T> | ((dispatch: any) => IPayload<T>);

export const getEntities: ICrudGetAllActionPacienteComplexidadeAtual<IPacienteComplexidadeAtual> = (
  idPaciente,
  idPacienteComplexidade,
  baixa,
  media,
  alta,
  ventilacaoMecanica,
  telemonitoramente,
  idUsuario,
  dataPost,
  page,
  size,
  sort
) => {
  const idPacienteRequest = idPaciente ? `idPaciente.contains=${idPaciente}&` : '';
  const idPacienteComplexidadeRequest = idPacienteComplexidade ? `idPacienteComplexidade.contains=${idPacienteComplexidade}&` : '';
  const baixaRequest = baixa ? `baixa.contains=${baixa}&` : '';
  const mediaRequest = media ? `media.contains=${media}&` : '';
  const altaRequest = alta ? `alta.contains=${alta}&` : '';
  const ventilacaoMecanicaRequest = ventilacaoMecanica ? `ventilacaoMecanica.contains=${ventilacaoMecanica}&` : '';
  const telemonitoramenteRequest = telemonitoramente ? `telemonitoramente.contains=${telemonitoramente}&` : '';
  const idUsuarioRequest = idUsuario ? `idUsuario.contains=${idUsuario}&` : '';
  const dataPostRequest = dataPost ? `dataPost.contains=${dataPost}&` : '';

  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}&` : '?'}`;
  return {
    type: ACTION_TYPES.FETCH_PACIENTECOMPLEXIDADEATUAL_LIST,
    payload: axios.get<IPacienteComplexidadeAtual>(
      `${requestUrl}${idPacienteRequest}${idPacienteComplexidadeRequest}${baixaRequest}${mediaRequest}${altaRequest}${ventilacaoMecanicaRequest}${telemonitoramenteRequest}${idUsuarioRequest}${dataPostRequest}cacheBuster=${new Date().getTime()}`
    )
  };
};
export const getEntity: ICrudGetAction<IPacienteComplexidadeAtual> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_PACIENTECOMPLEXIDADEATUAL,
    payload: axios.get<IPacienteComplexidadeAtual>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IPacienteComplexidadeAtual> = entity => async dispatch => {
  entity = {
    ...entity
  };
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_PACIENTECOMPLEXIDADEATUAL,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IPacienteComplexidadeAtual> = entity => async dispatch => {
  entity = { ...entity };
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_PACIENTECOMPLEXIDADEATUAL,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IPacienteComplexidadeAtual> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_PACIENTECOMPLEXIDADEATUAL,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
