/* eslint complexity: ["error", 100] */
import axios from 'axios';
import { ICrudGetAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { IPayload } from 'react-jhipster/src/type/redux-action.type';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IProfissionalStatusAtualNew, defaultValue } from 'app/shared/model/profissional-status-atual-new.model';

export const ACTION_TYPES = {
  FETCH_PROFISSIONALSTATUSATUALNEW_LIST_EXPORT: 'profissionalStatusAtualNew/FETCH_PROFISSIONALSTATUSATUALNEW_LIST_EXPORT',
  FETCH_PROFISSIONALSTATUSATUALNEW_LIST: 'profissionalStatusAtualNew/FETCH_PROFISSIONALSTATUSATUALNEW_LIST',
  FETCH_PROFISSIONALSTATUSATUALNEW: 'profissionalStatusAtualNew/FETCH_PROFISSIONALSTATUSATUALNEW',
  CREATE_PROFISSIONALSTATUSATUALNEW: 'profissionalStatusAtualNew/CREATE_PROFISSIONALSTATUSATUALNEW',
  UPDATE_PROFISSIONALSTATUSATUALNEW: 'profissionalStatusAtualNew/UPDATE_PROFISSIONALSTATUSATUALNEW',
  DELETE_PROFISSIONALSTATUSATUALNEW: 'profissionalStatusAtualNew/DELETE_PROFISSIONALSTATUSATUALNEW',
  SET_BLOB: 'profissionalStatusAtualNew/SET_BLOB',
  RESET: 'profissionalStatusAtualNew/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IProfissionalStatusAtualNew>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type ProfissionalStatusAtualNewState = Readonly<typeof initialState>;

export interface IProfissionalStatusAtualNewBaseState {
  baseFilters: any;
  idProfissional: any;
  idStatusAtualProf: any;
  obs: any;
  ativo: any;
}

export interface IProfissionalStatusAtualNewUpdateState {
  fieldsBase: IProfissionalStatusAtualNewBaseState;
  isNew: boolean;
}

// Reducer

export default (state: ProfissionalStatusAtualNewState = initialState, action): ProfissionalStatusAtualNewState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_PROFISSIONALSTATUSATUALNEW_LIST_EXPORT):
    case REQUEST(ACTION_TYPES.FETCH_PROFISSIONALSTATUSATUALNEW_LIST):
    case REQUEST(ACTION_TYPES.FETCH_PROFISSIONALSTATUSATUALNEW):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_PROFISSIONALSTATUSATUALNEW):
    case REQUEST(ACTION_TYPES.UPDATE_PROFISSIONALSTATUSATUALNEW):
    case REQUEST(ACTION_TYPES.DELETE_PROFISSIONALSTATUSATUALNEW):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_PROFISSIONALSTATUSATUALNEW_LIST_EXPORT):
    case FAILURE(ACTION_TYPES.FETCH_PROFISSIONALSTATUSATUALNEW_LIST):
    case FAILURE(ACTION_TYPES.FETCH_PROFISSIONALSTATUSATUALNEW):
    case FAILURE(ACTION_TYPES.CREATE_PROFISSIONALSTATUSATUALNEW):
    case FAILURE(ACTION_TYPES.UPDATE_PROFISSIONALSTATUSATUALNEW):
    case FAILURE(ACTION_TYPES.DELETE_PROFISSIONALSTATUSATUALNEW):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_PROFISSIONALSTATUSATUALNEW_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10)
      };
    case SUCCESS(ACTION_TYPES.FETCH_PROFISSIONALSTATUSATUALNEW):
      action.payload.data.obs = action.payload.data.obs ? Buffer.from(action.payload.data.obs).toString() : action.payload.data.obs;
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_PROFISSIONALSTATUSATUALNEW):
    case SUCCESS(ACTION_TYPES.UPDATE_PROFISSIONALSTATUSATUALNEW):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_PROFISSIONALSTATUSATUALNEW):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {}
      };
    case ACTION_TYPES.SET_BLOB: {
      const { name, data, contentType, fileName } = action.payload;
      return {
        ...state,
        entity: {
          ...state.entity,
          [name + 'Base64']: data,
          [name + 'ContentType']: contentType,
          [name + 'FileName']: fileName
        }
      };
    }
    case ACTION_TYPES.RESET:
      return {
        ...initialState
      };
    default:
      return state;
  }
};

const apiUrl = 'api/profissional-status-atual-news';

// Actions

// Actions
export type ICrudGetAllActionProfissionalStatusAtualNew<T> = (
  idProfissional?: any,
  idStatusAtualProf?: any,
  obs?: any,
  ativo?: any,
  page?: number,
  size?: number,
  sort?: string
) => IPayload<T> | ((dispatch: any) => IPayload<T>);

export const getEntities: ICrudGetAllActionProfissionalStatusAtualNew<IProfissionalStatusAtualNew> = (
  idProfissional,
  idStatusAtualProf,
  obs,
  ativo,
  page,
  size,
  sort
) => {
  const idProfissionalRequest = idProfissional ? `idProfissional.contains=${idProfissional}&` : '';
  const idStatusAtualProfRequest = idStatusAtualProf ? `idStatusAtualProf.contains=${idStatusAtualProf}&` : '';
  const obsRequest = obs ? `obs.contains=${obs}&` : '';
  const ativoRequest = ativo ? `ativo.contains=${ativo}&` : '';

  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}&` : '?'}`;
  return {
    type: ACTION_TYPES.FETCH_PROFISSIONALSTATUSATUALNEW_LIST,
    payload: axios.get<IProfissionalStatusAtualNew>(
      `${requestUrl}${idProfissionalRequest}${idStatusAtualProfRequest}${obsRequest}${ativoRequest}cacheBuster=${new Date().getTime()}`
    )
  };
};
export const getEntity: ICrudGetAction<IProfissionalStatusAtualNew> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_PROFISSIONALSTATUSATUALNEW,
    payload: axios.get<IProfissionalStatusAtualNew>(requestUrl)
  };
};

export const getEntitiesExport: ICrudGetAllActionProfissionalStatusAtualNew<IProfissionalStatusAtualNew> = (
  idProfissional,
  idStatusAtualProf,
  obs,
  ativo,
  page,
  size,
  sort
) => {
  const idProfissionalRequest = idProfissional ? `idProfissional.contains=${idProfissional}&` : '';
  const idStatusAtualProfRequest = idStatusAtualProf ? `idStatusAtualProf.contains=${idStatusAtualProf}&` : '';
  const obsRequest = obs ? `obs.contains=${obs}&` : '';
  const ativoRequest = ativo ? `ativo.contains=${ativo}&` : '';

  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}&` : '?'}`;
  return {
    type: ACTION_TYPES.FETCH_PROFISSIONALSTATUSATUALNEW_LIST,
    payload: axios.get<IProfissionalStatusAtualNew>(
      `${requestUrl}${idProfissionalRequest}${idStatusAtualProfRequest}${obsRequest}${ativoRequest}cacheBuster=${new Date().getTime()}`
    )
  };
};

export const createEntity: ICrudPutAction<IProfissionalStatusAtualNew> = entity => async dispatch => {
  entity = {
    ...entity
  };
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_PROFISSIONALSTATUSATUALNEW,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IProfissionalStatusAtualNew> = entity => async dispatch => {
  entity = { ...entity };
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_PROFISSIONALSTATUSATUALNEW,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IProfissionalStatusAtualNew> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_PROFISSIONALSTATUSATUALNEW,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const setBlob = (name, data, contentType?, fileName?) => ({
  type: ACTION_TYPES.SET_BLOB,
  payload: {
    name,
    data,
    contentType,
    fileName
  }
});

export const reset = () => ({
  type: ACTION_TYPES.RESET
});

export const getProfissionalStatusAtualNewState = (location): IProfissionalStatusAtualNewBaseState => {
  const url = new URL(`http://localhost${location.search}`); // using a dummy url for parsing
  const baseFilters = url.searchParams.get('baseFilters') || '';
  const idProfissional = url.searchParams.get('idProfissional') || '';
  const idStatusAtualProf = url.searchParams.get('idStatusAtualProf') || '';
  const obs = url.searchParams.get('obs') || '';
  const ativo = url.searchParams.get('ativo') || '';

  return {
    baseFilters,
    idProfissional,
    idStatusAtualProf,
    obs,
    ativo
  };
};
