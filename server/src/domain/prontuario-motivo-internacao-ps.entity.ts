/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { validate, Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, Min, Max } from 'class-validator';

/**
 * A ProntuarioMotivoInternacaoPs.
 */
@Entity('tb_prontuario_motivo_internacao_ps')
export default class ProntuarioMotivoInternacaoPs extends BaseEntity {
  @Column({ type: 'integer', name: 'ID_PRONTUARIO', nullable: false })
  idProntuario: number;

  @Column({ type: 'integer', name: 'ID_PACIENTE', nullable: false })
  idPaciente: number;

  @Column({ type: 'integer', name: 'ID_MOTIVO', nullable: false })
  idMotivo: number;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
