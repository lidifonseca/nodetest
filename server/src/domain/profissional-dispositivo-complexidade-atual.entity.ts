/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { validate, Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, Min, Max } from 'class-validator';

/**
 * A ProfissionalDispositivoComplexidadeAtual.
 */
@Entity('tb_profissional_dispositivo_complexidade_atual')
export default class ProfissionalDispositivoComplexidadeAtual extends BaseEntity {
  @Column({ type: 'integer', name: 'ID_PROFISSIONAL', nullable: false })
  idProfissional: number;

  @Column({ type: 'integer', name: 'ID_PROFISSIONAL_DISPOSITIVO_COMPLEXIDADE', nullable: false })
  idProfissionalDispositivoComplexidade: number;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
