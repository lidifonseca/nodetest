/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { validate, Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, Min, Max } from 'class-validator';

import Questionarios from './questionarios.entity';

/**
 * A RespostasQuestionarios.
 */
@Entity('respostas_questionarios')
export default class RespostasQuestionarios extends BaseEntity {
  @Column({ type: 'timestamp', name: 'data_resposta' })
  dataResposta: any;

  @Column({ name: 'informacao_adicional', length: 255 })
  informacaoAdicional: string;

  @Column({ type: 'integer', name: 'questionario_id' })
  questionarioId: number;

  @ManyToOne(type => Questionarios)
  questionariosId: Questionarios;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
