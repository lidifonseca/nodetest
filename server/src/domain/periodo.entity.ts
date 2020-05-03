/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { validate, Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, Min, Max } from 'class-validator';

import Atendimento from './atendimento.entity';
import PadItem from './pad-item.entity';

/**
 * A Periodo.
 */
@Entity('periodo')
export default class Periodo extends BaseEntity {
  @Column({ name: 'periodo', length: 40 })
  periodo: string;

  @Column({ type: 'integer', name: 'ativo' })
  ativo: number;

  @Column({ type: 'timestamp', name: 'data_post', nullable: false })
  dataPost: any;

  @OneToMany(
    type => Atendimento,
    other => other.idPeriodo
  )
  atendimentos: Atendimento[];

  @OneToMany(
    type => PadItem,
    other => other.idPeriodo
  )
  padItems: PadItem[];

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
