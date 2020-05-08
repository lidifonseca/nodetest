/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { validate, Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, Min, Max } from 'class-validator';

import FranquiaAreaAtuacao from './franquia-area-atuacao.entity';
import FranquiaStatusAtual from './franquia-status-atual.entity';
import FranquiaUsuario from './franquia-usuario.entity';

/**
 * A Franquia.
 */
@Entity('tb_franquia')
export default class Franquia extends BaseEntity {
  @Column({ name: 'ID_CIDADE' })
  idCidade: string;

  @Column({ name: 'NOME_FANTASIA', length: 100 })
  nomeFantasia: string;

  @Column({ name: 'RAZAO_SOCIAL', length: 150 })
  razaoSocial: string;

  @Column({ name: 'CNPJ', length: 20 })
  cnpj: string;

  @Column({ name: 'IE', length: 30 })
  ie: string;

  @Column({ name: 'SITE', length: 100 })
  site: string;

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

  @Column({ name: 'CELULAR', length: 20 })
  celular: string;

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

  @Column({ name: 'OBSERVACAO', length: 255 })
  observacao: string;

  @Column({ type: 'integer', name: 'ATIVO' })
  ativo: number;

  @OneToMany(
    type => FranquiaAreaAtuacao,
    other => other.franquia
  )
  franquiaAreaAtuacaos: FranquiaAreaAtuacao[];

  @OneToMany(
    type => FranquiaStatusAtual,
    other => other.franquia
  )
  franquiaStatusAtuals: FranquiaStatusAtual[];

  @OneToMany(
    type => FranquiaUsuario,
    other => other.franquia
  )
  franquiaUsuarios: FranquiaUsuario[];

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
