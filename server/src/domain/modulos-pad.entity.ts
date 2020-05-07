/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { validate, Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, Min, Max } from 'class-validator';

/**
 * A ModulosPad.
 */
@Entity('tb_modulos_pad')
export default class ModulosPad extends BaseEntity {
  @Column({ name: 'NOME_MODULO', length: 45 })
  nomeModulo: string;

  @Column({ name: 'ATIVO', length: 1 })
  ativo: string;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
