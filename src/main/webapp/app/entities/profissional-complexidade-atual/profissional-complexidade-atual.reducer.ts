/* eslint complexity: ["error", 100] */
import axios from 'axios';
import { ICrudGetAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { IPayload } from 'react-jhipster/src/type/redux-action.type';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IProfissionalComplexidadeAtual, defaultValue } from 'app/shared/model/profissional-complexidade-atual.model';

export const ACTION_TYPES = {
  FETCH_PROFISSIONALCOMPLEXIDADEATUAL_LIST_EXPORT: 'profissionalComplexidadeAtual/FETCH_PROFISSIONALCOMPLEXIDADEATUAL_LIST_EXPORT',
  FETCH_PROFISSIONALCOMPLEXIDADEATUAL_LIST: 'profissionalComplexidadeAtual/FETCH_PROFISSIONALCOMPLEXIDADEATUAL_LIST',
  FETCH_PROFISSIONALCOMPLEXIDADEATUAL: 'profissionalComplexidadeAtual/FETCH_PROFISSIONALCOMPLEXIDADEATUAL',
  CREATE_PROFISSIONALCOMPLEXIDADEATUAL: 'profissionalComplexidadeAtual/CREATE_PROFISSIONALCOMPLEXIDADEATUAL',
  UPDATE_PROFISSIONALCOMPLEXIDADEATUAL: 'profissionalComplexidadeAtual/UPDATE_PROFISSIONALCOMPLEXIDADEATUAL',
  DELETE_PROFISSIONALCOMPLEXIDADEATUAL: 'profissionalComplexidadeAtual/DELETE_PROFISSIONALCOMPLEXIDADEATUAL',
  RESET: 'profissionalComplexidadeAtual/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IProfissionalComplexidadeAtual>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type ProfissionalComplexidadeAtualState = Readonly<typeof initialState>;

export interface IProfissionalComplexidadeAtualBaseState {
  baseFilters: any;
  idProfissional: any;
  baixa: any;
  media: any;
  alta: any;
  ventilacaoMecanica: any;
  telemonitoramente: any;
}

export interface IProfissionalComplexidadeAtualUpdateState {
  fieldsBase: IProfissionalComplexidadeAtualBaseState;

  isNew: boolean;
}

// Reducer

export default (state: ProfissionalComplexidadeAtualState = initialState, action): ProfissionalComplexidadeAtualState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_PROFISSIONALCOMPLEXIDADEATUAL_LIST_EXPORT):
    case REQUEST(ACTION_TYPES.FETCH_PROFISSIONALCOMPLEXIDADEATUAL_LIST):
    case REQUEST(ACTION_TYPES.FETCH_PROFISSIONALCOMPLEXIDADEATUAL):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_PROFISSIONALCOMPLEXIDADEATUAL):
    case REQUEST(ACTION_TYPES.UPDATE_PROFISSIONALCOMPLEXIDADEATUAL):
    case REQUEST(ACTION_TYPES.DELETE_PROFISSIONALCOMPLEXIDADEATUAL):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_PROFISSIONALCOMPLEXIDADEATUAL_LIST_EXPORT):
    case FAILURE(ACTION_TYPES.FETCH_PROFISSIONALCOMPLEXIDADEATUAL_LIST):
    case FAILURE(ACTION_TYPES.FETCH_PROFISSIONALCOMPLEXIDADEATUAL):
    case FAILURE(ACTION_TYPES.CREATE_PROFISSIONALCOMPLEXIDADEATUAL):
    case FAILURE(ACTION_TYPES.UPDATE_PROFISSIONALCOMPLEXIDADEATUAL):
    case FAILURE(ACTION_TYPES.DELETE_PROFISSIONALCOMPLEXIDADEATUAL):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_PROFISSIONALCOMPLEXIDADEATUAL_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10)
      };
    case SUCCESS(ACTION_TYPES.FETCH_PROFISSIONALCOMPLEXIDADEATUAL):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_PROFISSIONALCOMPLEXIDADEATUAL):
    case SUCCESS(ACTION_TYPES.UPDATE_PROFISSIONALCOMPLEXIDADEATUAL):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_PROFISSIONALCOMPLEXIDADEATUAL):
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

const apiUrl = 'api/profissional-complexidade-atuals';

// Actions

// Actions
export type ICrudGetAllActionProfissionalComplexidadeAtual<T> = (
  idProfissional?: any,
  baixa?: any,
  media?: any,
  alta?: any,
  ventilacaoMecanica?: any,
  telemonitoramente?: any,
  page?: number,
  size?: number,
  sort?: string
) => IPayload<T> | ((dispatch: any) => IPayload<T>);

export const getEntities: ICrudGetAllActionProfissionalComplexidadeAtual<IProfissionalComplexidadeAtual> = (
  idProfissional,
  baixa,
  media,
  alta,
  ventilacaoMecanica,
  telemonitoramente,
  page,
  size,
  sort
) => {
  const idProfissionalRequest = idProfissional ? `idProfissional.contains=${idProfissional}&` : '';
  const baixaRequest = baixa ? `baixa.contains=${baixa}&` : '';
  const mediaRequest = media ? `media.contains=${media}&` : '';
  const altaRequest = alta ? `alta.contains=${alta}&` : '';
  const ventilacaoMecanicaRequest = ventilacaoMecanica ? `ventilacaoMecanica.contains=${ventilacaoMecanica}&` : '';
  const telemonitoramenteRequest = telemonitoramente ? `telemonitoramente.contains=${telemonitoramente}&` : '';

  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}&` : '?'}`;
  return {
    type: ACTION_TYPES.FETCH_PROFISSIONALCOMPLEXIDADEATUAL_LIST,
    payload: axios.get<IProfissionalComplexidadeAtual>(
      `${requestUrl}${idProfissionalRequest}${baixaRequest}${mediaRequest}${altaRequest}${ventilacaoMecanicaRequest}${telemonitoramenteRequest}cacheBuster=${new Date().getTime()}`
    )
  };
};
export const getEntity: ICrudGetAction<IProfissionalComplexidadeAtual> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_PROFISSIONALCOMPLEXIDADEATUAL,
    payload: axios.get<IProfissionalComplexidadeAtual>(requestUrl)
  };
};

export const getEntitiesExport: ICrudGetAllActionProfissionalComplexidadeAtual<IProfissionalComplexidadeAtual> = (
  idProfissional,
  baixa,
  media,
  alta,
  ventilacaoMecanica,
  telemonitoramente,
  page,
  size,
  sort
) => {
  const idProfissionalRequest = idProfissional ? `idProfissional.contains=${idProfissional}&` : '';
  const baixaRequest = baixa ? `baixa.contains=${baixa}&` : '';
  const mediaRequest = media ? `media.contains=${media}&` : '';
  const altaRequest = alta ? `alta.contains=${alta}&` : '';
  const ventilacaoMecanicaRequest = ventilacaoMecanica ? `ventilacaoMecanica.contains=${ventilacaoMecanica}&` : '';
  const telemonitoramenteRequest = telemonitoramente ? `telemonitoramente.contains=${telemonitoramente}&` : '';

  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}&` : '?'}`;
  return {
    type: ACTION_TYPES.FETCH_PROFISSIONALCOMPLEXIDADEATUAL_LIST,
    payload: axios.get<IProfissionalComplexidadeAtual>(
      `${requestUrl}${idProfissionalRequest}${baixaRequest}${mediaRequest}${altaRequest}${ventilacaoMecanicaRequest}${telemonitoramenteRequest}cacheBuster=${new Date().getTime()}`
    )
  };
};

export const createEntity: ICrudPutAction<IProfissionalComplexidadeAtual> = entity => async dispatch => {
  entity = {
    ...entity
  };
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_PROFISSIONALCOMPLEXIDADEATUAL,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IProfissionalComplexidadeAtual> = entity => async dispatch => {
  entity = { ...entity };
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_PROFISSIONALCOMPLEXIDADEATUAL,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IProfissionalComplexidadeAtual> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_PROFISSIONALCOMPLEXIDADEATUAL,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});

export const getProfissionalComplexidadeAtualState = (location): IProfissionalComplexidadeAtualBaseState => {
  const url = new URL(`http://localhost${location.search}`); // using a dummy url for parsing
  const baseFilters = url.searchParams.get('baseFilters') || '';
  const idProfissional = url.searchParams.get('idProfissional') || '';
  const baixa = url.searchParams.get('baixa') || '';
  const media = url.searchParams.get('media') || '';
  const alta = url.searchParams.get('alta') || '';
  const ventilacaoMecanica = url.searchParams.get('ventilacaoMecanica') || '';
  const telemonitoramente = url.searchParams.get('telemonitoramente') || '';

  return {
    baseFilters,
    idProfissional,
    baixa,
    media,
    alta,
    ventilacaoMecanica,
    telemonitoramente
  };
};
