/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { validate, Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, Min, Max } from 'class-validator';

import AtendimentoAtividades from './atendimento-atividades.entity';
import PadItemAtividade from './pad-item-atividade.entity';
import Categoria from './categoria.entity';

/**
 * A CategoriaAtividade.
 */
@Entity('categoria_atividade')
export default class CategoriaAtividade extends BaseEntity {
  @Column({ name: 'atividade', length: 100 })
  atividade: string;

  @Column({ type: 'timestamp', name: 'data_post', nullable: false })
  dataPost: any;

  @Column({ type: 'integer', name: 'id_unidade' })
  idUnidade: number;

  @OneToMany(
    type => AtendimentoAtividades,
    other => other.idAtividade
  )
  atendimentoAtividades: AtendimentoAtividades[];

  @OneToMany(
    type => PadItemAtividade,
    other => other.idAtividade
  )
  padItemAtividades: PadItemAtividade[];

  @ManyToOne(type => Categoria)
  idCategoria: Categoria;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
