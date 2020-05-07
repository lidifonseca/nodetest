/* eslint complexity: ["error", 100] */
import axios from 'axios';
import { ICrudGetAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { IPayload } from 'react-jhipster/src/type/redux-action.type';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IPadItem, defaultValue } from 'app/shared/model/pad-item.model';

export const ACTION_TYPES = {
  FETCH_PADITEM_LIST_EXPORT: 'padItem/FETCH_PADITEM_LIST_EXPORT',
  FETCH_PADITEM_LIST: 'padItem/FETCH_PADITEM_LIST',
  FETCH_PADITEM: 'padItem/FETCH_PADITEM',
  CREATE_PADITEM: 'padItem/CREATE_PADITEM',
  UPDATE_PADITEM: 'padItem/UPDATE_PADITEM',
  DELETE_PADITEM: 'padItem/DELETE_PADITEM',
  SET_BLOB: 'padItem/SET_BLOB',
  RESET: 'padItem/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IPadItem>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type PadItemState = Readonly<typeof initialState>;

export interface IPadItemBaseState {
  baseFilters: any;
  idPedido: any;
  dataInicio: any;
  dataFim: any;
  qtdSessoes: any;
  observacao: any;
  sub: any;
  ativo: any;
  dataPadItemIncompleto: any;
  dataPadItemCompleto: any;
  numGhc: any;
  cidXPtaNovo: any;
  categoriaId: any;
  score: any;
}

export interface IPadItemUpdateState {
  fieldsBase: IPadItemBaseState;
  isNew: boolean;
}

// Reducer

export default (state: PadItemState = initialState, action): PadItemState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_PADITEM_LIST_EXPORT):
    case REQUEST(ACTION_TYPES.FETCH_PADITEM_LIST):
    case REQUEST(ACTION_TYPES.FETCH_PADITEM):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_PADITEM):
    case REQUEST(ACTION_TYPES.UPDATE_PADITEM):
    case REQUEST(ACTION_TYPES.DELETE_PADITEM):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_PADITEM_LIST_EXPORT):
    case FAILURE(ACTION_TYPES.FETCH_PADITEM_LIST):
    case FAILURE(ACTION_TYPES.FETCH_PADITEM):
    case FAILURE(ACTION_TYPES.CREATE_PADITEM):
    case FAILURE(ACTION_TYPES.UPDATE_PADITEM):
    case FAILURE(ACTION_TYPES.DELETE_PADITEM):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_PADITEM_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10)
      };
    case SUCCESS(ACTION_TYPES.FETCH_PADITEM):
      action.payload.data.observacao = action.payload.data.observacao
        ? Buffer.from(action.payload.data.observacao).toString()
        : action.payload.data.observacao;
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_PADITEM):
    case SUCCESS(ACTION_TYPES.UPDATE_PADITEM):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_PADITEM):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {}
      };
    case ACTION_TYPES.SET_BLOB: {
      const { name, data, contentType, fileName } = action.payload;
      return {
        ...state,
        entity: {
          ...state.entity,
          [name + 'Base64']: data,
          [name + 'ContentType']: contentType,
          [name + 'FileName']: fileName
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

const apiUrl = 'api/pad-items';

// Actions

// Actions
export type ICrudGetAllActionPadItem<T> = (
  idPedido?: any,
  dataInicio?: any,
  dataFim?: any,
  qtdSessoes?: any,
  observacao?: any,
  sub?: any,
  ativo?: any,
  dataPadItemIncompleto?: any,
  dataPadItemCompleto?: any,
  numGhc?: any,
  cidXPtaNovo?: any,
  categoriaId?: any,
  score?: any,
  page?: number,
  size?: number,
  sort?: string
) => IPayload<T> | ((dispatch: any) => IPayload<T>);

export const getEntities: ICrudGetAllActionPadItem<IPadItem> = (
  idPedido,
  dataInicio,
  dataFim,
  qtdSessoes,
  observacao,
  sub,
  ativo,
  dataPadItemIncompleto,
  dataPadItemCompleto,
  numGhc,
  cidXPtaNovo,
  categoriaId,
  score,
  page,
  size,
  sort
) => {
  const idPedidoRequest = idPedido ? `idPedido.contains=${idPedido}&` : '';
  const dataInicioRequest = dataInicio ? `dataInicio.equals=${dataInicio}&` : '';
  const dataFimRequest = dataFim ? `dataFim.equals=${dataFim}&` : '';
  const qtdSessoesRequest = qtdSessoes ? `qtdSessoes.contains=${qtdSessoes}&` : '';
  const observacaoRequest = observacao ? `observacao.contains=${observacao}&` : '';
  const subRequest = sub ? `sub.contains=${sub}&` : '';
  const ativoRequest = ativo ? `ativo.contains=${ativo}&` : '';
  const dataPadItemIncompletoRequest = dataPadItemIncompleto ? `dataPadItemIncompleto.contains=${dataPadItemIncompleto}&` : '';
  const dataPadItemCompletoRequest = dataPadItemCompleto ? `dataPadItemCompleto.contains=${dataPadItemCompleto}&` : '';
  const numGhcRequest = numGhc ? `numGhc.contains=${numGhc}&` : '';
  const cidXPtaNovoRequest = cidXPtaNovo ? `cidXPtaNovo.contains=${cidXPtaNovo}&` : '';
  const categoriaIdRequest = categoriaId ? `categoriaId.contains=${categoriaId}&` : '';
  const scoreRequest = score ? `score.contains=${score}&` : '';

  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}&` : '?'}`;
  return {
    type: ACTION_TYPES.FETCH_PADITEM_LIST,
    payload: axios.get<IPadItem>(
      `${requestUrl}${idPedidoRequest}${dataInicioRequest}${dataFimRequest}${qtdSessoesRequest}${observacaoRequest}${subRequest}${ativoRequest}${dataPadItemIncompletoRequest}${dataPadItemCompletoRequest}${numGhcRequest}${cidXPtaNovoRequest}${categoriaIdRequest}${scoreRequest}cacheBuster=${new Date().getTime()}`
    )
  };
};
export const getEntity: ICrudGetAction<IPadItem> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_PADITEM,
    payload: axios.get<IPadItem>(requestUrl)
  };
};

export const getEntitiesExport: ICrudGetAllActionPadItem<IPadItem> = (
  idPedido,
  dataInicio,
  dataFim,
  qtdSessoes,
  observacao,
  sub,
  ativo,
  dataPadItemIncompleto,
  dataPadItemCompleto,
  numGhc,
  cidXPtaNovo,
  categoriaId,
  score,
  page,
  size,
  sort
) => {
  const idPedidoRequest = idPedido ? `idPedido.contains=${idPedido}&` : '';
  const dataInicioRequest = dataInicio ? `dataInicio.equals=${dataInicio}&` : '';
  const dataFimRequest = dataFim ? `dataFim.equals=${dataFim}&` : '';
  const qtdSessoesRequest = qtdSessoes ? `qtdSessoes.contains=${qtdSessoes}&` : '';
  const observacaoRequest = observacao ? `observacao.contains=${observacao}&` : '';
  const subRequest = sub ? `sub.contains=${sub}&` : '';
  const ativoRequest = ativo ? `ativo.contains=${ativo}&` : '';
  const dataPadItemIncompletoRequest = dataPadItemIncompleto ? `dataPadItemIncompleto.contains=${dataPadItemIncompleto}&` : '';
  const dataPadItemCompletoRequest = dataPadItemCompleto ? `dataPadItemCompleto.contains=${dataPadItemCompleto}&` : '';
  const numGhcRequest = numGhc ? `numGhc.contains=${numGhc}&` : '';
  const cidXPtaNovoRequest = cidXPtaNovo ? `cidXPtaNovo.contains=${cidXPtaNovo}&` : '';
  const categoriaIdRequest = categoriaId ? `categoriaId.contains=${categoriaId}&` : '';
  const scoreRequest = score ? `score.contains=${score}&` : '';

  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}&` : '?'}`;
  return {
    type: ACTION_TYPES.FETCH_PADITEM_LIST,
    payload: axios.get<IPadItem>(
      `${requestUrl}${idPedidoRequest}${dataInicioRequest}${dataFimRequest}${qtdSessoesRequest}${observacaoRequest}${subRequest}${ativoRequest}${dataPadItemIncompletoRequest}${dataPadItemCompletoRequest}${numGhcRequest}${cidXPtaNovoRequest}${categoriaIdRequest}${scoreRequest}cacheBuster=${new Date().getTime()}`
    )
  };
};

export const createEntity: ICrudPutAction<IPadItem> = entity => async dispatch => {
  entity = {
    ...entity
  };
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_PADITEM,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IPadItem> = entity => async dispatch => {
  entity = { ...entity };
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_PADITEM,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IPadItem> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_PADITEM,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const setBlob = (name, data, contentType?, fileName?) => ({
  type: ACTION_TYPES.SET_BLOB,
  payload: {
    name,
    data,
    contentType,
    fileName
  }
});

export const reset = () => ({
  type: ACTION_TYPES.RESET
});

export const getPadItemState = (location): IPadItemBaseState => {
  const url = new URL(`http://localhost${location.search}`); // using a dummy url for parsing
  const baseFilters = url.searchParams.get('baseFilters') || '';
  const idPedido = url.searchParams.get('idPedido') || '';
  const dataInicio = url.searchParams.get('dataInicio') || '';
  const dataFim = url.searchParams.get('dataFim') || '';
  const qtdSessoes = url.searchParams.get('qtdSessoes') || '';
  const observacao = url.searchParams.get('observacao') || '';
  const sub = url.searchParams.get('sub') || '';
  const ativo = url.searchParams.get('ativo') || '';
  const dataPadItemIncompleto = url.searchParams.get('dataPadItemIncompleto') || '';
  const dataPadItemCompleto = url.searchParams.get('dataPadItemCompleto') || '';
  const numGhc = url.searchParams.get('numGhc') || '';
  const cidXPtaNovo = url.searchParams.get('cidXPtaNovo') || '';
  const categoriaId = url.searchParams.get('categoriaId') || '';
  const score = url.searchParams.get('score') || '';

  return {
    baseFilters,
    idPedido,
    dataInicio,
    dataFim,
    qtdSessoes,
    observacao,
    sub,
    ativo,
    dataPadItemIncompleto,
    dataPadItemCompleto,
    numGhc,
    cidXPtaNovo,
    categoriaId,
    score
  };
};
