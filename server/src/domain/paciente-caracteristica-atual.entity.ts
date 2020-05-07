/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { validate, Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, Min, Max } from 'class-validator';

/**
 * A PacienteCaracteristicaAtual.
 */
@Entity('tb_paciente_caracteristica_atual')
export default class PacienteCaracteristicaAtual extends BaseEntity {
  @Column({ type: 'integer', name: 'ID_PACIENTE', nullable: false })
  idPaciente: number;

  @Column({ type: 'integer', name: 'ID_PACIENTE_CARACTERISTICA', nullable: false })
  idPacienteCaracteristica: number;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
