/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { validate, Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, Min, Max } from 'class-validator';

import Paciente from './paciente.entity';

/**
 * A Questionarios.
 */
@Entity('tb_questionarios')
export default class Questionarios extends BaseEntity {
  @Column({ type: 'timestamp', name: 'DATA_CADASTRO' })
  dataCadastro: any;

  @Column({ name: 'ETAPA_ATUAL', length: 50 })
  etapaAtual: string;

  @Column({ type: 'boolean', name: 'FINALIZADO' })
  finalizado: boolean;

  @Column({ type: 'integer', name: 'ULTIMA_PERGUNTA_RESPONDIDA' })
  ultimaPerguntaRespondida: number;

  @ManyToOne(type => Paciente)
  @JoinColumn({ name: 'ID_PACIENTE', referencedColumnName: 'id' })
  paciente: Paciente;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
