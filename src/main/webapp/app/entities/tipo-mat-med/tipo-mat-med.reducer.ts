/* eslint complexity: ["error", 100] */
import axios from 'axios';
import { ICrudGetAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { IPayload } from 'react-jhipster/src/type/redux-action.type';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { ITipoMatMed, defaultValue } from 'app/shared/model/tipo-mat-med.model';

export const ACTION_TYPES = {
  FETCH_TIPOMATMED_LIST_EXPORT: 'tipoMatMed/FETCH_TIPOMATMED_LIST_EXPORT',
  FETCH_TIPOMATMED_LIST: 'tipoMatMed/FETCH_TIPOMATMED_LIST',
  FETCH_TIPOMATMED: 'tipoMatMed/FETCH_TIPOMATMED',
  CREATE_TIPOMATMED: 'tipoMatMed/CREATE_TIPOMATMED',
  UPDATE_TIPOMATMED: 'tipoMatMed/UPDATE_TIPOMATMED',
  DELETE_TIPOMATMED: 'tipoMatMed/DELETE_TIPOMATMED',
  RESET: 'tipoMatMed/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<ITipoMatMed>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type TipoMatMedState = Readonly<typeof initialState>;

export interface ITipoMatMedBaseState {
  baseFilters: any;
  tipo: any;
  ativo: any;
}

export interface ITipoMatMedUpdateState {
  fieldsBase: ITipoMatMedBaseState;

  isNew: boolean;
}

// Reducer

export default (state: TipoMatMedState = initialState, action): TipoMatMedState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_TIPOMATMED_LIST_EXPORT):
    case REQUEST(ACTION_TYPES.FETCH_TIPOMATMED_LIST):
    case REQUEST(ACTION_TYPES.FETCH_TIPOMATMED):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_TIPOMATMED):
    case REQUEST(ACTION_TYPES.UPDATE_TIPOMATMED):
    case REQUEST(ACTION_TYPES.DELETE_TIPOMATMED):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_TIPOMATMED_LIST_EXPORT):
    case FAILURE(ACTION_TYPES.FETCH_TIPOMATMED_LIST):
    case FAILURE(ACTION_TYPES.FETCH_TIPOMATMED):
    case FAILURE(ACTION_TYPES.CREATE_TIPOMATMED):
    case FAILURE(ACTION_TYPES.UPDATE_TIPOMATMED):
    case FAILURE(ACTION_TYPES.DELETE_TIPOMATMED):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_TIPOMATMED_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10)
      };
    case SUCCESS(ACTION_TYPES.FETCH_TIPOMATMED):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_TIPOMATMED):
    case SUCCESS(ACTION_TYPES.UPDATE_TIPOMATMED):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_TIPOMATMED):
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

const apiUrl = 'api/tipo-mat-meds';

// Actions

// Actions
export type ICrudGetAllActionTipoMatMed<T> = (
  tipo?: any,
  ativo?: any,
  page?: number,
  size?: number,
  sort?: string
) => IPayload<T> | ((dispatch: any) => IPayload<T>);

export const getEntities: ICrudGetAllActionTipoMatMed<ITipoMatMed> = (tipo, ativo, page, size, sort) => {
  const tipoRequest = tipo ? `tipo.contains=${tipo}&` : '';
  const ativoRequest = ativo ? `ativo.contains=${ativo}&` : '';

  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}&` : '?'}`;
  return {
    type: ACTION_TYPES.FETCH_TIPOMATMED_LIST,
    payload: axios.get<ITipoMatMed>(`${requestUrl}${tipoRequest}${ativoRequest}cacheBuster=${new Date().getTime()}`)
  };
};
export const getEntity: ICrudGetAction<ITipoMatMed> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_TIPOMATMED,
    payload: axios.get<ITipoMatMed>(requestUrl)
  };
};

export const getEntitiesExport: ICrudGetAllActionTipoMatMed<ITipoMatMed> = (tipo, ativo, page, size, sort) => {
  const tipoRequest = tipo ? `tipo.contains=${tipo}&` : '';
  const ativoRequest = ativo ? `ativo.contains=${ativo}&` : '';

  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}&` : '?'}`;
  return {
    type: ACTION_TYPES.FETCH_TIPOMATMED_LIST,
    payload: axios.get<ITipoMatMed>(`${requestUrl}${tipoRequest}${ativoRequest}cacheBuster=${new Date().getTime()}`)
  };
};

export const createEntity: ICrudPutAction<ITipoMatMed> = entity => async dispatch => {
  entity = {
    ...entity
  };
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_TIPOMATMED,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<ITipoMatMed> = entity => async dispatch => {
  entity = { ...entity };
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_TIPOMATMED,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<ITipoMatMed> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_TIPOMATMED,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});

export const getTipoMatMedState = (location): ITipoMatMedBaseState => {
  const url = new URL(`http://localhost${location.search}`); // using a dummy url for parsing
  const baseFilters = url.searchParams.get('baseFilters') || '';
  const tipo = url.searchParams.get('tipo') || '';
  const ativo = url.searchParams.get('ativo') || '';

  return {
    baseFilters,
    tipo,
    ativo
  };
};
