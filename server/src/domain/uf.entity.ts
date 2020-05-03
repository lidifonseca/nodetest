/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { validate, Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, Min, Max } from 'class-validator';

import Cidade from './cidade.entity';

/**
 * A Uf.
 */
@Entity('uf')
export default class Uf extends BaseEntity {
  @Column({ name: 'sigla_uf', length: 4 })
  siglaUf: string;

  @Column({ name: 'descr_uf', length: 255 })
  descrUf: string;

  @Column({ type: 'timestamp', name: 'data_post', nullable: false })
  dataPost: any;

  @OneToMany(
    type => Cidade,
    other => other.idUf
  )
  cidades: Cidade[];

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
