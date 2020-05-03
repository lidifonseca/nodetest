/* eslint complexity: ["error", 100] */
import axios from 'axios';
import { ICrudGetAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { IPayload } from 'react-jhipster/src/type/redux-action.type';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IStatusAtualProf, defaultValue } from 'app/shared/model/status-atual-prof.model';

export const ACTION_TYPES = {
  FETCH_STATUSATUALPROF_LIST: 'statusAtualProf/FETCH_STATUSATUALPROF_LIST',
  FETCH_STATUSATUALPROF: 'statusAtualProf/FETCH_STATUSATUALPROF',
  CREATE_STATUSATUALPROF: 'statusAtualProf/CREATE_STATUSATUALPROF',
  UPDATE_STATUSATUALPROF: 'statusAtualProf/UPDATE_STATUSATUALPROF',
  DELETE_STATUSATUALPROF: 'statusAtualProf/DELETE_STATUSATUALPROF',
  RESET: 'statusAtualProf/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IStatusAtualProf>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type StatusAtualProfState = Readonly<typeof initialState>;

// Reducer

export default (state: StatusAtualProfState = initialState, action): StatusAtualProfState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_STATUSATUALPROF_LIST):
    case REQUEST(ACTION_TYPES.FETCH_STATUSATUALPROF):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_STATUSATUALPROF):
    case REQUEST(ACTION_TYPES.UPDATE_STATUSATUALPROF):
    case REQUEST(ACTION_TYPES.DELETE_STATUSATUALPROF):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_STATUSATUALPROF_LIST):
    case FAILURE(ACTION_TYPES.FETCH_STATUSATUALPROF):
    case FAILURE(ACTION_TYPES.CREATE_STATUSATUALPROF):
    case FAILURE(ACTION_TYPES.UPDATE_STATUSATUALPROF):
    case FAILURE(ACTION_TYPES.DELETE_STATUSATUALPROF):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_STATUSATUALPROF_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10)
      };
    case SUCCESS(ACTION_TYPES.FETCH_STATUSATUALPROF):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_STATUSATUALPROF):
    case SUCCESS(ACTION_TYPES.UPDATE_STATUSATUALPROF):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_STATUSATUALPROF):
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

const apiUrl = 'api/status-atual-profs';

// Actions

// Actions
export type ICrudGetAllActionStatusAtualProf<T> = (
  statusAtualProf?: any,
  styleLabel?: any,
  profissionalStatusAtual?: any,
  page?: number,
  size?: number,
  sort?: string
) => IPayload<T> | ((dispatch: any) => IPayload<T>);

export const getEntities: ICrudGetAllActionStatusAtualProf<IStatusAtualProf> = (
  statusAtualProf,
  styleLabel,
  profissionalStatusAtual,
  page,
  size,
  sort
) => {
  const statusAtualProfRequest = statusAtualProf ? `statusAtualProf.contains=${statusAtualProf}&` : '';
  const styleLabelRequest = styleLabel ? `styleLabel.contains=${styleLabel}&` : '';
  const profissionalStatusAtualRequest = profissionalStatusAtual ? `profissionalStatusAtual.equals=${profissionalStatusAtual}&` : '';

  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}&` : '?'}`;
  return {
    type: ACTION_TYPES.FETCH_STATUSATUALPROF_LIST,
    payload: axios.get<IStatusAtualProf>(
      `${requestUrl}${statusAtualProfRequest}${styleLabelRequest}${profissionalStatusAtualRequest}cacheBuster=${new Date().getTime()}`
    )
  };
};
export const getEntity: ICrudGetAction<IStatusAtualProf> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_STATUSATUALPROF,
    payload: axios.get<IStatusAtualProf>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IStatusAtualProf> = entity => async dispatch => {
  entity = {
    ...entity
  };
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_STATUSATUALPROF,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IStatusAtualProf> = entity => async dispatch => {
  entity = { ...entity };
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_STATUSATUALPROF,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IStatusAtualProf> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_STATUSATUALPROF,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
