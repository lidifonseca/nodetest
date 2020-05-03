/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { validate, Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, Min, Max } from 'class-validator';

import CepbrCidade from './cepbr-cidade.entity';
import CepbrBairro from './cepbr-bairro.entity';

/**
 * A CepbrEndereco.
 */
@Entity('cepbr_endereco')
export default class CepbrEndereco extends BaseEntity {
  @Column({ name: 'cep', length: 10, nullable: false })
  cep: string;

  @Column({ name: 'logradouro', length: 200 })
  logradouro: string;

  @Column({ name: 'tipo_logradouro', length: 80 })
  tipoLogradouro: string;

  @Column({ name: 'complemento', length: 100 })
  complemento: string;

  @Column({ name: 'local', length: 120 })
  local: string;

  @ManyToOne(type => CepbrCidade)
  idCidade: CepbrCidade;

  @ManyToOne(type => CepbrBairro)
  idBairro: CepbrBairro;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
