/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { validate, Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, Min, Max } from 'class-validator';

/**
 * A CepbrCidade.
 */
@Entity('cepbr_cidade')
export default class CepbrCidade extends BaseEntity {
  @Column({ type: 'integer', name: 'id_cidade', nullable: false })
  idCidade: number;

  @Column({ name: 'cidade', length: 100 })
  cidade: string;

  @Column({ name: 'cod_ibge', length: 10, nullable: false })
  codIbge: string;

  @Column({ type: 'float', name: 'area', nullable: false })
  area: number;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
