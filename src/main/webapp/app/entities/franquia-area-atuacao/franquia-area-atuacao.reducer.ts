/* eslint complexity: ["error", 100] */
import axios from 'axios';
import { ICrudGetAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { IPayload } from 'react-jhipster/src/type/redux-action.type';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IFranquiaAreaAtuacao, defaultValue } from 'app/shared/model/franquia-area-atuacao.model';

export const ACTION_TYPES = {
  FETCH_FRANQUIAAREAATUACAO_LIST: 'franquiaAreaAtuacao/FETCH_FRANQUIAAREAATUACAO_LIST',
  FETCH_FRANQUIAAREAATUACAO: 'franquiaAreaAtuacao/FETCH_FRANQUIAAREAATUACAO',
  CREATE_FRANQUIAAREAATUACAO: 'franquiaAreaAtuacao/CREATE_FRANQUIAAREAATUACAO',
  UPDATE_FRANQUIAAREAATUACAO: 'franquiaAreaAtuacao/UPDATE_FRANQUIAAREAATUACAO',
  DELETE_FRANQUIAAREAATUACAO: 'franquiaAreaAtuacao/DELETE_FRANQUIAAREAATUACAO',
  RESET: 'franquiaAreaAtuacao/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IFranquiaAreaAtuacao>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type FranquiaAreaAtuacaoState = Readonly<typeof initialState>;

// Reducer

export default (state: FranquiaAreaAtuacaoState = initialState, action): FranquiaAreaAtuacaoState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_FRANQUIAAREAATUACAO_LIST):
    case REQUEST(ACTION_TYPES.FETCH_FRANQUIAAREAATUACAO):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_FRANQUIAAREAATUACAO):
    case REQUEST(ACTION_TYPES.UPDATE_FRANQUIAAREAATUACAO):
    case REQUEST(ACTION_TYPES.DELETE_FRANQUIAAREAATUACAO):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_FRANQUIAAREAATUACAO_LIST):
    case FAILURE(ACTION_TYPES.FETCH_FRANQUIAAREAATUACAO):
    case FAILURE(ACTION_TYPES.CREATE_FRANQUIAAREAATUACAO):
    case FAILURE(ACTION_TYPES.UPDATE_FRANQUIAAREAATUACAO):
    case FAILURE(ACTION_TYPES.DELETE_FRANQUIAAREAATUACAO):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_FRANQUIAAREAATUACAO_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10)
      };
    case SUCCESS(ACTION_TYPES.FETCH_FRANQUIAAREAATUACAO):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_FRANQUIAAREAATUACAO):
    case SUCCESS(ACTION_TYPES.UPDATE_FRANQUIAAREAATUACAO):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_FRANQUIAAREAATUACAO):
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

const apiUrl = 'api/franquia-area-atuacaos';

// Actions

// Actions
export type ICrudGetAllActionFranquiaAreaAtuacao<T> = (
  cepIni?: any,
  cepFim?: any,
  ativo?: any,
  idFranquia?: any,
  page?: number,
  size?: number,
  sort?: string
) => IPayload<T> | ((dispatch: any) => IPayload<T>);

export const getEntities: ICrudGetAllActionFranquiaAreaAtuacao<IFranquiaAreaAtuacao> = (
  cepIni,
  cepFim,
  ativo,
  idFranquia,
  page,
  size,
  sort
) => {
  const cepIniRequest = cepIni ? `cepIni.contains=${cepIni}&` : '';
  const cepFimRequest = cepFim ? `cepFim.contains=${cepFim}&` : '';
  const ativoRequest = ativo ? `ativo.contains=${ativo}&` : '';
  const idFranquiaRequest = idFranquia ? `idFranquia.equals=${idFranquia}&` : '';

  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}&` : '?'}`;
  return {
    type: ACTION_TYPES.FETCH_FRANQUIAAREAATUACAO_LIST,
    payload: axios.get<IFranquiaAreaAtuacao>(
      `${requestUrl}${cepIniRequest}${cepFimRequest}${ativoRequest}${idFranquiaRequest}cacheBuster=${new Date().getTime()}`
    )
  };
};
export const getEntity: ICrudGetAction<IFranquiaAreaAtuacao> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_FRANQUIAAREAATUACAO,
    payload: axios.get<IFranquiaAreaAtuacao>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IFranquiaAreaAtuacao> = entity => async dispatch => {
  entity = {
    ...entity,
    idFranquia: entity.idFranquia === 'null' ? null : entity.idFranquia
  };
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_FRANQUIAAREAATUACAO,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IFranquiaAreaAtuacao> = entity => async dispatch => {
  entity = { ...entity, idFranquia: entity.idFranquia === 'null' ? null : entity.idFranquia };
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_FRANQUIAAREAATUACAO,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IFranquiaAreaAtuacao> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_FRANQUIAAREAATUACAO,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});