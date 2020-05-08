/* eslint complexity: ["error", 100] */
import axios from 'axios';
import { ICrudGetAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { IPayload } from 'react-jhipster/src/type/redux-action.type';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IUsuarioAcao, defaultValue } from 'app/shared/model/usuario-acao.model';

export const ACTION_TYPES = {
  FETCH_USUARIOACAO_LIST_EXPORT: 'usuarioAcao/FETCH_USUARIOACAO_LIST_EXPORT',
  FETCH_USUARIOACAO_LIST: 'usuarioAcao/FETCH_USUARIOACAO_LIST',
  FETCH_USUARIOACAO: 'usuarioAcao/FETCH_USUARIOACAO',
  CREATE_USUARIOACAO: 'usuarioAcao/CREATE_USUARIOACAO',
  UPDATE_USUARIOACAO: 'usuarioAcao/UPDATE_USUARIOACAO',
  DELETE_USUARIOACAO: 'usuarioAcao/DELETE_USUARIOACAO',
  SET_BLOB: 'usuarioAcao/SET_BLOB',
  RESET: 'usuarioAcao/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IUsuarioAcao>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type UsuarioAcaoState = Readonly<typeof initialState>;

export interface IUsuarioAcaoBaseState {
  baseFilters: any;
  idAtendimento: any;
  descricao: any;
  tela: any;
  acao: any;
}

export interface IUsuarioAcaoUpdateState {
  fieldsBase: IUsuarioAcaoBaseState;

  telaSelectValue: any;
  acaoSelectValue: any;
  isNew: boolean;
  telaId: string;
  acaoId: string;
}

// Reducer

export default (state: UsuarioAcaoState = initialState, action): UsuarioAcaoState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_USUARIOACAO_LIST_EXPORT):
    case REQUEST(ACTION_TYPES.FETCH_USUARIOACAO_LIST):
    case REQUEST(ACTION_TYPES.FETCH_USUARIOACAO):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_USUARIOACAO):
    case REQUEST(ACTION_TYPES.UPDATE_USUARIOACAO):
    case REQUEST(ACTION_TYPES.DELETE_USUARIOACAO):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_USUARIOACAO_LIST_EXPORT):
    case FAILURE(ACTION_TYPES.FETCH_USUARIOACAO_LIST):
    case FAILURE(ACTION_TYPES.FETCH_USUARIOACAO):
    case FAILURE(ACTION_TYPES.CREATE_USUARIOACAO):
    case FAILURE(ACTION_TYPES.UPDATE_USUARIOACAO):
    case FAILURE(ACTION_TYPES.DELETE_USUARIOACAO):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_USUARIOACAO_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10)
      };
    case SUCCESS(ACTION_TYPES.FETCH_USUARIOACAO):
      action.payload.data.descricao = action.payload.data.descricao
        ? Buffer.from(action.payload.data.descricao).toString()
        : action.payload.data.descricao;
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_USUARIOACAO):
    case SUCCESS(ACTION_TYPES.UPDATE_USUARIOACAO):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_USUARIOACAO):
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

const apiUrl = 'api/usuario-acaos';

// Actions

// Actions
export type ICrudGetAllActionUsuarioAcao<T> = (
  idAtendimento?: any,
  descricao?: any,
  tela?: any,
  acao?: any,
  page?: number,
  size?: number,
  sort?: string
) => IPayload<T> | ((dispatch: any) => IPayload<T>);

export const getEntities: ICrudGetAllActionUsuarioAcao<IUsuarioAcao> = (idAtendimento, descricao, tela, acao, page, size, sort) => {
  const idAtendimentoRequest = idAtendimento ? `idAtendimento.contains=${idAtendimento}&` : '';
  const descricaoRequest = descricao ? `descricao.contains=${descricao}&` : '';
  const telaRequest = tela ? `tela.equals=${tela}&` : '';
  const acaoRequest = acao ? `acao.equals=${acao}&` : '';

  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}&` : '?'}`;
  return {
    type: ACTION_TYPES.FETCH_USUARIOACAO_LIST,
    payload: axios.get<IUsuarioAcao>(
      `${requestUrl}${idAtendimentoRequest}${descricaoRequest}${telaRequest}${acaoRequest}cacheBuster=${new Date().getTime()}`
    )
  };
};
export const getEntity: ICrudGetAction<IUsuarioAcao> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_USUARIOACAO,
    payload: axios.get<IUsuarioAcao>(requestUrl)
  };
};

export const getEntitiesExport: ICrudGetAllActionUsuarioAcao<IUsuarioAcao> = (idAtendimento, descricao, tela, acao, page, size, sort) => {
  const idAtendimentoRequest = idAtendimento ? `idAtendimento.contains=${idAtendimento}&` : '';
  const descricaoRequest = descricao ? `descricao.contains=${descricao}&` : '';
  const telaRequest = tela ? `tela.equals=${tela}&` : '';
  const acaoRequest = acao ? `acao.equals=${acao}&` : '';

  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}&` : '?'}`;
  return {
    type: ACTION_TYPES.FETCH_USUARIOACAO_LIST,
    payload: axios.get<IUsuarioAcao>(
      `${requestUrl}${idAtendimentoRequest}${descricaoRequest}${telaRequest}${acaoRequest}cacheBuster=${new Date().getTime()}`
    )
  };
};

export const createEntity: ICrudPutAction<IUsuarioAcao> = entity => async dispatch => {
  entity = {
    ...entity,
    tela: entity.tela === 'null' ? null : entity.tela,
    acao: entity.acao === 'null' ? null : entity.acao
  };
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_USUARIOACAO,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IUsuarioAcao> = entity => async dispatch => {
  entity = { ...entity, tela: entity.tela === 'null' ? null : entity.tela, acao: entity.acao === 'null' ? null : entity.acao };
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_USUARIOACAO,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IUsuarioAcao> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_USUARIOACAO,
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

export const getUsuarioAcaoState = (location): IUsuarioAcaoBaseState => {
  const url = new URL(`http://localhost${location.search}`); // using a dummy url for parsing
  const baseFilters = url.searchParams.get('baseFilters') || '';
  const idAtendimento = url.searchParams.get('idAtendimento') || '';
  const descricao = url.searchParams.get('descricao') || '';

  const tela = url.searchParams.get('tela') || '';
  const acao = url.searchParams.get('acao') || '';

  return {
    baseFilters,
    idAtendimento,
    descricao,
    tela,
    acao
  };
};
