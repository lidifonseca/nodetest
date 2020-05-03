/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { validate, Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, Min, Max } from 'class-validator';

/**
 * A PadCsv.
 */
@Entity('pad_csv')
export default class PadCsv extends BaseEntity {
  @Column({ type: 'integer', name: 'id_franquia' })
  idFranquia: number;

  @Column({ type: 'integer', name: 'id_paciente' })
  idPaciente: number;

  @Column({ name: 'nro_pad', length: 10 })
  nroPad: string;

  @Column({ name: 'data_inicio', length: 10 })
  dataInicio: string;

  @Column({ name: 'data_fim', length: 10 })
  dataFim: string;

  @Column({ type: 'integer', name: 'id_especialidade' })
  idEspecialidade: number;

  @Column({ type: 'integer', name: 'id_periodicidade' })
  idPeriodicidade: number;

  @Column({ type: 'integer', name: 'id_periodo' })
  idPeriodo: number;

  @Column({ type: 'integer', name: 'qtd_sessoes' })
  qtdSessoes: number;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
