/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { validate, Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, Min, Max } from 'class-validator';

/**
 * A Cidade.
 */
@Entity('tb_cidade')
export default class Cidade extends BaseEntity {
  @Column({ name: 'DESCR_CIDADE', length: 255 })
  descrCidade: string;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
