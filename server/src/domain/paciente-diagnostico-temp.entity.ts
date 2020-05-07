/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { validate, Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, Min, Max } from 'class-validator';

/**
 * A PacienteDiagnosticoTemp.
 */
@Entity('tb_paciente_diagnostico_temp')
export default class PacienteDiagnosticoTemp extends BaseEntity {
  @Column({ type: 'integer', name: 'ID_CID' })
  idCid: number;

  @Column({ type: 'boolean', name: 'CID_PRIMARIO' })
  cidPrimario: boolean;

  @Column({ name: 'COMPLEXIDADE', length: 45 })
  complexidade: string;

  @Column({ type: 'date', name: 'CREATED_AT' })
  createdAt: any;

  @Column({ name: 'SESSION_ID', length: 255 })
  sessionId: string;

  @Column({ name: 'OBSERVACAO', length: 245 })
  observacao: string;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
