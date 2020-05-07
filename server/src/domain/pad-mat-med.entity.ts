/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { validate, Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, Min, Max } from 'class-validator';

/**
 * A PadMatMed.
 */
@Entity('tb_pad_mat_med')
export default class PadMatMed extends BaseEntity {
  @Column({ type: 'integer', name: 'ID_PAD', nullable: false })
  idPad: number;

  @Column({ type: 'integer', name: 'ID_MAT_MED', nullable: false })
  idMatMed: number;

  @Column({ type: 'integer', name: 'QTD', nullable: false })
  qtd: number;

  @Column({ type: 'integer', name: 'ATIVO', nullable: false })
  ativo: number;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
