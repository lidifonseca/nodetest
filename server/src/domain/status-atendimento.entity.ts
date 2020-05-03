/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { validate, Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, Min, Max } from 'class-validator';

import Atendimento from './atendimento.entity';

/**
 * A StatusAtendimento.
 */
@Entity('status_atendimento')
export default class StatusAtendimento extends BaseEntity {
  @Column({ name: 'status_atendimento', length: 40 })
  statusAtendimento: string;

  @Column({ name: 'style_label', length: 40 })
  styleLabel: string;

  @Column({ type: 'integer', name: 'ordenacao' })
  ordenacao: number;

  @Column({ type: 'integer', name: 'ativo' })
  ativo: number;

  @OneToMany(
    type => Atendimento,
    other => other.idStatusAtendimento
  )
  atendimentos: Atendimento[];

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
