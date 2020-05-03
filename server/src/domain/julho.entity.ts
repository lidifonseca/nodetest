/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { validate, Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, Min, Max } from 'class-validator';

/**
 * A Julho.
 */
@Entity('julho')
export default class Julho extends BaseEntity {
  @Column({ name: 'data_inicio', length: 10 })
  dataInicio: string;

  @Column({ name: 'data_fim', length: 10 })
  dataFim: string;

  @Column({ type: 'integer', name: 'especialidade' })
  especialidade: number;

  @Column({ type: 'integer', name: 'periodicidade' })
  periodicidade: number;

  @Column({ type: 'integer', name: 'periodo' })
  periodo: number;

  @Column({ type: 'integer', name: 'qtd' })
  qtd: number;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
