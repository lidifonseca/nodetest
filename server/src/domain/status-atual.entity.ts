/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { validate, Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, Min, Max } from 'class-validator';

/**
 * A StatusAtual.
 */
@Entity('tb_status_atual')
export default class StatusAtual extends BaseEntity {
  @Column({ name: 'STATUS_ATUAL', length: 50 })
  statusAtual: string;

  @Column({ name: 'STYLE_LABEL', length: 40 })
  styleLabel: string;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
