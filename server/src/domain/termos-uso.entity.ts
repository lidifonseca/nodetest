/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

/**
 * A TermosUso.
 */
@Entity('tb_termos_uso')
export default class TermosUso extends BaseEntity {
  @Column({ name: 'TERMOS_USO' })
  termosUso: string;

  @Column({ type: 'integer', name: 'TIPO' })
  tipo: number;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
