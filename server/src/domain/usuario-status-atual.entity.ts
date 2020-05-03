/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { validate, Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, Min, Max } from 'class-validator';

/**
 * A UsuarioStatusAtual.
 */
@Entity('usuario_status_atual')
export default class UsuarioStatusAtual extends BaseEntity {
  @Column({ name: 'id_usuario' })
  idUsuario: string;

  @Column({ type: 'integer', name: 'status_atual' })
  statusAtual: number;

  @Column({ name: 'obs', length: 255 })
  obs: string;

  @Column({ type: 'integer', name: 'ativo' })
  ativo: number;

  @Column({ type: 'timestamp', name: 'data_post', nullable: false })
  dataPost: any;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
