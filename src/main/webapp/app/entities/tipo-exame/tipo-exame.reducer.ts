/* eslint complexity: ["error", 100] */
import axios from 'axios';
import { ICrudGetAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { IPayload } from 'react-jhipster/src/type/redux-action.type';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { ITipoExame, defaultValue } from 'app/shared/model/tipo-exame.model';

export const ACTION_TYPES = {
  FETCH_TIPOEXAME_LIST_EXPORT: 'tipoExame/FETCH_TIPOEXAME_LIST_EXPORT',
  FETCH_TIPOEXAME_LIST: 'tipoExame/FETCH_TIPOEXAME_LIST',
  FETCH_TIPOEXAME: 'tipoExame/FETCH_TIPOEXAME',
  CREATE_TIPOEXAME: 'tipoExame/CREATE_TIPOEXAME',
  UPDATE_TIPOEXAME: 'tipoExame/UPDATE_TIPOEXAME',
  DELETE_TIPOEXAME: 'tipoExame/DELETE_TIPOEXAME',
  RESET: 'tipoExame/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<ITipoExame>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type TipoExameState = Readonly<typeof initialState>;

export interface ITipoExameBaseState {
  baseFilters: any;
  exame: any;
  idPai: any;
  ativo: any;
}

export interface ITipoExameUpdateState {
  fieldsBase: ITipoExameBaseState;

  isNew: boolean;
}

// Reducer

export default (state: TipoExameState = initialState, action): TipoExameState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_TIPOEXAME_LIST_EXPORT):
    case REQUEST(ACTION_TYPES.FETCH_TIPOEXAME_LIST):
    case REQUEST(ACTION_TYPES.FETCH_TIPOEXAME):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_TIPOEXAME):
    case REQUEST(ACTION_TYPES.UPDATE_TIPOEXAME):
    case REQUEST(ACTION_TYPES.DELETE_TIPOEXAME):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_TIPOEXAME_LIST_EXPORT):
    case FAILURE(ACTION_TYPES.FETCH_TIPOEXAME_LIST):
    case FAILURE(ACTION_TYPES.FETCH_TIPOEXAME):
    case FAILURE(ACTION_TYPES.CREATE_TIPOEXAME):
    case FAILURE(ACTION_TYPES.UPDATE_TIPOEXAME):
    case FAILURE(ACTION_TYPES.DELETE_TIPOEXAME):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_TIPOEXAME_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10)
      };
    case SUCCESS(ACTION_TYPES.FETCH_TIPOEXAME):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_TIPOEXAME):
    case SUCCESS(ACTION_TYPES.UPDATE_TIPOEXAME):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_TIPOEXAME):
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

const apiUrl = 'api/tipo-exames';

// Actions

// Actions
export type ICrudGetAllActionTipoExame<T> = (
  exame?: any,
  idPai?: any,
  ativo?: any,
  page?: number,
  size?: number,
  sort?: string
) => IPayload<T> | ((dispatch: any) => IPayload<T>);

export const getEntities: ICrudGetAllActionTipoExame<ITipoExame> = (exame, idPai, ativo, page, size, sort) => {
  const exameRequest = exame ? `exame.contains=${exame}&` : '';
  const idPaiRequest = idPai ? `idPai.contains=${idPai}&` : '';
  const ativoRequest = ativo ? `ativo.contains=${ativo}&` : '';

  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}&` : '?'}`;
  return {
    type: ACTION_TYPES.FETCH_TIPOEXAME_LIST,
    payload: axios.get<ITipoExame>(`${requestUrl}${exameRequest}${idPaiRequest}${ativoRequest}cacheBuster=${new Date().getTime()}`)
  };
};
export const getEntity: ICrudGetAction<ITipoExame> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_TIPOEXAME,
    payload: axios.get<ITipoExame>(requestUrl)
  };
};

export const getEntitiesExport: ICrudGetAllActionTipoExame<ITipoExame> = (exame, idPai, ativo, page, size, sort) => {
  const exameRequest = exame ? `exame.contains=${exame}&` : '';
  const idPaiRequest = idPai ? `idPai.contains=${idPai}&` : '';
  const ativoRequest = ativo ? `ativo.contains=${ativo}&` : '';

  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}&` : '?'}`;
  return {
    type: ACTION_TYPES.FETCH_TIPOEXAME_LIST,
    payload: axios.get<ITipoExame>(`${requestUrl}${exameRequest}${idPaiRequest}${ativoRequest}cacheBuster=${new Date().getTime()}`)
  };
};

export const createEntity: ICrudPutAction<ITipoExame> = entity => async dispatch => {
  entity = {
    ...entity
  };
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_TIPOEXAME,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<ITipoExame> = entity => async dispatch => {
  entity = { ...entity };
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_TIPOEXAME,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<ITipoExame> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_TIPOEXAME,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});

export const getTipoExameState = (location): ITipoExameBaseState => {
  const url = new URL(`http://localhost${location.search}`); // using a dummy url for parsing
  const baseFilters = url.searchParams.get('baseFilters') || '';
  const exame = url.searchParams.get('exame') || '';
  const idPai = url.searchParams.get('idPai') || '';
  const ativo = url.searchParams.get('ativo') || '';

  return {
    baseFilters,
    exame,
    idPai,
    ativo
  };
};
