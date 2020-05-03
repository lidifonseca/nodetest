/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { validate, Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, Min, Max } from 'class-validator';

import Franquia from './franquia.entity';

/**
 * A FranquiaAreaAtuacao.
 */
@Entity('franquia_area_atuacao')
export default class FranquiaAreaAtuacao extends BaseEntity {
  @Column({ name: 'cep_ini', length: 10 })
  cepIni: string;

  @Column({ name: 'cep_fim', length: 10 })
  cepFim: string;

  @Column({ type: 'integer', name: 'ativo' })
  ativo: number;

  @ManyToOne(type => Franquia)
  idFranquia: Franquia;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
