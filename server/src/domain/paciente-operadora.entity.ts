/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { validate, Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, Min, Max } from 'class-validator';

import Paciente from './paciente.entity';
import Operadora from './operadora.entity';

/**
 * A PacienteOperadora.
 */
@Entity('tb_paciente_operadora')
export default class PacienteOperadora extends BaseEntity {
  @Column({ name: 'REGISTRO', length: 100 })
  registro: string;

  @Column({ type: 'integer', name: 'ATIVO' })
  ativo: number;

  @ManyToOne(type => Paciente)
  @JoinColumn({ name: 'ID_PACIENTE', referencedColumnName: 'id' })
  paciente: Paciente;

  @ManyToOne(type => Operadora)
  @JoinColumn({ name: 'ID_OPERADORA', referencedColumnName: 'id' })
  operadora: Operadora;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
