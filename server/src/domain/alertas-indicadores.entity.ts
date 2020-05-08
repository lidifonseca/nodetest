/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { validate, Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, Min, Max } from 'class-validator';

import CidXPtaNovoPadItemIndi from './cid-x-pta-novo-pad-item-indi.entity';

/**
 * A AlertasIndicadores.
 */
@Entity('tb_alertas_indicadores')
export default class AlertasIndicadores extends BaseEntity {
  @Column({ type: 'double', name: 'PONTUACAO' })
  pontuacao: number;

  @Column({ type: 'boolean', name: 'ALTERACAO_ESPERADA' })
  alteracaoEsperada: boolean;

  @Column({ name: 'OBSERVACOES', length: 255 })
  observacoes: string;

  @Column({ type: 'integer', name: 'USUARIO_ID' })
  usuarioId: number;

  @ManyToOne(type => CidXPtaNovoPadItemIndi)
  @JoinColumn({ name: 'ID_PAD_ITEM_INDICADORES', referencedColumnName: 'id' })
  padItemIndicadores: CidXPtaNovoPadItemIndi;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
