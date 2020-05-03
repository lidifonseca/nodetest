/* eslint complexity: ["error", 100] */
import axios from 'axios';
import { ICrudGetAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { IPayload } from 'react-jhipster/src/type/redux-action.type';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IProfissionalHorario, defaultValue } from 'app/shared/model/profissional-horario.model';

export const ACTION_TYPES = {
  FETCH_PROFISSIONALHORARIO_LIST: 'profissionalHorario/FETCH_PROFISSIONALHORARIO_LIST',
  FETCH_PROFISSIONALHORARIO: 'profissionalHorario/FETCH_PROFISSIONALHORARIO',
  CREATE_PROFISSIONALHORARIO: 'profissionalHorario/CREATE_PROFISSIONALHORARIO',
  UPDATE_PROFISSIONALHORARIO: 'profissionalHorario/UPDATE_PROFISSIONALHORARIO',
  DELETE_PROFISSIONALHORARIO: 'profissionalHorario/DELETE_PROFISSIONALHORARIO',
  RESET: 'profissionalHorario/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IProfissionalHorario>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type ProfissionalHorarioState = Readonly<typeof initialState>;

// Reducer

export default (state: ProfissionalHorarioState = initialState, action): ProfissionalHorarioState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_PROFISSIONALHORARIO_LIST):
    case REQUEST(ACTION_TYPES.FETCH_PROFISSIONALHORARIO):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_PROFISSIONALHORARIO):
    case REQUEST(ACTION_TYPES.UPDATE_PROFISSIONALHORARIO):
    case REQUEST(ACTION_TYPES.DELETE_PROFISSIONALHORARIO):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_PROFISSIONALHORARIO_LIST):
    case FAILURE(ACTION_TYPES.FETCH_PROFISSIONALHORARIO):
    case FAILURE(ACTION_TYPES.CREATE_PROFISSIONALHORARIO):
    case FAILURE(ACTION_TYPES.UPDATE_PROFISSIONALHORARIO):
    case FAILURE(ACTION_TYPES.DELETE_PROFISSIONALHORARIO):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_PROFISSIONALHORARIO_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10)
      };
    case SUCCESS(ACTION_TYPES.FETCH_PROFISSIONALHORARIO):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_PROFISSIONALHORARIO):
    case SUCCESS(ACTION_TYPES.UPDATE_PROFISSIONALHORARIO):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_PROFISSIONALHORARIO):
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

const apiUrl = 'api/profissional-horarios';

// Actions

// Actions
export type ICrudGetAllActionProfissionalHorario<T> = (
  idAtendimento?: any,
  idProfissional?: any,
  horario?: any,
  confirm?: any,
  page?: number,
  size?: number,
  sort?: string
) => IPayload<T> | ((dispatch: any) => IPayload<T>);

export const getEntities: ICrudGetAllActionProfissionalHorario<IProfissionalHorario> = (
  idAtendimento,
  idProfissional,
  horario,
  confirm,
  page,
  size,
  sort
) => {
  const idAtendimentoRequest = idAtendimento ? `idAtendimento.contains=${idAtendimento}&` : '';
  const idProfissionalRequest = idProfissional ? `idProfissional.contains=${idProfissional}&` : '';
  const horarioRequest = horario ? `horario.contains=${horario}&` : '';
  const confirmRequest = confirm ? `confirm.contains=${confirm}&` : '';

  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}&` : '?'}`;
  return {
    type: ACTION_TYPES.FETCH_PROFISSIONALHORARIO_LIST,
    payload: axios.get<IProfissionalHorario>(
      `${requestUrl}${idAtendimentoRequest}${idProfissionalRequest}${horarioRequest}${confirmRequest}cacheBuster=${new Date().getTime()}`
    )
  };
};
export const getEntity: ICrudGetAction<IProfissionalHorario> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_PROFISSIONALHORARIO,
    payload: axios.get<IProfissionalHorario>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IProfissionalHorario> = entity => async dispatch => {
  entity = {
    ...entity
  };
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_PROFISSIONALHORARIO,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IProfissionalHorario> = entity => async dispatch => {
  entity = { ...entity };
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_PROFISSIONALHORARIO,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IProfissionalHorario> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_PROFISSIONALHORARIO,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
