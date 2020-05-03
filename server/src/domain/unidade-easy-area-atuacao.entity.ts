/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { validate, Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, Min, Max } from 'class-validator';

import UnidadeEasy from './unidade-easy.entity';

/**
 * A UnidadeEasyAreaAtuacao.
 */
@Entity('unidade_easy_area_atuacao')
export default class UnidadeEasyAreaAtuacao extends BaseEntity {
  @Column({ name: 'cep_inicial', length: 10 })
  cepInicial: string;

  @Column({ name: 'cep_final', length: 10 })
  cepFinal: string;

  @ManyToOne(type => UnidadeEasy)
  idUnidade: UnidadeEasy;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
