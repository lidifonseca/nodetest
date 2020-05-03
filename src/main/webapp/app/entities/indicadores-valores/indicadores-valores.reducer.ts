/* eslint complexity: ["error", 100] */
import axios from 'axios';
import { ICrudGetAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { IPayload } from 'react-jhipster/src/type/redux-action.type';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IIndicadoresValores, defaultValue } from 'app/shared/model/indicadores-valores.model';

export const ACTION_TYPES = {
  FETCH_INDICADORESVALORES_LIST: 'indicadoresValores/FETCH_INDICADORESVALORES_LIST',
  FETCH_INDICADORESVALORES: 'indicadoresValores/FETCH_INDICADORESVALORES',
  CREATE_INDICADORESVALORES: 'indicadoresValores/CREATE_INDICADORESVALORES',
  UPDATE_INDICADORESVALORES: 'indicadoresValores/UPDATE_INDICADORESVALORES',
  DELETE_INDICADORESVALORES: 'indicadoresValores/DELETE_INDICADORESVALORES',
  RESET: 'indicadoresValores/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IIndicadoresValores>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type IndicadoresValoresState = Readonly<typeof initialState>;

// Reducer

export default (state: IndicadoresValoresState = initialState, action): IndicadoresValoresState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_INDICADORESVALORES_LIST):
    case REQUEST(ACTION_TYPES.FETCH_INDICADORESVALORES):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_INDICADORESVALORES):
    case REQUEST(ACTION_TYPES.UPDATE_INDICADORESVALORES):
    case REQUEST(ACTION_TYPES.DELETE_INDICADORESVALORES):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_INDICADORESVALORES_LIST):
    case FAILURE(ACTION_TYPES.FETCH_INDICADORESVALORES):
    case FAILURE(ACTION_TYPES.CREATE_INDICADORESVALORES):
    case FAILURE(ACTION_TYPES.UPDATE_INDICADORESVALORES):
    case FAILURE(ACTION_TYPES.DELETE_INDICADORESVALORES):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_INDICADORESVALORES_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10)
      };
    case SUCCESS(ACTION_TYPES.FETCH_INDICADORESVALORES):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_INDICADORESVALORES):
    case SUCCESS(ACTION_TYPES.UPDATE_INDICADORESVALORES):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_INDICADORESVALORES):
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

const apiUrl = 'api/indicadores-valores';

// Actions

// Actions
export type ICrudGetAllActionIndicadoresValores<T> = (
  sexo?: any,
  vlMinimo?: any,
  vlMaximo?: any,
  unidadeMedida?: any,
  idadeMinima?: any,
  idadeMaxima?: any,
  indicadoresId?: any,
  page?: number,
  size?: number,
  sort?: string
) => IPayload<T> | ((dispatch: any) => IPayload<T>);

export const getEntities: ICrudGetAllActionIndicadoresValores<IIndicadoresValores> = (
  sexo,
  vlMinimo,
  vlMaximo,
  unidadeMedida,
  idadeMinima,
  idadeMaxima,
  indicadoresId,
  page,
  size,
  sort
) => {
  const sexoRequest = sexo ? `sexo.contains=${sexo}&` : '';
  const vlMinimoRequest = vlMinimo ? `vlMinimo.contains=${vlMinimo}&` : '';
  const vlMaximoRequest = vlMaximo ? `vlMaximo.contains=${vlMaximo}&` : '';
  const unidadeMedidaRequest = unidadeMedida ? `unidadeMedida.contains=${unidadeMedida}&` : '';
  const idadeMinimaRequest = idadeMinima ? `idadeMinima.contains=${idadeMinima}&` : '';
  const idadeMaximaRequest = idadeMaxima ? `idadeMaxima.contains=${idadeMaxima}&` : '';
  const indicadoresIdRequest = indicadoresId ? `indicadoresId.equals=${indicadoresId}&` : '';

  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}&` : '?'}`;
  return {
    type: ACTION_TYPES.FETCH_INDICADORESVALORES_LIST,
    payload: axios.get<IIndicadoresValores>(
      `${requestUrl}${sexoRequest}${vlMinimoRequest}${vlMaximoRequest}${unidadeMedidaRequest}${idadeMinimaRequest}${idadeMaximaRequest}${indicadoresIdRequest}cacheBuster=${new Date().getTime()}`
    )
  };
};
export const getEntity: ICrudGetAction<IIndicadoresValores> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_INDICADORESVALORES,
    payload: axios.get<IIndicadoresValores>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IIndicadoresValores> = entity => async dispatch => {
  entity = {
    ...entity,
    indicadoresId: entity.indicadoresId === 'null' ? null : entity.indicadoresId
  };
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_INDICADORESVALORES,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IIndicadoresValores> = entity => async dispatch => {
  entity = { ...entity, indicadoresId: entity.indicadoresId === 'null' ? null : entity.indicadoresId };
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_INDICADORESVALORES,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IIndicadoresValores> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_INDICADORESVALORES,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
