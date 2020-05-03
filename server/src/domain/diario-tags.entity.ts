/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { validate, Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, Min, Max } from 'class-validator';

/**
 * A DiarioTags.
 */
@Entity('diario_tags')
export default class DiarioTags extends BaseEntity {
  @Column({ name: 'nome', length: 45, nullable: false })
  nome: string;

  @Column({ type: 'integer', name: 'id_pai' })
  idPai: number;

  @Column({ name: 'nome_id', length: 45 })
  nomeId: string;

  @Column({ type: 'integer', name: 'ativo' })
  ativo: number;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
