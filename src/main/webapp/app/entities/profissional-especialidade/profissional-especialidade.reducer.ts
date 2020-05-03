/* eslint complexity: ["error", 100] */
import axios from 'axios';
import { ICrudGetAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { IPayload } from 'react-jhipster/src/type/redux-action.type';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IProfissionalEspecialidade, defaultValue } from 'app/shared/model/profissional-especialidade.model';

export const ACTION_TYPES = {
  FETCH_PROFISSIONALESPECIALIDADE_LIST: 'profissionalEspecialidade/FETCH_PROFISSIONALESPECIALIDADE_LIST',
  FETCH_PROFISSIONALESPECIALIDADE: 'profissionalEspecialidade/FETCH_PROFISSIONALESPECIALIDADE',
  CREATE_PROFISSIONALESPECIALIDADE: 'profissionalEspecialidade/CREATE_PROFISSIONALESPECIALIDADE',
  UPDATE_PROFISSIONALESPECIALIDADE: 'profissionalEspecialidade/UPDATE_PROFISSIONALESPECIALIDADE',
  DELETE_PROFISSIONALESPECIALIDADE: 'profissionalEspecialidade/DELETE_PROFISSIONALESPECIALIDADE',
  RESET: 'profissionalEspecialidade/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IProfissionalEspecialidade>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type ProfissionalEspecialidadeState = Readonly<typeof initialState>;

// Reducer

export default (state: ProfissionalEspecialidadeState = initialState, action): ProfissionalEspecialidadeState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_PROFISSIONALESPECIALIDADE_LIST):
    case REQUEST(ACTION_TYPES.FETCH_PROFISSIONALESPECIALIDADE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_PROFISSIONALESPECIALIDADE):
    case REQUEST(ACTION_TYPES.UPDATE_PROFISSIONALESPECIALIDADE):
    case REQUEST(ACTION_TYPES.DELETE_PROFISSIONALESPECIALIDADE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_PROFISSIONALESPECIALIDADE_LIST):
    case FAILURE(ACTION_TYPES.FETCH_PROFISSIONALESPECIALIDADE):
    case FAILURE(ACTION_TYPES.CREATE_PROFISSIONALESPECIALIDADE):
    case FAILURE(ACTION_TYPES.UPDATE_PROFISSIONALESPECIALIDADE):
    case FAILURE(ACTION_TYPES.DELETE_PROFISSIONALESPECIALIDADE):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_PROFISSIONALESPECIALIDADE_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10)
      };
    case SUCCESS(ACTION_TYPES.FETCH_PROFISSIONALESPECIALIDADE):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_PROFISSIONALESPECIALIDADE):
    case SUCCESS(ACTION_TYPES.UPDATE_PROFISSIONALESPECIALIDADE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_PROFISSIONALESPECIALIDADE):
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

const apiUrl = 'api/profissional-especialidades';

// Actions

// Actions
export type ICrudGetAllActionProfissionalEspecialidade<T> = (
  idEspecialidade?: any,
  idProfissional?: any,
  page?: number,
  size?: number,
  sort?: string
) => IPayload<T> | ((dispatch: any) => IPayload<T>);

export const getEntities: ICrudGetAllActionProfissionalEspecialidade<IProfissionalEspecialidade> = (
  idEspecialidade,
  idProfissional,
  page,
  size,
  sort
) => {
  const idEspecialidadeRequest = idEspecialidade ? `idEspecialidade.contains=${idEspecialidade}&` : '';
  const idProfissionalRequest = idProfissional ? `idProfissional.contains=${idProfissional}&` : '';

  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}&` : '?'}`;
  return {
    type: ACTION_TYPES.FETCH_PROFISSIONALESPECIALIDADE_LIST,
    payload: axios.get<IProfissionalEspecialidade>(
      `${requestUrl}${idEspecialidadeRequest}${idProfissionalRequest}cacheBuster=${new Date().getTime()}`
    )
  };
};
export const getEntity: ICrudGetAction<IProfissionalEspecialidade> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_PROFISSIONALESPECIALIDADE,
    payload: axios.get<IProfissionalEspecialidade>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IProfissionalEspecialidade> = entity => async dispatch => {
  entity = {
    ...entity
  };
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_PROFISSIONALESPECIALIDADE,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IProfissionalEspecialidade> = entity => async dispatch => {
  entity = { ...entity };
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_PROFISSIONALESPECIALIDADE,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IProfissionalEspecialidade> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_PROFISSIONALESPECIALIDADE,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
