/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { validate, Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, Min, Max } from 'class-validator';

/**
 * A CepbrBairro.
 */
@Entity('cepbr_bairro')
export default class CepbrBairro extends BaseEntity {
  @Column({ type: 'integer', name: 'id_bairro', nullable: false })
  idBairro: number;

  @Column({ name: 'bairro', length: 100 })
  bairro: string;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
