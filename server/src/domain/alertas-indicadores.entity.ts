/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { validate, Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, Min, Max } from 'class-validator';

import CidXPtaNovoPadItemIndi from './cid-x-pta-novo-pad-item-indi.entity';

/**
 * A AlertasIndicadores.
 */
@Entity('alertas_indicadores')
export default class AlertasIndicadores extends BaseEntity {
  @Column({ type: 'double', name: 'pontuacao' })
  pontuacao: number;

  @Column({ type: 'boolean', name: 'alteracao_esperada' })
  alteracaoEsperada: boolean;

  @Column({ name: 'observacoes', length: 255 })
  observacoes: string;

  @Column({ type: 'integer', name: 'usuario_id' })
  usuarioId: number;

  @ManyToOne(type => CidXPtaNovoPadItemIndi)
  padItemIndicadoresId: CidXPtaNovoPadItemIndi;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
