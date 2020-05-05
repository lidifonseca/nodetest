/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { validate, Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, Min, Max } from 'class-validator';

/**
 * A TermosUso.
 */
@Entity('termos_uso')
export default class TermosUso extends BaseEntity {
  @Column({ name: 'termos_uso', length: 65535 })
  termosUso: string;

  @Column({ type: 'integer', name: 'tipo' })
  tipo: number;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
