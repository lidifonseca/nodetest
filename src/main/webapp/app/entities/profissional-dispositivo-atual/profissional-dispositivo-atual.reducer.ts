/* eslint complexity: ["error", 100] */
import axios from 'axios';
import { ICrudGetAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { IPayload } from 'react-jhipster/src/type/redux-action.type';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IProfissionalDispositivoAtual, defaultValue } from 'app/shared/model/profissional-dispositivo-atual.model';

export const ACTION_TYPES = {
  FETCH_PROFISSIONALDISPOSITIVOATUAL_LIST_EXPORT: 'profissionalDispositivoAtual/FETCH_PROFISSIONALDISPOSITIVOATUAL_LIST_EXPORT',
  FETCH_PROFISSIONALDISPOSITIVOATUAL_LIST: 'profissionalDispositivoAtual/FETCH_PROFISSIONALDISPOSITIVOATUAL_LIST',
  FETCH_PROFISSIONALDISPOSITIVOATUAL: 'profissionalDispositivoAtual/FETCH_PROFISSIONALDISPOSITIVOATUAL',
  CREATE_PROFISSIONALDISPOSITIVOATUAL: 'profissionalDispositivoAtual/CREATE_PROFISSIONALDISPOSITIVOATUAL',
  UPDATE_PROFISSIONALDISPOSITIVOATUAL: 'profissionalDispositivoAtual/UPDATE_PROFISSIONALDISPOSITIVOATUAL',
  DELETE_PROFISSIONALDISPOSITIVOATUAL: 'profissionalDispositivoAtual/DELETE_PROFISSIONALDISPOSITIVOATUAL',
  RESET: 'profissionalDispositivoAtual/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IProfissionalDispositivoAtual>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type ProfissionalDispositivoAtualState = Readonly<typeof initialState>;

export interface IProfissionalDispositivoAtualBaseState {
  baseFilters: any;
  idProfissional: any;
  tqtTraqueostomia: any;
  gttGastrostomia: any;
  sneSondaNasoenteral: any;
  svdSondaVesicalDeDemora: any;
  svaSondaVesicalDeAlivio: any;
  portACath: any;
  piccAcessoVenosoCentral: any;
  ventiladores: any;
  uppUlceraPorPressao: any;
  avpAcessoVenosoPeriferico: any;
  uripen: any;
  fraldaGeriatrica: any;
  sngSondaNasogastrica: any;
  bipap: any;
  cpap: any;
  cistostomia: any;
  cateterNasalDeOxigenio: any;
  mascaraDeVentilacao: any;
  entubacaoOrotraqueal: any;
}

export interface IProfissionalDispositivoAtualUpdateState {
  fieldsBase: IProfissionalDispositivoAtualBaseState;
  isNew: boolean;
}

// Reducer

export default (state: ProfissionalDispositivoAtualState = initialState, action): ProfissionalDispositivoAtualState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_PROFISSIONALDISPOSITIVOATUAL_LIST_EXPORT):
    case REQUEST(ACTION_TYPES.FETCH_PROFISSIONALDISPOSITIVOATUAL_LIST):
    case REQUEST(ACTION_TYPES.FETCH_PROFISSIONALDISPOSITIVOATUAL):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_PROFISSIONALDISPOSITIVOATUAL):
    case REQUEST(ACTION_TYPES.UPDATE_PROFISSIONALDISPOSITIVOATUAL):
    case REQUEST(ACTION_TYPES.DELETE_PROFISSIONALDISPOSITIVOATUAL):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_PROFISSIONALDISPOSITIVOATUAL_LIST_EXPORT):
    case FAILURE(ACTION_TYPES.FETCH_PROFISSIONALDISPOSITIVOATUAL_LIST):
    case FAILURE(ACTION_TYPES.FETCH_PROFISSIONALDISPOSITIVOATUAL):
    case FAILURE(ACTION_TYPES.CREATE_PROFISSIONALDISPOSITIVOATUAL):
    case FAILURE(ACTION_TYPES.UPDATE_PROFISSIONALDISPOSITIVOATUAL):
    case FAILURE(ACTION_TYPES.DELETE_PROFISSIONALDISPOSITIVOATUAL):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_PROFISSIONALDISPOSITIVOATUAL_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10)
      };
    case SUCCESS(ACTION_TYPES.FETCH_PROFISSIONALDISPOSITIVOATUAL):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_PROFISSIONALDISPOSITIVOATUAL):
    case SUCCESS(ACTION_TYPES.UPDATE_PROFISSIONALDISPOSITIVOATUAL):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_PROFISSIONALDISPOSITIVOATUAL):
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

const apiUrl = 'api/profissional-dispositivo-atuals';

// Actions

// Actions
export type ICrudGetAllActionProfissionalDispositivoAtual<T> = (
  idProfissional?: any,
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
  page?: number,
  size?: number,
  sort?: string
) => IPayload<T> | ((dispatch: any) => IPayload<T>);

export const getEntities: ICrudGetAllActionProfissionalDispositivoAtual<IProfissionalDispositivoAtual> = (
  idProfissional,
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
  page,
  size,
  sort
) => {
  const idProfissionalRequest = idProfissional ? `idProfissional.contains=${idProfissional}&` : '';
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

  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}&` : '?'}`;
  return {
    type: ACTION_TYPES.FETCH_PROFISSIONALDISPOSITIVOATUAL_LIST,
    payload: axios.get<IProfissionalDispositivoAtual>(
      `${requestUrl}${idProfissionalRequest}${tqtTraqueostomiaRequest}${gttGastrostomiaRequest}${sneSondaNasoenteralRequest}${svdSondaVesicalDeDemoraRequest}${svaSondaVesicalDeAlivioRequest}${portACathRequest}${piccAcessoVenosoCentralRequest}${ventiladoresRequest}${uppUlceraPorPressaoRequest}${avpAcessoVenosoPerifericoRequest}${uripenRequest}${fraldaGeriatricaRequest}${sngSondaNasogastricaRequest}${bipapRequest}${cpapRequest}${cistostomiaRequest}${cateterNasalDeOxigenioRequest}${mascaraDeVentilacaoRequest}${entubacaoOrotraquealRequest}cacheBuster=${new Date().getTime()}`
    )
  };
};
export const getEntity: ICrudGetAction<IProfissionalDispositivoAtual> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_PROFISSIONALDISPOSITIVOATUAL,
    payload: axios.get<IProfissionalDispositivoAtual>(requestUrl)
  };
};

export const getEntitiesExport: ICrudGetAllActionProfissionalDispositivoAtual<IProfissionalDispositivoAtual> = (
  idProfissional,
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
  page,
  size,
  sort
) => {
  const idProfissionalRequest = idProfissional ? `idProfissional.contains=${idProfissional}&` : '';
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

  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}&` : '?'}`;
  return {
    type: ACTION_TYPES.FETCH_PROFISSIONALDISPOSITIVOATUAL_LIST,
    payload: axios.get<IProfissionalDispositivoAtual>(
      `${requestUrl}${idProfissionalRequest}${tqtTraqueostomiaRequest}${gttGastrostomiaRequest}${sneSondaNasoenteralRequest}${svdSondaVesicalDeDemoraRequest}${svaSondaVesicalDeAlivioRequest}${portACathRequest}${piccAcessoVenosoCentralRequest}${ventiladoresRequest}${uppUlceraPorPressaoRequest}${avpAcessoVenosoPerifericoRequest}${uripenRequest}${fraldaGeriatricaRequest}${sngSondaNasogastricaRequest}${bipapRequest}${cpapRequest}${cistostomiaRequest}${cateterNasalDeOxigenioRequest}${mascaraDeVentilacaoRequest}${entubacaoOrotraquealRequest}cacheBuster=${new Date().getTime()}`
    )
  };
};

export const createEntity: ICrudPutAction<IProfissionalDispositivoAtual> = entity => async dispatch => {
  entity = {
    ...entity
  };
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_PROFISSIONALDISPOSITIVOATUAL,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IProfissionalDispositivoAtual> = entity => async dispatch => {
  entity = { ...entity };
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_PROFISSIONALDISPOSITIVOATUAL,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IProfissionalDispositivoAtual> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_PROFISSIONALDISPOSITIVOATUAL,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});

export const getProfissionalDispositivoAtualState = (location): IProfissionalDispositivoAtualBaseState => {
  const url = new URL(`http://localhost${location.search}`); // using a dummy url for parsing
  const baseFilters = url.searchParams.get('baseFilters') || '';
  const idProfissional = url.searchParams.get('idProfissional') || '';
  const tqtTraqueostomia = url.searchParams.get('tqtTraqueostomia') || '';
  const gttGastrostomia = url.searchParams.get('gttGastrostomia') || '';
  const sneSondaNasoenteral = url.searchParams.get('sneSondaNasoenteral') || '';
  const svdSondaVesicalDeDemora = url.searchParams.get('svdSondaVesicalDeDemora') || '';
  const svaSondaVesicalDeAlivio = url.searchParams.get('svaSondaVesicalDeAlivio') || '';
  const portACath = url.searchParams.get('portACath') || '';
  const piccAcessoVenosoCentral = url.searchParams.get('piccAcessoVenosoCentral') || '';
  const ventiladores = url.searchParams.get('ventiladores') || '';
  const uppUlceraPorPressao = url.searchParams.get('uppUlceraPorPressao') || '';
  const avpAcessoVenosoPeriferico = url.searchParams.get('avpAcessoVenosoPeriferico') || '';
  const uripen = url.searchParams.get('uripen') || '';
  const fraldaGeriatrica = url.searchParams.get('fraldaGeriatrica') || '';
  const sngSondaNasogastrica = url.searchParams.get('sngSondaNasogastrica') || '';
  const bipap = url.searchParams.get('bipap') || '';
  const cpap = url.searchParams.get('cpap') || '';
  const cistostomia = url.searchParams.get('cistostomia') || '';
  const cateterNasalDeOxigenio = url.searchParams.get('cateterNasalDeOxigenio') || '';
  const mascaraDeVentilacao = url.searchParams.get('mascaraDeVentilacao') || '';
  const entubacaoOrotraqueal = url.searchParams.get('entubacaoOrotraqueal') || '';

  return {
    baseFilters,
    idProfissional,
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
    entubacaoOrotraqueal
  };
};
