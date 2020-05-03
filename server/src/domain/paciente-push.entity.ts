/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { validate, Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, Min, Max } from 'class-validator';

import Paciente from './paciente.entity';

/**
 * A PacientePush.
 */
@Entity('paciente_push')
export default class PacientePush extends BaseEntity {
  @Column({ name: 'id_franquia' })
  idFranquia: string;

  @Column({ name: 'mensagem', length: 255 })
  mensagem: string;

  @Column({ type: 'integer', name: 'ativo' })
  ativo: number;

  @ManyToOne(type => Paciente)
  idPaciente: Paciente;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
