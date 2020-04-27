/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { validate, Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, Min, Max } from 'class-validator';

import Pesquisa from './pesquisa.entity';
import Comarca from './comarca.entity';

/**
 * A Estado.
 */
@Entity('estado')
export default class Estado extends BaseEntity {
  @Column({ name: 'nome', nullable: false })
  nome: string;

  @Column({ name: 'sigla', nullable: false })
  sigla: string;

  @OneToMany(
    type => Pesquisa,
    other => other.estado
  )
  pesquisas: Pesquisa[];

  @OneToMany(
    type => Comarca,
    other => other.estado
  )
  comarcas: Comarca[];

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
