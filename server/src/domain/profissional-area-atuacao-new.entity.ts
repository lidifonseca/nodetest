/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { validate, Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, Min, Max } from 'class-validator';

/**
 * A ProfissionalAreaAtuacaoNew.
 */
@Entity('profissional_area_atuacao_new')
export default class ProfissionalAreaAtuacaoNew extends BaseEntity {
  @Column({ name: 'id_profissional' })
  idProfissional: string;

  @Column({ name: 'cep_area', length: 10 })
  cepArea: string;

  @Column({ name: 'cep_fim', length: 10 })
  cepFim: string;

  @Column({ type: 'integer', name: 'ativo' })
  ativo: number;

  @Column({ name: 'cep_ini', length: 45 })
  cepIni: string;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
