/* eslint complexity: ["error", 100] */
import axios from 'axios';
import { ICrudGetAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { IPayload } from 'react-jhipster/src/type/redux-action.type';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import {
  IProfissionalDispositivoComplexidadeAtual,
  defaultValue
} from 'app/shared/model/profissional-dispositivo-complexidade-atual.model';

export const ACTION_TYPES = {
  FETCH_PROFISSIONALDISPOSITIVOCOMPLEXIDADEATUAL_LIST:
    'profissionalDispositivoComplexidadeAtual/FETCH_PROFISSIONALDISPOSITIVOCOMPLEXIDADEATUAL_LIST',
  FETCH_PROFISSIONALDISPOSITIVOCOMPLEXIDADEATUAL: 'profissionalDispositivoComplexidadeAtual/FETCH_PROFISSIONALDISPOSITIVOCOMPLEXIDADEATUAL',
  CREATE_PROFISSIONALDISPOSITIVOCOMPLEXIDADEATUAL:
    'profissionalDispositivoComplexidadeAtual/CREATE_PROFISSIONALDISPOSITIVOCOMPLEXIDADEATUAL',
  UPDATE_PROFISSIONALDISPOSITIVOCOMPLEXIDADEATUAL:
    'profissionalDispositivoComplexidadeAtual/UPDATE_PROFISSIONALDISPOSITIVOCOMPLEXIDADEATUAL',
  DELETE_PROFISSIONALDISPOSITIVOCOMPLEXIDADEATUAL:
    'profissionalDispositivoComplexidadeAtual/DELETE_PROFISSIONALDISPOSITIVOCOMPLEXIDADEATUAL',
  RESET: 'profissionalDispositivoComplexidadeAtual/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IProfissionalDispositivoComplexidadeAtual>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type ProfissionalDispositivoComplexidadeAtualState = Readonly<typeof initialState>;

// Reducer

export default (
  state: ProfissionalDispositivoComplexidadeAtualState = initialState,
  action
): ProfissionalDispositivoComplexidadeAtualState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_PROFISSIONALDISPOSITIVOCOMPLEXIDADEATUAL_LIST):
    case REQUEST(ACTION_TYPES.FETCH_PROFISSIONALDISPOSITIVOCOMPLEXIDADEATUAL):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_PROFISSIONALDISPOSITIVOCOMPLEXIDADEATUAL):
    case REQUEST(ACTION_TYPES.UPDATE_PROFISSIONALDISPOSITIVOCOMPLEXIDADEATUAL):
    case REQUEST(ACTION_TYPES.DELETE_PROFISSIONALDISPOSITIVOCOMPLEXIDADEATUAL):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_PROFISSIONALDISPOSITIVOCOMPLEXIDADEATUAL_LIST):
    case FAILURE(ACTION_TYPES.FETCH_PROFISSIONALDISPOSITIVOCOMPLEXIDADEATUAL):
    case FAILURE(ACTION_TYPES.CREATE_PROFISSIONALDISPOSITIVOCOMPLEXIDADEATUAL):
    case FAILURE(ACTION_TYPES.UPDATE_PROFISSIONALDISPOSITIVOCOMPLEXIDADEATUAL):
    case FAILURE(ACTION_TYPES.DELETE_PROFISSIONALDISPOSITIVOCOMPLEXIDADEATUAL):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_PROFISSIONALDISPOSITIVOCOMPLEXIDADEATUAL_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10)
      };
    case SUCCESS(ACTION_TYPES.FETCH_PROFISSIONALDISPOSITIVOCOMPLEXIDADEATUAL):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_PROFISSIONALDISPOSITIVOCOMPLEXIDADEATUAL):
    case SUCCESS(ACTION_TYPES.UPDATE_PROFISSIONALDISPOSITIVOCOMPLEXIDADEATUAL):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_PROFISSIONALDISPOSITIVOCOMPLEXIDADEATUAL):
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

const apiUrl = 'api/profissional-dispositivo-complexidade-atuals';

// Actions

// Actions
export type ICrudGetAllActionProfissionalDispositivoComplexidadeAtual<T> = (
  idProfissional?: any,
  idProfissionalDispositivoComplexidade?: any,
  idUsuario?: any,
  page?: number,
  size?: number,
  sort?: string
) => IPayload<T> | ((dispatch: any) => IPayload<T>);

export const getEntities: ICrudGetAllActionProfissionalDispositivoComplexidadeAtual<IProfissionalDispositivoComplexidadeAtual> = (
  idProfissional,
  idProfissionalDispositivoComplexidade,
  idUsuario,
  page,
  size,
  sort
) => {
  const idProfissionalRequest = idProfissional ? `idProfissional.contains=${idProfissional}&` : '';
  const idProfissionalDispositivoComplexidadeRequest = idProfissionalDispositivoComplexidade
    ? `idProfissionalDispositivoComplexidade.contains=${idProfissionalDispositivoComplexidade}&`
    : '';
  const idUsuarioRequest = idUsuario ? `idUsuario.contains=${idUsuario}&` : '';

  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}&` : '?'}`;
  return {
    type: ACTION_TYPES.FETCH_PROFISSIONALDISPOSITIVOCOMPLEXIDADEATUAL_LIST,
    payload: axios.get<IProfissionalDispositivoComplexidadeAtual>(
      `${requestUrl}${idProfissionalRequest}${idProfissionalDispositivoComplexidadeRequest}${idUsuarioRequest}cacheBuster=${new Date().getTime()}`
    )
  };
};
export const getEntity: ICrudGetAction<IProfissionalDispositivoComplexidadeAtual> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_PROFISSIONALDISPOSITIVOCOMPLEXIDADEATUAL,
    payload: axios.get<IProfissionalDispositivoComplexidadeAtual>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IProfissionalDispositivoComplexidadeAtual> = entity => async dispatch => {
  entity = {
    ...entity
  };
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_PROFISSIONALDISPOSITIVOCOMPLEXIDADEATUAL,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IProfissionalDispositivoComplexidadeAtual> = entity => async dispatch => {
  entity = { ...entity };
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_PROFISSIONALDISPOSITIVOCOMPLEXIDADEATUAL,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IProfissionalDispositivoComplexidadeAtual> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_PROFISSIONALDISPOSITIVOCOMPLEXIDADEATUAL,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
