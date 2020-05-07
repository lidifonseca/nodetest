/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { validate, Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, Min, Max } from 'class-validator';

/**
 * A TipoEspecialidade.
 */
@Entity('tb_tipo_especialidade')
export default class TipoEspecialidade extends BaseEntity {
  @Column({ name: 'TIPO_ESPECIALIDADE', length: 30 })
  tipoEspecialidade: string;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
