/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { validate, Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, Min, Max } from 'class-validator';

/**
 * A TempoExperiencia.
 */
@Entity('tempo_experiencia')
export default class TempoExperiencia extends BaseEntity {
  @Column({ name: 'tempo_experiencia', length: 60 })
  tempoExperiencia: string;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
