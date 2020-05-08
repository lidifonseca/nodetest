/* eslint complexity: ["error", 100] */
import axios from 'axios';
import { ICrudGetAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { IPayload } from 'react-jhipster/src/type/redux-action.type';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IAcoesRespostas, defaultValue } from 'app/shared/model/acoes-respostas.model';

export const ACTION_TYPES = {
  FETCH_ACOESRESPOSTAS_LIST_EXPORT: 'acoesRespostas/FETCH_ACOESRESPOSTAS_LIST_EXPORT',
  FETCH_ACOESRESPOSTAS_LIST: 'acoesRespostas/FETCH_ACOESRESPOSTAS_LIST',
  FETCH_ACOESRESPOSTAS: 'acoesRespostas/FETCH_ACOESRESPOSTAS',
  CREATE_ACOESRESPOSTAS: 'acoesRespostas/CREATE_ACOESRESPOSTAS',
  UPDATE_ACOESRESPOSTAS: 'acoesRespostas/UPDATE_ACOESRESPOSTAS',
  DELETE_ACOESRESPOSTAS: 'acoesRespostas/DELETE_ACOESRESPOSTAS',
  RESET: 'acoesRespostas/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IAcoesRespostas>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type AcoesRespostasState = Readonly<typeof initialState>;

export interface IAcoesRespostasBaseState {
  baseFilters: any;
  abrirCampoPersonalizado: any;
  condicaoSexo: any;
  observacoes: any;
  tipoCampo1: any;
  tipoCampo2: any;
}

export interface IAcoesRespostasUpdateState {
  fieldsBase: IAcoesRespostasBaseState;

  isNew: boolean;
}

// Reducer

export default (state: AcoesRespostasState = initialState, action): AcoesRespostasState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_ACOESRESPOSTAS_LIST_EXPORT):
    case REQUEST(ACTION_TYPES.FETCH_ACOESRESPOSTAS_LIST):
    case REQUEST(ACTION_TYPES.FETCH_ACOESRESPOSTAS):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_ACOESRESPOSTAS):
    case REQUEST(ACTION_TYPES.UPDATE_ACOESRESPOSTAS):
    case REQUEST(ACTION_TYPES.DELETE_ACOESRESPOSTAS):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_ACOESRESPOSTAS_LIST_EXPORT):
    case FAILURE(ACTION_TYPES.FETCH_ACOESRESPOSTAS_LIST):
    case FAILURE(ACTION_TYPES.FETCH_ACOESRESPOSTAS):
    case FAILURE(ACTION_TYPES.CREATE_ACOESRESPOSTAS):
    case FAILURE(ACTION_TYPES.UPDATE_ACOESRESPOSTAS):
    case FAILURE(ACTION_TYPES.DELETE_ACOESRESPOSTAS):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_ACOESRESPOSTAS_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10)
      };
    case SUCCESS(ACTION_TYPES.FETCH_ACOESRESPOSTAS):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_ACOESRESPOSTAS):
    case SUCCESS(ACTION_TYPES.UPDATE_ACOESRESPOSTAS):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_ACOESRESPOSTAS):
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

const apiUrl = 'api/acoes-respostas';

// Actions

// Actions
export type ICrudGetAllActionAcoesRespostas<T> = (
  abrirCampoPersonalizado?: any,
  condicaoSexo?: any,
  observacoes?: any,
  tipoCampo1?: any,
  tipoCampo2?: any,
  page?: number,
  size?: number,
  sort?: string
) => IPayload<T> | ((dispatch: any) => IPayload<T>);

export const getEntities: ICrudGetAllActionAcoesRespostas<IAcoesRespostas> = (
  abrirCampoPersonalizado,
  condicaoSexo,
  observacoes,
  tipoCampo1,
  tipoCampo2,
  page,
  size,
  sort
) => {
  const abrirCampoPersonalizadoRequest = abrirCampoPersonalizado ? `abrirCampoPersonalizado.contains=${abrirCampoPersonalizado}&` : '';
  const condicaoSexoRequest = condicaoSexo ? `condicaoSexo.contains=${condicaoSexo}&` : '';
  const observacoesRequest = observacoes ? `observacoes.contains=${observacoes}&` : '';
  const tipoCampo1Request = tipoCampo1 ? `tipoCampo1.contains=${tipoCampo1}&` : '';
  const tipoCampo2Request = tipoCampo2 ? `tipoCampo2.contains=${tipoCampo2}&` : '';

  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}&` : '?'}`;
  return {
    type: ACTION_TYPES.FETCH_ACOESRESPOSTAS_LIST,
    payload: axios.get<IAcoesRespostas>(
      `${requestUrl}${abrirCampoPersonalizadoRequest}${condicaoSexoRequest}${observacoesRequest}${tipoCampo1Request}${tipoCampo2Request}cacheBuster=${new Date().getTime()}`
    )
  };
};
export const getEntity: ICrudGetAction<IAcoesRespostas> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_ACOESRESPOSTAS,
    payload: axios.get<IAcoesRespostas>(requestUrl)
  };
};

export const getEntitiesExport: ICrudGetAllActionAcoesRespostas<IAcoesRespostas> = (
  abrirCampoPersonalizado,
  condicaoSexo,
  observacoes,
  tipoCampo1,
  tipoCampo2,
  page,
  size,
  sort
) => {
  const abrirCampoPersonalizadoRequest = abrirCampoPersonalizado ? `abrirCampoPersonalizado.contains=${abrirCampoPersonalizado}&` : '';
  const condicaoSexoRequest = condicaoSexo ? `condicaoSexo.contains=${condicaoSexo}&` : '';
  const observacoesRequest = observacoes ? `observacoes.contains=${observacoes}&` : '';
  const tipoCampo1Request = tipoCampo1 ? `tipoCampo1.contains=${tipoCampo1}&` : '';
  const tipoCampo2Request = tipoCampo2 ? `tipoCampo2.contains=${tipoCampo2}&` : '';

  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}&` : '?'}`;
  return {
    type: ACTION_TYPES.FETCH_ACOESRESPOSTAS_LIST,
    payload: axios.get<IAcoesRespostas>(
      `${requestUrl}${abrirCampoPersonalizadoRequest}${condicaoSexoRequest}${observacoesRequest}${tipoCampo1Request}${tipoCampo2Request}cacheBuster=${new Date().getTime()}`
    )
  };
};

export const createEntity: ICrudPutAction<IAcoesRespostas> = entity => async dispatch => {
  entity = {
    ...entity
  };
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_ACOESRESPOSTAS,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IAcoesRespostas> = entity => async dispatch => {
  entity = { ...entity };
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_ACOESRESPOSTAS,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IAcoesRespostas> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_ACOESRESPOSTAS,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});

export const getAcoesRespostasState = (location): IAcoesRespostasBaseState => {
  const url = new URL(`http://localhost${location.search}`); // using a dummy url for parsing
  const baseFilters = url.searchParams.get('baseFilters') || '';
  const abrirCampoPersonalizado = url.searchParams.get('abrirCampoPersonalizado') || '';
  const condicaoSexo = url.searchParams.get('condicaoSexo') || '';
  const observacoes = url.searchParams.get('observacoes') || '';
  const tipoCampo1 = url.searchParams.get('tipoCampo1') || '';
  const tipoCampo2 = url.searchParams.get('tipoCampo2') || '';

  return {
    baseFilters,
    abrirCampoPersonalizado,
    condicaoSexo,
    observacoes,
    tipoCampo1,
    tipoCampo2
  };
};
