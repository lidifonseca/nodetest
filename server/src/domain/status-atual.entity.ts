/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { validate, Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, Min, Max } from 'class-validator';

import PacienteStatusAtual from './paciente-status-atual.entity';

/**
 * A StatusAtual.
 */
@Entity('status_atual')
export default class StatusAtual extends BaseEntity {
  @Column({ name: 'status_atual', length: 50 })
  statusAtual: string;

  @Column({ name: 'style_label', length: 40 })
  styleLabel: string;

  @Column({ type: 'timestamp', name: 'data_post', nullable: false })
  dataPost: any;

  @OneToMany(
    type => PacienteStatusAtual,
    other => other.idStatusAtual
  )
  pacienteStatusAtuals: PacienteStatusAtual[];

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
