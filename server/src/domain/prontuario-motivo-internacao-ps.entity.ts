/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { validate, Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, Min, Max } from 'class-validator';

/**
 * A ProntuarioMotivoInternacaoPs.
 */
@Entity('prontuario_motivo_internacao_ps')
export default class ProntuarioMotivoInternacaoPs extends BaseEntity {
  @Column({ type: 'integer', name: 'id_prontuario', nullable: false })
  idProntuario: number;

  @Column({ type: 'integer', name: 'id_paciente', nullable: false })
  idPaciente: number;

  @Column({ type: 'integer', name: 'id_motivo', nullable: false })
  idMotivo: number;

  @Column({ type: 'integer', name: 'id_usuario', nullable: false })
  idUsuario: number;

  @Column({ type: 'timestamp', name: 'data_post' })
  dataPost: any;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
