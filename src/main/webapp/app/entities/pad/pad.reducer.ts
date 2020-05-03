/* eslint complexity: ["error", 100] */
import axios from 'axios';
import { ICrudGetAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { IPayload } from 'react-jhipster/src/type/redux-action.type';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IPad, defaultValue } from 'app/shared/model/pad.model';

export const ACTION_TYPES = {
  FETCH_PAD_LIST: 'pad/FETCH_PAD_LIST',
  FETCH_PAD: 'pad/FETCH_PAD',
  CREATE_PAD: 'pad/CREATE_PAD',
  UPDATE_PAD: 'pad/UPDATE_PAD',
  DELETE_PAD: 'pad/DELETE_PAD',
  RESET: 'pad/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IPad>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type PadState = Readonly<typeof initialState>;

// Reducer

export default (state: PadState = initialState, action): PadState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_PAD_LIST):
    case REQUEST(ACTION_TYPES.FETCH_PAD):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_PAD):
    case REQUEST(ACTION_TYPES.UPDATE_PAD):
    case REQUEST(ACTION_TYPES.DELETE_PAD):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_PAD_LIST):
    case FAILURE(ACTION_TYPES.FETCH_PAD):
    case FAILURE(ACTION_TYPES.CREATE_PAD):
    case FAILURE(ACTION_TYPES.UPDATE_PAD):
    case FAILURE(ACTION_TYPES.DELETE_PAD):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_PAD_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10)
      };
    case SUCCESS(ACTION_TYPES.FETCH_PAD):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_PAD):
    case SUCCESS(ACTION_TYPES.UPDATE_PAD):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_PAD):
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

const apiUrl = 'api/pads';

// Actions

// Actions
export type ICrudGetAllActionPad<T> = (
  idOperadora?: any,
  idFranquia?: any,
  nroPad?: any,
  dataInicio?: any,
  dataFim?: any,
  dataConferido?: any,
  ativo?: any,
  idUsuario?: any,
  statusPad?: any,
  novoModelo?: any,
  imagePath?: any,
  score?: any,
  padCid?: any,
  padItem?: any,
  unidade?: any,
  idPaciente?: any,
  page?: number,
  size?: number,
  sort?: string
) => IPayload<T> | ((dispatch: any) => IPayload<T>);

export const getEntities: ICrudGetAllActionPad<IPad> = (
  idOperadora,
  idFranquia,
  nroPad,
  dataInicio,
  dataFim,
  dataConferido,
  ativo,
  idUsuario,
  statusPad,
  novoModelo,
  imagePath,
  score,
  padCid,
  padItem,
  unidade,
  idPaciente,
  page,
  size,
  sort
) => {
  const idOperadoraRequest = idOperadora ? `idOperadora.contains=${idOperadora}&` : '';
  const idFranquiaRequest = idFranquia ? `idFranquia.contains=${idFranquia}&` : '';
  const nroPadRequest = nroPad ? `nroPad.contains=${nroPad}&` : '';
  const dataInicioRequest = dataInicio ? `dataInicio.equals=${dataInicio}&` : '';
  const dataFimRequest = dataFim ? `dataFim.equals=${dataFim}&` : '';
  const dataConferidoRequest = dataConferido ? `dataConferido.equals=${dataConferido}&` : '';
  const ativoRequest = ativo ? `ativo.contains=${ativo}&` : '';
  const idUsuarioRequest = idUsuario ? `idUsuario.contains=${idUsuario}&` : '';
  const statusPadRequest = statusPad ? `statusPad.contains=${statusPad}&` : '';
  const novoModeloRequest = novoModelo ? `novoModelo.contains=${novoModelo}&` : '';
  const imagePathRequest = imagePath ? `imagePath.contains=${imagePath}&` : '';
  const scoreRequest = score ? `score.contains=${score}&` : '';
  const padCidRequest = padCid ? `padCid.equals=${padCid}&` : '';
  const padItemRequest = padItem ? `padItem.equals=${padItem}&` : '';
  const unidadeRequest = unidade ? `unidade.equals=${unidade}&` : '';
  const idPacienteRequest = idPaciente ? `idPaciente.equals=${idPaciente}&` : '';

  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}&` : '?'}`;
  return {
    type: ACTION_TYPES.FETCH_PAD_LIST,
    payload: axios.get<IPad>(
      `${requestUrl}${idOperadoraRequest}${idFranquiaRequest}${nroPadRequest}${dataInicioRequest}${dataFimRequest}${dataConferidoRequest}${ativoRequest}${idUsuarioRequest}${statusPadRequest}${novoModeloRequest}${imagePathRequest}${scoreRequest}${padCidRequest}${padItemRequest}${unidadeRequest}${idPacienteRequest}cacheBuster=${new Date().getTime()}`
    )
  };
};
export const getEntity: ICrudGetAction<IPad> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_PAD,
    payload: axios.get<IPad>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IPad> = entity => async dispatch => {
  entity = {
    ...entity,
    unidade: entity.unidade === 'null' ? null : entity.unidade,
    idPaciente: entity.idPaciente === 'null' ? null : entity.idPaciente
  };
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_PAD,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IPad> = entity => async dispatch => {
  entity = {
    ...entity,
    unidade: entity.unidade === 'null' ? null : entity.unidade,
    idPaciente: entity.idPaciente === 'null' ? null : entity.idPaciente
  };
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_PAD,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IPad> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_PAD,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
