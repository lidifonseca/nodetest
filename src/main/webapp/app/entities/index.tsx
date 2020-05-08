import React from 'react';
import { Switch } from 'react-router-dom';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import PageNotFound from 'app/shared/error/page-not-found';
import Paciente from './paciente';
import Cidade from './cidade';
import CepbrBairro from './cepbr-bairro';
import CepbrCidade from './cepbr-cidade';
import CepbrEstado from './cepbr-estado';
import CepbrEndereco from './cepbr-endereco';
import Cid from './cid';
import Julho from './julho';
import Junho from './junho';
import Maio from './maio';
import PadCsv from './pad-csv';
import Acao from './acao';
import AcoesRespostas from './acoes-respostas';
import AlertasIndicadores from './alertas-indicadores';
import AlertasResultadosEsperados from './alertas-resultados-esperados';
import ApiInput from './api-input';
import ApiName from './api-name';
import ApiReturn from './api-return';
import Atendimento from './atendimento';
import AtendimentoAceite from './atendimento-aceite';
import AtendimentoAcompanhamentoPush from './atendimento-acompanhamento-push';
import AtendimentoAssinaturas from './atendimento-assinaturas';
import AtendimentoAtividades from './atendimento-atividades';
import AtendimentoCepRecusado from './atendimento-cep-recusado';
import AtendimentoGlosado from './atendimento-glosado';
import AtendimentoImagem from './atendimento-imagem';
import AtendimentoSorteioFeito from './atendimento-sorteio-feito';
import AtendimentoStatusFinanceiro from './atendimento-status-financeiro';
import Atividades from './atividades';
import Banco from './banco';
import Categoria from './categoria';
import CategoriaAtividade from './categoria-atividade';
import CategoriaContrato from './categoria-contrato';
import CidPta from './cid-pta';
import CidXPtaNovo from './cid-x-pta-novo';
import ControleDisparoAviso from './controle-disparo-aviso';
import DescPta from './desc-pta';
import Diario from './diario';
import DiarioTags from './diario-tags';
import Empresa from './empresa';
import Especialidade from './especialidade';
import EspecialidadeOperadora from './especialidade-operadora';
import EspecialidadeUnidade from './especialidade-unidade';
import EspecialidadeValor from './especialidade-valor';
import FilesPanico from './files-panico';
import Franquia from './franquia';
import FranquiaAreaAtuacao from './franquia-area-atuacao';
import FranquiaStatusAtual from './franquia-status-atual';
import FranquiaUsuario from './franquia-usuario';
import GeoPanico from './geo-panico';
import GrauParentesco from './grau-parentesco';
import GrupoRisco from './grupo-risco';
import ImagemProntuario from './imagem-prontuario';
import Indicadores from './indicadores';
import IndicadoresValores from './indicadores-valores';
import LicaoCasa from './licao-casa';
import LicaoCasaEvolucao from './licao-casa-evolucao';
import LogPacAcesso from './log-pac-acesso';
import LogUser from './log-user';
import LogUserFranquia from './log-user-franquia';
import MatMed from './mat-med';
import Migracao from './migracao';
import ModulosPad from './modulos-pad';
import ModulosPadConfig from './modulos-pad-config';
import MotivoInternacao from './motivo-internacao';
import MotivoPs from './motivo-ps';
import NotificacaoConfig from './notificacao-config';
import NotificacaoConfigUsuario from './notificacao-config-usuario';
import OcorrenciaProntuario from './ocorrencia-prontuario';
import Operadora from './operadora';
import PacienteArquivo from './paciente-arquivo';
import PacienteCaracteristicaAtual from './paciente-caracteristica-atual';
import PacienteComplexidadeAtual from './paciente-complexidade-atual';
import PacienteDadosCartao from './paciente-dados-cartao';
import PacienteDiagnostico from './paciente-diagnostico';
import PacienteDiagnosticoTemp from './paciente-diagnostico-temp';
import PacienteDiario from './paciente-diario';
import PacienteDiarioTags from './paciente-diario-tags';
import PacienteDispositivoAtual from './paciente-dispositivo-atual';
import PacienteDispositivoComplexidade from './paciente-dispositivo-complexidade';
import PacienteEnqueteApp from './paciente-enquete-app';
import PacienteGrauParentesco from './paciente-grau-parentesco';
import PacienteHospital from './paciente-hospital';
import PacienteMotivoInternacao from './paciente-motivo-internacao';
import PacienteOperadora from './paciente-operadora';
import PacientePedido from './paciente-pedido';
import PacienteProntuario from './paciente-prontuario';
import PacientePush from './paciente-push';
import PacienteServico from './paciente-servico';
import PacienteStatusAtual from './paciente-status-atual';
import Pad from './pad';
import PadCid from './pad-cid';
import PadItem from './pad-item';
import PadItemAlerta from './pad-item-alerta';
import PadItemAtividade from './pad-item-atividade';
import PadItemCepRecusado from './pad-item-cep-recusado';
import PadItemHistDataIncComp from './pad-item-hist-data-inc-comp';
import PadItemIndicadores from './pad-item-indicadores';
import PadItemMeta from './pad-item-meta';
import PadItemResultado from './pad-item-resultado';
import PadItemSorteioFeito from './pad-item-sorteio-feito';
import PadItemTemp from './pad-item-temp';
import PadMatMed from './pad-mat-med';
import PadPta from './pad-pta';
import PadPtaTemp from './pad-pta-temp';
import PerguntasQuestionario from './perguntas-questionario';
import Periodicidade from './periodicidade';
import Periodo from './periodo';
import Profissional from './profissional';
import ProfissionalAreaAtuacao from './profissional-area-atuacao';
import ProfissionalAreaAtuacaoNew from './profissional-area-atuacao-new';
import ProfissionalArquivo from './profissional-arquivo';
import ProfissionalCategoriaContrato from './profissional-categoria-contrato';
import ProfissionalComplexidadeAtual from './profissional-complexidade-atual';
import ProfissionalDispositivoAtual from './profissional-dispositivo-atual';
import ProfissionalDispositivoComplexidade from './profissional-dispositivo-complexidade';
import ProfissionalDispositivoComplexidadeAtual from './profissional-dispositivo-complexidade-atual';
import ProfissionalEspecialidade from './profissional-especialidade';
import ProfissionalEspecialidadeNew from './profissional-especialidade-new';
import ProfissionalFranquia from './profissional-franquia';
import ProfissionalHorario from './profissional-horario';
import ProfissionalNew from './profissional-new';
import ProfissionalPush from './profissional-push';
import ProfissionalStatusAtual from './profissional-status-atual';
import ProfissionalStatusAtualNew from './profissional-status-atual-new';
import ProntuarioMotivoInternacaoPs from './prontuario-motivo-internacao-ps';
import ProntuarioMotivoManifestacao from './prontuario-motivo-manifestacao';
import ProntuarioTipoManifestacao from './prontuario-tipo-manifestacao';
import ProntuarioTipoMotivo from './prontuario-tipo-motivo';
import Protocolos from './protocolos';
import PushnotificationEnvios from './pushnotification-envios';
import Questionarios from './questionarios';
import ReportEmailAtendimento from './report-email-atendimento';
import Respostas from './respostas';
import RespostasQuestionarios from './respostas-questionarios';
import Resultados from './resultados';
import SegmentosPerguntas from './segmentos-perguntas';
import Servico from './servico';
import StatusAtendimento from './status-atendimento';
import StatusAtual from './status-atual';
import StatusAtualLigacao from './status-atual-ligacao';
import StatusAtualProf from './status-atual-prof';
import StatusFinanceiro from './status-financeiro';
import StatusPadItemMeta from './status-pad-item-meta';
import Tela from './tela';
import TempoExperiencia from './tempo-experiencia';
import TermosUso from './termos-uso';
import TipoEspecialidade from './tipo-especialidade';
import TipoExame from './tipo-exame';
import TipoMatMed from './tipo-mat-med';
import TipoOperadora from './tipo-operadora';
import TipoPreferenciaAtendimento from './tipo-preferencia-atendimento';
import TipoProntuario from './tipo-prontuario';
import TipoUnidade from './tipo-unidade';
import TipoUsuario from './tipo-usuario';
import TokenUsuario from './token-usuario';
import Uf from './uf';
import UnidadeEasy from './unidade-easy';
import UnidadeEasyAreaAtuacao from './unidade-easy-area-atuacao';
import UnidadeMedida from './unidade-medida';
import Usuario from './usuario';
import UsuarioAcao from './usuario-acao';
import UsuarioPainelGerencial from './usuario-painel-gerencial';
import UsuarioPanico from './usuario-panico';
import UsuarioStatusAtual from './usuario-status-atual';
import VwApiAtendimentosAceite from './vw-api-atendimentos-aceite';
import CidXPtaNovoPadItemIndi from './cid-x-pta-novo-pad-item-indi';
/* jhipster-needle-add-route-import - JHipster will add routes here */

const Routes = ({ match }) => (
  <div>
    <Switch>
      {/* prettier-ignore */}
      <ErrorBoundaryRoute path={`${match.url}paciente`} component={Paciente} />
      <ErrorBoundaryRoute path={`${match.url}cidade`} component={Cidade} />
      <ErrorBoundaryRoute path={`${match.url}cepbr-bairro`} component={CepbrBairro} />
      <ErrorBoundaryRoute path={`${match.url}cepbr-cidade`} component={CepbrCidade} />
      <ErrorBoundaryRoute path={`${match.url}cepbr-estado`} component={CepbrEstado} />
      <ErrorBoundaryRoute path={`${match.url}cepbr-endereco`} component={CepbrEndereco} />
      <ErrorBoundaryRoute path={`${match.url}cid`} component={Cid} />
      <ErrorBoundaryRoute path={`${match.url}julho`} component={Julho} />
      <ErrorBoundaryRoute path={`${match.url}junho`} component={Junho} />
      <ErrorBoundaryRoute path={`${match.url}maio`} component={Maio} />
      <ErrorBoundaryRoute path={`${match.url}pad-csv`} component={PadCsv} />
      <ErrorBoundaryRoute path={`${match.url}acao`} component={Acao} />
      <ErrorBoundaryRoute path={`${match.url}acoes-respostas`} component={AcoesRespostas} />
      <ErrorBoundaryRoute path={`${match.url}alertas-indicadores`} component={AlertasIndicadores} />
      <ErrorBoundaryRoute path={`${match.url}alertas-resultados-esperados`} component={AlertasResultadosEsperados} />
      <ErrorBoundaryRoute path={`${match.url}api-input`} component={ApiInput} />
      <ErrorBoundaryRoute path={`${match.url}api-name`} component={ApiName} />
      <ErrorBoundaryRoute path={`${match.url}api-return`} component={ApiReturn} />
      <ErrorBoundaryRoute path={`${match.url}atendimento`} component={Atendimento} />
      <ErrorBoundaryRoute path={`${match.url}atendimento-aceite`} component={AtendimentoAceite} />
      <ErrorBoundaryRoute path={`${match.url}atendimento-acompanhamento-push`} component={AtendimentoAcompanhamentoPush} />
      <ErrorBoundaryRoute path={`${match.url}atendimento-assinaturas`} component={AtendimentoAssinaturas} />
      <ErrorBoundaryRoute path={`${match.url}atendimento-atividades`} component={AtendimentoAtividades} />
      <ErrorBoundaryRoute path={`${match.url}atendimento-cep-recusado`} component={AtendimentoCepRecusado} />
      <ErrorBoundaryRoute path={`${match.url}atendimento-glosado`} component={AtendimentoGlosado} />
      <ErrorBoundaryRoute path={`${match.url}atendimento-imagem`} component={AtendimentoImagem} />
      <ErrorBoundaryRoute path={`${match.url}atendimento-sorteio-feito`} component={AtendimentoSorteioFeito} />
      <ErrorBoundaryRoute path={`${match.url}atendimento-status-financeiro`} component={AtendimentoStatusFinanceiro} />
      <ErrorBoundaryRoute path={`${match.url}atividades`} component={Atividades} />
      <ErrorBoundaryRoute path={`${match.url}banco`} component={Banco} />
      <ErrorBoundaryRoute path={`${match.url}categoria`} component={Categoria} />
      <ErrorBoundaryRoute path={`${match.url}categoria-atividade`} component={CategoriaAtividade} />
      <ErrorBoundaryRoute path={`${match.url}categoria-contrato`} component={CategoriaContrato} />1
      <ErrorBoundaryRoute path={`${match.url}cid-pta`} component={CidPta} />
      <ErrorBoundaryRoute path={`${match.url}cid-x-pta-novo`} component={CidXPtaNovo} />
      <ErrorBoundaryRoute path={`${match.url}controle-disparo-aviso`} component={ControleDisparoAviso} />
      <ErrorBoundaryRoute path={`${match.url}desc-pta`} component={DescPta} />
      <ErrorBoundaryRoute path={`${match.url}diario`} component={Diario} />
      <ErrorBoundaryRoute path={`${match.url}diario-tags`} component={DiarioTags} />
      <ErrorBoundaryRoute path={`${match.url}empresa`} component={Empresa} />
      <ErrorBoundaryRoute path={`${match.url}especialidade`} component={Especialidade} />
      <ErrorBoundaryRoute path={`${match.url}especialidade-operadora`} component={EspecialidadeOperadora} />
      <ErrorBoundaryRoute path={`${match.url}especialidade-unidade`} component={EspecialidadeUnidade} />
      <ErrorBoundaryRoute path={`${match.url}especialidade-valor`} component={EspecialidadeValor} />
      <ErrorBoundaryRoute path={`${match.url}files-panico`} component={FilesPanico} />
      <ErrorBoundaryRoute path={`${match.url}franquia`} component={Franquia} />
      <ErrorBoundaryRoute path={`${match.url}franquia-area-atuacao`} component={FranquiaAreaAtuacao} />
      <ErrorBoundaryRoute path={`${match.url}franquia-status-atual`} component={FranquiaStatusAtual} />
      <ErrorBoundaryRoute path={`${match.url}franquia-usuario`} component={FranquiaUsuario} />
      <ErrorBoundaryRoute path={`${match.url}geo-panico`} component={GeoPanico} />
      <ErrorBoundaryRoute path={`${match.url}grau-parentesco`} component={GrauParentesco} />
      <ErrorBoundaryRoute path={`${match.url}grupo-risco`} component={GrupoRisco} />
      <ErrorBoundaryRoute path={`${match.url}imagem-prontuario`} component={ImagemProntuario} />
      <ErrorBoundaryRoute path={`${match.url}indicadores`} component={Indicadores} />
      <ErrorBoundaryRoute path={`${match.url}indicadores-valores`} component={IndicadoresValores} />
      <ErrorBoundaryRoute path={`${match.url}licao-casa`} component={LicaoCasa} />
      <ErrorBoundaryRoute path={`${match.url}licao-casa-evolucao`} component={LicaoCasaEvolucao} />
      <ErrorBoundaryRoute path={`${match.url}log-pac-acesso`} component={LogPacAcesso} />
      <ErrorBoundaryRoute path={`${match.url}log-user`} component={LogUser} />
      <ErrorBoundaryRoute path={`${match.url}log-user-franquia`} component={LogUserFranquia} />
      <ErrorBoundaryRoute path={`${match.url}mat-med`} component={MatMed} />
      <ErrorBoundaryRoute path={`${match.url}migracao`} component={Migracao} />
      <ErrorBoundaryRoute path={`${match.url}modulos-pad`} component={ModulosPad} />
      <ErrorBoundaryRoute path={`${match.url}modulos-pad-config`} component={ModulosPadConfig} />
      <ErrorBoundaryRoute path={`${match.url}motivo-internacao`} component={MotivoInternacao} />
      <ErrorBoundaryRoute path={`${match.url}motivo-ps`} component={MotivoPs} />
      <ErrorBoundaryRoute path={`${match.url}notificacao-config`} component={NotificacaoConfig} />
      <ErrorBoundaryRoute path={`${match.url}notificacao-config-usuario`} component={NotificacaoConfigUsuario} />
      <ErrorBoundaryRoute path={`${match.url}ocorrencia-prontuario`} component={OcorrenciaProntuario} />
      <ErrorBoundaryRoute path={`${match.url}operadora`} component={Operadora} />
      <ErrorBoundaryRoute path={`${match.url}paciente-arquivo`} component={PacienteArquivo} />
      <ErrorBoundaryRoute path={`${match.url}paciente-caracteristica-atual`} component={PacienteCaracteristicaAtual} />
      <ErrorBoundaryRoute path={`${match.url}paciente-complexidade-atual`} component={PacienteComplexidadeAtual} />
      <ErrorBoundaryRoute path={`${match.url}paciente-dados-cartao`} component={PacienteDadosCartao} />
      <ErrorBoundaryRoute path={`${match.url}paciente-diagnostico`} component={PacienteDiagnostico} />
      <ErrorBoundaryRoute path={`${match.url}paciente-diagnostico-temp`} component={PacienteDiagnosticoTemp} />
      <ErrorBoundaryRoute path={`${match.url}paciente-diario`} component={PacienteDiario} />
      <ErrorBoundaryRoute path={`${match.url}paciente-diario-tags`} component={PacienteDiarioTags} />
      <ErrorBoundaryRoute path={`${match.url}paciente-dispositivo-atual`} component={PacienteDispositivoAtual} />
      <ErrorBoundaryRoute path={`${match.url}paciente-dispositivo-complexidade`} component={PacienteDispositivoComplexidade} />
      <ErrorBoundaryRoute path={`${match.url}paciente-enquete-app`} component={PacienteEnqueteApp} />
      <ErrorBoundaryRoute path={`${match.url}paciente-grau-parentesco`} component={PacienteGrauParentesco} />
      <ErrorBoundaryRoute path={`${match.url}paciente-hospital`} component={PacienteHospital} />
      <ErrorBoundaryRoute path={`${match.url}paciente-motivo-internacao`} component={PacienteMotivoInternacao} />
      <ErrorBoundaryRoute path={`${match.url}paciente-operadora`} component={PacienteOperadora} />
      <ErrorBoundaryRoute path={`${match.url}paciente-pedido`} component={PacientePedido} />
      <ErrorBoundaryRoute path={`${match.url}paciente-prontuario`} component={PacienteProntuario} />
      <ErrorBoundaryRoute path={`${match.url}paciente-push`} component={PacientePush} />
      <ErrorBoundaryRoute path={`${match.url}paciente-servico`} component={PacienteServico} />
      <ErrorBoundaryRoute path={`${match.url}paciente-status-atual`} component={PacienteStatusAtual} />
      <ErrorBoundaryRoute path={`${match.url}pad`} component={Pad} />
      <ErrorBoundaryRoute path={`${match.url}pad-cid`} component={PadCid} />
      <ErrorBoundaryRoute path={`${match.url}pad-item`} component={PadItem} />
      <ErrorBoundaryRoute path={`${match.url}pad-item-alerta`} component={PadItemAlerta} />
      <ErrorBoundaryRoute path={`${match.url}pad-item-atividade`} component={PadItemAtividade} />
      <ErrorBoundaryRoute path={`${match.url}pad-item-cep-recusado`} component={PadItemCepRecusado} />
      <ErrorBoundaryRoute path={`${match.url}pad-item-hist-data-inc-comp`} component={PadItemHistDataIncComp} />
      <ErrorBoundaryRoute path={`${match.url}pad-item-indicadores`} component={PadItemIndicadores} />
      <ErrorBoundaryRoute path={`${match.url}pad-item-meta`} component={PadItemMeta} />
      <ErrorBoundaryRoute path={`${match.url}pad-item-resultado`} component={PadItemResultado} />
      <ErrorBoundaryRoute path={`${match.url}pad-item-sorteio-feito`} component={PadItemSorteioFeito} />
      <ErrorBoundaryRoute path={`${match.url}pad-item-temp`} component={PadItemTemp} />
      <ErrorBoundaryRoute path={`${match.url}pad-mat-med`} component={PadMatMed} />
      <ErrorBoundaryRoute path={`${match.url}pad-pta`} component={PadPta} />
      <ErrorBoundaryRoute path={`${match.url}pad-pta-temp`} component={PadPtaTemp} />
      <ErrorBoundaryRoute path={`${match.url}perguntas-questionario`} component={PerguntasQuestionario} />
      <ErrorBoundaryRoute path={`${match.url}periodicidade`} component={Periodicidade} />
      <ErrorBoundaryRoute path={`${match.url}periodo`} component={Periodo} />
      <ErrorBoundaryRoute path={`${match.url}profissional`} component={Profissional} />
      <ErrorBoundaryRoute path={`${match.url}profissional-area-atuacao`} component={ProfissionalAreaAtuacao} />
      <ErrorBoundaryRoute path={`${match.url}profissional-area-atuacao-new`} component={ProfissionalAreaAtuacaoNew} />
      <ErrorBoundaryRoute path={`${match.url}profissional-arquivo`} component={ProfissionalArquivo} />
      <ErrorBoundaryRoute path={`${match.url}profissional-categoria-contrato`} component={ProfissionalCategoriaContrato} />
      <ErrorBoundaryRoute path={`${match.url}profissional-complexidade-atual`} component={ProfissionalComplexidadeAtual} />
      <ErrorBoundaryRoute path={`${match.url}profissional-dispositivo-atual`} component={ProfissionalDispositivoAtual} />
      <ErrorBoundaryRoute path={`${match.url}profissional-dispositivo-complexidade`} component={ProfissionalDispositivoComplexidade} />
      <ErrorBoundaryRoute
        path={`${match.url}profissional-dispositivo-complexidade-atual`}
        component={ProfissionalDispositivoComplexidadeAtual}
      />
      <ErrorBoundaryRoute path={`${match.url}profissional-especialidade`} component={ProfissionalEspecialidade} />
      <ErrorBoundaryRoute path={`${match.url}profissional-especialidade-new`} component={ProfissionalEspecialidadeNew} />
      <ErrorBoundaryRoute path={`${match.url}profissional-franquia`} component={ProfissionalFranquia} />
      <ErrorBoundaryRoute path={`${match.url}profissional-horario`} component={ProfissionalHorario} />
      <ErrorBoundaryRoute path={`${match.url}profissional-new`} component={ProfissionalNew} />
      <ErrorBoundaryRoute path={`${match.url}profissional-push`} component={ProfissionalPush} />
      <ErrorBoundaryRoute path={`${match.url}profissional-status-atual`} component={ProfissionalStatusAtual} />
      <ErrorBoundaryRoute path={`${match.url}profissional-status-atual-new`} component={ProfissionalStatusAtualNew} />
      <ErrorBoundaryRoute path={`${match.url}prontuario-motivo-internacao-ps`} component={ProntuarioMotivoInternacaoPs} />
      <ErrorBoundaryRoute path={`${match.url}prontuario-motivo-manifestacao`} component={ProntuarioMotivoManifestacao} />
      <ErrorBoundaryRoute path={`${match.url}prontuario-tipo-manifestacao`} component={ProntuarioTipoManifestacao} />
      <ErrorBoundaryRoute path={`${match.url}prontuario-tipo-motivo`} component={ProntuarioTipoMotivo} />
      <ErrorBoundaryRoute path={`${match.url}protocolos`} component={Protocolos} />
      <ErrorBoundaryRoute path={`${match.url}pushnotification-envios`} component={PushnotificationEnvios} />
      <ErrorBoundaryRoute path={`${match.url}questionarios`} component={Questionarios} />
      <ErrorBoundaryRoute path={`${match.url}report-email-atendimento`} component={ReportEmailAtendimento} />
      <ErrorBoundaryRoute path={`${match.url}respostas`} component={Respostas} />
      <ErrorBoundaryRoute path={`${match.url}respostas-questionarios`} component={RespostasQuestionarios} />
      <ErrorBoundaryRoute path={`${match.url}resultados`} component={Resultados} />
      <ErrorBoundaryRoute path={`${match.url}segmentos-perguntas`} component={SegmentosPerguntas} />
      <ErrorBoundaryRoute path={`${match.url}servico`} component={Servico} />
      <ErrorBoundaryRoute path={`${match.url}status-atendimento`} component={StatusAtendimento} />
      <ErrorBoundaryRoute path={`${match.url}status-atual`} component={StatusAtual} />
      <ErrorBoundaryRoute path={`${match.url}status-atual-ligacao`} component={StatusAtualLigacao} />
      <ErrorBoundaryRoute path={`${match.url}status-atual-prof`} component={StatusAtualProf} />
      <ErrorBoundaryRoute path={`${match.url}status-financeiro`} component={StatusFinanceiro} />
      <ErrorBoundaryRoute path={`${match.url}status-pad-item-meta`} component={StatusPadItemMeta} />
      <ErrorBoundaryRoute path={`${match.url}tela`} component={Tela} />
      <ErrorBoundaryRoute path={`${match.url}tempo-experiencia`} component={TempoExperiencia} />
      <ErrorBoundaryRoute path={`${match.url}termos-uso`} component={TermosUso} />
      <ErrorBoundaryRoute path={`${match.url}tipo-especialidade`} component={TipoEspecialidade} />
      <ErrorBoundaryRoute path={`${match.url}tipo-exame`} component={TipoExame} />
      <ErrorBoundaryRoute path={`${match.url}tipo-mat-med`} component={TipoMatMed} />
      <ErrorBoundaryRoute path={`${match.url}tipo-operadora`} component={TipoOperadora} />
      <ErrorBoundaryRoute path={`${match.url}tipo-preferencia-atendimento`} component={TipoPreferenciaAtendimento} />
      <ErrorBoundaryRoute path={`${match.url}tipo-prontuario`} component={TipoProntuario} />
      <ErrorBoundaryRoute path={`${match.url}tipo-unidade`} component={TipoUnidade} />
      <ErrorBoundaryRoute path={`${match.url}tipo-usuario`} component={TipoUsuario} />
      <ErrorBoundaryRoute path={`${match.url}token-usuario`} component={TokenUsuario} />
      <ErrorBoundaryRoute path={`${match.url}uf`} component={Uf} />
      <ErrorBoundaryRoute path={`${match.url}unidade-easy`} component={UnidadeEasy} />
      <ErrorBoundaryRoute path={`${match.url}unidade-easy-area-atuacao`} component={UnidadeEasyAreaAtuacao} />
      <ErrorBoundaryRoute path={`${match.url}unidade-medida`} component={UnidadeMedida} />
      <ErrorBoundaryRoute path={`${match.url}usuario`} component={Usuario} />
      <ErrorBoundaryRoute path={`${match.url}usuario-acao`} component={UsuarioAcao} />
      <ErrorBoundaryRoute path={`${match.url}usuario-painel-gerencial`} component={UsuarioPainelGerencial} />
      <ErrorBoundaryRoute path={`${match.url}usuario-panico`} component={UsuarioPanico} />
      <ErrorBoundaryRoute path={`${match.url}usuario-status-atual`} component={UsuarioStatusAtual} />
      <ErrorBoundaryRoute path={`${match.url}vw-api-atendimentos-aceite`} component={VwApiAtendimentosAceite} />
      <ErrorBoundaryRoute path={`${match.url}cid-x-pta-novo-pad-item-indi`} component={CidXPtaNovoPadItemIndi} />
      <ErrorBoundaryRoute
        path={`${match.url}profissional-dispositivo-complexidade-atual`}
        component={ProfissionalDispositivoComplexidadeAtual}
      />
      <ErrorBoundaryRoute
        path={`${match.url}profissional-dispositivo-complexidade-atual`}
        component={ProfissionalDispositivoComplexidadeAtual}
      />
      <ErrorBoundaryRoute
        path={`${match.url}profissional-dispositivo-complexidade-atual`}
        component={ProfissionalDispositivoComplexidadeAtual}
      />
      <ErrorBoundaryRoute
        path={`${match.url}profissional-dispositivo-complexidade-atual`}
        component={ProfissionalDispositivoComplexidadeAtual}
      />
      {/* jhipster-needle-add-route-path - JHipster will add routes here */}
      <ErrorBoundaryRoute component={PageNotFound} />
    </Switch>
  </div>
);

export default Routes;
