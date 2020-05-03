/* eslint complexity: ["error", 100] */
import axios from 'axios';
import { ICrudGetAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { IPayload } from 'react-jhipster/src/type/redux-action.type';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IProfissionalStatusAtual, defaultValue } from 'app/shared/model/profissional-status-atual.model';

export const ACTION_TYPES = {
  FETCH_PROFISSIONALSTATUSATUAL_LIST: 'profissionalStatusAtual/FETCH_PROFISSIONALSTATUSATUAL_LIST',
  FETCH_PROFISSIONALSTATUSATUAL: 'profissionalStatusAtual/FETCH_PROFISSIONALSTATUSATUAL',
  CREATE_PROFISSIONALSTATUSATUAL: 'profissionalStatusAtual/CREATE_PROFISSIONALSTATUSATUAL',
  UPDATE_PROFISSIONALSTATUSATUAL: 'profissionalStatusAtual/UPDATE_PROFISSIONALSTATUSATUAL',
  DELETE_PROFISSIONALSTATUSATUAL: 'profissionalStatusAtual/DELETE_PROFISSIONALSTATUSATUAL',
  RESET: 'profissionalStatusAtual/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IProfissionalStatusAtual>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type ProfissionalStatusAtualState = Readonly<typeof initialState>;

// Reducer

export default (state: ProfissionalStatusAtualState = initialState, action): ProfissionalStatusAtualState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_PROFISSIONALSTATUSATUAL_LIST):
    case REQUEST(ACTION_TYPES.FETCH_PROFISSIONALSTATUSATUAL):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_PROFISSIONALSTATUSATUAL):
    case REQUEST(ACTION_TYPES.UPDATE_PROFISSIONALSTATUSATUAL):
    case REQUEST(ACTION_TYPES.DELETE_PROFISSIONALSTATUSATUAL):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_PROFISSIONALSTATUSATUAL_LIST):
    case FAILURE(ACTION_TYPES.FETCH_PROFISSIONALSTATUSATUAL):
    case FAILURE(ACTION_TYPES.CREATE_PROFISSIONALSTATUSATUAL):
    case FAILURE(ACTION_TYPES.UPDATE_PROFISSIONALSTATUSATUAL):
    case FAILURE(ACTION_TYPES.DELETE_PROFISSIONALSTATUSATUAL):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_PROFISSIONALSTATUSATUAL_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10)
      };
    case SUCCESS(ACTION_TYPES.FETCH_PROFISSIONALSTATUSATUAL):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_PROFISSIONALSTATUSATUAL):
    case SUCCESS(ACTION_TYPES.UPDATE_PROFISSIONALSTATUSATUAL):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_PROFISSIONALSTATUSATUAL):
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

const apiUrl = 'api/profissional-status-atuals';

// Actions

// Actions
export type ICrudGetAllActionProfissionalStatusAtual<T> = (
  idProfissional?: any,
  obs?: any,
  ativo?: any,
  dataPost?: any,
  idUsuario?: any,
  idStatusAtualProf?: any,
  page?: number,
  size?: number,
  sort?: string
) => IPayload<T> | ((dispatch: any) => IPayload<T>);

export const getEntities: ICrudGetAllActionProfissionalStatusAtual<IProfissionalStatusAtual> = (
  idProfissional,
  obs,
  ativo,
  dataPost,
  idUsuario,
  idStatusAtualProf,
  page,
  size,
  sort
) => {
  const idProfissionalRequest = idProfissional ? `idProfissional.contains=${idProfissional}&` : '';
  const obsRequest = obs ? `obs.contains=${obs}&` : '';
  const ativoRequest = ativo ? `ativo.contains=${ativo}&` : '';
  const dataPostRequest = dataPost ? `dataPost.contains=${dataPost}&` : '';
  const idUsuarioRequest = idUsuario ? `idUsuario.contains=${idUsuario}&` : '';
  const idStatusAtualProfRequest = idStatusAtualProf ? `idStatusAtualProf.equals=${idStatusAtualProf}&` : '';

  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}&` : '?'}`;
  return {
    type: ACTION_TYPES.FETCH_PROFISSIONALSTATUSATUAL_LIST,
    payload: axios.get<IProfissionalStatusAtual>(
      `${requestUrl}${idProfissionalRequest}${obsRequest}${ativoRequest}${dataPostRequest}${idUsuarioRequest}${idStatusAtualProfRequest}cacheBuster=${new Date().getTime()}`
    )
  };
};
export const getEntity: ICrudGetAction<IProfissionalStatusAtual> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_PROFISSIONALSTATUSATUAL,
    payload: axios.get<IProfissionalStatusAtual>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IProfissionalStatusAtual> = entity => async dispatch => {
  entity = {
    ...entity,
    idStatusAtualProf: entity.idStatusAtualProf === 'null' ? null : entity.idStatusAtualProf
  };
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_PROFISSIONALSTATUSATUAL,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IProfissionalStatusAtual> = entity => async dispatch => {
  entity = { ...entity, idStatusAtualProf: entity.idStatusAtualProf === 'null' ? null : entity.idStatusAtualProf };
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_PROFISSIONALSTATUSATUAL,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IProfissionalStatusAtual> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_PROFISSIONALSTATUSATUAL,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
