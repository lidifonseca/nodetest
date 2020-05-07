/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { validate, Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, Min, Max } from 'class-validator';

/**
 * A PerguntasQuestionario.
 */
@Entity('tb_perguntas_questionario')
export default class PerguntasQuestionario extends BaseEntity {
  @Column({ name: 'PERGUNTA', length: 245 })
  pergunta: string;

  @Column({ name: 'TIPO_RESPOSTA', length: 60 })
  tipoResposta: string;

  @Column({ type: 'boolean', name: 'OBRIGATORIO' })
  obrigatorio: boolean;

  @Column({ name: 'TIPO_CAMPO', length: 45 })
  tipoCampo: string;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
