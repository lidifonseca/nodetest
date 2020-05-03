/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { validate, Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, Min, Max } from 'class-validator';

/**
 * A PacienteDiarioTags.
 */
@Entity('paciente_diario_tags')
export default class PacienteDiarioTags extends BaseEntity {
  @Column({ type: 'integer', name: 'id_paciente_diario', nullable: false })
  idPacienteDiario: number;

  @Column({ type: 'integer', name: 'id_diario_tags', nullable: false })
  idDiarioTags: number;

  @Column({ type: 'integer', name: 'escala_de_plantao' })
  escalaDePlantao: number;

  @Column({ type: 'integer', name: 'captacao_edp' })
  captacaoEdp: number;

  @Column({ type: 'integer', name: 'implantacao_edp' })
  implantacaoEdp: number;

  @Column({ type: 'integer', name: 'furo_de_escala_edp' })
  furoDeEscalaEdp: number;

  @Column({ type: 'integer', name: 'solicitacao_de_folga_edp' })
  solicitacaoDeFolgaEdp: number;

  @Column({ type: 'integer', name: 'troca_de_profissional_edp' })
  trocaDeProfissionalEdp: number;

  @Column({ type: 'integer', name: 'reclamacao_edp' })
  reclamacaoEdp: number;

  @Column({ type: 'integer', name: 'elogio_edp' })
  elogioEdp: number;

  @Column({ type: 'integer', name: 'recusa_de_atendimento_edp' })
  recusaDeAtendimentoEdp: number;

  @Column({ type: 'integer', name: 'duplicidade_edp' })
  duplicidadeEdp: number;

  @Column({ type: 'integer', name: 'monitorar_edp' })
  monitorarEdp: number;

  @Column({ type: 'integer', name: 'pendente_edp', nullable: false })
  pendenteEdp: number;

  @Column({ type: 'integer', name: 'escala_multi_profissional' })
  escalaMultiProfissional: number;

  @Column({ type: 'integer', name: 'captacao_emp' })
  captacaoEmp: number;

  @Column({ type: 'integer', name: 'implantacao_emp' })
  implantacaoEmp: number;

  @Column({ type: 'integer', name: 'solicitacao_de_folga_emp' })
  solicitacaoDeFolgaEmp: number;

  @Column({ type: 'integer', name: 'troca_de_profissional_emp' })
  trocaDeProfissionalEmp: number;

  @Column({ type: 'integer', name: 'reclamacao_emp' })
  reclamacaoEmp: number;

  @Column({ type: 'integer', name: 'elogio_emp' })
  elogioEmp: number;

  @Column({ type: 'integer', name: 'pad_incompleto_emp' })
  padIncompletoEmp: number;

  @Column({ type: 'integer', name: 'visita_improdutiva_emp' })
  visitaImprodutivaEmp: number;

  @Column({ type: 'integer', name: 'monitorar_emp' })
  monitorarEmp: number;

  @Column({ type: 'integer', name: 'pendente_emp', nullable: false })
  pendenteEmp: number;

  @Column({ type: 'integer', name: 'intercorrencia' })
  intercorrencia: number;

  @Column({ type: 'integer', name: 'clinica_inter' })
  clinicaInter: number;

  @Column({ type: 'integer', name: 'aph_inter' })
  aphInter: number;

  @Column({ type: 'integer', name: 'pendente_inter', nullable: false })
  pendenteInter: number;

  @Column({ type: 'integer', name: 'solicitacoes' })
  solicitacoes: number;

  @Column({ type: 'integer', name: 'recarga_de_oxigenio_solic' })
  recargaDeOxigenioSolic: number;

  @Column({ type: 'integer', name: 'equipamentos_solic' })
  equipamentosSolic: number;

  @Column({ type: 'integer', name: 'matmed_solic' })
  matmedSolic: number;

  @Column({ type: 'integer', name: 'prontuario_solic' })
  prontuarioSolic: number;

  @Column({ type: 'integer', name: 'prescricoes_solic' })
  prescricoesSolic: number;

  @Column({ type: 'integer', name: 'exames_solic' })
  examesSolic: number;

  @Column({ type: 'integer', name: 'ambulancia_solic' })
  ambulanciaSolic: number;

  @Column({ type: 'integer', name: 'atendimento_de_equipe_solic' })
  atendimentoDeEquipeSolic: number;

  @Column({ type: 'integer', name: 'monitorar_solic' })
  monitorarSolic: number;

  @Column({ type: 'integer', name: 'pendente_solic', nullable: false })
  pendenteSolic: number;

  @Column({ type: 'integer', name: 'avaliacao' })
  avaliacao: number;

  @Column({ type: 'integer', name: 'residencia_aval' })
  residenciaAval: number;

  @Column({ type: 'integer', name: 'hospital_aval' })
  hospitalAval: number;

  @Column({ type: 'integer', name: 'monitorar_aval' })
  monitorarAval: number;

  @Column({ type: 'integer', name: 'captacao_ativa_aval' })
  captacaoAtivaAval: number;

  @Column({ type: 'integer', name: 'pendente_aval', nullable: false })
  pendenteAval: number;

  @Column({ type: 'integer', name: 'implantacao' })
  implantacao: number;

  @Column({ type: 'integer', name: 'monitorar_impl' })
  monitorarImpl: number;

  @Column({ type: 'integer', name: 'pendente_impl', nullable: false })
  pendenteImpl: number;

  @Column({ type: 'integer', name: 'alta' })
  alta: number;

  @Column({ type: 'integer', name: 'hospitalizacao_alt' })
  hospitalizacaoAlt: number;

  @Column({ type: 'integer', name: 'migracao_de_empresa_alt' })
  migracaoDeEmpresaAlt: number;

  @Column({ type: 'integer', name: 'obito_em_casa_alt' })
  obitoEmCasaAlt: number;

  @Column({ type: 'integer', name: 'termino_de_atendimento_alt' })
  terminoDeAtendimentoAlt: number;

  @Column({ type: 'integer', name: 'atendimento_suspenso_alt' })
  atendimentoSuspensoAlt: number;

  @Column({ type: 'integer', name: 'monitorar_alt' })
  monitorarAlt: number;

  @Column({ type: 'integer', name: 'pendente_alt', nullable: false })
  pendenteAlt: number;

  @Column({ type: 'integer', name: 'e_commerce_seg_viagem' })
  eCommerceSegViagem: number;

  @Column({ type: 'integer', name: 'monitorar_ecsv' })
  monitorarEcsv: number;

  @Column({ type: 'integer', name: 'pendente_ecsv', nullable: false })
  pendenteEcsv: number;

  @Column({ type: 'integer', name: 'farmacia', nullable: false })
  farmacia: number;

  @Column({ type: 'integer', name: 'mat_med_farm', nullable: false })
  matMedFarm: number;

  @Column({ type: 'integer', name: 'receita_farm', nullable: false })
  receitaFarm: number;

  @Column({ type: 'integer', name: 'prontuario_farm', nullable: false })
  prontuarioFarm: number;

  @Column({ type: 'integer', name: 'romaneio_manual_farm', nullable: false })
  romaneioManualFarm: number;

  @Column({ type: 'integer', name: 'outros_farm', nullable: false })
  outrosFarm: number;

  @Column({ type: 'integer', name: 'monitorar_farm', nullable: false })
  monitorarFarm: number;

  @Column({ type: 'integer', name: 'pendente_farm', nullable: false })
  pendenteFarm: number;

  @Column({ type: 'integer', name: 'contato_telefonico', nullable: false })
  contatoTelefonico: number;

  @Column({ type: 'integer', name: 'ativo_cont_tel', nullable: false })
  ativoContTel: number;

  @Column({ type: 'integer', name: 'receptivo_cont_tel', nullable: false })
  receptivoContTel: number;

  @Column({ type: 'integer', name: 'monitorar_cont_tel', nullable: false })
  monitorarContTel: number;

  @Column({ type: 'integer', name: 'pendente_cont_tel', nullable: false })
  pendenteContTel: number;

  @Column({ type: 'timestamp', name: 'dt_post', nullable: false })
  dtPost: any;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
