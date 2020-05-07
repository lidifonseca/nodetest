/* eslint complexity: ["error", 100] */
import axios from 'axios';
import { ICrudGetAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { IPayload } from 'react-jhipster/src/type/redux-action.type';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IPadCsv, defaultValue } from 'app/shared/model/pad-csv.model';

export const ACTION_TYPES = {
  FETCH_PADCSV_LIST_EXPORT: 'padCsv/FETCH_PADCSV_LIST_EXPORT',
  FETCH_PADCSV_LIST: 'padCsv/FETCH_PADCSV_LIST',
  FETCH_PADCSV: 'padCsv/FETCH_PADCSV',
  CREATE_PADCSV: 'padCsv/CREATE_PADCSV',
  UPDATE_PADCSV: 'padCsv/UPDATE_PADCSV',
  DELETE_PADCSV: 'padCsv/DELETE_PADCSV',
  RESET: 'padCsv/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IPadCsv>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type PadCsvState = Readonly<typeof initialState>;

export interface IPadCsvBaseState {
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

export interface IPadCsvUpdateState {
  fieldsBase: IPadCsvBaseState;
  isNew: boolean;
}

// Reducer

export default (state: PadCsvState = initialState, action): PadCsvState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_PADCSV_LIST_EXPORT):
    case REQUEST(ACTION_TYPES.FETCH_PADCSV_LIST):
    case REQUEST(ACTION_TYPES.FETCH_PADCSV):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_PADCSV):
    case REQUEST(ACTION_TYPES.UPDATE_PADCSV):
    case REQUEST(ACTION_TYPES.DELETE_PADCSV):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_PADCSV_LIST_EXPORT):
    case FAILURE(ACTION_TYPES.FETCH_PADCSV_LIST):
    case FAILURE(ACTION_TYPES.FETCH_PADCSV):
    case FAILURE(ACTION_TYPES.CREATE_PADCSV):
    case FAILURE(ACTION_TYPES.UPDATE_PADCSV):
    case FAILURE(ACTION_TYPES.DELETE_PADCSV):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_PADCSV_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10)
      };
    case SUCCESS(ACTION_TYPES.FETCH_PADCSV):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_PADCSV):
    case SUCCESS(ACTION_TYPES.UPDATE_PADCSV):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_PADCSV):
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

const apiUrl = 'api/pad-csvs';

// Actions

// Actions
export type ICrudGetAllActionPadCsv<T> = (
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

export const getEntities: ICrudGetAllActionPadCsv<IPadCsv> = (
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
    type: ACTION_TYPES.FETCH_PADCSV_LIST,
    payload: axios.get<IPadCsv>(
      `${requestUrl}${idFranquiaRequest}${idPacienteRequest}${nroPadRequest}${dataInicioRequest}${dataFimRequest}${idEspecialidadeRequest}${idPeriodicidadeRequest}${idPeriodoRequest}${qtdSessoesRequest}cacheBuster=${new Date().getTime()}`
    )
  };
};
export const getEntity: ICrudGetAction<IPadCsv> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_PADCSV,
    payload: axios.get<IPadCsv>(requestUrl)
  };
};

export const getEntitiesExport: ICrudGetAllActionPadCsv<IPadCsv> = (
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
    type: ACTION_TYPES.FETCH_PADCSV_LIST,
    payload: axios.get<IPadCsv>(
      `${requestUrl}${idFranquiaRequest}${idPacienteRequest}${nroPadRequest}${dataInicioRequest}${dataFimRequest}${idEspecialidadeRequest}${idPeriodicidadeRequest}${idPeriodoRequest}${qtdSessoesRequest}cacheBuster=${new Date().getTime()}`
    )
  };
};

export const createEntity: ICrudPutAction<IPadCsv> = entity => async dispatch => {
  entity = {
    ...entity
  };
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_PADCSV,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IPadCsv> = entity => async dispatch => {
  entity = { ...entity };
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_PADCSV,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IPadCsv> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_PADCSV,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});

export const getPadCsvState = (location): IPadCsvBaseState => {
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
