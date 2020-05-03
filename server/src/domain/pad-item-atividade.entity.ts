/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import CategoriaAtividade from './categoria-atividade.entity';
import PadItem from './pad-item.entity';

/**
 * A PadItemAtividade.
 */
@Entity('pad_item_atividade')
export default class PadItemAtividade extends BaseEntity {
  @Column({ type: 'date', name: 'data_inicio' })
  dataInicio: any;

  @Column({ type: 'date', name: 'data_fim' })
  dataFim: any;

  @ManyToOne(type => CategoriaAtividade)
  idAtividade: CategoriaAtividade;

  @ManyToOne(type => PadItem)
  idPadItem: PadItem;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
