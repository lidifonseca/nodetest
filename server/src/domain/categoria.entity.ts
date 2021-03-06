/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { validate, Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, Min, Max } from 'class-validator';

import CategoriaAtividade from './categoria-atividade.entity';
import CategoriaContrato from './categoria-contrato.entity';
import CidXPtaNovoPadItemIndi from './cid-x-pta-novo-pad-item-indi.entity';
import Especialidade from './especialidade.entity';
import UnidadeEasy from './unidade-easy.entity';

/**
 * A Categoria.
 */
@Entity('tb_categoria')
export default class Categoria extends BaseEntity {
  @Column({ name: 'CATEGORIA', length: 100 })
  categoria: string;

  @Column({ name: 'STYLE_CATEGORIA', length: 100 })
  styleCategoria: string;

  @Column({ name: 'ICON', length: 100 })
  icon: string;

  @Column({ type: 'integer', name: 'PUBLICAR' })
  publicar: number;

  @Column({ type: 'integer', name: 'ORDEM' })
  ordem: number;

  @Column({ type: 'integer', name: 'PUBLICAR_SITE', nullable: false })
  publicarSite: number;

  @OneToMany(
    type => CategoriaAtividade,
    other => other.categoria
  )
  categoriaAtividades: CategoriaAtividade[];

  @OneToMany(
    type => CategoriaContrato,
    other => other.categoria
  )
  categoriaContratoes: CategoriaContrato[];

  @OneToMany(
    type => CidXPtaNovoPadItemIndi,
    other => other.categorias
  )
  cidXPtaNovoPadItemIndis: CidXPtaNovoPadItemIndi[];

  @OneToMany(
    type => Especialidade,
    other => other.categoria
  )
  especialidades: Especialidade[];

  @ManyToMany(type => UnidadeEasy)
  @JoinTable({
    name: 'tb_categoria_unidade',
    joinColumn: { name: 'ID_CATEGORIA', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'ID_UNIDADE', referencedColumnName: 'id' }
  })
  unidades: UnidadeEasy[];

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
