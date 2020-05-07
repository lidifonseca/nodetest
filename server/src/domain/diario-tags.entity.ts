/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { validate, Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, Min, Max } from 'class-validator';

/**
 * A DiarioTags.
 */
@Entity('tb_diario_tags')
export default class DiarioTags extends BaseEntity {
  @Column({ name: 'NOME', length: 45, nullable: false })
  nome: string;

  @Column({ type: 'integer', name: 'ID_PAI' })
  idPai: number;

  @Column({ name: 'NOME_ID', length: 45 })
  nomeId: string;

  @Column({ type: 'integer', name: 'ATIVO' })
  ativo: number;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
