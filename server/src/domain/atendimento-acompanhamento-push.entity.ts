/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { validate, Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, Min, Max } from 'class-validator';

/**
 * A AtendimentoAcompanhamentoPush.
 */
@Entity('atendimento_acompanhamento_push')
export default class AtendimentoAcompanhamentoPush extends BaseEntity {
  @Column({ type: 'integer', name: 'atendimento_id', nullable: false })
  atendimentoId: number;

  @Column({ type: 'integer', name: 'paciente_id', nullable: false })
  pacienteId: number;

  @Column({ type: 'integer', name: 'profissional_id', nullable: false })
  profissionalId: number;

  @Column({ type: 'timestamp', name: 'timestamp_atendimento' })
  timestampAtendimento: any;

  @Column({ name: 'nome_paciente', length: 60 })
  nomePaciente: string;

  @Column({ name: 'nome_profissioinal', length: 60 })
  nomeProfissioinal: string;

  @Column({ type: 'timestamp', name: 'timestamp_confirmacao' })
  timestampConfirmacao: any;

  @Column({ type: 'timestamp', name: 'data_post' })
  dataPost: any;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
