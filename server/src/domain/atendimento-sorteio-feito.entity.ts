/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { validate, Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, Min, Max } from 'class-validator';

import PadItem from './pad-item.entity';

/**
 * A AtendimentoSorteioFeito.
 */
@Entity('atendimento_sorteio_feito')
export default class AtendimentoSorteioFeito extends BaseEntity {
  @Column({ type: 'integer', name: 'sorteio_feito', nullable: false })
  sorteioFeito: number;

  @Column({ type: 'timestamp', name: 'data_post', nullable: false })
  dataPost: any;

  @ManyToOne(type => PadItem)
  idPadItem: PadItem;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
