/* eslint complexity: ["error", 100] */
import axios from 'axios';
import { ICrudGetAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { IPayload } from 'react-jhipster/src/type/redux-action.type';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IVwApiAtendimentosAceite, defaultValue } from 'app/shared/model/vw-api-atendimentos-aceite.model';

export const ACTION_TYPES = {
  FETCH_VWAPIATENDIMENTOSACEITE_LIST_EXPORT: 'vwApiAtendimentosAceite/FETCH_VWAPIATENDIMENTOSACEITE_LIST_EXPORT',
  FETCH_VWAPIATENDIMENTOSACEITE_LIST: 'vwApiAtendimentosAceite/FETCH_VWAPIATENDIMENTOSACEITE_LIST',
  FETCH_VWAPIATENDIMENTOSACEITE: 'vwApiAtendimentosAceite/FETCH_VWAPIATENDIMENTOSACEITE',
  CREATE_VWAPIATENDIMENTOSACEITE: 'vwApiAtendimentosAceite/CREATE_VWAPIATENDIMENTOSACEITE',
  UPDATE_VWAPIATENDIMENTOSACEITE: 'vwApiAtendimentosAceite/UPDATE_VWAPIATENDIMENTOSACEITE',
  DELETE_VWAPIATENDIMENTOSACEITE: 'vwApiAtendimentosAceite/DELETE_VWAPIATENDIMENTOSACEITE',
  RESET: 'vwApiAtendimentosAceite/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IVwApiAtendimentosAceite>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type VwApiAtendimentosAceiteState = Readonly<typeof initialState>;

export interface IVwApiAtendimentosAceiteBaseState {
  baseFilters: any;
  idPadItem: any;
  idPaciente: any;
  idPeriodo: any;
  idPeriodicidade: any;
  idProfissional: any;
  aceito: any;
  bairro: any;
  cep: any;
  cidade: any;
  complemento: any;
  endereco: any;
  especialidade: any;
  latitude: any;
  longitude: any;
  numero: any;
  paciente: any;
  periodo: any;
  periodicidade: any;
  qtdSessoes: any;
  uf: any;
  valor: any;
}

export interface IVwApiAtendimentosAceiteUpdateState {
  fieldsBase: IVwApiAtendimentosAceiteBaseState;

  isNew: boolean;
}

// Reducer

export default (state: VwApiAtendimentosAceiteState = initialState, action): VwApiAtendimentosAceiteState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_VWAPIATENDIMENTOSACEITE_LIST_EXPORT):
    case REQUEST(ACTION_TYPES.FETCH_VWAPIATENDIMENTOSACEITE_LIST):
    case REQUEST(ACTION_TYPES.FETCH_VWAPIATENDIMENTOSACEITE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_VWAPIATENDIMENTOSACEITE):
    case REQUEST(ACTION_TYPES.UPDATE_VWAPIATENDIMENTOSACEITE):
    case REQUEST(ACTION_TYPES.DELETE_VWAPIATENDIMENTOSACEITE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_VWAPIATENDIMENTOSACEITE_LIST_EXPORT):
    case FAILURE(ACTION_TYPES.FETCH_VWAPIATENDIMENTOSACEITE_LIST):
    case FAILURE(ACTION_TYPES.FETCH_VWAPIATENDIMENTOSACEITE):
    case FAILURE(ACTION_TYPES.CREATE_VWAPIATENDIMENTOSACEITE):
    case FAILURE(ACTION_TYPES.UPDATE_VWAPIATENDIMENTOSACEITE):
    case FAILURE(ACTION_TYPES.DELETE_VWAPIATENDIMENTOSACEITE):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_VWAPIATENDIMENTOSACEITE_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10)
      };
    case SUCCESS(ACTION_TYPES.FETCH_VWAPIATENDIMENTOSACEITE):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_VWAPIATENDIMENTOSACEITE):
    case SUCCESS(ACTION_TYPES.UPDATE_VWAPIATENDIMENTOSACEITE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_VWAPIATENDIMENTOSACEITE):
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

const apiUrl = 'api/vw-api-atendimentos-aceites';

// Actions

// Actions
export type ICrudGetAllActionVwApiAtendimentosAceite<T> = (
  idPadItem?: any,
  idPaciente?: any,
  idPeriodo?: any,
  idPeriodicidade?: any,
  idProfissional?: any,
  aceito?: any,
  bairro?: any,
  cep?: any,
  cidade?: any,
  complemento?: any,
  endereco?: any,
  especialidade?: any,
  latitude?: any,
  longitude?: any,
  numero?: any,
  paciente?: any,
  periodo?: any,
  periodicidade?: any,
  qtdSessoes?: any,
  uf?: any,
  valor?: any,
  page?: number,
  size?: number,
  sort?: string
) => IPayload<T> | ((dispatch: any) => IPayload<T>);

export const getEntities: ICrudGetAllActionVwApiAtendimentosAceite<IVwApiAtendimentosAceite> = (
  idPadItem,
  idPaciente,
  idPeriodo,
  idPeriodicidade,
  idProfissional,
  aceito,
  bairro,
  cep,
  cidade,
  complemento,
  endereco,
  especialidade,
  latitude,
  longitude,
  numero,
  paciente,
  periodo,
  periodicidade,
  qtdSessoes,
  uf,
  valor,
  page,
  size,
  sort
) => {
  const idPadItemRequest = idPadItem ? `idPadItem.contains=${idPadItem}&` : '';
  const idPacienteRequest = idPaciente ? `idPaciente.contains=${idPaciente}&` : '';
  const idPeriodoRequest = idPeriodo ? `idPeriodo.contains=${idPeriodo}&` : '';
  const idPeriodicidadeRequest = idPeriodicidade ? `idPeriodicidade.contains=${idPeriodicidade}&` : '';
  const idProfissionalRequest = idProfissional ? `idProfissional.contains=${idProfissional}&` : '';
  const aceitoRequest = aceito ? `aceito.contains=${aceito}&` : '';
  const bairroRequest = bairro ? `bairro.contains=${bairro}&` : '';
  const cepRequest = cep ? `cep.contains=${cep}&` : '';
  const cidadeRequest = cidade ? `cidade.contains=${cidade}&` : '';
  const complementoRequest = complemento ? `complemento.contains=${complemento}&` : '';
  const enderecoRequest = endereco ? `endereco.contains=${endereco}&` : '';
  const especialidadeRequest = especialidade ? `especialidade.contains=${especialidade}&` : '';
  const latitudeRequest = latitude ? `latitude.contains=${latitude}&` : '';
  const longitudeRequest = longitude ? `longitude.contains=${longitude}&` : '';
  const numeroRequest = numero ? `numero.contains=${numero}&` : '';
  const pacienteRequest = paciente ? `paciente.contains=${paciente}&` : '';
  const periodoRequest = periodo ? `periodo.contains=${periodo}&` : '';
  const periodicidadeRequest = periodicidade ? `periodicidade.contains=${periodicidade}&` : '';
  const qtdSessoesRequest = qtdSessoes ? `qtdSessoes.contains=${qtdSessoes}&` : '';
  const ufRequest = uf ? `uf.contains=${uf}&` : '';
  const valorRequest = valor ? `valor.contains=${valor}&` : '';

  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}&` : '?'}`;
  return {
    type: ACTION_TYPES.FETCH_VWAPIATENDIMENTOSACEITE_LIST,
    payload: axios.get<IVwApiAtendimentosAceite>(
      `${requestUrl}${idPadItemRequest}${idPacienteRequest}${idPeriodoRequest}${idPeriodicidadeRequest}${idProfissionalRequest}${aceitoRequest}${bairroRequest}${cepRequest}${cidadeRequest}${complementoRequest}${enderecoRequest}${especialidadeRequest}${latitudeRequest}${longitudeRequest}${numeroRequest}${pacienteRequest}${periodoRequest}${periodicidadeRequest}${qtdSessoesRequest}${ufRequest}${valorRequest}cacheBuster=${new Date().getTime()}`
    )
  };
};
export const getEntity: ICrudGetAction<IVwApiAtendimentosAceite> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_VWAPIATENDIMENTOSACEITE,
    payload: axios.get<IVwApiAtendimentosAceite>(requestUrl)
  };
};

export const getEntitiesExport: ICrudGetAllActionVwApiAtendimentosAceite<IVwApiAtendimentosAceite> = (
  idPadItem,
  idPaciente,
  idPeriodo,
  idPeriodicidade,
  idProfissional,
  aceito,
  bairro,
  cep,
  cidade,
  complemento,
  endereco,
  especialidade,
  latitude,
  longitude,
  numero,
  paciente,
  periodo,
  periodicidade,
  qtdSessoes,
  uf,
  valor,
  page,
  size,
  sort
) => {
  const idPadItemRequest = idPadItem ? `idPadItem.contains=${idPadItem}&` : '';
  const idPacienteRequest = idPaciente ? `idPaciente.contains=${idPaciente}&` : '';
  const idPeriodoRequest = idPeriodo ? `idPeriodo.contains=${idPeriodo}&` : '';
  const idPeriodicidadeRequest = idPeriodicidade ? `idPeriodicidade.contains=${idPeriodicidade}&` : '';
  const idProfissionalRequest = idProfissional ? `idProfissional.contains=${idProfissional}&` : '';
  const aceitoRequest = aceito ? `aceito.contains=${aceito}&` : '';
  const bairroRequest = bairro ? `bairro.contains=${bairro}&` : '';
  const cepRequest = cep ? `cep.contains=${cep}&` : '';
  const cidadeRequest = cidade ? `cidade.contains=${cidade}&` : '';
  const complementoRequest = complemento ? `complemento.contains=${complemento}&` : '';
  const enderecoRequest = endereco ? `endereco.contains=${endereco}&` : '';
  const especialidadeRequest = especialidade ? `especialidade.contains=${especialidade}&` : '';
  const latitudeRequest = latitude ? `latitude.contains=${latitude}&` : '';
  const longitudeRequest = longitude ? `longitude.contains=${longitude}&` : '';
  const numeroRequest = numero ? `numero.contains=${numero}&` : '';
  const pacienteRequest = paciente ? `paciente.contains=${paciente}&` : '';
  const periodoRequest = periodo ? `periodo.contains=${periodo}&` : '';
  const periodicidadeRequest = periodicidade ? `periodicidade.contains=${periodicidade}&` : '';
  const qtdSessoesRequest = qtdSessoes ? `qtdSessoes.contains=${qtdSessoes}&` : '';
  const ufRequest = uf ? `uf.contains=${uf}&` : '';
  const valorRequest = valor ? `valor.contains=${valor}&` : '';

  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}&` : '?'}`;
  return {
    type: ACTION_TYPES.FETCH_VWAPIATENDIMENTOSACEITE_LIST,
    payload: axios.get<IVwApiAtendimentosAceite>(
      `${requestUrl}${idPadItemRequest}${idPacienteRequest}${idPeriodoRequest}${idPeriodicidadeRequest}${idProfissionalRequest}${aceitoRequest}${bairroRequest}${cepRequest}${cidadeRequest}${complementoRequest}${enderecoRequest}${especialidadeRequest}${latitudeRequest}${longitudeRequest}${numeroRequest}${pacienteRequest}${periodoRequest}${periodicidadeRequest}${qtdSessoesRequest}${ufRequest}${valorRequest}cacheBuster=${new Date().getTime()}`
    )
  };
};

export const createEntity: ICrudPutAction<IVwApiAtendimentosAceite> = entity => async dispatch => {
  entity = {
    ...entity
  };
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_VWAPIATENDIMENTOSACEITE,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IVwApiAtendimentosAceite> = entity => async dispatch => {
  entity = { ...entity };
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_VWAPIATENDIMENTOSACEITE,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IVwApiAtendimentosAceite> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_VWAPIATENDIMENTOSACEITE,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});

export const getVwApiAtendimentosAceiteState = (location): IVwApiAtendimentosAceiteBaseState => {
  const url = new URL(`http://localhost${location.search}`); // using a dummy url for parsing
  const baseFilters = url.searchParams.get('baseFilters') || '';
  const idPadItem = url.searchParams.get('idPadItem') || '';
  const idPaciente = url.searchParams.get('idPaciente') || '';
  const idPeriodo = url.searchParams.get('idPeriodo') || '';
  const idPeriodicidade = url.searchParams.get('idPeriodicidade') || '';
  const idProfissional = url.searchParams.get('idProfissional') || '';
  const aceito = url.searchParams.get('aceito') || '';
  const bairro = url.searchParams.get('bairro') || '';
  const cep = url.searchParams.get('cep') || '';
  const cidade = url.searchParams.get('cidade') || '';
  const complemento = url.searchParams.get('complemento') || '';
  const endereco = url.searchParams.get('endereco') || '';
  const especialidade = url.searchParams.get('especialidade') || '';
  const latitude = url.searchParams.get('latitude') || '';
  const longitude = url.searchParams.get('longitude') || '';
  const numero = url.searchParams.get('numero') || '';
  const paciente = url.searchParams.get('paciente') || '';
  const periodo = url.searchParams.get('periodo') || '';
  const periodicidade = url.searchParams.get('periodicidade') || '';
  const qtdSessoes = url.searchParams.get('qtdSessoes') || '';
  const uf = url.searchParams.get('uf') || '';
  const valor = url.searchParams.get('valor') || '';

  return {
    baseFilters,
    idPadItem,
    idPaciente,
    idPeriodo,
    idPeriodicidade,
    idProfissional,
    aceito,
    bairro,
    cep,
    cidade,
    complemento,
    endereco,
    especialidade,
    latitude,
    longitude,
    numero,
    paciente,
    periodo,
    periodicidade,
    qtdSessoes,
    uf,
    valor
  };
};
