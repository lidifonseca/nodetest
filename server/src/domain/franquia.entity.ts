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
@Entity('franquia')
export default class Franquia extends BaseEntity {
  @Column({ name: 'id_cidade' })
  idCidade: string;

  @Column({ name: 'nome_fantasia', length: 100 })
  nomeFantasia: string;

  @Column({ name: 'razao_social', length: 150 })
  razaoSocial: string;

  @Column({ name: 'cnpj', length: 20 })
  cnpj: string;

  @Column({ name: 'ie', length: 30 })
  ie: string;

  @Column({ name: 'site', length: 100 })
  site: string;

  @Column({ name: 'telefone_1', length: 20 })
  telefone1: string;

  @Column({ name: 'telefone_2', length: 20 })
  telefone2: string;

  @Column({ name: 'celular', length: 20 })
  celular: string;

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

  @Column({ name: 'observacao', length: 255 })
  observacao: string;

  @Column({ type: 'integer', name: 'ativo' })
  ativo: number;

  @Column({ type: 'timestamp', name: 'data_post', nullable: false })
  dataPost: any;

  @OneToMany(
    type => FranquiaAreaAtuacao,
    other => other.idFranquia
  )
  franquiaAreaAtuacaos: FranquiaAreaAtuacao[];

  @OneToMany(
    type => FranquiaStatusAtual,
    other => other.idFranquia
  )
  franquiaStatusAtuals: FranquiaStatusAtual[];

  @OneToMany(
    type => FranquiaUsuario,
    other => other.idFranquia
  )
  franquiaUsuarios: FranquiaUsuario[];

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
