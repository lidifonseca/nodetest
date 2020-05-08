/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { validate, Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, Min, Max } from 'class-validator';

import Especialidade from './especialidade.entity';

/**
 * A TipoUnidade.
 */
@Entity('tb_tipo_unidade')
export default class TipoUnidade extends BaseEntity {
  @Column({ name: 'TIPO_UNIDADE', length: 30 })
  tipoUnidade: string;

  @OneToMany(
    type => Especialidade,
    other => other.tipoUnidade
  )
  especialidades: Especialidade[];

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
