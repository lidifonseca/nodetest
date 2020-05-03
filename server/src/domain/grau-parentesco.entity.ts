/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { validate, Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, Min, Max } from 'class-validator';

/**
 * A GrauParentesco.
 */
@Entity('grau_parentesco')
export default class GrauParentesco extends BaseEntity {
  @Column({ name: 'grau_parentesco', length: 60 })
  grauParentesco: string;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
