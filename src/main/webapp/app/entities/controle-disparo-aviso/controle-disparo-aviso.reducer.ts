/* eslint complexity: ["error", 100] */
import axios from 'axios';
import { ICrudGetAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { IPayload } from 'react-jhipster/src/type/redux-action.type';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IControleDisparoAviso, defaultValue } from 'app/shared/model/controle-disparo-aviso.model';

export const ACTION_TYPES = {
  FETCH_CONTROLEDISPAROAVISO_LIST_EXPORT: 'controleDisparoAviso/FETCH_CONTROLEDISPAROAVISO_LIST_EXPORT',
  FETCH_CONTROLEDISPAROAVISO_LIST: 'controleDisparoAviso/FETCH_CONTROLEDISPAROAVISO_LIST',
  FETCH_CONTROLEDISPAROAVISO: 'controleDisparoAviso/FETCH_CONTROLEDISPAROAVISO',
  CREATE_CONTROLEDISPAROAVISO: 'controleDisparoAviso/CREATE_CONTROLEDISPAROAVISO',
  UPDATE_CONTROLEDISPAROAVISO: 'controleDisparoAviso/UPDATE_CONTROLEDISPAROAVISO',
  DELETE_CONTROLEDISPAROAVISO: 'controleDisparoAviso/DELETE_CONTROLEDISPAROAVISO',
  RESET: 'controleDisparoAviso/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IControleDisparoAviso>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type ControleDisparoAvisoState = Readonly<typeof initialState>;

export interface IControleDisparoAvisoBaseState {
  baseFilters: any;
  idAtendimento: any;
  qtdDisparo: any;
  avisopush: any;
}

export interface IControleDisparoAvisoUpdateState {
  fieldsBase: IControleDisparoAvisoBaseState;

  isNew: boolean;
}

// Reducer

export default (state: ControleDisparoAvisoState = initialState, action): ControleDisparoAvisoState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_CONTROLEDISPAROAVISO_LIST_EXPORT):
    case REQUEST(ACTION_TYPES.FETCH_CONTROLEDISPAROAVISO_LIST):
    case REQUEST(ACTION_TYPES.FETCH_CONTROLEDISPAROAVISO):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_CONTROLEDISPAROAVISO):
    case REQUEST(ACTION_TYPES.UPDATE_CONTROLEDISPAROAVISO):
    case REQUEST(ACTION_TYPES.DELETE_CONTROLEDISPAROAVISO):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_CONTROLEDISPAROAVISO_LIST_EXPORT):
    case FAILURE(ACTION_TYPES.FETCH_CONTROLEDISPAROAVISO_LIST):
    case FAILURE(ACTION_TYPES.FETCH_CONTROLEDISPAROAVISO):
    case FAILURE(ACTION_TYPES.CREATE_CONTROLEDISPAROAVISO):
    case FAILURE(ACTION_TYPES.UPDATE_CONTROLEDISPAROAVISO):
    case FAILURE(ACTION_TYPES.DELETE_CONTROLEDISPAROAVISO):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_CONTROLEDISPAROAVISO_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10)
      };
    case SUCCESS(ACTION_TYPES.FETCH_CONTROLEDISPAROAVISO):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_CONTROLEDISPAROAVISO):
    case SUCCESS(ACTION_TYPES.UPDATE_CONTROLEDISPAROAVISO):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_CONTROLEDISPAROAVISO):
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

const apiUrl = 'api/controle-disparo-avisos';

// Actions

// Actions
export type ICrudGetAllActionControleDisparoAviso<T> = (
  idAtendimento?: any,
  qtdDisparo?: any,
  avisopush?: any,
  page?: number,
  size?: number,
  sort?: string
) => IPayload<T> | ((dispatch: any) => IPayload<T>);

export const getEntities: ICrudGetAllActionControleDisparoAviso<IControleDisparoAviso> = (
  idAtendimento,
  qtdDisparo,
  avisopush,
  page,
  size,
  sort
) => {
  const idAtendimentoRequest = idAtendimento ? `idAtendimento.contains=${idAtendimento}&` : '';
  const qtdDisparoRequest = qtdDisparo ? `qtdDisparo.contains=${qtdDisparo}&` : '';
  const avisopushRequest = avisopush ? `avisopush.contains=${avisopush}&` : '';

  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}&` : '?'}`;
  return {
    type: ACTION_TYPES.FETCH_CONTROLEDISPAROAVISO_LIST,
    payload: axios.get<IControleDisparoAviso>(
      `${requestUrl}${idAtendimentoRequest}${qtdDisparoRequest}${avisopushRequest}cacheBuster=${new Date().getTime()}`
    )
  };
};
export const getEntity: ICrudGetAction<IControleDisparoAviso> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_CONTROLEDISPAROAVISO,
    payload: axios.get<IControleDisparoAviso>(requestUrl)
  };
};

export const getEntitiesExport: ICrudGetAllActionControleDisparoAviso<IControleDisparoAviso> = (
  idAtendimento,
  qtdDisparo,
  avisopush,
  page,
  size,
  sort
) => {
  const idAtendimentoRequest = idAtendimento ? `idAtendimento.contains=${idAtendimento}&` : '';
  const qtdDisparoRequest = qtdDisparo ? `qtdDisparo.contains=${qtdDisparo}&` : '';
  const avisopushRequest = avisopush ? `avisopush.contains=${avisopush}&` : '';

  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}&` : '?'}`;
  return {
    type: ACTION_TYPES.FETCH_CONTROLEDISPAROAVISO_LIST,
    payload: axios.get<IControleDisparoAviso>(
      `${requestUrl}${idAtendimentoRequest}${qtdDisparoRequest}${avisopushRequest}cacheBuster=${new Date().getTime()}`
    )
  };
};

export const createEntity: ICrudPutAction<IControleDisparoAviso> = entity => async dispatch => {
  entity = {
    ...entity
  };
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_CONTROLEDISPAROAVISO,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IControleDisparoAviso> = entity => async dispatch => {
  entity = { ...entity };
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_CONTROLEDISPAROAVISO,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IControleDisparoAviso> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_CONTROLEDISPAROAVISO,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});

export const getControleDisparoAvisoState = (location): IControleDisparoAvisoBaseState => {
  const url = new URL(`http://localhost${location.search}`); // using a dummy url for parsing
  const baseFilters = url.searchParams.get('baseFilters') || '';
  const idAtendimento = url.searchParams.get('idAtendimento') || '';
  const qtdDisparo = url.searchParams.get('qtdDisparo') || '';
  const avisopush = url.searchParams.get('avisopush') || '';

  return {
    baseFilters,
    idAtendimento,
    qtdDisparo,
    avisopush
  };
};
