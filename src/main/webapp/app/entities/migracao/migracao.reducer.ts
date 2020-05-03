/* eslint complexity: ["error", 100] */
import axios from 'axios';
import { ICrudGetAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { IPayload } from 'react-jhipster/src/type/redux-action.type';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IMigracao, defaultValue } from 'app/shared/model/migracao.model';

export const ACTION_TYPES = {
  FETCH_MIGRACAO_LIST: 'migracao/FETCH_MIGRACAO_LIST',
  FETCH_MIGRACAO: 'migracao/FETCH_MIGRACAO',
  CREATE_MIGRACAO: 'migracao/CREATE_MIGRACAO',
  UPDATE_MIGRACAO: 'migracao/UPDATE_MIGRACAO',
  DELETE_MIGRACAO: 'migracao/DELETE_MIGRACAO',
  RESET: 'migracao/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IMigracao>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type MigracaoState = Readonly<typeof initialState>;

// Reducer

export default (state: MigracaoState = initialState, action): MigracaoState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_MIGRACAO_LIST):
    case REQUEST(ACTION_TYPES.FETCH_MIGRACAO):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_MIGRACAO):
    case REQUEST(ACTION_TYPES.UPDATE_MIGRACAO):
    case REQUEST(ACTION_TYPES.DELETE_MIGRACAO):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_MIGRACAO_LIST):
    case FAILURE(ACTION_TYPES.FETCH_MIGRACAO):
    case FAILURE(ACTION_TYPES.CREATE_MIGRACAO):
    case FAILURE(ACTION_TYPES.UPDATE_MIGRACAO):
    case FAILURE(ACTION_TYPES.DELETE_MIGRACAO):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_MIGRACAO_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10)
      };
    case SUCCESS(ACTION_TYPES.FETCH_MIGRACAO):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_MIGRACAO):
    case SUCCESS(ACTION_TYPES.UPDATE_MIGRACAO):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_MIGRACAO):
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

const apiUrl = 'api/migracaos';

// Actions

// Actions
export type ICrudGetAllActionMigracao<T> = (
  idPad?: any,
  dataHoraMigracao?: any,
  page?: number,
  size?: number,
  sort?: string
) => IPayload<T> | ((dispatch: any) => IPayload<T>);

export const getEntities: ICrudGetAllActionMigracao<IMigracao> = (idPad, dataHoraMigracao, page, size, sort) => {
  const idPadRequest = idPad ? `idPad.contains=${idPad}&` : '';
  const dataHoraMigracaoRequest = dataHoraMigracao ? `dataHoraMigracao.contains=${dataHoraMigracao}&` : '';

  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}&` : '?'}`;
  return {
    type: ACTION_TYPES.FETCH_MIGRACAO_LIST,
    payload: axios.get<IMigracao>(`${requestUrl}${idPadRequest}${dataHoraMigracaoRequest}cacheBuster=${new Date().getTime()}`)
  };
};
export const getEntity: ICrudGetAction<IMigracao> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_MIGRACAO,
    payload: axios.get<IMigracao>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IMigracao> = entity => async dispatch => {
  entity = {
    ...entity
  };
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_MIGRACAO,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IMigracao> = entity => async dispatch => {
  entity = { ...entity };
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_MIGRACAO,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IMigracao> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_MIGRACAO,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
