/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { validate, Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, Min, Max } from 'class-validator';

/**
 * A ProfissionalEspecialidade.
 */
@Entity('tb_profissional_especialidade')
export default class ProfissionalEspecialidade extends BaseEntity {
  @Column({ type: 'integer', name: 'ID_ESPECIALIDADE', nullable: false })
  idEspecialidade: number;

  @Column({ name: 'ID_PROFISSIONAL', nullable: false })
  idProfissional: string;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
