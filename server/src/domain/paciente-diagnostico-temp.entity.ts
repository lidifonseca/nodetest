/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { validate, Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, Min, Max } from 'class-validator';

/**
 * A PacienteDiagnosticoTemp.
 */
@Entity('paciente_diagnostico_temp')
export default class PacienteDiagnosticoTemp extends BaseEntity {
  @Column({ type: 'integer', name: 'id_cid' })
  idCid: number;

  @Column({ type: 'boolean', name: 'cid_primario' })
  cidPrimario: boolean;

  @Column({ name: 'complexidade', length: 45 })
  complexidade: string;

  @Column({ type: 'date', name: 'created_at' })
  createdAt: any;

  @Column({ name: 'session_id', length: 255 })
  sessionId: string;

  @Column({ name: 'observacao', length: 245 })
  observacao: string;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
