/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { validate, Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, Min, Max } from 'class-validator';

import Franquia from './franquia.entity';

/**
 * A FranquiaStatusAtual.
 */
@Entity('franquia_status_atual')
export default class FranquiaStatusAtual extends BaseEntity {
  @Column({ type: 'integer', name: 'status_atual' })
  statusAtual: number;

  @Column({ name: 'obs', length: 255 })
  obs: string;

  @Column({ type: 'integer', name: 'ativo' })
  ativo: number;

  @Column({ type: 'timestamp', name: 'data_post', nullable: false })
  dataPost: any;

  @ManyToOne(type => Franquia)
  idFranquia: Franquia;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
