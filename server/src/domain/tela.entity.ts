/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { validate, Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, Min, Max } from 'class-validator';

import LogUser from './log-user.entity';
import LogUserFranquia from './log-user-franquia.entity';
import UsuarioAcao from './usuario-acao.entity';

/**
 * A Tela.
 */
@Entity('tela')
export default class Tela extends BaseEntity {
  @Column({ name: 'tela', length: 100 })
  tela: string;

  @OneToMany(
    type => LogUser,
    other => other.idTela
  )
  logUsers: LogUser[];

  @OneToMany(
    type => LogUserFranquia,
    other => other.idTela
  )
  logUserFranquias: LogUserFranquia[];

  @OneToMany(
    type => UsuarioAcao,
    other => other.idTela
  )
  usuarioAcaos: UsuarioAcao[];

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
