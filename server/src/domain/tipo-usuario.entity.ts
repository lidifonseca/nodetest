/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { validate, Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, Min, Max } from 'class-validator';

import Usuario from './usuario.entity';

/**
 * A TipoUsuario.
 */
@Entity('tipo_usuario')
export default class TipoUsuario extends BaseEntity {
  @Column({ name: 'tipo_usuario', length: 30 })
  tipoUsuario: string;

  @Column({ type: 'integer', name: 'ativo' })
  ativo: number;

  @Column({ type: 'timestamp', name: 'data_post', nullable: false })
  dataPost: any;

  @OneToMany(
    type => Usuario,
    other => other.idTipoUsuario
  )
  usuarios: Usuario[];

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
