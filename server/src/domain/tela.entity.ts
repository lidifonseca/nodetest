/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { validate, Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, Min, Max } from 'class-validator';

/**
 * A Tela.
 */
@Entity('tb_tela')
export default class Tela extends BaseEntity {
  @Column({ name: 'TELA', length: 100 })
  tela: string;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
