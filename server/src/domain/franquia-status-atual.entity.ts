/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { validate, Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, Min, Max } from 'class-validator';

/**
 * A FranquiaStatusAtual.
 */
@Entity('tb_franquia_status_atual')
export default class FranquiaStatusAtual extends BaseEntity {
  @Column({ type: 'integer', name: 'STATUS_ATUAL' })
  statusAtual: number;

  @Column({ name: 'OBS', length: 255 })
  obs: string;

  @Column({ type: 'integer', name: 'ATIVO' })
  ativo: number;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
