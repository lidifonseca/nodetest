/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { validate, Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, Min, Max } from 'class-validator';

/**
 * A CidXPtaNovo.
 */
@Entity('tb_cid_x_pta_novo')
export default class CidXPtaNovo extends BaseEntity {
  @Column({ name: 'COMPLEXIDADE', length: 45 })
  complexidade: string;

  @Column({ type: 'integer', name: 'VERSAO' })
  versao: number;

  @Column({ type: 'integer', name: 'SCORE' })
  score: number;

  @Column({ name: 'TITULO', length: 245 })
  titulo: string;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
