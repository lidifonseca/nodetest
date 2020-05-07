/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { validate, Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, Min, Max } from 'class-validator';

/**
 * A PacienteDiarioTags.
 */
@Entity('tb_paciente_diario_tags')
export default class PacienteDiarioTags extends BaseEntity {
  @Column({ type: 'integer', name: 'ID_PACIENTE_DIARIO', nullable: false })
  idPacienteDiario: number;

  @Column({ type: 'integer', name: 'ID_DIARIO_TAGS', nullable: false })
  idDiarioTags: number;

  @Column({ type: 'integer', name: 'ESCALA_DE_PLANTAO' })
  escalaDePlantao: number;

  @Column({ type: 'integer', name: 'CAPTACAO_EDP' })
  captacaoEdp: number;

  @Column({ type: 'integer', name: 'IMPLANTACAO_EDP' })
  implantacaoEdp: number;

  @Column({ type: 'integer', name: 'FURO_DE_ESCALA_EDP' })
  furoDeEscalaEdp: number;

  @Column({ type: 'integer', name: 'SOLICITACAO_DE_FOLGA_EDP' })
  solicitacaoDeFolgaEdp: number;

  @Column({ type: 'integer', name: 'TROCA_DE_PROFISSIONAL_EDP' })
  trocaDeProfissionalEdp: number;

  @Column({ type: 'integer', name: 'RECLAMACAO_EDP' })
  reclamacaoEdp: number;

  @Column({ type: 'integer', name: 'ELOGIO_EDP' })
  elogioEdp: number;

  @Column({ type: 'integer', name: 'RECUSA_DE_ATENDIMENTO_EDP' })
  recusaDeAtendimentoEdp: number;

  @Column({ type: 'integer', name: 'DUPLICIDADE_EDP' })
  duplicidadeEdp: number;

  @Column({ type: 'integer', name: 'MONITORAR_EDP' })
  monitorarEdp: number;

  @Column({ type: 'integer', name: 'PENDENTE_EDP', nullable: false })
  pendenteEdp: number;

  @Column({ type: 'integer', name: 'ESCALA_MULTI_PROFISSIONAL' })
  escalaMultiProfissional: number;

  @Column({ type: 'integer', name: 'CAPTACAO_EMP' })
  captacaoEmp: number;

  @Column({ type: 'integer', name: 'IMPLANTACAO_EMP' })
  implantacaoEmp: number;

  @Column({ type: 'integer', name: 'SOLICITACAO_DE_FOLGA_EMP' })
  solicitacaoDeFolgaEmp: number;

  @Column({ type: 'integer', name: 'TROCA_DE_PROFISSIONAL_EMP' })
  trocaDeProfissionalEmp: number;

  @Column({ type: 'integer', name: 'RECLAMACAO_EMP' })
  reclamacaoEmp: number;

  @Column({ type: 'integer', name: 'ELOGIO_EMP' })
  elogioEmp: number;

  @Column({ type: 'integer', name: 'PAD_INCOMPLETO_EMP' })
  padIncompletoEmp: number;

  @Column({ type: 'integer', name: 'VISITA_IMPRODUTIVA_EMP' })
  visitaImprodutivaEmp: number;

  @Column({ type: 'integer', name: 'MONITORAR_EMP' })
  monitorarEmp: number;

  @Column({ type: 'integer', name: 'PENDENTE_EMP', nullable: false })
  pendenteEmp: number;

  @Column({ type: 'integer', name: 'INTERCORRENCIA' })
  intercorrencia: number;

  @Column({ type: 'integer', name: 'CLINICA_INTER' })
  clinicaInter: number;

  @Column({ type: 'integer', name: 'APH_INTER' })
  aphInter: number;

  @Column({ type: 'integer', name: 'PENDENTE_INTER', nullable: false })
  pendenteInter: number;

  @Column({ type: 'integer', name: 'SOLICITACOES' })
  solicitacoes: number;

  @Column({ type: 'integer', name: 'RECARGA_DE_OXIGENIO_SOLIC' })
  recargaDeOxigenioSolic: number;

  @Column({ type: 'integer', name: 'EQUIPAMENTOS_SOLIC' })
  equipamentosSolic: number;

  @Column({ type: 'integer', name: 'MATMED_SOLIC' })
  matmedSolic: number;

  @Column({ type: 'integer', name: 'PRONTUARIO_SOLIC' })
  prontuarioSolic: number;

  @Column({ type: 'integer', name: 'PRESCRICOES_SOLIC' })
  prescricoesSolic: number;

  @Column({ type: 'integer', name: 'EXAMES_SOLIC' })
  examesSolic: number;

  @Column({ type: 'integer', name: 'AMBULANCIA_SOLIC' })
  ambulanciaSolic: number;

  @Column({ type: 'integer', name: 'ATENDIMENTO_DE_EQUIPE_SOLIC' })
  atendimentoDeEquipeSolic: number;

  @Column({ type: 'integer', name: 'MONITORAR_SOLIC' })
  monitorarSolic: number;

  @Column({ type: 'integer', name: 'PENDENTE_SOLIC', nullable: false })
  pendenteSolic: number;

  @Column({ type: 'integer', name: 'AVALIACAO' })
  avaliacao: number;

  @Column({ type: 'integer', name: 'RESIDENCIA_AVAL' })
  residenciaAval: number;

  @Column({ type: 'integer', name: 'HOSPITAL_AVAL' })
  hospitalAval: number;

  @Column({ type: 'integer', name: 'MONITORAR_AVAL' })
  monitorarAval: number;

  @Column({ type: 'integer', name: 'CAPTACAO_ATIVA_AVAL' })
  captacaoAtivaAval: number;

  @Column({ type: 'integer', name: 'PENDENTE_AVAL', nullable: false })
  pendenteAval: number;

  @Column({ type: 'integer', name: 'IMPLANTACAO' })
  implantacao: number;

  @Column({ type: 'integer', name: 'MONITORAR_IMPL' })
  monitorarImpl: number;

  @Column({ type: 'integer', name: 'PENDENTE_IMPL', nullable: false })
  pendenteImpl: number;

  @Column({ type: 'integer', name: 'ALTA' })
  alta: number;

  @Column({ type: 'integer', name: 'HOSPITALIZACAO_ALT' })
  hospitalizacaoAlt: number;

  @Column({ type: 'integer', name: 'MIGRACAO_DE_EMPRESA_ALT' })
  migracaoDeEmpresaAlt: number;

  @Column({ type: 'integer', name: 'OBITO_EM_CASA_ALT' })
  obitoEmCasaAlt: number;

  @Column({ type: 'integer', name: 'TERMINO_DE_ATENDIMENTO_ALT' })
  terminoDeAtendimentoAlt: number;

  @Column({ type: 'integer', name: 'ATENDIMENTO_SUSPENSO_ALT' })
  atendimentoSuspensoAlt: number;

  @Column({ type: 'integer', name: 'MONITORAR_ALT' })
  monitorarAlt: number;

  @Column({ type: 'integer', name: 'PENDENTE_ALT', nullable: false })
  pendenteAlt: number;

  @Column({ type: 'integer', name: 'E_COMMERCE_SEG_VIAGEM' })
  eCommerceSegViagem: number;

  @Column({ type: 'integer', name: 'MONITORAR_ECSV' })
  monitorarEcsv: number;

  @Column({ type: 'integer', name: 'PENDENTE_ECSV', nullable: false })
  pendenteEcsv: number;

  @Column({ type: 'integer', name: 'FARMACIA', nullable: false })
  farmacia: number;

  @Column({ type: 'integer', name: 'MAT_MED_FARM', nullable: false })
  matMedFarm: number;

  @Column({ type: 'integer', name: 'RECEITA_FARM', nullable: false })
  receitaFarm: number;

  @Column({ type: 'integer', name: 'PRONTUARIO_FARM', nullable: false })
  prontuarioFarm: number;

  @Column({ type: 'integer', name: 'ROMANEIO_MANUAL_FARM', nullable: false })
  romaneioManualFarm: number;

  @Column({ type: 'integer', name: 'OUTROS_FARM', nullable: false })
  outrosFarm: number;

  @Column({ type: 'integer', name: 'MONITORAR_FARM', nullable: false })
  monitorarFarm: number;

  @Column({ type: 'integer', name: 'PENDENTE_FARM', nullable: false })
  pendenteFarm: number;

  @Column({ type: 'integer', name: 'CONTATO_TELEFONICO', nullable: false })
  contatoTelefonico: number;

  @Column({ type: 'integer', name: 'ATIVO_CONT_TEL', nullable: false })
  ativoContTel: number;

  @Column({ type: 'integer', name: 'RECEPTIVO_CONT_TEL', nullable: false })
  receptivoContTel: number;

  @Column({ type: 'integer', name: 'MONITORAR_CONT_TEL', nullable: false })
  monitorarContTel: number;

  @Column({ type: 'integer', name: 'PENDENTE_CONT_TEL', nullable: false })
  pendenteContTel: number;

  @Column({ type: 'timestamp', name: 'DT_POST', nullable: false })
  dtPost: any;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
