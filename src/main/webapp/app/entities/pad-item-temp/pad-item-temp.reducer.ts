/* eslint complexity: ["error", 100] */
import axios from 'axios';
import { ICrudGetAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { IPayload } from 'react-jhipster/src/type/redux-action.type';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IPadItemTemp, defaultValue } from 'app/shared/model/pad-item-temp.model';

export const ACTION_TYPES = {
  FETCH_PADITEMTEMP_LIST_EXPORT: 'padItemTemp/FETCH_PADITEMTEMP_LIST_EXPORT',
  FETCH_PADITEMTEMP_LIST: 'padItemTemp/FETCH_PADITEMTEMP_LIST',
  FETCH_PADITEMTEMP: 'padItemTemp/FETCH_PADITEMTEMP',
  CREATE_PADITEMTEMP: 'padItemTemp/CREATE_PADITEMTEMP',
  UPDATE_PADITEMTEMP: 'padItemTemp/UPDATE_PADITEMTEMP',
  DELETE_PADITEMTEMP: 'padItemTemp/DELETE_PADITEMTEMP',
  RESET: 'padItemTemp/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IPadItemTemp>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type PadItemTempState = Readonly<typeof initialState>;

export interface IPadItemTempBaseState {
  baseFilters: any;
  sessionId: any;
  idEspecialidade: any;
  idPeriodicidade: any;
  idPeriodo: any;
  dataInicio: any;
  dataFim: any;
  qtdSessoes: any;
  observacao: any;
  cidXPtaNovoId: any;
  categoriaId: any;
  numGhc: any;
}

export interface IPadItemTempUpdateState {
  fieldsBase: IPadItemTempBaseState;

  isNew: boolean;
}

// Reducer

export default (state: PadItemTempState = initialState, action): PadItemTempState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_PADITEMTEMP_LIST_EXPORT):
    case REQUEST(ACTION_TYPES.FETCH_PADITEMTEMP_LIST):
    case REQUEST(ACTION_TYPES.FETCH_PADITEMTEMP):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_PADITEMTEMP):
    case REQUEST(ACTION_TYPES.UPDATE_PADITEMTEMP):
    case REQUEST(ACTION_TYPES.DELETE_PADITEMTEMP):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_PADITEMTEMP_LIST_EXPORT):
    case FAILURE(ACTION_TYPES.FETCH_PADITEMTEMP_LIST):
    case FAILURE(ACTION_TYPES.FETCH_PADITEMTEMP):
    case FAILURE(ACTION_TYPES.CREATE_PADITEMTEMP):
    case FAILURE(ACTION_TYPES.UPDATE_PADITEMTEMP):
    case FAILURE(ACTION_TYPES.DELETE_PADITEMTEMP):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_PADITEMTEMP_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10)
      };
    case SUCCESS(ACTION_TYPES.FETCH_PADITEMTEMP):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_PADITEMTEMP):
    case SUCCESS(ACTION_TYPES.UPDATE_PADITEMTEMP):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_PADITEMTEMP):
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

const apiUrl = 'api/pad-item-temps';

// Actions

// Actions
export type ICrudGetAllActionPadItemTemp<T> = (
  sessionId?: any,
  idEspecialidade?: any,
  idPeriodicidade?: any,
  idPeriodo?: any,
  dataInicio?: any,
  dataFim?: any,
  qtdSessoes?: any,
  observacao?: any,
  cidXPtaNovoId?: any,
  categoriaId?: any,
  numGhc?: any,
  page?: number,
  size?: number,
  sort?: string
) => IPayload<T> | ((dispatch: any) => IPayload<T>);

export const getEntities: ICrudGetAllActionPadItemTemp<IPadItemTemp> = (
  sessionId,
  idEspecialidade,
  idPeriodicidade,
  idPeriodo,
  dataInicio,
  dataFim,
  qtdSessoes,
  observacao,
  cidXPtaNovoId,
  categoriaId,
  numGhc,
  page,
  size,
  sort
) => {
  const sessionIdRequest = sessionId ? `sessionId.contains=${sessionId}&` : '';
  const idEspecialidadeRequest = idEspecialidade ? `idEspecialidade.contains=${idEspecialidade}&` : '';
  const idPeriodicidadeRequest = idPeriodicidade ? `idPeriodicidade.contains=${idPeriodicidade}&` : '';
  const idPeriodoRequest = idPeriodo ? `idPeriodo.contains=${idPeriodo}&` : '';
  const dataInicioRequest = dataInicio ? `dataInicio.equals=${dataInicio}&` : '';
  const dataFimRequest = dataFim ? `dataFim.equals=${dataFim}&` : '';
  const qtdSessoesRequest = qtdSessoes ? `qtdSessoes.contains=${qtdSessoes}&` : '';
  const observacaoRequest = observacao ? `observacao.contains=${observacao}&` : '';
  const cidXPtaNovoIdRequest = cidXPtaNovoId ? `cidXPtaNovoId.contains=${cidXPtaNovoId}&` : '';
  const categoriaIdRequest = categoriaId ? `categoriaId.contains=${categoriaId}&` : '';
  const numGhcRequest = numGhc ? `numGhc.contains=${numGhc}&` : '';

  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}&` : '?'}`;
  return {
    type: ACTION_TYPES.FETCH_PADITEMTEMP_LIST,
    payload: axios.get<IPadItemTemp>(
      `${requestUrl}${sessionIdRequest}${idEspecialidadeRequest}${idPeriodicidadeRequest}${idPeriodoRequest}${dataInicioRequest}${dataFimRequest}${qtdSessoesRequest}${observacaoRequest}${cidXPtaNovoIdRequest}${categoriaIdRequest}${numGhcRequest}cacheBuster=${new Date().getTime()}`
    )
  };
};
export const getEntity: ICrudGetAction<IPadItemTemp> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_PADITEMTEMP,
    payload: axios.get<IPadItemTemp>(requestUrl)
  };
};

export const getEntitiesExport: ICrudGetAllActionPadItemTemp<IPadItemTemp> = (
  sessionId,
  idEspecialidade,
  idPeriodicidade,
  idPeriodo,
  dataInicio,
  dataFim,
  qtdSessoes,
  observacao,
  cidXPtaNovoId,
  categoriaId,
  numGhc,
  page,
  size,
  sort
) => {
  const sessionIdRequest = sessionId ? `sessionId.contains=${sessionId}&` : '';
  const idEspecialidadeRequest = idEspecialidade ? `idEspecialidade.contains=${idEspecialidade}&` : '';
  const idPeriodicidadeRequest = idPeriodicidade ? `idPeriodicidade.contains=${idPeriodicidade}&` : '';
  const idPeriodoRequest = idPeriodo ? `idPeriodo.contains=${idPeriodo}&` : '';
  const dataInicioRequest = dataInicio ? `dataInicio.equals=${dataInicio}&` : '';
  const dataFimRequest = dataFim ? `dataFim.equals=${dataFim}&` : '';
  const qtdSessoesRequest = qtdSessoes ? `qtdSessoes.contains=${qtdSessoes}&` : '';
  const observacaoRequest = observacao ? `observacao.contains=${observacao}&` : '';
  const cidXPtaNovoIdRequest = cidXPtaNovoId ? `cidXPtaNovoId.contains=${cidXPtaNovoId}&` : '';
  const categoriaIdRequest = categoriaId ? `categoriaId.contains=${categoriaId}&` : '';
  const numGhcRequest = numGhc ? `numGhc.contains=${numGhc}&` : '';

  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}&` : '?'}`;
  return {
    type: ACTION_TYPES.FETCH_PADITEMTEMP_LIST,
    payload: axios.get<IPadItemTemp>(
      `${requestUrl}${sessionIdRequest}${idEspecialidadeRequest}${idPeriodicidadeRequest}${idPeriodoRequest}${dataInicioRequest}${dataFimRequest}${qtdSessoesRequest}${observacaoRequest}${cidXPtaNovoIdRequest}${categoriaIdRequest}${numGhcRequest}cacheBuster=${new Date().getTime()}`
    )
  };
};

export const createEntity: ICrudPutAction<IPadItemTemp> = entity => async dispatch => {
  entity = {
    ...entity
  };
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_PADITEMTEMP,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IPadItemTemp> = entity => async dispatch => {
  entity = { ...entity };
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_PADITEMTEMP,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IPadItemTemp> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_PADITEMTEMP,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});

export const getPadItemTempState = (location): IPadItemTempBaseState => {
  const url = new URL(`http://localhost${location.search}`); // using a dummy url for parsing
  const baseFilters = url.searchParams.get('baseFilters') || '';
  const sessionId = url.searchParams.get('sessionId') || '';
  const idEspecialidade = url.searchParams.get('idEspecialidade') || '';
  const idPeriodicidade = url.searchParams.get('idPeriodicidade') || '';
  const idPeriodo = url.searchParams.get('idPeriodo') || '';
  const dataInicio = url.searchParams.get('dataInicio') || '';
  const dataFim = url.searchParams.get('dataFim') || '';
  const qtdSessoes = url.searchParams.get('qtdSessoes') || '';
  const observacao = url.searchParams.get('observacao') || '';
  const cidXPtaNovoId = url.searchParams.get('cidXPtaNovoId') || '';
  const categoriaId = url.searchParams.get('categoriaId') || '';
  const numGhc = url.searchParams.get('numGhc') || '';

  return {
    baseFilters,
    sessionId,
    idEspecialidade,
    idPeriodicidade,
    idPeriodo,
    dataInicio,
    dataFim,
    qtdSessoes,
    observacao,
    cidXPtaNovoId,
    categoriaId,
    numGhc
  };
};
