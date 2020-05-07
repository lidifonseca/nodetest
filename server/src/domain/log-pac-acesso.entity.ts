/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { validate, Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, Min, Max } from 'class-validator';

/**
 * A LogPacAcesso.
 */
@Entity('tb_log_pac_acesso')
export default class LogPacAcesso extends BaseEntity {
  @Column({ type: 'integer', name: 'ID_PACIENTE', nullable: false })
  idPaciente: number;

  @Column({ name: 'PROFISSIONAL', length: 255 })
  profissional: string;

  @Column({ name: 'TOKEN', length: 200 })
  token: string;

  @Column({ name: 'IP_LOCAL', length: 25 })
  ipLocal: string;

  @Column({ name: 'INFOR_ACESSO' })
  inforAcesso: string;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
