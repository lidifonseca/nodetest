/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { validate, Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, Min, Max } from 'class-validator';

import AcoesRespostas from './acoes-respostas.entity';
import PerguntasQuestionario from './perguntas-questionario.entity';

/**
 * A Respostas.
 */
@Entity('tb_respostas')
export default class Respostas extends BaseEntity {
  @Column({ name: 'RESPOSTA', length: 245 })
  resposta: string;

  @Column({ type: 'integer', name: 'PONTUACAO' })
  pontuacao: number;

  @Column({ type: 'boolean', name: 'RESPOSTA_ATIVA' })
  respostaAtiva: boolean;

  @OneToMany(
    type => AcoesRespostas,
    other => other.respostas
  )
  acoesRespostas: AcoesRespostas[];

  @ManyToOne(type => PerguntasQuestionario)
  @JoinColumn({ name: 'ID_PERGUNTAS_QUESTIONARIO', referencedColumnName: 'id' })
  perguntasQuestionario: PerguntasQuestionario;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
