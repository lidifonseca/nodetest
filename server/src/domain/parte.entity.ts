/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import Processo from './processo.entity';

/**
 * A Parte.
 */
@Entity('parte')
export default class Parte extends BaseEntity {
  @Column({ name: 'categoria' })
  categoria: string;

  @Column({ name: 'participante' })
  participante: string;

  @Column({ type: 'blob', name: 'advogados' })
  advogados: any;

  @ManyToOne(type => Processo)
  processo: Processo;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
