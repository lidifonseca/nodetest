/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { validate, Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, Min, Max } from 'class-validator';

import Usuario from './usuario.entity';
import Paciente from './paciente.entity';

/**
 * A Diario.
 */
@Entity('diario')
export default class Diario extends BaseEntity {
  @Column({ name: 'historico', length: 255 })
  historico: string;

  @Column({ type: 'integer', name: 'gerar_pdf' })
  gerarPdf: number;

  @Column({ type: 'timestamp', name: 'data_post', nullable: false })
  dataPost: any;

  @ManyToOne(type => Usuario)
  idUsuario: Usuario;

  @ManyToOne(type => Paciente)
  idPaciente: Paciente;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
