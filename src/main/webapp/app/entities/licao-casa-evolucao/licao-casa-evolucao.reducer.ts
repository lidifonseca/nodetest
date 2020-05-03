/* eslint complexity: ["error", 100] */
import axios from 'axios';
import { ICrudGetAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { IPayload } from 'react-jhipster/src/type/redux-action.type';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { ILicaoCasaEvolucao, defaultValue } from 'app/shared/model/licao-casa-evolucao.model';

export const ACTION_TYPES = {
  FETCH_LICAOCASAEVOLUCAO_LIST: 'licaoCasaEvolucao/FETCH_LICAOCASAEVOLUCAO_LIST',
  FETCH_LICAOCASAEVOLUCAO: 'licaoCasaEvolucao/FETCH_LICAOCASAEVOLUCAO',
  CREATE_LICAOCASAEVOLUCAO: 'licaoCasaEvolucao/CREATE_LICAOCASAEVOLUCAO',
  UPDATE_LICAOCASAEVOLUCAO: 'licaoCasaEvolucao/UPDATE_LICAOCASAEVOLUCAO',
  DELETE_LICAOCASAEVOLUCAO: 'licaoCasaEvolucao/DELETE_LICAOCASAEVOLUCAO',
  RESET: 'licaoCasaEvolucao/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<ILicaoCasaEvolucao>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type LicaoCasaEvolucaoState = Readonly<typeof initialState>;

// Reducer

export default (state: LicaoCasaEvolucaoState = initialState, action): LicaoCasaEvolucaoState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_LICAOCASAEVOLUCAO_LIST):
    case REQUEST(ACTION_TYPES.FETCH_LICAOCASAEVOLUCAO):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_LICAOCASAEVOLUCAO):
    case REQUEST(ACTION_TYPES.UPDATE_LICAOCASAEVOLUCAO):
    case REQUEST(ACTION_TYPES.DELETE_LICAOCASAEVOLUCAO):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_LICAOCASAEVOLUCAO_LIST):
    case FAILURE(ACTION_TYPES.FETCH_LICAOCASAEVOLUCAO):
    case FAILURE(ACTION_TYPES.CREATE_LICAOCASAEVOLUCAO):
    case FAILURE(ACTION_TYPES.UPDATE_LICAOCASAEVOLUCAO):
    case FAILURE(ACTION_TYPES.DELETE_LICAOCASAEVOLUCAO):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_LICAOCASAEVOLUCAO_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10)
      };
    case SUCCESS(ACTION_TYPES.FETCH_LICAOCASAEVOLUCAO):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_LICAOCASAEVOLUCAO):
    case SUCCESS(ACTION_TYPES.UPDATE_LICAOCASAEVOLUCAO):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_LICAOCASAEVOLUCAO):
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

const apiUrl = 'api/licao-casa-evolucaos';

// Actions

// Actions
export type ICrudGetAllActionLicaoCasaEvolucao<T> = (
  licaoCasaId?: any,
  atualizadoEm?: any,
  realizada?: any,
  realizadaEm?: any,
  observacoes?: any,
  instrucoes?: any,
  dataAgenda?: any,
  qtdLembrete?: any,
  page?: number,
  size?: number,
  sort?: string
) => IPayload<T> | ((dispatch: any) => IPayload<T>);

export const getEntities: ICrudGetAllActionLicaoCasaEvolucao<ILicaoCasaEvolucao> = (
  licaoCasaId,
  atualizadoEm,
  realizada,
  realizadaEm,
  observacoes,
  instrucoes,
  dataAgenda,
  qtdLembrete,
  page,
  size,
  sort
) => {
  const licaoCasaIdRequest = licaoCasaId ? `licaoCasaId.contains=${licaoCasaId}&` : '';
  const atualizadoEmRequest = atualizadoEm ? `atualizadoEm.contains=${atualizadoEm}&` : '';
  const realizadaRequest = realizada ? `realizada.contains=${realizada}&` : '';
  const realizadaEmRequest = realizadaEm ? `realizadaEm.contains=${realizadaEm}&` : '';
  const observacoesRequest = observacoes ? `observacoes.contains=${observacoes}&` : '';
  const instrucoesRequest = instrucoes ? `instrucoes.contains=${instrucoes}&` : '';
  const dataAgendaRequest = dataAgenda ? `dataAgenda.contains=${dataAgenda}&` : '';
  const qtdLembreteRequest = qtdLembrete ? `qtdLembrete.contains=${qtdLembrete}&` : '';

  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}&` : '?'}`;
  return {
    type: ACTION_TYPES.FETCH_LICAOCASAEVOLUCAO_LIST,
    payload: axios.get<ILicaoCasaEvolucao>(
      `${requestUrl}${licaoCasaIdRequest}${atualizadoEmRequest}${realizadaRequest}${realizadaEmRequest}${observacoesRequest}${instrucoesRequest}${dataAgendaRequest}${qtdLembreteRequest}cacheBuster=${new Date().getTime()}`
    )
  };
};
export const getEntity: ICrudGetAction<ILicaoCasaEvolucao> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_LICAOCASAEVOLUCAO,
    payload: axios.get<ILicaoCasaEvolucao>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<ILicaoCasaEvolucao> = entity => async dispatch => {
  entity = {
    ...entity
  };
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_LICAOCASAEVOLUCAO,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<ILicaoCasaEvolucao> = entity => async dispatch => {
  entity = { ...entity };
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_LICAOCASAEVOLUCAO,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<ILicaoCasaEvolucao> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_LICAOCASAEVOLUCAO,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
