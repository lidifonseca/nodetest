/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { validate, Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, Min, Max } from 'class-validator';

/**
 * A PacienteCaracteristicaAtual.
 */
@Entity('paciente_caracteristica_atual')
export default class PacienteCaracteristicaAtual extends BaseEntity {
  @Column({ type: 'integer', name: 'id_paciente', nullable: false })
  idPaciente: number;

  @Column({ type: 'integer', name: 'id_paciente_caracteristica', nullable: false })
  idPacienteCaracteristica: number;

  @Column({ type: 'integer', name: 'id_usuario', nullable: false })
  idUsuario: number;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
