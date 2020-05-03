/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { validate, Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, Min, Max } from 'class-validator';

import AcoesRespostas from './acoes-respostas.entity';
import PerguntasQuestionario from './perguntas-questionario.entity';

/**
 * A Respostas.
 */
@Entity('respostas')
export default class Respostas extends BaseEntity {
  @Column({ name: 'resposta', length: 245 })
  resposta: string;

  @Column({ type: 'integer', name: 'pontuacao' })
  pontuacao: number;

  @Column({ type: 'boolean', name: 'resposta_ativa' })
  respostaAtiva: boolean;

  @OneToMany(
    type => AcoesRespostas,
    other => other.respostasId
  )
  acoesRespostas: AcoesRespostas[];

  @ManyToOne(type => PerguntasQuestionario)
  perguntasQuestionarioId: PerguntasQuestionario;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
