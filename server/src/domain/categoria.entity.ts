/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { validate, Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, Min, Max } from 'class-validator';

import CategoriaAtividade from './categoria-atividade.entity';
import CategoriaContrato from './categoria-contrato.entity';
import CategoriaUnidade from './categoria-unidade.entity';
import CidXPtaNovoPadItemIndi from './cid-x-pta-novo-pad-item-indi.entity';
import Especialidade from './especialidade.entity';

/**
 * A Categoria.
 */
@Entity('categoria')
export default class Categoria extends BaseEntity {
  @Column({ name: 'categoria', length: 100 })
  categoria: string;

  @Column({ name: 'style_categoria', length: 100 })
  styleCategoria: string;

  @Column({ name: 'icon', length: 100 })
  icon: string;

  @Column({ type: 'integer', name: 'publicar' })
  publicar: number;

  @Column({ type: 'integer', name: 'ordem' })
  ordem: number;

  @Column({ type: 'integer', name: 'publicar_site', nullable: false })
  publicarSite: number;

  @OneToMany(
    type => CategoriaAtividade,
    other => other.idCategoria
  )
  categoriaAtividades: CategoriaAtividade[];

  @OneToMany(
    type => CategoriaContrato,
    other => other.idCategoria
  )
  categoriaContratoes: CategoriaContrato[];

  @OneToMany(
    type => CategoriaUnidade,
    other => other.idCategoria
  )
  categoriaUnidades: CategoriaUnidade[];

  @OneToMany(
    type => CidXPtaNovoPadItemIndi,
    other => other.categoriasId
  )
  cidXPtaNovoPadItemIndis: CidXPtaNovoPadItemIndi[];

  @OneToMany(
    type => Especialidade,
    other => other.idCategoria
  )
  especialidades: Especialidade[];

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
