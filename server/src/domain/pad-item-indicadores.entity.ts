/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { validate, Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, Min, Max } from 'class-validator';

/**
 * A PadItemIndicadores.
 */
@Entity('tb_pad_item_indicadores')
export default class PadItemIndicadores extends BaseEntity {
  @Column({ type: 'integer', name: 'ID_UNIDADE_MEDIDA' })
  idUnidadeMedida: number;

  @Column({ name: 'TITULO', length: 45, nullable: false })
  titulo: string;

  @Column({ name: 'DESCRICAO' })
  descricao: string;

  @Column({ type: 'integer', name: 'META' })
  meta: number;

  @Column({ type: 'integer', name: 'MAXIMO_ST' })
  maximoSt: number;

  @Column({ type: 'integer', name: 'MINIMO_ST' })
  minimoSt: number;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
