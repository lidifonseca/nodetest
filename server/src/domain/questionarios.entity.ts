/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { validate, Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, Min, Max } from 'class-validator';

import RespostasQuestionarios from './respostas-questionarios.entity';
import Paciente from './paciente.entity';

/**
 * A Questionarios.
 */
@Entity('questionarios')
export default class Questionarios extends BaseEntity {
  @Column({ type: 'timestamp', name: 'data_cadastro' })
  dataCadastro: any;

  @Column({ name: 'etapa_atual', length: 50 })
  etapaAtual: string;

  @Column({ type: 'boolean', name: 'finalizado' })
  finalizado: boolean;

  @Column({ type: 'integer', name: 'ultima_pergunta_respondida' })
  ultimaPerguntaRespondida: number;

  @OneToMany(
    type => RespostasQuestionarios,
    other => other.questionariosId
  )
  respostasQuestionarios: RespostasQuestionarios[];

  @ManyToOne(type => Paciente)
  paciente: Paciente;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
