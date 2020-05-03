/* eslint complexity: ["error", 100] */
import axios from 'axios';
import { ICrudGetAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { IPayload } from 'react-jhipster/src/type/redux-action.type';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IPadPtaTemp, defaultValue } from 'app/shared/model/pad-pta-temp.model';

export const ACTION_TYPES = {
  FETCH_PADPTATEMP_LIST: 'padPtaTemp/FETCH_PADPTATEMP_LIST',
  FETCH_PADPTATEMP: 'padPtaTemp/FETCH_PADPTATEMP',
  CREATE_PADPTATEMP: 'padPtaTemp/CREATE_PADPTATEMP',
  UPDATE_PADPTATEMP: 'padPtaTemp/UPDATE_PADPTATEMP',
  DELETE_PADPTATEMP: 'padPtaTemp/DELETE_PADPTATEMP',
  RESET: 'padPtaTemp/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IPadPtaTemp>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type PadPtaTempState = Readonly<typeof initialState>;

// Reducer

export default (state: PadPtaTempState = initialState, action): PadPtaTempState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_PADPTATEMP_LIST):
    case REQUEST(ACTION_TYPES.FETCH_PADPTATEMP):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_PADPTATEMP):
    case REQUEST(ACTION_TYPES.UPDATE_PADPTATEMP):
    case REQUEST(ACTION_TYPES.DELETE_PADPTATEMP):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_PADPTATEMP_LIST):
    case FAILURE(ACTION_TYPES.FETCH_PADPTATEMP):
    case FAILURE(ACTION_TYPES.CREATE_PADPTATEMP):
    case FAILURE(ACTION_TYPES.UPDATE_PADPTATEMP):
    case FAILURE(ACTION_TYPES.DELETE_PADPTATEMP):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_PADPTATEMP_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10)
      };
    case SUCCESS(ACTION_TYPES.FETCH_PADPTATEMP):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_PADPTATEMP):
    case SUCCESS(ACTION_TYPES.UPDATE_PADPTATEMP):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_PADPTATEMP):
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

const apiUrl = 'api/pad-pta-temps';

// Actions

// Actions
export type ICrudGetAllActionPadPtaTemp<T> = (
  sessionId?: any,
  idPta?: any,
  idCid?: any,
  idUsuario?: any,
  dataPost?: any,
  cidXPtaNovoId?: any,
  page?: number,
  size?: number,
  sort?: string
) => IPayload<T> | ((dispatch: any) => IPayload<T>);

export const getEntities: ICrudGetAllActionPadPtaTemp<IPadPtaTemp> = (
  sessionId,
  idPta,
  idCid,
  idUsuario,
  dataPost,
  cidXPtaNovoId,
  page,
  size,
  sort
) => {
  const sessionIdRequest = sessionId ? `sessionId.contains=${sessionId}&` : '';
  const idPtaRequest = idPta ? `idPta.contains=${idPta}&` : '';
  const idCidRequest = idCid ? `idCid.contains=${idCid}&` : '';
  const idUsuarioRequest = idUsuario ? `idUsuario.contains=${idUsuario}&` : '';
  const dataPostRequest = dataPost ? `dataPost.contains=${dataPost}&` : '';
  const cidXPtaNovoIdRequest = cidXPtaNovoId ? `cidXPtaNovoId.contains=${cidXPtaNovoId}&` : '';

  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}&` : '?'}`;
  return {
    type: ACTION_TYPES.FETCH_PADPTATEMP_LIST,
    payload: axios.get<IPadPtaTemp>(
      `${requestUrl}${sessionIdRequest}${idPtaRequest}${idCidRequest}${idUsuarioRequest}${dataPostRequest}${cidXPtaNovoIdRequest}cacheBuster=${new Date().getTime()}`
    )
  };
};
export const getEntity: ICrudGetAction<IPadPtaTemp> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_PADPTATEMP,
    payload: axios.get<IPadPtaTemp>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IPadPtaTemp> = entity => async dispatch => {
  entity = {
    ...entity
  };
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_PADPTATEMP,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IPadPtaTemp> = entity => async dispatch => {
  entity = { ...entity };
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_PADPTATEMP,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IPadPtaTemp> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_PADPTATEMP,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
