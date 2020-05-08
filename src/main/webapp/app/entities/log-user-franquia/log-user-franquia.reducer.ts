/* eslint complexity: ["error", 100] */
import axios from 'axios';
import { ICrudGetAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { IPayload } from 'react-jhipster/src/type/redux-action.type';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { ILogUserFranquia, defaultValue } from 'app/shared/model/log-user-franquia.model';

export const ACTION_TYPES = {
  FETCH_LOGUSERFRANQUIA_LIST_EXPORT: 'logUserFranquia/FETCH_LOGUSERFRANQUIA_LIST_EXPORT',
  FETCH_LOGUSERFRANQUIA_LIST: 'logUserFranquia/FETCH_LOGUSERFRANQUIA_LIST',
  FETCH_LOGUSERFRANQUIA: 'logUserFranquia/FETCH_LOGUSERFRANQUIA',
  CREATE_LOGUSERFRANQUIA: 'logUserFranquia/CREATE_LOGUSERFRANQUIA',
  UPDATE_LOGUSERFRANQUIA: 'logUserFranquia/UPDATE_LOGUSERFRANQUIA',
  DELETE_LOGUSERFRANQUIA: 'logUserFranquia/DELETE_LOGUSERFRANQUIA',
  SET_BLOB: 'logUserFranquia/SET_BLOB',
  RESET: 'logUserFranquia/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<ILogUserFranquia>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type LogUserFranquiaState = Readonly<typeof initialState>;

export interface ILogUserFranquiaBaseState {
  baseFilters: any;
  descricao: any;
  acao: any;
  tela: any;
  usuario: any;
}

export interface ILogUserFranquiaUpdateState {
  fieldsBase: ILogUserFranquiaBaseState;

  acaoSelectValue: any;
  telaSelectValue: any;
  franquiaUsuarioSelectValue: any;
  isNew: boolean;
  acaoId: string;
  telaId: string;
  usuarioId: string;
}

// Reducer

export default (state: LogUserFranquiaState = initialState, action): LogUserFranquiaState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_LOGUSERFRANQUIA_LIST_EXPORT):
    case REQUEST(ACTION_TYPES.FETCH_LOGUSERFRANQUIA_LIST):
    case REQUEST(ACTION_TYPES.FETCH_LOGUSERFRANQUIA):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_LOGUSERFRANQUIA):
    case REQUEST(ACTION_TYPES.UPDATE_LOGUSERFRANQUIA):
    case REQUEST(ACTION_TYPES.DELETE_LOGUSERFRANQUIA):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_LOGUSERFRANQUIA_LIST_EXPORT):
    case FAILURE(ACTION_TYPES.FETCH_LOGUSERFRANQUIA_LIST):
    case FAILURE(ACTION_TYPES.FETCH_LOGUSERFRANQUIA):
    case FAILURE(ACTION_TYPES.CREATE_LOGUSERFRANQUIA):
    case FAILURE(ACTION_TYPES.UPDATE_LOGUSERFRANQUIA):
    case FAILURE(ACTION_TYPES.DELETE_LOGUSERFRANQUIA):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_LOGUSERFRANQUIA_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10)
      };
    case SUCCESS(ACTION_TYPES.FETCH_LOGUSERFRANQUIA):
      action.payload.data.descricao = action.payload.data.descricao
        ? Buffer.from(action.payload.data.descricao).toString()
        : action.payload.data.descricao;
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_LOGUSERFRANQUIA):
    case SUCCESS(ACTION_TYPES.UPDATE_LOGUSERFRANQUIA):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_LOGUSERFRANQUIA):
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

const apiUrl = 'api/log-user-franquias';

// Actions

// Actions
export type ICrudGetAllActionLogUserFranquia<T> = (
  descricao?: any,
  acao?: any,
  tela?: any,
  usuario?: any,
  page?: number,
  size?: number,
  sort?: string
) => IPayload<T> | ((dispatch: any) => IPayload<T>);

export const getEntities: ICrudGetAllActionLogUserFranquia<ILogUserFranquia> = (descricao, acao, tela, usuario, page, size, sort) => {
  const descricaoRequest = descricao ? `descricao.contains=${descricao}&` : '';
  const acaoRequest = acao ? `acao.equals=${acao}&` : '';
  const telaRequest = tela ? `tela.equals=${tela}&` : '';
  const usuarioRequest = usuario ? `usuario.equals=${usuario}&` : '';

  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}&` : '?'}`;
  return {
    type: ACTION_TYPES.FETCH_LOGUSERFRANQUIA_LIST,
    payload: axios.get<ILogUserFranquia>(
      `${requestUrl}${descricaoRequest}${acaoRequest}${telaRequest}${usuarioRequest}cacheBuster=${new Date().getTime()}`
    )
  };
};
export const getEntity: ICrudGetAction<ILogUserFranquia> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_LOGUSERFRANQUIA,
    payload: axios.get<ILogUserFranquia>(requestUrl)
  };
};

export const getEntitiesExport: ICrudGetAllActionLogUserFranquia<ILogUserFranquia> = (descricao, acao, tela, usuario, page, size, sort) => {
  const descricaoRequest = descricao ? `descricao.contains=${descricao}&` : '';
  const acaoRequest = acao ? `acao.equals=${acao}&` : '';
  const telaRequest = tela ? `tela.equals=${tela}&` : '';
  const usuarioRequest = usuario ? `usuario.equals=${usuario}&` : '';

  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}&` : '?'}`;
  return {
    type: ACTION_TYPES.FETCH_LOGUSERFRANQUIA_LIST,
    payload: axios.get<ILogUserFranquia>(
      `${requestUrl}${descricaoRequest}${acaoRequest}${telaRequest}${usuarioRequest}cacheBuster=${new Date().getTime()}`
    )
  };
};

export const createEntity: ICrudPutAction<ILogUserFranquia> = entity => async dispatch => {
  entity = {
    ...entity,
    acao: entity.acao === 'null' ? null : entity.acao,
    tela: entity.tela === 'null' ? null : entity.tela,
    usuario: entity.usuario === 'null' ? null : entity.usuario
  };
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_LOGUSERFRANQUIA,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<ILogUserFranquia> = entity => async dispatch => {
  entity = {
    ...entity,
    acao: entity.acao === 'null' ? null : entity.acao,
    tela: entity.tela === 'null' ? null : entity.tela,
    usuario: entity.usuario === 'null' ? null : entity.usuario
  };
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_LOGUSERFRANQUIA,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<ILogUserFranquia> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_LOGUSERFRANQUIA,
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

export const getLogUserFranquiaState = (location): ILogUserFranquiaBaseState => {
  const url = new URL(`http://localhost${location.search}`); // using a dummy url for parsing
  const baseFilters = url.searchParams.get('baseFilters') || '';
  const descricao = url.searchParams.get('descricao') || '';

  const acao = url.searchParams.get('acao') || '';
  const tela = url.searchParams.get('tela') || '';
  const usuario = url.searchParams.get('usuario') || '';

  return {
    baseFilters,
    descricao,
    acao,
    tela,
    usuario
  };
};
