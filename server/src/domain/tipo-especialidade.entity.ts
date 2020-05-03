/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { validate, Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, Min, Max } from 'class-validator';

import Especialidade from './especialidade.entity';

/**
 * A TipoEspecialidade.
 */
@Entity('tipo_especialidade')
export default class TipoEspecialidade extends BaseEntity {
  @Column({ name: 'tipo_especialidade', length: 30 })
  tipoEspecialidade: string;

  @OneToMany(
    type => Especialidade,
    other => other.idTipoEspecialidade
  )
  especialidades: Especialidade[];

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
