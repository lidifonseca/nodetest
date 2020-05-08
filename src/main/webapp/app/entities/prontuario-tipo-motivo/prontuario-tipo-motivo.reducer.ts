/* eslint complexity: ["error", 100] */
import axios from 'axios';
import { ICrudGetAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { IPayload } from 'react-jhipster/src/type/redux-action.type';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IProntuarioTipoMotivo, defaultValue } from 'app/shared/model/prontuario-tipo-motivo.model';

export const ACTION_TYPES = {
  FETCH_PRONTUARIOTIPOMOTIVO_LIST_EXPORT: 'prontuarioTipoMotivo/FETCH_PRONTUARIOTIPOMOTIVO_LIST_EXPORT',
  FETCH_PRONTUARIOTIPOMOTIVO_LIST: 'prontuarioTipoMotivo/FETCH_PRONTUARIOTIPOMOTIVO_LIST',
  FETCH_PRONTUARIOTIPOMOTIVO: 'prontuarioTipoMotivo/FETCH_PRONTUARIOTIPOMOTIVO',
  CREATE_PRONTUARIOTIPOMOTIVO: 'prontuarioTipoMotivo/CREATE_PRONTUARIOTIPOMOTIVO',
  UPDATE_PRONTUARIOTIPOMOTIVO: 'prontuarioTipoMotivo/UPDATE_PRONTUARIOTIPOMOTIVO',
  DELETE_PRONTUARIOTIPOMOTIVO: 'prontuarioTipoMotivo/DELETE_PRONTUARIOTIPOMOTIVO',
  RESET: 'prontuarioTipoMotivo/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IProntuarioTipoMotivo>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type ProntuarioTipoMotivoState = Readonly<typeof initialState>;

export interface IProntuarioTipoMotivoBaseState {
  baseFilters: any;
  nome: any;
  idPai: any;
  ativo: any;
  classe: any;
  name: any;
  idTipoProntuario: any;
}

export interface IProntuarioTipoMotivoUpdateState {
  fieldsBase: IProntuarioTipoMotivoBaseState;

  isNew: boolean;
}

// Reducer

export default (state: ProntuarioTipoMotivoState = initialState, action): ProntuarioTipoMotivoState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_PRONTUARIOTIPOMOTIVO_LIST_EXPORT):
    case REQUEST(ACTION_TYPES.FETCH_PRONTUARIOTIPOMOTIVO_LIST):
    case REQUEST(ACTION_TYPES.FETCH_PRONTUARIOTIPOMOTIVO):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_PRONTUARIOTIPOMOTIVO):
    case REQUEST(ACTION_TYPES.UPDATE_PRONTUARIOTIPOMOTIVO):
    case REQUEST(ACTION_TYPES.DELETE_PRONTUARIOTIPOMOTIVO):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_PRONTUARIOTIPOMOTIVO_LIST_EXPORT):
    case FAILURE(ACTION_TYPES.FETCH_PRONTUARIOTIPOMOTIVO_LIST):
    case FAILURE(ACTION_TYPES.FETCH_PRONTUARIOTIPOMOTIVO):
    case FAILURE(ACTION_TYPES.CREATE_PRONTUARIOTIPOMOTIVO):
    case FAILURE(ACTION_TYPES.UPDATE_PRONTUARIOTIPOMOTIVO):
    case FAILURE(ACTION_TYPES.DELETE_PRONTUARIOTIPOMOTIVO):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_PRONTUARIOTIPOMOTIVO_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10)
      };
    case SUCCESS(ACTION_TYPES.FETCH_PRONTUARIOTIPOMOTIVO):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_PRONTUARIOTIPOMOTIVO):
    case SUCCESS(ACTION_TYPES.UPDATE_PRONTUARIOTIPOMOTIVO):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_PRONTUARIOTIPOMOTIVO):
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

const apiUrl = 'api/prontuario-tipo-motivos';

// Actions

// Actions
export type ICrudGetAllActionProntuarioTipoMotivo<T> = (
  nome?: any,
  idPai?: any,
  ativo?: any,
  classe?: any,
  name?: any,
  idTipoProntuario?: any,
  page?: number,
  size?: number,
  sort?: string
) => IPayload<T> | ((dispatch: any) => IPayload<T>);

export const getEntities: ICrudGetAllActionProntuarioTipoMotivo<IProntuarioTipoMotivo> = (
  nome,
  idPai,
  ativo,
  classe,
  name,
  idTipoProntuario,
  page,
  size,
  sort
) => {
  const nomeRequest = nome ? `nome.contains=${nome}&` : '';
  const idPaiRequest = idPai ? `idPai.contains=${idPai}&` : '';
  const ativoRequest = ativo ? `ativo.contains=${ativo}&` : '';
  const classeRequest = classe ? `classe.contains=${classe}&` : '';
  const nameRequest = name ? `name.contains=${name}&` : '';
  const idTipoProntuarioRequest = idTipoProntuario ? `idTipoProntuario.contains=${idTipoProntuario}&` : '';

  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}&` : '?'}`;
  return {
    type: ACTION_TYPES.FETCH_PRONTUARIOTIPOMOTIVO_LIST,
    payload: axios.get<IProntuarioTipoMotivo>(
      `${requestUrl}${nomeRequest}${idPaiRequest}${ativoRequest}${classeRequest}${nameRequest}${idTipoProntuarioRequest}cacheBuster=${new Date().getTime()}`
    )
  };
};
export const getEntity: ICrudGetAction<IProntuarioTipoMotivo> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_PRONTUARIOTIPOMOTIVO,
    payload: axios.get<IProntuarioTipoMotivo>(requestUrl)
  };
};

export const getEntitiesExport: ICrudGetAllActionProntuarioTipoMotivo<IProntuarioTipoMotivo> = (
  nome,
  idPai,
  ativo,
  classe,
  name,
  idTipoProntuario,
  page,
  size,
  sort
) => {
  const nomeRequest = nome ? `nome.contains=${nome}&` : '';
  const idPaiRequest = idPai ? `idPai.contains=${idPai}&` : '';
  const ativoRequest = ativo ? `ativo.contains=${ativo}&` : '';
  const classeRequest = classe ? `classe.contains=${classe}&` : '';
  const nameRequest = name ? `name.contains=${name}&` : '';
  const idTipoProntuarioRequest = idTipoProntuario ? `idTipoProntuario.contains=${idTipoProntuario}&` : '';

  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}&` : '?'}`;
  return {
    type: ACTION_TYPES.FETCH_PRONTUARIOTIPOMOTIVO_LIST,
    payload: axios.get<IProntuarioTipoMotivo>(
      `${requestUrl}${nomeRequest}${idPaiRequest}${ativoRequest}${classeRequest}${nameRequest}${idTipoProntuarioRequest}cacheBuster=${new Date().getTime()}`
    )
  };
};

export const createEntity: ICrudPutAction<IProntuarioTipoMotivo> = entity => async dispatch => {
  entity = {
    ...entity
  };
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_PRONTUARIOTIPOMOTIVO,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IProntuarioTipoMotivo> = entity => async dispatch => {
  entity = { ...entity };
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_PRONTUARIOTIPOMOTIVO,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IProntuarioTipoMotivo> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_PRONTUARIOTIPOMOTIVO,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});

export const getProntuarioTipoMotivoState = (location): IProntuarioTipoMotivoBaseState => {
  const url = new URL(`http://localhost${location.search}`); // using a dummy url for parsing
  const baseFilters = url.searchParams.get('baseFilters') || '';
  const nome = url.searchParams.get('nome') || '';
  const idPai = url.searchParams.get('idPai') || '';
  const ativo = url.searchParams.get('ativo') || '';
  const classe = url.searchParams.get('classe') || '';
  const name = url.searchParams.get('name') || '';
  const idTipoProntuario = url.searchParams.get('idTipoProntuario') || '';

  return {
    baseFilters,
    nome,
    idPai,
    ativo,
    classe,
    name,
    idTipoProntuario
  };
};
