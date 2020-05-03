/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { validate, Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, Min, Max } from 'class-validator';

/**
 * A ProfissionalEspecialidadeNew.
 */
@Entity('profissional_especialidade_new')
export default class ProfissionalEspecialidadeNew extends BaseEntity {
  @Column({ type: 'integer', name: 'id_especialidade', nullable: false })
  idEspecialidade: number;

  @Column({ name: 'id_profissional', nullable: false })
  idProfissional: string;

  @Column({ type: 'timestamp', name: 'data_post', nullable: false })
  dataPost: any;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
