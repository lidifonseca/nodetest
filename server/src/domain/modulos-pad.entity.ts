/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { validate, Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, Min, Max } from 'class-validator';

/**
 * A ModulosPad.
 */
@Entity('modulos_pad')
export default class ModulosPad extends BaseEntity {
  @Column({ name: 'nome_modulo', length: 45 })
  nomeModulo: string;

  @Column({ name: 'ativo', length: 1 })
  ativo: string;

  @Column({ type: 'date', name: 'data_post' })
  dataPost: any;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
