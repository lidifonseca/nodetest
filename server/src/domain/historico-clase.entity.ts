/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import Processo from './processo.entity';

/**
 * A HistoricoClase.
 */
@Entity('historico_clase')
export default class HistoricoClase extends BaseEntity {
  @Column({ type: 'date', name: 'data' })
  data: any;

  @Column({ name: 'tipo' })
  tipo: string;

  @Column({ name: 'classe' })
  classe: string;

  @Column({ name: 'area' })
  area: string;

  @Column({ name: 'motivo' })
  motivo: string;

  @ManyToOne(type => Processo)
  processo: Processo;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
