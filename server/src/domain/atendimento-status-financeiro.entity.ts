/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { validate, Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, Min, Max } from 'class-validator';

/**
 * A AtendimentoStatusFinanceiro.
 */
@Entity('tb_atendimento_status_financeiro')
export default class AtendimentoStatusFinanceiro extends BaseEntity {
  @Column({ type: 'integer', name: 'ID_ATENDIMENTO', nullable: false })
  idAtendimento: number;

  @Column({ type: 'integer', name: 'ID_STATUS_FINANCEIRO', nullable: false })
  idStatusFinanceiro: number;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
