/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { validate, Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, Min, Max } from 'class-validator';

import CepbrCidade from './cepbr-cidade.entity';

/**
 * A CepbrEstado.
 */
@Entity('cepbr_estado')
export default class CepbrEstado extends BaseEntity {
  @Column({ name: 'uf', length: 2, nullable: false })
  uf: string;

  @Column({ name: 'estado', length: 100 })
  estado: string;

  @Column({ name: 'cod_ibge', length: 10, nullable: false })
  codIbge: string;

  @OneToMany(
    type => CepbrCidade,
    other => other.uf
  )
  cepbrCidades: CepbrCidade[];

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
