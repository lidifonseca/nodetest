/* eslint complexity: ["error", 100] */
import axios from 'axios';
import { ICrudGetAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { IPayload } from 'react-jhipster/src/type/redux-action.type';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { ILogUserFranquia, defaultValue } from 'app/shared/model/log-user-franquia.model';

export const ACTION_TYPES = {
  FETCH_LOGUSERFRANQUIA_LIST: 'logUserFranquia/FETCH_LOGUSERFRANQUIA_LIST',
  FETCH_LOGUSERFRANQUIA: 'logUserFranquia/FETCH_LOGUSERFRANQUIA',
  CREATE_LOGUSERFRANQUIA: 'logUserFranquia/CREATE_LOGUSERFRANQUIA',
  UPDATE_LOGUSERFRANQUIA: 'logUserFranquia/UPDATE_LOGUSERFRANQUIA',
  DELETE_LOGUSERFRANQUIA: 'logUserFranquia/DELETE_LOGUSERFRANQUIA',
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

// Reducer

export default (state: LogUserFranquiaState = initialState, action): LogUserFranquiaState => {
  switch (action.type) {
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
  dataPost?: any,
  idAcao?: any,
  idTela?: any,
  idUsuario?: any,
  page?: number,
  size?: number,
  sort?: string
) => IPayload<T> | ((dispatch: any) => IPayload<T>);

export const getEntities: ICrudGetAllActionLogUserFranquia<ILogUserFranquia> = (
  descricao,
  dataPost,
  idAcao,
  idTela,
  idUsuario,
  page,
  size,
  sort
) => {
  const descricaoRequest = descricao ? `descricao.contains=${descricao}&` : '';
  const dataPostRequest = dataPost ? `dataPost.contains=${dataPost}&` : '';
  const idAcaoRequest = idAcao ? `idAcao.equals=${idAcao}&` : '';
  const idTelaRequest = idTela ? `idTela.equals=${idTela}&` : '';
  const idUsuarioRequest = idUsuario ? `idUsuario.equals=${idUsuario}&` : '';

  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}&` : '?'}`;
  return {
    type: ACTION_TYPES.FETCH_LOGUSERFRANQUIA_LIST,
    payload: axios.get<ILogUserFranquia>(
      `${requestUrl}${descricaoRequest}${dataPostRequest}${idAcaoRequest}${idTelaRequest}${idUsuarioRequest}cacheBuster=${new Date().getTime()}`
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

export const createEntity: ICrudPutAction<ILogUserFranquia> = entity => async dispatch => {
  entity = {
    ...entity,
    idAcao: entity.idAcao === 'null' ? null : entity.idAcao,
    idTela: entity.idTela === 'null' ? null : entity.idTela,
    idUsuario: entity.idUsuario === 'null' ? null : entity.idUsuario
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
    idAcao: entity.idAcao === 'null' ? null : entity.idAcao,
    idTela: entity.idTela === 'null' ? null : entity.idTela,
    idUsuario: entity.idUsuario === 'null' ? null : entity.idUsuario
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

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
