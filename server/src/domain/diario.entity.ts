/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { validate, Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, Min, Max } from 'class-validator';

/**
 * A Diario.
 */
@Entity('tb_diario')
export default class Diario extends BaseEntity {
  @Column({ name: 'HISTORICO', length: 255 })
  historico: string;

  @Column({ type: 'integer', name: 'GERAR_PDF' })
  gerarPdf: number;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
