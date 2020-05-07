/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { validate, Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, Min, Max } from 'class-validator';

/**
 * A ProfissionalAreaAtuacao.
 */
@Entity('tb_profissional_area_atuacao')
export default class ProfissionalAreaAtuacao extends BaseEntity {
  @Column({ name: 'ID_PROFISSIONAL' })
  idProfissional: string;

  @Column({ name: 'CEP_AREA', length: 10 })
  cepArea: string;

  @Column({ name: 'CEP_FIM', length: 10 })
  cepFim: string;

  @Column({ type: 'integer', name: 'ATIVO' })
  ativo: number;

  @Column({ name: 'CEP_INI', length: 45 })
  cepIni: string;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
