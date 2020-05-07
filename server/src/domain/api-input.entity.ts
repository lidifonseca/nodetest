/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { validate, Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, Min, Max } from 'class-validator';

/**
 * A ApiInput.
 */
@Entity('tb_api_input')
export default class ApiInput extends BaseEntity {
  @Column({ type: 'integer', name: 'ID_API_NAME' })
  idApiName: number;

  @Column({ name: 'API_INPUT', length: 100 })
  apiInput: string;

  @Column({ name: 'API_TYPE', length: 50 })
  apiType: string;

  @Column({ name: 'OBS', length: 255 })
  obs: string;

  @Column({ type: 'integer', name: 'ATIVO' })
  ativo: number;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
