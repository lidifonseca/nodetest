/* eslint complexity: ["error", 100] */
import axios from 'axios';
import { ICrudGetAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { IPayload } from 'react-jhipster/src/type/redux-action.type';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IMotivoInternacao, defaultValue } from 'app/shared/model/motivo-internacao.model';

export const ACTION_TYPES = {
  FETCH_MOTIVOINTERNACAO_LIST_EXPORT: 'motivoInternacao/FETCH_MOTIVOINTERNACAO_LIST_EXPORT',
  FETCH_MOTIVOINTERNACAO_LIST: 'motivoInternacao/FETCH_MOTIVOINTERNACAO_LIST',
  FETCH_MOTIVOINTERNACAO: 'motivoInternacao/FETCH_MOTIVOINTERNACAO',
  CREATE_MOTIVOINTERNACAO: 'motivoInternacao/CREATE_MOTIVOINTERNACAO',
  UPDATE_MOTIVOINTERNACAO: 'motivoInternacao/UPDATE_MOTIVOINTERNACAO',
  DELETE_MOTIVOINTERNACAO: 'motivoInternacao/DELETE_MOTIVOINTERNACAO',
  RESET: 'motivoInternacao/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IMotivoInternacao>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type MotivoInternacaoState = Readonly<typeof initialState>;

export interface IMotivoInternacaoBaseState {
  baseFilters: any;
  nome: any;
  idPai: any;
  ativo: any;
  classe: any;
  name: any;
}

export interface IMotivoInternacaoUpdateState {
  fieldsBase: IMotivoInternacaoBaseState;

  isNew: boolean;
}

// Reducer

export default (state: MotivoInternacaoState = initialState, action): MotivoInternacaoState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_MOTIVOINTERNACAO_LIST_EXPORT):
    case REQUEST(ACTION_TYPES.FETCH_MOTIVOINTERNACAO_LIST):
    case REQUEST(ACTION_TYPES.FETCH_MOTIVOINTERNACAO):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_MOTIVOINTERNACAO):
    case REQUEST(ACTION_TYPES.UPDATE_MOTIVOINTERNACAO):
    case REQUEST(ACTION_TYPES.DELETE_MOTIVOINTERNACAO):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_MOTIVOINTERNACAO_LIST_EXPORT):
    case FAILURE(ACTION_TYPES.FETCH_MOTIVOINTERNACAO_LIST):
    case FAILURE(ACTION_TYPES.FETCH_MOTIVOINTERNACAO):
    case FAILURE(ACTION_TYPES.CREATE_MOTIVOINTERNACAO):
    case FAILURE(ACTION_TYPES.UPDATE_MOTIVOINTERNACAO):
    case FAILURE(ACTION_TYPES.DELETE_MOTIVOINTERNACAO):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_MOTIVOINTERNACAO_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10)
      };
    case SUCCESS(ACTION_TYPES.FETCH_MOTIVOINTERNACAO):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_MOTIVOINTERNACAO):
    case SUCCESS(ACTION_TYPES.UPDATE_MOTIVOINTERNACAO):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_MOTIVOINTERNACAO):
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

const apiUrl = 'api/motivo-internacaos';

// Actions

// Actions
export type ICrudGetAllActionMotivoInternacao<T> = (
  nome?: any,
  idPai?: any,
  ativo?: any,
  classe?: any,
  name?: any,
  page?: number,
  size?: number,
  sort?: string
) => IPayload<T> | ((dispatch: any) => IPayload<T>);

export const getEntities: ICrudGetAllActionMotivoInternacao<IMotivoInternacao> = (nome, idPai, ativo, classe, name, page, size, sort) => {
  const nomeRequest = nome ? `nome.contains=${nome}&` : '';
  const idPaiRequest = idPai ? `idPai.contains=${idPai}&` : '';
  const ativoRequest = ativo ? `ativo.contains=${ativo}&` : '';
  const classeRequest = classe ? `classe.contains=${classe}&` : '';
  const nameRequest = name ? `name.contains=${name}&` : '';

  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}&` : '?'}`;
  return {
    type: ACTION_TYPES.FETCH_MOTIVOINTERNACAO_LIST,
    payload: axios.get<IMotivoInternacao>(
      `${requestUrl}${nomeRequest}${idPaiRequest}${ativoRequest}${classeRequest}${nameRequest}cacheBuster=${new Date().getTime()}`
    )
  };
};
export const getEntity: ICrudGetAction<IMotivoInternacao> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_MOTIVOINTERNACAO,
    payload: axios.get<IMotivoInternacao>(requestUrl)
  };
};

export const getEntitiesExport: ICrudGetAllActionMotivoInternacao<IMotivoInternacao> = (
  nome,
  idPai,
  ativo,
  classe,
  name,
  page,
  size,
  sort
) => {
  const nomeRequest = nome ? `nome.contains=${nome}&` : '';
  const idPaiRequest = idPai ? `idPai.contains=${idPai}&` : '';
  const ativoRequest = ativo ? `ativo.contains=${ativo}&` : '';
  const classeRequest = classe ? `classe.contains=${classe}&` : '';
  const nameRequest = name ? `name.contains=${name}&` : '';

  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}&` : '?'}`;
  return {
    type: ACTION_TYPES.FETCH_MOTIVOINTERNACAO_LIST,
    payload: axios.get<IMotivoInternacao>(
      `${requestUrl}${nomeRequest}${idPaiRequest}${ativoRequest}${classeRequest}${nameRequest}cacheBuster=${new Date().getTime()}`
    )
  };
};

export const createEntity: ICrudPutAction<IMotivoInternacao> = entity => async dispatch => {
  entity = {
    ...entity
  };
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_MOTIVOINTERNACAO,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IMotivoInternacao> = entity => async dispatch => {
  entity = { ...entity };
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_MOTIVOINTERNACAO,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IMotivoInternacao> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_MOTIVOINTERNACAO,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});

export const getMotivoInternacaoState = (location): IMotivoInternacaoBaseState => {
  const url = new URL(`http://localhost${location.search}`); // using a dummy url for parsing
  const baseFilters = url.searchParams.get('baseFilters') || '';
  const nome = url.searchParams.get('nome') || '';
  const idPai = url.searchParams.get('idPai') || '';
  const ativo = url.searchParams.get('ativo') || '';
  const classe = url.searchParams.get('classe') || '';
  const name = url.searchParams.get('name') || '';

  return {
    baseFilters,
    nome,
    idPai,
    ativo,
    classe,
    name
  };
};
