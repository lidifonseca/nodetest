/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { validate, Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, Min, Max } from 'class-validator';

import Categoria from './categoria.entity';

/**
 * A UnidadeEasy.
 */
@Entity('tb_unidade_easy')
export default class UnidadeEasy extends BaseEntity {
  @Column({ name: 'RAZAO_SOCIAL', length: 150 })
  razaoSocial: string;

  @Column({ name: 'NOME_FANTASIA', length: 150 })
  nomeFantasia: string;

  @Column({ name: 'CNPJ', length: 20 })
  cnpj: string;

  @Column({ name: 'IE', length: 20 })
  ie: string;

  /**
   * @dbName TELEFONE1@@
   */
  @Column({ name: 'TELEFONE1', length: 20 })
  telefone1: string;

  /**
   * @dbName TELEFONE2@@
   */
  @Column({ name: 'TELEFONE2', length: 20 })
  telefone2: string;

  @Column({ name: 'ENDERECO', length: 100 })
  endereco: string;

  @Column({ name: 'NUMERO', length: 30 })
  numero: string;

  @Column({ name: 'COMPLEMENTO', length: 20 })
  complemento: string;

  @Column({ name: 'BAIRRO', length: 40 })
  bairro: string;

  @Column({ name: 'CIDADE', length: 100 })
  cidade: string;

  @Column({ name: 'UF', length: 5 })
  uf: string;

  @Column({ name: 'CEP', length: 10 })
  cep: string;

  @Column({ name: 'REGANS', length: 20 })
  regans: string;

  @Column({ name: 'REGCNES', length: 20 })
  regcnes: string;

  @Column({ name: 'TISSRESPONSAVEL', length: 100 })
  tissresponsavel: string;

  @Column({ name: 'TISSCONSELHO', length: 5 })
  tissconselho: string;

  @Column({ name: 'TISSINSCRICAO', length: 20 })
  tissinscricao: string;

  @Column({ name: 'TISSCBO', length: 20 })
  tisscbo: string;

  @Column({ name: 'TISSCODUF', length: 5 })
  tisscoduf: string;

  @Column({ type: 'integer', name: 'ATIVO' })
  ativo: number;

  @ManyToMany(type => Categoria)
  categorias: Categoria[];

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
