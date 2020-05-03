/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { validate, Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, Min, Max } from 'class-validator';

import UnidadeEasy from './unidade-easy.entity';
import Categoria from './categoria.entity';

/**
 * A CategoriaUnidade.
 */
@Entity('categoria_unidade')
export default class CategoriaUnidade extends BaseEntity {
  @Column({ type: 'timestamp', name: 'data_post', nullable: false })
  dataPost: any;

  @ManyToOne(type => UnidadeEasy)
  unidade: UnidadeEasy;

  @ManyToOne(type => Categoria)
  idCategoria: Categoria;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
