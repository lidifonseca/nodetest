/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { validate, Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, Min, Max } from 'class-validator';

/**
 * A PacientePush.
 */
@Entity('tb_paciente_push')
export default class PacientePush extends BaseEntity {
  @Column({ name: 'ID_FRANQUIA' })
  idFranquia: string;

  @Column({ name: 'MENSAGEM', length: 255 })
  mensagem: string;

  @Column({ type: 'integer', name: 'ATIVO' })
  ativo: number;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
