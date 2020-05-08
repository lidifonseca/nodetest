/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { validate, Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, Min, Max } from 'class-validator';

import CidXPtaNovo from './cid-x-pta-novo.entity';
import PacienteDiagnostico from './paciente-diagnostico.entity';
import PadCid from './pad-cid.entity';

/**
 * A Cid.
 */
@Entity('tb_cid')
export default class Cid extends BaseEntity {
  @Column({ name: 'CODIGO', length: 10 })
  codigo: string;

  @Column({ name: 'DIAGNOSTICO', length: 400 })
  diagnostico: string;

  @Column({ name: 'GR', length: 20 })
  gr: string;

  @Column({ name: 'TEMP', length: 20 })
  temp: string;

  @Column({ name: 'APELIDO', length: 30 })
  apelido: string;

  @OneToMany(
    type => CidXPtaNovo,
    other => other.cid
  )
  cidXPtaNovos: CidXPtaNovo[];

  @OneToMany(
    type => PacienteDiagnostico,
    other => other.c
  )
  pacienteDiagnosticos: PacienteDiagnostico[];

  @OneToMany(
    type => PadCid,
    other => other.cid
  )
  padCids: PadCid[];

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
