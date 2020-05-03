/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { validate, Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, Min, Max } from 'class-validator';

/**
 * A LicaoCasa.
 */
@Entity('licao_casa')
export default class LicaoCasa extends BaseEntity {
  @Column({ type: 'integer', name: 'atendimento_id', nullable: false })
  atendimentoId: number;

  @Column({ type: 'integer', name: 'paciente_id', nullable: false })
  pacienteId: number;

  @Column({ type: 'integer', name: 'profissional_id', nullable: false })
  profissionalId: number;

  @Column({ name: 'atividade', length: 100, nullable: false })
  atividade: string;

  @Column({ type: 'timestamp', name: 'hora_inicio' })
  horaInicio: any;

  @Column({ type: 'boolean', name: 'repeticao_horas', nullable: false })
  repeticaoHoras: boolean;

  @Column({ type: 'boolean', name: 'qtd_dias', nullable: false })
  qtdDias: boolean;

  @Column({ type: 'boolean', name: 'intervalo_dias', nullable: false })
  intervaloDias: boolean;

  @Column({ type: 'timestamp', name: 'criado_em' })
  criadoEm: any;

  @Column({ type: 'timestamp', name: 'concluida_em' })
  concluidaEm: any;

  @Column({ type: 'boolean', name: 'ativo', nullable: false })
  ativo: boolean;

  @Column({ type: 'integer', name: 'ativ' })
  ativ: number;

  @Column({ name: 'forma', length: 3 })
  forma: string;

  @Column({ name: 'enviar_para', length: 2 })
  enviarPara: string;

  @Column({ name: 'notificar_familiar', length: 1 })
  notificarFamiliar: string;

  @Column({ name: 'replicar_atividade', length: 1 })
  replicarAtividade: string;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
