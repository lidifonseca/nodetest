/* eslint complexity: ["error", 100] */
import axios from 'axios';
import { ICrudGetAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { IPayload } from 'react-jhipster/src/type/redux-action.type';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IPacienteDiagnostico, defaultValue } from 'app/shared/model/paciente-diagnostico.model';

export const ACTION_TYPES = {
  FETCH_PACIENTEDIAGNOSTICO_LIST: 'pacienteDiagnostico/FETCH_PACIENTEDIAGNOSTICO_LIST',
  FETCH_PACIENTEDIAGNOSTICO: 'pacienteDiagnostico/FETCH_PACIENTEDIAGNOSTICO',
  CREATE_PACIENTEDIAGNOSTICO: 'pacienteDiagnostico/CREATE_PACIENTEDIAGNOSTICO',
  UPDATE_PACIENTEDIAGNOSTICO: 'pacienteDiagnostico/UPDATE_PACIENTEDIAGNOSTICO',
  DELETE_PACIENTEDIAGNOSTICO: 'pacienteDiagnostico/DELETE_PACIENTEDIAGNOSTICO',
  RESET: 'pacienteDiagnostico/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IPacienteDiagnostico>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type PacienteDiagnosticoState = Readonly<typeof initialState>;

// Reducer

export default (state: PacienteDiagnosticoState = initialState, action): PacienteDiagnosticoState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_PACIENTEDIAGNOSTICO_LIST):
    case REQUEST(ACTION_TYPES.FETCH_PACIENTEDIAGNOSTICO):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_PACIENTEDIAGNOSTICO):
    case REQUEST(ACTION_TYPES.UPDATE_PACIENTEDIAGNOSTICO):
    case REQUEST(ACTION_TYPES.DELETE_PACIENTEDIAGNOSTICO):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_PACIENTEDIAGNOSTICO_LIST):
    case FAILURE(ACTION_TYPES.FETCH_PACIENTEDIAGNOSTICO):
    case FAILURE(ACTION_TYPES.CREATE_PACIENTEDIAGNOSTICO):
    case FAILURE(ACTION_TYPES.UPDATE_PACIENTEDIAGNOSTICO):
    case FAILURE(ACTION_TYPES.DELETE_PACIENTEDIAGNOSTICO):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_PACIENTEDIAGNOSTICO_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10)
      };
    case SUCCESS(ACTION_TYPES.FETCH_PACIENTEDIAGNOSTICO):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_PACIENTEDIAGNOSTICO):
    case SUCCESS(ACTION_TYPES.UPDATE_PACIENTEDIAGNOSTICO):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_PACIENTEDIAGNOSTICO):
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

const apiUrl = 'api/paciente-diagnosticos';

// Actions

// Actions
export type ICrudGetAllActionPacienteDiagnostico<T> = (
  observacao?: any,
  ativo?: any,
  dataPost?: any,
  cidPrimario?: any,
  complexidade?: any,
  cidComAlta?: any,
  idPaciente?: any,
  idCid?: any,
  page?: number,
  size?: number,
  sort?: string
) => IPayload<T> | ((dispatch: any) => IPayload<T>);

export const getEntities: ICrudGetAllActionPacienteDiagnostico<IPacienteDiagnostico> = (
  observacao,
  ativo,
  dataPost,
  cidPrimario,
  complexidade,
  cidComAlta,
  idPaciente,
  idCid,
  page,
  size,
  sort
) => {
  const observacaoRequest = observacao ? `observacao.contains=${observacao}&` : '';
  const ativoRequest = ativo ? `ativo.contains=${ativo}&` : '';
  const dataPostRequest = dataPost ? `dataPost.contains=${dataPost}&` : '';
  const cidPrimarioRequest = cidPrimario ? `cidPrimario.contains=${cidPrimario}&` : '';
  const complexidadeRequest = complexidade ? `complexidade.contains=${complexidade}&` : '';
  const cidComAltaRequest = cidComAlta ? `cidComAlta.contains=${cidComAlta}&` : '';
  const idPacienteRequest = idPaciente ? `idPaciente.equals=${idPaciente}&` : '';
  const idCidRequest = idCid ? `idCid.equals=${idCid}&` : '';

  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}&` : '?'}`;
  return {
    type: ACTION_TYPES.FETCH_PACIENTEDIAGNOSTICO_LIST,
    payload: axios.get<IPacienteDiagnostico>(
      `${requestUrl}${observacaoRequest}${ativoRequest}${dataPostRequest}${cidPrimarioRequest}${complexidadeRequest}${cidComAltaRequest}${idPacienteRequest}${idCidRequest}cacheBuster=${new Date().getTime()}`
    )
  };
};
export const getEntity: ICrudGetAction<IPacienteDiagnostico> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_PACIENTEDIAGNOSTICO,
    payload: axios.get<IPacienteDiagnostico>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IPacienteDiagnostico> = entity => async dispatch => {
  entity = {
    ...entity,
    idPaciente: entity.idPaciente === 'null' ? null : entity.idPaciente,
    idCid: entity.idCid === 'null' ? null : entity.idCid
  };
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_PACIENTEDIAGNOSTICO,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IPacienteDiagnostico> = entity => async dispatch => {
  entity = {
    ...entity,
    idPaciente: entity.idPaciente === 'null' ? null : entity.idPaciente,
    idCid: entity.idCid === 'null' ? null : entity.idCid
  };
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_PACIENTEDIAGNOSTICO,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IPacienteDiagnostico> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_PACIENTEDIAGNOSTICO,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
