/* eslint complexity: ["error", 100] */
import axios from 'axios';
import { ICrudGetAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { IPayload } from 'react-jhipster/src/type/redux-action.type';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IUsuario, defaultValue } from 'app/shared/model/usuario.model';

export const ACTION_TYPES = {
  FETCH_USUARIO_LIST: 'usuario/FETCH_USUARIO_LIST',
  FETCH_USUARIO: 'usuario/FETCH_USUARIO',
  CREATE_USUARIO: 'usuario/CREATE_USUARIO',
  UPDATE_USUARIO: 'usuario/UPDATE_USUARIO',
  DELETE_USUARIO: 'usuario/DELETE_USUARIO',
  RESET: 'usuario/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IUsuario>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type UsuarioState = Readonly<typeof initialState>;

// Reducer

export default (state: UsuarioState = initialState, action): UsuarioState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_USUARIO_LIST):
    case REQUEST(ACTION_TYPES.FETCH_USUARIO):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_USUARIO):
    case REQUEST(ACTION_TYPES.UPDATE_USUARIO):
    case REQUEST(ACTION_TYPES.DELETE_USUARIO):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_USUARIO_LIST):
    case FAILURE(ACTION_TYPES.FETCH_USUARIO):
    case FAILURE(ACTION_TYPES.CREATE_USUARIO):
    case FAILURE(ACTION_TYPES.UPDATE_USUARIO):
    case FAILURE(ACTION_TYPES.DELETE_USUARIO):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_USUARIO_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10)
      };
    case SUCCESS(ACTION_TYPES.FETCH_USUARIO):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_USUARIO):
    case SUCCESS(ACTION_TYPES.UPDATE_USUARIO):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_USUARIO):
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

const apiUrl = 'api/usuarios';

// Actions

// Actions
export type ICrudGetAllActionUsuario<T> = (
  idUnidade?: any,
  idOperadora?: any,
  senha?: any,
  nome?: any,
  email?: any,
  telefone?: any,
  celular?: any,
  cpf?: any,
  rg?: any,
  sexo?: any,
  nascimento?: any,
  verAtendimento?: any,
  cadAtendimento?: any,
  ediAtendimento?: any,
  baixaManualAtendimento?: any,
  delAtendimento?: any,
  relAtendimento?: any,
  verPad?: any,
  cadPad?: any,
  ediPad?: any,
  delPad?: any,
  relPad?: any,
  verDiario?: any,
  cadDiario?: any,
  ediDiario?: any,
  delDiario?: any,
  relDiario?: any,
  verCategoria?: any,
  cadCategoria?: any,
  ediCategoria?: any,
  delCategoria?: any,
  verEspecialidade?: any,
  cadEspecialidade?: any,
  ediEspecialidade?: any,
  delEspecialidade?: any,
  relEspecialidade?: any,
  verEspecialidadeValor?: any,
  cadEspecialidadeValor?: any,
  ediEspecialidadeValor?: any,
  delEspecialidadeValor?: any,
  relEspecialidadeValor?: any,
  verOperadora?: any,
  cadOperadora?: any,
  ediOperadora?: any,
  delOperadora?: any,
  verPaciente?: any,
  cadPaciente?: any,
  ediPaciente?: any,
  delPaciente?: any,
  relPaciente?: any,
  verProfissional?: any,
  cadProfissional?: any,
  ediProfissional?: any,
  delProfissional?: any,
  ativProfissional?: any,
  relProfissional?: any,
  verPush?: any,
  cadPushPaciente?: any,
  cadPushProfissional?: any,
  verTermoPaciente?: any,
  ediTermoPaciente?: any,
  verTermoProfissional?: any,
  ediTermoProfissional?: any,
  verOutros?: any,
  cadOutros?: any,
  ediOutros?: any,
  delOutros?: any,
  relOutros?: any,
  verUnidadeEasy?: any,
  cadUnidadeEasy?: any,
  ediUnidadeEasy?: any,
  delUnidadeEasy?: any,
  verUsuario?: any,
  cadUsuario?: any,
  ediUsuario?: any,
  delUsuario?: any,
  verPtaResultado?: any,
  cadPtaResultado?: any,
  delPtaResultado?: any,
  verPtaAtividade?: any,
  cadPtaAtividade?: any,
  delPtaAtividade?: any,
  permissaoUsuario?: any,
  verProntuario?: any,
  cadProntuario?: any,
  ediProntuario?: any,
  delProntuario?: any,
  delProntuarioFoto?: any,
  valoresFinanceiro?: any,
  autorizacaoValorFinanceiro?: any,
  confirmarPagamentoFinanceiro?: any,
  gerenciarSorteios?: any,
  envioRecusa?: any,
  envioIntercorrencia?: any,
  envioCancelamento?: any,
  envioAvaliacao?: any,
  envioPedido?: any,
  alertaAtendimento?: any,
  ativo?: any,
  dataPost?: any,
  envioGlosado?: any,
  emergencia?: any,
  token?: any,
  editAtendimento?: any,
  ouvirLigacao?: any,
  verPainelIndicadores?: any,
  prorrogarPad?: any,
  cancelarAtendMassa?: any,
  cadMatMed?: any,
  ediMatMed?: any,
  delMatMed?: any,
  verColPta?: any,
  verColFoto?: any,
  verColLc?: any,
  verAtendCancelado?: any,
  verAtendAgConfirmacao?: any,
  ediGeoLocalizacaoAtendimento?: any,
  copiarEvolucao?: any,
  copiarNomeProf?: any,
  copiarRegistroProf?: any,
  idAreaAtuacao?: any,
  envioCidSemPta?: any,
  envioAnaliseResultadoEsperado?: any,
  envioDescumprimento?: any,
  envioMelhoraTempo?: any,
  senhaChat?: any,
  diario?: any,
  pacienteDiario?: any,
  idTipoUsuario?: any,
  page?: number,
  size?: number,
  sort?: string
) => IPayload<T> | ((dispatch: any) => IPayload<T>);

export const getEntities: ICrudGetAllActionUsuario<IUsuario> = (
  idUnidade,
  idOperadora,
  senha,
  nome,
  email,
  telefone,
  celular,
  cpf,
  rg,
  sexo,
  nascimento,
  verAtendimento,
  cadAtendimento,
  ediAtendimento,
  baixaManualAtendimento,
  delAtendimento,
  relAtendimento,
  verPad,
  cadPad,
  ediPad,
  delPad,
  relPad,
  verDiario,
  cadDiario,
  ediDiario,
  delDiario,
  relDiario,
  verCategoria,
  cadCategoria,
  ediCategoria,
  delCategoria,
  verEspecialidade,
  cadEspecialidade,
  ediEspecialidade,
  delEspecialidade,
  relEspecialidade,
  verEspecialidadeValor,
  cadEspecialidadeValor,
  ediEspecialidadeValor,
  delEspecialidadeValor,
  relEspecialidadeValor,
  verOperadora,
  cadOperadora,
  ediOperadora,
  delOperadora,
  verPaciente,
  cadPaciente,
  ediPaciente,
  delPaciente,
  relPaciente,
  verProfissional,
  cadProfissional,
  ediProfissional,
  delProfissional,
  ativProfissional,
  relProfissional,
  verPush,
  cadPushPaciente,
  cadPushProfissional,
  verTermoPaciente,
  ediTermoPaciente,
  verTermoProfissional,
  ediTermoProfissional,
  verOutros,
  cadOutros,
  ediOutros,
  delOutros,
  relOutros,
  verUnidadeEasy,
  cadUnidadeEasy,
  ediUnidadeEasy,
  delUnidadeEasy,
  verUsuario,
  cadUsuario,
  ediUsuario,
  delUsuario,
  verPtaResultado,
  cadPtaResultado,
  delPtaResultado,
  verPtaAtividade,
  cadPtaAtividade,
  delPtaAtividade,
  permissaoUsuario,
  verProntuario,
  cadProntuario,
  ediProntuario,
  delProntuario,
  delProntuarioFoto,
  valoresFinanceiro,
  autorizacaoValorFinanceiro,
  confirmarPagamentoFinanceiro,
  gerenciarSorteios,
  envioRecusa,
  envioIntercorrencia,
  envioCancelamento,
  envioAvaliacao,
  envioPedido,
  alertaAtendimento,
  ativo,
  dataPost,
  envioGlosado,
  emergencia,
  token,
  editAtendimento,
  ouvirLigacao,
  verPainelIndicadores,
  prorrogarPad,
  cancelarAtendMassa,
  cadMatMed,
  ediMatMed,
  delMatMed,
  verColPta,
  verColFoto,
  verColLc,
  verAtendCancelado,
  verAtendAgConfirmacao,
  ediGeoLocalizacaoAtendimento,
  copiarEvolucao,
  copiarNomeProf,
  copiarRegistroProf,
  idAreaAtuacao,
  envioCidSemPta,
  envioAnaliseResultadoEsperado,
  envioDescumprimento,
  envioMelhoraTempo,
  senhaChat,
  diario,
  pacienteDiario,
  idTipoUsuario,
  page,
  size,
  sort
) => {
  const idUnidadeRequest = idUnidade ? `idUnidade.contains=${idUnidade}&` : '';
  const idOperadoraRequest = idOperadora ? `idOperadora.contains=${idOperadora}&` : '';
  const senhaRequest = senha ? `senha.contains=${senha}&` : '';
  const nomeRequest = nome ? `nome.contains=${nome}&` : '';
  const emailRequest = email ? `email.contains=${email}&` : '';
  const telefoneRequest = telefone ? `telefone.contains=${telefone}&` : '';
  const celularRequest = celular ? `celular.contains=${celular}&` : '';
  const cpfRequest = cpf ? `cpf.contains=${cpf}&` : '';
  const rgRequest = rg ? `rg.contains=${rg}&` : '';
  const sexoRequest = sexo ? `sexo.contains=${sexo}&` : '';
  const nascimentoRequest = nascimento ? `nascimento.equals=${nascimento}&` : '';
  const verAtendimentoRequest = verAtendimento ? `verAtendimento.contains=${verAtendimento}&` : '';
  const cadAtendimentoRequest = cadAtendimento ? `cadAtendimento.contains=${cadAtendimento}&` : '';
  const ediAtendimentoRequest = ediAtendimento ? `ediAtendimento.contains=${ediAtendimento}&` : '';
  const baixaManualAtendimentoRequest = baixaManualAtendimento ? `baixaManualAtendimento.contains=${baixaManualAtendimento}&` : '';
  const delAtendimentoRequest = delAtendimento ? `delAtendimento.contains=${delAtendimento}&` : '';
  const relAtendimentoRequest = relAtendimento ? `relAtendimento.contains=${relAtendimento}&` : '';
  const verPadRequest = verPad ? `verPad.contains=${verPad}&` : '';
  const cadPadRequest = cadPad ? `cadPad.contains=${cadPad}&` : '';
  const ediPadRequest = ediPad ? `ediPad.contains=${ediPad}&` : '';
  const delPadRequest = delPad ? `delPad.contains=${delPad}&` : '';
  const relPadRequest = relPad ? `relPad.contains=${relPad}&` : '';
  const verDiarioRequest = verDiario ? `verDiario.contains=${verDiario}&` : '';
  const cadDiarioRequest = cadDiario ? `cadDiario.contains=${cadDiario}&` : '';
  const ediDiarioRequest = ediDiario ? `ediDiario.contains=${ediDiario}&` : '';
  const delDiarioRequest = delDiario ? `delDiario.contains=${delDiario}&` : '';
  const relDiarioRequest = relDiario ? `relDiario.contains=${relDiario}&` : '';
  const verCategoriaRequest = verCategoria ? `verCategoria.contains=${verCategoria}&` : '';
  const cadCategoriaRequest = cadCategoria ? `cadCategoria.contains=${cadCategoria}&` : '';
  const ediCategoriaRequest = ediCategoria ? `ediCategoria.contains=${ediCategoria}&` : '';
  const delCategoriaRequest = delCategoria ? `delCategoria.contains=${delCategoria}&` : '';
  const verEspecialidadeRequest = verEspecialidade ? `verEspecialidade.contains=${verEspecialidade}&` : '';
  const cadEspecialidadeRequest = cadEspecialidade ? `cadEspecialidade.contains=${cadEspecialidade}&` : '';
  const ediEspecialidadeRequest = ediEspecialidade ? `ediEspecialidade.contains=${ediEspecialidade}&` : '';
  const delEspecialidadeRequest = delEspecialidade ? `delEspecialidade.contains=${delEspecialidade}&` : '';
  const relEspecialidadeRequest = relEspecialidade ? `relEspecialidade.contains=${relEspecialidade}&` : '';
  const verEspecialidadeValorRequest = verEspecialidadeValor ? `verEspecialidadeValor.contains=${verEspecialidadeValor}&` : '';
  const cadEspecialidadeValorRequest = cadEspecialidadeValor ? `cadEspecialidadeValor.contains=${cadEspecialidadeValor}&` : '';
  const ediEspecialidadeValorRequest = ediEspecialidadeValor ? `ediEspecialidadeValor.contains=${ediEspecialidadeValor}&` : '';
  const delEspecialidadeValorRequest = delEspecialidadeValor ? `delEspecialidadeValor.contains=${delEspecialidadeValor}&` : '';
  const relEspecialidadeValorRequest = relEspecialidadeValor ? `relEspecialidadeValor.contains=${relEspecialidadeValor}&` : '';
  const verOperadoraRequest = verOperadora ? `verOperadora.contains=${verOperadora}&` : '';
  const cadOperadoraRequest = cadOperadora ? `cadOperadora.contains=${cadOperadora}&` : '';
  const ediOperadoraRequest = ediOperadora ? `ediOperadora.contains=${ediOperadora}&` : '';
  const delOperadoraRequest = delOperadora ? `delOperadora.contains=${delOperadora}&` : '';
  const verPacienteRequest = verPaciente ? `verPaciente.contains=${verPaciente}&` : '';
  const cadPacienteRequest = cadPaciente ? `cadPaciente.contains=${cadPaciente}&` : '';
  const ediPacienteRequest = ediPaciente ? `ediPaciente.contains=${ediPaciente}&` : '';
  const delPacienteRequest = delPaciente ? `delPaciente.contains=${delPaciente}&` : '';
  const relPacienteRequest = relPaciente ? `relPaciente.contains=${relPaciente}&` : '';
  const verProfissionalRequest = verProfissional ? `verProfissional.contains=${verProfissional}&` : '';
  const cadProfissionalRequest = cadProfissional ? `cadProfissional.contains=${cadProfissional}&` : '';
  const ediProfissionalRequest = ediProfissional ? `ediProfissional.contains=${ediProfissional}&` : '';
  const delProfissionalRequest = delProfissional ? `delProfissional.contains=${delProfissional}&` : '';
  const ativProfissionalRequest = ativProfissional ? `ativProfissional.contains=${ativProfissional}&` : '';
  const relProfissionalRequest = relProfissional ? `relProfissional.contains=${relProfissional}&` : '';
  const verPushRequest = verPush ? `verPush.contains=${verPush}&` : '';
  const cadPushPacienteRequest = cadPushPaciente ? `cadPushPaciente.contains=${cadPushPaciente}&` : '';
  const cadPushProfissionalRequest = cadPushProfissional ? `cadPushProfissional.contains=${cadPushProfissional}&` : '';
  const verTermoPacienteRequest = verTermoPaciente ? `verTermoPaciente.contains=${verTermoPaciente}&` : '';
  const ediTermoPacienteRequest = ediTermoPaciente ? `ediTermoPaciente.contains=${ediTermoPaciente}&` : '';
  const verTermoProfissionalRequest = verTermoProfissional ? `verTermoProfissional.contains=${verTermoProfissional}&` : '';
  const ediTermoProfissionalRequest = ediTermoProfissional ? `ediTermoProfissional.contains=${ediTermoProfissional}&` : '';
  const verOutrosRequest = verOutros ? `verOutros.contains=${verOutros}&` : '';
  const cadOutrosRequest = cadOutros ? `cadOutros.contains=${cadOutros}&` : '';
  const ediOutrosRequest = ediOutros ? `ediOutros.contains=${ediOutros}&` : '';
  const delOutrosRequest = delOutros ? `delOutros.contains=${delOutros}&` : '';
  const relOutrosRequest = relOutros ? `relOutros.contains=${relOutros}&` : '';
  const verUnidadeEasyRequest = verUnidadeEasy ? `verUnidadeEasy.contains=${verUnidadeEasy}&` : '';
  const cadUnidadeEasyRequest = cadUnidadeEasy ? `cadUnidadeEasy.contains=${cadUnidadeEasy}&` : '';
  const ediUnidadeEasyRequest = ediUnidadeEasy ? `ediUnidadeEasy.contains=${ediUnidadeEasy}&` : '';
  const delUnidadeEasyRequest = delUnidadeEasy ? `delUnidadeEasy.contains=${delUnidadeEasy}&` : '';
  const verUsuarioRequest = verUsuario ? `verUsuario.contains=${verUsuario}&` : '';
  const cadUsuarioRequest = cadUsuario ? `cadUsuario.contains=${cadUsuario}&` : '';
  const ediUsuarioRequest = ediUsuario ? `ediUsuario.contains=${ediUsuario}&` : '';
  const delUsuarioRequest = delUsuario ? `delUsuario.contains=${delUsuario}&` : '';
  const verPtaResultadoRequest = verPtaResultado ? `verPtaResultado.contains=${verPtaResultado}&` : '';
  const cadPtaResultadoRequest = cadPtaResultado ? `cadPtaResultado.contains=${cadPtaResultado}&` : '';
  const delPtaResultadoRequest = delPtaResultado ? `delPtaResultado.contains=${delPtaResultado}&` : '';
  const verPtaAtividadeRequest = verPtaAtividade ? `verPtaAtividade.contains=${verPtaAtividade}&` : '';
  const cadPtaAtividadeRequest = cadPtaAtividade ? `cadPtaAtividade.contains=${cadPtaAtividade}&` : '';
  const delPtaAtividadeRequest = delPtaAtividade ? `delPtaAtividade.contains=${delPtaAtividade}&` : '';
  const permissaoUsuarioRequest = permissaoUsuario ? `permissaoUsuario.contains=${permissaoUsuario}&` : '';
  const verProntuarioRequest = verProntuario ? `verProntuario.contains=${verProntuario}&` : '';
  const cadProntuarioRequest = cadProntuario ? `cadProntuario.contains=${cadProntuario}&` : '';
  const ediProntuarioRequest = ediProntuario ? `ediProntuario.contains=${ediProntuario}&` : '';
  const delProntuarioRequest = delProntuario ? `delProntuario.contains=${delProntuario}&` : '';
  const delProntuarioFotoRequest = delProntuarioFoto ? `delProntuarioFoto.contains=${delProntuarioFoto}&` : '';
  const valoresFinanceiroRequest = valoresFinanceiro ? `valoresFinanceiro.contains=${valoresFinanceiro}&` : '';
  const autorizacaoValorFinanceiroRequest = autorizacaoValorFinanceiro
    ? `autorizacaoValorFinanceiro.contains=${autorizacaoValorFinanceiro}&`
    : '';
  const confirmarPagamentoFinanceiroRequest = confirmarPagamentoFinanceiro
    ? `confirmarPagamentoFinanceiro.contains=${confirmarPagamentoFinanceiro}&`
    : '';
  const gerenciarSorteiosRequest = gerenciarSorteios ? `gerenciarSorteios.contains=${gerenciarSorteios}&` : '';
  const envioRecusaRequest = envioRecusa ? `envioRecusa.contains=${envioRecusa}&` : '';
  const envioIntercorrenciaRequest = envioIntercorrencia ? `envioIntercorrencia.contains=${envioIntercorrencia}&` : '';
  const envioCancelamentoRequest = envioCancelamento ? `envioCancelamento.contains=${envioCancelamento}&` : '';
  const envioAvaliacaoRequest = envioAvaliacao ? `envioAvaliacao.contains=${envioAvaliacao}&` : '';
  const envioPedidoRequest = envioPedido ? `envioPedido.contains=${envioPedido}&` : '';
  const alertaAtendimentoRequest = alertaAtendimento ? `alertaAtendimento.contains=${alertaAtendimento}&` : '';
  const ativoRequest = ativo ? `ativo.contains=${ativo}&` : '';
  const dataPostRequest = dataPost ? `dataPost.contains=${dataPost}&` : '';
  const envioGlosadoRequest = envioGlosado ? `envioGlosado.contains=${envioGlosado}&` : '';
  const emergenciaRequest = emergencia ? `emergencia.contains=${emergencia}&` : '';
  const tokenRequest = token ? `token.contains=${token}&` : '';
  const editAtendimentoRequest = editAtendimento ? `editAtendimento.contains=${editAtendimento}&` : '';
  const ouvirLigacaoRequest = ouvirLigacao ? `ouvirLigacao.contains=${ouvirLigacao}&` : '';
  const verPainelIndicadoresRequest = verPainelIndicadores ? `verPainelIndicadores.contains=${verPainelIndicadores}&` : '';
  const prorrogarPadRequest = prorrogarPad ? `prorrogarPad.contains=${prorrogarPad}&` : '';
  const cancelarAtendMassaRequest = cancelarAtendMassa ? `cancelarAtendMassa.contains=${cancelarAtendMassa}&` : '';
  const cadMatMedRequest = cadMatMed ? `cadMatMed.contains=${cadMatMed}&` : '';
  const ediMatMedRequest = ediMatMed ? `ediMatMed.contains=${ediMatMed}&` : '';
  const delMatMedRequest = delMatMed ? `delMatMed.contains=${delMatMed}&` : '';
  const verColPtaRequest = verColPta ? `verColPta.contains=${verColPta}&` : '';
  const verColFotoRequest = verColFoto ? `verColFoto.contains=${verColFoto}&` : '';
  const verColLcRequest = verColLc ? `verColLc.contains=${verColLc}&` : '';
  const verAtendCanceladoRequest = verAtendCancelado ? `verAtendCancelado.contains=${verAtendCancelado}&` : '';
  const verAtendAgConfirmacaoRequest = verAtendAgConfirmacao ? `verAtendAgConfirmacao.contains=${verAtendAgConfirmacao}&` : '';
  const ediGeoLocalizacaoAtendimentoRequest = ediGeoLocalizacaoAtendimento
    ? `ediGeoLocalizacaoAtendimento.contains=${ediGeoLocalizacaoAtendimento}&`
    : '';
  const copiarEvolucaoRequest = copiarEvolucao ? `copiarEvolucao.contains=${copiarEvolucao}&` : '';
  const copiarNomeProfRequest = copiarNomeProf ? `copiarNomeProf.contains=${copiarNomeProf}&` : '';
  const copiarRegistroProfRequest = copiarRegistroProf ? `copiarRegistroProf.contains=${copiarRegistroProf}&` : '';
  const idAreaAtuacaoRequest = idAreaAtuacao ? `idAreaAtuacao.contains=${idAreaAtuacao}&` : '';
  const envioCidSemPtaRequest = envioCidSemPta ? `envioCidSemPta.contains=${envioCidSemPta}&` : '';
  const envioAnaliseResultadoEsperadoRequest = envioAnaliseResultadoEsperado
    ? `envioAnaliseResultadoEsperado.contains=${envioAnaliseResultadoEsperado}&`
    : '';
  const envioDescumprimentoRequest = envioDescumprimento ? `envioDescumprimento.contains=${envioDescumprimento}&` : '';
  const envioMelhoraTempoRequest = envioMelhoraTempo ? `envioMelhoraTempo.contains=${envioMelhoraTempo}&` : '';
  const senhaChatRequest = senhaChat ? `senhaChat.contains=${senhaChat}&` : '';
  const diarioRequest = diario ? `diario.equals=${diario}&` : '';
  const pacienteDiarioRequest = pacienteDiario ? `pacienteDiario.equals=${pacienteDiario}&` : '';
  const idTipoUsuarioRequest = idTipoUsuario ? `idTipoUsuario.equals=${idTipoUsuario}&` : '';

  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}&` : '?'}`;
  return {
    type: ACTION_TYPES.FETCH_USUARIO_LIST,
    payload: axios.get<IUsuario>(
      `${requestUrl}${idUnidadeRequest}${idOperadoraRequest}${senhaRequest}${nomeRequest}${emailRequest}${telefoneRequest}${celularRequest}${cpfRequest}${rgRequest}${sexoRequest}${nascimentoRequest}${verAtendimentoRequest}${cadAtendimentoRequest}${ediAtendimentoRequest}${baixaManualAtendimentoRequest}${delAtendimentoRequest}${relAtendimentoRequest}${verPadRequest}${cadPadRequest}${ediPadRequest}${delPadRequest}${relPadRequest}${verDiarioRequest}${cadDiarioRequest}${ediDiarioRequest}${delDiarioRequest}${relDiarioRequest}${verCategoriaRequest}${cadCategoriaRequest}${ediCategoriaRequest}${delCategoriaRequest}${verEspecialidadeRequest}${cadEspecialidadeRequest}${ediEspecialidadeRequest}${delEspecialidadeRequest}${relEspecialidadeRequest}${verEspecialidadeValorRequest}${cadEspecialidadeValorRequest}${ediEspecialidadeValorRequest}${delEspecialidadeValorRequest}${relEspecialidadeValorRequest}${verOperadoraRequest}${cadOperadoraRequest}${ediOperadoraRequest}${delOperadoraRequest}${verPacienteRequest}${cadPacienteRequest}${ediPacienteRequest}${delPacienteRequest}${relPacienteRequest}${verProfissionalRequest}${cadProfissionalRequest}${ediProfissionalRequest}${delProfissionalRequest}${ativProfissionalRequest}${relProfissionalRequest}${verPushRequest}${cadPushPacienteRequest}${cadPushProfissionalRequest}${verTermoPacienteRequest}${ediTermoPacienteRequest}${verTermoProfissionalRequest}${ediTermoProfissionalRequest}${verOutrosRequest}${cadOutrosRequest}${ediOutrosRequest}${delOutrosRequest}${relOutrosRequest}${verUnidadeEasyRequest}${cadUnidadeEasyRequest}${ediUnidadeEasyRequest}${delUnidadeEasyRequest}${verUsuarioRequest}${cadUsuarioRequest}${ediUsuarioRequest}${delUsuarioRequest}${verPtaResultadoRequest}${cadPtaResultadoRequest}${delPtaResultadoRequest}${verPtaAtividadeRequest}${cadPtaAtividadeRequest}${delPtaAtividadeRequest}${permissaoUsuarioRequest}${verProntuarioRequest}${cadProntuarioRequest}${ediProntuarioRequest}${delProntuarioRequest}${delProntuarioFotoRequest}${valoresFinanceiroRequest}${autorizacaoValorFinanceiroRequest}${confirmarPagamentoFinanceiroRequest}${gerenciarSorteiosRequest}${envioRecusaRequest}${envioIntercorrenciaRequest}${envioCancelamentoRequest}${envioAvaliacaoRequest}${envioPedidoRequest}${alertaAtendimentoRequest}${ativoRequest}${dataPostRequest}${envioGlosadoRequest}${emergenciaRequest}${tokenRequest}${editAtendimentoRequest}${ouvirLigacaoRequest}${verPainelIndicadoresRequest}${prorrogarPadRequest}${cancelarAtendMassaRequest}${cadMatMedRequest}${ediMatMedRequest}${delMatMedRequest}${verColPtaRequest}${verColFotoRequest}${verColLcRequest}${verAtendCanceladoRequest}${verAtendAgConfirmacaoRequest}${ediGeoLocalizacaoAtendimentoRequest}${copiarEvolucaoRequest}${copiarNomeProfRequest}${copiarRegistroProfRequest}${idAreaAtuacaoRequest}${envioCidSemPtaRequest}${envioAnaliseResultadoEsperadoRequest}${envioDescumprimentoRequest}${envioMelhoraTempoRequest}${senhaChatRequest}${diarioRequest}${pacienteDiarioRequest}${idTipoUsuarioRequest}cacheBuster=${new Date().getTime()}`
    )
  };
};
export const getEntity: ICrudGetAction<IUsuario> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_USUARIO,
    payload: axios.get<IUsuario>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IUsuario> = entity => async dispatch => {
  entity = {
    ...entity,
    idTipoUsuario: entity.idTipoUsuario === 'null' ? null : entity.idTipoUsuario
  };
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_USUARIO,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IUsuario> = entity => async dispatch => {
  entity = { ...entity, idTipoUsuario: entity.idTipoUsuario === 'null' ? null : entity.idTipoUsuario };
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_USUARIO,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IUsuario> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_USUARIO,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
