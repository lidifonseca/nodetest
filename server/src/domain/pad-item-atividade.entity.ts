/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import CategoriaAtividade from './categoria-atividade.entity';
import PadItem from './pad-item.entity';

/**
 * A PadItemAtividade.
 */
@Entity('tb_pad_item_atividade')
export default class PadItemAtividade extends BaseEntity {
  @Column({ type: 'date', name: 'DATA_INICIO' })
  dataInicio: any;

  @Column({ type: 'date', name: 'DATA_FIM' })
  dataFim: any;

  @ManyToOne(type => CategoriaAtividade)
  @JoinColumn({ name: 'ID_ATIVIDADE', referencedColumnName: 'id' })
  atividade: CategoriaAtividade;

  @ManyToOne(type => PadItem)
  @JoinColumn({ name: 'ID_PAD_ITEM', referencedColumnName: 'id' })
  padItem: PadItem;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
