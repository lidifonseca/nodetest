/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { validate, Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, Min, Max } from 'class-validator';

/**
 * A ProfissionalPush.
 */
@Entity('profissional_push')
export default class ProfissionalPush extends BaseEntity {
  @Column({ name: 'id_profissional' })
  idProfissional: string;

  @Column({ name: 'id_franquia' })
  idFranquia: string;

  @Column({ name: 'mensagem', length: 255 })
  mensagem: string;

  @Column({ type: 'integer', name: 'ativo' })
  ativo: number;

  @Column({ type: 'timestamp', name: 'data_post', nullable: false })
  dataPost: any;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
