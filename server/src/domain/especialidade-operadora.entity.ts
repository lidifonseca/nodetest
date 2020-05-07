/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { validate, Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, Min, Max } from 'class-validator';

/**
 * A EspecialidadeOperadora.
 */
@Entity('tb_especialidade_operadora')
export default class EspecialidadeOperadora extends BaseEntity {
  @Column({ name: 'COD_TUSS', length: 30 })
  codTuss: string;

  @Column({ name: 'COD_DESPESA', length: 5 })
  codDespesa: string;

  @Column({ name: 'COD_TABELA', length: 5 })
  codTabela: string;

  @Column({ type: 'float', name: 'VALOR_CUSTO' })
  valorCusto: number;

  @Column({ type: 'float', name: 'VALOR_VENDA' })
  valorVenda: number;

  @Column({ type: 'float', name: 'DESCONTO_CUSTO' })
  descontoCusto: number;

  @Column({ type: 'float', name: 'DESCONTO_VENDA' })
  descontoVenda: number;

  @Column({ type: 'integer', name: 'ATIVO' })
  ativo: number;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
