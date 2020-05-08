/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { validate, Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, Min, Max } from 'class-validator';

import ProfissionalStatusAtual from './profissional-status-atual.entity';

/**
 * A StatusAtualProf.
 */
@Entity('tb_status_atual_prof')
export default class StatusAtualProf extends BaseEntity {
  @Column({ name: 'STATUS_ATUAL_PROF', length: 50 })
  statusAtualProf: string;

  @Column({ name: 'STYLE_LABEL', length: 40 })
  styleLabel: string;

  @OneToMany(
    type => ProfissionalStatusAtual,
    other => other.statusAtualProf
  )
  profissionalStatusAtuals: ProfissionalStatusAtual[];

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
