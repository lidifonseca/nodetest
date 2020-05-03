/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { validate, Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, Min, Max } from 'class-validator';

/**
 * A PadMatMed.
 */
@Entity('pad_mat_med')
export default class PadMatMed extends BaseEntity {
  @Column({ type: 'integer', name: 'id_pad', nullable: false })
  idPad: number;

  @Column({ type: 'integer', name: 'id_mat_med', nullable: false })
  idMatMed: number;

  @Column({ type: 'integer', name: 'qtd', nullable: false })
  qtd: number;

  @Column({ type: 'integer', name: 'id_usuario', nullable: false })
  idUsuario: number;

  @Column({ type: 'integer', name: 'ativo', nullable: false })
  ativo: number;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
