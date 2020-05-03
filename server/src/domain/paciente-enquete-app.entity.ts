/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import Paciente from './paciente.entity';

/**
 * A PacienteEnqueteApp.
 */
@Entity('paciente_enquete_app')
export default class PacienteEnqueteApp extends BaseEntity {
  @Column({ type: 'integer', name: 'votacao' })
  votacao: number;

  @ManyToOne(type => Paciente)
  idPaciente: Paciente;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
