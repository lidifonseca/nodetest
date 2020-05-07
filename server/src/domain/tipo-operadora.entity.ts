/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { validate, Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, Min, Max } from 'class-validator';

/**
 * A TipoOperadora.
 */
@Entity('tb_tipo_operadora')
export default class TipoOperadora extends BaseEntity {
  @Column({ name: 'TIPO', length: 50 })
  tipo: string;

  @Column({ name: 'ATIVO', length: 1 })
  ativo: string;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
