/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { validate, Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, Min, Max } from 'class-validator';

/**
 * A PadItemTemp.
 */
@Entity('tb_pad_item_temp')
export default class PadItemTemp extends BaseEntity {
  @Column({ name: 'SESSION_ID', length: 100 })
  sessionId: string;

  @Column({ type: 'integer', name: 'ID_ESPECIALIDADE' })
  idEspecialidade: number;

  @Column({ type: 'integer', name: 'ID_PERIODICIDADE' })
  idPeriodicidade: number;

  @Column({ type: 'integer', name: 'ID_PERIODO' })
  idPeriodo: number;

  @Column({ type: 'date', name: 'DATA_INICIO' })
  dataInicio: any;

  @Column({ type: 'date', name: 'DATA_FIM' })
  dataFim: any;

  @Column({ type: 'integer', name: 'QTD_SESSOES' })
  qtdSessoes: number;

  @Column({ name: 'OBSERVACAO', length: 255 })
  observacao: string;

  @Column({ type: 'integer', name: 'CID_X_PTA_NOVO_ID' })
  cidXPtaNovoId: number;

  @Column({ type: 'integer', name: 'CATEGORIA_ID' })
  categoriaId: number;

  @Column({ name: 'NUM_GHC', length: 40 })
  numGhc: string;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
