/* eslint complexity: ["error", 100] */
import axios from 'axios';
import { ICrudGetAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { IPayload } from 'react-jhipster/src/type/redux-action.type';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IPacienteDispositivoComplexidade, defaultValue } from 'app/shared/model/paciente-dispositivo-complexidade.model';

export const ACTION_TYPES = {
  FETCH_PACIENTEDISPOSITIVOCOMPLEXIDADE_LIST: 'pacienteDispositivoComplexidade/FETCH_PACIENTEDISPOSITIVOCOMPLEXIDADE_LIST',
  FETCH_PACIENTEDISPOSITIVOCOMPLEXIDADE: 'pacienteDispositivoComplexidade/FETCH_PACIENTEDISPOSITIVOCOMPLEXIDADE',
  CREATE_PACIENTEDISPOSITIVOCOMPLEXIDADE: 'pacienteDispositivoComplexidade/CREATE_PACIENTEDISPOSITIVOCOMPLEXIDADE',
  UPDATE_PACIENTEDISPOSITIVOCOMPLEXIDADE: 'pacienteDispositivoComplexidade/UPDATE_PACIENTEDISPOSITIVOCOMPLEXIDADE',
  DELETE_PACIENTEDISPOSITIVOCOMPLEXIDADE: 'pacienteDispositivoComplexidade/DELETE_PACIENTEDISPOSITIVOCOMPLEXIDADE',
  RESET: 'pacienteDispositivoComplexidade/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IPacienteDispositivoComplexidade>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type PacienteDispositivoComplexidadeState = Readonly<typeof initialState>;

// Reducer

export default (state: PacienteDispositivoComplexidadeState = initialState, action): PacienteDispositivoComplexidadeState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_PACIENTEDISPOSITIVOCOMPLEXIDADE_LIST):
    case REQUEST(ACTION_TYPES.FETCH_PACIENTEDISPOSITIVOCOMPLEXIDADE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_PACIENTEDISPOSITIVOCOMPLEXIDADE):
    case REQUEST(ACTION_TYPES.UPDATE_PACIENTEDISPOSITIVOCOMPLEXIDADE):
    case REQUEST(ACTION_TYPES.DELETE_PACIENTEDISPOSITIVOCOMPLEXIDADE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_PACIENTEDISPOSITIVOCOMPLEXIDADE_LIST):
    case FAILURE(ACTION_TYPES.FETCH_PACIENTEDISPOSITIVOCOMPLEXIDADE):
    case FAILURE(ACTION_TYPES.CREATE_PACIENTEDISPOSITIVOCOMPLEXIDADE):
    case FAILURE(ACTION_TYPES.UPDATE_PACIENTEDISPOSITIVOCOMPLEXIDADE):
    case FAILURE(ACTION_TYPES.DELETE_PACIENTEDISPOSITIVOCOMPLEXIDADE):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_PACIENTEDISPOSITIVOCOMPLEXIDADE_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10)
      };
    case SUCCESS(ACTION_TYPES.FETCH_PACIENTEDISPOSITIVOCOMPLEXIDADE):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_PACIENTEDISPOSITIVOCOMPLEXIDADE):
    case SUCCESS(ACTION_TYPES.UPDATE_PACIENTEDISPOSITIVOCOMPLEXIDADE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_PACIENTEDISPOSITIVOCOMPLEXIDADE):
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

const apiUrl = 'api/paciente-dispositivo-complexidades';

// Actions

// Actions
export type ICrudGetAllActionPacienteDispositivoComplexidade<T> = (
  caracteristica?: any,
  ativo?: any,
  tipo?: any,
  page?: number,
  size?: number,
  sort?: string
) => IPayload<T> | ((dispatch: any) => IPayload<T>);

export const getEntities: ICrudGetAllActionPacienteDispositivoComplexidade<IPacienteDispositivoComplexidade> = (
  caracteristica,
  ativo,
  tipo,
  page,
  size,
  sort
) => {
  const caracteristicaRequest = caracteristica ? `caracteristica.contains=${caracteristica}&` : '';
  const ativoRequest = ativo ? `ativo.contains=${ativo}&` : '';
  const tipoRequest = tipo ? `tipo.contains=${tipo}&` : '';

  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}&` : '?'}`;
  return {
    type: ACTION_TYPES.FETCH_PACIENTEDISPOSITIVOCOMPLEXIDADE_LIST,
    payload: axios.get<IPacienteDispositivoComplexidade>(
      `${requestUrl}${caracteristicaRequest}${ativoRequest}${tipoRequest}cacheBuster=${new Date().getTime()}`
    )
  };
};
export const getEntity: ICrudGetAction<IPacienteDispositivoComplexidade> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_PACIENTEDISPOSITIVOCOMPLEXIDADE,
    payload: axios.get<IPacienteDispositivoComplexidade>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IPacienteDispositivoComplexidade> = entity => async dispatch => {
  entity = {
    ...entity
  };
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_PACIENTEDISPOSITIVOCOMPLEXIDADE,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IPacienteDispositivoComplexidade> = entity => async dispatch => {
  entity = { ...entity };
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_PACIENTEDISPOSITIVOCOMPLEXIDADE,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IPacienteDispositivoComplexidade> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_PACIENTEDISPOSITIVOCOMPLEXIDADE,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
