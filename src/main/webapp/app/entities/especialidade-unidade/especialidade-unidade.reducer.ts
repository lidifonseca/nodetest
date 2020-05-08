/* eslint complexity: ["error", 100] */
import axios from 'axios';
import { ICrudGetAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { IPayload } from 'react-jhipster/src/type/redux-action.type';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IEspecialidadeUnidade, defaultValue } from 'app/shared/model/especialidade-unidade.model';

export const ACTION_TYPES = {
  FETCH_ESPECIALIDADEUNIDADE_LIST_EXPORT: 'especialidadeUnidade/FETCH_ESPECIALIDADEUNIDADE_LIST_EXPORT',
  FETCH_ESPECIALIDADEUNIDADE_LIST: 'especialidadeUnidade/FETCH_ESPECIALIDADEUNIDADE_LIST',
  FETCH_ESPECIALIDADEUNIDADE: 'especialidadeUnidade/FETCH_ESPECIALIDADEUNIDADE',
  CREATE_ESPECIALIDADEUNIDADE: 'especialidadeUnidade/CREATE_ESPECIALIDADEUNIDADE',
  UPDATE_ESPECIALIDADEUNIDADE: 'especialidadeUnidade/UPDATE_ESPECIALIDADEUNIDADE',
  DELETE_ESPECIALIDADEUNIDADE: 'especialidadeUnidade/DELETE_ESPECIALIDADEUNIDADE',
  RESET: 'especialidadeUnidade/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IEspecialidadeUnidade>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type EspecialidadeUnidadeState = Readonly<typeof initialState>;

export interface IEspecialidadeUnidadeBaseState {
  baseFilters: any;
  valorBaixaUrg: any;
  valorAltaUrg: any;
  valorPagar: any;
  publicar: any;
  comentarioPreco: any;
  unidade: any;
}

export interface IEspecialidadeUnidadeUpdateState {
  fieldsBase: IEspecialidadeUnidadeBaseState;

  unidadeEasySelectValue: any;
  isNew: boolean;
  unidadeId: string;
}

// Reducer

export default (state: EspecialidadeUnidadeState = initialState, action): EspecialidadeUnidadeState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_ESPECIALIDADEUNIDADE_LIST_EXPORT):
    case REQUEST(ACTION_TYPES.FETCH_ESPECIALIDADEUNIDADE_LIST):
    case REQUEST(ACTION_TYPES.FETCH_ESPECIALIDADEUNIDADE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_ESPECIALIDADEUNIDADE):
    case REQUEST(ACTION_TYPES.UPDATE_ESPECIALIDADEUNIDADE):
    case REQUEST(ACTION_TYPES.DELETE_ESPECIALIDADEUNIDADE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_ESPECIALIDADEUNIDADE_LIST_EXPORT):
    case FAILURE(ACTION_TYPES.FETCH_ESPECIALIDADEUNIDADE_LIST):
    case FAILURE(ACTION_TYPES.FETCH_ESPECIALIDADEUNIDADE):
    case FAILURE(ACTION_TYPES.CREATE_ESPECIALIDADEUNIDADE):
    case FAILURE(ACTION_TYPES.UPDATE_ESPECIALIDADEUNIDADE):
    case FAILURE(ACTION_TYPES.DELETE_ESPECIALIDADEUNIDADE):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_ESPECIALIDADEUNIDADE_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10)
      };
    case SUCCESS(ACTION_TYPES.FETCH_ESPECIALIDADEUNIDADE):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_ESPECIALIDADEUNIDADE):
    case SUCCESS(ACTION_TYPES.UPDATE_ESPECIALIDADEUNIDADE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_ESPECIALIDADEUNIDADE):
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

const apiUrl = 'api/especialidade-unidades';

// Actions

// Actions
export type ICrudGetAllActionEspecialidadeUnidade<T> = (
  valorBaixaUrg?: any,
  valorAltaUrg?: any,
  valorPagar?: any,
  publicar?: any,
  comentarioPreco?: any,
  unidade?: any,
  page?: number,
  size?: number,
  sort?: string
) => IPayload<T> | ((dispatch: any) => IPayload<T>);

export const getEntities: ICrudGetAllActionEspecialidadeUnidade<IEspecialidadeUnidade> = (
  valorBaixaUrg,
  valorAltaUrg,
  valorPagar,
  publicar,
  comentarioPreco,
  unidade,
  page,
  size,
  sort
) => {
  const valorBaixaUrgRequest = valorBaixaUrg ? `valorBaixaUrg.contains=${valorBaixaUrg}&` : '';
  const valorAltaUrgRequest = valorAltaUrg ? `valorAltaUrg.contains=${valorAltaUrg}&` : '';
  const valorPagarRequest = valorPagar ? `valorPagar.contains=${valorPagar}&` : '';
  const publicarRequest = publicar ? `publicar.contains=${publicar}&` : '';
  const comentarioPrecoRequest = comentarioPreco ? `comentarioPreco.contains=${comentarioPreco}&` : '';
  const unidadeRequest = unidade ? `unidade.equals=${unidade}&` : '';

  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}&` : '?'}`;
  return {
    type: ACTION_TYPES.FETCH_ESPECIALIDADEUNIDADE_LIST,
    payload: axios.get<IEspecialidadeUnidade>(
      `${requestUrl}${valorBaixaUrgRequest}${valorAltaUrgRequest}${valorPagarRequest}${publicarRequest}${comentarioPrecoRequest}${unidadeRequest}cacheBuster=${new Date().getTime()}`
    )
  };
};
export const getEntity: ICrudGetAction<IEspecialidadeUnidade> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_ESPECIALIDADEUNIDADE,
    payload: axios.get<IEspecialidadeUnidade>(requestUrl)
  };
};

export const getEntitiesExport: ICrudGetAllActionEspecialidadeUnidade<IEspecialidadeUnidade> = (
  valorBaixaUrg,
  valorAltaUrg,
  valorPagar,
  publicar,
  comentarioPreco,
  unidade,
  page,
  size,
  sort
) => {
  const valorBaixaUrgRequest = valorBaixaUrg ? `valorBaixaUrg.contains=${valorBaixaUrg}&` : '';
  const valorAltaUrgRequest = valorAltaUrg ? `valorAltaUrg.contains=${valorAltaUrg}&` : '';
  const valorPagarRequest = valorPagar ? `valorPagar.contains=${valorPagar}&` : '';
  const publicarRequest = publicar ? `publicar.contains=${publicar}&` : '';
  const comentarioPrecoRequest = comentarioPreco ? `comentarioPreco.contains=${comentarioPreco}&` : '';
  const unidadeRequest = unidade ? `unidade.equals=${unidade}&` : '';

  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}&` : '?'}`;
  return {
    type: ACTION_TYPES.FETCH_ESPECIALIDADEUNIDADE_LIST,
    payload: axios.get<IEspecialidadeUnidade>(
      `${requestUrl}${valorBaixaUrgRequest}${valorAltaUrgRequest}${valorPagarRequest}${publicarRequest}${comentarioPrecoRequest}${unidadeRequest}cacheBuster=${new Date().getTime()}`
    )
  };
};

export const createEntity: ICrudPutAction<IEspecialidadeUnidade> = entity => async dispatch => {
  entity = {
    ...entity,
    unidade: entity.unidade === 'null' ? null : entity.unidade
  };
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_ESPECIALIDADEUNIDADE,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IEspecialidadeUnidade> = entity => async dispatch => {
  entity = { ...entity, unidade: entity.unidade === 'null' ? null : entity.unidade };
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_ESPECIALIDADEUNIDADE,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IEspecialidadeUnidade> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_ESPECIALIDADEUNIDADE,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});

export const getEspecialidadeUnidadeState = (location): IEspecialidadeUnidadeBaseState => {
  const url = new URL(`http://localhost${location.search}`); // using a dummy url for parsing
  const baseFilters = url.searchParams.get('baseFilters') || '';
  const valorBaixaUrg = url.searchParams.get('valorBaixaUrg') || '';
  const valorAltaUrg = url.searchParams.get('valorAltaUrg') || '';
  const valorPagar = url.searchParams.get('valorPagar') || '';
  const publicar = url.searchParams.get('publicar') || '';
  const comentarioPreco = url.searchParams.get('comentarioPreco') || '';

  const unidade = url.searchParams.get('unidade') || '';

  return {
    baseFilters,
    valorBaixaUrg,
    valorAltaUrg,
    valorPagar,
    publicar,
    comentarioPreco,
    unidade
  };
};
