/* eslint complexity: ["error", 100] */
import axios from 'axios';
import { ICrudGetAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { IPayload } from 'react-jhipster/src/type/redux-action.type';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { ITipoProntuario, defaultValue } from 'app/shared/model/tipo-prontuario.model';

export const ACTION_TYPES = {
  FETCH_TIPOPRONTUARIO_LIST: 'tipoProntuario/FETCH_TIPOPRONTUARIO_LIST',
  FETCH_TIPOPRONTUARIO: 'tipoProntuario/FETCH_TIPOPRONTUARIO',
  CREATE_TIPOPRONTUARIO: 'tipoProntuario/CREATE_TIPOPRONTUARIO',
  UPDATE_TIPOPRONTUARIO: 'tipoProntuario/UPDATE_TIPOPRONTUARIO',
  DELETE_TIPOPRONTUARIO: 'tipoProntuario/DELETE_TIPOPRONTUARIO',
  RESET: 'tipoProntuario/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<ITipoProntuario>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type TipoProntuarioState = Readonly<typeof initialState>;

// Reducer

export default (state: TipoProntuarioState = initialState, action): TipoProntuarioState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_TIPOPRONTUARIO_LIST):
    case REQUEST(ACTION_TYPES.FETCH_TIPOPRONTUARIO):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_TIPOPRONTUARIO):
    case REQUEST(ACTION_TYPES.UPDATE_TIPOPRONTUARIO):
    case REQUEST(ACTION_TYPES.DELETE_TIPOPRONTUARIO):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_TIPOPRONTUARIO_LIST):
    case FAILURE(ACTION_TYPES.FETCH_TIPOPRONTUARIO):
    case FAILURE(ACTION_TYPES.CREATE_TIPOPRONTUARIO):
    case FAILURE(ACTION_TYPES.UPDATE_TIPOPRONTUARIO):
    case FAILURE(ACTION_TYPES.DELETE_TIPOPRONTUARIO):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_TIPOPRONTUARIO_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10)
      };
    case SUCCESS(ACTION_TYPES.FETCH_TIPOPRONTUARIO):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_TIPOPRONTUARIO):
    case SUCCESS(ACTION_TYPES.UPDATE_TIPOPRONTUARIO):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_TIPOPRONTUARIO):
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

const apiUrl = 'api/tipo-prontuarios';

// Actions

// Actions
export type ICrudGetAllActionTipoProntuario<T> = (
  prontuario?: any,
  ativo?: any,
  page?: number,
  size?: number,
  sort?: string
) => IPayload<T> | ((dispatch: any) => IPayload<T>);

export const getEntities: ICrudGetAllActionTipoProntuario<ITipoProntuario> = (prontuario, ativo, page, size, sort) => {
  const prontuarioRequest = prontuario ? `prontuario.contains=${prontuario}&` : '';
  const ativoRequest = ativo ? `ativo.contains=${ativo}&` : '';

  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}&` : '?'}`;
  return {
    type: ACTION_TYPES.FETCH_TIPOPRONTUARIO_LIST,
    payload: axios.get<ITipoProntuario>(`${requestUrl}${prontuarioRequest}${ativoRequest}cacheBuster=${new Date().getTime()}`)
  };
};
export const getEntity: ICrudGetAction<ITipoProntuario> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_TIPOPRONTUARIO,
    payload: axios.get<ITipoProntuario>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<ITipoProntuario> = entity => async dispatch => {
  entity = {
    ...entity
  };
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_TIPOPRONTUARIO,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<ITipoProntuario> = entity => async dispatch => {
  entity = { ...entity };
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_TIPOPRONTUARIO,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<ITipoProntuario> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_TIPOPRONTUARIO,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
