import React from 'react';
import MenuItem from 'app/shared/layout/menus/menu-item';
import { DropdownItem } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Translate, translate } from 'react-jhipster';
import { NavLink as Link } from 'react-router-dom';
import { NavDropdown } from './menu-components';

export const EntitiesMenu = props => (
  <NavDropdown
    icon=""
    name="Estados"
    id="entity-menu"
    style={{ position: 'absolute', width: 320, height: 500, overflowX: 'hidden', overflowY: 'auto' }}
  >
    <MenuItem icon="asterisk" to="/paciente">
      <Translate contentKey="global.menu.entities.paciente" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/cidade">
      <Translate contentKey="global.menu.entities.cidade" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/cepbr-bairro">
      <Translate contentKey="global.menu.entities.cepbrBairro" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/cepbr-cidade">
      <Translate contentKey="global.menu.entities.cepbrCidade" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/cepbr-estado">
      <Translate contentKey="global.menu.entities.cepbrEstado" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/cepbr-endereco">
      <Translate contentKey="global.menu.entities.cepbrEndereco" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/cid">
      <Translate contentKey="global.menu.entities.cid" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/julho">
      <Translate contentKey="global.menu.entities.julho" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/junho">
      <Translate contentKey="global.menu.entities.junho" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/maio">
      <Translate contentKey="global.menu.entities.maio" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/pad-csv">
      <Translate contentKey="global.menu.entities.padCsv" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/phinxlog">
      <Translate contentKey="global.menu.entities.phinxlog" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/acao">
      <Translate contentKey="global.menu.entities.acao" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/acoes-respostas">
      <Translate contentKey="global.menu.entities.acoesRespostas" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/alertas-indicadores">
      <Translate contentKey="global.menu.entities.alertasIndicadores" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/alertas-resultados-esperados">
      <Translate contentKey="global.menu.entities.alertasResultadosEsperados" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/api-input">
      <Translate contentKey="global.menu.entities.apiInput" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/api-name">
      <Translate contentKey="global.menu.entities.apiName" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/api-return">
      <Translate contentKey="global.menu.entities.apiReturn" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/atendimento">
      <Translate contentKey="global.menu.entities.atendimento" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/atendimento-aceite">
      <Translate contentKey="global.menu.entities.atendimentoAceite" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/atendimento-acompanhamento-push">
      <Translate contentKey="global.menu.entities.atendimentoAcompanhamentoPush" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/atendimento-assinaturas">
      <Translate contentKey="global.menu.entities.atendimentoAssinaturas" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/atendimento-atividades">
      <Translate contentKey="global.menu.entities.atendimentoAtividades" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/atendimento-cep-recusado">
      <Translate contentKey="global.menu.entities.atendimentoCepRecusado" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/atendimento-glosado">
      <Translate contentKey="global.menu.entities.atendimentoGlosado" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/atendimento-imagem">
      <Translate contentKey="global.menu.entities.atendimentoImagem" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/atendimento-sorteio-feito">
      <Translate contentKey="global.menu.entities.atendimentoSorteioFeito" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/atendimento-status-financeiro">
      <Translate contentKey="global.menu.entities.atendimentoStatusFinanceiro" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/atividades">
      <Translate contentKey="global.menu.entities.atividades" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/banco">
      <Translate contentKey="global.menu.entities.banco" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/categoria">
      <Translate contentKey="global.menu.entities.categoria" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/categoria-atividade">
      <Translate contentKey="global.menu.entities.categoriaAtividade" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/categoria-contrato">
      <Translate contentKey="global.menu.entities.categoriaContrato" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/categoria-unidade">
      <Translate contentKey="global.menu.entities.categoriaUnidade" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/cid-pta">
      <Translate contentKey="global.menu.entities.cidPta" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/cid-x-pta-novo">
      <Translate contentKey="global.menu.entities.cidXPtaNovo" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/cid-x-pta-novo-pad-item-indicadores">
      <Translate contentKey="global.menu.entities.cidXPtaNovoPadItemIndicadores" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/controle-disparo-aviso">
      <Translate contentKey="global.menu.entities.controleDisparoAviso" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/desc-pta">
      <Translate contentKey="global.menu.entities.descPta" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/diario">
      <Translate contentKey="global.menu.entities.diario" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/diario-tags">
      <Translate contentKey="global.menu.entities.diarioTags" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/empresa">
      <Translate contentKey="global.menu.entities.empresa" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/especialidade">
      <Translate contentKey="global.menu.entities.especialidade" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/especialidade-operadora">
      <Translate contentKey="global.menu.entities.especialidadeOperadora" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/especialidade-unidade">
      <Translate contentKey="global.menu.entities.especialidadeUnidade" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/especialidade-valor">
      <Translate contentKey="global.menu.entities.especialidadeValor" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/files-panico">
      <Translate contentKey="global.menu.entities.filesPanico" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/franquia">
      <Translate contentKey="global.menu.entities.franquia" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/franquia-area-atuacao">
      <Translate contentKey="global.menu.entities.franquiaAreaAtuacao" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/franquia-status-atual">
      <Translate contentKey="global.menu.entities.franquiaStatusAtual" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/franquia-usuario">
      <Translate contentKey="global.menu.entities.franquiaUsuario" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/geo-panico">
      <Translate contentKey="global.menu.entities.geoPanico" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/grau-parentesco">
      <Translate contentKey="global.menu.entities.grauParentesco" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/grupo-risco">
      <Translate contentKey="global.menu.entities.grupoRisco" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/imagem-prontuario">
      <Translate contentKey="global.menu.entities.imagemProntuario" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/indicadores">
      <Translate contentKey="global.menu.entities.indicadores" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/indicadores-valores">
      <Translate contentKey="global.menu.entities.indicadoresValores" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/licao-casa">
      <Translate contentKey="global.menu.entities.licaoCasa" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/licao-casa-evolucao">
      <Translate contentKey="global.menu.entities.licaoCasaEvolucao" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/log-pac-acesso">
      <Translate contentKey="global.menu.entities.logPacAcesso" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/log-user">
      <Translate contentKey="global.menu.entities.logUser" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/log-user-franquia">
      <Translate contentKey="global.menu.entities.logUserFranquia" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/mat-med">
      <Translate contentKey="global.menu.entities.matMed" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/migracao">
      <Translate contentKey="global.menu.entities.migracao" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/modulos-pad">
      <Translate contentKey="global.menu.entities.modulosPad" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/modulos-pad-config">
      <Translate contentKey="global.menu.entities.modulosPadConfig" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/motivo-internacao">
      <Translate contentKey="global.menu.entities.motivoInternacao" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/motivo-ps">
      <Translate contentKey="global.menu.entities.motivoPs" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/notificacao-config">
      <Translate contentKey="global.menu.entities.notificacaoConfig" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/notificacao-config-usuario">
      <Translate contentKey="global.menu.entities.notificacaoConfigUsuario" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/ocorrencia-prontuario">
      <Translate contentKey="global.menu.entities.ocorrenciaProntuario" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/operadora">
      <Translate contentKey="global.menu.entities.operadora" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/paciente-arquivo">
      <Translate contentKey="global.menu.entities.pacienteArquivo" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/paciente-caracteristica-atual">
      <Translate contentKey="global.menu.entities.pacienteCaracteristicaAtual" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/paciente-complexidade-atual">
      <Translate contentKey="global.menu.entities.pacienteComplexidadeAtual" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/paciente-dados-cartao">
      <Translate contentKey="global.menu.entities.pacienteDadosCartao" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/paciente-diagnostico">
      <Translate contentKey="global.menu.entities.pacienteDiagnostico" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/paciente-diagnostico-temp">
      <Translate contentKey="global.menu.entities.pacienteDiagnosticoTemp" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/paciente-diario">
      <Translate contentKey="global.menu.entities.pacienteDiario" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/paciente-diario-tags">
      <Translate contentKey="global.menu.entities.pacienteDiarioTags" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/paciente-dispositivo-atual">
      <Translate contentKey="global.menu.entities.pacienteDispositivoAtual" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/paciente-dispositivo-complexidade">
      <Translate contentKey="global.menu.entities.pacienteDispositivoComplexidade" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/paciente-enquete-app">
      <Translate contentKey="global.menu.entities.pacienteEnqueteApp" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/paciente-grau-parentesco">
      <Translate contentKey="global.menu.entities.pacienteGrauParentesco" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/paciente-hospital">
      <Translate contentKey="global.menu.entities.pacienteHospital" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/paciente-motivo-internacao">
      <Translate contentKey="global.menu.entities.pacienteMotivoInternacao" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/paciente-operadora">
      <Translate contentKey="global.menu.entities.pacienteOperadora" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/paciente-pedido">
      <Translate contentKey="global.menu.entities.pacientePedido" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/paciente-prontuario">
      <Translate contentKey="global.menu.entities.pacienteProntuario" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/paciente-push">
      <Translate contentKey="global.menu.entities.pacientePush" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/paciente-servico">
      <Translate contentKey="global.menu.entities.pacienteServico" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/paciente-status-atual">
      <Translate contentKey="global.menu.entities.pacienteStatusAtual" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/pad">
      <Translate contentKey="global.menu.entities.pad" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/pad-cid">
      <Translate contentKey="global.menu.entities.padCid" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/pad-item">
      <Translate contentKey="global.menu.entities.padItem" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/pad-item-alerta">
      <Translate contentKey="global.menu.entities.padItemAlerta" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/pad-item-atividade">
      <Translate contentKey="global.menu.entities.padItemAtividade" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/pad-item-cep-recusado">
      <Translate contentKey="global.menu.entities.padItemCepRecusado" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/pad-item-hist-data-inc-comp">
      <Translate contentKey="global.menu.entities.padItemHistDataIncComp" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/pad-item-indicadores">
      <Translate contentKey="global.menu.entities.padItemIndicadores" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/pad-item-meta">
      <Translate contentKey="global.menu.entities.padItemMeta" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/pad-item-resultado">
      <Translate contentKey="global.menu.entities.padItemResultado" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/pad-item-sorteio-feito">
      <Translate contentKey="global.menu.entities.padItemSorteioFeito" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/pad-item-temp">
      <Translate contentKey="global.menu.entities.padItemTemp" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/pad-mat-med">
      <Translate contentKey="global.menu.entities.padMatMed" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/pad-pta">
      <Translate contentKey="global.menu.entities.padPta" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/pad-pta-temp">
      <Translate contentKey="global.menu.entities.padPtaTemp" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/perguntas-questionario">
      <Translate contentKey="global.menu.entities.perguntasQuestionario" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/periodicidade">
      <Translate contentKey="global.menu.entities.periodicidade" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/periodo">
      <Translate contentKey="global.menu.entities.periodo" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/profissional">
      <Translate contentKey="global.menu.entities.profissional" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/profissional-area-atuacao">
      <Translate contentKey="global.menu.entities.profissionalAreaAtuacao" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/profissional-area-atuacao-new">
      <Translate contentKey="global.menu.entities.profissionalAreaAtuacaoNew" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/profissional-arquivo">
      <Translate contentKey="global.menu.entities.profissionalArquivo" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/profissional-categoria-contrato">
      <Translate contentKey="global.menu.entities.profissionalCategoriaContrato" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/profissional-complexidade-atual">
      <Translate contentKey="global.menu.entities.profissionalComplexidadeAtual" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/profissional-dispositivo-atual">
      <Translate contentKey="global.menu.entities.profissionalDispositivoAtual" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/profissional-dispositivo-complexidade">
      <Translate contentKey="global.menu.entities.profissionalDispositivoComplexidade" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/profissional-dispositivo-complexidade-atual">
      <Translate contentKey="global.menu.entities.profissionalDispositivoComplexidadeAtual" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/profissional-especialidade">
      <Translate contentKey="global.menu.entities.profissionalEspecialidade" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/profissional-especialidade-new">
      <Translate contentKey="global.menu.entities.profissionalEspecialidadeNew" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/profissional-franquia">
      <Translate contentKey="global.menu.entities.profissionalFranquia" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/profissional-horario">
      <Translate contentKey="global.menu.entities.profissionalHorario" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/profissional-new">
      <Translate contentKey="global.menu.entities.profissionalNew" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/profissional-push">
      <Translate contentKey="global.menu.entities.profissionalPush" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/profissional-status-atual">
      <Translate contentKey="global.menu.entities.profissionalStatusAtual" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/profissional-status-atual-new">
      <Translate contentKey="global.menu.entities.profissionalStatusAtualNew" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/prontuario-motivo-internacao-ps">
      <Translate contentKey="global.menu.entities.prontuarioMotivoInternacaoPs" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/prontuario-motivo-manifestacao">
      <Translate contentKey="global.menu.entities.prontuarioMotivoManifestacao" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/prontuario-tipo-manifestacao">
      <Translate contentKey="global.menu.entities.prontuarioTipoManifestacao" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/prontuario-tipo-motivo">
      <Translate contentKey="global.menu.entities.prontuarioTipoMotivo" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/protocolos">
      <Translate contentKey="global.menu.entities.protocolos" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/pushnotification-envios">
      <Translate contentKey="global.menu.entities.pushnotificationEnvios" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/questionarios">
      <Translate contentKey="global.menu.entities.questionarios" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/report-email-atendimento">
      <Translate contentKey="global.menu.entities.reportEmailAtendimento" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/respostas">
      <Translate contentKey="global.menu.entities.respostas" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/respostas-questionarios">
      <Translate contentKey="global.menu.entities.respostasQuestionarios" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/resultados">
      <Translate contentKey="global.menu.entities.resultados" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/segmentos-perguntas">
      <Translate contentKey="global.menu.entities.segmentosPerguntas" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/servico">
      <Translate contentKey="global.menu.entities.servico" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/status-atendimento">
      <Translate contentKey="global.menu.entities.statusAtendimento" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/status-atual">
      <Translate contentKey="global.menu.entities.statusAtual" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/status-atual-ligacao">
      <Translate contentKey="global.menu.entities.statusAtualLigacao" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/status-atual-prof">
      <Translate contentKey="global.menu.entities.statusAtualProf" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/status-financeiro">
      <Translate contentKey="global.menu.entities.statusFinanceiro" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/status-pad-item-meta">
      <Translate contentKey="global.menu.entities.statusPadItemMeta" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/tela">
      <Translate contentKey="global.menu.entities.tela" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/tempo-experiencia">
      <Translate contentKey="global.menu.entities.tempoExperiencia" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/termos-uso">
      <Translate contentKey="global.menu.entities.termosUso" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/tipo-especialidade">
      <Translate contentKey="global.menu.entities.tipoEspecialidade" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/tipo-exame">
      <Translate contentKey="global.menu.entities.tipoExame" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/tipo-mat-med">
      <Translate contentKey="global.menu.entities.tipoMatMed" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/tipo-operadora">
      <Translate contentKey="global.menu.entities.tipoOperadora" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/tipo-preferencia-atendimento">
      <Translate contentKey="global.menu.entities.tipoPreferenciaAtendimento" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/tipo-prontuario">
      <Translate contentKey="global.menu.entities.tipoProntuario" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/tipo-unidade">
      <Translate contentKey="global.menu.entities.tipoUnidade" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/tipo-usuario">
      <Translate contentKey="global.menu.entities.tipoUsuario" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/token-usuario">
      <Translate contentKey="global.menu.entities.tokenUsuario" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/uf">
      <Translate contentKey="global.menu.entities.uf" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/unidade-easy">
      <Translate contentKey="global.menu.entities.unidadeEasy" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/unidade-easy-area-atuacao">
      <Translate contentKey="global.menu.entities.unidadeEasyAreaAtuacao" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/unidade-medida">
      <Translate contentKey="global.menu.entities.unidadeMedida" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/usuario">
      <Translate contentKey="global.menu.entities.usuario" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/usuario-acao">
      <Translate contentKey="global.menu.entities.usuarioAcao" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/usuario-painel-gerencial">
      <Translate contentKey="global.menu.entities.usuarioPainelGerencial" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/usuario-panico">
      <Translate contentKey="global.menu.entities.usuarioPanico" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/usuario-status-atual">
      <Translate contentKey="global.menu.entities.usuarioStatusAtual" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/vw-api-atendimentos-aceite">
      <Translate contentKey="global.menu.entities.vwApiAtendimentosAceite" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/cid-x-pta-novo-pad-item-indi">
      <Translate contentKey="global.menu.entities.cidXPtaNovoPadItemIndi" />
    </MenuItem>
    {/*   jhipster-needle-add-entity-to-menu - JHipster will add entities to the menu here */}
  </NavDropdown>
);
