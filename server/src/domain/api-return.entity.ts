/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { validate, Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, Min, Max } from 'class-validator';

/**
 * A ApiReturn.
 */
@Entity('api_return')
export default class ApiReturn extends BaseEntity {
  @Column({ type: 'integer', name: 'id_api_name' })
  idApiName: number;

  @Column({ name: 'api_return', length: 100 })
  apiReturn: string;

  @Column({ name: 'api_type', length: 50 })
  apiType: string;

  @Column({ name: 'obs', length: 255 })
  obs: string;

  @Column({ type: 'integer', name: 'ativo' })
  ativo: number;

  @Column({ type: 'timestamp', name: 'data_post', nullable: false })
  dataPost: any;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
