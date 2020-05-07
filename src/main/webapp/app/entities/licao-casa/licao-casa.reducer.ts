/* eslint complexity: ["error", 100] */
import axios from 'axios';
import { ICrudGetAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { IPayload } from 'react-jhipster/src/type/redux-action.type';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { ILicaoCasa, defaultValue } from 'app/shared/model/licao-casa.model';

export const ACTION_TYPES = {
  FETCH_LICAOCASA_LIST_EXPORT: 'licaoCasa/FETCH_LICAOCASA_LIST_EXPORT',
  FETCH_LICAOCASA_LIST: 'licaoCasa/FETCH_LICAOCASA_LIST',
  FETCH_LICAOCASA: 'licaoCasa/FETCH_LICAOCASA',
  CREATE_LICAOCASA: 'licaoCasa/CREATE_LICAOCASA',
  UPDATE_LICAOCASA: 'licaoCasa/UPDATE_LICAOCASA',
  DELETE_LICAOCASA: 'licaoCasa/DELETE_LICAOCASA',
  RESET: 'licaoCasa/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<ILicaoCasa>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type LicaoCasaState = Readonly<typeof initialState>;

export interface ILicaoCasaBaseState {
  baseFilters: any;
  atendimentoId: any;
  pacienteId: any;
  profissionalId: any;
  atividade: any;
  horaInicio: any;
  repeticaoHoras: any;
  qtdDias: any;
  intervaloDias: any;
  criadoEm: any;
  concluidaEm: any;
  ativo: any;
  ativ: any;
  forma: any;
  enviarPara: any;
  notificarFamiliar: any;
  replicarAtividade: any;
}

export interface ILicaoCasaUpdateState {
  fieldsBase: ILicaoCasaBaseState;
  isNew: boolean;
}

// Reducer

export default (state: LicaoCasaState = initialState, action): LicaoCasaState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_LICAOCASA_LIST_EXPORT):
    case REQUEST(ACTION_TYPES.FETCH_LICAOCASA_LIST):
    case REQUEST(ACTION_TYPES.FETCH_LICAOCASA):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_LICAOCASA):
    case REQUEST(ACTION_TYPES.UPDATE_LICAOCASA):
    case REQUEST(ACTION_TYPES.DELETE_LICAOCASA):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_LICAOCASA_LIST_EXPORT):
    case FAILURE(ACTION_TYPES.FETCH_LICAOCASA_LIST):
    case FAILURE(ACTION_TYPES.FETCH_LICAOCASA):
    case FAILURE(ACTION_TYPES.CREATE_LICAOCASA):
    case FAILURE(ACTION_TYPES.UPDATE_LICAOCASA):
    case FAILURE(ACTION_TYPES.DELETE_LICAOCASA):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_LICAOCASA_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10)
      };
    case SUCCESS(ACTION_TYPES.FETCH_LICAOCASA):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_LICAOCASA):
    case SUCCESS(ACTION_TYPES.UPDATE_LICAOCASA):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_LICAOCASA):
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

const apiUrl = 'api/licao-casas';

// Actions

// Actions
export type ICrudGetAllActionLicaoCasa<T> = (
  atendimentoId?: any,
  pacienteId?: any,
  profissionalId?: any,
  atividade?: any,
  horaInicio?: any,
  repeticaoHoras?: any,
  qtdDias?: any,
  intervaloDias?: any,
  criadoEm?: any,
  concluidaEm?: any,
  ativo?: any,
  ativ?: any,
  forma?: any,
  enviarPara?: any,
  notificarFamiliar?: any,
  replicarAtividade?: any,
  page?: number,
  size?: number,
  sort?: string
) => IPayload<T> | ((dispatch: any) => IPayload<T>);

export const getEntities: ICrudGetAllActionLicaoCasa<ILicaoCasa> = (
  atendimentoId,
  pacienteId,
  profissionalId,
  atividade,
  horaInicio,
  repeticaoHoras,
  qtdDias,
  intervaloDias,
  criadoEm,
  concluidaEm,
  ativo,
  ativ,
  forma,
  enviarPara,
  notificarFamiliar,
  replicarAtividade,
  page,
  size,
  sort
) => {
  const atendimentoIdRequest = atendimentoId ? `atendimentoId.contains=${atendimentoId}&` : '';
  const pacienteIdRequest = pacienteId ? `pacienteId.contains=${pacienteId}&` : '';
  const profissionalIdRequest = profissionalId ? `profissionalId.contains=${profissionalId}&` : '';
  const atividadeRequest = atividade ? `atividade.contains=${atividade}&` : '';
  const horaInicioRequest = horaInicio ? `horaInicio.contains=${horaInicio}&` : '';
  const repeticaoHorasRequest = repeticaoHoras ? `repeticaoHoras.contains=${repeticaoHoras}&` : '';
  const qtdDiasRequest = qtdDias ? `qtdDias.contains=${qtdDias}&` : '';
  const intervaloDiasRequest = intervaloDias ? `intervaloDias.contains=${intervaloDias}&` : '';
  const criadoEmRequest = criadoEm ? `criadoEm.contains=${criadoEm}&` : '';
  const concluidaEmRequest = concluidaEm ? `concluidaEm.contains=${concluidaEm}&` : '';
  const ativoRequest = ativo ? `ativo.contains=${ativo}&` : '';
  const ativRequest = ativ ? `ativ.contains=${ativ}&` : '';
  const formaRequest = forma ? `forma.contains=${forma}&` : '';
  const enviarParaRequest = enviarPara ? `enviarPara.contains=${enviarPara}&` : '';
  const notificarFamiliarRequest = notificarFamiliar ? `notificarFamiliar.contains=${notificarFamiliar}&` : '';
  const replicarAtividadeRequest = replicarAtividade ? `replicarAtividade.contains=${replicarAtividade}&` : '';

  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}&` : '?'}`;
  return {
    type: ACTION_TYPES.FETCH_LICAOCASA_LIST,
    payload: axios.get<ILicaoCasa>(
      `${requestUrl}${atendimentoIdRequest}${pacienteIdRequest}${profissionalIdRequest}${atividadeRequest}${horaInicioRequest}${repeticaoHorasRequest}${qtdDiasRequest}${intervaloDiasRequest}${criadoEmRequest}${concluidaEmRequest}${ativoRequest}${ativRequest}${formaRequest}${enviarParaRequest}${notificarFamiliarRequest}${replicarAtividadeRequest}cacheBuster=${new Date().getTime()}`
    )
  };
};
export const getEntity: ICrudGetAction<ILicaoCasa> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_LICAOCASA,
    payload: axios.get<ILicaoCasa>(requestUrl)
  };
};

export const getEntitiesExport: ICrudGetAllActionLicaoCasa<ILicaoCasa> = (
  atendimentoId,
  pacienteId,
  profissionalId,
  atividade,
  horaInicio,
  repeticaoHoras,
  qtdDias,
  intervaloDias,
  criadoEm,
  concluidaEm,
  ativo,
  ativ,
  forma,
  enviarPara,
  notificarFamiliar,
  replicarAtividade,
  page,
  size,
  sort
) => {
  const atendimentoIdRequest = atendimentoId ? `atendimentoId.contains=${atendimentoId}&` : '';
  const pacienteIdRequest = pacienteId ? `pacienteId.contains=${pacienteId}&` : '';
  const profissionalIdRequest = profissionalId ? `profissionalId.contains=${profissionalId}&` : '';
  const atividadeRequest = atividade ? `atividade.contains=${atividade}&` : '';
  const horaInicioRequest = horaInicio ? `horaInicio.contains=${horaInicio}&` : '';
  const repeticaoHorasRequest = repeticaoHoras ? `repeticaoHoras.contains=${repeticaoHoras}&` : '';
  const qtdDiasRequest = qtdDias ? `qtdDias.contains=${qtdDias}&` : '';
  const intervaloDiasRequest = intervaloDias ? `intervaloDias.contains=${intervaloDias}&` : '';
  const criadoEmRequest = criadoEm ? `criadoEm.contains=${criadoEm}&` : '';
  const concluidaEmRequest = concluidaEm ? `concluidaEm.contains=${concluidaEm}&` : '';
  const ativoRequest = ativo ? `ativo.contains=${ativo}&` : '';
  const ativRequest = ativ ? `ativ.contains=${ativ}&` : '';
  const formaRequest = forma ? `forma.contains=${forma}&` : '';
  const enviarParaRequest = enviarPara ? `enviarPara.contains=${enviarPara}&` : '';
  const notificarFamiliarRequest = notificarFamiliar ? `notificarFamiliar.contains=${notificarFamiliar}&` : '';
  const replicarAtividadeRequest = replicarAtividade ? `replicarAtividade.contains=${replicarAtividade}&` : '';

  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}&` : '?'}`;
  return {
    type: ACTION_TYPES.FETCH_LICAOCASA_LIST,
    payload: axios.get<ILicaoCasa>(
      `${requestUrl}${atendimentoIdRequest}${pacienteIdRequest}${profissionalIdRequest}${atividadeRequest}${horaInicioRequest}${repeticaoHorasRequest}${qtdDiasRequest}${intervaloDiasRequest}${criadoEmRequest}${concluidaEmRequest}${ativoRequest}${ativRequest}${formaRequest}${enviarParaRequest}${notificarFamiliarRequest}${replicarAtividadeRequest}cacheBuster=${new Date().getTime()}`
    )
  };
};

export const createEntity: ICrudPutAction<ILicaoCasa> = entity => async dispatch => {
  entity = {
    ...entity
  };
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_LICAOCASA,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<ILicaoCasa> = entity => async dispatch => {
  entity = { ...entity };
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_LICAOCASA,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<ILicaoCasa> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_LICAOCASA,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});

export const getLicaoCasaState = (location): ILicaoCasaBaseState => {
  const url = new URL(`http://localhost${location.search}`); // using a dummy url for parsing
  const baseFilters = url.searchParams.get('baseFilters') || '';
  const atendimentoId = url.searchParams.get('atendimentoId') || '';
  const pacienteId = url.searchParams.get('pacienteId') || '';
  const profissionalId = url.searchParams.get('profissionalId') || '';
  const atividade = url.searchParams.get('atividade') || '';
  const horaInicio = url.searchParams.get('horaInicio') || '';
  const repeticaoHoras = url.searchParams.get('repeticaoHoras') || '';
  const qtdDias = url.searchParams.get('qtdDias') || '';
  const intervaloDias = url.searchParams.get('intervaloDias') || '';
  const criadoEm = url.searchParams.get('criadoEm') || '';
  const concluidaEm = url.searchParams.get('concluidaEm') || '';
  const ativo = url.searchParams.get('ativo') || '';
  const ativ = url.searchParams.get('ativ') || '';
  const forma = url.searchParams.get('forma') || '';
  const enviarPara = url.searchParams.get('enviarPara') || '';
  const notificarFamiliar = url.searchParams.get('notificarFamiliar') || '';
  const replicarAtividade = url.searchParams.get('replicarAtividade') || '';

  return {
    baseFilters,
    atendimentoId,
    pacienteId,
    profissionalId,
    atividade,
    horaInicio,
    repeticaoHoras,
    qtdDias,
    intervaloDias,
    criadoEm,
    concluidaEm,
    ativo,
    ativ,
    forma,
    enviarPara,
    notificarFamiliar,
    replicarAtividade
  };
};
