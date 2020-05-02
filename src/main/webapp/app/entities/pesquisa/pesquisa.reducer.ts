import axios from 'axios';
import { ICrudGetAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { IPayload } from 'react-jhipster/src/type/redux-action.type';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IPesquisa, defaultValue } from 'app/shared/model/pesquisa.model';

export const ACTION_TYPES = {
  FETCH_PESQUISA_LIST: 'pesquisa/FETCH_PESQUISA_LIST',
  FETCH_PESQUISA: 'pesquisa/FETCH_PESQUISA',
  CREATE_PESQUISA: 'pesquisa/CREATE_PESQUISA',
  UPDATE_PESQUISA: 'pesquisa/UPDATE_PESQUISA',
  DELETE_PESQUISA: 'pesquisa/DELETE_PESQUISA',
  SET_BLOB: 'pesquisa/SET_BLOB',
  RESET: 'pesquisa/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IPesquisa>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type PesquisaState = Readonly<typeof initialState>;

// Reducer

export default (state: PesquisaState = initialState, action): PesquisaState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_PESQUISA_LIST):
    case REQUEST(ACTION_TYPES.FETCH_PESQUISA):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_PESQUISA):
    case REQUEST(ACTION_TYPES.UPDATE_PESQUISA):
    case REQUEST(ACTION_TYPES.DELETE_PESQUISA):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_PESQUISA_LIST):
    case FAILURE(ACTION_TYPES.FETCH_PESQUISA):
    case FAILURE(ACTION_TYPES.CREATE_PESQUISA):
    case FAILURE(ACTION_TYPES.UPDATE_PESQUISA):
    case FAILURE(ACTION_TYPES.DELETE_PESQUISA):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_PESQUISA_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10)
      };
    case SUCCESS(ACTION_TYPES.FETCH_PESQUISA):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_PESQUISA):
    case SUCCESS(ACTION_TYPES.UPDATE_PESQUISA):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_PESQUISA):
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

const apiUrl = 'api/pesquisas';

// Actions

// Actions
export type ICrudGetAllActionPesquisa<T> = (
  nome?: any,
  classesIncluir?: any,
  incluirMovimentacoes?: any,
  descartarMovimentacoes?: any,
  incluirMovimentacoesAll?: any,
  anoInicial?: any,
  anoFinal?: any,
  csv?: any,
  dataCriacao?: any,
  dataFinalizacao?: any,
  situacao?: any,
  observacoes?: any,
  csvTotal?: any,
  csvVerificados?: any,
  comarcaPorComarca?: any,
  user?: any,
  processo?: any,
  comarcas?: any,
  estado?: any,
  page?: Number,
  size?: Number,
  sort?: String
) => IPayload<T> | ((dispatch: any) => IPayload<T>);

export const getEntities: ICrudGetAllActionPesquisa<IPesquisa> = (
  nome,
  classesIncluir,
  incluirMovimentacoes,
  descartarMovimentacoes,
  incluirMovimentacoesAll,
  anoInicial,
  anoFinal,
  csv,
  dataCriacao,
  dataFinalizacao,
  situacao,
  observacoes,
  csvTotal,
  csvVerificados,
  comarcaPorComarca,
  user,
  processo,
  comarcas,
  estado,
  page,
  size,
  sort
) => {
  const nomeRequest = nome ? `nome.contains=${nome}&` : '';
  const classesIncluirRequest = classesIncluir ? `classesIncluir.contains=${classesIncluir}&` : '';
  const incluirMovimentacoesRequest = incluirMovimentacoes ? `incluirMovimentacoes.contains=${incluirMovimentacoes}&` : '';
  const descartarMovimentacoesRequest = descartarMovimentacoes ? `descartarMovimentacoes.contains=${descartarMovimentacoes}&` : '';
  const incluirMovimentacoesAllRequest = incluirMovimentacoesAll ? `incluirMovimentacoesAll.contains=${incluirMovimentacoesAll}&` : '';
  const anoInicialRequest = anoInicial ? `anoInicial.contains=${anoInicial}&` : '';
  const anoFinalRequest = anoFinal ? `anoFinal.contains=${anoFinal}&` : '';
  const csvRequest = csv ? `csv.contains=${csv}&` : '';
  const dataCriacaoRequest = dataCriacao ? `dataCriacao.contains=${dataCriacao}&` : '';
  const dataFinalizacaoRequest = dataFinalizacao ? `dataFinalizacao.contains=${dataFinalizacao}&` : '';
  const situacaoRequest = situacao ? `situacao.contains=${situacao}&` : '';
  const observacoesRequest = observacoes ? `observacoes.contains=${observacoes}&` : '';
  const csvTotalRequest = csvTotal ? `csvTotal.contains=${csvTotal}&` : '';
  const csvVerificadosRequest = csvVerificados ? `csvVerificados.contains=${csvVerificados}&` : '';
  const comarcaPorComarcaRequest = comarcaPorComarca ? `comarcaPorComarca.contains=${comarcaPorComarca}&` : '';
  const userRequest = user ? `userId.equals=${user}&` : '';
  const processoRequest = processo ? `processoId.equals=${processo}&` : '';
  const comarcasRequest = comarcas ? `comarcasId.equals=${comarcas}&` : '';
  const estadoRequest = estado ? `estadoId.equals=${estado}&` : '';

  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}&` : '?'}`;
  return {
    type: ACTION_TYPES.FETCH_PESQUISA_LIST,
    payload: axios.get<IPesquisa>(
      `${requestUrl}${nomeRequest}${classesIncluirRequest}${incluirMovimentacoesRequest}${descartarMovimentacoesRequest}${incluirMovimentacoesAllRequest}${anoInicialRequest}${anoFinalRequest}${csvRequest}${dataCriacaoRequest}${dataFinalizacaoRequest}${situacaoRequest}${observacoesRequest}${csvTotalRequest}${csvVerificadosRequest}${comarcaPorComarcaRequest}${userRequest}${processoRequest}${comarcasRequest}${estadoRequest}cacheBuster=${new Date().getTime()}`
    )
  };
};
export const getEntity: ICrudGetAction<IPesquisa> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_PESQUISA,
    payload: axios.get<IPesquisa>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IPesquisa> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_PESQUISA,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IPesquisa> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_PESQUISA,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IPesquisa> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_PESQUISA,
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
