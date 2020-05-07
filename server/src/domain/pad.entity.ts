/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { validate, Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, Min, Max } from 'class-validator';

import UnidadeEasy from './unidade-easy.entity';

/**
 * A Pad.
 */
@Entity('tb_pad')
export default class Pad extends BaseEntity {
  @Column({ type: 'integer', name: 'ID_OPERADORA' })
  idOperadora: number;

  @Column({ name: 'ID_FRANQUIA' })
  idFranquia: string;

  @Column({ name: 'NRO_PAD', length: 30 })
  nroPad: string;

  @Column({ type: 'date', name: 'DATA_INICIO' })
  dataInicio: any;

  @Column({ type: 'date', name: 'DATA_FIM' })
  dataFim: any;

  @Column({ type: 'date', name: 'DATA_CONFERIDO' })
  dataConferido: any;

  @Column({ type: 'integer', name: 'ATIVO' })
  ativo: number;

  @Column({ type: 'integer', name: 'STATUS_PAD' })
  statusPad: number;

  @Column({ type: 'boolean', name: 'NOVO_MODELO' })
  novoModelo: boolean;

  @Column({ name: 'IMAGE_PATH', length: 250 })
  imagePath: string;

  @Column({ type: 'double', name: 'SCORE' })
  score: number;

  @ManyToOne(type => UnidadeEasy)
  @JoinColumn({ name: 'ID_UNIDADE', referencedColumnName: 'id' })
  unidade: UnidadeEasy;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
