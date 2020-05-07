/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { validate, Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, Min, Max } from 'class-validator';

/**
 * A IndicadoresValores.
 */
@Entity('tb_indicadores_valores')
export default class IndicadoresValores extends BaseEntity {
  @Column({ name: 'SEXO', length: 45 })
  sexo: string;

  @Column({ name: 'VL_MINIMO', length: 45 })
  vlMinimo: string;

  @Column({ name: 'VL_MAXIMO', length: 45 })
  vlMaximo: string;

  @Column({ name: 'UNIDADE_MEDIDA', length: 45 })
  unidadeMedida: string;

  @Column({ name: 'IDADE_MINIMA', length: 45 })
  idadeMinima: string;

  @Column({ name: 'IDADE_MAXIMA', length: 45 })
  idadeMaxima: string;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
