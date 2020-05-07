/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { validate, Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, Min, Max } from 'class-validator';

/**
 * A PacienteDadosCartao.
 */
@Entity('tb_paciente_dados_cartao')
export default class PacienteDadosCartao extends BaseEntity {
  @Column({ name: 'BANDEIRA', length: 40 })
  bandeira: string;

  @Column({ name: 'NUMERO_CARTAO', length: 30 })
  numeroCartao: string;

  @Column({ type: 'date', name: 'VALIDADE' })
  validade: any;

  @Column({ type: 'integer', name: 'COD_ATIVACAO' })
  codAtivacao: number;

  @Column({ type: 'integer', name: 'ATIVO' })
  ativo: number;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
