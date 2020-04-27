/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import Processo from './processo.entity';

/**
 * A Audiencia.
 */
@Entity('audiencia')
export default class Audiencia extends BaseEntity {
  @Column({ type: 'date', name: 'data' })
  data: any;

  @Column({ name: 'audencia' })
  audencia: string;

  @Column({ name: 'situacao' })
  situacao: string;

  @Column({ type: 'integer', name: 'quatidade_pessoas' })
  quatidadePessoas: number;

  @ManyToOne(type => Processo)
  processo: Processo;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
