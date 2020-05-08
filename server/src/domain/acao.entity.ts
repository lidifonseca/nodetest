/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { validate, Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, Min, Max } from 'class-validator';

import LogUser from './log-user.entity';
import LogUserFranquia from './log-user-franquia.entity';
import UsuarioAcao from './usuario-acao.entity';

/**
 * A Acao.
 */
@Entity('tb_acao')
export default class Acao extends BaseEntity {
  @Column({ name: 'ACAO', length: 100 })
  acao: string;

  @OneToMany(
    type => LogUser,
    other => other.acao
  )
  logUsers: LogUser[];

  @OneToMany(
    type => LogUserFranquia,
    other => other.acao
  )
  logUserFranquias: LogUserFranquia[];

  @OneToMany(
    type => UsuarioAcao,
    other => other.acao
  )
  usuarioAcaos: UsuarioAcao[];

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
