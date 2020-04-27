/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import Processo from './processo.entity';

/**
 * A Movimentacao.
 */
@Entity('movimentacao')
export default class Movimentacao extends BaseEntity {
  @Column({ type: 'date', name: 'data' })
  data: any;

  @Column({ type: 'blob', name: 'movimento' })
  movimento: any;

  @ManyToOne(type => Processo)
  processo: Processo;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
