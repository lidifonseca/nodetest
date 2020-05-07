/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { validate, Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, Min, Max } from 'class-validator';

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

  @ManyToMany(type => UnidadeEasy)
  @JoinTable({
    name: 'tb_categoria_unidade',
    joinColumn: { name: 'ID_CATEGORIA', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'ID_UNIDADE', referencedColumnName: 'id' }
  })
  unidades: UnidadeEasy[];

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
