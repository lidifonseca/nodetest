/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { validate, Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, Min, Max } from 'class-validator';

/**
 * A PacienteDiagnostico.
 */
@Entity('tb_paciente_diagnostico')
export default class PacienteDiagnostico extends BaseEntity {
  @Column({ name: 'OBSERVACAO', length: 255 })
  observacao: string;

  @Column({ type: 'integer', name: 'ATIVO' })
  ativo: number;

  @Column({ type: 'boolean', name: 'CID_PRIMARIO' })
  cidPrimario: boolean;

  @Column({ name: 'COMPLEXIDADE', length: 80 })
  complexidade: string;

  @Column({ type: 'boolean', name: 'CID_COM_ALTA' })
  cidComAlta: boolean;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
