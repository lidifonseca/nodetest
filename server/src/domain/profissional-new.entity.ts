/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { validate, Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, Min, Max } from 'class-validator';

import UnidadeEasy from './unidade-easy.entity';

/**
 * A ProfissionalNew.
 */
@Entity('tb_profissional_new')
export default class ProfissionalNew extends BaseEntity {
  @Column({ name: 'ID_CIDADE' })
  idCidade: string;

  @Column({ type: 'integer', name: 'ID_TEMPO_EXPERIENCIA' })
  idTempoExperiencia: number;

  @Column({ type: 'integer', name: 'ID_BANCO' })
  idBanco: number;

  @Column({ name: 'SENHA', length: 100 })
  senha: string;

  @Column({ name: 'NOME', length: 60 })
  nome: string;

  @Column({ name: 'EMAIL', length: 100 })
  email: string;

  @Column({ name: 'CPF', length: 20 })
  cpf: string;

  @Column({ name: 'RG', length: 30 })
  rg: string;

  @Column({ name: 'NOME_EMPRESA', length: 150 })
  nomeEmpresa: string;

  @Column({ name: 'CNPJ', length: 20 })
  cnpj: string;

  @Column({ name: 'REGISTRO', length: 50 })
  registro: string;

  @Column({ type: 'date', name: 'NASCIMENTO' })
  nascimento: any;

  @Column({ type: 'integer', name: 'SEXO' })
  sexo: number;

  /**
   *
   */
  @Column({ name: 'TELEFONE1', length: 20 })
  telefone1: string;

  /**
   *
   */
  @Column({ name: 'TELEFONE2', length: 20 })
  telefone2: string;

  /**
   *
   */
  @Column({ name: 'CELULAR1', length: 20 })
  celular1: string;

  /**
   *
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

  @Column({ type: 'integer', name: 'ATENDE_CRIANCA' })
  atendeCrianca: number;

  @Column({ type: 'integer', name: 'ATENDE_IDOSO' })
  atendeIdoso: number;

  @Column({ name: 'AG', length: 10 })
  ag: string;

  @Column({ name: 'CONTA', length: 25 })
  conta: string;

  @Column({ name: 'TIPO_CONTA', length: 20 })
  tipoConta: string;

  @Column({ name: 'ORIGEM_CADASTRO', length: 100 })
  origemCadastro: string;

  @Column({ name: 'OBS' })
  obs: string;

  @Column({ name: 'CHAVE_PRIVADA', length: 255 })
  chavePrivada: string;

  @Column({ type: 'integer', name: 'ATIVO' })
  ativo: number;

  @ManyToOne(type => UnidadeEasy)
  @JoinColumn({ name: 'ID_UNIDADE', referencedColumnName: 'id' })
  unidade: UnidadeEasy;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
