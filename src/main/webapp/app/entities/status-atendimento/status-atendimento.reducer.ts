/* eslint complexity: ["error", 100] */
import axios from 'axios';
import { ICrudGetAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { IPayload } from 'react-jhipster/src/type/redux-action.type';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IStatusAtendimento, defaultValue } from 'app/shared/model/status-atendimento.model';

export const ACTION_TYPES = {
  FETCH_STATUSATENDIMENTO_LIST: 'statusAtendimento/FETCH_STATUSATENDIMENTO_LIST',
  FETCH_STATUSATENDIMENTO: 'statusAtendimento/FETCH_STATUSATENDIMENTO',
  CREATE_STATUSATENDIMENTO: 'statusAtendimento/CREATE_STATUSATENDIMENTO',
  UPDATE_STATUSATENDIMENTO: 'statusAtendimento/UPDATE_STATUSATENDIMENTO',
  DELETE_STATUSATENDIMENTO: 'statusAtendimento/DELETE_STATUSATENDIMENTO',
  RESET: 'statusAtendimento/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IStatusAtendimento>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type StatusAtendimentoState = Readonly<typeof initialState>;

// Reducer

export default (state: StatusAtendimentoState = initialState, action): StatusAtendimentoState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_STATUSATENDIMENTO_LIST):
    case REQUEST(ACTION_TYPES.FETCH_STATUSATENDIMENTO):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_STATUSATENDIMENTO):
    case REQUEST(ACTION_TYPES.UPDATE_STATUSATENDIMENTO):
    case REQUEST(ACTION_TYPES.DELETE_STATUSATENDIMENTO):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_STATUSATENDIMENTO_LIST):
    case FAILURE(ACTION_TYPES.FETCH_STATUSATENDIMENTO):
    case FAILURE(ACTION_TYPES.CREATE_STATUSATENDIMENTO):
    case FAILURE(ACTION_TYPES.UPDATE_STATUSATENDIMENTO):
    case FAILURE(ACTION_TYPES.DELETE_STATUSATENDIMENTO):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_STATUSATENDIMENTO_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10)
      };
    case SUCCESS(ACTION_TYPES.FETCH_STATUSATENDIMENTO):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_STATUSATENDIMENTO):
    case SUCCESS(ACTION_TYPES.UPDATE_STATUSATENDIMENTO):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_STATUSATENDIMENTO):
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

const apiUrl = 'api/status-atendimentos';

// Actions

// Actions
export type ICrudGetAllActionStatusAtendimento<T> = (
  statusAtendimento?: any,
  styleLabel?: any,
  ordenacao?: any,
  ativo?: any,
  dataPost?: any,
  atendimento?: any,
  page?: number,
  size?: number,
  sort?: string
) => IPayload<T> | ((dispatch: any) => IPayload<T>);

export const getEntities: ICrudGetAllActionStatusAtendimento<IStatusAtendimento> = (
  statusAtendimento,
  styleLabel,
  ordenacao,
  ativo,
  dataPost,
  atendimento,
  page,
  size,
  sort
) => {
  const statusAtendimentoRequest = statusAtendimento ? `statusAtendimento.contains=${statusAtendimento}&` : '';
  const styleLabelRequest = styleLabel ? `styleLabel.contains=${styleLabel}&` : '';
  const ordenacaoRequest = ordenacao ? `ordenacao.contains=${ordenacao}&` : '';
  const ativoRequest = ativo ? `ativo.contains=${ativo}&` : '';
  const dataPostRequest = dataPost ? `dataPost.contains=${dataPost}&` : '';
  const atendimentoRequest = atendimento ? `atendimento.equals=${atendimento}&` : '';

  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}&` : '?'}`;
  return {
    type: ACTION_TYPES.FETCH_STATUSATENDIMENTO_LIST,
    payload: axios.get<IStatusAtendimento>(
      `${requestUrl}${statusAtendimentoRequest}${styleLabelRequest}${ordenacaoRequest}${ativoRequest}${dataPostRequest}${atendimentoRequest}cacheBuster=${new Date().getTime()}`
    )
  };
};
export const getEntity: ICrudGetAction<IStatusAtendimento> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_STATUSATENDIMENTO,
    payload: axios.get<IStatusAtendimento>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IStatusAtendimento> = entity => async dispatch => {
  entity = {
    ...entity
  };
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_STATUSATENDIMENTO,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IStatusAtendimento> = entity => async dispatch => {
  entity = { ...entity };
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_STATUSATENDIMENTO,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IStatusAtendimento> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_STATUSATENDIMENTO,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
