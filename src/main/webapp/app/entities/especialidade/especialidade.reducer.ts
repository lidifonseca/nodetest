/* eslint complexity: ["error", 100] */
import axios from 'axios';
import { ICrudGetAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { IPayload } from 'react-jhipster/src/type/redux-action.type';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IEspecialidade, defaultValue } from 'app/shared/model/especialidade.model';

export const ACTION_TYPES = {
  FETCH_ESPECIALIDADE_LIST_EXPORT: 'especialidade/FETCH_ESPECIALIDADE_LIST_EXPORT',
  FETCH_ESPECIALIDADE_LIST: 'especialidade/FETCH_ESPECIALIDADE_LIST',
  FETCH_ESPECIALIDADE: 'especialidade/FETCH_ESPECIALIDADE',
  CREATE_ESPECIALIDADE: 'especialidade/CREATE_ESPECIALIDADE',
  UPDATE_ESPECIALIDADE: 'especialidade/UPDATE_ESPECIALIDADE',
  DELETE_ESPECIALIDADE: 'especialidade/DELETE_ESPECIALIDADE',
  SET_BLOB: 'especialidade/SET_BLOB',
  RESET: 'especialidade/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IEspecialidade>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type EspecialidadeState = Readonly<typeof initialState>;

export interface IEspecialidadeBaseState {
  baseFilters: any;
  icon: any;
  especialidade: any;
  descricao: any;
  duracao: any;
  importante: any;
  ativo: any;
  atendimento: any;
  especialidadeOperadora: any;
  especialidadeUnidade: any;
  especialidadeValor: any;
  pacientePedido: any;
  padItem: any;
  unidade: any;
  categoria: any;
  tipoEspecialidade: any;
  tipoUnidade: any;
}

export interface IEspecialidadeUpdateState {
  fieldsBase: IEspecialidadeBaseState;

  unidadeEasySelectValue: any;
  categoriaSelectValue: any;
  tipoEspecialidadeSelectValue: any;
  tipoUnidadeSelectValue: any;
  isNew: boolean;
  unidadeId: string;
  categoriaId: string;
  tipoEspecialidadeId: string;
  tipoUnidadeId: string;
}

// Reducer

export default (state: EspecialidadeState = initialState, action): EspecialidadeState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_ESPECIALIDADE_LIST_EXPORT):
    case REQUEST(ACTION_TYPES.FETCH_ESPECIALIDADE_LIST):
    case REQUEST(ACTION_TYPES.FETCH_ESPECIALIDADE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_ESPECIALIDADE):
    case REQUEST(ACTION_TYPES.UPDATE_ESPECIALIDADE):
    case REQUEST(ACTION_TYPES.DELETE_ESPECIALIDADE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_ESPECIALIDADE_LIST_EXPORT):
    case FAILURE(ACTION_TYPES.FETCH_ESPECIALIDADE_LIST):
    case FAILURE(ACTION_TYPES.FETCH_ESPECIALIDADE):
    case FAILURE(ACTION_TYPES.CREATE_ESPECIALIDADE):
    case FAILURE(ACTION_TYPES.UPDATE_ESPECIALIDADE):
    case FAILURE(ACTION_TYPES.DELETE_ESPECIALIDADE):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_ESPECIALIDADE_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10)
      };
    case SUCCESS(ACTION_TYPES.FETCH_ESPECIALIDADE):
      action.payload.data.descricao = action.payload.data.descricao
        ? Buffer.from(action.payload.data.descricao).toString()
        : action.payload.data.descricao;
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_ESPECIALIDADE):
    case SUCCESS(ACTION_TYPES.UPDATE_ESPECIALIDADE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_ESPECIALIDADE):
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

const apiUrl = 'api/especialidades';

// Actions

// Actions
export type ICrudGetAllActionEspecialidade<T> = (
  icon?: any,
  especialidade?: any,
  descricao?: any,
  duracao?: any,
  importante?: any,
  ativo?: any,
  atendimento?: any,
  especialidadeOperadora?: any,
  especialidadeUnidade?: any,
  especialidadeValor?: any,
  pacientePedido?: any,
  padItem?: any,
  unidade?: any,
  categoria?: any,
  tipoEspecialidade?: any,
  tipoUnidade?: any,
  page?: number,
  size?: number,
  sort?: string
) => IPayload<T> | ((dispatch: any) => IPayload<T>);

export const getEntities: ICrudGetAllActionEspecialidade<IEspecialidade> = (
  icon,
  especialidade,
  descricao,
  duracao,
  importante,
  ativo,
  atendimento,
  especialidadeOperadora,
  especialidadeUnidade,
  especialidadeValor,
  pacientePedido,
  padItem,
  unidade,
  categoria,
  tipoEspecialidade,
  tipoUnidade,
  page,
  size,
  sort
) => {
  const iconRequest = icon ? `icon.contains=${icon}&` : '';
  const especialidadeRequest = especialidade ? `especialidade.contains=${especialidade}&` : '';
  const descricaoRequest = descricao ? `descricao.contains=${descricao}&` : '';
  const duracaoRequest = duracao ? `duracao.contains=${duracao}&` : '';
  const importanteRequest = importante ? `importante.contains=${importante}&` : '';
  const ativoRequest = ativo ? `ativo.contains=${ativo}&` : '';
  const atendimentoRequest = atendimento ? `atendimento.equals=${atendimento}&` : '';
  const especialidadeOperadoraRequest = especialidadeOperadora ? `especialidadeOperadora.equals=${especialidadeOperadora}&` : '';
  const especialidadeUnidadeRequest = especialidadeUnidade ? `especialidadeUnidade.equals=${especialidadeUnidade}&` : '';
  const especialidadeValorRequest = especialidadeValor ? `especialidadeValor.equals=${especialidadeValor}&` : '';
  const pacientePedidoRequest = pacientePedido ? `pacientePedido.equals=${pacientePedido}&` : '';
  const padItemRequest = padItem ? `padItem.equals=${padItem}&` : '';
  const unidadeRequest = unidade ? `unidade.equals=${unidade}&` : '';
  const categoriaRequest = categoria ? `categoria.equals=${categoria}&` : '';
  const tipoEspecialidadeRequest = tipoEspecialidade ? `tipoEspecialidade.equals=${tipoEspecialidade}&` : '';
  const tipoUnidadeRequest = tipoUnidade ? `tipoUnidade.equals=${tipoUnidade}&` : '';

  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}&` : '?'}`;
  return {
    type: ACTION_TYPES.FETCH_ESPECIALIDADE_LIST,
    payload: axios.get<IEspecialidade>(
      `${requestUrl}${iconRequest}${especialidadeRequest}${descricaoRequest}${duracaoRequest}${importanteRequest}${ativoRequest}${atendimentoRequest}${especialidadeOperadoraRequest}${especialidadeUnidadeRequest}${especialidadeValorRequest}${pacientePedidoRequest}${padItemRequest}${unidadeRequest}${categoriaRequest}${tipoEspecialidadeRequest}${tipoUnidadeRequest}cacheBuster=${new Date().getTime()}`
    )
  };
};
export const getEntity: ICrudGetAction<IEspecialidade> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_ESPECIALIDADE,
    payload: axios.get<IEspecialidade>(requestUrl)
  };
};

export const getEntitiesExport: ICrudGetAllActionEspecialidade<IEspecialidade> = (
  icon,
  especialidade,
  descricao,
  duracao,
  importante,
  ativo,
  atendimento,
  especialidadeOperadora,
  especialidadeUnidade,
  especialidadeValor,
  pacientePedido,
  padItem,
  unidade,
  categoria,
  tipoEspecialidade,
  tipoUnidade,
  page,
  size,
  sort
) => {
  const iconRequest = icon ? `icon.contains=${icon}&` : '';
  const especialidadeRequest = especialidade ? `especialidade.contains=${especialidade}&` : '';
  const descricaoRequest = descricao ? `descricao.contains=${descricao}&` : '';
  const duracaoRequest = duracao ? `duracao.contains=${duracao}&` : '';
  const importanteRequest = importante ? `importante.contains=${importante}&` : '';
  const ativoRequest = ativo ? `ativo.contains=${ativo}&` : '';
  const atendimentoRequest = atendimento ? `atendimento.equals=${atendimento}&` : '';
  const especialidadeOperadoraRequest = especialidadeOperadora ? `especialidadeOperadora.equals=${especialidadeOperadora}&` : '';
  const especialidadeUnidadeRequest = especialidadeUnidade ? `especialidadeUnidade.equals=${especialidadeUnidade}&` : '';
  const especialidadeValorRequest = especialidadeValor ? `especialidadeValor.equals=${especialidadeValor}&` : '';
  const pacientePedidoRequest = pacientePedido ? `pacientePedido.equals=${pacientePedido}&` : '';
  const padItemRequest = padItem ? `padItem.equals=${padItem}&` : '';
  const unidadeRequest = unidade ? `unidade.equals=${unidade}&` : '';
  const categoriaRequest = categoria ? `categoria.equals=${categoria}&` : '';
  const tipoEspecialidadeRequest = tipoEspecialidade ? `tipoEspecialidade.equals=${tipoEspecialidade}&` : '';
  const tipoUnidadeRequest = tipoUnidade ? `tipoUnidade.equals=${tipoUnidade}&` : '';

  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}&` : '?'}`;
  return {
    type: ACTION_TYPES.FETCH_ESPECIALIDADE_LIST,
    payload: axios.get<IEspecialidade>(
      `${requestUrl}${iconRequest}${especialidadeRequest}${descricaoRequest}${duracaoRequest}${importanteRequest}${ativoRequest}${atendimentoRequest}${especialidadeOperadoraRequest}${especialidadeUnidadeRequest}${especialidadeValorRequest}${pacientePedidoRequest}${padItemRequest}${unidadeRequest}${categoriaRequest}${tipoEspecialidadeRequest}${tipoUnidadeRequest}cacheBuster=${new Date().getTime()}`
    )
  };
};

export const createEntity: ICrudPutAction<IEspecialidade> = entity => async dispatch => {
  entity = {
    ...entity,
    unidade: entity.unidade === 'null' ? null : entity.unidade,
    categoria: entity.categoria === 'null' ? null : entity.categoria,
    tipoEspecialidade: entity.tipoEspecialidade === 'null' ? null : entity.tipoEspecialidade,
    tipoUnidade: entity.tipoUnidade === 'null' ? null : entity.tipoUnidade
  };
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_ESPECIALIDADE,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IEspecialidade> = entity => async dispatch => {
  entity = {
    ...entity,
    unidade: entity.unidade === 'null' ? null : entity.unidade,
    categoria: entity.categoria === 'null' ? null : entity.categoria,
    tipoEspecialidade: entity.tipoEspecialidade === 'null' ? null : entity.tipoEspecialidade,
    tipoUnidade: entity.tipoUnidade === 'null' ? null : entity.tipoUnidade
  };
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_ESPECIALIDADE,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IEspecialidade> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_ESPECIALIDADE,
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

export const getEspecialidadeState = (location): IEspecialidadeBaseState => {
  const url = new URL(`http://localhost${location.search}`); // using a dummy url for parsing
  const baseFilters = url.searchParams.get('baseFilters') || '';
  const icon = url.searchParams.get('icon') || '';
  const especialidade = url.searchParams.get('especialidade') || '';
  const descricao = url.searchParams.get('descricao') || '';
  const duracao = url.searchParams.get('duracao') || '';
  const importante = url.searchParams.get('importante') || '';
  const ativo = url.searchParams.get('ativo') || '';

  const atendimento = url.searchParams.get('atendimento') || '';
  const especialidadeOperadora = url.searchParams.get('especialidadeOperadora') || '';
  const especialidadeUnidade = url.searchParams.get('especialidadeUnidade') || '';
  const especialidadeValor = url.searchParams.get('especialidadeValor') || '';
  const pacientePedido = url.searchParams.get('pacientePedido') || '';
  const padItem = url.searchParams.get('padItem') || '';
  const unidade = url.searchParams.get('unidade') || '';
  const categoria = url.searchParams.get('categoria') || '';
  const tipoEspecialidade = url.searchParams.get('tipoEspecialidade') || '';
  const tipoUnidade = url.searchParams.get('tipoUnidade') || '';

  return {
    baseFilters,
    icon,
    especialidade,
    descricao,
    duracao,
    importante,
    ativo,
    atendimento,
    especialidadeOperadora,
    especialidadeUnidade,
    especialidadeValor,
    pacientePedido,
    padItem,
    unidade,
    categoria,
    tipoEspecialidade,
    tipoUnidade
  };
};
