/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { validate, Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, Min, Max } from 'class-validator';

import Paciente from './paciente.entity';
import Operadora from './operadora.entity';

/**
 * A PacienteOperadora.
 */
@Entity('paciente_operadora')
export default class PacienteOperadora extends BaseEntity {
  @Column({ name: 'registro', length: 100 })
  registro: string;

  @Column({ type: 'integer', name: 'ativo' })
  ativo: number;

  @ManyToOne(type => Paciente)
  idPaciente: Paciente;

  @ManyToOne(type => Operadora)
  idOperadora: Operadora;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
