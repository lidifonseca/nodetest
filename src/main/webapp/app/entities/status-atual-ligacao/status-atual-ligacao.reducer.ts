/* eslint complexity: ["error", 100] */
import axios from 'axios';
import { ICrudGetAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { IPayload } from 'react-jhipster/src/type/redux-action.type';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IStatusAtualLigacao, defaultValue } from 'app/shared/model/status-atual-ligacao.model';

export const ACTION_TYPES = {
  FETCH_STATUSATUALLIGACAO_LIST: 'statusAtualLigacao/FETCH_STATUSATUALLIGACAO_LIST',
  FETCH_STATUSATUALLIGACAO: 'statusAtualLigacao/FETCH_STATUSATUALLIGACAO',
  CREATE_STATUSATUALLIGACAO: 'statusAtualLigacao/CREATE_STATUSATUALLIGACAO',
  UPDATE_STATUSATUALLIGACAO: 'statusAtualLigacao/UPDATE_STATUSATUALLIGACAO',
  DELETE_STATUSATUALLIGACAO: 'statusAtualLigacao/DELETE_STATUSATUALLIGACAO',
  RESET: 'statusAtualLigacao/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IStatusAtualLigacao>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type StatusAtualLigacaoState = Readonly<typeof initialState>;

// Reducer

export default (state: StatusAtualLigacaoState = initialState, action): StatusAtualLigacaoState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_STATUSATUALLIGACAO_LIST):
    case REQUEST(ACTION_TYPES.FETCH_STATUSATUALLIGACAO):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_STATUSATUALLIGACAO):
    case REQUEST(ACTION_TYPES.UPDATE_STATUSATUALLIGACAO):
    case REQUEST(ACTION_TYPES.DELETE_STATUSATUALLIGACAO):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_STATUSATUALLIGACAO_LIST):
    case FAILURE(ACTION_TYPES.FETCH_STATUSATUALLIGACAO):
    case FAILURE(ACTION_TYPES.CREATE_STATUSATUALLIGACAO):
    case FAILURE(ACTION_TYPES.UPDATE_STATUSATUALLIGACAO):
    case FAILURE(ACTION_TYPES.DELETE_STATUSATUALLIGACAO):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_STATUSATUALLIGACAO_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10)
      };
    case SUCCESS(ACTION_TYPES.FETCH_STATUSATUALLIGACAO):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_STATUSATUALLIGACAO):
    case SUCCESS(ACTION_TYPES.UPDATE_STATUSATUALLIGACAO):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_STATUSATUALLIGACAO):
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

const apiUrl = 'api/status-atual-ligacaos';

// Actions

// Actions
export type ICrudGetAllActionStatusAtualLigacao<T> = (
  statusAtualLigacao?: any,
  styleLabel?: any,
  page?: number,
  size?: number,
  sort?: string
) => IPayload<T> | ((dispatch: any) => IPayload<T>);

export const getEntities: ICrudGetAllActionStatusAtualLigacao<IStatusAtualLigacao> = (statusAtualLigacao, styleLabel, page, size, sort) => {
  const statusAtualLigacaoRequest = statusAtualLigacao ? `statusAtualLigacao.contains=${statusAtualLigacao}&` : '';
  const styleLabelRequest = styleLabel ? `styleLabel.contains=${styleLabel}&` : '';

  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}&` : '?'}`;
  return {
    type: ACTION_TYPES.FETCH_STATUSATUALLIGACAO_LIST,
    payload: axios.get<IStatusAtualLigacao>(
      `${requestUrl}${statusAtualLigacaoRequest}${styleLabelRequest}cacheBuster=${new Date().getTime()}`
    )
  };
};
export const getEntity: ICrudGetAction<IStatusAtualLigacao> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_STATUSATUALLIGACAO,
    payload: axios.get<IStatusAtualLigacao>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IStatusAtualLigacao> = entity => async dispatch => {
  entity = {
    ...entity
  };
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_STATUSATUALLIGACAO,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IStatusAtualLigacao> = entity => async dispatch => {
  entity = { ...entity };
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_STATUSATUALLIGACAO,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IStatusAtualLigacao> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_STATUSATUALLIGACAO,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
