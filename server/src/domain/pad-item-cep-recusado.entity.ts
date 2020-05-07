/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { validate, Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, Min, Max } from 'class-validator';

/**
 * A PadItemCepRecusado.
 */
@Entity('tb_pad_item_cep_recusado')
export default class PadItemCepRecusado extends BaseEntity {
  @Column({ name: 'CEP', length: 10, nullable: false })
  cep: string;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
