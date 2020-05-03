/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { validate, Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, Min, Max } from 'class-validator';

import Acao from './acao.entity';
import Tela from './tela.entity';
import FranquiaUsuario from './franquia-usuario.entity';

/**
 * A LogUserFranquia.
 */
@Entity('log_user_franquia')
export default class LogUserFranquia extends BaseEntity {
  @Column({ name: 'descricao', length: 255 })
  descricao: string;

  @Column({ type: 'timestamp', name: 'data_post', nullable: false })
  dataPost: any;

  @ManyToOne(type => Acao)
  idAcao: Acao;

  @ManyToOne(type => Tela)
  idTela: Tela;

  @ManyToOne(type => FranquiaUsuario)
  idUsuario: FranquiaUsuario;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
