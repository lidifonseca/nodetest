/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

/**
 * A TermosUso.
 */
@Entity('termos_uso')
export default class TermosUso extends BaseEntity {
  @Column({ type: 'blob', name: 'termos_uso' })
  termosUso: any;

  @Column({ type: 'integer', name: 'tipo' })
  tipo: number;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
