/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { validate, Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, Min, Max } from 'class-validator';

import PadCid from './pad-cid.entity';
import PadItem from './pad-item.entity';
import UnidadeEasy from './unidade-easy.entity';
import Operadora from './operadora.entity';
import Franquia from './franquia.entity';
import Paciente from './paciente.entity';

/**
 * \n\n
 */
@Entity('tb_pad')
export default class Pad extends BaseEntity {
  @Column({ name: 'NRO_PAD', length: 30 })
  nroPad: string;

  @Column({ type: 'date', name: 'DATA_INICIO' })
  dataInicio: any;

  @Column({ type: 'date', name: 'DATA_FIM' })
  dataFim: any;

  @Column({ type: 'date', name: 'DATA_CONFERIDO' })
  dataConferido: any;

  @Column({ type: 'boolean', name: 'ATIVO' })
  ativo: boolean;

  @Column({ type: 'integer', name: 'STATUS_PAD' })
  statusPad: number;

  @OneToMany(
    type => PadCid,
    other => other.pad
  )
  padCids: PadCid[];

  @OneToMany(
    type => PadItem,
    other => other.pad
  )
  padItems: PadItem[];

  @ManyToOne(type => UnidadeEasy)
  @JoinColumn({ name: 'ID_UNIDADE', referencedColumnName: 'id' })
  unidade: UnidadeEasy;

  @ManyToOne(type => Operadora)
  @JoinColumn({ name: 'ID_OPERADORA', referencedColumnName: 'id' })
  operadora: Operadora;

  @ManyToOne(type => Franquia)
  @JoinColumn({ name: 'ID_FRANQUIA', referencedColumnName: 'id' })
  franquia: Franquia;

  @ManyToOne(type => Paciente)
  @JoinColumn({ name: 'ID_PACIENTE', referencedColumnName: 'id' })
  paciente: Paciente;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
