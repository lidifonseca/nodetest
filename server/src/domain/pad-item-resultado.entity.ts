/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import PadItem from './pad-item.entity';

/**
 * A PadItemResultado.
 */
@Entity('tb_pad_item_resultado')
export default class PadItemResultado extends BaseEntity {
  @Column({ name: 'RESULTADO' })
  resultado: string;

  @Column({ type: 'date', name: 'DATA_FIM' })
  dataFim: any;

  @Column({ type: 'boolean', name: 'RESULTADO_ANALISADO' })
  resultadoAnalisado: boolean;

  @Column({ type: 'integer', name: 'USUARIO_ID' })
  usuarioId: number;

  @ManyToOne(type => PadItem)
  @JoinColumn({ name: 'ID_PAD_ITEM', referencedColumnName: 'id' })
  padItem: PadItem;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
