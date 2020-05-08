/* eslint complexity: ["error", 100] */
import axios from 'axios';
import { ICrudGetAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { IPayload } from 'react-jhipster/src/type/redux-action.type';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IPacienteDadosCartao, defaultValue } from 'app/shared/model/paciente-dados-cartao.model';

export const ACTION_TYPES = {
  FETCH_PACIENTEDADOSCARTAO_LIST_EXPORT: 'pacienteDadosCartao/FETCH_PACIENTEDADOSCARTAO_LIST_EXPORT',
  FETCH_PACIENTEDADOSCARTAO_LIST: 'pacienteDadosCartao/FETCH_PACIENTEDADOSCARTAO_LIST',
  FETCH_PACIENTEDADOSCARTAO: 'pacienteDadosCartao/FETCH_PACIENTEDADOSCARTAO',
  CREATE_PACIENTEDADOSCARTAO: 'pacienteDadosCartao/CREATE_PACIENTEDADOSCARTAO',
  UPDATE_PACIENTEDADOSCARTAO: 'pacienteDadosCartao/UPDATE_PACIENTEDADOSCARTAO',
  DELETE_PACIENTEDADOSCARTAO: 'pacienteDadosCartao/DELETE_PACIENTEDADOSCARTAO',
  RESET: 'pacienteDadosCartao/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IPacienteDadosCartao>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type PacienteDadosCartaoState = Readonly<typeof initialState>;

export interface IPacienteDadosCartaoBaseState {
  baseFilters: any;
  bandeira: any;
  numeroCartao: any;
  validade: any;
  codAtivacao: any;
  ativo: any;
}

export interface IPacienteDadosCartaoUpdateState {
  fieldsBase: IPacienteDadosCartaoBaseState;

  isNew: boolean;
}

// Reducer

export default (state: PacienteDadosCartaoState = initialState, action): PacienteDadosCartaoState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_PACIENTEDADOSCARTAO_LIST_EXPORT):
    case REQUEST(ACTION_TYPES.FETCH_PACIENTEDADOSCARTAO_LIST):
    case REQUEST(ACTION_TYPES.FETCH_PACIENTEDADOSCARTAO):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_PACIENTEDADOSCARTAO):
    case REQUEST(ACTION_TYPES.UPDATE_PACIENTEDADOSCARTAO):
    case REQUEST(ACTION_TYPES.DELETE_PACIENTEDADOSCARTAO):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_PACIENTEDADOSCARTAO_LIST_EXPORT):
    case FAILURE(ACTION_TYPES.FETCH_PACIENTEDADOSCARTAO_LIST):
    case FAILURE(ACTION_TYPES.FETCH_PACIENTEDADOSCARTAO):
    case FAILURE(ACTION_TYPES.CREATE_PACIENTEDADOSCARTAO):
    case FAILURE(ACTION_TYPES.UPDATE_PACIENTEDADOSCARTAO):
    case FAILURE(ACTION_TYPES.DELETE_PACIENTEDADOSCARTAO):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_PACIENTEDADOSCARTAO_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10)
      };
    case SUCCESS(ACTION_TYPES.FETCH_PACIENTEDADOSCARTAO):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_PACIENTEDADOSCARTAO):
    case SUCCESS(ACTION_TYPES.UPDATE_PACIENTEDADOSCARTAO):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_PACIENTEDADOSCARTAO):
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

const apiUrl = 'api/paciente-dados-cartaos';

// Actions

// Actions
export type ICrudGetAllActionPacienteDadosCartao<T> = (
  bandeira?: any,
  numeroCartao?: any,
  validade?: any,
  codAtivacao?: any,
  ativo?: any,
  page?: number,
  size?: number,
  sort?: string
) => IPayload<T> | ((dispatch: any) => IPayload<T>);

export const getEntities: ICrudGetAllActionPacienteDadosCartao<IPacienteDadosCartao> = (
  bandeira,
  numeroCartao,
  validade,
  codAtivacao,
  ativo,
  page,
  size,
  sort
) => {
  const bandeiraRequest = bandeira ? `bandeira.contains=${bandeira}&` : '';
  const numeroCartaoRequest = numeroCartao ? `numeroCartao.contains=${numeroCartao}&` : '';
  const validadeRequest = validade ? `validade.equals=${validade}&` : '';
  const codAtivacaoRequest = codAtivacao ? `codAtivacao.contains=${codAtivacao}&` : '';
  const ativoRequest = ativo ? `ativo.contains=${ativo}&` : '';

  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}&` : '?'}`;
  return {
    type: ACTION_TYPES.FETCH_PACIENTEDADOSCARTAO_LIST,
    payload: axios.get<IPacienteDadosCartao>(
      `${requestUrl}${bandeiraRequest}${numeroCartaoRequest}${validadeRequest}${codAtivacaoRequest}${ativoRequest}cacheBuster=${new Date().getTime()}`
    )
  };
};
export const getEntity: ICrudGetAction<IPacienteDadosCartao> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_PACIENTEDADOSCARTAO,
    payload: axios.get<IPacienteDadosCartao>(requestUrl)
  };
};

export const getEntitiesExport: ICrudGetAllActionPacienteDadosCartao<IPacienteDadosCartao> = (
  bandeira,
  numeroCartao,
  validade,
  codAtivacao,
  ativo,
  page,
  size,
  sort
) => {
  const bandeiraRequest = bandeira ? `bandeira.contains=${bandeira}&` : '';
  const numeroCartaoRequest = numeroCartao ? `numeroCartao.contains=${numeroCartao}&` : '';
  const validadeRequest = validade ? `validade.equals=${validade}&` : '';
  const codAtivacaoRequest = codAtivacao ? `codAtivacao.contains=${codAtivacao}&` : '';
  const ativoRequest = ativo ? `ativo.contains=${ativo}&` : '';

  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}&` : '?'}`;
  return {
    type: ACTION_TYPES.FETCH_PACIENTEDADOSCARTAO_LIST,
    payload: axios.get<IPacienteDadosCartao>(
      `${requestUrl}${bandeiraRequest}${numeroCartaoRequest}${validadeRequest}${codAtivacaoRequest}${ativoRequest}cacheBuster=${new Date().getTime()}`
    )
  };
};

export const createEntity: ICrudPutAction<IPacienteDadosCartao> = entity => async dispatch => {
  entity = {
    ...entity
  };
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_PACIENTEDADOSCARTAO,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IPacienteDadosCartao> = entity => async dispatch => {
  entity = { ...entity };
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_PACIENTEDADOSCARTAO,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IPacienteDadosCartao> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_PACIENTEDADOSCARTAO,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});

export const getPacienteDadosCartaoState = (location): IPacienteDadosCartaoBaseState => {
  const url = new URL(`http://localhost${location.search}`); // using a dummy url for parsing
  const baseFilters = url.searchParams.get('baseFilters') || '';
  const bandeira = url.searchParams.get('bandeira') || '';
  const numeroCartao = url.searchParams.get('numeroCartao') || '';
  const validade = url.searchParams.get('validade') || '';
  const codAtivacao = url.searchParams.get('codAtivacao') || '';
  const ativo = url.searchParams.get('ativo') || '';

  return {
    baseFilters,
    bandeira,
    numeroCartao,
    validade,
    codAtivacao,
    ativo
  };
};
