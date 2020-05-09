/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { validate, Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, Min, Max } from 'class-validator';

/**
 * A TipoExame.
 */
@Entity('tb_tipo_exame')
export default class TipoExame extends BaseEntity {
  @Column({ name: 'EXAME', length: 45, nullable: false })
  exame: string;

  @Column({ type: 'integer', name: 'ID_PAI' })
  idPai: number;

  @Column({ type: 'boolean', name: 'ATIVO', nullable: false })
  ativo: boolean;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
