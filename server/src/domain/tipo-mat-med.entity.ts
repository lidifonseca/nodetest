/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { validate, Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, Min, Max } from 'class-validator';

/**
 * A TipoMatMed.
 */
@Entity('tipo_mat_med')
export default class TipoMatMed extends BaseEntity {
  @Column({ name: 'tipo', length: 45, nullable: false })
  tipo: string;

  @Column({ type: 'integer', name: 'ativo' })
  ativo: number;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}