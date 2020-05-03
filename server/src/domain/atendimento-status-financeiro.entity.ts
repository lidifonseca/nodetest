/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { validate, Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, Min, Max } from 'class-validator';

/**
 * A AtendimentoStatusFinanceiro.
 */
@Entity('atendimento_status_financeiro')
export default class AtendimentoStatusFinanceiro extends BaseEntity {
  @Column({ type: 'integer', name: 'id_atendimento', nullable: false })
  idAtendimento: number;

  @Column({ type: 'integer', name: 'id_status_financeiro', nullable: false })
  idStatusFinanceiro: number;

  @Column({ type: 'integer', name: 'id_usuario' })
  idUsuario: number;

  @Column({ type: 'date', name: 'data_post' })
  dataPost: any;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
