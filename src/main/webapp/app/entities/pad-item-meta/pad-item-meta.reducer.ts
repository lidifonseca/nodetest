/* eslint complexity: ["error", 100] */
import axios from 'axios';
import { ICrudGetAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { IPayload } from 'react-jhipster/src/type/redux-action.type';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IPadItemMeta, defaultValue } from 'app/shared/model/pad-item-meta.model';

export const ACTION_TYPES = {
  FETCH_PADITEMMETA_LIST_EXPORT: 'padItemMeta/FETCH_PADITEMMETA_LIST_EXPORT',
  FETCH_PADITEMMETA_LIST: 'padItemMeta/FETCH_PADITEMMETA_LIST',
  FETCH_PADITEMMETA: 'padItemMeta/FETCH_PADITEMMETA',
  CREATE_PADITEMMETA: 'padItemMeta/CREATE_PADITEMMETA',
  UPDATE_PADITEMMETA: 'padItemMeta/UPDATE_PADITEMMETA',
  DELETE_PADITEMMETA: 'padItemMeta/DELETE_PADITEMMETA',
  RESET: 'padItemMeta/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IPadItemMeta>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type PadItemMetaState = Readonly<typeof initialState>;

export interface IPadItemMetaBaseState {
  baseFilters: any;
  unidadeMedidaId: any;
  indicadorId: any;
  idPaciente: any;
  idPad: any;
  idPadItem: any;
  minimo: any;
  maximo: any;
  meta: any;
  valorAtual: any;
  atualizadoEm: any;
  dataLimite: any;
  frequenciaMedicaoHoras: any;
  tipoAcompanhamento: any;
  atendimentoId: any;
  email: any;
  minimoSistolica: any;
  maximoSistolica: any;
  minimoDiastolica: any;
  maximoDiastolica: any;
  score: any;
  alteracaoEsperada: any;
}

export interface IPadItemMetaUpdateState {
  fieldsBase: IPadItemMetaBaseState;
  isNew: boolean;
}

// Reducer

export default (state: PadItemMetaState = initialState, action): PadItemMetaState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_PADITEMMETA_LIST_EXPORT):
    case REQUEST(ACTION_TYPES.FETCH_PADITEMMETA_LIST):
    case REQUEST(ACTION_TYPES.FETCH_PADITEMMETA):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_PADITEMMETA):
    case REQUEST(ACTION_TYPES.UPDATE_PADITEMMETA):
    case REQUEST(ACTION_TYPES.DELETE_PADITEMMETA):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_PADITEMMETA_LIST_EXPORT):
    case FAILURE(ACTION_TYPES.FETCH_PADITEMMETA_LIST):
    case FAILURE(ACTION_TYPES.FETCH_PADITEMMETA):
    case FAILURE(ACTION_TYPES.CREATE_PADITEMMETA):
    case FAILURE(ACTION_TYPES.UPDATE_PADITEMMETA):
    case FAILURE(ACTION_TYPES.DELETE_PADITEMMETA):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_PADITEMMETA_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10)
      };
    case SUCCESS(ACTION_TYPES.FETCH_PADITEMMETA):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_PADITEMMETA):
    case SUCCESS(ACTION_TYPES.UPDATE_PADITEMMETA):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_PADITEMMETA):
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

const apiUrl = 'api/pad-item-metas';

// Actions

// Actions
export type ICrudGetAllActionPadItemMeta<T> = (
  unidadeMedidaId?: any,
  indicadorId?: any,
  idPaciente?: any,
  idPad?: any,
  idPadItem?: any,
  minimo?: any,
  maximo?: any,
  meta?: any,
  valorAtual?: any,
  atualizadoEm?: any,
  dataLimite?: any,
  frequenciaMedicaoHoras?: any,
  tipoAcompanhamento?: any,
  atendimentoId?: any,
  email?: any,
  minimoSistolica?: any,
  maximoSistolica?: any,
  minimoDiastolica?: any,
  maximoDiastolica?: any,
  score?: any,
  alteracaoEsperada?: any,
  page?: number,
  size?: number,
  sort?: string
) => IPayload<T> | ((dispatch: any) => IPayload<T>);

export const getEntities: ICrudGetAllActionPadItemMeta<IPadItemMeta> = (
  unidadeMedidaId,
  indicadorId,
  idPaciente,
  idPad,
  idPadItem,
  minimo,
  maximo,
  meta,
  valorAtual,
  atualizadoEm,
  dataLimite,
  frequenciaMedicaoHoras,
  tipoAcompanhamento,
  atendimentoId,
  email,
  minimoSistolica,
  maximoSistolica,
  minimoDiastolica,
  maximoDiastolica,
  score,
  alteracaoEsperada,
  page,
  size,
  sort
) => {
  const unidadeMedidaIdRequest = unidadeMedidaId ? `unidadeMedidaId.contains=${unidadeMedidaId}&` : '';
  const indicadorIdRequest = indicadorId ? `indicadorId.contains=${indicadorId}&` : '';
  const idPacienteRequest = idPaciente ? `idPaciente.contains=${idPaciente}&` : '';
  const idPadRequest = idPad ? `idPad.contains=${idPad}&` : '';
  const idPadItemRequest = idPadItem ? `idPadItem.contains=${idPadItem}&` : '';
  const minimoRequest = minimo ? `minimo.contains=${minimo}&` : '';
  const maximoRequest = maximo ? `maximo.contains=${maximo}&` : '';
  const metaRequest = meta ? `meta.contains=${meta}&` : '';
  const valorAtualRequest = valorAtual ? `valorAtual.contains=${valorAtual}&` : '';
  const atualizadoEmRequest = atualizadoEm ? `atualizadoEm.contains=${atualizadoEm}&` : '';
  const dataLimiteRequest = dataLimite ? `dataLimite.contains=${dataLimite}&` : '';
  const frequenciaMedicaoHorasRequest = frequenciaMedicaoHoras ? `frequenciaMedicaoHoras.contains=${frequenciaMedicaoHoras}&` : '';
  const tipoAcompanhamentoRequest = tipoAcompanhamento ? `tipoAcompanhamento.contains=${tipoAcompanhamento}&` : '';
  const atendimentoIdRequest = atendimentoId ? `atendimentoId.contains=${atendimentoId}&` : '';
  const emailRequest = email ? `email.contains=${email}&` : '';
  const minimoSistolicaRequest = minimoSistolica ? `minimoSistolica.contains=${minimoSistolica}&` : '';
  const maximoSistolicaRequest = maximoSistolica ? `maximoSistolica.contains=${maximoSistolica}&` : '';
  const minimoDiastolicaRequest = minimoDiastolica ? `minimoDiastolica.contains=${minimoDiastolica}&` : '';
  const maximoDiastolicaRequest = maximoDiastolica ? `maximoDiastolica.contains=${maximoDiastolica}&` : '';
  const scoreRequest = score ? `score.contains=${score}&` : '';
  const alteracaoEsperadaRequest = alteracaoEsperada ? `alteracaoEsperada.contains=${alteracaoEsperada}&` : '';

  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}&` : '?'}`;
  return {
    type: ACTION_TYPES.FETCH_PADITEMMETA_LIST,
    payload: axios.get<IPadItemMeta>(
      `${requestUrl}${unidadeMedidaIdRequest}${indicadorIdRequest}${idPacienteRequest}${idPadRequest}${idPadItemRequest}${minimoRequest}${maximoRequest}${metaRequest}${valorAtualRequest}${atualizadoEmRequest}${dataLimiteRequest}${frequenciaMedicaoHorasRequest}${tipoAcompanhamentoRequest}${atendimentoIdRequest}${emailRequest}${minimoSistolicaRequest}${maximoSistolicaRequest}${minimoDiastolicaRequest}${maximoDiastolicaRequest}${scoreRequest}${alteracaoEsperadaRequest}cacheBuster=${new Date().getTime()}`
    )
  };
};
export const getEntity: ICrudGetAction<IPadItemMeta> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_PADITEMMETA,
    payload: axios.get<IPadItemMeta>(requestUrl)
  };
};

export const getEntitiesExport: ICrudGetAllActionPadItemMeta<IPadItemMeta> = (
  unidadeMedidaId,
  indicadorId,
  idPaciente,
  idPad,
  idPadItem,
  minimo,
  maximo,
  meta,
  valorAtual,
  atualizadoEm,
  dataLimite,
  frequenciaMedicaoHoras,
  tipoAcompanhamento,
  atendimentoId,
  email,
  minimoSistolica,
  maximoSistolica,
  minimoDiastolica,
  maximoDiastolica,
  score,
  alteracaoEsperada,
  page,
  size,
  sort
) => {
  const unidadeMedidaIdRequest = unidadeMedidaId ? `unidadeMedidaId.contains=${unidadeMedidaId}&` : '';
  const indicadorIdRequest = indicadorId ? `indicadorId.contains=${indicadorId}&` : '';
  const idPacienteRequest = idPaciente ? `idPaciente.contains=${idPaciente}&` : '';
  const idPadRequest = idPad ? `idPad.contains=${idPad}&` : '';
  const idPadItemRequest = idPadItem ? `idPadItem.contains=${idPadItem}&` : '';
  const minimoRequest = minimo ? `minimo.contains=${minimo}&` : '';
  const maximoRequest = maximo ? `maximo.contains=${maximo}&` : '';
  const metaRequest = meta ? `meta.contains=${meta}&` : '';
  const valorAtualRequest = valorAtual ? `valorAtual.contains=${valorAtual}&` : '';
  const atualizadoEmRequest = atualizadoEm ? `atualizadoEm.contains=${atualizadoEm}&` : '';
  const dataLimiteRequest = dataLimite ? `dataLimite.contains=${dataLimite}&` : '';
  const frequenciaMedicaoHorasRequest = frequenciaMedicaoHoras ? `frequenciaMedicaoHoras.contains=${frequenciaMedicaoHoras}&` : '';
  const tipoAcompanhamentoRequest = tipoAcompanhamento ? `tipoAcompanhamento.contains=${tipoAcompanhamento}&` : '';
  const atendimentoIdRequest = atendimentoId ? `atendimentoId.contains=${atendimentoId}&` : '';
  const emailRequest = email ? `email.contains=${email}&` : '';
  const minimoSistolicaRequest = minimoSistolica ? `minimoSistolica.contains=${minimoSistolica}&` : '';
  const maximoSistolicaRequest = maximoSistolica ? `maximoSistolica.contains=${maximoSistolica}&` : '';
  const minimoDiastolicaRequest = minimoDiastolica ? `minimoDiastolica.contains=${minimoDiastolica}&` : '';
  const maximoDiastolicaRequest = maximoDiastolica ? `maximoDiastolica.contains=${maximoDiastolica}&` : '';
  const scoreRequest = score ? `score.contains=${score}&` : '';
  const alteracaoEsperadaRequest = alteracaoEsperada ? `alteracaoEsperada.contains=${alteracaoEsperada}&` : '';

  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}&` : '?'}`;
  return {
    type: ACTION_TYPES.FETCH_PADITEMMETA_LIST,
    payload: axios.get<IPadItemMeta>(
      `${requestUrl}${unidadeMedidaIdRequest}${indicadorIdRequest}${idPacienteRequest}${idPadRequest}${idPadItemRequest}${minimoRequest}${maximoRequest}${metaRequest}${valorAtualRequest}${atualizadoEmRequest}${dataLimiteRequest}${frequenciaMedicaoHorasRequest}${tipoAcompanhamentoRequest}${atendimentoIdRequest}${emailRequest}${minimoSistolicaRequest}${maximoSistolicaRequest}${minimoDiastolicaRequest}${maximoDiastolicaRequest}${scoreRequest}${alteracaoEsperadaRequest}cacheBuster=${new Date().getTime()}`
    )
  };
};

export const createEntity: ICrudPutAction<IPadItemMeta> = entity => async dispatch => {
  entity = {
    ...entity
  };
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_PADITEMMETA,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IPadItemMeta> = entity => async dispatch => {
  entity = { ...entity };
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_PADITEMMETA,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IPadItemMeta> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_PADITEMMETA,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});

export const getPadItemMetaState = (location): IPadItemMetaBaseState => {
  const url = new URL(`http://localhost${location.search}`); // using a dummy url for parsing
  const baseFilters = url.searchParams.get('baseFilters') || '';
  const unidadeMedidaId = url.searchParams.get('unidadeMedidaId') || '';
  const indicadorId = url.searchParams.get('indicadorId') || '';
  const idPaciente = url.searchParams.get('idPaciente') || '';
  const idPad = url.searchParams.get('idPad') || '';
  const idPadItem = url.searchParams.get('idPadItem') || '';
  const minimo = url.searchParams.get('minimo') || '';
  const maximo = url.searchParams.get('maximo') || '';
  const meta = url.searchParams.get('meta') || '';
  const valorAtual = url.searchParams.get('valorAtual') || '';
  const atualizadoEm = url.searchParams.get('atualizadoEm') || '';
  const dataLimite = url.searchParams.get('dataLimite') || '';
  const frequenciaMedicaoHoras = url.searchParams.get('frequenciaMedicaoHoras') || '';
  const tipoAcompanhamento = url.searchParams.get('tipoAcompanhamento') || '';
  const atendimentoId = url.searchParams.get('atendimentoId') || '';
  const email = url.searchParams.get('email') || '';
  const minimoSistolica = url.searchParams.get('minimoSistolica') || '';
  const maximoSistolica = url.searchParams.get('maximoSistolica') || '';
  const minimoDiastolica = url.searchParams.get('minimoDiastolica') || '';
  const maximoDiastolica = url.searchParams.get('maximoDiastolica') || '';
  const score = url.searchParams.get('score') || '';
  const alteracaoEsperada = url.searchParams.get('alteracaoEsperada') || '';

  return {
    baseFilters,
    unidadeMedidaId,
    indicadorId,
    idPaciente,
    idPad,
    idPadItem,
    minimo,
    maximo,
    meta,
    valorAtual,
    atualizadoEm,
    dataLimite,
    frequenciaMedicaoHoras,
    tipoAcompanhamento,
    atendimentoId,
    email,
    minimoSistolica,
    maximoSistolica,
    minimoDiastolica,
    maximoDiastolica,
    score,
    alteracaoEsperada
  };
};
