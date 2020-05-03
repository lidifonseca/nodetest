/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { validate, Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, Min, Max } from 'class-validator';

import CategoriaAtividade from './categoria-atividade.entity';
import Atendimento from './atendimento.entity';

/**
 * A AtendimentoAtividades.
 */
@Entity('atendimento_atividades')
export default class AtendimentoAtividades extends BaseEntity {
  @Column({ type: 'integer', name: 'feito' })
  feito: number;

  @Column({ type: 'timestamp', name: 'data_post', nullable: false })
  dataPost: any;

  @ManyToOne(type => CategoriaAtividade)
  idAtividade: CategoriaAtividade;

  @ManyToOne(type => Atendimento)
  idAtendimento: Atendimento;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
