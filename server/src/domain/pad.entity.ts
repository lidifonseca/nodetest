/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { validate, Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, Min, Max } from 'class-validator';

import PadCid from './pad-cid.entity';
import PadItem from './pad-item.entity';
import Paciente from './paciente.entity';

/**
 * A Pad.
 */
@Entity('pad')
export default class Pad extends BaseEntity {
  @Column({ name: 'id_unidade', nullable: false })
  idUnidade: string;

  @Column({ type: 'integer', name: 'id_operadora' })
  idOperadora: number;

  @Column({ name: 'id_franquia' })
  idFranquia: string;

  @Column({ name: 'nro_pad', length: 30 })
  nroPad: string;

  @Column({ type: 'date', name: 'data_inicio' })
  dataInicio: any;

  @Column({ type: 'date', name: 'data_fim' })
  dataFim: any;

  @Column({ type: 'date', name: 'data_conferido' })
  dataConferido: any;

  @Column({ type: 'integer', name: 'ativo' })
  ativo: number;

  @Column({ type: 'integer', name: 'id_usuario' })
  idUsuario: number;

  @Column({ type: 'integer', name: 'status_pad' })
  statusPad: number;

  @Column({ type: 'boolean', name: 'novo_modelo' })
  novoModelo: boolean;

  @Column({ name: 'image_path', length: 250 })
  imagePath: string;

  @Column({ type: 'double', name: 'score' })
  score: number;

  @OneToMany(
    type => PadCid,
    other => other.idPad
  )
  padCids: PadCid[];

  @OneToMany(
    type => PadItem,
    other => other.idPad
  )
  padItems: PadItem[];

  @ManyToOne(type => Paciente)
  idPaciente: Paciente;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
