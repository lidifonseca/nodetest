/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { validate, Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, Min, Max } from 'class-validator';

/**
 * A Resultados.
 */
@Entity('tb_resultados')
export default class Resultados extends BaseEntity {
  @Column({ name: 'OBJETIVO', length: 145 })
  objetivo: string;

  @Column({ name: 'VALOR', length: 145 })
  valor: string;

  @Column({ name: 'PRAZO', length: 145 })
  prazo: string;

  @Column({ name: 'COMPLEMENTO', length: 245 })
  complemento: string;

  @Column({ type: 'timestamp', name: 'DATA_CADASTRO' })
  dataCadastro: any;

  @Column({ type: 'date', name: 'DATA_VENCIMENTO_PRAZO' })
  dataVencimentoPrazo: any;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
