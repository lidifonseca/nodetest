/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { validate, Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, Min, Max } from 'class-validator';

/**
 * A PadItemSorteioFeito.
 */
@Entity('tb_pad_item_sorteio_feito')
export default class PadItemSorteioFeito extends BaseEntity {
  @Column({ type: 'integer', name: 'SORTEIO_FEITO', nullable: false })
  sorteioFeito: number;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
