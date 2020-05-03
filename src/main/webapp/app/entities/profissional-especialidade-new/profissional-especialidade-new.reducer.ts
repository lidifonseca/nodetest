/* eslint complexity: ["error", 100] */
import axios from 'axios';
import { ICrudGetAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { IPayload } from 'react-jhipster/src/type/redux-action.type';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IProfissionalEspecialidadeNew, defaultValue } from 'app/shared/model/profissional-especialidade-new.model';

export const ACTION_TYPES = {
  FETCH_PROFISSIONALESPECIALIDADENEW_LIST: 'profissionalEspecialidadeNew/FETCH_PROFISSIONALESPECIALIDADENEW_LIST',
  FETCH_PROFISSIONALESPECIALIDADENEW: 'profissionalEspecialidadeNew/FETCH_PROFISSIONALESPECIALIDADENEW',
  CREATE_PROFISSIONALESPECIALIDADENEW: 'profissionalEspecialidadeNew/CREATE_PROFISSIONALESPECIALIDADENEW',
  UPDATE_PROFISSIONALESPECIALIDADENEW: 'profissionalEspecialidadeNew/UPDATE_PROFISSIONALESPECIALIDADENEW',
  DELETE_PROFISSIONALESPECIALIDADENEW: 'profissionalEspecialidadeNew/DELETE_PROFISSIONALESPECIALIDADENEW',
  RESET: 'profissionalEspecialidadeNew/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IProfissionalEspecialidadeNew>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type ProfissionalEspecialidadeNewState = Readonly<typeof initialState>;

// Reducer

export default (state: ProfissionalEspecialidadeNewState = initialState, action): ProfissionalEspecialidadeNewState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_PROFISSIONALESPECIALIDADENEW_LIST):
    case REQUEST(ACTION_TYPES.FETCH_PROFISSIONALESPECIALIDADENEW):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_PROFISSIONALESPECIALIDADENEW):
    case REQUEST(ACTION_TYPES.UPDATE_PROFISSIONALESPECIALIDADENEW):
    case REQUEST(ACTION_TYPES.DELETE_PROFISSIONALESPECIALIDADENEW):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_PROFISSIONALESPECIALIDADENEW_LIST):
    case FAILURE(ACTION_TYPES.FETCH_PROFISSIONALESPECIALIDADENEW):
    case FAILURE(ACTION_TYPES.CREATE_PROFISSIONALESPECIALIDADENEW):
    case FAILURE(ACTION_TYPES.UPDATE_PROFISSIONALESPECIALIDADENEW):
    case FAILURE(ACTION_TYPES.DELETE_PROFISSIONALESPECIALIDADENEW):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_PROFISSIONALESPECIALIDADENEW_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10)
      };
    case SUCCESS(ACTION_TYPES.FETCH_PROFISSIONALESPECIALIDADENEW):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_PROFISSIONALESPECIALIDADENEW):
    case SUCCESS(ACTION_TYPES.UPDATE_PROFISSIONALESPECIALIDADENEW):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_PROFISSIONALESPECIALIDADENEW):
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

const apiUrl = 'api/profissional-especialidade-news';

// Actions

// Actions
export type ICrudGetAllActionProfissionalEspecialidadeNew<T> = (
  idEspecialidade?: any,
  idProfissional?: any,
  dataPost?: any,
  page?: number,
  size?: number,
  sort?: string
) => IPayload<T> | ((dispatch: any) => IPayload<T>);

export const getEntities: ICrudGetAllActionProfissionalEspecialidadeNew<IProfissionalEspecialidadeNew> = (
  idEspecialidade,
  idProfissional,
  dataPost,
  page,
  size,
  sort
) => {
  const idEspecialidadeRequest = idEspecialidade ? `idEspecialidade.contains=${idEspecialidade}&` : '';
  const idProfissionalRequest = idProfissional ? `idProfissional.contains=${idProfissional}&` : '';
  const dataPostRequest = dataPost ? `dataPost.contains=${dataPost}&` : '';

  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}&` : '?'}`;
  return {
    type: ACTION_TYPES.FETCH_PROFISSIONALESPECIALIDADENEW_LIST,
    payload: axios.get<IProfissionalEspecialidadeNew>(
      `${requestUrl}${idEspecialidadeRequest}${idProfissionalRequest}${dataPostRequest}cacheBuster=${new Date().getTime()}`
    )
  };
};
export const getEntity: ICrudGetAction<IProfissionalEspecialidadeNew> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_PROFISSIONALESPECIALIDADENEW,
    payload: axios.get<IProfissionalEspecialidadeNew>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IProfissionalEspecialidadeNew> = entity => async dispatch => {
  entity = {
    ...entity
  };
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_PROFISSIONALESPECIALIDADENEW,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IProfissionalEspecialidadeNew> = entity => async dispatch => {
  entity = { ...entity };
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_PROFISSIONALESPECIALIDADENEW,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IProfissionalEspecialidadeNew> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_PROFISSIONALESPECIALIDADENEW,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
