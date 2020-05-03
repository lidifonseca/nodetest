import { combineReducers } from 'redux';
import { loadingBarReducer as loadingBar } from 'react-redux-loading-bar';

import locale, { LocaleState } from './locale';
import authentication, { AuthenticationState } from './authentication';
import sidebar, { SidebarState } from './sidebar';
import applicationProfile, { ApplicationProfileState } from './application-profile';

import administration, { AdministrationState } from 'app/modules/administration/administration.reducer';
import userManagement, { UserManagementState } from 'app/modules/administration/user-management/user-management.reducer';
import register, { RegisterState } from 'app/modules/account/register/register.reducer';
import activate, { ActivateState } from 'app/modules/account/activate/activate.reducer';
import password, { PasswordState } from 'app/modules/account/password/password.reducer';
import settings, { SettingsState } from 'app/modules/account/settings/settings.reducer';
import passwordReset, { PasswordResetState } from 'app/modules/account/password-reset/password-reset.reducer';
// prettier-ignore
import paciente, {
  PacienteState
} from 'app/entities/paciente/paciente.reducer';
// prettier-ignore
import cidade, {
  CidadeState
} from 'app/entities/cidade/cidade.reducer';
// prettier-ignore
import cepbrBairro, {
  CepbrBairroState
} from 'app/entities/cepbr-bairro/cepbr-bairro.reducer';
// prettier-ignore
import cepbrCidade, {
  CepbrCidadeState
} from 'app/entities/cepbr-cidade/cepbr-cidade.reducer';
// prettier-ignore
import cepbrEstado, {
  CepbrEstadoState
} from 'app/entities/cepbr-estado/cepbr-estado.reducer';
// prettier-ignore
import cepbrEndereco, {
  CepbrEnderecoState
} from 'app/entities/cepbr-endereco/cepbr-endereco.reducer';
// prettier-ignore
import cid, {
  CidState
} from 'app/entities/cid/cid.reducer';
// prettier-ignore
import julho, {
  JulhoState
} from 'app/entities/julho/julho.reducer';
// prettier-ignore
import junho, {
  JunhoState
} from 'app/entities/junho/junho.reducer';
// prettier-ignore
import maio, {
  MaioState
} from 'app/entities/maio/maio.reducer';
// prettier-ignore
import padCsv, {
  PadCsvState
} from 'app/entities/pad-csv/pad-csv.reducer';
// prettier-ignore
import phinxlog, {
  PhinxlogState
} from 'app/entities/phinxlog/phinxlog.reducer';
// prettier-ignore
import acao, {
  AcaoState
} from 'app/entities/acao/acao.reducer';
// prettier-ignore
import acoesRespostas, {
  AcoesRespostasState
} from 'app/entities/acoes-respostas/acoes-respostas.reducer';
// prettier-ignore
import alertasIndicadores, {
  AlertasIndicadoresState
} from 'app/entities/alertas-indicadores/alertas-indicadores.reducer';
// prettier-ignore
import alertasResultadosEsperados, {
  AlertasResultadosEsperadosState
} from 'app/entities/alertas-resultados-esperados/alertas-resultados-esperados.reducer';
// prettier-ignore
import apiInput, {
  ApiInputState
} from 'app/entities/api-input/api-input.reducer';
// prettier-ignore
import apiName, {
  ApiNameState
} from 'app/entities/api-name/api-name.reducer';
// prettier-ignore
import apiReturn, {
  ApiReturnState
} from 'app/entities/api-return/api-return.reducer';
// prettier-ignore
import atendimento, {
  AtendimentoState
} from 'app/entities/atendimento/atendimento.reducer';
// prettier-ignore
import atendimentoAceite, {
  AtendimentoAceiteState
} from 'app/entities/atendimento-aceite/atendimento-aceite.reducer';
// prettier-ignore
import atendimentoAcompanhamentoPush, {
  AtendimentoAcompanhamentoPushState
} from 'app/entities/atendimento-acompanhamento-push/atendimento-acompanhamento-push.reducer';
// prettier-ignore
import atendimentoAssinaturas, {
  AtendimentoAssinaturasState
} from 'app/entities/atendimento-assinaturas/atendimento-assinaturas.reducer';
// prettier-ignore
import atendimentoAtividades, {
  AtendimentoAtividadesState
} from 'app/entities/atendimento-atividades/atendimento-atividades.reducer';
// prettier-ignore
import atendimentoCepRecusado, {
  AtendimentoCepRecusadoState
} from 'app/entities/atendimento-cep-recusado/atendimento-cep-recusado.reducer';
// prettier-ignore
import atendimentoGlosado, {
  AtendimentoGlosadoState
} from 'app/entities/atendimento-glosado/atendimento-glosado.reducer';
// prettier-ignore
import atendimentoImagem, {
  AtendimentoImagemState
} from 'app/entities/atendimento-imagem/atendimento-imagem.reducer';
// prettier-ignore
import atendimentoSorteioFeito, {
  AtendimentoSorteioFeitoState
} from 'app/entities/atendimento-sorteio-feito/atendimento-sorteio-feito.reducer';
// prettier-ignore
import atendimentoStatusFinanceiro, {
  AtendimentoStatusFinanceiroState
} from 'app/entities/atendimento-status-financeiro/atendimento-status-financeiro.reducer';
// prettier-ignore
import atividades, {
  AtividadesState
} from 'app/entities/atividades/atividades.reducer';
// prettier-ignore
import banco, {
  BancoState
} from 'app/entities/banco/banco.reducer';
// prettier-ignore
import categoria, {
  CategoriaState
} from 'app/entities/categoria/categoria.reducer';
// prettier-ignore
import categoriaAtividade, {
  CategoriaAtividadeState
} from 'app/entities/categoria-atividade/categoria-atividade.reducer';
// prettier-ignore
import categoriaContrato, {
  CategoriaContratoState
} from 'app/entities/categoria-contrato/categoria-contrato.reducer';
// prettier-ignore
import categoriaUnidade, {
  CategoriaUnidadeState
} from 'app/entities/categoria-unidade/categoria-unidade.reducer';
// prettier-ignore
import cidPta, {
  CidPtaState
} from 'app/entities/cid-pta/cid-pta.reducer';
// prettier-ignore
import cidXPtaNovo, {
  CidXPtaNovoState
} from 'app/entities/cid-x-pta-novo/cid-x-pta-novo.reducer';
// prettier-ignore
import cidXPtaNovoPadItemIndicadores, {
  CidXPtaNovoPadItemIndicadoresState
} from 'app/entities/cid-x-pta-novo-pad-item-indicadores/cid-x-pta-novo-pad-item-indicadores.reducer';
// prettier-ignore
import controleDisparoAviso, {
  ControleDisparoAvisoState
} from 'app/entities/controle-disparo-aviso/controle-disparo-aviso.reducer';
// prettier-ignore
import descPta, {
  DescPtaState
} from 'app/entities/desc-pta/desc-pta.reducer';
// prettier-ignore
import diario, {
  DiarioState
} from 'app/entities/diario/diario.reducer';
// prettier-ignore
import diarioTags, {
  DiarioTagsState
} from 'app/entities/diario-tags/diario-tags.reducer';
// prettier-ignore
import empresa, {
  EmpresaState
} from 'app/entities/empresa/empresa.reducer';
// prettier-ignore
import especialidade, {
  EspecialidadeState
} from 'app/entities/especialidade/especialidade.reducer';
// prettier-ignore
import especialidadeOperadora, {
  EspecialidadeOperadoraState
} from 'app/entities/especialidade-operadora/especialidade-operadora.reducer';
// prettier-ignore
import especialidadeUnidade, {
  EspecialidadeUnidadeState
} from 'app/entities/especialidade-unidade/especialidade-unidade.reducer';
// prettier-ignore
import especialidadeValor, {
  EspecialidadeValorState
} from 'app/entities/especialidade-valor/especialidade-valor.reducer';
// prettier-ignore
import filesPanico, {
  FilesPanicoState
} from 'app/entities/files-panico/files-panico.reducer';
// prettier-ignore
import franquia, {
  FranquiaState
} from 'app/entities/franquia/franquia.reducer';
// prettier-ignore
import franquiaAreaAtuacao, {
  FranquiaAreaAtuacaoState
} from 'app/entities/franquia-area-atuacao/franquia-area-atuacao.reducer';
// prettier-ignore
import franquiaStatusAtual, {
  FranquiaStatusAtualState
} from 'app/entities/franquia-status-atual/franquia-status-atual.reducer';
// prettier-ignore
import franquiaUsuario, {
  FranquiaUsuarioState
} from 'app/entities/franquia-usuario/franquia-usuario.reducer';
// prettier-ignore
import geoPanico, {
  GeoPanicoState
} from 'app/entities/geo-panico/geo-panico.reducer';
// prettier-ignore
import grauParentesco, {
  GrauParentescoState
} from 'app/entities/grau-parentesco/grau-parentesco.reducer';
// prettier-ignore
import grupoRisco, {
  GrupoRiscoState
} from 'app/entities/grupo-risco/grupo-risco.reducer';
// prettier-ignore
import imagemProntuario, {
  ImagemProntuarioState
} from 'app/entities/imagem-prontuario/imagem-prontuario.reducer';
// prettier-ignore
import indicadores, {
  IndicadoresState
} from 'app/entities/indicadores/indicadores.reducer';
// prettier-ignore
import indicadoresValores, {
  IndicadoresValoresState
} from 'app/entities/indicadores-valores/indicadores-valores.reducer';
// prettier-ignore
import licaoCasa, {
  LicaoCasaState
} from 'app/entities/licao-casa/licao-casa.reducer';
// prettier-ignore
import licaoCasaEvolucao, {
  LicaoCasaEvolucaoState
} from 'app/entities/licao-casa-evolucao/licao-casa-evolucao.reducer';
// prettier-ignore
import logPacAcesso, {
  LogPacAcessoState
} from 'app/entities/log-pac-acesso/log-pac-acesso.reducer';
// prettier-ignore
import logUser, {
  LogUserState
} from 'app/entities/log-user/log-user.reducer';
// prettier-ignore
import logUserFranquia, {
  LogUserFranquiaState
} from 'app/entities/log-user-franquia/log-user-franquia.reducer';
// prettier-ignore
import matMed, {
  MatMedState
} from 'app/entities/mat-med/mat-med.reducer';
// prettier-ignore
import migracao, {
  MigracaoState
} from 'app/entities/migracao/migracao.reducer';
// prettier-ignore
import modulosPad, {
  ModulosPadState
} from 'app/entities/modulos-pad/modulos-pad.reducer';
// prettier-ignore
import modulosPadConfig, {
  ModulosPadConfigState
} from 'app/entities/modulos-pad-config/modulos-pad-config.reducer';
// prettier-ignore
import motivoInternacao, {
  MotivoInternacaoState
} from 'app/entities/motivo-internacao/motivo-internacao.reducer';
// prettier-ignore
import motivoPs, {
  MotivoPsState
} from 'app/entities/motivo-ps/motivo-ps.reducer';
// prettier-ignore
import notificacaoConfig, {
  NotificacaoConfigState
} from 'app/entities/notificacao-config/notificacao-config.reducer';
// prettier-ignore
import notificacaoConfigUsuario, {
  NotificacaoConfigUsuarioState
} from 'app/entities/notificacao-config-usuario/notificacao-config-usuario.reducer';
// prettier-ignore
import ocorrenciaProntuario, {
  OcorrenciaProntuarioState
} from 'app/entities/ocorrencia-prontuario/ocorrencia-prontuario.reducer';
// prettier-ignore
import operadora, {
  OperadoraState
} from 'app/entities/operadora/operadora.reducer';
// prettier-ignore
import pacienteArquivo, {
  PacienteArquivoState
} from 'app/entities/paciente-arquivo/paciente-arquivo.reducer';
// prettier-ignore
import pacienteCaracteristicaAtual, {
  PacienteCaracteristicaAtualState
} from 'app/entities/paciente-caracteristica-atual/paciente-caracteristica-atual.reducer';
// prettier-ignore
import pacienteComplexidadeAtual, {
  PacienteComplexidadeAtualState
} from 'app/entities/paciente-complexidade-atual/paciente-complexidade-atual.reducer';
// prettier-ignore
import pacienteDadosCartao, {
  PacienteDadosCartaoState
} from 'app/entities/paciente-dados-cartao/paciente-dados-cartao.reducer';
// prettier-ignore
import pacienteDiagnostico, {
  PacienteDiagnosticoState
} from 'app/entities/paciente-diagnostico/paciente-diagnostico.reducer';
// prettier-ignore
import pacienteDiagnosticoTemp, {
  PacienteDiagnosticoTempState
} from 'app/entities/paciente-diagnostico-temp/paciente-diagnostico-temp.reducer';
// prettier-ignore
import pacienteDiario, {
  PacienteDiarioState
} from 'app/entities/paciente-diario/paciente-diario.reducer';
// prettier-ignore
import pacienteDiarioTags, {
  PacienteDiarioTagsState
} from 'app/entities/paciente-diario-tags/paciente-diario-tags.reducer';
// prettier-ignore
import pacienteDispositivoAtual, {
  PacienteDispositivoAtualState
} from 'app/entities/paciente-dispositivo-atual/paciente-dispositivo-atual.reducer';
// prettier-ignore
import pacienteDispositivoComplexidade, {
  PacienteDispositivoComplexidadeState
} from 'app/entities/paciente-dispositivo-complexidade/paciente-dispositivo-complexidade.reducer';
// prettier-ignore
import pacienteEnqueteApp, {
  PacienteEnqueteAppState
} from 'app/entities/paciente-enquete-app/paciente-enquete-app.reducer';
// prettier-ignore
import pacienteGrauParentesco, {
  PacienteGrauParentescoState
} from 'app/entities/paciente-grau-parentesco/paciente-grau-parentesco.reducer';
// prettier-ignore
import pacienteHospital, {
  PacienteHospitalState
} from 'app/entities/paciente-hospital/paciente-hospital.reducer';
// prettier-ignore
import pacienteMotivoInternacao, {
  PacienteMotivoInternacaoState
} from 'app/entities/paciente-motivo-internacao/paciente-motivo-internacao.reducer';
// prettier-ignore
import pacienteOperadora, {
  PacienteOperadoraState
} from 'app/entities/paciente-operadora/paciente-operadora.reducer';
// prettier-ignore
import pacientePedido, {
  PacientePedidoState
} from 'app/entities/paciente-pedido/paciente-pedido.reducer';
// prettier-ignore
import pacienteProntuario, {
  PacienteProntuarioState
} from 'app/entities/paciente-prontuario/paciente-prontuario.reducer';
// prettier-ignore
import pacientePush, {
  PacientePushState
} from 'app/entities/paciente-push/paciente-push.reducer';
// prettier-ignore
import pacienteServico, {
  PacienteServicoState
} from 'app/entities/paciente-servico/paciente-servico.reducer';
// prettier-ignore
import pacienteStatusAtual, {
  PacienteStatusAtualState
} from 'app/entities/paciente-status-atual/paciente-status-atual.reducer';
// prettier-ignore
import pad, {
  PadState
} from 'app/entities/pad/pad.reducer';
// prettier-ignore
import padCid, {
  PadCidState
} from 'app/entities/pad-cid/pad-cid.reducer';
// prettier-ignore
import padItem, {
  PadItemState
} from 'app/entities/pad-item/pad-item.reducer';
// prettier-ignore
import padItemAlerta, {
  PadItemAlertaState
} from 'app/entities/pad-item-alerta/pad-item-alerta.reducer';
// prettier-ignore
import padItemAtividade, {
  PadItemAtividadeState
} from 'app/entities/pad-item-atividade/pad-item-atividade.reducer';
// prettier-ignore
import padItemCepRecusado, {
  PadItemCepRecusadoState
} from 'app/entities/pad-item-cep-recusado/pad-item-cep-recusado.reducer';
// prettier-ignore
import padItemHistDataIncComp, {
  PadItemHistDataIncCompState
} from 'app/entities/pad-item-hist-data-inc-comp/pad-item-hist-data-inc-comp.reducer';
// prettier-ignore
import padItemIndicadores, {
  PadItemIndicadoresState
} from 'app/entities/pad-item-indicadores/pad-item-indicadores.reducer';
// prettier-ignore
import padItemMeta, {
  PadItemMetaState
} from 'app/entities/pad-item-meta/pad-item-meta.reducer';
// prettier-ignore
import padItemResultado, {
  PadItemResultadoState
} from 'app/entities/pad-item-resultado/pad-item-resultado.reducer';
// prettier-ignore
import padItemSorteioFeito, {
  PadItemSorteioFeitoState
} from 'app/entities/pad-item-sorteio-feito/pad-item-sorteio-feito.reducer';
// prettier-ignore
import padItemTemp, {
  PadItemTempState
} from 'app/entities/pad-item-temp/pad-item-temp.reducer';
// prettier-ignore
import padMatMed, {
  PadMatMedState
} from 'app/entities/pad-mat-med/pad-mat-med.reducer';
// prettier-ignore
import padPta, {
  PadPtaState
} from 'app/entities/pad-pta/pad-pta.reducer';
// prettier-ignore
import padPtaTemp, {
  PadPtaTempState
} from 'app/entities/pad-pta-temp/pad-pta-temp.reducer';
// prettier-ignore
import perguntasQuestionario, {
  PerguntasQuestionarioState
} from 'app/entities/perguntas-questionario/perguntas-questionario.reducer';
// prettier-ignore
import periodicidade, {
  PeriodicidadeState
} from 'app/entities/periodicidade/periodicidade.reducer';
// prettier-ignore
import periodo, {
  PeriodoState
} from 'app/entities/periodo/periodo.reducer';
// prettier-ignore
import profissional, {
  ProfissionalState
} from 'app/entities/profissional/profissional.reducer';
// prettier-ignore
import profissionalAreaAtuacao, {
  ProfissionalAreaAtuacaoState
} from 'app/entities/profissional-area-atuacao/profissional-area-atuacao.reducer';
// prettier-ignore
import profissionalAreaAtuacaoNew, {
  ProfissionalAreaAtuacaoNewState
} from 'app/entities/profissional-area-atuacao-new/profissional-area-atuacao-new.reducer';
// prettier-ignore
import profissionalArquivo, {
  ProfissionalArquivoState
} from 'app/entities/profissional-arquivo/profissional-arquivo.reducer';
// prettier-ignore
import profissionalCategoriaContrato, {
  ProfissionalCategoriaContratoState
} from 'app/entities/profissional-categoria-contrato/profissional-categoria-contrato.reducer';
// prettier-ignore
import profissionalComplexidadeAtual, {
  ProfissionalComplexidadeAtualState
} from 'app/entities/profissional-complexidade-atual/profissional-complexidade-atual.reducer';
// prettier-ignore
import profissionalDispositivoAtual, {
  ProfissionalDispositivoAtualState
} from 'app/entities/profissional-dispositivo-atual/profissional-dispositivo-atual.reducer';
// prettier-ignore
import profissionalDispositivoComplexidade, {
  ProfissionalDispositivoComplexidadeState
} from 'app/entities/profissional-dispositivo-complexidade/profissional-dispositivo-complexidade.reducer';
// prettier-ignore
import profissionalDispositivoComplexidadeAtual, {
  ProfissionalDispositivoComplexidadeAtualState
} from 'app/entities/profissional-dispositivo-complexidade-atual/profissional-dispositivo-complexidade-atual.reducer';
// prettier-ignore
import profissionalEspecialidade, {
  ProfissionalEspecialidadeState
} from 'app/entities/profissional-especialidade/profissional-especialidade.reducer';
// prettier-ignore
import profissionalEspecialidadeNew, {
  ProfissionalEspecialidadeNewState
} from 'app/entities/profissional-especialidade-new/profissional-especialidade-new.reducer';
// prettier-ignore
import profissionalFranquia, {
  ProfissionalFranquiaState
} from 'app/entities/profissional-franquia/profissional-franquia.reducer';
// prettier-ignore
import profissionalHorario, {
  ProfissionalHorarioState
} from 'app/entities/profissional-horario/profissional-horario.reducer';
// prettier-ignore
import profissionalNew, {
  ProfissionalNewState
} from 'app/entities/profissional-new/profissional-new.reducer';
// prettier-ignore
import profissionalPush, {
  ProfissionalPushState
} from 'app/entities/profissional-push/profissional-push.reducer';
// prettier-ignore
import profissionalStatusAtual, {
  ProfissionalStatusAtualState
} from 'app/entities/profissional-status-atual/profissional-status-atual.reducer';
// prettier-ignore
import profissionalStatusAtualNew, {
  ProfissionalStatusAtualNewState
} from 'app/entities/profissional-status-atual-new/profissional-status-atual-new.reducer';
// prettier-ignore
import prontuarioMotivoInternacaoPs, {
  ProntuarioMotivoInternacaoPsState
} from 'app/entities/prontuario-motivo-internacao-ps/prontuario-motivo-internacao-ps.reducer';
// prettier-ignore
import prontuarioMotivoManifestacao, {
  ProntuarioMotivoManifestacaoState
} from 'app/entities/prontuario-motivo-manifestacao/prontuario-motivo-manifestacao.reducer';
// prettier-ignore
import prontuarioTipoManifestacao, {
  ProntuarioTipoManifestacaoState
} from 'app/entities/prontuario-tipo-manifestacao/prontuario-tipo-manifestacao.reducer';
// prettier-ignore
import prontuarioTipoMotivo, {
  ProntuarioTipoMotivoState
} from 'app/entities/prontuario-tipo-motivo/prontuario-tipo-motivo.reducer';
// prettier-ignore
import protocolos, {
  ProtocolosState
} from 'app/entities/protocolos/protocolos.reducer';
// prettier-ignore
import pushnotificationEnvios, {
  PushnotificationEnviosState
} from 'app/entities/pushnotification-envios/pushnotification-envios.reducer';
// prettier-ignore
import questionarios, {
  QuestionariosState
} from 'app/entities/questionarios/questionarios.reducer';
// prettier-ignore
import reportEmailAtendimento, {
  ReportEmailAtendimentoState
} from 'app/entities/report-email-atendimento/report-email-atendimento.reducer';
// prettier-ignore
import respostas, {
  RespostasState
} from 'app/entities/respostas/respostas.reducer';
// prettier-ignore
import respostasQuestionarios, {
  RespostasQuestionariosState
} from 'app/entities/respostas-questionarios/respostas-questionarios.reducer';
// prettier-ignore
import resultados, {
  ResultadosState
} from 'app/entities/resultados/resultados.reducer';
// prettier-ignore
import segmentosPerguntas, {
  SegmentosPerguntasState
} from 'app/entities/segmentos-perguntas/segmentos-perguntas.reducer';
// prettier-ignore
import servico, {
  ServicoState
} from 'app/entities/servico/servico.reducer';
// prettier-ignore
import statusAtendimento, {
  StatusAtendimentoState
} from 'app/entities/status-atendimento/status-atendimento.reducer';
// prettier-ignore
import statusAtual, {
  StatusAtualState
} from 'app/entities/status-atual/status-atual.reducer';
// prettier-ignore
import statusAtualLigacao, {
  StatusAtualLigacaoState
} from 'app/entities/status-atual-ligacao/status-atual-ligacao.reducer';
// prettier-ignore
import statusAtualProf, {
  StatusAtualProfState
} from 'app/entities/status-atual-prof/status-atual-prof.reducer';
// prettier-ignore
import statusFinanceiro, {
  StatusFinanceiroState
} from 'app/entities/status-financeiro/status-financeiro.reducer';
// prettier-ignore
import statusPadItemMeta, {
  StatusPadItemMetaState
} from 'app/entities/status-pad-item-meta/status-pad-item-meta.reducer';
// prettier-ignore
import tela, {
  TelaState
} from 'app/entities/tela/tela.reducer';
// prettier-ignore
import tempoExperiencia, {
  TempoExperienciaState
} from 'app/entities/tempo-experiencia/tempo-experiencia.reducer';
// prettier-ignore
import termosUso, {
  TermosUsoState
} from 'app/entities/termos-uso/termos-uso.reducer';
// prettier-ignore
import tipoEspecialidade, {
  TipoEspecialidadeState
} from 'app/entities/tipo-especialidade/tipo-especialidade.reducer';
// prettier-ignore
import tipoExame, {
  TipoExameState
} from 'app/entities/tipo-exame/tipo-exame.reducer';
// prettier-ignore
import tipoMatMed, {
  TipoMatMedState
} from 'app/entities/tipo-mat-med/tipo-mat-med.reducer';
// prettier-ignore
import tipoOperadora, {
  TipoOperadoraState
} from 'app/entities/tipo-operadora/tipo-operadora.reducer';
// prettier-ignore
import tipoPreferenciaAtendimento, {
  TipoPreferenciaAtendimentoState
} from 'app/entities/tipo-preferencia-atendimento/tipo-preferencia-atendimento.reducer';
// prettier-ignore
import tipoProntuario, {
  TipoProntuarioState
} from 'app/entities/tipo-prontuario/tipo-prontuario.reducer';
// prettier-ignore
import tipoUnidade, {
  TipoUnidadeState
} from 'app/entities/tipo-unidade/tipo-unidade.reducer';
// prettier-ignore
import tipoUsuario, {
  TipoUsuarioState
} from 'app/entities/tipo-usuario/tipo-usuario.reducer';
// prettier-ignore
import tokenUsuario, {
  TokenUsuarioState
} from 'app/entities/token-usuario/token-usuario.reducer';
// prettier-ignore
import uf, {
  UfState
} from 'app/entities/uf/uf.reducer';
// prettier-ignore
import unidadeEasy, {
  UnidadeEasyState
} from 'app/entities/unidade-easy/unidade-easy.reducer';
// prettier-ignore
import unidadeEasyAreaAtuacao, {
  UnidadeEasyAreaAtuacaoState
} from 'app/entities/unidade-easy-area-atuacao/unidade-easy-area-atuacao.reducer';
// prettier-ignore
import unidadeMedida, {
  UnidadeMedidaState
} from 'app/entities/unidade-medida/unidade-medida.reducer';
// prettier-ignore
import usuario, {
  UsuarioState
} from 'app/entities/usuario/usuario.reducer';
// prettier-ignore
import usuarioAcao, {
  UsuarioAcaoState
} from 'app/entities/usuario-acao/usuario-acao.reducer';
// prettier-ignore
import usuarioPainelGerencial, {
  UsuarioPainelGerencialState
} from 'app/entities/usuario-painel-gerencial/usuario-painel-gerencial.reducer';
// prettier-ignore
import usuarioPanico, {
  UsuarioPanicoState
} from 'app/entities/usuario-panico/usuario-panico.reducer';
// prettier-ignore
import usuarioStatusAtual, {
  UsuarioStatusAtualState
} from 'app/entities/usuario-status-atual/usuario-status-atual.reducer';
// prettier-ignore
import vwApiAtendimentosAceite, {
  VwApiAtendimentosAceiteState
} from 'app/entities/vw-api-atendimentos-aceite/vw-api-atendimentos-aceite.reducer';
// prettier-ignore
import cidXPtaNovoPadItemIndi, {
  CidXPtaNovoPadItemIndiState
} from 'app/entities/cid-x-pta-novo-pad-item-indi/cid-x-pta-novo-pad-item-indi.reducer';
/* jhipster-needle-add-reducer-import - JHipster will add reducer here */

export interface IRootState {
  readonly authentication: AuthenticationState;
  readonly sidebar: SidebarState;
  readonly locale: LocaleState;
  readonly applicationProfile: ApplicationProfileState;
  readonly administration: AdministrationState;
  readonly userManagement: UserManagementState;
  readonly register: RegisterState;
  readonly activate: ActivateState;
  readonly passwordReset: PasswordResetState;
  readonly password: PasswordState;
  readonly settings: SettingsState;
  readonly paciente: PacienteState;
  readonly cidade: CidadeState;
  readonly cepbrBairro: CepbrBairroState;
  readonly cepbrCidade: CepbrCidadeState;
  readonly cepbrEstado: CepbrEstadoState;
  readonly cepbrEndereco: CepbrEnderecoState;
  readonly cid: CidState;
  readonly julho: JulhoState;
  readonly junho: JunhoState;
  readonly maio: MaioState;
  readonly padCsv: PadCsvState;
  readonly phinxlog: PhinxlogState;
  readonly acao: AcaoState;
  readonly acoesRespostas: AcoesRespostasState;
  readonly alertasIndicadores: AlertasIndicadoresState;
  readonly alertasResultadosEsperados: AlertasResultadosEsperadosState;
  readonly apiInput: ApiInputState;
  readonly apiName: ApiNameState;
  readonly apiReturn: ApiReturnState;
  readonly atendimento: AtendimentoState;
  readonly atendimentoAceite: AtendimentoAceiteState;
  readonly atendimentoAcompanhamentoPush: AtendimentoAcompanhamentoPushState;
  readonly atendimentoAssinaturas: AtendimentoAssinaturasState;
  readonly atendimentoAtividades: AtendimentoAtividadesState;
  readonly atendimentoCepRecusado: AtendimentoCepRecusadoState;
  readonly atendimentoGlosado: AtendimentoGlosadoState;
  readonly atendimentoImagem: AtendimentoImagemState;
  readonly atendimentoSorteioFeito: AtendimentoSorteioFeitoState;
  readonly atendimentoStatusFinanceiro: AtendimentoStatusFinanceiroState;
  readonly atividades: AtividadesState;
  readonly banco: BancoState;
  readonly categoria: CategoriaState;
  readonly categoriaAtividade: CategoriaAtividadeState;
  readonly categoriaContrato: CategoriaContratoState;
  readonly categoriaUnidade: CategoriaUnidadeState;
  readonly cidPta: CidPtaState;
  readonly cidXPtaNovo: CidXPtaNovoState;
  readonly cidXPtaNovoPadItemIndicadores: CidXPtaNovoPadItemIndicadoresState;
  readonly controleDisparoAviso: ControleDisparoAvisoState;
  readonly descPta: DescPtaState;
  readonly diario: DiarioState;
  readonly diarioTags: DiarioTagsState;
  readonly empresa: EmpresaState;
  readonly especialidade: EspecialidadeState;
  readonly especialidadeOperadora: EspecialidadeOperadoraState;
  readonly especialidadeUnidade: EspecialidadeUnidadeState;
  readonly especialidadeValor: EspecialidadeValorState;
  readonly filesPanico: FilesPanicoState;
  readonly franquia: FranquiaState;
  readonly franquiaAreaAtuacao: FranquiaAreaAtuacaoState;
  readonly franquiaStatusAtual: FranquiaStatusAtualState;
  readonly franquiaUsuario: FranquiaUsuarioState;
  readonly geoPanico: GeoPanicoState;
  readonly grauParentesco: GrauParentescoState;
  readonly grupoRisco: GrupoRiscoState;
  readonly imagemProntuario: ImagemProntuarioState;
  readonly indicadores: IndicadoresState;
  readonly indicadoresValores: IndicadoresValoresState;
  readonly licaoCasa: LicaoCasaState;
  readonly licaoCasaEvolucao: LicaoCasaEvolucaoState;
  readonly logPacAcesso: LogPacAcessoState;
  readonly logUser: LogUserState;
  readonly logUserFranquia: LogUserFranquiaState;
  readonly matMed: MatMedState;
  readonly migracao: MigracaoState;
  readonly modulosPad: ModulosPadState;
  readonly modulosPadConfig: ModulosPadConfigState;
  readonly motivoInternacao: MotivoInternacaoState;
  readonly motivoPs: MotivoPsState;
  readonly notificacaoConfig: NotificacaoConfigState;
  readonly notificacaoConfigUsuario: NotificacaoConfigUsuarioState;
  readonly ocorrenciaProntuario: OcorrenciaProntuarioState;
  readonly operadora: OperadoraState;
  readonly pacienteArquivo: PacienteArquivoState;
  readonly pacienteCaracteristicaAtual: PacienteCaracteristicaAtualState;
  readonly pacienteComplexidadeAtual: PacienteComplexidadeAtualState;
  readonly pacienteDadosCartao: PacienteDadosCartaoState;
  readonly pacienteDiagnostico: PacienteDiagnosticoState;
  readonly pacienteDiagnosticoTemp: PacienteDiagnosticoTempState;
  readonly pacienteDiario: PacienteDiarioState;
  readonly pacienteDiarioTags: PacienteDiarioTagsState;
  readonly pacienteDispositivoAtual: PacienteDispositivoAtualState;
  readonly pacienteDispositivoComplexidade: PacienteDispositivoComplexidadeState;
  readonly pacienteEnqueteApp: PacienteEnqueteAppState;
  readonly pacienteGrauParentesco: PacienteGrauParentescoState;
  readonly pacienteHospital: PacienteHospitalState;
  readonly pacienteMotivoInternacao: PacienteMotivoInternacaoState;
  readonly pacienteOperadora: PacienteOperadoraState;
  readonly pacientePedido: PacientePedidoState;
  readonly pacienteProntuario: PacienteProntuarioState;
  readonly pacientePush: PacientePushState;
  readonly pacienteServico: PacienteServicoState;
  readonly pacienteStatusAtual: PacienteStatusAtualState;
  readonly pad: PadState;
  readonly padCid: PadCidState;
  readonly padItem: PadItemState;
  readonly padItemAlerta: PadItemAlertaState;
  readonly padItemAtividade: PadItemAtividadeState;
  readonly padItemCepRecusado: PadItemCepRecusadoState;
  readonly padItemHistDataIncComp: PadItemHistDataIncCompState;
  readonly padItemIndicadores: PadItemIndicadoresState;
  readonly padItemMeta: PadItemMetaState;
  readonly padItemResultado: PadItemResultadoState;
  readonly padItemSorteioFeito: PadItemSorteioFeitoState;
  readonly padItemTemp: PadItemTempState;
  readonly padMatMed: PadMatMedState;
  readonly padPta: PadPtaState;
  readonly padPtaTemp: PadPtaTempState;
  readonly perguntasQuestionario: PerguntasQuestionarioState;
  readonly periodicidade: PeriodicidadeState;
  readonly periodo: PeriodoState;
  readonly profissional: ProfissionalState;
  readonly profissionalAreaAtuacao: ProfissionalAreaAtuacaoState;
  readonly profissionalAreaAtuacaoNew: ProfissionalAreaAtuacaoNewState;
  readonly profissionalArquivo: ProfissionalArquivoState;
  readonly profissionalCategoriaContrato: ProfissionalCategoriaContratoState;
  readonly profissionalComplexidadeAtual: ProfissionalComplexidadeAtualState;
  readonly profissionalDispositivoAtual: ProfissionalDispositivoAtualState;
  readonly profissionalDispositivoComplexidade: ProfissionalDispositivoComplexidadeState;
  readonly profissionalDispositivoComplexidadeAtual: ProfissionalDispositivoComplexidadeAtualState;
  readonly profissionalEspecialidade: ProfissionalEspecialidadeState;
  readonly profissionalEspecialidadeNew: ProfissionalEspecialidadeNewState;
  readonly profissionalFranquia: ProfissionalFranquiaState;
  readonly profissionalHorario: ProfissionalHorarioState;
  readonly profissionalNew: ProfissionalNewState;
  readonly profissionalPush: ProfissionalPushState;
  readonly profissionalStatusAtual: ProfissionalStatusAtualState;
  readonly profissionalStatusAtualNew: ProfissionalStatusAtualNewState;
  readonly prontuarioMotivoInternacaoPs: ProntuarioMotivoInternacaoPsState;
  readonly prontuarioMotivoManifestacao: ProntuarioMotivoManifestacaoState;
  readonly prontuarioTipoManifestacao: ProntuarioTipoManifestacaoState;
  readonly prontuarioTipoMotivo: ProntuarioTipoMotivoState;
  readonly protocolos: ProtocolosState;
  readonly pushnotificationEnvios: PushnotificationEnviosState;
  readonly questionarios: QuestionariosState;
  readonly reportEmailAtendimento: ReportEmailAtendimentoState;
  readonly respostas: RespostasState;
  readonly respostasQuestionarios: RespostasQuestionariosState;
  readonly resultados: ResultadosState;
  readonly segmentosPerguntas: SegmentosPerguntasState;
  readonly servico: ServicoState;
  readonly statusAtendimento: StatusAtendimentoState;
  readonly statusAtual: StatusAtualState;
  readonly statusAtualLigacao: StatusAtualLigacaoState;
  readonly statusAtualProf: StatusAtualProfState;
  readonly statusFinanceiro: StatusFinanceiroState;
  readonly statusPadItemMeta: StatusPadItemMetaState;
  readonly tela: TelaState;
  readonly tempoExperiencia: TempoExperienciaState;
  readonly termosUso: TermosUsoState;
  readonly tipoEspecialidade: TipoEspecialidadeState;
  readonly tipoExame: TipoExameState;
  readonly tipoMatMed: TipoMatMedState;
  readonly tipoOperadora: TipoOperadoraState;
  readonly tipoPreferenciaAtendimento: TipoPreferenciaAtendimentoState;
  readonly tipoProntuario: TipoProntuarioState;
  readonly tipoUnidade: TipoUnidadeState;
  readonly tipoUsuario: TipoUsuarioState;
  readonly tokenUsuario: TokenUsuarioState;
  readonly uf: UfState;
  readonly unidadeEasy: UnidadeEasyState;
  readonly unidadeEasyAreaAtuacao: UnidadeEasyAreaAtuacaoState;
  readonly unidadeMedida: UnidadeMedidaState;
  readonly usuario: UsuarioState;
  readonly usuarioAcao: UsuarioAcaoState;
  readonly usuarioPainelGerencial: UsuarioPainelGerencialState;
  readonly usuarioPanico: UsuarioPanicoState;
  readonly usuarioStatusAtual: UsuarioStatusAtualState;
  readonly vwApiAtendimentosAceite: VwApiAtendimentosAceiteState;
  readonly cidXPtaNovoPadItemIndi: CidXPtaNovoPadItemIndiState;
  /* jhipster-needle-add-reducer-type - JHipster will add reducer type here */
  readonly loadingBar: any;
}

const rootReducer = combineReducers<IRootState>({
  authentication,
  sidebar,
  locale,
  applicationProfile,
  administration,
  userManagement,
  register,
  activate,
  passwordReset,
  password,
  settings,
  paciente,
  cidade,
  cepbrBairro,
  cepbrCidade,
  cepbrEstado,
  cepbrEndereco,
  cid,
  julho,
  junho,
  maio,
  padCsv,
  phinxlog,
  acao,
  acoesRespostas,
  alertasIndicadores,
  alertasResultadosEsperados,
  apiInput,
  apiName,
  apiReturn,
  atendimento,
  atendimentoAceite,
  atendimentoAcompanhamentoPush,
  atendimentoAssinaturas,
  atendimentoAtividades,
  atendimentoCepRecusado,
  atendimentoGlosado,
  atendimentoImagem,
  atendimentoSorteioFeito,
  atendimentoStatusFinanceiro,
  atividades,
  banco,
  categoria,
  categoriaAtividade,
  categoriaContrato,
  categoriaUnidade,
  cidPta,
  cidXPtaNovo,
  cidXPtaNovoPadItemIndicadores,
  controleDisparoAviso,
  descPta,
  diario,
  diarioTags,
  empresa,
  especialidade,
  especialidadeOperadora,
  especialidadeUnidade,
  especialidadeValor,
  filesPanico,
  franquia,
  franquiaAreaAtuacao,
  franquiaStatusAtual,
  franquiaUsuario,
  geoPanico,
  grauParentesco,
  grupoRisco,
  imagemProntuario,
  indicadores,
  indicadoresValores,
  licaoCasa,
  licaoCasaEvolucao,
  logPacAcesso,
  logUser,
  logUserFranquia,
  matMed,
  migracao,
  modulosPad,
  modulosPadConfig,
  motivoInternacao,
  motivoPs,
  notificacaoConfig,
  notificacaoConfigUsuario,
  ocorrenciaProntuario,
  operadora,
  pacienteArquivo,
  pacienteCaracteristicaAtual,
  pacienteComplexidadeAtual,
  pacienteDadosCartao,
  pacienteDiagnostico,
  pacienteDiagnosticoTemp,
  pacienteDiario,
  pacienteDiarioTags,
  pacienteDispositivoAtual,
  pacienteDispositivoComplexidade,
  pacienteEnqueteApp,
  pacienteGrauParentesco,
  pacienteHospital,
  pacienteMotivoInternacao,
  pacienteOperadora,
  pacientePedido,
  pacienteProntuario,
  pacientePush,
  pacienteServico,
  pacienteStatusAtual,
  pad,
  padCid,
  padItem,
  padItemAlerta,
  padItemAtividade,
  padItemCepRecusado,
  padItemHistDataIncComp,
  padItemIndicadores,
  padItemMeta,
  padItemResultado,
  padItemSorteioFeito,
  padItemTemp,
  padMatMed,
  padPta,
  padPtaTemp,
  perguntasQuestionario,
  periodicidade,
  periodo,
  profissional,
  profissionalAreaAtuacao,
  profissionalAreaAtuacaoNew,
  profissionalArquivo,
  profissionalCategoriaContrato,
  profissionalComplexidadeAtual,
  profissionalDispositivoAtual,
  profissionalDispositivoComplexidade,
  profissionalDispositivoComplexidadeAtual,
  profissionalEspecialidade,
  profissionalEspecialidadeNew,
  profissionalFranquia,
  profissionalHorario,
  profissionalNew,
  profissionalPush,
  profissionalStatusAtual,
  profissionalStatusAtualNew,
  prontuarioMotivoInternacaoPs,
  prontuarioMotivoManifestacao,
  prontuarioTipoManifestacao,
  prontuarioTipoMotivo,
  protocolos,
  pushnotificationEnvios,
  questionarios,
  reportEmailAtendimento,
  respostas,
  respostasQuestionarios,
  resultados,
  segmentosPerguntas,
  servico,
  statusAtendimento,
  statusAtual,
  statusAtualLigacao,
  statusAtualProf,
  statusFinanceiro,
  statusPadItemMeta,
  tela,
  tempoExperiencia,
  termosUso,
  tipoEspecialidade,
  tipoExame,
  tipoMatMed,
  tipoOperadora,
  tipoPreferenciaAtendimento,
  tipoProntuario,
  tipoUnidade,
  tipoUsuario,
  tokenUsuario,
  uf,
  unidadeEasy,
  unidadeEasyAreaAtuacao,
  unidadeMedida,
  usuario,
  usuarioAcao,
  usuarioPainelGerencial,
  usuarioPanico,
  usuarioStatusAtual,
  vwApiAtendimentosAceite,
  cidXPtaNovoPadItemIndi,
  /* jhipster-needle-add-reducer-combine - JHipster will add reducer here */
  loadingBar
});

export default rootReducer;
