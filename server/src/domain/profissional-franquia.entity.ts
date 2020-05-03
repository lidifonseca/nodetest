/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { validate, Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, Min, Max } from 'class-validator';

/**
 * A ProfissionalFranquia.
 */
@Entity('profissional_franquia')
export default class ProfissionalFranquia extends BaseEntity {
  @Column({ name: 'id_profissional', nullable: false })
  idProfissional: string;

  @Column({ name: 'id_franquia', nullable: false })
  idFranquia: string;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
