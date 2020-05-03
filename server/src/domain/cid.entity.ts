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
@Entity('cid')
export default class Cid extends BaseEntity {
  @Column({ name: 'codigo', length: 10 })
  codigo: string;

  @Column({ name: 'diagnostico', length: 400 })
  diagnostico: string;

  @Column({ name: 'gr', length: 20 })
  gr: string;

  @Column({ name: 'temp', length: 20 })
  temp: string;

  @Column({ name: 'apelido', length: 30 })
  apelido: string;

  @OneToMany(
    type => CidXPtaNovo,
    other => other.cidId
  )
  cidXPtaNovos: CidXPtaNovo[];

  @OneToMany(
    type => PacienteDiagnostico,
    other => other.idCid
  )
  pacienteDiagnosticos: PacienteDiagnostico[];

  @OneToMany(
    type => PadCid,
    other => other.idCid
  )
  padCids: PadCid[];

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
