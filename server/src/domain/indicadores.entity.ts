/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { validate, Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, Min, Max } from 'class-validator';

import IndicadoresValores from './indicadores-valores.entity';

/**
 * A Indicadores.
 */
@Entity('indicadores')
export default class Indicadores extends BaseEntity {
  @Column({ name: 'titulo', length: 145 })
  titulo: string;

  @OneToMany(
    type => IndicadoresValores,
    other => other.indicadoresId
  )
  indicadoresValores: IndicadoresValores[];

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
