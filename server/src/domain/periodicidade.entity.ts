/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { validate, Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, Min, Max } from 'class-validator';

import PadItem from './pad-item.entity';

/**
 * A Periodicidade.
 */
@Entity('periodicidade')
export default class Periodicidade extends BaseEntity {
  @Column({ name: 'periodicidade', length: 40 })
  periodicidade: string;

  @Column({ type: 'integer', name: 'ativo' })
  ativo: number;

  @Column({ type: 'timestamp', name: 'data_post', nullable: false })
  dataPost: any;

  @OneToMany(
    type => PadItem,
    other => other.idPeriodicidade
  )
  padItems: PadItem[];

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
