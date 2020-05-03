/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { validate, Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, Min, Max } from 'class-validator';

import Cidade from './cidade.entity';

/**
 * A Empresa.
 */
@Entity('empresa')
export default class Empresa extends BaseEntity {
  @Column({ name: 'empresa', length: 100 })
  empresa: string;

  @Column({ name: 'nome', length: 60 })
  nome: string;

  @Column({ name: 'email', length: 100 })
  email: string;

  @Column({ name: 'cpf', length: 20 })
  cpf: string;

  @Column({ name: 'rg', length: 30 })
  rg: string;

  @Column({ type: 'date', name: 'nascimento' })
  nascimento: any;

  @Column({ type: 'integer', name: 'sexo' })
  sexo: number;

  @Column({ name: 'telefone_1', length: 20 })
  telefone1: string;

  @Column({ name: 'telefone_2', length: 20 })
  telefone2: string;

  @Column({ name: 'celular_1', length: 20 })
  celular1: string;

  @Column({ name: 'celular_2', length: 20 })
  celular2: string;

  @Column({ name: 'cep', length: 10 })
  cep: string;

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

  @Column({ type: 'integer', name: 'tipo', nullable: false })
  tipo: number;

  @ManyToOne(type => Cidade)
  idCidade: Cidade;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
