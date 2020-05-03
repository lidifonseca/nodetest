/* eslint complexity: ["error", 100] */
import axios from 'axios';
import { ICrudGetAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { IPayload } from 'react-jhipster/src/type/redux-action.type';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { INotificacaoConfig, defaultValue } from 'app/shared/model/notificacao-config.model';

export const ACTION_TYPES = {
  FETCH_NOTIFICACAOCONFIG_LIST: 'notificacaoConfig/FETCH_NOTIFICACAOCONFIG_LIST',
  FETCH_NOTIFICACAOCONFIG: 'notificacaoConfig/FETCH_NOTIFICACAOCONFIG',
  CREATE_NOTIFICACAOCONFIG: 'notificacaoConfig/CREATE_NOTIFICACAOCONFIG',
  UPDATE_NOTIFICACAOCONFIG: 'notificacaoConfig/UPDATE_NOTIFICACAOCONFIG',
  DELETE_NOTIFICACAOCONFIG: 'notificacaoConfig/DELETE_NOTIFICACAOCONFIG',
  SET_BLOB: 'notificacaoConfig/SET_BLOB',
  RESET: 'notificacaoConfig/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<INotificacaoConfig>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type NotificacaoConfigState = Readonly<typeof initialState>;

// Reducer

export default (state: NotificacaoConfigState = initialState, action): NotificacaoConfigState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_NOTIFICACAOCONFIG_LIST):
    case REQUEST(ACTION_TYPES.FETCH_NOTIFICACAOCONFIG):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_NOTIFICACAOCONFIG):
    case REQUEST(ACTION_TYPES.UPDATE_NOTIFICACAOCONFIG):
    case REQUEST(ACTION_TYPES.DELETE_NOTIFICACAOCONFIG):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_NOTIFICACAOCONFIG_LIST):
    case FAILURE(ACTION_TYPES.FETCH_NOTIFICACAOCONFIG):
    case FAILURE(ACTION_TYPES.CREATE_NOTIFICACAOCONFIG):
    case FAILURE(ACTION_TYPES.UPDATE_NOTIFICACAOCONFIG):
    case FAILURE(ACTION_TYPES.DELETE_NOTIFICACAOCONFIG):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_NOTIFICACAOCONFIG_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10)
      };
    case SUCCESS(ACTION_TYPES.FETCH_NOTIFICACAOCONFIG):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_NOTIFICACAOCONFIG):
    case SUCCESS(ACTION_TYPES.UPDATE_NOTIFICACAOCONFIG):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_NOTIFICACAOCONFIG):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {}
      };
    case ACTION_TYPES.SET_BLOB: {
      const { name, data, contentType } = action.payload;
      return {
        ...state,
        entity: {
          ...state.entity,
          [name]: data,
          [name + 'ContentType']: contentType
        }
      };
    }
    case ACTION_TYPES.RESET:
      return {
        ...initialState
      };
    default:
      return state;
  }
};

const apiUrl = 'api/notificacao-configs';

// Actions

// Actions
export type ICrudGetAllActionNotificacaoConfig<T> = (
  criadoEm?: any,
  titulo?: any,
  referencia?: any,
  descricao?: any,
  ativo?: any,
  envioObrigatorio?: any,
  serveProfissional?: any,
  servePaciente?: any,
  page?: number,
  size?: number,
  sort?: string
) => IPayload<T> | ((dispatch: any) => IPayload<T>);

export const getEntities: ICrudGetAllActionNotificacaoConfig<INotificacaoConfig> = (
  criadoEm,
  titulo,
  referencia,
  descricao,
  ativo,
  envioObrigatorio,
  serveProfissional,
  servePaciente,
  page,
  size,
  sort
) => {
  const criadoEmRequest = criadoEm ? `criadoEm.contains=${criadoEm}&` : '';
  const tituloRequest = titulo ? `titulo.contains=${titulo}&` : '';
  const referenciaRequest = referencia ? `referencia.contains=${referencia}&` : '';
  const descricaoRequest = descricao ? `descricao.contains=${descricao}&` : '';
  const ativoRequest = ativo ? `ativo.contains=${ativo}&` : '';
  const envioObrigatorioRequest = envioObrigatorio ? `envioObrigatorio.contains=${envioObrigatorio}&` : '';
  const serveProfissionalRequest = serveProfissional ? `serveProfissional.contains=${serveProfissional}&` : '';
  const servePacienteRequest = servePaciente ? `servePaciente.contains=${servePaciente}&` : '';

  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}&` : '?'}`;
  return {
    type: ACTION_TYPES.FETCH_NOTIFICACAOCONFIG_LIST,
    payload: axios.get<INotificacaoConfig>(
      `${requestUrl}${criadoEmRequest}${tituloRequest}${referenciaRequest}${descricaoRequest}${ativoRequest}${envioObrigatorioRequest}${serveProfissionalRequest}${servePacienteRequest}cacheBuster=${new Date().getTime()}`
    )
  };
};
export const getEntity: ICrudGetAction<INotificacaoConfig> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_NOTIFICACAOCONFIG,
    payload: axios.get<INotificacaoConfig>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<INotificacaoConfig> = entity => async dispatch => {
  entity = {
    ...entity
  };
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_NOTIFICACAOCONFIG,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<INotificacaoConfig> = entity => async dispatch => {
  entity = { ...entity };
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_NOTIFICACAOCONFIG,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<INotificacaoConfig> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_NOTIFICACAOCONFIG,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const setBlob = (name, data, contentType?) => ({
  type: ACTION_TYPES.SET_BLOB,
  payload: {
    name,
    data,
    contentType
  }
});

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
