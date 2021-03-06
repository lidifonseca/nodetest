/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { validate, Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, Min, Max } from 'class-validator';

/**
 * A Banco.
 */
@Entity('tb_banco')
export default class Banco extends BaseEntity {
  @Column({ name: 'COD_BANCO', length: 15 })
  codBanco: string;

  @Column({ name: 'BANCO', length: 100 })
  banco: string;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
