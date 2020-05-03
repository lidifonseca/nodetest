/* eslint complexity: ["error", 100] */
import axios from 'axios';
import { ICrudGetAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { IPayload } from 'react-jhipster/src/type/redux-action.type';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IPadMatMed, defaultValue } from 'app/shared/model/pad-mat-med.model';

export const ACTION_TYPES = {
  FETCH_PADMATMED_LIST: 'padMatMed/FETCH_PADMATMED_LIST',
  FETCH_PADMATMED: 'padMatMed/FETCH_PADMATMED',
  CREATE_PADMATMED: 'padMatMed/CREATE_PADMATMED',
  UPDATE_PADMATMED: 'padMatMed/UPDATE_PADMATMED',
  DELETE_PADMATMED: 'padMatMed/DELETE_PADMATMED',
  RESET: 'padMatMed/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IPadMatMed>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type PadMatMedState = Readonly<typeof initialState>;

// Reducer

export default (state: PadMatMedState = initialState, action): PadMatMedState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_PADMATMED_LIST):
    case REQUEST(ACTION_TYPES.FETCH_PADMATMED):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_PADMATMED):
    case REQUEST(ACTION_TYPES.UPDATE_PADMATMED):
    case REQUEST(ACTION_TYPES.DELETE_PADMATMED):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_PADMATMED_LIST):
    case FAILURE(ACTION_TYPES.FETCH_PADMATMED):
    case FAILURE(ACTION_TYPES.CREATE_PADMATMED):
    case FAILURE(ACTION_TYPES.UPDATE_PADMATMED):
    case FAILURE(ACTION_TYPES.DELETE_PADMATMED):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_PADMATMED_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10)
      };
    case SUCCESS(ACTION_TYPES.FETCH_PADMATMED):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_PADMATMED):
    case SUCCESS(ACTION_TYPES.UPDATE_PADMATMED):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_PADMATMED):
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

const apiUrl = 'api/pad-mat-meds';

// Actions

// Actions
export type ICrudGetAllActionPadMatMed<T> = (
  idPad?: any,
  idMatMed?: any,
  qtd?: any,
  idUsuario?: any,
  ativo?: any,
  page?: number,
  size?: number,
  sort?: string
) => IPayload<T> | ((dispatch: any) => IPayload<T>);

export const getEntities: ICrudGetAllActionPadMatMed<IPadMatMed> = (idPad, idMatMed, qtd, idUsuario, ativo, page, size, sort) => {
  const idPadRequest = idPad ? `idPad.contains=${idPad}&` : '';
  const idMatMedRequest = idMatMed ? `idMatMed.contains=${idMatMed}&` : '';
  const qtdRequest = qtd ? `qtd.contains=${qtd}&` : '';
  const idUsuarioRequest = idUsuario ? `idUsuario.contains=${idUsuario}&` : '';
  const ativoRequest = ativo ? `ativo.contains=${ativo}&` : '';

  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}&` : '?'}`;
  return {
    type: ACTION_TYPES.FETCH_PADMATMED_LIST,
    payload: axios.get<IPadMatMed>(
      `${requestUrl}${idPadRequest}${idMatMedRequest}${qtdRequest}${idUsuarioRequest}${ativoRequest}cacheBuster=${new Date().getTime()}`
    )
  };
};
export const getEntity: ICrudGetAction<IPadMatMed> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_PADMATMED,
    payload: axios.get<IPadMatMed>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IPadMatMed> = entity => async dispatch => {
  entity = {
    ...entity
  };
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_PADMATMED,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IPadMatMed> = entity => async dispatch => {
  entity = { ...entity };
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_PADMATMED,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IPadMatMed> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_PADMATMED,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
