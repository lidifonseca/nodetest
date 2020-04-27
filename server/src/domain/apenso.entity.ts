/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { validate, Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, Min, Max } from 'class-validator';

import Processo from './processo.entity';

/**
 * A Apenso.
 */
@Entity('apenso')
export default class Apenso extends BaseEntity {
  @Column({ name: 'numero', nullable: false })
  numero: string;

  @Column({ name: 'clase' })
  clase: string;

  @Column({ type: 'date', name: 'apensamento' })
  apensamento: any;

  @Column({ name: 'motivo' })
  motivo: string;

  @ManyToOne(type => Processo)
  processo: Processo;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
