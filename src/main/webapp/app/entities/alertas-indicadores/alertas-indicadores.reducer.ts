/* eslint complexity: ["error", 100] */
import axios from 'axios';
import { ICrudGetAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { IPayload } from 'react-jhipster/src/type/redux-action.type';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IAlertasIndicadores, defaultValue } from 'app/shared/model/alertas-indicadores.model';

export const ACTION_TYPES = {
  FETCH_ALERTASINDICADORES_LIST_EXPORT: 'alertasIndicadores/FETCH_ALERTASINDICADORES_LIST_EXPORT',
  FETCH_ALERTASINDICADORES_LIST: 'alertasIndicadores/FETCH_ALERTASINDICADORES_LIST',
  FETCH_ALERTASINDICADORES: 'alertasIndicadores/FETCH_ALERTASINDICADORES',
  CREATE_ALERTASINDICADORES: 'alertasIndicadores/CREATE_ALERTASINDICADORES',
  UPDATE_ALERTASINDICADORES: 'alertasIndicadores/UPDATE_ALERTASINDICADORES',
  DELETE_ALERTASINDICADORES: 'alertasIndicadores/DELETE_ALERTASINDICADORES',
  RESET: 'alertasIndicadores/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IAlertasIndicadores>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type AlertasIndicadoresState = Readonly<typeof initialState>;

export interface IAlertasIndicadoresBaseState {
  baseFilters: any;
  pontuacao: any;
  alteracaoEsperada: any;
  observacoes: any;
  usuarioId: any;
}

export interface IAlertasIndicadoresUpdateState {
  fieldsBase: IAlertasIndicadoresBaseState;
  isNew: boolean;
}

// Reducer

export default (state: AlertasIndicadoresState = initialState, action): AlertasIndicadoresState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_ALERTASINDICADORES_LIST_EXPORT):
    case REQUEST(ACTION_TYPES.FETCH_ALERTASINDICADORES_LIST):
    case REQUEST(ACTION_TYPES.FETCH_ALERTASINDICADORES):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_ALERTASINDICADORES):
    case REQUEST(ACTION_TYPES.UPDATE_ALERTASINDICADORES):
    case REQUEST(ACTION_TYPES.DELETE_ALERTASINDICADORES):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_ALERTASINDICADORES_LIST_EXPORT):
    case FAILURE(ACTION_TYPES.FETCH_ALERTASINDICADORES_LIST):
    case FAILURE(ACTION_TYPES.FETCH_ALERTASINDICADORES):
    case FAILURE(ACTION_TYPES.CREATE_ALERTASINDICADORES):
    case FAILURE(ACTION_TYPES.UPDATE_ALERTASINDICADORES):
    case FAILURE(ACTION_TYPES.DELETE_ALERTASINDICADORES):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_ALERTASINDICADORES_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10)
      };
    case SUCCESS(ACTION_TYPES.FETCH_ALERTASINDICADORES):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_ALERTASINDICADORES):
    case SUCCESS(ACTION_TYPES.UPDATE_ALERTASINDICADORES):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_ALERTASINDICADORES):
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

const apiUrl = 'api/alertas-indicadores';

// Actions

// Actions
export type ICrudGetAllActionAlertasIndicadores<T> = (
  pontuacao?: any,
  alteracaoEsperada?: any,
  observacoes?: any,
  usuarioId?: any,
  page?: number,
  size?: number,
  sort?: string
) => IPayload<T> | ((dispatch: any) => IPayload<T>);

export const getEntities: ICrudGetAllActionAlertasIndicadores<IAlertasIndicadores> = (
  pontuacao,
  alteracaoEsperada,
  observacoes,
  usuarioId,
  page,
  size,
  sort
) => {
  const pontuacaoRequest = pontuacao ? `pontuacao.contains=${pontuacao}&` : '';
  const alteracaoEsperadaRequest = alteracaoEsperada ? `alteracaoEsperada.contains=${alteracaoEsperada}&` : '';
  const observacoesRequest = observacoes ? `observacoes.contains=${observacoes}&` : '';
  const usuarioIdRequest = usuarioId ? `usuarioId.contains=${usuarioId}&` : '';

  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}&` : '?'}`;
  return {
    type: ACTION_TYPES.FETCH_ALERTASINDICADORES_LIST,
    payload: axios.get<IAlertasIndicadores>(
      `${requestUrl}${pontuacaoRequest}${alteracaoEsperadaRequest}${observacoesRequest}${usuarioIdRequest}cacheBuster=${new Date().getTime()}`
    )
  };
};
export const getEntity: ICrudGetAction<IAlertasIndicadores> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_ALERTASINDICADORES,
    payload: axios.get<IAlertasIndicadores>(requestUrl)
  };
};

export const getEntitiesExport: ICrudGetAllActionAlertasIndicadores<IAlertasIndicadores> = (
  pontuacao,
  alteracaoEsperada,
  observacoes,
  usuarioId,
  page,
  size,
  sort
) => {
  const pontuacaoRequest = pontuacao ? `pontuacao.contains=${pontuacao}&` : '';
  const alteracaoEsperadaRequest = alteracaoEsperada ? `alteracaoEsperada.contains=${alteracaoEsperada}&` : '';
  const observacoesRequest = observacoes ? `observacoes.contains=${observacoes}&` : '';
  const usuarioIdRequest = usuarioId ? `usuarioId.contains=${usuarioId}&` : '';

  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}&` : '?'}`;
  return {
    type: ACTION_TYPES.FETCH_ALERTASINDICADORES_LIST,
    payload: axios.get<IAlertasIndicadores>(
      `${requestUrl}${pontuacaoRequest}${alteracaoEsperadaRequest}${observacoesRequest}${usuarioIdRequest}cacheBuster=${new Date().getTime()}`
    )
  };
};

export const createEntity: ICrudPutAction<IAlertasIndicadores> = entity => async dispatch => {
  entity = {
    ...entity
  };
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_ALERTASINDICADORES,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IAlertasIndicadores> = entity => async dispatch => {
  entity = { ...entity };
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_ALERTASINDICADORES,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IAlertasIndicadores> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_ALERTASINDICADORES,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});

export const getAlertasIndicadoresState = (location): IAlertasIndicadoresBaseState => {
  const url = new URL(`http://localhost${location.search}`); // using a dummy url for parsing
  const baseFilters = url.searchParams.get('baseFilters') || '';
  const pontuacao = url.searchParams.get('pontuacao') || '';
  const alteracaoEsperada = url.searchParams.get('alteracaoEsperada') || '';
  const observacoes = url.searchParams.get('observacoes') || '';
  const usuarioId = url.searchParams.get('usuarioId') || '';

  return {
    baseFilters,
    pontuacao,
    alteracaoEsperada,
    observacoes,
    usuarioId
  };
};
