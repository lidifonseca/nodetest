/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { validate, Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, Min, Max } from 'class-validator';

import Paciente from './paciente.entity';
import Cid from './cid.entity';

/**
 * A PacienteDiagnostico.
 */
@Entity('paciente_diagnostico')
export default class PacienteDiagnostico extends BaseEntity {
  @Column({ name: 'observacao', length: 255 })
  observacao: string;

  @Column({ type: 'integer', name: 'ativo' })
  ativo: number;

  @Column({ type: 'timestamp', name: 'data_post', nullable: false })
  dataPost: any;

  @Column({ type: 'boolean', name: 'cid_primario' })
  cidPrimario: boolean;

  @Column({ name: 'complexidade', length: 80 })
  complexidade: string;

  @Column({ type: 'boolean', name: 'cid_com_alta' })
  cidComAlta: boolean;

  @ManyToOne(type => Paciente)
  idPaciente: Paciente;

  @ManyToOne(type => Cid)
  idCid: Cid;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
