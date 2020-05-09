/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { validate, Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, Min, Max } from 'class-validator';

/**
 * A TipoProntuario.
 */
@Entity('tb_tipo_prontuario')
export default class TipoProntuario extends BaseEntity {
  @Column({ name: 'PRONTUARIO', length: 45, nullable: false })
  prontuario: string;

  @Column({ type: 'boolean', name: 'ATIVO', nullable: false })
  ativo: boolean;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
