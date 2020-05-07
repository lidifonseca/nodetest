/* eslint complexity: ["error", 100] */
import axios from 'axios';
import { ICrudGetAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { IPayload } from 'react-jhipster/src/type/redux-action.type';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IAtendimento, defaultValue } from 'app/shared/model/atendimento.model';

export const ACTION_TYPES = {
  FETCH_ATENDIMENTO_LIST_EXPORT: 'atendimento/FETCH_ATENDIMENTO_LIST_EXPORT',
  FETCH_ATENDIMENTO_LIST: 'atendimento/FETCH_ATENDIMENTO_LIST',
  FETCH_ATENDIMENTO: 'atendimento/FETCH_ATENDIMENTO',
  CREATE_ATENDIMENTO: 'atendimento/CREATE_ATENDIMENTO',
  UPDATE_ATENDIMENTO: 'atendimento/UPDATE_ATENDIMENTO',
  DELETE_ATENDIMENTO: 'atendimento/DELETE_ATENDIMENTO',
  RESET: 'atendimento/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IAtendimento>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type AtendimentoState = Readonly<typeof initialState>;

export interface IAtendimentoBaseState {
  baseFilters: any;
  idFranquia: any;
  idProfissional: any;
  cep: any;
  endereco: any;
  numero: any;
  complemento: any;
  bairro: any;
  cidade: any;
  uf: any;
  latitude: any;
  longitude: any;
  dataAgenda: any;
  horario: any;
  dataChegada: any;
  latitudeChegada: any;
  longitudeChegada: any;
  dataSaida: any;
  latitudeSaida: any;
  longitudeSaida: any;
  evolucao: any;
  observacao: any;
  intercorrencia: any;
  avaliacao: any;
  aceito: any;
  motivo: any;
  valor: any;
  ordemAtendimento: any;
  ativo: any;
  dataForaHora: any;
  idUsuarioCancelamento: any;
  dataCancelamento: any;
  tipoUsuarioCancelamento: any;
  confidencialProfissional: any;
  confidencialPaciente: any;
  imagemAssinatura: any;
  unidade: any;
}

export interface IAtendimentoUpdateState {
  fieldsBase: IAtendimentoBaseState;
  isNew: boolean;
  unidadeId: string;
}

// Reducer

export default (state: AtendimentoState = initialState, action): AtendimentoState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_ATENDIMENTO_LIST_EXPORT):
    case REQUEST(ACTION_TYPES.FETCH_ATENDIMENTO_LIST):
    case REQUEST(ACTION_TYPES.FETCH_ATENDIMENTO):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_ATENDIMENTO):
    case REQUEST(ACTION_TYPES.UPDATE_ATENDIMENTO):
    case REQUEST(ACTION_TYPES.DELETE_ATENDIMENTO):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_ATENDIMENTO_LIST_EXPORT):
    case FAILURE(ACTION_TYPES.FETCH_ATENDIMENTO_LIST):
    case FAILURE(ACTION_TYPES.FETCH_ATENDIMENTO):
    case FAILURE(ACTION_TYPES.CREATE_ATENDIMENTO):
    case FAILURE(ACTION_TYPES.UPDATE_ATENDIMENTO):
    case FAILURE(ACTION_TYPES.DELETE_ATENDIMENTO):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_ATENDIMENTO_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10)
      };
    case SUCCESS(ACTION_TYPES.FETCH_ATENDIMENTO):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_ATENDIMENTO):
    case SUCCESS(ACTION_TYPES.UPDATE_ATENDIMENTO):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_ATENDIMENTO):
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

const apiUrl = 'api/atendimentos';

// Actions

// Actions
export type ICrudGetAllActionAtendimento<T> = (
  idFranquia?: any,
  idProfissional?: any,
  cep?: any,
  endereco?: any,
  numero?: any,
  complemento?: any,
  bairro?: any,
  cidade?: any,
  uf?: any,
  latitude?: any,
  longitude?: any,
  dataAgenda?: any,
  horario?: any,
  dataChegada?: any,
  latitudeChegada?: any,
  longitudeChegada?: any,
  dataSaida?: any,
  latitudeSaida?: any,
  longitudeSaida?: any,
  evolucao?: any,
  observacao?: any,
  intercorrencia?: any,
  avaliacao?: any,
  aceito?: any,
  motivo?: any,
  valor?: any,
  ordemAtendimento?: any,
  ativo?: any,
  dataForaHora?: any,
  idUsuarioCancelamento?: any,
  dataCancelamento?: any,
  tipoUsuarioCancelamento?: any,
  confidencialProfissional?: any,
  confidencialPaciente?: any,
  imagemAssinatura?: any,
  unidade?: any,
  page?: number,
  size?: number,
  sort?: string
) => IPayload<T> | ((dispatch: any) => IPayload<T>);

export const getEntities: ICrudGetAllActionAtendimento<IAtendimento> = (
  idFranquia,
  idProfissional,
  cep,
  endereco,
  numero,
  complemento,
  bairro,
  cidade,
  uf,
  latitude,
  longitude,
  dataAgenda,
  horario,
  dataChegada,
  latitudeChegada,
  longitudeChegada,
  dataSaida,
  latitudeSaida,
  longitudeSaida,
  evolucao,
  observacao,
  intercorrencia,
  avaliacao,
  aceito,
  motivo,
  valor,
  ordemAtendimento,
  ativo,
  dataForaHora,
  idUsuarioCancelamento,
  dataCancelamento,
  tipoUsuarioCancelamento,
  confidencialProfissional,
  confidencialPaciente,
  imagemAssinatura,
  unidade,
  page,
  size,
  sort
) => {
  const idFranquiaRequest = idFranquia ? `idFranquia.contains=${idFranquia}&` : '';
  const idProfissionalRequest = idProfissional ? `idProfissional.contains=${idProfissional}&` : '';
  const cepRequest = cep ? `cep.contains=${cep}&` : '';
  const enderecoRequest = endereco ? `endereco.contains=${endereco}&` : '';
  const numeroRequest = numero ? `numero.contains=${numero}&` : '';
  const complementoRequest = complemento ? `complemento.contains=${complemento}&` : '';
  const bairroRequest = bairro ? `bairro.contains=${bairro}&` : '';
  const cidadeRequest = cidade ? `cidade.contains=${cidade}&` : '';
  const ufRequest = uf ? `uf.contains=${uf}&` : '';
  const latitudeRequest = latitude ? `latitude.contains=${latitude}&` : '';
  const longitudeRequest = longitude ? `longitude.contains=${longitude}&` : '';
  const dataAgendaRequest = dataAgenda ? `dataAgenda.contains=${dataAgenda}&` : '';
  const horarioRequest = horario ? `horario.contains=${horario}&` : '';
  const dataChegadaRequest = dataChegada ? `dataChegada.contains=${dataChegada}&` : '';
  const latitudeChegadaRequest = latitudeChegada ? `latitudeChegada.contains=${latitudeChegada}&` : '';
  const longitudeChegadaRequest = longitudeChegada ? `longitudeChegada.contains=${longitudeChegada}&` : '';
  const dataSaidaRequest = dataSaida ? `dataSaida.contains=${dataSaida}&` : '';
  const latitudeSaidaRequest = latitudeSaida ? `latitudeSaida.contains=${latitudeSaida}&` : '';
  const longitudeSaidaRequest = longitudeSaida ? `longitudeSaida.contains=${longitudeSaida}&` : '';
  const evolucaoRequest = evolucao ? `evolucao.contains=${evolucao}&` : '';
  const observacaoRequest = observacao ? `observacao.contains=${observacao}&` : '';
  const intercorrenciaRequest = intercorrencia ? `intercorrencia.contains=${intercorrencia}&` : '';
  const avaliacaoRequest = avaliacao ? `avaliacao.contains=${avaliacao}&` : '';
  const aceitoRequest = aceito ? `aceito.contains=${aceito}&` : '';
  const motivoRequest = motivo ? `motivo.contains=${motivo}&` : '';
  const valorRequest = valor ? `valor.contains=${valor}&` : '';
  const ordemAtendimentoRequest = ordemAtendimento ? `ordemAtendimento.contains=${ordemAtendimento}&` : '';
  const ativoRequest = ativo ? `ativo.contains=${ativo}&` : '';
  const dataForaHoraRequest = dataForaHora ? `dataForaHora.contains=${dataForaHora}&` : '';
  const idUsuarioCancelamentoRequest = idUsuarioCancelamento ? `idUsuarioCancelamento.contains=${idUsuarioCancelamento}&` : '';
  const dataCancelamentoRequest = dataCancelamento ? `dataCancelamento.equals=${dataCancelamento}&` : '';
  const tipoUsuarioCancelamentoRequest = tipoUsuarioCancelamento ? `tipoUsuarioCancelamento.contains=${tipoUsuarioCancelamento}&` : '';
  const confidencialProfissionalRequest = confidencialProfissional ? `confidencialProfissional.contains=${confidencialProfissional}&` : '';
  const confidencialPacienteRequest = confidencialPaciente ? `confidencialPaciente.contains=${confidencialPaciente}&` : '';
  const imagemAssinaturaRequest = imagemAssinatura ? `imagemAssinatura.contains=${imagemAssinatura}&` : '';
  const unidadeRequest = unidade ? `unidade.equals=${unidade}&` : '';

  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}&` : '?'}`;
  return {
    type: ACTION_TYPES.FETCH_ATENDIMENTO_LIST,
    payload: axios.get<IAtendimento>(
      `${requestUrl}${idFranquiaRequest}${idProfissionalRequest}${cepRequest}${enderecoRequest}${numeroRequest}${complementoRequest}${bairroRequest}${cidadeRequest}${ufRequest}${latitudeRequest}${longitudeRequest}${dataAgendaRequest}${horarioRequest}${dataChegadaRequest}${latitudeChegadaRequest}${longitudeChegadaRequest}${dataSaidaRequest}${latitudeSaidaRequest}${longitudeSaidaRequest}${evolucaoRequest}${observacaoRequest}${intercorrenciaRequest}${avaliacaoRequest}${aceitoRequest}${motivoRequest}${valorRequest}${ordemAtendimentoRequest}${ativoRequest}${dataForaHoraRequest}${idUsuarioCancelamentoRequest}${dataCancelamentoRequest}${tipoUsuarioCancelamentoRequest}${confidencialProfissionalRequest}${confidencialPacienteRequest}${imagemAssinaturaRequest}${unidadeRequest}cacheBuster=${new Date().getTime()}`
    )
  };
};
export const getEntity: ICrudGetAction<IAtendimento> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_ATENDIMENTO,
    payload: axios.get<IAtendimento>(requestUrl)
  };
};

export const getEntitiesExport: ICrudGetAllActionAtendimento<IAtendimento> = (
  idFranquia,
  idProfissional,
  cep,
  endereco,
  numero,
  complemento,
  bairro,
  cidade,
  uf,
  latitude,
  longitude,
  dataAgenda,
  horario,
  dataChegada,
  latitudeChegada,
  longitudeChegada,
  dataSaida,
  latitudeSaida,
  longitudeSaida,
  evolucao,
  observacao,
  intercorrencia,
  avaliacao,
  aceito,
  motivo,
  valor,
  ordemAtendimento,
  ativo,
  dataForaHora,
  idUsuarioCancelamento,
  dataCancelamento,
  tipoUsuarioCancelamento,
  confidencialProfissional,
  confidencialPaciente,
  imagemAssinatura,
  unidade,
  page,
  size,
  sort
) => {
  const idFranquiaRequest = idFranquia ? `idFranquia.contains=${idFranquia}&` : '';
  const idProfissionalRequest = idProfissional ? `idProfissional.contains=${idProfissional}&` : '';
  const cepRequest = cep ? `cep.contains=${cep}&` : '';
  const enderecoRequest = endereco ? `endereco.contains=${endereco}&` : '';
  const numeroRequest = numero ? `numero.contains=${numero}&` : '';
  const complementoRequest = complemento ? `complemento.contains=${complemento}&` : '';
  const bairroRequest = bairro ? `bairro.contains=${bairro}&` : '';
  const cidadeRequest = cidade ? `cidade.contains=${cidade}&` : '';
  const ufRequest = uf ? `uf.contains=${uf}&` : '';
  const latitudeRequest = latitude ? `latitude.contains=${latitude}&` : '';
  const longitudeRequest = longitude ? `longitude.contains=${longitude}&` : '';
  const dataAgendaRequest = dataAgenda ? `dataAgenda.contains=${dataAgenda}&` : '';
  const horarioRequest = horario ? `horario.contains=${horario}&` : '';
  const dataChegadaRequest = dataChegada ? `dataChegada.contains=${dataChegada}&` : '';
  const latitudeChegadaRequest = latitudeChegada ? `latitudeChegada.contains=${latitudeChegada}&` : '';
  const longitudeChegadaRequest = longitudeChegada ? `longitudeChegada.contains=${longitudeChegada}&` : '';
  const dataSaidaRequest = dataSaida ? `dataSaida.contains=${dataSaida}&` : '';
  const latitudeSaidaRequest = latitudeSaida ? `latitudeSaida.contains=${latitudeSaida}&` : '';
  const longitudeSaidaRequest = longitudeSaida ? `longitudeSaida.contains=${longitudeSaida}&` : '';
  const evolucaoRequest = evolucao ? `evolucao.contains=${evolucao}&` : '';
  const observacaoRequest = observacao ? `observacao.contains=${observacao}&` : '';
  const intercorrenciaRequest = intercorrencia ? `intercorrencia.contains=${intercorrencia}&` : '';
  const avaliacaoRequest = avaliacao ? `avaliacao.contains=${avaliacao}&` : '';
  const aceitoRequest = aceito ? `aceito.contains=${aceito}&` : '';
  const motivoRequest = motivo ? `motivo.contains=${motivo}&` : '';
  const valorRequest = valor ? `valor.contains=${valor}&` : '';
  const ordemAtendimentoRequest = ordemAtendimento ? `ordemAtendimento.contains=${ordemAtendimento}&` : '';
  const ativoRequest = ativo ? `ativo.contains=${ativo}&` : '';
  const dataForaHoraRequest = dataForaHora ? `dataForaHora.contains=${dataForaHora}&` : '';
  const idUsuarioCancelamentoRequest = idUsuarioCancelamento ? `idUsuarioCancelamento.contains=${idUsuarioCancelamento}&` : '';
  const dataCancelamentoRequest = dataCancelamento ? `dataCancelamento.equals=${dataCancelamento}&` : '';
  const tipoUsuarioCancelamentoRequest = tipoUsuarioCancelamento ? `tipoUsuarioCancelamento.contains=${tipoUsuarioCancelamento}&` : '';
  const confidencialProfissionalRequest = confidencialProfissional ? `confidencialProfissional.contains=${confidencialProfissional}&` : '';
  const confidencialPacienteRequest = confidencialPaciente ? `confidencialPaciente.contains=${confidencialPaciente}&` : '';
  const imagemAssinaturaRequest = imagemAssinatura ? `imagemAssinatura.contains=${imagemAssinatura}&` : '';
  const unidadeRequest = unidade ? `unidade.equals=${unidade}&` : '';

  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}&` : '?'}`;
  return {
    type: ACTION_TYPES.FETCH_ATENDIMENTO_LIST,
    payload: axios.get<IAtendimento>(
      `${requestUrl}${idFranquiaRequest}${idProfissionalRequest}${cepRequest}${enderecoRequest}${numeroRequest}${complementoRequest}${bairroRequest}${cidadeRequest}${ufRequest}${latitudeRequest}${longitudeRequest}${dataAgendaRequest}${horarioRequest}${dataChegadaRequest}${latitudeChegadaRequest}${longitudeChegadaRequest}${dataSaidaRequest}${latitudeSaidaRequest}${longitudeSaidaRequest}${evolucaoRequest}${observacaoRequest}${intercorrenciaRequest}${avaliacaoRequest}${aceitoRequest}${motivoRequest}${valorRequest}${ordemAtendimentoRequest}${ativoRequest}${dataForaHoraRequest}${idUsuarioCancelamentoRequest}${dataCancelamentoRequest}${tipoUsuarioCancelamentoRequest}${confidencialProfissionalRequest}${confidencialPacienteRequest}${imagemAssinaturaRequest}${unidadeRequest}cacheBuster=${new Date().getTime()}`
    )
  };
};

export const createEntity: ICrudPutAction<IAtendimento> = entity => async dispatch => {
  entity = {
    ...entity,
    unidade: entity.unidade === 'null' ? null : entity.unidade
  };
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_ATENDIMENTO,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IAtendimento> = entity => async dispatch => {
  entity = { ...entity, unidade: entity.unidade === 'null' ? null : entity.unidade };
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_ATENDIMENTO,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IAtendimento> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_ATENDIMENTO,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});

export const getAtendimentoState = (location): IAtendimentoBaseState => {
  const url = new URL(`http://localhost${location.search}`); // using a dummy url for parsing
  const baseFilters = url.searchParams.get('baseFilters') || '';
  const idFranquia = url.searchParams.get('idFranquia') || '';
  const idProfissional = url.searchParams.get('idProfissional') || '';
  const cep = url.searchParams.get('cep') || '';
  const endereco = url.searchParams.get('endereco') || '';
  const numero = url.searchParams.get('numero') || '';
  const complemento = url.searchParams.get('complemento') || '';
  const bairro = url.searchParams.get('bairro') || '';
  const cidade = url.searchParams.get('cidade') || '';
  const uf = url.searchParams.get('uf') || '';
  const latitude = url.searchParams.get('latitude') || '';
  const longitude = url.searchParams.get('longitude') || '';
  const dataAgenda = url.searchParams.get('dataAgenda') || '';
  const horario = url.searchParams.get('horario') || '';
  const dataChegada = url.searchParams.get('dataChegada') || '';
  const latitudeChegada = url.searchParams.get('latitudeChegada') || '';
  const longitudeChegada = url.searchParams.get('longitudeChegada') || '';
  const dataSaida = url.searchParams.get('dataSaida') || '';
  const latitudeSaida = url.searchParams.get('latitudeSaida') || '';
  const longitudeSaida = url.searchParams.get('longitudeSaida') || '';
  const evolucao = url.searchParams.get('evolucao') || '';
  const observacao = url.searchParams.get('observacao') || '';
  const intercorrencia = url.searchParams.get('intercorrencia') || '';
  const avaliacao = url.searchParams.get('avaliacao') || '';
  const aceito = url.searchParams.get('aceito') || '';
  const motivo = url.searchParams.get('motivo') || '';
  const valor = url.searchParams.get('valor') || '';
  const ordemAtendimento = url.searchParams.get('ordemAtendimento') || '';
  const ativo = url.searchParams.get('ativo') || '';
  const dataForaHora = url.searchParams.get('dataForaHora') || '';
  const idUsuarioCancelamento = url.searchParams.get('idUsuarioCancelamento') || '';
  const dataCancelamento = url.searchParams.get('dataCancelamento') || '';
  const tipoUsuarioCancelamento = url.searchParams.get('tipoUsuarioCancelamento') || '';
  const confidencialProfissional = url.searchParams.get('confidencialProfissional') || '';
  const confidencialPaciente = url.searchParams.get('confidencialPaciente') || '';
  const imagemAssinatura = url.searchParams.get('imagemAssinatura') || '';

  const unidade = url.searchParams.get('unidade') || '';

  return {
    baseFilters,
    idFranquia,
    idProfissional,
    cep,
    endereco,
    numero,
    complemento,
    bairro,
    cidade,
    uf,
    latitude,
    longitude,
    dataAgenda,
    horario,
    dataChegada,
    latitudeChegada,
    longitudeChegada,
    dataSaida,
    latitudeSaida,
    longitudeSaida,
    evolucao,
    observacao,
    intercorrencia,
    avaliacao,
    aceito,
    motivo,
    valor,
    ordemAtendimento,
    ativo,
    dataForaHora,
    idUsuarioCancelamento,
    dataCancelamento,
    tipoUsuarioCancelamento,
    confidencialProfissional,
    confidencialPaciente,
    imagemAssinatura,
    unidade
  };
};
