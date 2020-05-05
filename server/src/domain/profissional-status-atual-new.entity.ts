/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { validate, Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, Min, Max } from 'class-validator';

/**
 * A ProfissionalStatusAtualNew.
 */
@Entity('profissional_status_atual_new')
export default class ProfissionalStatusAtualNew extends BaseEntity {
  @Column({ name: 'id_profissional' })
  idProfissional: string;

  @Column({ type: 'integer', name: 'id_status_atual_prof' })
  idStatusAtualProf: number;

  @Column({ name: 'obs', length: 65535 })
  obs: string;

  @Column({ type: 'integer', name: 'ativo' })
  ativo: number;

  @Column({ name: 'id_usuario', nullable: false })
  idUsuario: string;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
