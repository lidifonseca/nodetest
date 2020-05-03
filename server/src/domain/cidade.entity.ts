/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { validate, Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, Min, Max } from 'class-validator';

import Atendimento from './atendimento.entity';
import Empresa from './empresa.entity';
import Uf from './uf.entity';

/**
 * A Cidade.
 */
@Entity('cidade')
export default class Cidade extends BaseEntity {
  @Column({ name: 'descr_cidade', length: 255 })
  descrCidade: string;

  @Column({ type: 'timestamp', name: 'data_post', nullable: false })
  dataPost: any;

  @OneToMany(
    type => Atendimento,
    other => other.idCidade
  )
  atendimentos: Atendimento[];

  @OneToMany(
    type => Empresa,
    other => other.idCidade
  )
  empresas: Empresa[];

  @ManyToOne(type => Uf)
  idUf: Uf;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
