/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { validate, Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, Min, Max } from 'class-validator';

/**
 * A MotivoPs.
 */
@Entity('motivo_ps')
export default class MotivoPs extends BaseEntity {
  @Column({ name: 'nome', length: 255 })
  nome: string;

  @Column({ type: 'integer', name: 'id_pai' })
  idPai: number;

  @Column({ type: 'integer', name: 'ativo' })
  ativo: number;

  @Column({ name: 'classe', length: 40 })
  classe: string;

  @Column({ name: 'name', length: 20 })
  name: string;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
