/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { validate, Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, Min, Max } from 'class-validator';

/**
 * A StatusPadItemMeta.
 */
@Entity('status_pad_item_meta')
export default class StatusPadItemMeta extends BaseEntity {
  @Column({ name: 'status_item_meta', length: 200 })
  statusItemMeta: string;

  @Column({ name: 'style_label', length: 40 })
  styleLabel: string;

  @Column({ type: 'integer', name: 'ordenacao' })
  ordenacao: number;

  @Column({ type: 'integer', name: 'ativo' })
  ativo: number;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
