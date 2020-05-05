/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { validate, Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, Min, Max } from 'class-validator';

import PadItem from './pad-item.entity';

/**
 * A PadItemResultado.
 */
@Entity('pad_item_resultado')
export default class PadItemResultado extends BaseEntity {
  @Column({ name: 'resultado', length: 65535 })
  resultado: string;

  @Column({ type: 'date', name: 'data_fim' })
  dataFim: any;

  @Column({ type: 'boolean', name: 'resultado_analisado' })
  resultadoAnalisado: boolean;

  @Column({ type: 'integer', name: 'usuario_id' })
  usuarioId: number;

  @ManyToOne(type => PadItem)
  idPadItem: PadItem;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
