/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { validate, Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, Min, Max } from 'class-validator';

import Operadora from './operadora.entity';
import Especialidade from './especialidade.entity';

/**
 * A EspecialidadeOperadora.
 */
@Entity('especialidade_operadora')
export default class EspecialidadeOperadora extends BaseEntity {
  @Column({ name: 'cod_tuss', length: 30 })
  codTuss: string;

  @Column({ name: 'cod_despesa', length: 5 })
  codDespesa: string;

  @Column({ name: 'cod_tabela', length: 5 })
  codTabela: string;

  @Column({ type: 'float', name: 'valor_custo' })
  valorCusto: number;

  @Column({ type: 'float', name: 'valor_venda' })
  valorVenda: number;

  @Column({ type: 'float', name: 'desconto_custo' })
  descontoCusto: number;

  @Column({ type: 'float', name: 'desconto_venda' })
  descontoVenda: number;

  @Column({ type: 'integer', name: 'ativo' })
  ativo: number;

  @Column({ type: 'timestamp', name: 'data_post', nullable: false })
  dataPost: any;

  @ManyToOne(type => Operadora)
  idOperadora: Operadora;

  @ManyToOne(type => Especialidade)
  idEspecialidade: Especialidade;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
