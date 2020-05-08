/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { validate, Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, Min, Max } from 'class-validator';

import AtendimentoAtividades from './atendimento-atividades.entity';
import PadItemAtividade from './pad-item-atividade.entity';
import UnidadeEasy from './unidade-easy.entity';
import Categoria from './categoria.entity';

/**
 * A CategoriaAtividade.
 */
@Entity('tb_categoria_atividade')
export default class CategoriaAtividade extends BaseEntity {
  @Column({ name: 'ATIVIDADE', length: 100 })
  atividade: string;

  @OneToMany(
    type => AtendimentoAtividades,
    other => other.atividade
  )
  atendimentoAtividades: AtendimentoAtividades[];

  @OneToMany(
    type => PadItemAtividade,
    other => other.atividade
  )
  padItemAtividades: PadItemAtividade[];

  @ManyToOne(type => UnidadeEasy)
  @JoinColumn({ name: 'ID_UNIDADE', referencedColumnName: 'id' })
  unidade: UnidadeEasy;

  @ManyToOne(type => Categoria)
  @JoinColumn({ name: 'ID_CATEGORIA', referencedColumnName: 'id' })
  categoria: Categoria;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
