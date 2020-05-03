/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { validate, Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, Min, Max } from 'class-validator';

/**
 * A TipoProntuario.
 */
@Entity('tipo_prontuario')
export default class TipoProntuario extends BaseEntity {
  @Column({ name: 'prontuario', length: 45, nullable: false })
  prontuario: string;

  @Column({ type: 'integer', name: 'ativo', nullable: false })
  ativo: number;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
