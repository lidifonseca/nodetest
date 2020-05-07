/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { validate, Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, Min, Max } from 'class-validator';

/**
 * A PadItem.
 */
@Entity('tb_pad_item')
export default class PadItem extends BaseEntity {
  @Column({ name: 'ID_PEDIDO' })
  idPedido: string;

  @Column({ type: 'date', name: 'DATA_INICIO' })
  dataInicio: any;

  @Column({ type: 'date', name: 'DATA_FIM' })
  dataFim: any;

  @Column({ type: 'integer', name: 'QTD_SESSOES' })
  qtdSessoes: number;

  @Column({ name: 'OBSERVACAO' })
  observacao: string;

  @Column({ type: 'integer', name: 'SUB' })
  sub: number;

  @Column({ type: 'integer', name: 'ATIVO' })
  ativo: number;

  @Column({ type: 'timestamp', name: 'DATA_PAD_ITEM_INCOMPLETO' })
  dataPadItemIncompleto: any;

  @Column({ type: 'timestamp', name: 'DATA_PAD_ITEM_COMPLETO' })
  dataPadItemCompleto: any;

  @Column({ name: 'NUM_GHC', length: 40 })
  numGhc: string;

  @Column({ type: 'integer', name: 'CID_X_PTA_NOVO' })
  cidXPtaNovo: number;

  @Column({ type: 'integer', name: 'CATEGORIA_ID' })
  categoriaId: number;

  @Column({ type: 'double', name: 'SCORE' })
  score: number;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
