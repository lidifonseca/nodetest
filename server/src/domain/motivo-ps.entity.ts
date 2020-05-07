/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { validate, Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, Min, Max } from 'class-validator';

/**
 * A MotivoPs.
 */
@Entity('tb_motivo_ps')
export default class MotivoPs extends BaseEntity {
  @Column({ name: 'NOME', length: 255 })
  nome: string;

  @Column({ type: 'integer', name: 'ID_PAI' })
  idPai: number;

  @Column({ type: 'integer', name: 'ATIVO' })
  ativo: number;

  @Column({ name: 'CLASSE', length: 40 })
  classe: string;

  @Column({ name: 'NAME', length: 20 })
  name: string;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
