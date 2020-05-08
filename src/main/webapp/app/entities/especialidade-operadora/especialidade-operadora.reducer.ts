/* eslint complexity: ["error", 100] */
import axios from 'axios';
import { ICrudGetAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { IPayload } from 'react-jhipster/src/type/redux-action.type';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IEspecialidadeOperadora, defaultValue } from 'app/shared/model/especialidade-operadora.model';

export const ACTION_TYPES = {
  FETCH_ESPECIALIDADEOPERADORA_LIST_EXPORT: 'especialidadeOperadora/FETCH_ESPECIALIDADEOPERADORA_LIST_EXPORT',
  FETCH_ESPECIALIDADEOPERADORA_LIST: 'especialidadeOperadora/FETCH_ESPECIALIDADEOPERADORA_LIST',
  FETCH_ESPECIALIDADEOPERADORA: 'especialidadeOperadora/FETCH_ESPECIALIDADEOPERADORA',
  CREATE_ESPECIALIDADEOPERADORA: 'especialidadeOperadora/CREATE_ESPECIALIDADEOPERADORA',
  UPDATE_ESPECIALIDADEOPERADORA: 'especialidadeOperadora/UPDATE_ESPECIALIDADEOPERADORA',
  DELETE_ESPECIALIDADEOPERADORA: 'especialidadeOperadora/DELETE_ESPECIALIDADEOPERADORA',
  RESET: 'especialidadeOperadora/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IEspecialidadeOperadora>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type EspecialidadeOperadoraState = Readonly<typeof initialState>;

export interface IEspecialidadeOperadoraBaseState {
  baseFilters: any;
  codTuss: any;
  codDespesa: any;
  codTabela: any;
  valorCusto: any;
  valorVenda: any;
  descontoCusto: any;
  descontoVenda: any;
  ativo: any;
  operadora: any;
  especialidade: any;
}

export interface IEspecialidadeOperadoraUpdateState {
  fieldsBase: IEspecialidadeOperadoraBaseState;

  operadoraSelectValue: any;
  especialidadeSelectValue: any;
  isNew: boolean;
  operadoraId: string;
  especialidadeId: string;
}

// Reducer

export default (state: EspecialidadeOperadoraState = initialState, action): EspecialidadeOperadoraState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_ESPECIALIDADEOPERADORA_LIST_EXPORT):
    case REQUEST(ACTION_TYPES.FETCH_ESPECIALIDADEOPERADORA_LIST):
    case REQUEST(ACTION_TYPES.FETCH_ESPECIALIDADEOPERADORA):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_ESPECIALIDADEOPERADORA):
    case REQUEST(ACTION_TYPES.UPDATE_ESPECIALIDADEOPERADORA):
    case REQUEST(ACTION_TYPES.DELETE_ESPECIALIDADEOPERADORA):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_ESPECIALIDADEOPERADORA_LIST_EXPORT):
    case FAILURE(ACTION_TYPES.FETCH_ESPECIALIDADEOPERADORA_LIST):
    case FAILURE(ACTION_TYPES.FETCH_ESPECIALIDADEOPERADORA):
    case FAILURE(ACTION_TYPES.CREATE_ESPECIALIDADEOPERADORA):
    case FAILURE(ACTION_TYPES.UPDATE_ESPECIALIDADEOPERADORA):
    case FAILURE(ACTION_TYPES.DELETE_ESPECIALIDADEOPERADORA):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_ESPECIALIDADEOPERADORA_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10)
      };
    case SUCCESS(ACTION_TYPES.FETCH_ESPECIALIDADEOPERADORA):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_ESPECIALIDADEOPERADORA):
    case SUCCESS(ACTION_TYPES.UPDATE_ESPECIALIDADEOPERADORA):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_ESPECIALIDADEOPERADORA):
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

const apiUrl = 'api/especialidade-operadoras';

// Actions

// Actions
export type ICrudGetAllActionEspecialidadeOperadora<T> = (
  codTuss?: any,
  codDespesa?: any,
  codTabela?: any,
  valorCusto?: any,
  valorVenda?: any,
  descontoCusto?: any,
  descontoVenda?: any,
  ativo?: any,
  operadora?: any,
  especialidade?: any,
  page?: number,
  size?: number,
  sort?: string
) => IPayload<T> | ((dispatch: any) => IPayload<T>);

export const getEntities: ICrudGetAllActionEspecialidadeOperadora<IEspecialidadeOperadora> = (
  codTuss,
  codDespesa,
  codTabela,
  valorCusto,
  valorVenda,
  descontoCusto,
  descontoVenda,
  ativo,
  operadora,
  especialidade,
  page,
  size,
  sort
) => {
  const codTussRequest = codTuss ? `codTuss.contains=${codTuss}&` : '';
  const codDespesaRequest = codDespesa ? `codDespesa.contains=${codDespesa}&` : '';
  const codTabelaRequest = codTabela ? `codTabela.contains=${codTabela}&` : '';
  const valorCustoRequest = valorCusto ? `valorCusto.contains=${valorCusto}&` : '';
  const valorVendaRequest = valorVenda ? `valorVenda.contains=${valorVenda}&` : '';
  const descontoCustoRequest = descontoCusto ? `descontoCusto.contains=${descontoCusto}&` : '';
  const descontoVendaRequest = descontoVenda ? `descontoVenda.contains=${descontoVenda}&` : '';
  const ativoRequest = ativo ? `ativo.contains=${ativo}&` : '';
  const operadoraRequest = operadora ? `operadora.equals=${operadora}&` : '';
  const especialidadeRequest = especialidade ? `especialidade.equals=${especialidade}&` : '';

  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}&` : '?'}`;
  return {
    type: ACTION_TYPES.FETCH_ESPECIALIDADEOPERADORA_LIST,
    payload: axios.get<IEspecialidadeOperadora>(
      `${requestUrl}${codTussRequest}${codDespesaRequest}${codTabelaRequest}${valorCustoRequest}${valorVendaRequest}${descontoCustoRequest}${descontoVendaRequest}${ativoRequest}${operadoraRequest}${especialidadeRequest}cacheBuster=${new Date().getTime()}`
    )
  };
};
export const getEntity: ICrudGetAction<IEspecialidadeOperadora> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_ESPECIALIDADEOPERADORA,
    payload: axios.get<IEspecialidadeOperadora>(requestUrl)
  };
};

export const getEntitiesExport: ICrudGetAllActionEspecialidadeOperadora<IEspecialidadeOperadora> = (
  codTuss,
  codDespesa,
  codTabela,
  valorCusto,
  valorVenda,
  descontoCusto,
  descontoVenda,
  ativo,
  operadora,
  especialidade,
  page,
  size,
  sort
) => {
  const codTussRequest = codTuss ? `codTuss.contains=${codTuss}&` : '';
  const codDespesaRequest = codDespesa ? `codDespesa.contains=${codDespesa}&` : '';
  const codTabelaRequest = codTabela ? `codTabela.contains=${codTabela}&` : '';
  const valorCustoRequest = valorCusto ? `valorCusto.contains=${valorCusto}&` : '';
  const valorVendaRequest = valorVenda ? `valorVenda.contains=${valorVenda}&` : '';
  const descontoCustoRequest = descontoCusto ? `descontoCusto.contains=${descontoCusto}&` : '';
  const descontoVendaRequest = descontoVenda ? `descontoVenda.contains=${descontoVenda}&` : '';
  const ativoRequest = ativo ? `ativo.contains=${ativo}&` : '';
  const operadoraRequest = operadora ? `operadora.equals=${operadora}&` : '';
  const especialidadeRequest = especialidade ? `especialidade.equals=${especialidade}&` : '';

  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}&` : '?'}`;
  return {
    type: ACTION_TYPES.FETCH_ESPECIALIDADEOPERADORA_LIST,
    payload: axios.get<IEspecialidadeOperadora>(
      `${requestUrl}${codTussRequest}${codDespesaRequest}${codTabelaRequest}${valorCustoRequest}${valorVendaRequest}${descontoCustoRequest}${descontoVendaRequest}${ativoRequest}${operadoraRequest}${especialidadeRequest}cacheBuster=${new Date().getTime()}`
    )
  };
};

export const createEntity: ICrudPutAction<IEspecialidadeOperadora> = entity => async dispatch => {
  entity = {
    ...entity,
    operadora: entity.operadora === 'null' ? null : entity.operadora,
    especialidade: entity.especialidade === 'null' ? null : entity.especialidade
  };
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_ESPECIALIDADEOPERADORA,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IEspecialidadeOperadora> = entity => async dispatch => {
  entity = {
    ...entity,
    operadora: entity.operadora === 'null' ? null : entity.operadora,
    especialidade: entity.especialidade === 'null' ? null : entity.especialidade
  };
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_ESPECIALIDADEOPERADORA,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IEspecialidadeOperadora> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_ESPECIALIDADEOPERADORA,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});

export const getEspecialidadeOperadoraState = (location): IEspecialidadeOperadoraBaseState => {
  const url = new URL(`http://localhost${location.search}`); // using a dummy url for parsing
  const baseFilters = url.searchParams.get('baseFilters') || '';
  const codTuss = url.searchParams.get('codTuss') || '';
  const codDespesa = url.searchParams.get('codDespesa') || '';
  const codTabela = url.searchParams.get('codTabela') || '';
  const valorCusto = url.searchParams.get('valorCusto') || '';
  const valorVenda = url.searchParams.get('valorVenda') || '';
  const descontoCusto = url.searchParams.get('descontoCusto') || '';
  const descontoVenda = url.searchParams.get('descontoVenda') || '';
  const ativo = url.searchParams.get('ativo') || '';

  const operadora = url.searchParams.get('operadora') || '';
  const especialidade = url.searchParams.get('especialidade') || '';

  return {
    baseFilters,
    codTuss,
    codDespesa,
    codTabela,
    valorCusto,
    valorVenda,
    descontoCusto,
    descontoVenda,
    ativo,
    operadora,
    especialidade
  };
};
