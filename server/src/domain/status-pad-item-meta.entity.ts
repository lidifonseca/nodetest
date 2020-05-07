/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { validate, Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, Min, Max } from 'class-validator';

/**
 * A StatusPadItemMeta.
 */
@Entity('tb_status_pad_item_meta')
export default class StatusPadItemMeta extends BaseEntity {
  @Column({ name: 'STATUS_ITEM_META', length: 200 })
  statusItemMeta: string;

  @Column({ name: 'STYLE_LABEL', length: 40 })
  styleLabel: string;

  @Column({ type: 'integer', name: 'ORDENACAO' })
  ordenacao: number;

  @Column({ type: 'integer', name: 'ATIVO' })
  ativo: number;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
