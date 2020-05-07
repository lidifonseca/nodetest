/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { validate, Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, Min, Max } from 'class-validator';

/**
 * A ProfissionalHorario.
 */
@Entity('tb_profissional_horario')
export default class ProfissionalHorario extends BaseEntity {
  @Column({ type: 'integer', name: 'ID_ATENDIMENTO', nullable: false })
  idAtendimento: number;

  @Column({ type: 'integer', name: 'ID_PROFISSIONAL', nullable: false })
  idProfissional: number;

  @Column({ type: 'timestamp', name: 'HORARIO', nullable: false })
  horario: any;

  @Column({ type: 'integer', name: 'CONFIRM' })
  confirm: number;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
