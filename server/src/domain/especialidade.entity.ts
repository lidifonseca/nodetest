/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { validate, Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, Min, Max } from 'class-validator';

import UnidadeEasy from './unidade-easy.entity';

/**
 * A Especialidade.
 */
@Entity('tb_especialidade')
export default class Especialidade extends BaseEntity {
  @Column({ name: 'ICON', length: 100 })
  icon: string;

  @Column({ name: 'ESPECIALIDADE', length: 150 })
  especialidade: string;

  @Column({ name: 'DESCRICAO' })
  descricao: string;

  @Column({ type: 'integer', name: 'DURACAO' })
  duracao: number;

  @Column({ name: 'IMPORTANTE', length: 255 })
  importante: string;

  @Column({ type: 'integer', name: 'ATIVO' })
  ativo: number;

  @ManyToOne(type => UnidadeEasy)
  @JoinColumn({ name: 'ID_UNIDADE', referencedColumnName: 'id' })
  unidade: UnidadeEasy;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
