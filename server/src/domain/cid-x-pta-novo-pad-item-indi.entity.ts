/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { validate, Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, Min, Max } from 'class-validator';

import AlertasIndicadores from './alertas-indicadores.entity';
import PadItemIndicadores from './pad-item-indicadores.entity';
import Categoria from './categoria.entity';
import CidXPtaNovo from './cid-x-pta-novo.entity';

/**
 * A CidXPtaNovoPadItemIndi.
 */
@Entity('cid_x_pta_novo_pad_item_indi')
export default class CidXPtaNovoPadItemIndi extends BaseEntity {
  @Column({ name: 'meta', length: 145 })
  meta: string;

  @Column({ name: 'maximo', length: 145 })
  maximo: string;

  @Column({ name: 'minimo', length: 145 })
  minimo: string;

  @Column({ name: 'unidade_medida_extra', length: 145 })
  unidadeMedidaExtra: string;

  @Column({ type: 'integer', name: 'unidade_medida_id' })
  unidadeMedidaId: number;

  @Column({ type: 'double', name: 'score' })
  score: number;

  @OneToMany(
    type => AlertasIndicadores,
    other => other.padItemIndicadoresId
  )
  alertasIndicadores: AlertasIndicadores[];

  @ManyToOne(type => PadItemIndicadores)
  padItemIndicadoresId: PadItemIndicadores;

  @ManyToOne(type => Categoria)
  categoriasId: Categoria;

  @ManyToOne(type => CidXPtaNovo)
  cidXPtaNovoId: CidXPtaNovo;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
