/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { validate, Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, Min, Max } from 'class-validator';

/**
 * A LogPacAcesso.
 */
@Entity('log_pac_acesso')
export default class LogPacAcesso extends BaseEntity {
  @Column({ type: 'integer', name: 'id_paciente', nullable: false })
  idPaciente: number;

  @Column({ name: 'profissional', length: 255 })
  profissional: string;

  @Column({ name: 'token', length: 200 })
  token: string;

  @Column({ name: 'ip_local', length: 25 })
  ipLocal: string;

  @Column({ name: 'infor_acesso', length: 255 })
  inforAcesso: string;

  @Column({ type: 'timestamp', name: 'data_post', nullable: false })
  dataPost: any;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
