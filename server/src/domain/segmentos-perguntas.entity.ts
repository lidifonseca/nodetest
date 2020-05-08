/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { validate, Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, Min, Max } from 'class-validator';

import PerguntasQuestionario from './perguntas-questionario.entity';

/**
 * A SegmentosPerguntas.
 */
@Entity('tb_segmentos_perguntas')
export default class SegmentosPerguntas extends BaseEntity {
  @Column({ name: 'SEGMENTO', length: 100 })
  segmento: string;

  @OneToMany(
    type => PerguntasQuestionario,
    other => other.segmentosPerguntas
  )
  perguntasQuestionarios: PerguntasQuestionario[];

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
