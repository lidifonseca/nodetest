/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import PadItem from './pad-item.entity';

/**
 * A PadItemResultado.
 */
@Entity('pad_item_resultado')
export default class PadItemResultado extends BaseEntity {
  @Column({ type: 'blob', name: 'resultado' })
  resultado: any;

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
