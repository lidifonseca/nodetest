/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { validate, Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, Min, Max } from 'class-validator';

import AtendimentoAceite from './atendimento-aceite.entity';
import AtendimentoAssinaturas from './atendimento-assinaturas.entity';
import UnidadeEasy from './unidade-easy.entity';

/**
 * A Profissional.
 */
@Entity('profissional')
export default class Profissional extends BaseEntity {
  @Column({ name: 'id_cidade' })
  idCidade: string;

  @Column({ type: 'integer', name: 'id_tempo_experiencia' })
  idTempoExperiencia: number;

  @Column({ type: 'integer', name: 'id_banco' })
  idBanco: number;

  @Column({ name: 'senha', length: 100 })
  senha: string;

  @Column({ name: 'nome', length: 60 })
  nome: string;

  @Column({ name: 'email', length: 100 })
  email: string;

  @Column({ name: 'cpf', length: 20 })
  cpf: string;

  @Column({ name: 'rg', length: 30 })
  rg: string;

  @Column({ name: 'nome_empresa', length: 150 })
  nomeEmpresa: string;

  @Column({ name: 'cnpj', length: 20 })
  cnpj: string;

  @Column({ name: 'registro', length: 50 })
  registro: string;

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

  @Column({ type: 'integer', name: 'atende_crianca' })
  atendeCrianca: number;

  @Column({ type: 'integer', name: 'atende_idoso' })
  atendeIdoso: number;

  @Column({ name: 'ag', length: 10 })
  ag: string;

  @Column({ name: 'conta', length: 25 })
  conta: string;

  @Column({ name: 'tipo_conta', length: 20 })
  tipoConta: string;

  @Column({ name: 'origem_cadastro', length: 100 })
  origemCadastro: string;

  @Column({ name: 'obs', length: 65535 })
  obs: string;

  @Column({ name: 'chave_privada', length: 255 })
  chavePrivada: string;

  @Column({ type: 'integer', name: 'ativo' })
  ativo: number;

  @Column({ name: 'senha_original', length: 100 })
  senhaOriginal: string;

  @Column({ type: 'timestamp', name: 'data_senha' })
  dataSenha: any;

  @Column({ name: 'expo_token', length: 255 })
  expoToken: string;

  @Column({ type: 'integer', name: 'preferencia_atendimento' })
  preferenciaAtendimento: number;

  @Column({ name: 'senha_chat', length: 45 })
  senhaChat: string;

  @OneToMany(
    type => AtendimentoAceite,
    other => other.idProfissional
  )
  atendimentoAceites: AtendimentoAceite[];

  @OneToMany(
    type => AtendimentoAssinaturas,
    other => other.idProfissional
  )
  atendimentoAssinaturas: AtendimentoAssinaturas[];

  @ManyToOne(type => UnidadeEasy)
  unidade: UnidadeEasy;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
