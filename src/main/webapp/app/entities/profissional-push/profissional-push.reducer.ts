/* eslint complexity: ["error", 100] */
import axios from 'axios';
import { ICrudGetAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { IPayload } from 'react-jhipster/src/type/redux-action.type';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IProfissionalPush, defaultValue } from 'app/shared/model/profissional-push.model';

export const ACTION_TYPES = {
  FETCH_PROFISSIONALPUSH_LIST: 'profissionalPush/FETCH_PROFISSIONALPUSH_LIST',
  FETCH_PROFISSIONALPUSH: 'profissionalPush/FETCH_PROFISSIONALPUSH',
  CREATE_PROFISSIONALPUSH: 'profissionalPush/CREATE_PROFISSIONALPUSH',
  UPDATE_PROFISSIONALPUSH: 'profissionalPush/UPDATE_PROFISSIONALPUSH',
  DELETE_PROFISSIONALPUSH: 'profissionalPush/DELETE_PROFISSIONALPUSH',
  RESET: 'profissionalPush/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IProfissionalPush>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type ProfissionalPushState = Readonly<typeof initialState>;

// Reducer

export default (state: ProfissionalPushState = initialState, action): ProfissionalPushState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_PROFISSIONALPUSH_LIST):
    case REQUEST(ACTION_TYPES.FETCH_PROFISSIONALPUSH):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_PROFISSIONALPUSH):
    case REQUEST(ACTION_TYPES.UPDATE_PROFISSIONALPUSH):
    case REQUEST(ACTION_TYPES.DELETE_PROFISSIONALPUSH):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_PROFISSIONALPUSH_LIST):
    case FAILURE(ACTION_TYPES.FETCH_PROFISSIONALPUSH):
    case FAILURE(ACTION_TYPES.CREATE_PROFISSIONALPUSH):
    case FAILURE(ACTION_TYPES.UPDATE_PROFISSIONALPUSH):
    case FAILURE(ACTION_TYPES.DELETE_PROFISSIONALPUSH):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_PROFISSIONALPUSH_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10)
      };
    case SUCCESS(ACTION_TYPES.FETCH_PROFISSIONALPUSH):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_PROFISSIONALPUSH):
    case SUCCESS(ACTION_TYPES.UPDATE_PROFISSIONALPUSH):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_PROFISSIONALPUSH):
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

const apiUrl = 'api/profissional-pushes';

// Actions

// Actions
export type ICrudGetAllActionProfissionalPush<T> = (
  idProfissional?: any,
  idFranquia?: any,
  mensagem?: any,
  ativo?: any,
  dataPost?: any,
  page?: number,
  size?: number,
  sort?: string
) => IPayload<T> | ((dispatch: any) => IPayload<T>);

export const getEntities: ICrudGetAllActionProfissionalPush<IProfissionalPush> = (
  idProfissional,
  idFranquia,
  mensagem,
  ativo,
  dataPost,
  page,
  size,
  sort
) => {
  const idProfissionalRequest = idProfissional ? `idProfissional.contains=${idProfissional}&` : '';
  const idFranquiaRequest = idFranquia ? `idFranquia.contains=${idFranquia}&` : '';
  const mensagemRequest = mensagem ? `mensagem.contains=${mensagem}&` : '';
  const ativoRequest = ativo ? `ativo.contains=${ativo}&` : '';
  const dataPostRequest = dataPost ? `dataPost.contains=${dataPost}&` : '';

  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}&` : '?'}`;
  return {
    type: ACTION_TYPES.FETCH_PROFISSIONALPUSH_LIST,
    payload: axios.get<IProfissionalPush>(
      `${requestUrl}${idProfissionalRequest}${idFranquiaRequest}${mensagemRequest}${ativoRequest}${dataPostRequest}cacheBuster=${new Date().getTime()}`
    )
  };
};
export const getEntity: ICrudGetAction<IProfissionalPush> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_PROFISSIONALPUSH,
    payload: axios.get<IProfissionalPush>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IProfissionalPush> = entity => async dispatch => {
  entity = {
    ...entity
  };
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_PROFISSIONALPUSH,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IProfissionalPush> = entity => async dispatch => {
  entity = { ...entity };
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_PROFISSIONALPUSH,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IProfissionalPush> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_PROFISSIONALPUSH,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
