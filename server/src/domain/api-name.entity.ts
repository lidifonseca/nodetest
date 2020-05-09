/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { validate, Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, Min, Max } from 'class-validator';

/**
 * A ApiName.
 */
@Entity('tb_api_name')
export default class ApiName extends BaseEntity {
  @Column({ name: 'API_NAME', length: 100 })
  apiName: string;

  @Column({ name: 'API_RECEIVER', length: 60 })
  apiReceiver: string;

  @Column({ name: 'API_OBS', length: 255 })
  apiObs: string;

  @Column({ type: 'boolean', name: 'ATIVO' })
  ativo: boolean;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
