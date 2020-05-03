/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { validate, Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, Min, Max } from 'class-validator';

/**
 * A ProfissionalCategoriaContrato.
 */
@Entity('profissional_categoria_contrato')
export default class ProfissionalCategoriaContrato extends BaseEntity {
  @Column({ name: 'id_profissional', nullable: false })
  idProfissional: string;

  @Column({ type: 'integer', name: 'id_categoria_contrato', nullable: false })
  idCategoriaContrato: number;

  @Column({ type: 'integer', name: 'aceito' })
  aceito: number;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
