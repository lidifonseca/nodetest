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
  idUsuario: any;
  idAtendimento: any;
  descricao: any;
  idTela: any;
  idAcao: any;
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

const apiUrl = 'api/usuario-acaos';

// Actions

// Actions
export type ICrudGetAllActionUsuarioAcao<T> = (
  idUsuario?: any,
  idAtendimento?: any,
  descricao?: any,
  idTela?: any,
  idAcao?: any,
  page?: number,
  size?: number,
  sort?: string
) => IPayload<T> | ((dispatch: any) => IPayload<T>);

export const getEntities: ICrudGetAllActionUsuarioAcao<IUsuarioAcao> = (
  idUsuario,
  idAtendimento,
  descricao,
  idTela,
  idAcao,
  page,
  size,
  sort
) => {
  const idUsuarioRequest = idUsuario ? `idUsuario.contains=${idUsuario}&` : '';
  const idAtendimentoRequest = idAtendimento ? `idAtendimento.contains=${idAtendimento}&` : '';
  const descricaoRequest = descricao ? `descricao.contains=${descricao}&` : '';
  const idTelaRequest = idTela ? `idTela.equals=${idTela}&` : '';
  const idAcaoRequest = idAcao ? `idAcao.equals=${idAcao}&` : '';

  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}&` : '?'}`;
  return {
    type: ACTION_TYPES.FETCH_USUARIOACAO_LIST,
    payload: axios.get<IUsuarioAcao>(
      `${requestUrl}${idUsuarioRequest}${idAtendimentoRequest}${descricaoRequest}${idTelaRequest}${idAcaoRequest}cacheBuster=${new Date().getTime()}`
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

export const getEntitiesExport: ICrudGetAllActionUsuarioAcao<IUsuarioAcao> = (
  idUsuario,
  idAtendimento,
  descricao,
  idTela,
  idAcao,
  page,
  size,
  sort
) => {
  const idUsuarioRequest = idUsuario ? `idUsuario.contains=${idUsuario}&` : '';
  const idAtendimentoRequest = idAtendimento ? `idAtendimento.contains=${idAtendimento}&` : '';
  const descricaoRequest = descricao ? `descricao.contains=${descricao}&` : '';
  const idTelaRequest = idTela ? `idTela.equals=${idTela}&` : '';
  const idAcaoRequest = idAcao ? `idAcao.equals=${idAcao}&` : '';

  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}&` : '?'}`;
  return {
    type: ACTION_TYPES.FETCH_USUARIOACAO_LIST,
    payload: axios.get<IUsuarioAcao>(
      `${requestUrl}${idUsuarioRequest}${idAtendimentoRequest}${descricaoRequest}${idTelaRequest}${idAcaoRequest}cacheBuster=${new Date().getTime()}`
    )
  };
};

export const createEntity: ICrudPutAction<IUsuarioAcao> = entity => async dispatch => {
  entity = {
    ...entity,
    idTela: entity.idTela === 'null' ? null : entity.idTela,
    idAcao: entity.idAcao === 'null' ? null : entity.idAcao
  };
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_USUARIOACAO,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IUsuarioAcao> = entity => async dispatch => {
  entity = { ...entity, idTela: entity.idTela === 'null' ? null : entity.idTela, idAcao: entity.idAcao === 'null' ? null : entity.idAcao };
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

export const getUsuarioAcaoState = (location): IUsuarioAcaoBaseState => {
  const url = new URL(`http://localhost${location.search}`); // using a dummy url for parsing
  const idUsuario = url.searchParams.get('idUsuario') || '';
  const idAtendimento = url.searchParams.get('idAtendimento') || '';
  const descricao = url.searchParams.get('descricao') || '';

  const idTela = url.searchParams.get('idTela') || '';
  const idAcao = url.searchParams.get('idAcao') || '';

  return {
    idUsuario,
    idAtendimento,
    descricao,
    idTela,
    idAcao
  };
};
