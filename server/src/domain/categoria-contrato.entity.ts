/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import Categoria from './categoria.entity';

/**
 * A CategoriaContrato.
 */
@Entity('categoria_contrato')
export default class CategoriaContrato extends BaseEntity {
  @Column({ type: 'blob', name: 'contrato' })
  contrato: any;

  @Column({ name: 'contrato_content_type' })
  contratoContentType: string;
  @Column({ type: 'integer', name: 'ativo' })
  ativo: number;

  @ManyToOne(type => Categoria)
  idCategoria: Categoria;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
