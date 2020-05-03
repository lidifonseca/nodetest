/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { validate, Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, Min, Max } from 'class-validator';

import Respostas from './respostas.entity';
import PerguntasQuestionario from './perguntas-questionario.entity';

/**
 * A AcoesRespostas.
 */
@Entity('acoes_respostas')
export default class AcoesRespostas extends BaseEntity {
  @Column({ type: 'boolean', name: 'abrir_campo_personalizado' })
  abrirCampoPersonalizado: boolean;

  @Column({ name: 'condicao_sexo', length: 45 })
  condicaoSexo: string;

  @Column({ name: 'observacoes', length: 125 })
  observacoes: string;

  @Column({ name: 'tipo_campo_1', length: 45 })
  tipoCampo1: string;

  @Column({ name: 'tipo_campo_2', length: 45 })
  tipoCampo2: string;

  @ManyToOne(type => Respostas)
  respostasId: Respostas;

  @ManyToOne(type => PerguntasQuestionario)
  perguntasQuestionarioId: PerguntasQuestionario;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
