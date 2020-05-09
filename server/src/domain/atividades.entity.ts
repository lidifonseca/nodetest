/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { validate, Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, Min, Max } from 'class-validator';

/**
 * A Atividades.
 */
@Entity('tb_atividades')
export default class Atividades extends BaseEntity {
  @Column({ name: 'ATIVIDADE', length: 100 })
  atividade: string;

  @Column({ type: 'boolean', name: 'ATIVO' })
  ativo: boolean;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
