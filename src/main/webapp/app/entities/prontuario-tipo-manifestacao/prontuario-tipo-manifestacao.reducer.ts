/* eslint complexity: ["error", 100] */
import axios from 'axios';
import { ICrudGetAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { IPayload } from 'react-jhipster/src/type/redux-action.type';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IProntuarioTipoManifestacao, defaultValue } from 'app/shared/model/prontuario-tipo-manifestacao.model';

export const ACTION_TYPES = {
  FETCH_PRONTUARIOTIPOMANIFESTACAO_LIST_EXPORT: 'prontuarioTipoManifestacao/FETCH_PRONTUARIOTIPOMANIFESTACAO_LIST_EXPORT',
  FETCH_PRONTUARIOTIPOMANIFESTACAO_LIST: 'prontuarioTipoManifestacao/FETCH_PRONTUARIOTIPOMANIFESTACAO_LIST',
  FETCH_PRONTUARIOTIPOMANIFESTACAO: 'prontuarioTipoManifestacao/FETCH_PRONTUARIOTIPOMANIFESTACAO',
  CREATE_PRONTUARIOTIPOMANIFESTACAO: 'prontuarioTipoManifestacao/CREATE_PRONTUARIOTIPOMANIFESTACAO',
  UPDATE_PRONTUARIOTIPOMANIFESTACAO: 'prontuarioTipoManifestacao/UPDATE_PRONTUARIOTIPOMANIFESTACAO',
  DELETE_PRONTUARIOTIPOMANIFESTACAO: 'prontuarioTipoManifestacao/DELETE_PRONTUARIOTIPOMANIFESTACAO',
  RESET: 'prontuarioTipoManifestacao/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IProntuarioTipoManifestacao>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type ProntuarioTipoManifestacaoState = Readonly<typeof initialState>;

export interface IProntuarioTipoManifestacaoBaseState {
  baseFilters: any;
  nome: any;
  idPai: any;
  ativo: any;
}

export interface IProntuarioTipoManifestacaoUpdateState {
  fieldsBase: IProntuarioTipoManifestacaoBaseState;

  isNew: boolean;
}

// Reducer

export default (state: ProntuarioTipoManifestacaoState = initialState, action): ProntuarioTipoManifestacaoState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_PRONTUARIOTIPOMANIFESTACAO_LIST_EXPORT):
    case REQUEST(ACTION_TYPES.FETCH_PRONTUARIOTIPOMANIFESTACAO_LIST):
    case REQUEST(ACTION_TYPES.FETCH_PRONTUARIOTIPOMANIFESTACAO):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_PRONTUARIOTIPOMANIFESTACAO):
    case REQUEST(ACTION_TYPES.UPDATE_PRONTUARIOTIPOMANIFESTACAO):
    case REQUEST(ACTION_TYPES.DELETE_PRONTUARIOTIPOMANIFESTACAO):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_PRONTUARIOTIPOMANIFESTACAO_LIST_EXPORT):
    case FAILURE(ACTION_TYPES.FETCH_PRONTUARIOTIPOMANIFESTACAO_LIST):
    case FAILURE(ACTION_TYPES.FETCH_PRONTUARIOTIPOMANIFESTACAO):
    case FAILURE(ACTION_TYPES.CREATE_PRONTUARIOTIPOMANIFESTACAO):
    case FAILURE(ACTION_TYPES.UPDATE_PRONTUARIOTIPOMANIFESTACAO):
    case FAILURE(ACTION_TYPES.DELETE_PRONTUARIOTIPOMANIFESTACAO):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_PRONTUARIOTIPOMANIFESTACAO_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10)
      };
    case SUCCESS(ACTION_TYPES.FETCH_PRONTUARIOTIPOMANIFESTACAO):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_PRONTUARIOTIPOMANIFESTACAO):
    case SUCCESS(ACTION_TYPES.UPDATE_PRONTUARIOTIPOMANIFESTACAO):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_PRONTUARIOTIPOMANIFESTACAO):
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

const apiUrl = 'api/prontuario-tipo-manifestacaos';

// Actions

// Actions
export type ICrudGetAllActionProntuarioTipoManifestacao<T> = (
  nome?: any,
  idPai?: any,
  ativo?: any,
  page?: number,
  size?: number,
  sort?: string
) => IPayload<T> | ((dispatch: any) => IPayload<T>);

export const getEntities: ICrudGetAllActionProntuarioTipoManifestacao<IProntuarioTipoManifestacao> = (
  nome,
  idPai,
  ativo,
  page,
  size,
  sort
) => {
  const nomeRequest = nome ? `nome.contains=${nome}&` : '';
  const idPaiRequest = idPai ? `idPai.contains=${idPai}&` : '';
  const ativoRequest = ativo ? `ativo.contains=${ativo}&` : '';

  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}&` : '?'}`;
  return {
    type: ACTION_TYPES.FETCH_PRONTUARIOTIPOMANIFESTACAO_LIST,
    payload: axios.get<IProntuarioTipoManifestacao>(
      `${requestUrl}${nomeRequest}${idPaiRequest}${ativoRequest}cacheBuster=${new Date().getTime()}`
    )
  };
};
export const getEntity: ICrudGetAction<IProntuarioTipoManifestacao> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_PRONTUARIOTIPOMANIFESTACAO,
    payload: axios.get<IProntuarioTipoManifestacao>(requestUrl)
  };
};

export const getEntitiesExport: ICrudGetAllActionProntuarioTipoManifestacao<IProntuarioTipoManifestacao> = (
  nome,
  idPai,
  ativo,
  page,
  size,
  sort
) => {
  const nomeRequest = nome ? `nome.contains=${nome}&` : '';
  const idPaiRequest = idPai ? `idPai.contains=${idPai}&` : '';
  const ativoRequest = ativo ? `ativo.contains=${ativo}&` : '';

  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}&` : '?'}`;
  return {
    type: ACTION_TYPES.FETCH_PRONTUARIOTIPOMANIFESTACAO_LIST,
    payload: axios.get<IProntuarioTipoManifestacao>(
      `${requestUrl}${nomeRequest}${idPaiRequest}${ativoRequest}cacheBuster=${new Date().getTime()}`
    )
  };
};

export const createEntity: ICrudPutAction<IProntuarioTipoManifestacao> = entity => async dispatch => {
  entity = {
    ...entity
  };
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_PRONTUARIOTIPOMANIFESTACAO,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IProntuarioTipoManifestacao> = entity => async dispatch => {
  entity = { ...entity };
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_PRONTUARIOTIPOMANIFESTACAO,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IProntuarioTipoManifestacao> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_PRONTUARIOTIPOMANIFESTACAO,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});

export const getProntuarioTipoManifestacaoState = (location): IProntuarioTipoManifestacaoBaseState => {
  const url = new URL(`http://localhost${location.search}`); // using a dummy url for parsing
  const baseFilters = url.searchParams.get('baseFilters') || '';
  const nome = url.searchParams.get('nome') || '';
  const idPai = url.searchParams.get('idPai') || '';
  const ativo = url.searchParams.get('ativo') || '';

  return {
    baseFilters,
    nome,
    idPai,
    ativo
  };
};
