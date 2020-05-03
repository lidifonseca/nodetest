/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import Paciente from './paciente.entity';
import Usuario from './usuario.entity';

/**
 * A PacienteDiario.
 */
@Entity('paciente_diario')
export default class PacienteDiario extends BaseEntity {
  @Column({ type: 'integer', name: 'id_operadora' })
  idOperadora: number;

  @Column({ type: 'blob', name: 'historico' })
  historico: any;

  @Column({ type: 'integer', name: 'ativo' })
  ativo: number;

  @ManyToOne(type => Paciente)
  idPaciente: Paciente;

  @ManyToOne(type => Usuario)
  idUsuario: Usuario;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
