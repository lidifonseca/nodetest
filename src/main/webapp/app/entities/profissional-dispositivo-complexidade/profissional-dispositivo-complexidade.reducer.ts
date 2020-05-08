/* eslint complexity: ["error", 100] */
import axios from 'axios';
import { ICrudGetAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { IPayload } from 'react-jhipster/src/type/redux-action.type';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IProfissionalDispositivoComplexidade, defaultValue } from 'app/shared/model/profissional-dispositivo-complexidade.model';

export const ACTION_TYPES = {
  FETCH_PROFISSIONALDISPOSITIVOCOMPLEXIDADE_LIST_EXPORT:
    'profissionalDispositivoComplexidade/FETCH_PROFISSIONALDISPOSITIVOCOMPLEXIDADE_LIST_EXPORT',
  FETCH_PROFISSIONALDISPOSITIVOCOMPLEXIDADE_LIST: 'profissionalDispositivoComplexidade/FETCH_PROFISSIONALDISPOSITIVOCOMPLEXIDADE_LIST',
  FETCH_PROFISSIONALDISPOSITIVOCOMPLEXIDADE: 'profissionalDispositivoComplexidade/FETCH_PROFISSIONALDISPOSITIVOCOMPLEXIDADE',
  CREATE_PROFISSIONALDISPOSITIVOCOMPLEXIDADE: 'profissionalDispositivoComplexidade/CREATE_PROFISSIONALDISPOSITIVOCOMPLEXIDADE',
  UPDATE_PROFISSIONALDISPOSITIVOCOMPLEXIDADE: 'profissionalDispositivoComplexidade/UPDATE_PROFISSIONALDISPOSITIVOCOMPLEXIDADE',
  DELETE_PROFISSIONALDISPOSITIVOCOMPLEXIDADE: 'profissionalDispositivoComplexidade/DELETE_PROFISSIONALDISPOSITIVOCOMPLEXIDADE',
  RESET: 'profissionalDispositivoComplexidade/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IProfissionalDispositivoComplexidade>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type ProfissionalDispositivoComplexidadeState = Readonly<typeof initialState>;

export interface IProfissionalDispositivoComplexidadeBaseState {
  baseFilters: any;
  caracteristica: any;
  ativo: any;
  tipo: any;
}

export interface IProfissionalDispositivoComplexidadeUpdateState {
  fieldsBase: IProfissionalDispositivoComplexidadeBaseState;

  isNew: boolean;
}

// Reducer

export default (state: ProfissionalDispositivoComplexidadeState = initialState, action): ProfissionalDispositivoComplexidadeState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_PROFISSIONALDISPOSITIVOCOMPLEXIDADE_LIST_EXPORT):
    case REQUEST(ACTION_TYPES.FETCH_PROFISSIONALDISPOSITIVOCOMPLEXIDADE_LIST):
    case REQUEST(ACTION_TYPES.FETCH_PROFISSIONALDISPOSITIVOCOMPLEXIDADE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_PROFISSIONALDISPOSITIVOCOMPLEXIDADE):
    case REQUEST(ACTION_TYPES.UPDATE_PROFISSIONALDISPOSITIVOCOMPLEXIDADE):
    case REQUEST(ACTION_TYPES.DELETE_PROFISSIONALDISPOSITIVOCOMPLEXIDADE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_PROFISSIONALDISPOSITIVOCOMPLEXIDADE_LIST_EXPORT):
    case FAILURE(ACTION_TYPES.FETCH_PROFISSIONALDISPOSITIVOCOMPLEXIDADE_LIST):
    case FAILURE(ACTION_TYPES.FETCH_PROFISSIONALDISPOSITIVOCOMPLEXIDADE):
    case FAILURE(ACTION_TYPES.CREATE_PROFISSIONALDISPOSITIVOCOMPLEXIDADE):
    case FAILURE(ACTION_TYPES.UPDATE_PROFISSIONALDISPOSITIVOCOMPLEXIDADE):
    case FAILURE(ACTION_TYPES.DELETE_PROFISSIONALDISPOSITIVOCOMPLEXIDADE):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_PROFISSIONALDISPOSITIVOCOMPLEXIDADE_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10)
      };
    case SUCCESS(ACTION_TYPES.FETCH_PROFISSIONALDISPOSITIVOCOMPLEXIDADE):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_PROFISSIONALDISPOSITIVOCOMPLEXIDADE):
    case SUCCESS(ACTION_TYPES.UPDATE_PROFISSIONALDISPOSITIVOCOMPLEXIDADE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_PROFISSIONALDISPOSITIVOCOMPLEXIDADE):
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

const apiUrl = 'api/profissional-dispositivo-complexidades';

// Actions

// Actions
export type ICrudGetAllActionProfissionalDispositivoComplexidade<T> = (
  caracteristica?: any,
  ativo?: any,
  tipo?: any,
  page?: number,
  size?: number,
  sort?: string
) => IPayload<T> | ((dispatch: any) => IPayload<T>);

export const getEntities: ICrudGetAllActionProfissionalDispositivoComplexidade<IProfissionalDispositivoComplexidade> = (
  caracteristica,
  ativo,
  tipo,
  page,
  size,
  sort
) => {
  const caracteristicaRequest = caracteristica ? `caracteristica.contains=${caracteristica}&` : '';
  const ativoRequest = ativo ? `ativo.contains=${ativo}&` : '';
  const tipoRequest = tipo ? `tipo.contains=${tipo}&` : '';

  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}&` : '?'}`;
  return {
    type: ACTION_TYPES.FETCH_PROFISSIONALDISPOSITIVOCOMPLEXIDADE_LIST,
    payload: axios.get<IProfissionalDispositivoComplexidade>(
      `${requestUrl}${caracteristicaRequest}${ativoRequest}${tipoRequest}cacheBuster=${new Date().getTime()}`
    )
  };
};
export const getEntity: ICrudGetAction<IProfissionalDispositivoComplexidade> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_PROFISSIONALDISPOSITIVOCOMPLEXIDADE,
    payload: axios.get<IProfissionalDispositivoComplexidade>(requestUrl)
  };
};

export const getEntitiesExport: ICrudGetAllActionProfissionalDispositivoComplexidade<IProfissionalDispositivoComplexidade> = (
  caracteristica,
  ativo,
  tipo,
  page,
  size,
  sort
) => {
  const caracteristicaRequest = caracteristica ? `caracteristica.contains=${caracteristica}&` : '';
  const ativoRequest = ativo ? `ativo.contains=${ativo}&` : '';
  const tipoRequest = tipo ? `tipo.contains=${tipo}&` : '';

  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}&` : '?'}`;
  return {
    type: ACTION_TYPES.FETCH_PROFISSIONALDISPOSITIVOCOMPLEXIDADE_LIST,
    payload: axios.get<IProfissionalDispositivoComplexidade>(
      `${requestUrl}${caracteristicaRequest}${ativoRequest}${tipoRequest}cacheBuster=${new Date().getTime()}`
    )
  };
};

export const createEntity: ICrudPutAction<IProfissionalDispositivoComplexidade> = entity => async dispatch => {
  entity = {
    ...entity
  };
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_PROFISSIONALDISPOSITIVOCOMPLEXIDADE,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IProfissionalDispositivoComplexidade> = entity => async dispatch => {
  entity = { ...entity };
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_PROFISSIONALDISPOSITIVOCOMPLEXIDADE,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IProfissionalDispositivoComplexidade> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_PROFISSIONALDISPOSITIVOCOMPLEXIDADE,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});

export const getProfissionalDispositivoComplexidadeState = (location): IProfissionalDispositivoComplexidadeBaseState => {
  const url = new URL(`http://localhost${location.search}`); // using a dummy url for parsing
  const baseFilters = url.searchParams.get('baseFilters') || '';
  const caracteristica = url.searchParams.get('caracteristica') || '';
  const ativo = url.searchParams.get('ativo') || '';
  const tipo = url.searchParams.get('tipo') || '';

  return {
    baseFilters,
    caracteristica,
    ativo,
    tipo
  };
};
