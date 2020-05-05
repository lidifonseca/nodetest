/* eslint complexity: ["error", 100] */
import axios from 'axios';
import { ICrudGetAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { IPayload } from 'react-jhipster/src/type/redux-action.type';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IProntuarioMotivoManifestacao, defaultValue } from 'app/shared/model/prontuario-motivo-manifestacao.model';

export const ACTION_TYPES = {
  FETCH_PRONTUARIOMOTIVOMANIFESTACAO_LIST_EXPORT: 'prontuarioMotivoManifestacao/FETCH_PRONTUARIOMOTIVOMANIFESTACAO_LIST_EXPORT',
  FETCH_PRONTUARIOMOTIVOMANIFESTACAO_LIST: 'prontuarioMotivoManifestacao/FETCH_PRONTUARIOMOTIVOMANIFESTACAO_LIST',
  FETCH_PRONTUARIOMOTIVOMANIFESTACAO: 'prontuarioMotivoManifestacao/FETCH_PRONTUARIOMOTIVOMANIFESTACAO',
  CREATE_PRONTUARIOMOTIVOMANIFESTACAO: 'prontuarioMotivoManifestacao/CREATE_PRONTUARIOMOTIVOMANIFESTACAO',
  UPDATE_PRONTUARIOMOTIVOMANIFESTACAO: 'prontuarioMotivoManifestacao/UPDATE_PRONTUARIOMOTIVOMANIFESTACAO',
  DELETE_PRONTUARIOMOTIVOMANIFESTACAO: 'prontuarioMotivoManifestacao/DELETE_PRONTUARIOMOTIVOMANIFESTACAO',
  SET_BLOB: 'prontuarioMotivoManifestacao/SET_BLOB',
  RESET: 'prontuarioMotivoManifestacao/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IProntuarioMotivoManifestacao>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type ProntuarioMotivoManifestacaoState = Readonly<typeof initialState>;

export interface IProntuarioMotivoManifestacaoBaseState {
  idProntuario: any;
  idPaciente: any;
  idMotivo: any;
  idMotivoFilho: any;
  idManifestacao: any;
  idManifestacaoFilho: any;
  sugestao: any;
  idUsuario: any;
  informacaoAdicional: any;
}

// Reducer

export default (state: ProntuarioMotivoManifestacaoState = initialState, action): ProntuarioMotivoManifestacaoState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_PRONTUARIOMOTIVOMANIFESTACAO_LIST_EXPORT):
    case REQUEST(ACTION_TYPES.FETCH_PRONTUARIOMOTIVOMANIFESTACAO_LIST):
    case REQUEST(ACTION_TYPES.FETCH_PRONTUARIOMOTIVOMANIFESTACAO):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_PRONTUARIOMOTIVOMANIFESTACAO):
    case REQUEST(ACTION_TYPES.UPDATE_PRONTUARIOMOTIVOMANIFESTACAO):
    case REQUEST(ACTION_TYPES.DELETE_PRONTUARIOMOTIVOMANIFESTACAO):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_PRONTUARIOMOTIVOMANIFESTACAO_LIST_EXPORT):
    case FAILURE(ACTION_TYPES.FETCH_PRONTUARIOMOTIVOMANIFESTACAO_LIST):
    case FAILURE(ACTION_TYPES.FETCH_PRONTUARIOMOTIVOMANIFESTACAO):
    case FAILURE(ACTION_TYPES.CREATE_PRONTUARIOMOTIVOMANIFESTACAO):
    case FAILURE(ACTION_TYPES.UPDATE_PRONTUARIOMOTIVOMANIFESTACAO):
    case FAILURE(ACTION_TYPES.DELETE_PRONTUARIOMOTIVOMANIFESTACAO):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_PRONTUARIOMOTIVOMANIFESTACAO_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10)
      };
    case SUCCESS(ACTION_TYPES.FETCH_PRONTUARIOMOTIVOMANIFESTACAO):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_PRONTUARIOMOTIVOMANIFESTACAO):
    case SUCCESS(ACTION_TYPES.UPDATE_PRONTUARIOMOTIVOMANIFESTACAO):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_PRONTUARIOMOTIVOMANIFESTACAO):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {}
      };
    case ACTION_TYPES.SET_BLOB: {
      const { name, data, contentType } = action.payload;
      return {
        ...state,
        entity: {
          ...state.entity,
          [name]: data,
          [name + 'ContentType']: contentType
        }
      };
    }
    case ACTION_TYPES.RESET:
      return {
        ...initialState
      };
    default:
      return state;
  }
};

const apiUrl = 'api/prontuario-motivo-manifestacaos';

// Actions

// Actions
export type ICrudGetAllActionProntuarioMotivoManifestacao<T> = (
  idProntuario?: any,
  idPaciente?: any,
  idMotivo?: any,
  idMotivoFilho?: any,
  idManifestacao?: any,
  idManifestacaoFilho?: any,
  sugestao?: any,
  idUsuario?: any,
  informacaoAdicional?: any,
  page?: number,
  size?: number,
  sort?: string
) => IPayload<T> | ((dispatch: any) => IPayload<T>);

export const getEntities: ICrudGetAllActionProntuarioMotivoManifestacao<IProntuarioMotivoManifestacao> = (
  idProntuario,
  idPaciente,
  idMotivo,
  idMotivoFilho,
  idManifestacao,
  idManifestacaoFilho,
  sugestao,
  idUsuario,
  informacaoAdicional,
  page,
  size,
  sort
) => {
  const idProntuarioRequest = idProntuario ? `idProntuario.contains=${idProntuario}&` : '';
  const idPacienteRequest = idPaciente ? `idPaciente.contains=${idPaciente}&` : '';
  const idMotivoRequest = idMotivo ? `idMotivo.contains=${idMotivo}&` : '';
  const idMotivoFilhoRequest = idMotivoFilho ? `idMotivoFilho.contains=${idMotivoFilho}&` : '';
  const idManifestacaoRequest = idManifestacao ? `idManifestacao.contains=${idManifestacao}&` : '';
  const idManifestacaoFilhoRequest = idManifestacaoFilho ? `idManifestacaoFilho.contains=${idManifestacaoFilho}&` : '';
  const sugestaoRequest = sugestao ? `sugestao.contains=${sugestao}&` : '';
  const idUsuarioRequest = idUsuario ? `idUsuario.contains=${idUsuario}&` : '';
  const informacaoAdicionalRequest = informacaoAdicional ? `informacaoAdicional.contains=${informacaoAdicional}&` : '';

  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}&` : '?'}`;
  return {
    type: ACTION_TYPES.FETCH_PRONTUARIOMOTIVOMANIFESTACAO_LIST,
    payload: axios.get<IProntuarioMotivoManifestacao>(
      `${requestUrl}${idProntuarioRequest}${idPacienteRequest}${idMotivoRequest}${idMotivoFilhoRequest}${idManifestacaoRequest}${idManifestacaoFilhoRequest}${sugestaoRequest}${idUsuarioRequest}${informacaoAdicionalRequest}cacheBuster=${new Date().getTime()}`
    )
  };
};
export const getEntity: ICrudGetAction<IProntuarioMotivoManifestacao> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_PRONTUARIOMOTIVOMANIFESTACAO,
    payload: axios.get<IProntuarioMotivoManifestacao>(requestUrl)
  };
};

export const getEntitiesExport: ICrudGetAllActionProntuarioMotivoManifestacao<IProntuarioMotivoManifestacao> = (
  idProntuario,
  idPaciente,
  idMotivo,
  idMotivoFilho,
  idManifestacao,
  idManifestacaoFilho,
  sugestao,
  idUsuario,
  informacaoAdicional,
  page,
  size,
  sort
) => {
  const idProntuarioRequest = idProntuario ? `idProntuario.contains=${idProntuario}&` : '';
  const idPacienteRequest = idPaciente ? `idPaciente.contains=${idPaciente}&` : '';
  const idMotivoRequest = idMotivo ? `idMotivo.contains=${idMotivo}&` : '';
  const idMotivoFilhoRequest = idMotivoFilho ? `idMotivoFilho.contains=${idMotivoFilho}&` : '';
  const idManifestacaoRequest = idManifestacao ? `idManifestacao.contains=${idManifestacao}&` : '';
  const idManifestacaoFilhoRequest = idManifestacaoFilho ? `idManifestacaoFilho.contains=${idManifestacaoFilho}&` : '';
  const sugestaoRequest = sugestao ? `sugestao.contains=${sugestao}&` : '';
  const idUsuarioRequest = idUsuario ? `idUsuario.contains=${idUsuario}&` : '';
  const informacaoAdicionalRequest = informacaoAdicional ? `informacaoAdicional.contains=${informacaoAdicional}&` : '';

  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}&` : '?'}`;
  return {
    type: ACTION_TYPES.FETCH_PRONTUARIOMOTIVOMANIFESTACAO_LIST,
    payload: axios.get<IProntuarioMotivoManifestacao>(
      `${requestUrl}${idProntuarioRequest}${idPacienteRequest}${idMotivoRequest}${idMotivoFilhoRequest}${idManifestacaoRequest}${idManifestacaoFilhoRequest}${sugestaoRequest}${idUsuarioRequest}${informacaoAdicionalRequest}cacheBuster=${new Date().getTime()}`
    )
  };
};

export const createEntity: ICrudPutAction<IProntuarioMotivoManifestacao> = entity => async dispatch => {
  entity = {
    ...entity
  };
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_PRONTUARIOMOTIVOMANIFESTACAO,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IProntuarioMotivoManifestacao> = entity => async dispatch => {
  entity = { ...entity };
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_PRONTUARIOMOTIVOMANIFESTACAO,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IProntuarioMotivoManifestacao> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_PRONTUARIOMOTIVOMANIFESTACAO,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const setBlob = (name, data, contentType?) => ({
  type: ACTION_TYPES.SET_BLOB,
  payload: {
    name,
    data,
    contentType
  }
});

export const reset = () => ({
  type: ACTION_TYPES.RESET
});

export const getProntuarioMotivoManifestacaoState = (location): IProntuarioMotivoManifestacaoBaseState => {
  const url = new URL(`http://localhost${location.search}`); // using a dummy url for parsing
  const idProntuario = url.searchParams.get('idProntuario') || '';
  const idPaciente = url.searchParams.get('idPaciente') || '';
  const idMotivo = url.searchParams.get('idMotivo') || '';
  const idMotivoFilho = url.searchParams.get('idMotivoFilho') || '';
  const idManifestacao = url.searchParams.get('idManifestacao') || '';
  const idManifestacaoFilho = url.searchParams.get('idManifestacaoFilho') || '';
  const sugestao = url.searchParams.get('sugestao') || '';
  const idUsuario = url.searchParams.get('idUsuario') || '';
  const informacaoAdicional = url.searchParams.get('informacaoAdicional') || '';

  return {
    idProntuario,
    idPaciente,
    idMotivo,
    idMotivoFilho,
    idManifestacao,
    idManifestacaoFilho,
    sugestao,
    idUsuario,
    informacaoAdicional
  };
};
