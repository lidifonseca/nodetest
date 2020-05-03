/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { validate, Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, Min, Max } from 'class-validator';

import Indicadores from './indicadores.entity';

/**
 * A IndicadoresValores.
 */
@Entity('indicadores_valores')
export default class IndicadoresValores extends BaseEntity {
  @Column({ name: 'sexo', length: 45 })
  sexo: string;

  @Column({ name: 'vl_minimo', length: 45 })
  vlMinimo: string;

  @Column({ name: 'vl_maximo', length: 45 })
  vlMaximo: string;

  @Column({ name: 'unidade_medida', length: 45 })
  unidadeMedida: string;

  @Column({ name: 'idade_minima', length: 45 })
  idadeMinima: string;

  @Column({ name: 'idade_maxima', length: 45 })
  idadeMaxima: string;

  @ManyToOne(type => Indicadores)
  indicadoresId: Indicadores;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
