/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { validate, Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, Min, Max } from 'class-validator';

/**
 * A Acao.
 */
@Entity('tb_acao')
export default class Acao extends BaseEntity {
  @Column({ name: 'ACAO', length: 100 })
  acao: string;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
