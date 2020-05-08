/* eslint complexity: ["error", 100] */
import axios from 'axios';
import { ICrudGetAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { IPayload } from 'react-jhipster/src/type/redux-action.type';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IProfissional, defaultValue } from 'app/shared/model/profissional.model';

export const ACTION_TYPES = {
  FETCH_PROFISSIONAL_LIST_EXPORT: 'profissional/FETCH_PROFISSIONAL_LIST_EXPORT',
  FETCH_PROFISSIONAL_LIST: 'profissional/FETCH_PROFISSIONAL_LIST',
  FETCH_PROFISSIONAL: 'profissional/FETCH_PROFISSIONAL',
  CREATE_PROFISSIONAL: 'profissional/CREATE_PROFISSIONAL',
  UPDATE_PROFISSIONAL: 'profissional/UPDATE_PROFISSIONAL',
  DELETE_PROFISSIONAL: 'profissional/DELETE_PROFISSIONAL',
  SET_BLOB: 'profissional/SET_BLOB',
  RESET: 'profissional/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IProfissional>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type ProfissionalState = Readonly<typeof initialState>;

export interface IProfissionalBaseState {
  baseFilters: any;
  idCidade: any;
  idTempoExperiencia: any;
  idBanco: any;
  senha: any;
  nome: any;
  email: any;
  cpf: any;
  rg: any;
  nomeEmpresa: any;
  cnpj: any;
  registro: any;
  nascimento: any;
  sexo: any;
  telefone1: any;
  telefone2: any;
  celular1: any;
  celular2: any;
  cep: any;
  endereco: any;
  numero: any;
  complemento: any;
  bairro: any;
  cidade: any;
  uf: any;
  atendeCrianca: any;
  atendeIdoso: any;
  ag: any;
  conta: any;
  tipoConta: any;
  origemCadastro: any;
  obs: any;
  chavePrivada: any;
  ativo: any;
  senhaOriginal: any;
  dataSenha: any;
  expoToken: any;
  preferenciaAtendimento: any;
  atendimentoAceite: any;
  atendimentoAssinaturas: any;
  unidade: any;
}

export interface IProfissionalUpdateState {
  fieldsBase: IProfissionalBaseState;

  unidadeEasySelectValue: any;
  isNew: boolean;
  unidadeId: string;
}

// Reducer

export default (state: ProfissionalState = initialState, action): ProfissionalState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_PROFISSIONAL_LIST_EXPORT):
    case REQUEST(ACTION_TYPES.FETCH_PROFISSIONAL_LIST):
    case REQUEST(ACTION_TYPES.FETCH_PROFISSIONAL):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_PROFISSIONAL):
    case REQUEST(ACTION_TYPES.UPDATE_PROFISSIONAL):
    case REQUEST(ACTION_TYPES.DELETE_PROFISSIONAL):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_PROFISSIONAL_LIST_EXPORT):
    case FAILURE(ACTION_TYPES.FETCH_PROFISSIONAL_LIST):
    case FAILURE(ACTION_TYPES.FETCH_PROFISSIONAL):
    case FAILURE(ACTION_TYPES.CREATE_PROFISSIONAL):
    case FAILURE(ACTION_TYPES.UPDATE_PROFISSIONAL):
    case FAILURE(ACTION_TYPES.DELETE_PROFISSIONAL):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_PROFISSIONAL_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10)
      };
    case SUCCESS(ACTION_TYPES.FETCH_PROFISSIONAL):
      action.payload.data.obs = action.payload.data.obs ? Buffer.from(action.payload.data.obs).toString() : action.payload.data.obs;
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_PROFISSIONAL):
    case SUCCESS(ACTION_TYPES.UPDATE_PROFISSIONAL):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_PROFISSIONAL):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {}
      };
    case ACTION_TYPES.SET_BLOB: {
      const { name, data, contentType, fileName } = action.payload;
      return {
        ...state,
        entity: {
          ...state.entity,
          [name + 'Base64']: data,
          [name + 'ContentType']: contentType,
          [name + 'FileName']: fileName
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

const apiUrl = 'api/profissionals';

// Actions

// Actions
export type ICrudGetAllActionProfissional<T> = (
  idCidade?: any,
  idTempoExperiencia?: any,
  idBanco?: any,
  senha?: any,
  nome?: any,
  email?: any,
  cpf?: any,
  rg?: any,
  nomeEmpresa?: any,
  cnpj?: any,
  registro?: any,
  nascimento?: any,
  sexo?: any,
  telefone1?: any,
  telefone2?: any,
  celular1?: any,
  celular2?: any,
  cep?: any,
  endereco?: any,
  numero?: any,
  complemento?: any,
  bairro?: any,
  cidade?: any,
  uf?: any,
  atendeCrianca?: any,
  atendeIdoso?: any,
  ag?: any,
  conta?: any,
  tipoConta?: any,
  origemCadastro?: any,
  obs?: any,
  chavePrivada?: any,
  ativo?: any,
  senhaOriginal?: any,
  dataSenha?: any,
  expoToken?: any,
  preferenciaAtendimento?: any,
  atendimentoAceite?: any,
  atendimentoAssinaturas?: any,
  unidade?: any,
  page?: number,
  size?: number,
  sort?: string
) => IPayload<T> | ((dispatch: any) => IPayload<T>);

export const getEntities: ICrudGetAllActionProfissional<IProfissional> = (
  idCidade,
  idTempoExperiencia,
  idBanco,
  senha,
  nome,
  email,
  cpf,
  rg,
  nomeEmpresa,
  cnpj,
  registro,
  nascimento,
  sexo,
  telefone1,
  telefone2,
  celular1,
  celular2,
  cep,
  endereco,
  numero,
  complemento,
  bairro,
  cidade,
  uf,
  atendeCrianca,
  atendeIdoso,
  ag,
  conta,
  tipoConta,
  origemCadastro,
  obs,
  chavePrivada,
  ativo,
  senhaOriginal,
  dataSenha,
  expoToken,
  preferenciaAtendimento,
  atendimentoAceite,
  atendimentoAssinaturas,
  unidade,
  page,
  size,
  sort
) => {
  const idCidadeRequest = idCidade ? `idCidade.contains=${idCidade}&` : '';
  const idTempoExperienciaRequest = idTempoExperiencia ? `idTempoExperiencia.contains=${idTempoExperiencia}&` : '';
  const idBancoRequest = idBanco ? `idBanco.contains=${idBanco}&` : '';
  const senhaRequest = senha ? `senha.contains=${senha}&` : '';
  const nomeRequest = nome ? `nome.contains=${nome}&` : '';
  const emailRequest = email ? `email.contains=${email}&` : '';
  const cpfRequest = cpf ? `cpf.contains=${cpf}&` : '';
  const rgRequest = rg ? `rg.contains=${rg}&` : '';
  const nomeEmpresaRequest = nomeEmpresa ? `nomeEmpresa.contains=${nomeEmpresa}&` : '';
  const cnpjRequest = cnpj ? `cnpj.contains=${cnpj}&` : '';
  const registroRequest = registro ? `registro.contains=${registro}&` : '';
  const nascimentoRequest = nascimento ? `nascimento.equals=${nascimento}&` : '';
  const sexoRequest = sexo ? `sexo.contains=${sexo}&` : '';
  const telefone1Request = telefone1 ? `telefone1.contains=${telefone1}&` : '';
  const telefone2Request = telefone2 ? `telefone2.contains=${telefone2}&` : '';
  const celular1Request = celular1 ? `celular1.contains=${celular1}&` : '';
  const celular2Request = celular2 ? `celular2.contains=${celular2}&` : '';
  const cepRequest = cep ? `cep.contains=${cep}&` : '';
  const enderecoRequest = endereco ? `endereco.contains=${endereco}&` : '';
  const numeroRequest = numero ? `numero.contains=${numero}&` : '';
  const complementoRequest = complemento ? `complemento.contains=${complemento}&` : '';
  const bairroRequest = bairro ? `bairro.contains=${bairro}&` : '';
  const cidadeRequest = cidade ? `cidade.contains=${cidade}&` : '';
  const ufRequest = uf ? `uf.contains=${uf}&` : '';
  const atendeCriancaRequest = atendeCrianca ? `atendeCrianca.contains=${atendeCrianca}&` : '';
  const atendeIdosoRequest = atendeIdoso ? `atendeIdoso.contains=${atendeIdoso}&` : '';
  const agRequest = ag ? `ag.contains=${ag}&` : '';
  const contaRequest = conta ? `conta.contains=${conta}&` : '';
  const tipoContaRequest = tipoConta ? `tipoConta.contains=${tipoConta}&` : '';
  const origemCadastroRequest = origemCadastro ? `origemCadastro.contains=${origemCadastro}&` : '';
  const obsRequest = obs ? `obs.contains=${obs}&` : '';
  const chavePrivadaRequest = chavePrivada ? `chavePrivada.contains=${chavePrivada}&` : '';
  const ativoRequest = ativo ? `ativo.contains=${ativo}&` : '';
  const senhaOriginalRequest = senhaOriginal ? `senhaOriginal.contains=${senhaOriginal}&` : '';
  const dataSenhaRequest = dataSenha ? `dataSenha.contains=${dataSenha}&` : '';
  const expoTokenRequest = expoToken ? `expoToken.contains=${expoToken}&` : '';
  const preferenciaAtendimentoRequest = preferenciaAtendimento ? `preferenciaAtendimento.contains=${preferenciaAtendimento}&` : '';
  const atendimentoAceiteRequest = atendimentoAceite ? `atendimentoAceite.equals=${atendimentoAceite}&` : '';
  const atendimentoAssinaturasRequest = atendimentoAssinaturas ? `atendimentoAssinaturas.equals=${atendimentoAssinaturas}&` : '';
  const unidadeRequest = unidade ? `unidade.equals=${unidade}&` : '';

  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}&` : '?'}`;
  return {
    type: ACTION_TYPES.FETCH_PROFISSIONAL_LIST,
    payload: axios.get<IProfissional>(
      `${requestUrl}${idCidadeRequest}${idTempoExperienciaRequest}${idBancoRequest}${senhaRequest}${nomeRequest}${emailRequest}${cpfRequest}${rgRequest}${nomeEmpresaRequest}${cnpjRequest}${registroRequest}${nascimentoRequest}${sexoRequest}${telefone1Request}${telefone2Request}${celular1Request}${celular2Request}${cepRequest}${enderecoRequest}${numeroRequest}${complementoRequest}${bairroRequest}${cidadeRequest}${ufRequest}${atendeCriancaRequest}${atendeIdosoRequest}${agRequest}${contaRequest}${tipoContaRequest}${origemCadastroRequest}${obsRequest}${chavePrivadaRequest}${ativoRequest}${senhaOriginalRequest}${dataSenhaRequest}${expoTokenRequest}${preferenciaAtendimentoRequest}${atendimentoAceiteRequest}${atendimentoAssinaturasRequest}${unidadeRequest}cacheBuster=${new Date().getTime()}`
    )
  };
};
export const getEntity: ICrudGetAction<IProfissional> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_PROFISSIONAL,
    payload: axios.get<IProfissional>(requestUrl)
  };
};

export const getEntitiesExport: ICrudGetAllActionProfissional<IProfissional> = (
  idCidade,
  idTempoExperiencia,
  idBanco,
  senha,
  nome,
  email,
  cpf,
  rg,
  nomeEmpresa,
  cnpj,
  registro,
  nascimento,
  sexo,
  telefone1,
  telefone2,
  celular1,
  celular2,
  cep,
  endereco,
  numero,
  complemento,
  bairro,
  cidade,
  uf,
  atendeCrianca,
  atendeIdoso,
  ag,
  conta,
  tipoConta,
  origemCadastro,
  obs,
  chavePrivada,
  ativo,
  senhaOriginal,
  dataSenha,
  expoToken,
  preferenciaAtendimento,
  atendimentoAceite,
  atendimentoAssinaturas,
  unidade,
  page,
  size,
  sort
) => {
  const idCidadeRequest = idCidade ? `idCidade.contains=${idCidade}&` : '';
  const idTempoExperienciaRequest = idTempoExperiencia ? `idTempoExperiencia.contains=${idTempoExperiencia}&` : '';
  const idBancoRequest = idBanco ? `idBanco.contains=${idBanco}&` : '';
  const senhaRequest = senha ? `senha.contains=${senha}&` : '';
  const nomeRequest = nome ? `nome.contains=${nome}&` : '';
  const emailRequest = email ? `email.contains=${email}&` : '';
  const cpfRequest = cpf ? `cpf.contains=${cpf}&` : '';
  const rgRequest = rg ? `rg.contains=${rg}&` : '';
  const nomeEmpresaRequest = nomeEmpresa ? `nomeEmpresa.contains=${nomeEmpresa}&` : '';
  const cnpjRequest = cnpj ? `cnpj.contains=${cnpj}&` : '';
  const registroRequest = registro ? `registro.contains=${registro}&` : '';
  const nascimentoRequest = nascimento ? `nascimento.equals=${nascimento}&` : '';
  const sexoRequest = sexo ? `sexo.contains=${sexo}&` : '';
  const telefone1Request = telefone1 ? `telefone1.contains=${telefone1}&` : '';
  const telefone2Request = telefone2 ? `telefone2.contains=${telefone2}&` : '';
  const celular1Request = celular1 ? `celular1.contains=${celular1}&` : '';
  const celular2Request = celular2 ? `celular2.contains=${celular2}&` : '';
  const cepRequest = cep ? `cep.contains=${cep}&` : '';
  const enderecoRequest = endereco ? `endereco.contains=${endereco}&` : '';
  const numeroRequest = numero ? `numero.contains=${numero}&` : '';
  const complementoRequest = complemento ? `complemento.contains=${complemento}&` : '';
  const bairroRequest = bairro ? `bairro.contains=${bairro}&` : '';
  const cidadeRequest = cidade ? `cidade.contains=${cidade}&` : '';
  const ufRequest = uf ? `uf.contains=${uf}&` : '';
  const atendeCriancaRequest = atendeCrianca ? `atendeCrianca.contains=${atendeCrianca}&` : '';
  const atendeIdosoRequest = atendeIdoso ? `atendeIdoso.contains=${atendeIdoso}&` : '';
  const agRequest = ag ? `ag.contains=${ag}&` : '';
  const contaRequest = conta ? `conta.contains=${conta}&` : '';
  const tipoContaRequest = tipoConta ? `tipoConta.contains=${tipoConta}&` : '';
  const origemCadastroRequest = origemCadastro ? `origemCadastro.contains=${origemCadastro}&` : '';
  const obsRequest = obs ? `obs.contains=${obs}&` : '';
  const chavePrivadaRequest = chavePrivada ? `chavePrivada.contains=${chavePrivada}&` : '';
  const ativoRequest = ativo ? `ativo.contains=${ativo}&` : '';
  const senhaOriginalRequest = senhaOriginal ? `senhaOriginal.contains=${senhaOriginal}&` : '';
  const dataSenhaRequest = dataSenha ? `dataSenha.contains=${dataSenha}&` : '';
  const expoTokenRequest = expoToken ? `expoToken.contains=${expoToken}&` : '';
  const preferenciaAtendimentoRequest = preferenciaAtendimento ? `preferenciaAtendimento.contains=${preferenciaAtendimento}&` : '';
  const atendimentoAceiteRequest = atendimentoAceite ? `atendimentoAceite.equals=${atendimentoAceite}&` : '';
  const atendimentoAssinaturasRequest = atendimentoAssinaturas ? `atendimentoAssinaturas.equals=${atendimentoAssinaturas}&` : '';
  const unidadeRequest = unidade ? `unidade.equals=${unidade}&` : '';

  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}&` : '?'}`;
  return {
    type: ACTION_TYPES.FETCH_PROFISSIONAL_LIST,
    payload: axios.get<IProfissional>(
      `${requestUrl}${idCidadeRequest}${idTempoExperienciaRequest}${idBancoRequest}${senhaRequest}${nomeRequest}${emailRequest}${cpfRequest}${rgRequest}${nomeEmpresaRequest}${cnpjRequest}${registroRequest}${nascimentoRequest}${sexoRequest}${telefone1Request}${telefone2Request}${celular1Request}${celular2Request}${cepRequest}${enderecoRequest}${numeroRequest}${complementoRequest}${bairroRequest}${cidadeRequest}${ufRequest}${atendeCriancaRequest}${atendeIdosoRequest}${agRequest}${contaRequest}${tipoContaRequest}${origemCadastroRequest}${obsRequest}${chavePrivadaRequest}${ativoRequest}${senhaOriginalRequest}${dataSenhaRequest}${expoTokenRequest}${preferenciaAtendimentoRequest}${atendimentoAceiteRequest}${atendimentoAssinaturasRequest}${unidadeRequest}cacheBuster=${new Date().getTime()}`
    )
  };
};

export const createEntity: ICrudPutAction<IProfissional> = entity => async dispatch => {
  entity = {
    ...entity,
    unidade: entity.unidade === 'null' ? null : entity.unidade
  };
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_PROFISSIONAL,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IProfissional> = entity => async dispatch => {
  entity = { ...entity, unidade: entity.unidade === 'null' ? null : entity.unidade };
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_PROFISSIONAL,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IProfissional> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_PROFISSIONAL,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const setBlob = (name, data, contentType?, fileName?) => ({
  type: ACTION_TYPES.SET_BLOB,
  payload: {
    name,
    data,
    contentType,
    fileName
  }
});

export const reset = () => ({
  type: ACTION_TYPES.RESET
});

export const getProfissionalState = (location): IProfissionalBaseState => {
  const url = new URL(`http://localhost${location.search}`); // using a dummy url for parsing
  const baseFilters = url.searchParams.get('baseFilters') || '';
  const idCidade = url.searchParams.get('idCidade') || '';
  const idTempoExperiencia = url.searchParams.get('idTempoExperiencia') || '';
  const idBanco = url.searchParams.get('idBanco') || '';
  const senha = url.searchParams.get('senha') || '';
  const nome = url.searchParams.get('nome') || '';
  const email = url.searchParams.get('email') || '';
  const cpf = url.searchParams.get('cpf') || '';
  const rg = url.searchParams.get('rg') || '';
  const nomeEmpresa = url.searchParams.get('nomeEmpresa') || '';
  const cnpj = url.searchParams.get('cnpj') || '';
  const registro = url.searchParams.get('registro') || '';
  const nascimento = url.searchParams.get('nascimento') || '';
  const sexo = url.searchParams.get('sexo') || '';
  const telefone1 = url.searchParams.get('telefone1') || '';
  const telefone2 = url.searchParams.get('telefone2') || '';
  const celular1 = url.searchParams.get('celular1') || '';
  const celular2 = url.searchParams.get('celular2') || '';
  const cep = url.searchParams.get('cep') || '';
  const endereco = url.searchParams.get('endereco') || '';
  const numero = url.searchParams.get('numero') || '';
  const complemento = url.searchParams.get('complemento') || '';
  const bairro = url.searchParams.get('bairro') || '';
  const cidade = url.searchParams.get('cidade') || '';
  const uf = url.searchParams.get('uf') || '';
  const atendeCrianca = url.searchParams.get('atendeCrianca') || '';
  const atendeIdoso = url.searchParams.get('atendeIdoso') || '';
  const ag = url.searchParams.get('ag') || '';
  const conta = url.searchParams.get('conta') || '';
  const tipoConta = url.searchParams.get('tipoConta') || '';
  const origemCadastro = url.searchParams.get('origemCadastro') || '';
  const obs = url.searchParams.get('obs') || '';
  const chavePrivada = url.searchParams.get('chavePrivada') || '';
  const ativo = url.searchParams.get('ativo') || '';
  const senhaOriginal = url.searchParams.get('senhaOriginal') || '';
  const dataSenha = url.searchParams.get('dataSenha') || '';
  const expoToken = url.searchParams.get('expoToken') || '';
  const preferenciaAtendimento = url.searchParams.get('preferenciaAtendimento') || '';

  const atendimentoAceite = url.searchParams.get('atendimentoAceite') || '';
  const atendimentoAssinaturas = url.searchParams.get('atendimentoAssinaturas') || '';
  const unidade = url.searchParams.get('unidade') || '';

  return {
    baseFilters,
    idCidade,
    idTempoExperiencia,
    idBanco,
    senha,
    nome,
    email,
    cpf,
    rg,
    nomeEmpresa,
    cnpj,
    registro,
    nascimento,
    sexo,
    telefone1,
    telefone2,
    celular1,
    celular2,
    cep,
    endereco,
    numero,
    complemento,
    bairro,
    cidade,
    uf,
    atendeCrianca,
    atendeIdoso,
    ag,
    conta,
    tipoConta,
    origemCadastro,
    obs,
    chavePrivada,
    ativo,
    senhaOriginal,
    dataSenha,
    expoToken,
    preferenciaAtendimento,
    atendimentoAceite,
    atendimentoAssinaturas,
    unidade
  };
};
