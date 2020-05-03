/* eslint complexity: ["error", 100] */
import axios from 'axios';
import { ICrudGetAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { IPayload } from 'react-jhipster/src/type/redux-action.type';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IDescPta, defaultValue } from 'app/shared/model/desc-pta.model';

export const ACTION_TYPES = {
  FETCH_DESCPTA_LIST: 'descPta/FETCH_DESCPTA_LIST',
  FETCH_DESCPTA: 'descPta/FETCH_DESCPTA',
  CREATE_DESCPTA: 'descPta/CREATE_DESCPTA',
  UPDATE_DESCPTA: 'descPta/UPDATE_DESCPTA',
  DELETE_DESCPTA: 'descPta/DELETE_DESCPTA',
  RESET: 'descPta/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IDescPta>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type DescPtaState = Readonly<typeof initialState>;

// Reducer

export default (state: DescPtaState = initialState, action): DescPtaState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_DESCPTA_LIST):
    case REQUEST(ACTION_TYPES.FETCH_DESCPTA):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_DESCPTA):
    case REQUEST(ACTION_TYPES.UPDATE_DESCPTA):
    case REQUEST(ACTION_TYPES.DELETE_DESCPTA):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_DESCPTA_LIST):
    case FAILURE(ACTION_TYPES.FETCH_DESCPTA):
    case FAILURE(ACTION_TYPES.CREATE_DESCPTA):
    case FAILURE(ACTION_TYPES.UPDATE_DESCPTA):
    case FAILURE(ACTION_TYPES.DELETE_DESCPTA):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_DESCPTA_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10)
      };
    case SUCCESS(ACTION_TYPES.FETCH_DESCPTA):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_DESCPTA):
    case SUCCESS(ACTION_TYPES.UPDATE_DESCPTA):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_DESCPTA):
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

const apiUrl = 'api/desc-ptas';

// Actions

// Actions
export type ICrudGetAllActionDescPta<T> = (
  nome?: any,
  resultadoEsperado?: any,
  ativo?: any,
  page?: number,
  size?: number,
  sort?: string
) => IPayload<T> | ((dispatch: any) => IPayload<T>);

export const getEntities: ICrudGetAllActionDescPta<IDescPta> = (nome, resultadoEsperado, ativo, page, size, sort) => {
  const nomeRequest = nome ? `nome.contains=${nome}&` : '';
  const resultadoEsperadoRequest = resultadoEsperado ? `resultadoEsperado.contains=${resultadoEsperado}&` : '';
  const ativoRequest = ativo ? `ativo.contains=${ativo}&` : '';

  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}&` : '?'}`;
  return {
    type: ACTION_TYPES.FETCH_DESCPTA_LIST,
    payload: axios.get<IDescPta>(`${requestUrl}${nomeRequest}${resultadoEsperadoRequest}${ativoRequest}cacheBuster=${new Date().getTime()}`)
  };
};
export const getEntity: ICrudGetAction<IDescPta> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_DESCPTA,
    payload: axios.get<IDescPta>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IDescPta> = entity => async dispatch => {
  entity = {
    ...entity
  };
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_DESCPTA,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IDescPta> = entity => async dispatch => {
  entity = { ...entity };
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_DESCPTA,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IDescPta> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_DESCPTA,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
