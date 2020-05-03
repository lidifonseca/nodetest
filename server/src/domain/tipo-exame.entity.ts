/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { validate, Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, Min, Max } from 'class-validator';

/**
 * A TipoExame.
 */
@Entity('tipo_exame')
export default class TipoExame extends BaseEntity {
  @Column({ name: 'exame', length: 45, nullable: false })
  exame: string;

  @Column({ type: 'integer', name: 'id_pai' })
  idPai: number;

  @Column({ type: 'integer', name: 'ativo', nullable: false })
  ativo: number;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
