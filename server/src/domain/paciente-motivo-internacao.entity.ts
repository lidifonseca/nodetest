/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { validate, Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, Min, Max } from 'class-validator';

/**
 * A PacienteMotivoInternacao.
 */
@Entity('tb_paciente_motivo_internacao')
export default class PacienteMotivoInternacao extends BaseEntity {
  @Column({ type: 'integer', name: 'ID_PACIENTE', nullable: false })
  idPaciente: number;

  @Column({ type: 'integer', name: 'ID_MOTIVO_INTERNACAO', nullable: false })
  idMotivoInternacao: number;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
