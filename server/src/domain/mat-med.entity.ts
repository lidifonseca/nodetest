/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { validate, Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, Min, Max } from 'class-validator';

/**
 * A MatMed.
 */
@Entity('mat_med')
export default class MatMed extends BaseEntity {
  @Column({ name: 'nome', length: 80 })
  nome: string;

  /**
   * Tipo 1 - Medicamento, Tipo 2 - Materiais, Tipo 3 - Equipamento
   */
  @Column({ type: 'integer', name: 'id_tipo_mat_med' })
  idTipoMatMed: number;

  @Column({ type: 'decimal', name: 'valor', precision: 10, scale: 2 })
  valor: number;

  @Column({ type: 'integer', name: 'ativo' })
  ativo: number;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
