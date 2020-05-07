/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { validate, Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, Min, Max } from 'class-validator';

/**
 * A UnidadeMedida.
 */
@Entity('tb_unidade_medida')
export default class UnidadeMedida extends BaseEntity {
  @Column({ name: 'UNIDADE', length: 45, nullable: false })
  unidade: string;

  @Column({ name: 'DESCRICAO', length: 45 })
  descricao: string;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
