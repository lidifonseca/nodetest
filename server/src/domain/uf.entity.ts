/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { validate, Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, Min, Max } from 'class-validator';

/**
 * A Uf.
 */
@Entity('tb_uf')
export default class Uf extends BaseEntity {
  @Column({ name: 'SIGLA_UF', length: 4 })
  siglaUf: string;

  @Column({ name: 'DESCR_UF', length: 255 })
  descrUf: string;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
