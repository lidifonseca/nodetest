/* eslint complexity: ["error", 100] */
import axios from 'axios';
import { ICrudGetAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { IPayload } from 'react-jhipster/src/type/redux-action.type';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IProfissionalStatusAtualNew, defaultValue } from 'app/shared/model/profissional-status-atual-new.model';

export const ACTION_TYPES = {
  FETCH_PROFISSIONALSTATUSATUALNEW_LIST: 'profissionalStatusAtualNew/FETCH_PROFISSIONALSTATUSATUALNEW_LIST',
  FETCH_PROFISSIONALSTATUSATUALNEW: 'profissionalStatusAtualNew/FETCH_PROFISSIONALSTATUSATUALNEW',
  CREATE_PROFISSIONALSTATUSATUALNEW: 'profissionalStatusAtualNew/CREATE_PROFISSIONALSTATUSATUALNEW',
  UPDATE_PROFISSIONALSTATUSATUALNEW: 'profissionalStatusAtualNew/UPDATE_PROFISSIONALSTATUSATUALNEW',
  DELETE_PROFISSIONALSTATUSATUALNEW: 'profissionalStatusAtualNew/DELETE_PROFISSIONALSTATUSATUALNEW',
  RESET: 'profissionalStatusAtualNew/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IProfissionalStatusAtualNew>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type ProfissionalStatusAtualNewState = Readonly<typeof initialState>;

// Reducer

export default (state: ProfissionalStatusAtualNewState = initialState, action): ProfissionalStatusAtualNewState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_PROFISSIONALSTATUSATUALNEW_LIST):
    case REQUEST(ACTION_TYPES.FETCH_PROFISSIONALSTATUSATUALNEW):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_PROFISSIONALSTATUSATUALNEW):
    case REQUEST(ACTION_TYPES.UPDATE_PROFISSIONALSTATUSATUALNEW):
    case REQUEST(ACTION_TYPES.DELETE_PROFISSIONALSTATUSATUALNEW):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_PROFISSIONALSTATUSATUALNEW_LIST):
    case FAILURE(ACTION_TYPES.FETCH_PROFISSIONALSTATUSATUALNEW):
    case FAILURE(ACTION_TYPES.CREATE_PROFISSIONALSTATUSATUALNEW):
    case FAILURE(ACTION_TYPES.UPDATE_PROFISSIONALSTATUSATUALNEW):
    case FAILURE(ACTION_TYPES.DELETE_PROFISSIONALSTATUSATUALNEW):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_PROFISSIONALSTATUSATUALNEW_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10)
      };
    case SUCCESS(ACTION_TYPES.FETCH_PROFISSIONALSTATUSATUALNEW):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_PROFISSIONALSTATUSATUALNEW):
    case SUCCESS(ACTION_TYPES.UPDATE_PROFISSIONALSTATUSATUALNEW):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_PROFISSIONALSTATUSATUALNEW):
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

const apiUrl = 'api/profissional-status-atual-news';

// Actions

// Actions
export type ICrudGetAllActionProfissionalStatusAtualNew<T> = (
  idProfissional?: any,
  idStatusAtualProf?: any,
  obs?: any,
  ativo?: any,
  dataPost?: any,
  idUsuario?: any,
  page?: number,
  size?: number,
  sort?: string
) => IPayload<T> | ((dispatch: any) => IPayload<T>);

export const getEntities: ICrudGetAllActionProfissionalStatusAtualNew<IProfissionalStatusAtualNew> = (
  idProfissional,
  idStatusAtualProf,
  obs,
  ativo,
  dataPost,
  idUsuario,
  page,
  size,
  sort
) => {
  const idProfissionalRequest = idProfissional ? `idProfissional.contains=${idProfissional}&` : '';
  const idStatusAtualProfRequest = idStatusAtualProf ? `idStatusAtualProf.contains=${idStatusAtualProf}&` : '';
  const obsRequest = obs ? `obs.contains=${obs}&` : '';
  const ativoRequest = ativo ? `ativo.contains=${ativo}&` : '';
  const dataPostRequest = dataPost ? `dataPost.contains=${dataPost}&` : '';
  const idUsuarioRequest = idUsuario ? `idUsuario.contains=${idUsuario}&` : '';

  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}&` : '?'}`;
  return {
    type: ACTION_TYPES.FETCH_PROFISSIONALSTATUSATUALNEW_LIST,
    payload: axios.get<IProfissionalStatusAtualNew>(
      `${requestUrl}${idProfissionalRequest}${idStatusAtualProfRequest}${obsRequest}${ativoRequest}${dataPostRequest}${idUsuarioRequest}cacheBuster=${new Date().getTime()}`
    )
  };
};
export const getEntity: ICrudGetAction<IProfissionalStatusAtualNew> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_PROFISSIONALSTATUSATUALNEW,
    payload: axios.get<IProfissionalStatusAtualNew>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IProfissionalStatusAtualNew> = entity => async dispatch => {
  entity = {
    ...entity
  };
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_PROFISSIONALSTATUSATUALNEW,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IProfissionalStatusAtualNew> = entity => async dispatch => {
  entity = { ...entity };
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_PROFISSIONALSTATUSATUALNEW,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IProfissionalStatusAtualNew> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_PROFISSIONALSTATUSATUALNEW,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
