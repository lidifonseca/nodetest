/* eslint complexity: ["error", 100] */
import axios from 'axios';
import { ICrudGetAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { IPayload } from 'react-jhipster/src/type/redux-action.type';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IProfissionalAreaAtuacaoNew, defaultValue } from 'app/shared/model/profissional-area-atuacao-new.model';

export const ACTION_TYPES = {
  FETCH_PROFISSIONALAREAATUACAONEW_LIST_EXPORT: 'profissionalAreaAtuacaoNew/FETCH_PROFISSIONALAREAATUACAONEW_LIST_EXPORT',
  FETCH_PROFISSIONALAREAATUACAONEW_LIST: 'profissionalAreaAtuacaoNew/FETCH_PROFISSIONALAREAATUACAONEW_LIST',
  FETCH_PROFISSIONALAREAATUACAONEW: 'profissionalAreaAtuacaoNew/FETCH_PROFISSIONALAREAATUACAONEW',
  CREATE_PROFISSIONALAREAATUACAONEW: 'profissionalAreaAtuacaoNew/CREATE_PROFISSIONALAREAATUACAONEW',
  UPDATE_PROFISSIONALAREAATUACAONEW: 'profissionalAreaAtuacaoNew/UPDATE_PROFISSIONALAREAATUACAONEW',
  DELETE_PROFISSIONALAREAATUACAONEW: 'profissionalAreaAtuacaoNew/DELETE_PROFISSIONALAREAATUACAONEW',
  RESET: 'profissionalAreaAtuacaoNew/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IProfissionalAreaAtuacaoNew>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type ProfissionalAreaAtuacaoNewState = Readonly<typeof initialState>;

export interface IProfissionalAreaAtuacaoNewBaseState {
  baseFilters: any;
  idProfissional: any;
  cepArea: any;
  cepFim: any;
  ativo: any;
  cepIni: any;
}

export interface IProfissionalAreaAtuacaoNewUpdateState {
  fieldsBase: IProfissionalAreaAtuacaoNewBaseState;

  isNew: boolean;
}

// Reducer

export default (state: ProfissionalAreaAtuacaoNewState = initialState, action): ProfissionalAreaAtuacaoNewState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_PROFISSIONALAREAATUACAONEW_LIST_EXPORT):
    case REQUEST(ACTION_TYPES.FETCH_PROFISSIONALAREAATUACAONEW_LIST):
    case REQUEST(ACTION_TYPES.FETCH_PROFISSIONALAREAATUACAONEW):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_PROFISSIONALAREAATUACAONEW):
    case REQUEST(ACTION_TYPES.UPDATE_PROFISSIONALAREAATUACAONEW):
    case REQUEST(ACTION_TYPES.DELETE_PROFISSIONALAREAATUACAONEW):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_PROFISSIONALAREAATUACAONEW_LIST_EXPORT):
    case FAILURE(ACTION_TYPES.FETCH_PROFISSIONALAREAATUACAONEW_LIST):
    case FAILURE(ACTION_TYPES.FETCH_PROFISSIONALAREAATUACAONEW):
    case FAILURE(ACTION_TYPES.CREATE_PROFISSIONALAREAATUACAONEW):
    case FAILURE(ACTION_TYPES.UPDATE_PROFISSIONALAREAATUACAONEW):
    case FAILURE(ACTION_TYPES.DELETE_PROFISSIONALAREAATUACAONEW):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_PROFISSIONALAREAATUACAONEW_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10)
      };
    case SUCCESS(ACTION_TYPES.FETCH_PROFISSIONALAREAATUACAONEW):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_PROFISSIONALAREAATUACAONEW):
    case SUCCESS(ACTION_TYPES.UPDATE_PROFISSIONALAREAATUACAONEW):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_PROFISSIONALAREAATUACAONEW):
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

const apiUrl = 'api/profissional-area-atuacao-news';

// Actions

// Actions
export type ICrudGetAllActionProfissionalAreaAtuacaoNew<T> = (
  idProfissional?: any,
  cepArea?: any,
  cepFim?: any,
  ativo?: any,
  cepIni?: any,
  page?: number,
  size?: number,
  sort?: string
) => IPayload<T> | ((dispatch: any) => IPayload<T>);

export const getEntities: ICrudGetAllActionProfissionalAreaAtuacaoNew<IProfissionalAreaAtuacaoNew> = (
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
    type: ACTION_TYPES.FETCH_PROFISSIONALAREAATUACAONEW_LIST,
    payload: axios.get<IProfissionalAreaAtuacaoNew>(
      `${requestUrl}${idProfissionalRequest}${cepAreaRequest}${cepFimRequest}${ativoRequest}${cepIniRequest}cacheBuster=${new Date().getTime()}`
    )
  };
};
export const getEntity: ICrudGetAction<IProfissionalAreaAtuacaoNew> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_PROFISSIONALAREAATUACAONEW,
    payload: axios.get<IProfissionalAreaAtuacaoNew>(requestUrl)
  };
};

export const getEntitiesExport: ICrudGetAllActionProfissionalAreaAtuacaoNew<IProfissionalAreaAtuacaoNew> = (
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
    type: ACTION_TYPES.FETCH_PROFISSIONALAREAATUACAONEW_LIST,
    payload: axios.get<IProfissionalAreaAtuacaoNew>(
      `${requestUrl}${idProfissionalRequest}${cepAreaRequest}${cepFimRequest}${ativoRequest}${cepIniRequest}cacheBuster=${new Date().getTime()}`
    )
  };
};

export const createEntity: ICrudPutAction<IProfissionalAreaAtuacaoNew> = entity => async dispatch => {
  entity = {
    ...entity
  };
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_PROFISSIONALAREAATUACAONEW,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IProfissionalAreaAtuacaoNew> = entity => async dispatch => {
  entity = { ...entity };
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_PROFISSIONALAREAATUACAONEW,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IProfissionalAreaAtuacaoNew> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_PROFISSIONALAREAATUACAONEW,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});

export const getProfissionalAreaAtuacaoNewState = (location): IProfissionalAreaAtuacaoNewBaseState => {
  const url = new URL(`http://localhost${location.search}`); // using a dummy url for parsing
  const baseFilters = url.searchParams.get('baseFilters') || '';
  const idProfissional = url.searchParams.get('idProfissional') || '';
  const cepArea = url.searchParams.get('cepArea') || '';
  const cepFim = url.searchParams.get('cepFim') || '';
  const ativo = url.searchParams.get('ativo') || '';
  const cepIni = url.searchParams.get('cepIni') || '';

  return {
    baseFilters,
    idProfissional,
    cepArea,
    cepFim,
    ativo,
    cepIni
  };
};
