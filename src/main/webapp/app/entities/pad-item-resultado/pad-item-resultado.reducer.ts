/* eslint complexity: ["error", 100] */
import axios from 'axios';
import { ICrudGetAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { IPayload } from 'react-jhipster/src/type/redux-action.type';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IPadItemResultado, defaultValue } from 'app/shared/model/pad-item-resultado.model';

export const ACTION_TYPES = {
  FETCH_PADITEMRESULTADO_LIST: 'padItemResultado/FETCH_PADITEMRESULTADO_LIST',
  FETCH_PADITEMRESULTADO: 'padItemResultado/FETCH_PADITEMRESULTADO',
  CREATE_PADITEMRESULTADO: 'padItemResultado/CREATE_PADITEMRESULTADO',
  UPDATE_PADITEMRESULTADO: 'padItemResultado/UPDATE_PADITEMRESULTADO',
  DELETE_PADITEMRESULTADO: 'padItemResultado/DELETE_PADITEMRESULTADO',
  RESET: 'padItemResultado/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IPadItemResultado>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type PadItemResultadoState = Readonly<typeof initialState>;

// Reducer

export default (state: PadItemResultadoState = initialState, action): PadItemResultadoState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_PADITEMRESULTADO_LIST):
    case REQUEST(ACTION_TYPES.FETCH_PADITEMRESULTADO):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_PADITEMRESULTADO):
    case REQUEST(ACTION_TYPES.UPDATE_PADITEMRESULTADO):
    case REQUEST(ACTION_TYPES.DELETE_PADITEMRESULTADO):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_PADITEMRESULTADO_LIST):
    case FAILURE(ACTION_TYPES.FETCH_PADITEMRESULTADO):
    case FAILURE(ACTION_TYPES.CREATE_PADITEMRESULTADO):
    case FAILURE(ACTION_TYPES.UPDATE_PADITEMRESULTADO):
    case FAILURE(ACTION_TYPES.DELETE_PADITEMRESULTADO):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_PADITEMRESULTADO_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10)
      };
    case SUCCESS(ACTION_TYPES.FETCH_PADITEMRESULTADO):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_PADITEMRESULTADO):
    case SUCCESS(ACTION_TYPES.UPDATE_PADITEMRESULTADO):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_PADITEMRESULTADO):
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

const apiUrl = 'api/pad-item-resultados';

// Actions

// Actions
export type ICrudGetAllActionPadItemResultado<T> = (
  resultado?: any,
  dataPost?: any,
  dataFim?: any,
  resultadoAnalisado?: any,
  usuarioId?: any,
  idPadItem?: any,
  page?: number,
  size?: number,
  sort?: string
) => IPayload<T> | ((dispatch: any) => IPayload<T>);

export const getEntities: ICrudGetAllActionPadItemResultado<IPadItemResultado> = (
  resultado,
  dataPost,
  dataFim,
  resultadoAnalisado,
  usuarioId,
  idPadItem,
  page,
  size,
  sort
) => {
  const resultadoRequest = resultado ? `resultado.contains=${resultado}&` : '';
  const dataPostRequest = dataPost ? `dataPost.contains=${dataPost}&` : '';
  const dataFimRequest = dataFim ? `dataFim.equals=${dataFim}&` : '';
  const resultadoAnalisadoRequest = resultadoAnalisado ? `resultadoAnalisado.contains=${resultadoAnalisado}&` : '';
  const usuarioIdRequest = usuarioId ? `usuarioId.contains=${usuarioId}&` : '';
  const idPadItemRequest = idPadItem ? `idPadItem.equals=${idPadItem}&` : '';

  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}&` : '?'}`;
  return {
    type: ACTION_TYPES.FETCH_PADITEMRESULTADO_LIST,
    payload: axios.get<IPadItemResultado>(
      `${requestUrl}${resultadoRequest}${dataPostRequest}${dataFimRequest}${resultadoAnalisadoRequest}${usuarioIdRequest}${idPadItemRequest}cacheBuster=${new Date().getTime()}`
    )
  };
};
export const getEntity: ICrudGetAction<IPadItemResultado> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_PADITEMRESULTADO,
    payload: axios.get<IPadItemResultado>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IPadItemResultado> = entity => async dispatch => {
  entity = {
    ...entity,
    idPadItem: entity.idPadItem === 'null' ? null : entity.idPadItem
  };
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_PADITEMRESULTADO,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IPadItemResultado> = entity => async dispatch => {
  entity = { ...entity, idPadItem: entity.idPadItem === 'null' ? null : entity.idPadItem };
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_PADITEMRESULTADO,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IPadItemResultado> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_PADITEMRESULTADO,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
