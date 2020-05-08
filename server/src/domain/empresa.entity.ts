/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { validate, Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, Min, Max } from 'class-validator';

import Cidade from './cidade.entity';

/**
 * A Empresa.
 */
@Entity('tb_empresa')
export default class Empresa extends BaseEntity {
  @Column({ name: 'EMPRESA', length: 100 })
  empresa: string;

  @Column({ name: 'NOME', length: 60 })
  nome: string;

  @Column({ name: 'EMAIL', length: 100 })
  email: string;

  @Column({ name: 'CPF', length: 20 })
  cpf: string;

  @Column({ name: 'RG', length: 30 })
  rg: string;

  @Column({ type: 'date', name: 'NASCIMENTO' })
  nascimento: any;

  @Column({ type: 'integer', name: 'SEXO' })
  sexo: number;

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

  /**
   * @dbName CELULAR1@@
   */
  @Column({ name: 'CELULAR1', length: 20 })
  celular1: string;

  /**
   * @dbName CELULAR2@@
   */
  @Column({ name: 'CELULAR2', length: 20 })
  celular2: string;

  @Column({ name: 'CEP', length: 10 })
  cep: string;

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

  @Column({ type: 'integer', name: 'TIPO', nullable: false })
  tipo: number;

  @ManyToOne(type => Cidade)
  @JoinColumn({ name: 'ID_CIDADE', referencedColumnName: 'id' })
  cidade: Cidade;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
