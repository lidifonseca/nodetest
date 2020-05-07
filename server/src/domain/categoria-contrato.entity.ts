/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

/**
 * A CategoriaContrato.
 */
@Entity('tb_categoria_contrato')
export default class CategoriaContrato extends BaseEntity {
  @Column({ name: 'CONTRATO' })
  contrato: string;

  @Column({ name: 'CONTRATO_CONTENT_TYPE' })
  contratoContentType: string;
  @Column({ type: 'integer', name: 'ATIVO' })
  ativo: number;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
