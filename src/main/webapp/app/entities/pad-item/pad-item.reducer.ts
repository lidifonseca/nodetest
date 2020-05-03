/* eslint complexity: ["error", 100] */
import axios from 'axios';
import { ICrudGetAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { IPayload } from 'react-jhipster/src/type/redux-action.type';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IPadItem, defaultValue } from 'app/shared/model/pad-item.model';

export const ACTION_TYPES = {
  FETCH_PADITEM_LIST: 'padItem/FETCH_PADITEM_LIST',
  FETCH_PADITEM: 'padItem/FETCH_PADITEM',
  CREATE_PADITEM: 'padItem/CREATE_PADITEM',
  UPDATE_PADITEM: 'padItem/UPDATE_PADITEM',
  DELETE_PADITEM: 'padItem/DELETE_PADITEM',
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

// Reducer

export default (state: PadItemState = initialState, action): PadItemState => {
  switch (action.type) {
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
  dataPost?: any,
  dataPadItemIncompleto?: any,
  dataPadItemCompleto?: any,
  numGhc?: any,
  cidXPtaNovo?: any,
  categoriaId?: any,
  score?: any,
  atendimento?: any,
  atendimentoCepRecusado?: any,
  atendimentoSorteioFeito?: any,
  padItemAtividade?: any,
  padItemCepRecusado?: any,
  padItemResultado?: any,
  padItemSorteioFeito?: any,
  idPad?: any,
  idEspecialidade?: any,
  idPeriodicidade?: any,
  idPeriodo?: any,
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
  dataPost,
  dataPadItemIncompleto,
  dataPadItemCompleto,
  numGhc,
  cidXPtaNovo,
  categoriaId,
  score,
  atendimento,
  atendimentoCepRecusado,
  atendimentoSorteioFeito,
  padItemAtividade,
  padItemCepRecusado,
  padItemResultado,
  padItemSorteioFeito,
  idPad,
  idEspecialidade,
  idPeriodicidade,
  idPeriodo,
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
  const dataPostRequest = dataPost ? `dataPost.contains=${dataPost}&` : '';
  const dataPadItemIncompletoRequest = dataPadItemIncompleto ? `dataPadItemIncompleto.contains=${dataPadItemIncompleto}&` : '';
  const dataPadItemCompletoRequest = dataPadItemCompleto ? `dataPadItemCompleto.contains=${dataPadItemCompleto}&` : '';
  const numGhcRequest = numGhc ? `numGhc.contains=${numGhc}&` : '';
  const cidXPtaNovoRequest = cidXPtaNovo ? `cidXPtaNovo.contains=${cidXPtaNovo}&` : '';
  const categoriaIdRequest = categoriaId ? `categoriaId.contains=${categoriaId}&` : '';
  const scoreRequest = score ? `score.contains=${score}&` : '';
  const atendimentoRequest = atendimento ? `atendimento.equals=${atendimento}&` : '';
  const atendimentoCepRecusadoRequest = atendimentoCepRecusado ? `atendimentoCepRecusado.equals=${atendimentoCepRecusado}&` : '';
  const atendimentoSorteioFeitoRequest = atendimentoSorteioFeito ? `atendimentoSorteioFeito.equals=${atendimentoSorteioFeito}&` : '';
  const padItemAtividadeRequest = padItemAtividade ? `padItemAtividade.equals=${padItemAtividade}&` : '';
  const padItemCepRecusadoRequest = padItemCepRecusado ? `padItemCepRecusado.equals=${padItemCepRecusado}&` : '';
  const padItemResultadoRequest = padItemResultado ? `padItemResultado.equals=${padItemResultado}&` : '';
  const padItemSorteioFeitoRequest = padItemSorteioFeito ? `padItemSorteioFeito.equals=${padItemSorteioFeito}&` : '';
  const idPadRequest = idPad ? `idPad.equals=${idPad}&` : '';
  const idEspecialidadeRequest = idEspecialidade ? `idEspecialidade.equals=${idEspecialidade}&` : '';
  const idPeriodicidadeRequest = idPeriodicidade ? `idPeriodicidade.equals=${idPeriodicidade}&` : '';
  const idPeriodoRequest = idPeriodo ? `idPeriodo.equals=${idPeriodo}&` : '';

  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}&` : '?'}`;
  return {
    type: ACTION_TYPES.FETCH_PADITEM_LIST,
    payload: axios.get<IPadItem>(
      `${requestUrl}${idPedidoRequest}${dataInicioRequest}${dataFimRequest}${qtdSessoesRequest}${observacaoRequest}${subRequest}${ativoRequest}${dataPostRequest}${dataPadItemIncompletoRequest}${dataPadItemCompletoRequest}${numGhcRequest}${cidXPtaNovoRequest}${categoriaIdRequest}${scoreRequest}${atendimentoRequest}${atendimentoCepRecusadoRequest}${atendimentoSorteioFeitoRequest}${padItemAtividadeRequest}${padItemCepRecusadoRequest}${padItemResultadoRequest}${padItemSorteioFeitoRequest}${idPadRequest}${idEspecialidadeRequest}${idPeriodicidadeRequest}${idPeriodoRequest}cacheBuster=${new Date().getTime()}`
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

export const createEntity: ICrudPutAction<IPadItem> = entity => async dispatch => {
  entity = {
    ...entity,
    idPad: entity.idPad === 'null' ? null : entity.idPad,
    idEspecialidade: entity.idEspecialidade === 'null' ? null : entity.idEspecialidade,
    idPeriodicidade: entity.idPeriodicidade === 'null' ? null : entity.idPeriodicidade,
    idPeriodo: entity.idPeriodo === 'null' ? null : entity.idPeriodo
  };
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_PADITEM,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IPadItem> = entity => async dispatch => {
  entity = {
    ...entity,
    idPad: entity.idPad === 'null' ? null : entity.idPad,
    idEspecialidade: entity.idEspecialidade === 'null' ? null : entity.idEspecialidade,
    idPeriodicidade: entity.idPeriodicidade === 'null' ? null : entity.idPeriodicidade,
    idPeriodo: entity.idPeriodo === 'null' ? null : entity.idPeriodo
  };
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

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
