/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { validate, Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, Min, Max } from 'class-validator';

/**
 * A CidXPtaNovoPadItemIndi.
 */
@Entity('tb_cid_x_pta_novo_pad_item_indi')
export default class CidXPtaNovoPadItemIndi extends BaseEntity {
  @Column({ name: 'META', length: 145 })
  meta: string;

  @Column({ name: 'MAXIMO', length: 145 })
  maximo: string;

  @Column({ name: 'MINIMO', length: 145 })
  minimo: string;

  @Column({ name: 'UNIDADE_MEDIDA_EXTRA', length: 145 })
  unidadeMedidaExtra: string;

  @Column({ type: 'integer', name: 'UNIDADE_MEDIDA_ID' })
  unidadeMedidaId: number;

  @Column({ type: 'double', name: 'SCORE' })
  score: number;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
