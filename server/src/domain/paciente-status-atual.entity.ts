/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { validate, Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, Min, Max } from 'class-validator';

import Paciente from './paciente.entity';
import StatusAtual from './status-atual.entity';

/**
 * A PacienteStatusAtual.
 */
@Entity('paciente_status_atual')
export default class PacienteStatusAtual extends BaseEntity {
  @Column({ type: 'date', name: 'data_status' })
  dataStatus: any;

  @Column({ name: 'observacao', length: 65535 })
  observacao: string;

  @Column({ type: 'integer', name: 'ativo' })
  ativo: number;

  @Column({ name: 'id_usuario', nullable: false })
  idUsuario: string;

  @ManyToOne(type => Paciente)
  paciente: Paciente;

  @ManyToOne(type => StatusAtual)
  status: StatusAtual;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
