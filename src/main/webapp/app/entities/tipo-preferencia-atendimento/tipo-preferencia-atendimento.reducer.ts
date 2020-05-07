/* eslint complexity: ["error", 100] */
import axios from 'axios';
import { ICrudGetAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { IPayload } from 'react-jhipster/src/type/redux-action.type';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { ITipoPreferenciaAtendimento, defaultValue } from 'app/shared/model/tipo-preferencia-atendimento.model';

export const ACTION_TYPES = {
  FETCH_TIPOPREFERENCIAATENDIMENTO_LIST_EXPORT: 'tipoPreferenciaAtendimento/FETCH_TIPOPREFERENCIAATENDIMENTO_LIST_EXPORT',
  FETCH_TIPOPREFERENCIAATENDIMENTO_LIST: 'tipoPreferenciaAtendimento/FETCH_TIPOPREFERENCIAATENDIMENTO_LIST',
  FETCH_TIPOPREFERENCIAATENDIMENTO: 'tipoPreferenciaAtendimento/FETCH_TIPOPREFERENCIAATENDIMENTO',
  CREATE_TIPOPREFERENCIAATENDIMENTO: 'tipoPreferenciaAtendimento/CREATE_TIPOPREFERENCIAATENDIMENTO',
  UPDATE_TIPOPREFERENCIAATENDIMENTO: 'tipoPreferenciaAtendimento/UPDATE_TIPOPREFERENCIAATENDIMENTO',
  DELETE_TIPOPREFERENCIAATENDIMENTO: 'tipoPreferenciaAtendimento/DELETE_TIPOPREFERENCIAATENDIMENTO',
  RESET: 'tipoPreferenciaAtendimento/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<ITipoPreferenciaAtendimento>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type TipoPreferenciaAtendimentoState = Readonly<typeof initialState>;

export interface ITipoPreferenciaAtendimentoBaseState {
  baseFilters: any;
  nome: any;
  ativo: any;
}

export interface ITipoPreferenciaAtendimentoUpdateState {
  fieldsBase: ITipoPreferenciaAtendimentoBaseState;
  isNew: boolean;
}

// Reducer

export default (state: TipoPreferenciaAtendimentoState = initialState, action): TipoPreferenciaAtendimentoState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_TIPOPREFERENCIAATENDIMENTO_LIST_EXPORT):
    case REQUEST(ACTION_TYPES.FETCH_TIPOPREFERENCIAATENDIMENTO_LIST):
    case REQUEST(ACTION_TYPES.FETCH_TIPOPREFERENCIAATENDIMENTO):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_TIPOPREFERENCIAATENDIMENTO):
    case REQUEST(ACTION_TYPES.UPDATE_TIPOPREFERENCIAATENDIMENTO):
    case REQUEST(ACTION_TYPES.DELETE_TIPOPREFERENCIAATENDIMENTO):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_TIPOPREFERENCIAATENDIMENTO_LIST_EXPORT):
    case FAILURE(ACTION_TYPES.FETCH_TIPOPREFERENCIAATENDIMENTO_LIST):
    case FAILURE(ACTION_TYPES.FETCH_TIPOPREFERENCIAATENDIMENTO):
    case FAILURE(ACTION_TYPES.CREATE_TIPOPREFERENCIAATENDIMENTO):
    case FAILURE(ACTION_TYPES.UPDATE_TIPOPREFERENCIAATENDIMENTO):
    case FAILURE(ACTION_TYPES.DELETE_TIPOPREFERENCIAATENDIMENTO):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_TIPOPREFERENCIAATENDIMENTO_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10)
      };
    case SUCCESS(ACTION_TYPES.FETCH_TIPOPREFERENCIAATENDIMENTO):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_TIPOPREFERENCIAATENDIMENTO):
    case SUCCESS(ACTION_TYPES.UPDATE_TIPOPREFERENCIAATENDIMENTO):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_TIPOPREFERENCIAATENDIMENTO):
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

const apiUrl = 'api/tipo-preferencia-atendimentos';

// Actions

// Actions
export type ICrudGetAllActionTipoPreferenciaAtendimento<T> = (
  nome?: any,
  ativo?: any,
  page?: number,
  size?: number,
  sort?: string
) => IPayload<T> | ((dispatch: any) => IPayload<T>);

export const getEntities: ICrudGetAllActionTipoPreferenciaAtendimento<ITipoPreferenciaAtendimento> = (nome, ativo, page, size, sort) => {
  const nomeRequest = nome ? `nome.contains=${nome}&` : '';
  const ativoRequest = ativo ? `ativo.contains=${ativo}&` : '';

  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}&` : '?'}`;
  return {
    type: ACTION_TYPES.FETCH_TIPOPREFERENCIAATENDIMENTO_LIST,
    payload: axios.get<ITipoPreferenciaAtendimento>(`${requestUrl}${nomeRequest}${ativoRequest}cacheBuster=${new Date().getTime()}`)
  };
};
export const getEntity: ICrudGetAction<ITipoPreferenciaAtendimento> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_TIPOPREFERENCIAATENDIMENTO,
    payload: axios.get<ITipoPreferenciaAtendimento>(requestUrl)
  };
};

export const getEntitiesExport: ICrudGetAllActionTipoPreferenciaAtendimento<ITipoPreferenciaAtendimento> = (
  nome,
  ativo,
  page,
  size,
  sort
) => {
  const nomeRequest = nome ? `nome.contains=${nome}&` : '';
  const ativoRequest = ativo ? `ativo.contains=${ativo}&` : '';

  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}&` : '?'}`;
  return {
    type: ACTION_TYPES.FETCH_TIPOPREFERENCIAATENDIMENTO_LIST,
    payload: axios.get<ITipoPreferenciaAtendimento>(`${requestUrl}${nomeRequest}${ativoRequest}cacheBuster=${new Date().getTime()}`)
  };
};

export const createEntity: ICrudPutAction<ITipoPreferenciaAtendimento> = entity => async dispatch => {
  entity = {
    ...entity
  };
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_TIPOPREFERENCIAATENDIMENTO,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<ITipoPreferenciaAtendimento> = entity => async dispatch => {
  entity = { ...entity };
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_TIPOPREFERENCIAATENDIMENTO,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<ITipoPreferenciaAtendimento> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_TIPOPREFERENCIAATENDIMENTO,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});

export const getTipoPreferenciaAtendimentoState = (location): ITipoPreferenciaAtendimentoBaseState => {
  const url = new URL(`http://localhost${location.search}`); // using a dummy url for parsing
  const baseFilters = url.searchParams.get('baseFilters') || '';
  const nome = url.searchParams.get('nome') || '';
  const ativo = url.searchParams.get('ativo') || '';

  return {
    baseFilters,
    nome,
    ativo
  };
};
