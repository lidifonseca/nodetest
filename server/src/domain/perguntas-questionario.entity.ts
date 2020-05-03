/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { validate, Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, Min, Max } from 'class-validator';

import AcoesRespostas from './acoes-respostas.entity';
import Respostas from './respostas.entity';
import SegmentosPerguntas from './segmentos-perguntas.entity';

/**
 * A PerguntasQuestionario.
 */
@Entity('perguntas_questionario')
export default class PerguntasQuestionario extends BaseEntity {
  @Column({ name: 'pergunta', length: 245 })
  pergunta: string;

  @Column({ name: 'tipo_resposta', length: 60 })
  tipoResposta: string;

  @Column({ type: 'boolean', name: 'obrigatorio' })
  obrigatorio: boolean;

  @Column({ name: 'tipo_campo', length: 45 })
  tipoCampo: string;

  @OneToMany(
    type => AcoesRespostas,
    other => other.perguntasQuestionarioId
  )
  acoesRespostas: AcoesRespostas[];

  @OneToMany(
    type => Respostas,
    other => other.perguntasQuestionarioId
  )
  respostas: Respostas[];

  @ManyToOne(type => SegmentosPerguntas)
  segmentosPerguntasId: SegmentosPerguntas;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
