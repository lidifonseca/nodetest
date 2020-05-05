/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { validate, Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, Min, Max } from 'class-validator';

import CidXPtaNovoPadItemIndi from './cid-x-pta-novo-pad-item-indi.entity';

/**
 * A PadItemIndicadores.
 */
@Entity('pad_item_indicadores')
export default class PadItemIndicadores extends BaseEntity {
  @Column({ type: 'integer', name: 'id_unidade_medida' })
  idUnidadeMedida: number;

  @Column({ name: 'titulo', length: 45, nullable: false })
  titulo: string;

  @Column({ name: 'descricao', length: 65535 })
  descricao: string;

  @Column({ type: 'integer', name: 'meta' })
  meta: number;

  @Column({ type: 'integer', name: 'maximo_st' })
  maximoSt: number;

  @Column({ type: 'integer', name: 'minimo_st' })
  minimoSt: number;

  @OneToMany(
    type => CidXPtaNovoPadItemIndi,
    other => other.padItemIndicadoresId
  )
  cidXPtaNovoPadItemIndis: CidXPtaNovoPadItemIndi[];

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
