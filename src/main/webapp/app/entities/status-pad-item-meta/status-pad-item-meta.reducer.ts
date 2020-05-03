/* eslint complexity: ["error", 100] */
import axios from 'axios';
import { ICrudGetAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { IPayload } from 'react-jhipster/src/type/redux-action.type';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IStatusPadItemMeta, defaultValue } from 'app/shared/model/status-pad-item-meta.model';

export const ACTION_TYPES = {
  FETCH_STATUSPADITEMMETA_LIST: 'statusPadItemMeta/FETCH_STATUSPADITEMMETA_LIST',
  FETCH_STATUSPADITEMMETA: 'statusPadItemMeta/FETCH_STATUSPADITEMMETA',
  CREATE_STATUSPADITEMMETA: 'statusPadItemMeta/CREATE_STATUSPADITEMMETA',
  UPDATE_STATUSPADITEMMETA: 'statusPadItemMeta/UPDATE_STATUSPADITEMMETA',
  DELETE_STATUSPADITEMMETA: 'statusPadItemMeta/DELETE_STATUSPADITEMMETA',
  RESET: 'statusPadItemMeta/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IStatusPadItemMeta>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type StatusPadItemMetaState = Readonly<typeof initialState>;

// Reducer

export default (state: StatusPadItemMetaState = initialState, action): StatusPadItemMetaState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_STATUSPADITEMMETA_LIST):
    case REQUEST(ACTION_TYPES.FETCH_STATUSPADITEMMETA):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_STATUSPADITEMMETA):
    case REQUEST(ACTION_TYPES.UPDATE_STATUSPADITEMMETA):
    case REQUEST(ACTION_TYPES.DELETE_STATUSPADITEMMETA):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_STATUSPADITEMMETA_LIST):
    case FAILURE(ACTION_TYPES.FETCH_STATUSPADITEMMETA):
    case FAILURE(ACTION_TYPES.CREATE_STATUSPADITEMMETA):
    case FAILURE(ACTION_TYPES.UPDATE_STATUSPADITEMMETA):
    case FAILURE(ACTION_TYPES.DELETE_STATUSPADITEMMETA):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_STATUSPADITEMMETA_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10)
      };
    case SUCCESS(ACTION_TYPES.FETCH_STATUSPADITEMMETA):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_STATUSPADITEMMETA):
    case SUCCESS(ACTION_TYPES.UPDATE_STATUSPADITEMMETA):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_STATUSPADITEMMETA):
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

const apiUrl = 'api/status-pad-item-metas';

// Actions

// Actions
export type ICrudGetAllActionStatusPadItemMeta<T> = (
  statusItemMeta?: any,
  styleLabel?: any,
  ordenacao?: any,
  ativo?: any,
  dataPost?: any,
  page?: number,
  size?: number,
  sort?: string
) => IPayload<T> | ((dispatch: any) => IPayload<T>);

export const getEntities: ICrudGetAllActionStatusPadItemMeta<IStatusPadItemMeta> = (
  statusItemMeta,
  styleLabel,
  ordenacao,
  ativo,
  dataPost,
  page,
  size,
  sort
) => {
  const statusItemMetaRequest = statusItemMeta ? `statusItemMeta.contains=${statusItemMeta}&` : '';
  const styleLabelRequest = styleLabel ? `styleLabel.contains=${styleLabel}&` : '';
  const ordenacaoRequest = ordenacao ? `ordenacao.contains=${ordenacao}&` : '';
  const ativoRequest = ativo ? `ativo.contains=${ativo}&` : '';
  const dataPostRequest = dataPost ? `dataPost.contains=${dataPost}&` : '';

  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}&` : '?'}`;
  return {
    type: ACTION_TYPES.FETCH_STATUSPADITEMMETA_LIST,
    payload: axios.get<IStatusPadItemMeta>(
      `${requestUrl}${statusItemMetaRequest}${styleLabelRequest}${ordenacaoRequest}${ativoRequest}${dataPostRequest}cacheBuster=${new Date().getTime()}`
    )
  };
};
export const getEntity: ICrudGetAction<IStatusPadItemMeta> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_STATUSPADITEMMETA,
    payload: axios.get<IStatusPadItemMeta>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IStatusPadItemMeta> = entity => async dispatch => {
  entity = {
    ...entity
  };
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_STATUSPADITEMMETA,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IStatusPadItemMeta> = entity => async dispatch => {
  entity = { ...entity };
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_STATUSPADITEMMETA,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IStatusPadItemMeta> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_STATUSPADITEMMETA,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
