/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { validate, Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, Min, Max } from 'class-validator';

/**
 * A ApiName.
 */
@Entity('api_name')
export default class ApiName extends BaseEntity {
  @Column({ name: 'api_name', length: 100 })
  apiName: string;

  @Column({ name: 'api_receiver', length: 60 })
  apiReceiver: string;

  @Column({ name: 'api_obs', length: 255 })
  apiObs: string;

  @Column({ type: 'integer', name: 'ativo' })
  ativo: number;

  @Column({ type: 'timestamp', name: 'data_post', nullable: false })
  dataPost: any;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
