/* eslint complexity: ["error", 100] */
import axios from 'axios';
import { ICrudGetAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { IPayload } from 'react-jhipster/src/type/redux-action.type';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IPaciente, defaultValue } from 'app/shared/model/paciente.model';

export const ACTION_TYPES = {
  FETCH_PACIENTE_LIST: 'paciente/FETCH_PACIENTE_LIST',
  FETCH_PACIENTE: 'paciente/FETCH_PACIENTE',
  CREATE_PACIENTE: 'paciente/CREATE_PACIENTE',
  UPDATE_PACIENTE: 'paciente/UPDATE_PACIENTE',
  DELETE_PACIENTE: 'paciente/DELETE_PACIENTE',
  RESET: 'paciente/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IPaciente>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type PacienteState = Readonly<typeof initialState>;

// Reducer

export default (state: PacienteState = initialState, action): PacienteState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_PACIENTE_LIST):
    case REQUEST(ACTION_TYPES.FETCH_PACIENTE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_PACIENTE):
    case REQUEST(ACTION_TYPES.UPDATE_PACIENTE):
    case REQUEST(ACTION_TYPES.DELETE_PACIENTE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_PACIENTE_LIST):
    case FAILURE(ACTION_TYPES.FETCH_PACIENTE):
    case FAILURE(ACTION_TYPES.CREATE_PACIENTE):
    case FAILURE(ACTION_TYPES.UPDATE_PACIENTE):
    case FAILURE(ACTION_TYPES.DELETE_PACIENTE):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_PACIENTE_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10)
      };
    case SUCCESS(ACTION_TYPES.FETCH_PACIENTE):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_PACIENTE):
    case SUCCESS(ACTION_TYPES.UPDATE_PACIENTE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_PACIENTE):
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

const apiUrl = 'api/pacientes';

// Actions

// Actions
export type ICrudGetAllActionPaciente<T> = (
  senha?: any,
  nome?: any,
  email?: any,
  cpf?: any,
  rg?: any,
  registro?: any,
  nascimento?: any,
  sexo?: any,
  telefone?: any,
  telefone2?: any,
  celular?: any,
  celular1?: any,
  cep?: any,
  endereco?: any,
  numero?: any,
  complemento?: any,
  bairro?: any,
  uf?: any,
  latitude?: any,
  longitude?: any,
  responsavelFamiliar?: any,
  emailFamiliar?: any,
  cpfFamiliar?: any,
  rgFamiliar?: any,
  nascimentoFamiliar?: any,
  sexoFamiliar?: any,
  telefoneFamiliar?: any,
  telefone2Familiar?: any,
  celularFamiliar?: any,
  celular2Familiar?: any,
  cepFamiliar?: any,
  enderecoFamiliar?: any,
  numeroFamiliar?: any,
  complementoFamiliar?: any,
  bairroFamiliar?: any,
  ufFamiliar?: any,
  latitudeFamiliar?: any,
  longitudeFamiliar?: any,
  observacao?: any,
  aph?: any,
  nivelComplexidade?: any,
  passagemPs?: any,
  obsPs?: any,
  passagemInternacao?: any,
  obsInternacao?: any,
  custoTotal?: any,
  observacaoFamiliar?: any,
  mesmoEndereco?: any,
  acessoFamiliar?: any,
  comResponsavel?: any,
  cadastroCompleto?: any,
  ativo?: any,
  dataPost?: any,
  detalhes?: any,
  tipohospital?: any,
  liminar?: any,
  expoToken?: any,
  profissionalPref?: any,
  senhaChat?: any,
  cidade?: any,
  page?: number,
  size?: number,
  sort?: string
) => IPayload<T> | ((dispatch: any) => IPayload<T>);

export const getEntities: ICrudGetAllActionPaciente<IPaciente> = (
  senha,
  nome,
  email,
  cpf,
  rg,
  registro,
  nascimento,
  sexo,
  telefone,
  telefone2,
  celular,
  celular1,
  cep,
  endereco,
  numero,
  complemento,
  bairro,
  uf,
  latitude,
  longitude,
  responsavelFamiliar,
  emailFamiliar,
  cpfFamiliar,
  rgFamiliar,
  nascimentoFamiliar,
  sexoFamiliar,
  telefoneFamiliar,
  telefone2Familiar,
  celularFamiliar,
  celular2Familiar,
  cepFamiliar,
  enderecoFamiliar,
  numeroFamiliar,
  complementoFamiliar,
  bairroFamiliar,
  ufFamiliar,
  latitudeFamiliar,
  longitudeFamiliar,
  observacao,
  aph,
  nivelComplexidade,
  passagemPs,
  obsPs,
  passagemInternacao,
  obsInternacao,
  custoTotal,
  observacaoFamiliar,
  mesmoEndereco,
  acessoFamiliar,
  comResponsavel,
  cadastroCompleto,
  ativo,
  dataPost,
  detalhes,
  tipohospital,
  liminar,
  expoToken,
  profissionalPref,
  senhaChat,
  cidade,
  page,
  size,
  sort
) => {
  const senhaRequest = senha ? `senha.contains=${senha}&` : '';
  const nomeRequest = nome ? `nome.contains=${nome}&` : '';
  const emailRequest = email ? `email.contains=${email}&` : '';
  const cpfRequest = cpf ? `cpf.contains=${cpf}&` : '';
  const rgRequest = rg ? `rg.contains=${rg}&` : '';
  const registroRequest = registro ? `registro.contains=${registro}&` : '';
  const nascimentoRequest = nascimento ? `nascimento.equals=${nascimento}&` : '';
  const sexoRequest = sexo ? `sexo.contains=${sexo}&` : '';
  const telefoneRequest = telefone ? `telefone.contains=${telefone}&` : '';
  const telefone2Request = telefone2 ? `telefone2.contains=${telefone2}&` : '';
  const celularRequest = celular ? `celular.contains=${celular}&` : '';
  const celular1Request = celular1 ? `celular1.contains=${celular1}&` : '';
  const cepRequest = cep ? `cep.contains=${cep}&` : '';
  const enderecoRequest = endereco ? `endereco.contains=${endereco}&` : '';
  const numeroRequest = numero ? `numero.contains=${numero}&` : '';
  const complementoRequest = complemento ? `complemento.contains=${complemento}&` : '';
  const bairroRequest = bairro ? `bairro.contains=${bairro}&` : '';
  const ufRequest = uf ? `uf.contains=${uf}&` : '';
  const latitudeRequest = latitude ? `latitude.contains=${latitude}&` : '';
  const longitudeRequest = longitude ? `longitude.contains=${longitude}&` : '';
  const responsavelFamiliarRequest = responsavelFamiliar ? `responsavelFamiliar.contains=${responsavelFamiliar}&` : '';
  const emailFamiliarRequest = emailFamiliar ? `emailFamiliar.contains=${emailFamiliar}&` : '';
  const cpfFamiliarRequest = cpfFamiliar ? `cpfFamiliar.contains=${cpfFamiliar}&` : '';
  const rgFamiliarRequest = rgFamiliar ? `rgFamiliar.contains=${rgFamiliar}&` : '';
  const nascimentoFamiliarRequest = nascimentoFamiliar ? `nascimentoFamiliar.equals=${nascimentoFamiliar}&` : '';
  const sexoFamiliarRequest = sexoFamiliar ? `sexoFamiliar.contains=${sexoFamiliar}&` : '';
  const telefoneFamiliarRequest = telefoneFamiliar ? `telefoneFamiliar.contains=${telefoneFamiliar}&` : '';
  const telefone2FamiliarRequest = telefone2Familiar ? `telefone2Familiar.contains=${telefone2Familiar}&` : '';
  const celularFamiliarRequest = celularFamiliar ? `celularFamiliar.contains=${celularFamiliar}&` : '';
  const celular2FamiliarRequest = celular2Familiar ? `celular2Familiar.contains=${celular2Familiar}&` : '';
  const cepFamiliarRequest = cepFamiliar ? `cepFamiliar.contains=${cepFamiliar}&` : '';
  const enderecoFamiliarRequest = enderecoFamiliar ? `enderecoFamiliar.contains=${enderecoFamiliar}&` : '';
  const numeroFamiliarRequest = numeroFamiliar ? `numeroFamiliar.contains=${numeroFamiliar}&` : '';
  const complementoFamiliarRequest = complementoFamiliar ? `complementoFamiliar.contains=${complementoFamiliar}&` : '';
  const bairroFamiliarRequest = bairroFamiliar ? `bairroFamiliar.contains=${bairroFamiliar}&` : '';
  const ufFamiliarRequest = ufFamiliar ? `ufFamiliar.contains=${ufFamiliar}&` : '';
  const latitudeFamiliarRequest = latitudeFamiliar ? `latitudeFamiliar.contains=${latitudeFamiliar}&` : '';
  const longitudeFamiliarRequest = longitudeFamiliar ? `longitudeFamiliar.contains=${longitudeFamiliar}&` : '';
  const observacaoRequest = observacao ? `observacao.contains=${observacao}&` : '';
  const aphRequest = aph ? `aph.contains=${aph}&` : '';
  const nivelComplexidadeRequest = nivelComplexidade ? `nivelComplexidade.contains=${nivelComplexidade}&` : '';
  const passagemPsRequest = passagemPs ? `passagemPs.contains=${passagemPs}&` : '';
  const obsPsRequest = obsPs ? `obsPs.contains=${obsPs}&` : '';
  const passagemInternacaoRequest = passagemInternacao ? `passagemInternacao.contains=${passagemInternacao}&` : '';
  const obsInternacaoRequest = obsInternacao ? `obsInternacao.contains=${obsInternacao}&` : '';
  const custoTotalRequest = custoTotal ? `custoTotal.contains=${custoTotal}&` : '';
  const observacaoFamiliarRequest = observacaoFamiliar ? `observacaoFamiliar.contains=${observacaoFamiliar}&` : '';
  const mesmoEnderecoRequest = mesmoEndereco ? `mesmoEndereco.contains=${mesmoEndereco}&` : '';
  const acessoFamiliarRequest = acessoFamiliar ? `acessoFamiliar.contains=${acessoFamiliar}&` : '';
  const comResponsavelRequest = comResponsavel ? `comResponsavel.contains=${comResponsavel}&` : '';
  const cadastroCompletoRequest = cadastroCompleto ? `cadastroCompleto.contains=${cadastroCompleto}&` : '';
  const ativoRequest = ativo ? `ativo.contains=${ativo}&` : '';
  const dataPostRequest = dataPost ? `dataPost.contains=${dataPost}&` : '';
  const detalhesRequest = detalhes ? `detalhes.contains=${detalhes}&` : '';
  const tipohospitalRequest = tipohospital ? `tipohospital.contains=${tipohospital}&` : '';
  const liminarRequest = liminar ? `liminar.contains=${liminar}&` : '';
  const expoTokenRequest = expoToken ? `expoToken.contains=${expoToken}&` : '';
  const profissionalPrefRequest = profissionalPref ? `profissionalPref.contains=${profissionalPref}&` : '';
  const senhaChatRequest = senhaChat ? `senhaChat.contains=${senhaChat}&` : '';
  const cidadeRequest = cidade ? `cidadeId.equals=${cidade}&` : '';

  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}&` : '?'}`;
  return {
    type: ACTION_TYPES.FETCH_PACIENTE_LIST,
    payload: axios.get<IPaciente>(
      `${requestUrl}${senhaRequest}${nomeRequest}${emailRequest}${cpfRequest}${rgRequest}${registroRequest}${nascimentoRequest}${sexoRequest}${telefoneRequest}${telefone2Request}${celularRequest}${celular1Request}${cepRequest}${enderecoRequest}${numeroRequest}${complementoRequest}${bairroRequest}${ufRequest}${latitudeRequest}${longitudeRequest}${responsavelFamiliarRequest}${emailFamiliarRequest}${cpfFamiliarRequest}${rgFamiliarRequest}${nascimentoFamiliarRequest}${sexoFamiliarRequest}${telefoneFamiliarRequest}${telefone2FamiliarRequest}${celularFamiliarRequest}${celular2FamiliarRequest}${cepFamiliarRequest}${enderecoFamiliarRequest}${numeroFamiliarRequest}${complementoFamiliarRequest}${bairroFamiliarRequest}${ufFamiliarRequest}${latitudeFamiliarRequest}${longitudeFamiliarRequest}${observacaoRequest}${aphRequest}${nivelComplexidadeRequest}${passagemPsRequest}${obsPsRequest}${passagemInternacaoRequest}${obsInternacaoRequest}${custoTotalRequest}${observacaoFamiliarRequest}${mesmoEnderecoRequest}${acessoFamiliarRequest}${comResponsavelRequest}${cadastroCompletoRequest}${ativoRequest}${dataPostRequest}${detalhesRequest}${tipohospitalRequest}${liminarRequest}${expoTokenRequest}${profissionalPrefRequest}${senhaChatRequest}${cidadeRequest}cacheBuster=${new Date().getTime()}`
    )
  };
};
export const getEntity: ICrudGetAction<IPaciente> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_PACIENTE,
    payload: axios.get<IPaciente>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IPaciente> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_PACIENTE,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IPaciente> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_PACIENTE,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IPaciente> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_PACIENTE,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
