/* eslint complexity: ["error", 100] */
import axios from 'axios';
import { ICrudGetAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { IPayload } from 'react-jhipster/src/type/redux-action.type';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IMaio, defaultValue } from 'app/shared/model/maio.model';

export const ACTION_TYPES = {
  FETCH_MAIO_LIST_EXPORT: 'maio/FETCH_MAIO_LIST_EXPORT',
  FETCH_MAIO_LIST: 'maio/FETCH_MAIO_LIST',
  FETCH_MAIO: 'maio/FETCH_MAIO',
  CREATE_MAIO: 'maio/CREATE_MAIO',
  UPDATE_MAIO: 'maio/UPDATE_MAIO',
  DELETE_MAIO: 'maio/DELETE_MAIO',
  RESET: 'maio/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IMaio>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type MaioState = Readonly<typeof initialState>;

export interface IMaioBaseState {
  baseFilters: any;
  idFranquia: any;
  idPaciente: any;
  nroPad: any;
  dataInicio: any;
  dataFim: any;
  idEspecialidade: any;
  idPeriodicidade: any;
  idPeriodo: any;
  qtdSessoes: any;
}

export interface IMaioUpdateState {
  fieldsBase: IMaioBaseState;
  isNew: boolean;
}

// Reducer

export default (state: MaioState = initialState, action): MaioState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_MAIO_LIST_EXPORT):
    case REQUEST(ACTION_TYPES.FETCH_MAIO_LIST):
    case REQUEST(ACTION_TYPES.FETCH_MAIO):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_MAIO):
    case REQUEST(ACTION_TYPES.UPDATE_MAIO):
    case REQUEST(ACTION_TYPES.DELETE_MAIO):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_MAIO_LIST_EXPORT):
    case FAILURE(ACTION_TYPES.FETCH_MAIO_LIST):
    case FAILURE(ACTION_TYPES.FETCH_MAIO):
    case FAILURE(ACTION_TYPES.CREATE_MAIO):
    case FAILURE(ACTION_TYPES.UPDATE_MAIO):
    case FAILURE(ACTION_TYPES.DELETE_MAIO):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_MAIO_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10)
      };
    case SUCCESS(ACTION_TYPES.FETCH_MAIO):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_MAIO):
    case SUCCESS(ACTION_TYPES.UPDATE_MAIO):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_MAIO):
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

const apiUrl = 'api/maios';

// Actions

// Actions
export type ICrudGetAllActionMaio<T> = (
  idFranquia?: any,
  idPaciente?: any,
  nroPad?: any,
  dataInicio?: any,
  dataFim?: any,
  idEspecialidade?: any,
  idPeriodicidade?: any,
  idPeriodo?: any,
  qtdSessoes?: any,
  page?: number,
  size?: number,
  sort?: string
) => IPayload<T> | ((dispatch: any) => IPayload<T>);

export const getEntities: ICrudGetAllActionMaio<IMaio> = (
  idFranquia,
  idPaciente,
  nroPad,
  dataInicio,
  dataFim,
  idEspecialidade,
  idPeriodicidade,
  idPeriodo,
  qtdSessoes,
  page,
  size,
  sort
) => {
  const idFranquiaRequest = idFranquia ? `idFranquia.contains=${idFranquia}&` : '';
  const idPacienteRequest = idPaciente ? `idPaciente.contains=${idPaciente}&` : '';
  const nroPadRequest = nroPad ? `nroPad.contains=${nroPad}&` : '';
  const dataInicioRequest = dataInicio ? `dataInicio.contains=${dataInicio}&` : '';
  const dataFimRequest = dataFim ? `dataFim.contains=${dataFim}&` : '';
  const idEspecialidadeRequest = idEspecialidade ? `idEspecialidade.contains=${idEspecialidade}&` : '';
  const idPeriodicidadeRequest = idPeriodicidade ? `idPeriodicidade.contains=${idPeriodicidade}&` : '';
  const idPeriodoRequest = idPeriodo ? `idPeriodo.contains=${idPeriodo}&` : '';
  const qtdSessoesRequest = qtdSessoes ? `qtdSessoes.contains=${qtdSessoes}&` : '';

  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}&` : '?'}`;
  return {
    type: ACTION_TYPES.FETCH_MAIO_LIST,
    payload: axios.get<IMaio>(
      `${requestUrl}${idFranquiaRequest}${idPacienteRequest}${nroPadRequest}${dataInicioRequest}${dataFimRequest}${idEspecialidadeRequest}${idPeriodicidadeRequest}${idPeriodoRequest}${qtdSessoesRequest}cacheBuster=${new Date().getTime()}`
    )
  };
};
export const getEntity: ICrudGetAction<IMaio> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_MAIO,
    payload: axios.get<IMaio>(requestUrl)
  };
};

export const getEntitiesExport: ICrudGetAllActionMaio<IMaio> = (
  idFranquia,
  idPaciente,
  nroPad,
  dataInicio,
  dataFim,
  idEspecialidade,
  idPeriodicidade,
  idPeriodo,
  qtdSessoes,
  page,
  size,
  sort
) => {
  const idFranquiaRequest = idFranquia ? `idFranquia.contains=${idFranquia}&` : '';
  const idPacienteRequest = idPaciente ? `idPaciente.contains=${idPaciente}&` : '';
  const nroPadRequest = nroPad ? `nroPad.contains=${nroPad}&` : '';
  const dataInicioRequest = dataInicio ? `dataInicio.contains=${dataInicio}&` : '';
  const dataFimRequest = dataFim ? `dataFim.contains=${dataFim}&` : '';
  const idEspecialidadeRequest = idEspecialidade ? `idEspecialidade.contains=${idEspecialidade}&` : '';
  const idPeriodicidadeRequest = idPeriodicidade ? `idPeriodicidade.contains=${idPeriodicidade}&` : '';
  const idPeriodoRequest = idPeriodo ? `idPeriodo.contains=${idPeriodo}&` : '';
  const qtdSessoesRequest = qtdSessoes ? `qtdSessoes.contains=${qtdSessoes}&` : '';

  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}&` : '?'}`;
  return {
    type: ACTION_TYPES.FETCH_MAIO_LIST,
    payload: axios.get<IMaio>(
      `${requestUrl}${idFranquiaRequest}${idPacienteRequest}${nroPadRequest}${dataInicioRequest}${dataFimRequest}${idEspecialidadeRequest}${idPeriodicidadeRequest}${idPeriodoRequest}${qtdSessoesRequest}cacheBuster=${new Date().getTime()}`
    )
  };
};

export const createEntity: ICrudPutAction<IMaio> = entity => async dispatch => {
  entity = {
    ...entity
  };
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_MAIO,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IMaio> = entity => async dispatch => {
  entity = { ...entity };
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_MAIO,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IMaio> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_MAIO,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});

export const getMaioState = (location): IMaioBaseState => {
  const url = new URL(`http://localhost${location.search}`); // using a dummy url for parsing
  const baseFilters = url.searchParams.get('baseFilters') || '';
  const idFranquia = url.searchParams.get('idFranquia') || '';
  const idPaciente = url.searchParams.get('idPaciente') || '';
  const nroPad = url.searchParams.get('nroPad') || '';
  const dataInicio = url.searchParams.get('dataInicio') || '';
  const dataFim = url.searchParams.get('dataFim') || '';
  const idEspecialidade = url.searchParams.get('idEspecialidade') || '';
  const idPeriodicidade = url.searchParams.get('idPeriodicidade') || '';
  const idPeriodo = url.searchParams.get('idPeriodo') || '';
  const qtdSessoes = url.searchParams.get('qtdSessoes') || '';

  return {
    baseFilters,
    idFranquia,
    idPaciente,
    nroPad,
    dataInicio,
    dataFim,
    idEspecialidade,
    idPeriodicidade,
    idPeriodo,
    qtdSessoes
  };
};
