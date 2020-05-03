/* eslint complexity: ["error", 100] */
import axios from 'axios';
import { ICrudGetAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { IPayload } from 'react-jhipster/src/type/redux-action.type';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IPacienteProntuario, defaultValue } from 'app/shared/model/paciente-prontuario.model';

export const ACTION_TYPES = {
  FETCH_PACIENTEPRONTUARIO_LIST: 'pacienteProntuario/FETCH_PACIENTEPRONTUARIO_LIST',
  FETCH_PACIENTEPRONTUARIO: 'pacienteProntuario/FETCH_PACIENTEPRONTUARIO',
  CREATE_PACIENTEPRONTUARIO: 'pacienteProntuario/CREATE_PACIENTEPRONTUARIO',
  UPDATE_PACIENTEPRONTUARIO: 'pacienteProntuario/UPDATE_PACIENTEPRONTUARIO',
  DELETE_PACIENTEPRONTUARIO: 'pacienteProntuario/DELETE_PACIENTEPRONTUARIO',
  RESET: 'pacienteProntuario/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IPacienteProntuario>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type PacienteProntuarioState = Readonly<typeof initialState>;

// Reducer

export default (state: PacienteProntuarioState = initialState, action): PacienteProntuarioState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_PACIENTEPRONTUARIO_LIST):
    case REQUEST(ACTION_TYPES.FETCH_PACIENTEPRONTUARIO):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_PACIENTEPRONTUARIO):
    case REQUEST(ACTION_TYPES.UPDATE_PACIENTEPRONTUARIO):
    case REQUEST(ACTION_TYPES.DELETE_PACIENTEPRONTUARIO):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_PACIENTEPRONTUARIO_LIST):
    case FAILURE(ACTION_TYPES.FETCH_PACIENTEPRONTUARIO):
    case FAILURE(ACTION_TYPES.CREATE_PACIENTEPRONTUARIO):
    case FAILURE(ACTION_TYPES.UPDATE_PACIENTEPRONTUARIO):
    case FAILURE(ACTION_TYPES.DELETE_PACIENTEPRONTUARIO):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_PACIENTEPRONTUARIO_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10)
      };
    case SUCCESS(ACTION_TYPES.FETCH_PACIENTEPRONTUARIO):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_PACIENTEPRONTUARIO):
    case SUCCESS(ACTION_TYPES.UPDATE_PACIENTEPRONTUARIO):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_PACIENTEPRONTUARIO):
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

const apiUrl = 'api/paciente-prontuarios';

// Actions

// Actions
export type ICrudGetAllActionPacienteProntuario<T> = (
  idPaciente?: any,
  idTipoProntuario?: any,
  oQue?: any,
  resultado?: any,
  ativo?: any,
  idUsuario?: any,
  idEspecialidade?: any,
  dataConsulta?: any,
  idExame?: any,
  idTipoExame?: any,
  dataExame?: any,
  dataInternacao?: any,
  dataAlta?: any,
  dataPs?: any,
  dataOcorrencia?: any,
  idOcorrenciaProntuario?: any,
  dataPost?: any,
  dataManifestacao?: any,
  page?: number,
  size?: number,
  sort?: string
) => IPayload<T> | ((dispatch: any) => IPayload<T>);

export const getEntities: ICrudGetAllActionPacienteProntuario<IPacienteProntuario> = (
  idPaciente,
  idTipoProntuario,
  oQue,
  resultado,
  ativo,
  idUsuario,
  idEspecialidade,
  dataConsulta,
  idExame,
  idTipoExame,
  dataExame,
  dataInternacao,
  dataAlta,
  dataPs,
  dataOcorrencia,
  idOcorrenciaProntuario,
  dataPost,
  dataManifestacao,
  page,
  size,
  sort
) => {
  const idPacienteRequest = idPaciente ? `idPaciente.contains=${idPaciente}&` : '';
  const idTipoProntuarioRequest = idTipoProntuario ? `idTipoProntuario.contains=${idTipoProntuario}&` : '';
  const oQueRequest = oQue ? `oQue.contains=${oQue}&` : '';
  const resultadoRequest = resultado ? `resultado.contains=${resultado}&` : '';
  const ativoRequest = ativo ? `ativo.contains=${ativo}&` : '';
  const idUsuarioRequest = idUsuario ? `idUsuario.contains=${idUsuario}&` : '';
  const idEspecialidadeRequest = idEspecialidade ? `idEspecialidade.contains=${idEspecialidade}&` : '';
  const dataConsultaRequest = dataConsulta ? `dataConsulta.contains=${dataConsulta}&` : '';
  const idExameRequest = idExame ? `idExame.contains=${idExame}&` : '';
  const idTipoExameRequest = idTipoExame ? `idTipoExame.contains=${idTipoExame}&` : '';
  const dataExameRequest = dataExame ? `dataExame.equals=${dataExame}&` : '';
  const dataInternacaoRequest = dataInternacao ? `dataInternacao.equals=${dataInternacao}&` : '';
  const dataAltaRequest = dataAlta ? `dataAlta.equals=${dataAlta}&` : '';
  const dataPsRequest = dataPs ? `dataPs.equals=${dataPs}&` : '';
  const dataOcorrenciaRequest = dataOcorrencia ? `dataOcorrencia.equals=${dataOcorrencia}&` : '';
  const idOcorrenciaProntuarioRequest = idOcorrenciaProntuario ? `idOcorrenciaProntuario.contains=${idOcorrenciaProntuario}&` : '';
  const dataPostRequest = dataPost ? `dataPost.contains=${dataPost}&` : '';
  const dataManifestacaoRequest = dataManifestacao ? `dataManifestacao.equals=${dataManifestacao}&` : '';

  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}&` : '?'}`;
  return {
    type: ACTION_TYPES.FETCH_PACIENTEPRONTUARIO_LIST,
    payload: axios.get<IPacienteProntuario>(
      `${requestUrl}${idPacienteRequest}${idTipoProntuarioRequest}${oQueRequest}${resultadoRequest}${ativoRequest}${idUsuarioRequest}${idEspecialidadeRequest}${dataConsultaRequest}${idExameRequest}${idTipoExameRequest}${dataExameRequest}${dataInternacaoRequest}${dataAltaRequest}${dataPsRequest}${dataOcorrenciaRequest}${idOcorrenciaProntuarioRequest}${dataPostRequest}${dataManifestacaoRequest}cacheBuster=${new Date().getTime()}`
    )
  };
};
export const getEntity: ICrudGetAction<IPacienteProntuario> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_PACIENTEPRONTUARIO,
    payload: axios.get<IPacienteProntuario>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IPacienteProntuario> = entity => async dispatch => {
  entity = {
    ...entity
  };
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_PACIENTEPRONTUARIO,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IPacienteProntuario> = entity => async dispatch => {
  entity = { ...entity };
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_PACIENTEPRONTUARIO,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IPacienteProntuario> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_PACIENTEPRONTUARIO,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
