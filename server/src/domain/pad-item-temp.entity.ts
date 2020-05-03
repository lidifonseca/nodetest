/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { validate, Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, Min, Max } from 'class-validator';

/**
 * A PadItemTemp.
 */
@Entity('pad_item_temp')
export default class PadItemTemp extends BaseEntity {
  @Column({ name: 'session_id', length: 100 })
  sessionId: string;

  @Column({ type: 'integer', name: 'id_especialidade' })
  idEspecialidade: number;

  @Column({ type: 'integer', name: 'id_periodicidade' })
  idPeriodicidade: number;

  @Column({ type: 'integer', name: 'id_periodo' })
  idPeriodo: number;

  @Column({ type: 'date', name: 'data_inicio' })
  dataInicio: any;

  @Column({ type: 'date', name: 'data_fim' })
  dataFim: any;

  @Column({ type: 'integer', name: 'qtd_sessoes' })
  qtdSessoes: number;

  @Column({ name: 'observacao', length: 255 })
  observacao: string;

  @Column({ type: 'timestamp', name: 'data_post' })
  dataPost: any;

  @Column({ type: 'integer', name: 'cid_x_pta_novo_id' })
  cidXPtaNovoId: number;

  @Column({ type: 'integer', name: 'categoria_id' })
  categoriaId: number;

  @Column({ name: 'num_ghc', length: 40 })
  numGhc: string;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
