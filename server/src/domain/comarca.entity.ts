/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { validate, Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, Min, Max } from 'class-validator';

import Processo from './processo.entity';
import Pesquisa from './pesquisa.entity';
import Estado from './estado.entity';

/**
 * A Comarca.
 */
@Entity('comarca')
export default class Comarca extends BaseEntity {
  @Column({ type: 'integer', name: 'tjid', nullable: false })
  tjid: number;

  @Column({ name: 'nome', nullable: false })
  nome: string;

  @OneToMany(
    type => Processo,
    other => other.comarca
  )
  processos: Processo[];

  @OneToMany(
    type => Pesquisa,
    other => other.comarcas
  )
  pesquisas: Pesquisa[];

  @ManyToOne(type => Estado)
  estado: Estado;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
