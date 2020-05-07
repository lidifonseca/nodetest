/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { validate, Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, Min, Max } from 'class-validator';

/**
 * A TokenUsuario.
 */
@Entity('tb_token_usuario')
export default class TokenUsuario extends BaseEntity {
  @Column({ type: 'integer', name: 'ID_PACIENTE', nullable: false })
  idPaciente: number;

  @Column({ name: 'TOKEN', length: 200 })
  token: string;

  @Column({ type: 'timestamp', name: 'DATA_VALIDA' })
  dataValida: any;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
