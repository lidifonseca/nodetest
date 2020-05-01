/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { validate, Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, Min, Max } from 'class-validator';

import Processo from './processo.entity';

/**
 * @formTab primeiro<motivo>@@\n@formTab segundo<processo,apensamento>@@\n@layout processo<top;6>, apensamento<top;6>@@
 */
@Entity('apenso')
export default class Apenso extends BaseEntity {
  /**
   * @formTab primeiro@@
   */
  @Column({ name: 'numero', nullable: false })
  numero: string;

  /**
   * @formTab segundo@@\nOtro info
   */
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
