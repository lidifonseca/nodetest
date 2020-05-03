/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { validate, Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, Min, Max } from 'class-validator';

/**
 * A UnidadeEasy.
 */
@Entity('unidade_easy')
export default class UnidadeEasy extends BaseEntity {
  @Column({ name: 'razao_social', length: 150 })
  razaoSocial: string;

  @Column({ name: 'nome_fantasia', length: 150 })
  nomeFantasia: string;

  @Column({ name: 'cnpj', length: 20 })
  cnpj: string;

  @Column({ name: 'ie', length: 20 })
  ie: string;

  @Column({ name: 'telefone_1', length: 20 })
  telefone1: string;

  @Column({ name: 'telefone_2', length: 20 })
  telefone2: string;

  @Column({ name: 'endereco', length: 100 })
  endereco: string;

  @Column({ name: 'numero', length: 30 })
  numero: string;

  @Column({ name: 'complemento', length: 20 })
  complemento: string;

  @Column({ name: 'bairro', length: 40 })
  bairro: string;

  @Column({ name: 'cidade', length: 100 })
  cidade: string;

  @Column({ name: 'uf', length: 5 })
  uf: string;

  @Column({ name: 'cep', length: 10 })
  cep: string;

  @Column({ name: 'regans', length: 20 })
  regans: string;

  @Column({ name: 'regcnes', length: 20 })
  regcnes: string;

  @Column({ name: 'tissresponsavel', length: 100 })
  tissresponsavel: string;

  @Column({ name: 'tissconselho', length: 5 })
  tissconselho: string;

  @Column({ name: 'tissinscricao', length: 20 })
  tissinscricao: string;

  @Column({ name: 'tisscbo', length: 20 })
  tisscbo: string;

  @Column({ name: 'tisscoduf', length: 5 })
  tisscoduf: string;

  @Column({ type: 'integer', name: 'ativo' })
  ativo: number;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
