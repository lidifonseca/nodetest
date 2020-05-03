/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { validate, Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, Min, Max } from 'class-validator';

/**
 * A StatusAtualLigacao.
 */
@Entity('status_atual_ligacao')
export default class StatusAtualLigacao extends BaseEntity {
  @Column({ name: 'status_atual_ligacao', length: 40 })
  statusAtualLigacao: string;

  @Column({ name: 'style_label', length: 40 })
  styleLabel: string;

  @Column({ type: 'timestamp', name: 'data_post', nullable: false })
  dataPost: any;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
