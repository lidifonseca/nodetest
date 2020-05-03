/* eslint complexity: ["error", 100] */
import axios from 'axios';
import { ICrudGetAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { IPayload } from 'react-jhipster/src/type/redux-action.type';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IPacienteDispositivoAtual, defaultValue } from 'app/shared/model/paciente-dispositivo-atual.model';

export const ACTION_TYPES = {
  FETCH_PACIENTEDISPOSITIVOATUAL_LIST: 'pacienteDispositivoAtual/FETCH_PACIENTEDISPOSITIVOATUAL_LIST',
  FETCH_PACIENTEDISPOSITIVOATUAL: 'pacienteDispositivoAtual/FETCH_PACIENTEDISPOSITIVOATUAL',
  CREATE_PACIENTEDISPOSITIVOATUAL: 'pacienteDispositivoAtual/CREATE_PACIENTEDISPOSITIVOATUAL',
  UPDATE_PACIENTEDISPOSITIVOATUAL: 'pacienteDispositivoAtual/UPDATE_PACIENTEDISPOSITIVOATUAL',
  DELETE_PACIENTEDISPOSITIVOATUAL: 'pacienteDispositivoAtual/DELETE_PACIENTEDISPOSITIVOATUAL',
  RESET: 'pacienteDispositivoAtual/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IPacienteDispositivoAtual>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type PacienteDispositivoAtualState = Readonly<typeof initialState>;

// Reducer

export default (state: PacienteDispositivoAtualState = initialState, action): PacienteDispositivoAtualState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_PACIENTEDISPOSITIVOATUAL_LIST):
    case REQUEST(ACTION_TYPES.FETCH_PACIENTEDISPOSITIVOATUAL):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_PACIENTEDISPOSITIVOATUAL):
    case REQUEST(ACTION_TYPES.UPDATE_PACIENTEDISPOSITIVOATUAL):
    case REQUEST(ACTION_TYPES.DELETE_PACIENTEDISPOSITIVOATUAL):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_PACIENTEDISPOSITIVOATUAL_LIST):
    case FAILURE(ACTION_TYPES.FETCH_PACIENTEDISPOSITIVOATUAL):
    case FAILURE(ACTION_TYPES.CREATE_PACIENTEDISPOSITIVOATUAL):
    case FAILURE(ACTION_TYPES.UPDATE_PACIENTEDISPOSITIVOATUAL):
    case FAILURE(ACTION_TYPES.DELETE_PACIENTEDISPOSITIVOATUAL):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_PACIENTEDISPOSITIVOATUAL_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10)
      };
    case SUCCESS(ACTION_TYPES.FETCH_PACIENTEDISPOSITIVOATUAL):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_PACIENTEDISPOSITIVOATUAL):
    case SUCCESS(ACTION_TYPES.UPDATE_PACIENTEDISPOSITIVOATUAL):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_PACIENTEDISPOSITIVOATUAL):
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

const apiUrl = 'api/paciente-dispositivo-atuals';

// Actions

// Actions
export type ICrudGetAllActionPacienteDispositivoAtual<T> = (
  idPaciente?: any,
  idPacienteDispositivo?: any,
  tqtTraqueostomia?: any,
  gttGastrostomia?: any,
  sneSondaNasoenteral?: any,
  svdSondaVesicalDeDemora?: any,
  svaSondaVesicalDeAlivio?: any,
  portACath?: any,
  piccAcessoVenosoCentral?: any,
  ventiladores?: any,
  uppUlceraPorPressao?: any,
  avpAcessoVenosoPeriferico?: any,
  uripen?: any,
  fraldaGeriatrica?: any,
  sngSondaNasogastrica?: any,
  bipap?: any,
  cpap?: any,
  cistostomia?: any,
  cateterNasalDeOxigenio?: any,
  mascaraDeVentilacao?: any,
  entubacaoOrotraqueal?: any,
  ileostomia?: any,
  jejunostomia?: any,
  colostomia?: any,
  idUsuario?: any,
  page?: number,
  size?: number,
  sort?: string
) => IPayload<T> | ((dispatch: any) => IPayload<T>);

export const getEntities: ICrudGetAllActionPacienteDispositivoAtual<IPacienteDispositivoAtual> = (
  idPaciente,
  idPacienteDispositivo,
  tqtTraqueostomia,
  gttGastrostomia,
  sneSondaNasoenteral,
  svdSondaVesicalDeDemora,
  svaSondaVesicalDeAlivio,
  portACath,
  piccAcessoVenosoCentral,
  ventiladores,
  uppUlceraPorPressao,
  avpAcessoVenosoPeriferico,
  uripen,
  fraldaGeriatrica,
  sngSondaNasogastrica,
  bipap,
  cpap,
  cistostomia,
  cateterNasalDeOxigenio,
  mascaraDeVentilacao,
  entubacaoOrotraqueal,
  ileostomia,
  jejunostomia,
  colostomia,
  idUsuario,
  page,
  size,
  sort
) => {
  const idPacienteRequest = idPaciente ? `idPaciente.contains=${idPaciente}&` : '';
  const idPacienteDispositivoRequest = idPacienteDispositivo ? `idPacienteDispositivo.contains=${idPacienteDispositivo}&` : '';
  const tqtTraqueostomiaRequest = tqtTraqueostomia ? `tqtTraqueostomia.contains=${tqtTraqueostomia}&` : '';
  const gttGastrostomiaRequest = gttGastrostomia ? `gttGastrostomia.contains=${gttGastrostomia}&` : '';
  const sneSondaNasoenteralRequest = sneSondaNasoenteral ? `sneSondaNasoenteral.contains=${sneSondaNasoenteral}&` : '';
  const svdSondaVesicalDeDemoraRequest = svdSondaVesicalDeDemora ? `svdSondaVesicalDeDemora.contains=${svdSondaVesicalDeDemora}&` : '';
  const svaSondaVesicalDeAlivioRequest = svaSondaVesicalDeAlivio ? `svaSondaVesicalDeAlivio.contains=${svaSondaVesicalDeAlivio}&` : '';
  const portACathRequest = portACath ? `portACath.contains=${portACath}&` : '';
  const piccAcessoVenosoCentralRequest = piccAcessoVenosoCentral ? `piccAcessoVenosoCentral.contains=${piccAcessoVenosoCentral}&` : '';
  const ventiladoresRequest = ventiladores ? `ventiladores.contains=${ventiladores}&` : '';
  const uppUlceraPorPressaoRequest = uppUlceraPorPressao ? `uppUlceraPorPressao.contains=${uppUlceraPorPressao}&` : '';
  const avpAcessoVenosoPerifericoRequest = avpAcessoVenosoPeriferico
    ? `avpAcessoVenosoPeriferico.contains=${avpAcessoVenosoPeriferico}&`
    : '';
  const uripenRequest = uripen ? `uripen.contains=${uripen}&` : '';
  const fraldaGeriatricaRequest = fraldaGeriatrica ? `fraldaGeriatrica.contains=${fraldaGeriatrica}&` : '';
  const sngSondaNasogastricaRequest = sngSondaNasogastrica ? `sngSondaNasogastrica.contains=${sngSondaNasogastrica}&` : '';
  const bipapRequest = bipap ? `bipap.contains=${bipap}&` : '';
  const cpapRequest = cpap ? `cpap.contains=${cpap}&` : '';
  const cistostomiaRequest = cistostomia ? `cistostomia.contains=${cistostomia}&` : '';
  const cateterNasalDeOxigenioRequest = cateterNasalDeOxigenio ? `cateterNasalDeOxigenio.contains=${cateterNasalDeOxigenio}&` : '';
  const mascaraDeVentilacaoRequest = mascaraDeVentilacao ? `mascaraDeVentilacao.contains=${mascaraDeVentilacao}&` : '';
  const entubacaoOrotraquealRequest = entubacaoOrotraqueal ? `entubacaoOrotraqueal.contains=${entubacaoOrotraqueal}&` : '';
  const ileostomiaRequest = ileostomia ? `ileostomia.contains=${ileostomia}&` : '';
  const jejunostomiaRequest = jejunostomia ? `jejunostomia.contains=${jejunostomia}&` : '';
  const colostomiaRequest = colostomia ? `colostomia.contains=${colostomia}&` : '';
  const idUsuarioRequest = idUsuario ? `idUsuario.contains=${idUsuario}&` : '';

  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}&` : '?'}`;
  return {
    type: ACTION_TYPES.FETCH_PACIENTEDISPOSITIVOATUAL_LIST,
    payload: axios.get<IPacienteDispositivoAtual>(
      `${requestUrl}${idPacienteRequest}${idPacienteDispositivoRequest}${tqtTraqueostomiaRequest}${gttGastrostomiaRequest}${sneSondaNasoenteralRequest}${svdSondaVesicalDeDemoraRequest}${svaSondaVesicalDeAlivioRequest}${portACathRequest}${piccAcessoVenosoCentralRequest}${ventiladoresRequest}${uppUlceraPorPressaoRequest}${avpAcessoVenosoPerifericoRequest}${uripenRequest}${fraldaGeriatricaRequest}${sngSondaNasogastricaRequest}${bipapRequest}${cpapRequest}${cistostomiaRequest}${cateterNasalDeOxigenioRequest}${mascaraDeVentilacaoRequest}${entubacaoOrotraquealRequest}${ileostomiaRequest}${jejunostomiaRequest}${colostomiaRequest}${idUsuarioRequest}cacheBuster=${new Date().getTime()}`
    )
  };
};
export const getEntity: ICrudGetAction<IPacienteDispositivoAtual> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_PACIENTEDISPOSITIVOATUAL,
    payload: axios.get<IPacienteDispositivoAtual>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IPacienteDispositivoAtual> = entity => async dispatch => {
  entity = {
    ...entity
  };
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_PACIENTEDISPOSITIVOATUAL,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IPacienteDispositivoAtual> = entity => async dispatch => {
  entity = { ...entity };
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_PACIENTEDISPOSITIVOATUAL,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IPacienteDispositivoAtual> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_PACIENTEDISPOSITIVOATUAL,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
