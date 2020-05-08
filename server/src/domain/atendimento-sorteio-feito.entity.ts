/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { validate, Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, Min, Max } from 'class-validator';

import PadItem from './pad-item.entity';

/**
 * A AtendimentoSorteioFeito.
 */
@Entity('tb_atendimento_sorteio_feito')
export default class AtendimentoSorteioFeito extends BaseEntity {
  @Column({ type: 'integer', name: 'SORTEIO_FEITO', nullable: false })
  sorteioFeito: number;

  @ManyToOne(type => PadItem)
  @JoinColumn({ name: 'ID_PAD_ITEM', referencedColumnName: 'id' })
  padItem: PadItem;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
