/* eslint complexity: ["error", 100] */
import axios from 'axios';
import { ICrudGetAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { IPayload } from 'react-jhipster/src/type/redux-action.type';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IPacientePedido, defaultValue } from 'app/shared/model/paciente-pedido.model';

export const ACTION_TYPES = {
  FETCH_PACIENTEPEDIDO_LIST_EXPORT: 'pacientePedido/FETCH_PACIENTEPEDIDO_LIST_EXPORT',
  FETCH_PACIENTEPEDIDO_LIST: 'pacientePedido/FETCH_PACIENTEPEDIDO_LIST',
  FETCH_PACIENTEPEDIDO: 'pacientePedido/FETCH_PACIENTEPEDIDO',
  CREATE_PACIENTEPEDIDO: 'pacientePedido/CREATE_PACIENTEPEDIDO',
  UPDATE_PACIENTEPEDIDO: 'pacientePedido/UPDATE_PACIENTEPEDIDO',
  DELETE_PACIENTEPEDIDO: 'pacientePedido/DELETE_PACIENTEPEDIDO',
  RESET: 'pacientePedido/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IPacientePedido>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type PacientePedidoState = Readonly<typeof initialState>;

export interface IPacientePedidoBaseState {
  baseFilters: any;
  dataPedido: any;
  dataAgenda: any;
  qtdSessoes: any;
  parcelas: any;
  valor: any;
  desconto: any;
  tipoValor: any;
  unidade: any;
  paciente: any;
  cartao: any;
  especialidade: any;
}

export interface IPacientePedidoUpdateState {
  fieldsBase: IPacientePedidoBaseState;

  unidadeEasySelectValue: any;
  pacienteSelectValue: any;
  pacienteDadosCartaoSelectValue: any;
  especialidadeSelectValue: any;
  isNew: boolean;
  unidadeId: string;
  pacienteId: string;
  cartaoId: string;
  especialidadeId: string;
}

// Reducer

export default (state: PacientePedidoState = initialState, action): PacientePedidoState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_PACIENTEPEDIDO_LIST_EXPORT):
    case REQUEST(ACTION_TYPES.FETCH_PACIENTEPEDIDO_LIST):
    case REQUEST(ACTION_TYPES.FETCH_PACIENTEPEDIDO):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_PACIENTEPEDIDO):
    case REQUEST(ACTION_TYPES.UPDATE_PACIENTEPEDIDO):
    case REQUEST(ACTION_TYPES.DELETE_PACIENTEPEDIDO):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_PACIENTEPEDIDO_LIST_EXPORT):
    case FAILURE(ACTION_TYPES.FETCH_PACIENTEPEDIDO_LIST):
    case FAILURE(ACTION_TYPES.FETCH_PACIENTEPEDIDO):
    case FAILURE(ACTION_TYPES.CREATE_PACIENTEPEDIDO):
    case FAILURE(ACTION_TYPES.UPDATE_PACIENTEPEDIDO):
    case FAILURE(ACTION_TYPES.DELETE_PACIENTEPEDIDO):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_PACIENTEPEDIDO_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10)
      };
    case SUCCESS(ACTION_TYPES.FETCH_PACIENTEPEDIDO):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_PACIENTEPEDIDO):
    case SUCCESS(ACTION_TYPES.UPDATE_PACIENTEPEDIDO):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_PACIENTEPEDIDO):
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

const apiUrl = 'api/paciente-pedidos';

// Actions

// Actions
export type ICrudGetAllActionPacientePedido<T> = (
  dataPedido?: any,
  dataAgenda?: any,
  qtdSessoes?: any,
  parcelas?: any,
  valor?: any,
  desconto?: any,
  tipoValor?: any,
  unidade?: any,
  paciente?: any,
  cartao?: any,
  especialidade?: any,
  page?: number,
  size?: number,
  sort?: string
) => IPayload<T> | ((dispatch: any) => IPayload<T>);

export const getEntities: ICrudGetAllActionPacientePedido<IPacientePedido> = (
  dataPedido,
  dataAgenda,
  qtdSessoes,
  parcelas,
  valor,
  desconto,
  tipoValor,
  unidade,
  paciente,
  cartao,
  especialidade,
  page,
  size,
  sort
) => {
  const dataPedidoRequest = dataPedido ? `dataPedido.equals=${dataPedido}&` : '';
  const dataAgendaRequest = dataAgenda ? `dataAgenda.contains=${dataAgenda}&` : '';
  const qtdSessoesRequest = qtdSessoes ? `qtdSessoes.contains=${qtdSessoes}&` : '';
  const parcelasRequest = parcelas ? `parcelas.contains=${parcelas}&` : '';
  const valorRequest = valor ? `valor.contains=${valor}&` : '';
  const descontoRequest = desconto ? `desconto.contains=${desconto}&` : '';
  const tipoValorRequest = tipoValor ? `tipoValor.contains=${tipoValor}&` : '';
  const unidadeRequest = unidade ? `unidade.equals=${unidade}&` : '';
  const pacienteRequest = paciente ? `paciente.equals=${paciente}&` : '';
  const cartaoRequest = cartao ? `cartao.equals=${cartao}&` : '';
  const especialidadeRequest = especialidade ? `especialidade.equals=${especialidade}&` : '';

  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}&` : '?'}`;
  return {
    type: ACTION_TYPES.FETCH_PACIENTEPEDIDO_LIST,
    payload: axios.get<IPacientePedido>(
      `${requestUrl}${dataPedidoRequest}${dataAgendaRequest}${qtdSessoesRequest}${parcelasRequest}${valorRequest}${descontoRequest}${tipoValorRequest}${unidadeRequest}${pacienteRequest}${cartaoRequest}${especialidadeRequest}cacheBuster=${new Date().getTime()}`
    )
  };
};
export const getEntity: ICrudGetAction<IPacientePedido> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_PACIENTEPEDIDO,
    payload: axios.get<IPacientePedido>(requestUrl)
  };
};

export const getEntitiesExport: ICrudGetAllActionPacientePedido<IPacientePedido> = (
  dataPedido,
  dataAgenda,
  qtdSessoes,
  parcelas,
  valor,
  desconto,
  tipoValor,
  unidade,
  paciente,
  cartao,
  especialidade,
  page,
  size,
  sort
) => {
  const dataPedidoRequest = dataPedido ? `dataPedido.equals=${dataPedido}&` : '';
  const dataAgendaRequest = dataAgenda ? `dataAgenda.contains=${dataAgenda}&` : '';
  const qtdSessoesRequest = qtdSessoes ? `qtdSessoes.contains=${qtdSessoes}&` : '';
  const parcelasRequest = parcelas ? `parcelas.contains=${parcelas}&` : '';
  const valorRequest = valor ? `valor.contains=${valor}&` : '';
  const descontoRequest = desconto ? `desconto.contains=${desconto}&` : '';
  const tipoValorRequest = tipoValor ? `tipoValor.contains=${tipoValor}&` : '';
  const unidadeRequest = unidade ? `unidade.equals=${unidade}&` : '';
  const pacienteRequest = paciente ? `paciente.equals=${paciente}&` : '';
  const cartaoRequest = cartao ? `cartao.equals=${cartao}&` : '';
  const especialidadeRequest = especialidade ? `especialidade.equals=${especialidade}&` : '';

  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}&` : '?'}`;
  return {
    type: ACTION_TYPES.FETCH_PACIENTEPEDIDO_LIST,
    payload: axios.get<IPacientePedido>(
      `${requestUrl}${dataPedidoRequest}${dataAgendaRequest}${qtdSessoesRequest}${parcelasRequest}${valorRequest}${descontoRequest}${tipoValorRequest}${unidadeRequest}${pacienteRequest}${cartaoRequest}${especialidadeRequest}cacheBuster=${new Date().getTime()}`
    )
  };
};

export const createEntity: ICrudPutAction<IPacientePedido> = entity => async dispatch => {
  entity = {
    ...entity,
    unidade: entity.unidade === 'null' ? null : entity.unidade,
    paciente: entity.paciente === 'null' ? null : entity.paciente,
    cartao: entity.cartao === 'null' ? null : entity.cartao,
    especialidade: entity.especialidade === 'null' ? null : entity.especialidade
  };
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_PACIENTEPEDIDO,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IPacientePedido> = entity => async dispatch => {
  entity = {
    ...entity,
    unidade: entity.unidade === 'null' ? null : entity.unidade,
    paciente: entity.paciente === 'null' ? null : entity.paciente,
    cartao: entity.cartao === 'null' ? null : entity.cartao,
    especialidade: entity.especialidade === 'null' ? null : entity.especialidade
  };
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_PACIENTEPEDIDO,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IPacientePedido> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_PACIENTEPEDIDO,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});

export const getPacientePedidoState = (location): IPacientePedidoBaseState => {
  const url = new URL(`http://localhost${location.search}`); // using a dummy url for parsing
  const baseFilters = url.searchParams.get('baseFilters') || '';
  const dataPedido = url.searchParams.get('dataPedido') || '';
  const dataAgenda = url.searchParams.get('dataAgenda') || '';
  const qtdSessoes = url.searchParams.get('qtdSessoes') || '';
  const parcelas = url.searchParams.get('parcelas') || '';
  const valor = url.searchParams.get('valor') || '';
  const desconto = url.searchParams.get('desconto') || '';
  const tipoValor = url.searchParams.get('tipoValor') || '';

  const unidade = url.searchParams.get('unidade') || '';
  const paciente = url.searchParams.get('paciente') || '';
  const cartao = url.searchParams.get('cartao') || '';
  const especialidade = url.searchParams.get('especialidade') || '';

  return {
    baseFilters,
    dataPedido,
    dataAgenda,
    qtdSessoes,
    parcelas,
    valor,
    desconto,
    tipoValor,
    unidade,
    paciente,
    cartao,
    especialidade
  };
};
