/* eslint complexity: ["error", 100] */
import axios from 'axios';
import { ICrudGetAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { IPayload } from 'react-jhipster/src/type/redux-action.type';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IJunho, defaultValue } from 'app/shared/model/junho.model';

export const ACTION_TYPES = {
  FETCH_JUNHO_LIST: 'junho/FETCH_JUNHO_LIST',
  FETCH_JUNHO: 'junho/FETCH_JUNHO',
  CREATE_JUNHO: 'junho/CREATE_JUNHO',
  UPDATE_JUNHO: 'junho/UPDATE_JUNHO',
  DELETE_JUNHO: 'junho/DELETE_JUNHO',
  RESET: 'junho/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IJunho>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type JunhoState = Readonly<typeof initialState>;

// Reducer

export default (state: JunhoState = initialState, action): JunhoState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_JUNHO_LIST):
    case REQUEST(ACTION_TYPES.FETCH_JUNHO):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_JUNHO):
    case REQUEST(ACTION_TYPES.UPDATE_JUNHO):
    case REQUEST(ACTION_TYPES.DELETE_JUNHO):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_JUNHO_LIST):
    case FAILURE(ACTION_TYPES.FETCH_JUNHO):
    case FAILURE(ACTION_TYPES.CREATE_JUNHO):
    case FAILURE(ACTION_TYPES.UPDATE_JUNHO):
    case FAILURE(ACTION_TYPES.DELETE_JUNHO):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_JUNHO_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10)
      };
    case SUCCESS(ACTION_TYPES.FETCH_JUNHO):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_JUNHO):
    case SUCCESS(ACTION_TYPES.UPDATE_JUNHO):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_JUNHO):
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

const apiUrl = 'api/junhos';

// Actions

// Actions
export type ICrudGetAllActionJunho<T> = (
  idFranquia?: any,
  idPaciente?: any,
  nroPad?: any,
  dataInicio?: any,
  dataFim?: any,
  idEspecialidade?: any,
  idPeriodicidade?: any,
  idPeriodo?: any,
  qtdSessoes?: any,
  page?: number,
  size?: number,
  sort?: string
) => IPayload<T> | ((dispatch: any) => IPayload<T>);

export const getEntities: ICrudGetAllActionJunho<IJunho> = (
  idFranquia,
  idPaciente,
  nroPad,
  dataInicio,
  dataFim,
  idEspecialidade,
  idPeriodicidade,
  idPeriodo,
  qtdSessoes,
  page,
  size,
  sort
) => {
  const idFranquiaRequest = idFranquia ? `idFranquia.contains=${idFranquia}&` : '';
  const idPacienteRequest = idPaciente ? `idPaciente.contains=${idPaciente}&` : '';
  const nroPadRequest = nroPad ? `nroPad.contains=${nroPad}&` : '';
  const dataInicioRequest = dataInicio ? `dataInicio.contains=${dataInicio}&` : '';
  const dataFimRequest = dataFim ? `dataFim.contains=${dataFim}&` : '';
  const idEspecialidadeRequest = idEspecialidade ? `idEspecialidade.contains=${idEspecialidade}&` : '';
  const idPeriodicidadeRequest = idPeriodicidade ? `idPeriodicidade.contains=${idPeriodicidade}&` : '';
  const idPeriodoRequest = idPeriodo ? `idPeriodo.contains=${idPeriodo}&` : '';
  const qtdSessoesRequest = qtdSessoes ? `qtdSessoes.contains=${qtdSessoes}&` : '';

  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}&` : '?'}`;
  return {
    type: ACTION_TYPES.FETCH_JUNHO_LIST,
    payload: axios.get<IJunho>(
      `${requestUrl}${idFranquiaRequest}${idPacienteRequest}${nroPadRequest}${dataInicioRequest}${dataFimRequest}${idEspecialidadeRequest}${idPeriodicidadeRequest}${idPeriodoRequest}${qtdSessoesRequest}cacheBuster=${new Date().getTime()}`
    )
  };
};
export const getEntity: ICrudGetAction<IJunho> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_JUNHO,
    payload: axios.get<IJunho>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IJunho> = entity => async dispatch => {
  entity = {
    ...entity
  };
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_JUNHO,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IJunho> = entity => async dispatch => {
  entity = { ...entity };
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_JUNHO,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IJunho> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_JUNHO,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
