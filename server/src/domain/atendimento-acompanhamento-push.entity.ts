/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { validate, Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, Min, Max } from 'class-validator';

/**
 * A AtendimentoAcompanhamentoPush.
 */
@Entity('tb_atendimento_acompanhamento_push')
export default class AtendimentoAcompanhamentoPush extends BaseEntity {
  @Column({ type: 'integer', name: 'ATENDIMENTO_ID', nullable: false })
  atendimentoId: number;

  @Column({ type: 'integer', name: 'PACIENTE_ID', nullable: false })
  pacienteId: number;

  @Column({ type: 'integer', name: 'PROFISSIONAL_ID', nullable: false })
  profissionalId: number;

  @Column({ type: 'timestamp', name: 'TIMESTAMP_ATENDIMENTO' })
  timestampAtendimento: any;

  @Column({ name: 'NOME_PACIENTE', length: 60 })
  nomePaciente: string;

  @Column({ name: 'NOME_PROFISSIOINAL', length: 60 })
  nomeProfissioinal: string;

  @Column({ type: 'timestamp', name: 'TIMESTAMP_CONFIRMACAO' })
  timestampConfirmacao: any;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
