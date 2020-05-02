/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { validate, Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, Min, Max } from 'class-validator';

import Paciente from './paciente.entity';

/**
 * A Cidade.
 */
@Entity('cidade')
export default class Cidade extends BaseEntity {
  @Column({ name: 'descr_cidade', length: 255 })
  descrCidade: string;

  @Column({ type: 'timestamp', name: 'data_post', nullable: false })
  dataPost: any;

  @OneToMany(
    type => Paciente,
    other => other.cidade
  )
  pacientes: Paciente[];

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
