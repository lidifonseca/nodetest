{/* prettier-ignore */}
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './module/auth.module';
import { ormconfig } from './orm.config';
import { PacienteModule } from './module/paciente.module';
import { CidadeModule } from './module/cidade.module';
import { CepbrBairroModule } from './module/cepbr-bairro.module';
import { CepbrCidadeModule } from './module/cepbr-cidade.module';
import { CepbrEnderecoModule } from './module/cepbr-endereco.module';
import { CepbrEstadoModule } from './module/cepbr-estado.module';
import { CidModule } from './module/cid.module';
import { JulhoModule } from './module/julho.module';
import { JunhoModule } from './module/junho.module';
import { MaioModule } from './module/maio.module';
import { PadCsvModule } from './module/pad-csv.module';
import { PhinxlogModule } from './module/phinxlog.module';
import { AcaoModule } from './module/acao.module';
import { AcoesRespostasModule } from './module/acoes-respostas.module';
import { AlertasIndicadoresModule } from './module/alertas-indicadores.module';
import { AlertasResultadosEsperadosModule } from './module/alertas-resultados-esperados.module';
import { ApiInputModule } from './module/api-input.module';
import { ApiNameModule } from './module/api-name.module';
import { ApiReturnModule } from './module/api-return.module';
import { AtendimentoModule } from './module/atendimento.module';
import { AtendimentoAceiteModule } from './module/atendimento-aceite.module';
import { AtendimentoAcompanhamentoPushModule } from './module/atendimento-acompanhamento-push.module';
import { AtendimentoAssinaturasModule } from './module/atendimento-assinaturas.module';
import { AtendimentoAtividadesModule } from './module/atendimento-atividades.module';
import { AtendimentoCepRecusadoModule } from './module/atendimento-cep-recusado.module';
import { AtendimentoGlosadoModule } from './module/atendimento-glosado.module';
import { AtendimentoImagemModule } from './module/atendimento-imagem.module';
import { AtendimentoSorteioFeitoModule } from './module/atendimento-sorteio-feito.module';
import { AtendimentoStatusFinanceiroModule } from './module/atendimento-status-financeiro.module';
import { AtividadesModule } from './module/atividades.module';
import { BancoModule } from './module/banco.module';
import { CategoriaModule } from './module/categoria.module';
import { CategoriaAtividadeModule } from './module/categoria-atividade.module';
import { CategoriaContratoModule } from './module/categoria-contrato.module';
import { CategoriaUnidadeModule } from './module/categoria-unidade.module';
import { CidPtaModule } from './module/cid-pta.module';
import { CidXPtaNovoModule } from './module/cid-x-pta-novo.module';
import { CidXPtaNovoPadItemIndicadoresModule } from './module/cid-x-pta-novo-pad-item-indicadores.module';
import { ControleDisparoAvisoModule } from './module/controle-disparo-aviso.module';
import { DescPtaModule } from './module/desc-pta.module';
import { DiarioModule } from './module/diario.module';
import { DiarioTagsModule } from './module/diario-tags.module';
import { EmpresaModule } from './module/empresa.module';
import { EspecialidadeModule } from './module/especialidade.module';
import { EspecialidadeOperadoraModule } from './module/especialidade-operadora.module';
import { EspecialidadeUnidadeModule } from './module/especialidade-unidade.module';
import { EspecialidadeValorModule } from './module/especialidade-valor.module';
import { FilesPanicoModule } from './module/files-panico.module';
import { FranquiaModule } from './module/franquia.module';
import { FranquiaAreaAtuacaoModule } from './module/franquia-area-atuacao.module';
import { FranquiaStatusAtualModule } from './module/franquia-status-atual.module';
import { FranquiaUsuarioModule } from './module/franquia-usuario.module';
import { GeoPanicoModule } from './module/geo-panico.module';
import { GrauParentescoModule } from './module/grau-parentesco.module';
import { GrupoRiscoModule } from './module/grupo-risco.module';
import { ImagemProntuarioModule } from './module/imagem-prontuario.module';
import { IndicadoresModule } from './module/indicadores.module';
import { IndicadoresValoresModule } from './module/indicadores-valores.module';
import { LicaoCasaModule } from './module/licao-casa.module';
import { LicaoCasaEvolucaoModule } from './module/licao-casa-evolucao.module';
import { LogPacAcessoModule } from './module/log-pac-acesso.module';
import { LogUserModule } from './module/log-user.module';
import { LogUserFranquiaModule } from './module/log-user-franquia.module';
import { MatMedModule } from './module/mat-med.module';
import { MigracaoModule } from './module/migracao.module';
import { ModulosPadModule } from './module/modulos-pad.module';
import { ModulosPadConfigModule } from './module/modulos-pad-config.module';
import { MotivoInternacaoModule } from './module/motivo-internacao.module';
import { MotivoPsModule } from './module/motivo-ps.module';
import { NotificacaoConfigModule } from './module/notificacao-config.module';
import { NotificacaoConfigUsuarioModule } from './module/notificacao-config-usuario.module';
import { OcorrenciaProntuarioModule } from './module/ocorrencia-prontuario.module';
import { OperadoraModule } from './module/operadora.module';
import { PacienteArquivoModule } from './module/paciente-arquivo.module';
import { PacienteCaracteristicaAtualModule } from './module/paciente-caracteristica-atual.module';
import { PacienteComplexidadeAtualModule } from './module/paciente-complexidade-atual.module';
import { PacienteDadosCartaoModule } from './module/paciente-dados-cartao.module';
import { PacienteDiagnosticoModule } from './module/paciente-diagnostico.module';
import { PacienteDiagnosticoTempModule } from './module/paciente-diagnostico-temp.module';
import { PacienteDiarioModule } from './module/paciente-diario.module';
import { PacienteDiarioTagsModule } from './module/paciente-diario-tags.module';
import { PacienteDispositivoAtualModule } from './module/paciente-dispositivo-atual.module';
import { PacienteDispositivoComplexidadeModule } from './module/paciente-dispositivo-complexidade.module';
import { PacienteEnqueteAppModule } from './module/paciente-enquete-app.module';
import { PacienteGrauParentescoModule } from './module/paciente-grau-parentesco.module';
import { PacienteHospitalModule } from './module/paciente-hospital.module';
import { PacienteMotivoInternacaoModule } from './module/paciente-motivo-internacao.module';
import { PacienteOperadoraModule } from './module/paciente-operadora.module';
import { PacientePedidoModule } from './module/paciente-pedido.module';
import { PacienteProntuarioModule } from './module/paciente-prontuario.module';
import { PacientePushModule } from './module/paciente-push.module';
import { PacienteServicoModule } from './module/paciente-servico.module';
import { PacienteStatusAtualModule } from './module/paciente-status-atual.module';
import { PadModule } from './module/pad.module';
import { PadCidModule } from './module/pad-cid.module';
import { PadItemModule } from './module/pad-item.module';
import { PadItemAlertaModule } from './module/pad-item-alerta.module';
import { PadItemAtividadeModule } from './module/pad-item-atividade.module';
import { PadItemCepRecusadoModule } from './module/pad-item-cep-recusado.module';
import { PadItemHistDataIncCompModule } from './module/pad-item-hist-data-inc-comp.module';
import { PadItemIndicadoresModule } from './module/pad-item-indicadores.module';
import { PadItemMetaModule } from './module/pad-item-meta.module';
import { PadItemResultadoModule } from './module/pad-item-resultado.module';
import { PadItemSorteioFeitoModule } from './module/pad-item-sorteio-feito.module';
import { PadItemTempModule } from './module/pad-item-temp.module';
import { PadMatMedModule } from './module/pad-mat-med.module';
import { PadPtaModule } from './module/pad-pta.module';
import { PadPtaTempModule } from './module/pad-pta-temp.module';
import { PerguntasQuestionarioModule } from './module/perguntas-questionario.module';
import { PeriodicidadeModule } from './module/periodicidade.module';
import { PeriodoModule } from './module/periodo.module';
import { ProfissionalModule } from './module/profissional.module';
import { ProfissionalAreaAtuacaoModule } from './module/profissional-area-atuacao.module';
import { ProfissionalAreaAtuacaoNewModule } from './module/profissional-area-atuacao-new.module';
import { ProfissionalArquivoModule } from './module/profissional-arquivo.module';
import { ProfissionalCategoriaContratoModule } from './module/profissional-categoria-contrato.module';
import { ProfissionalComplexidadeAtualModule } from './module/profissional-complexidade-atual.module';
import { ProfissionalDispositivoAtualModule } from './module/profissional-dispositivo-atual.module';
import { ProfissionalDispositivoComplexidadeModule } from './module/profissional-dispositivo-complexidade.module';
import { ProfissionalDispositivoComplexidadeAtualModule } from './module/profissional-dispositivo-complexidade-atual.module';
import { ProfissionalEspecialidadeModule } from './module/profissional-especialidade.module';
import { ProfissionalEspecialidadeNewModule } from './module/profissional-especialidade-new.module';
import { ProfissionalFranquiaModule } from './module/profissional-franquia.module';
import { ProfissionalHorarioModule } from './module/profissional-horario.module';
import { ProfissionalNewModule } from './module/profissional-new.module';
import { ProfissionalPushModule } from './module/profissional-push.module';
import { ProfissionalStatusAtualModule } from './module/profissional-status-atual.module';
import { ProfissionalStatusAtualNewModule } from './module/profissional-status-atual-new.module';
import { ProntuarioMotivoInternacaoPsModule } from './module/prontuario-motivo-internacao-ps.module';
import { ProntuarioMotivoManifestacaoModule } from './module/prontuario-motivo-manifestacao.module';
import { ProntuarioTipoManifestacaoModule } from './module/prontuario-tipo-manifestacao.module';
import { ProntuarioTipoMotivoModule } from './module/prontuario-tipo-motivo.module';
import { ProtocolosModule } from './module/protocolos.module';
import { PushnotificationEnviosModule } from './module/pushnotification-envios.module';
import { QuestionariosModule } from './module/questionarios.module';
import { ReportEmailAtendimentoModule } from './module/report-email-atendimento.module';
import { RespostasModule } from './module/respostas.module';
import { RespostasQuestionariosModule } from './module/respostas-questionarios.module';
import { ResultadosModule } from './module/resultados.module';
import { SegmentosPerguntasModule } from './module/segmentos-perguntas.module';
import { ServicoModule } from './module/servico.module';
import { StatusAtendimentoModule } from './module/status-atendimento.module';
import { StatusAtualModule } from './module/status-atual.module';
import { StatusAtualLigacaoModule } from './module/status-atual-ligacao.module';
import { StatusAtualProfModule } from './module/status-atual-prof.module';
import { StatusFinanceiroModule } from './module/status-financeiro.module';
import { StatusPadItemMetaModule } from './module/status-pad-item-meta.module';
import { TelaModule } from './module/tela.module';
import { TempoExperienciaModule } from './module/tempo-experiencia.module';
import { TermosUsoModule } from './module/termos-uso.module';
import { TipoEspecialidadeModule } from './module/tipo-especialidade.module';
import { TipoExameModule } from './module/tipo-exame.module';
import { TipoMatMedModule } from './module/tipo-mat-med.module';
import { TipoOperadoraModule } from './module/tipo-operadora.module';
import { TipoPreferenciaAtendimentoModule } from './module/tipo-preferencia-atendimento.module';
import { TipoProntuarioModule } from './module/tipo-prontuario.module';
import { TipoUnidadeModule } from './module/tipo-unidade.module';
import { TipoUsuarioModule } from './module/tipo-usuario.module';
import { TokenUsuarioModule } from './module/token-usuario.module';
import { UfModule } from './module/uf.module';
import { UnidadeEasyModule } from './module/unidade-easy.module';
import { UnidadeEasyAreaAtuacaoModule } from './module/unidade-easy-area-atuacao.module';
import { UnidadeMedidaModule } from './module/unidade-medida.module';
import { UsuarioModule } from './module/usuario.module';
import { UsuarioAcaoModule } from './module/usuario-acao.module';
import { UsuarioPainelGerencialModule } from './module/usuario-painel-gerencial.module';
import { UsuarioPanicoModule } from './module/usuario-panico.module';
import { UsuarioStatusAtualModule } from './module/usuario-status-atual.module';
import { VwApiAtendimentosAceiteModule } from './module/vw-api-atendimentos-aceite.module';
import { CidXPtaNovoPadItemIndiModule } from './module/cid-x-pta-novo-pad-item-indi.module';
// jhipster-needle-add-entity-module-to-main-import - JHipster will import entity modules here, do not remove
// jhipster-needle-add-controller-module-to-main-import - JHipster will import controller modules here, do not remove
// jhipster-needle-add-service-module-to-main-import - JHipster will import service modules here, do not remove

@Module({
  imports: [
    AuthModule,
    PacienteModule,
    CidadeModule,
    PacienteModule,
    CidadeModule,
    CepbrBairroModule,
    CepbrCidadeModule,
    CepbrEnderecoModule,
    CepbrEstadoModule,
    CidModule,
    JulhoModule,
    JunhoModule,
    MaioModule,
    PadCsvModule,
    PhinxlogModule,
    AcaoModule,
    AcoesRespostasModule,
    AlertasIndicadoresModule,
    AlertasResultadosEsperadosModule,
    ApiInputModule,
    ApiNameModule,
    ApiReturnModule,
    AtendimentoModule,
    AtendimentoAceiteModule,
    AtendimentoAcompanhamentoPushModule,
    AtendimentoAssinaturasModule,
    AtendimentoAtividadesModule,
    AtendimentoCepRecusadoModule,
    AtendimentoGlosadoModule,
    AtendimentoImagemModule,
    AtendimentoSorteioFeitoModule,
    AtendimentoStatusFinanceiroModule,
    AtividadesModule,
    BancoModule,
    CategoriaModule,
    CategoriaAtividadeModule,
    CategoriaContratoModule,
    CategoriaUnidadeModule,
    CidPtaModule,
    CidXPtaNovoModule,
    CidXPtaNovoPadItemIndicadoresModule,
    CidadeModule,
    ControleDisparoAvisoModule,
    DescPtaModule,
    DiarioModule,
    DiarioTagsModule,
    EmpresaModule,
    EspecialidadeModule,
    EspecialidadeOperadoraModule,
    EspecialidadeUnidadeModule,
    EspecialidadeValorModule,
    FilesPanicoModule,
    FranquiaModule,
    FranquiaAreaAtuacaoModule,
    FranquiaStatusAtualModule,
    FranquiaUsuarioModule,
    GeoPanicoModule,
    GrauParentescoModule,
    GrupoRiscoModule,
    ImagemProntuarioModule,
    IndicadoresModule,
    IndicadoresValoresModule,
    LicaoCasaModule,
    LicaoCasaEvolucaoModule,
    LogPacAcessoModule,
    LogUserModule,
    LogUserFranquiaModule,
    MatMedModule,
    MigracaoModule,
    ModulosPadModule,
    ModulosPadConfigModule,
    MotivoInternacaoModule,
    MotivoPsModule,
    NotificacaoConfigModule,
    NotificacaoConfigUsuarioModule,
    OcorrenciaProntuarioModule,
    OperadoraModule,
    PacienteModule,
    PacienteArquivoModule,
    PacienteCaracteristicaAtualModule,
    PacienteComplexidadeAtualModule,
    PacienteDadosCartaoModule,
    PacienteDiagnosticoModule,
    PacienteDiagnosticoTempModule,
    PacienteDiarioModule,
    PacienteDiarioTagsModule,
    PacienteDispositivoAtualModule,
    PacienteDispositivoComplexidadeModule,
    PacienteEnqueteAppModule,
    PacienteGrauParentescoModule,
    PacienteHospitalModule,
    PacienteMotivoInternacaoModule,
    PacienteOperadoraModule,
    PacientePedidoModule,
    PacienteProntuarioModule,
    PacientePushModule,
    PacienteServicoModule,
    PacienteStatusAtualModule,
    PadModule,
    PadCidModule,
    PadItemModule,
    PadItemAlertaModule,
    PadItemAtividadeModule,
    PadItemCepRecusadoModule,
    PadItemHistDataIncCompModule,
    PadItemIndicadoresModule,
    PadItemMetaModule,
    PadItemResultadoModule,
    PadItemSorteioFeitoModule,
    PadItemTempModule,
    PadMatMedModule,
    PadPtaModule,
    PadPtaTempModule,
    PerguntasQuestionarioModule,
    PeriodicidadeModule,
    PeriodoModule,
    ProfissionalModule,
    ProfissionalAreaAtuacaoModule,
    ProfissionalAreaAtuacaoNewModule,
    ProfissionalArquivoModule,
    ProfissionalCategoriaContratoModule,
    ProfissionalComplexidadeAtualModule,
    ProfissionalDispositivoAtualModule,
    ProfissionalDispositivoComplexidadeModule,
    ProfissionalDispositivoComplexidadeAtualModule,
    ProfissionalEspecialidadeModule,
    ProfissionalEspecialidadeNewModule,
    ProfissionalFranquiaModule,
    ProfissionalHorarioModule,
    ProfissionalNewModule,
    ProfissionalPushModule,
    ProfissionalStatusAtualModule,
    ProfissionalStatusAtualNewModule,
    ProntuarioMotivoInternacaoPsModule,
    ProntuarioMotivoManifestacaoModule,
    ProntuarioTipoManifestacaoModule,
    ProntuarioTipoMotivoModule,
    ProtocolosModule,
    PushnotificationEnviosModule,
    QuestionariosModule,
    ReportEmailAtendimentoModule,
    RespostasModule,
    RespostasQuestionariosModule,
    ResultadosModule,
    SegmentosPerguntasModule,
    ServicoModule,
    StatusAtendimentoModule,
    StatusAtualModule,
    StatusAtualLigacaoModule,
    StatusAtualProfModule,
    StatusFinanceiroModule,
    StatusPadItemMetaModule,
    TelaModule,
    TempoExperienciaModule,
    TermosUsoModule,
    TipoEspecialidadeModule,
    TipoExameModule,
    TipoMatMedModule,
    TipoOperadoraModule,
    TipoPreferenciaAtendimentoModule,
    TipoProntuarioModule,
    TipoUnidadeModule,
    TipoUsuarioModule,
    TokenUsuarioModule,
    UfModule,
    UnidadeEasyModule,
    UnidadeEasyAreaAtuacaoModule,
    UnidadeMedidaModule,
    UsuarioModule,
    UsuarioAcaoModule,
    UsuarioPainelGerencialModule,
    UsuarioPanicoModule,
    UsuarioStatusAtualModule,
    VwApiAtendimentosAceiteModule,
    /* prettier-ignore */
    CidXPtaNovoPadItemIndiModule,
    // jhipster-needle-add-entity-module-to-main - JHipster will add entity modules here, do not remove

    TypeOrmModule.forRoot(ormconfig)
  ],
  controllers: [
    // jhipster-needle-add-controller-module-to-main - JHipster will add controller modules here, do not remove
  ],
  providers: [
    // jhipster-needle-add-service-module-to-main - JHipster will add service modules here, do not remove
  ]
})
export class AppModule {}
