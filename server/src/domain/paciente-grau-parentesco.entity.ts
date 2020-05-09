/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { validate, Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, Min, Max } from 'class-validator';

/**
 * A PacienteGrauParentesco.
 */
@Entity('tb_paciente_grau_parentesco')
export default class PacienteGrauParentesco extends BaseEntity {
  @Column({ name: 'GRAU_PARENTESCO', length: 60 })
  grauParentesco: string;

  @Column({ type: 'boolean', name: 'ATIVO' })
  ativo: boolean;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
