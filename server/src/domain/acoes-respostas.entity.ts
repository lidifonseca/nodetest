/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { validate, Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, Min, Max } from 'class-validator';

import Respostas from './respostas.entity';
import PerguntasQuestionario from './perguntas-questionario.entity';

/**
 * A AcoesRespostas.
 */
@Entity('tb_acoes_respostas')
export default class AcoesRespostas extends BaseEntity {
  @Column({ type: 'boolean', name: 'ABRIR_CAMPO_PERSONALIZADO' })
  abrirCampoPersonalizado: boolean;

  @Column({ name: 'CONDICAO_SEXO', length: 45 })
  condicaoSexo: string;

  @Column({ name: 'OBSERVACOES', length: 125 })
  observacoes: string;

  @Column({ name: 'TIPO_CAMPO_1', length: 45 })
  tipoCampo1: string;

  @Column({ name: 'TIPO_CAMPO_2', length: 45 })
  tipoCampo2: string;

  @ManyToOne(type => Respostas)
  @JoinColumn({ name: 'ID_RESPOSTAS', referencedColumnName: 'id' })
  respostas: Respostas;

  @ManyToOne(type => PerguntasQuestionario)
  @JoinColumn({ name: 'ID_PERGUNTAS_QUESTIONARIO', referencedColumnName: 'id' })
  perguntasQuestionario: PerguntasQuestionario;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
