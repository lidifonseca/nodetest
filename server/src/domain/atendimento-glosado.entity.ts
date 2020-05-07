/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { validate, Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, Min, Max } from 'class-validator';

/**
 * A AtendimentoGlosado.
 */
@Entity('tb_atendimento_glosado')
export default class AtendimentoGlosado extends BaseEntity {
  @Column({ type: 'integer', name: 'ID_ATENDIMENTO', nullable: false })
  idAtendimento: number;

  @Column({ name: 'GLOSADO', length: 1 })
  glosado: string;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
