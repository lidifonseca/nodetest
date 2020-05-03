/* eslint complexity: ["error", 100] */
import axios from 'axios';
import { ICrudGetAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { IPayload } from 'react-jhipster/src/type/redux-action.type';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IProfissionalAreaAtuacao, defaultValue } from 'app/shared/model/profissional-area-atuacao.model';

export const ACTION_TYPES = {
  FETCH_PROFISSIONALAREAATUACAO_LIST: 'profissionalAreaAtuacao/FETCH_PROFISSIONALAREAATUACAO_LIST',
  FETCH_PROFISSIONALAREAATUACAO: 'profissionalAreaAtuacao/FETCH_PROFISSIONALAREAATUACAO',
  CREATE_PROFISSIONALAREAATUACAO: 'profissionalAreaAtuacao/CREATE_PROFISSIONALAREAATUACAO',
  UPDATE_PROFISSIONALAREAATUACAO: 'profissionalAreaAtuacao/UPDATE_PROFISSIONALAREAATUACAO',
  DELETE_PROFISSIONALAREAATUACAO: 'profissionalAreaAtuacao/DELETE_PROFISSIONALAREAATUACAO',
  RESET: 'profissionalAreaAtuacao/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IProfissionalAreaAtuacao>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type ProfissionalAreaAtuacaoState = Readonly<typeof initialState>;

// Reducer

export default (state: ProfissionalAreaAtuacaoState = initialState, action): ProfissionalAreaAtuacaoState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_PROFISSIONALAREAATUACAO_LIST):
    case REQUEST(ACTION_TYPES.FETCH_PROFISSIONALAREAATUACAO):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_PROFISSIONALAREAATUACAO):
    case REQUEST(ACTION_TYPES.UPDATE_PROFISSIONALAREAATUACAO):
    case REQUEST(ACTION_TYPES.DELETE_PROFISSIONALAREAATUACAO):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_PROFISSIONALAREAATUACAO_LIST):
    case FAILURE(ACTION_TYPES.FETCH_PROFISSIONALAREAATUACAO):
    case FAILURE(ACTION_TYPES.CREATE_PROFISSIONALAREAATUACAO):
    case FAILURE(ACTION_TYPES.UPDATE_PROFISSIONALAREAATUACAO):
    case FAILURE(ACTION_TYPES.DELETE_PROFISSIONALAREAATUACAO):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_PROFISSIONALAREAATUACAO_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10)
      };
    case SUCCESS(ACTION_TYPES.FETCH_PROFISSIONALAREAATUACAO):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_PROFISSIONALAREAATUACAO):
    case SUCCESS(ACTION_TYPES.UPDATE_PROFISSIONALAREAATUACAO):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_PROFISSIONALAREAATUACAO):
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

const apiUrl = 'api/profissional-area-atuacaos';

// Actions

// Actions
export type ICrudGetAllActionProfissionalAreaAtuacao<T> = (
  idProfissional?: any,
  cepArea?: any,
  cepFim?: any,
  ativo?: any,
  cepIni?: any,
  page?: number,
  size?: number,
  sort?: string
) => IPayload<T> | ((dispatch: any) => IPayload<T>);

export const getEntities: ICrudGetAllActionProfissionalAreaAtuacao<IProfissionalAreaAtuacao> = (
  idProfissional,
  cepArea,
  cepFim,
  ativo,
  cepIni,
  page,
  size,
  sort
) => {
  const idProfissionalRequest = idProfissional ? `idProfissional.contains=${idProfissional}&` : '';
  const cepAreaRequest = cepArea ? `cepArea.contains=${cepArea}&` : '';
  const cepFimRequest = cepFim ? `cepFim.contains=${cepFim}&` : '';
  const ativoRequest = ativo ? `ativo.contains=${ativo}&` : '';
  const cepIniRequest = cepIni ? `cepIni.contains=${cepIni}&` : '';

  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}&` : '?'}`;
  return {
    type: ACTION_TYPES.FETCH_PROFISSIONALAREAATUACAO_LIST,
    payload: axios.get<IProfissionalAreaAtuacao>(
      `${requestUrl}${idProfissionalRequest}${cepAreaRequest}${cepFimRequest}${ativoRequest}${cepIniRequest}cacheBuster=${new Date().getTime()}`
    )
  };
};
export const getEntity: ICrudGetAction<IProfissionalAreaAtuacao> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_PROFISSIONALAREAATUACAO,
    payload: axios.get<IProfissionalAreaAtuacao>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IProfissionalAreaAtuacao> = entity => async dispatch => {
  entity = {
    ...entity
  };
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_PROFISSIONALAREAATUACAO,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IProfissionalAreaAtuacao> = entity => async dispatch => {
  entity = { ...entity };
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_PROFISSIONALAREAATUACAO,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IProfissionalAreaAtuacao> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_PROFISSIONALAREAATUACAO,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
