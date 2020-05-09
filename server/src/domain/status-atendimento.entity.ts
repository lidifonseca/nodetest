/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { validate, Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, Min, Max } from 'class-validator';

import Atendimento from './atendimento.entity';

/**
 * A StatusAtendimento.
 */
@Entity('tb_status_atendimento')
export default class StatusAtendimento extends BaseEntity {
  @Column({ name: 'STATUS_ATENDIMENTO', length: 40 })
  statusAtendimento: string;

  @Column({ name: 'STYLE_LABEL', length: 40 })
  styleLabel: string;

  @Column({ type: 'integer', name: 'ORDENACAO' })
  ordenacao: number;

  @Column({ type: 'boolean', name: 'ATIVO' })
  ativo: boolean;

  @OneToMany(
    type => Atendimento,
    other => other.statusAtendimento
  )
  atendimentos: Atendimento[];

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
