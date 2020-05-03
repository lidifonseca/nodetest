import { Moment } from 'moment';
import { IDiario } from 'app/shared/model/diario.model';
import { IPacienteDiario } from 'app/shared/model/paciente-diario.model';
import { IUnidadeEasy } from 'app/shared/model/unidade-easy.model';
import { ITipoUsuario } from 'app/shared/model/tipo-usuario.model';

export interface IUsuario {
  id?: string;
  idOperadora?: string;
  senha?: string;
  nome?: string;
  email?: string;
  telefone?: string;
  celular?: string;
  cpf?: string;
  rg?: string;
  sexo?: number;
  nascimento?: Moment;
  verAtendimento?: number;
  cadAtendimento?: number;
  ediAtendimento?: number;
  baixaManualAtendimento?: number;
  delAtendimento?: number;
  relAtendimento?: number;
  verPad?: number;
  cadPad?: number;
  ediPad?: number;
  delPad?: number;
  relPad?: number;
  verDiario?: number;
  cadDiario?: number;
  ediDiario?: number;
  delDiario?: number;
  relDiario?: number;
  verCategoria?: number;
  cadCategoria?: number;
  ediCategoria?: number;
  delCategoria?: number;
  verEspecialidade?: number;
  cadEspecialidade?: number;
  ediEspecialidade?: number;
  delEspecialidade?: number;
  relEspecialidade?: number;
  verEspecialidadeValor?: number;
  cadEspecialidadeValor?: number;
  ediEspecialidadeValor?: number;
  delEspecialidadeValor?: number;
  relEspecialidadeValor?: number;
  verOperadora?: number;
  cadOperadora?: number;
  ediOperadora?: number;
  delOperadora?: number;
  verPaciente?: number;
  cadPaciente?: number;
  ediPaciente?: number;
  delPaciente?: number;
  relPaciente?: number;
  verProfissional?: number;
  cadProfissional?: number;
  ediProfissional?: number;
  delProfissional?: number;
  ativProfissional?: number;
  relProfissional?: number;
  verPush?: number;
  cadPushPaciente?: number;
  cadPushProfissional?: number;
  verTermoPaciente?: number;
  ediTermoPaciente?: number;
  verTermoProfissional?: number;
  ediTermoProfissional?: number;
  verOutros?: number;
  cadOutros?: number;
  ediOutros?: number;
  delOutros?: number;
  relOutros?: number;
  verUnidadeEasy?: number;
  cadUnidadeEasy?: number;
  ediUnidadeEasy?: number;
  delUnidadeEasy?: number;
  verUsuario?: number;
  cadUsuario?: number;
  ediUsuario?: number;
  delUsuario?: number;
  verPtaResultado?: number;
  cadPtaResultado?: number;
  delPtaResultado?: number;
  verPtaAtividade?: number;
  cadPtaAtividade?: number;
  delPtaAtividade?: number;
  permissaoUsuario?: number;
  verProntuario?: number;
  cadProntuario?: number;
  ediProntuario?: number;
  delProntuario?: number;
  delProntuarioFoto?: number;
  valoresFinanceiro?: number;
  autorizacaoValorFinanceiro?: number;
  confirmarPagamentoFinanceiro?: number;
  gerenciarSorteios?: number;
  envioRecusa?: number;
  envioIntercorrencia?: number;
  envioCancelamento?: number;
  envioAvaliacao?: number;
  envioPedido?: number;
  alertaAtendimento?: number;
  ativo?: number;
  envioGlosado?: number;
  emergencia?: number;
  token?: number;
  editAtendimento?: number;
  ouvirLigacao?: number;
  verPainelIndicadores?: number;
  prorrogarPad?: number;
  cancelarAtendMassa?: number;
  cadMatMed?: number;
  ediMatMed?: number;
  delMatMed?: number;
  verColPta?: number;
  verColFoto?: number;
  verColLc?: number;
  verAtendCancelado?: number;
  verAtendAgConfirmacao?: number;
  ediGeoLocalizacaoAtendimento?: number;
  copiarEvolucao?: number;
  copiarNomeProf?: number;
  copiarRegistroProf?: number;
  idAreaAtuacao?: string;
  envioCidSemPta?: number;
  envioAnaliseResultadoEsperado?: number;
  envioDescumprimento?: number;
  envioMelhoraTempo?: boolean;
  senhaChat?: string;
  diarios?: IDiario[];
  pacienteDiarios?: IPacienteDiario[];
  unidadeRazaoSocial?: string;
  unidade?: string | any;
  idTipoUsuario?: string | any;
}

export const defaultValue: Readonly<IUsuario> = {
  envioMelhoraTempo: false
};
