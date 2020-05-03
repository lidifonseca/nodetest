/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { validate, Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, Min, Max } from 'class-validator';

import AlertasResultadosEsperados from './alertas-resultados-esperados.entity';

/**
 * A Resultados.
 */
@Entity('resultados')
export default class Resultados extends BaseEntity {
  @Column({ name: 'objetivo', length: 145 })
  objetivo: string;

  @Column({ name: 'valor', length: 145 })
  valor: string;

  @Column({ name: 'prazo', length: 145 })
  prazo: string;

  @Column({ name: 'complemento', length: 245 })
  complemento: string;

  @Column({ type: 'timestamp', name: 'data_cadastro' })
  dataCadastro: any;

  @Column({ type: 'date', name: 'data_vencimento_prazo' })
  dataVencimentoPrazo: any;

  @OneToMany(
    type => AlertasResultadosEsperados,
    other => other.resultadosId
  )
  alertasResultadosEsperados: AlertasResultadosEsperados[];

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
