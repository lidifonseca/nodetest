/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { validate, Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, Min, Max } from 'class-validator';

/**
 * A RespostasQuestionarios.
 */
@Entity('tb_respostas_questionarios')
export default class RespostasQuestionarios extends BaseEntity {
  @Column({ type: 'timestamp', name: 'DATA_RESPOSTA' })
  dataResposta: any;

  @Column({ name: 'INFORMACAO_ADICIONAL', length: 255 })
  informacaoAdicional: string;

  @Column({ type: 'integer', name: 'QUESTIONARIO_ID' })
  questionarioId: number;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
