/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { validate, Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, Min, Max } from 'class-validator';

import Tela from './tela.entity';
import Acao from './acao.entity';

/**
 * A UsuarioAcao.
 */
@Entity('usuario_acao')
export default class UsuarioAcao extends BaseEntity {
  @Column({ name: 'id_usuario' })
  idUsuario: string;

  @Column({ type: 'integer', name: 'id_atendimento' })
  idAtendimento: number;

  @Column({ name: 'descricao', length: 255 })
  descricao: string;

  @Column({ type: 'timestamp', name: 'data_post', nullable: false })
  dataPost: any;

  @ManyToOne(type => Tela)
  idTela: Tela;

  @ManyToOne(type => Acao)
  idAcao: Acao;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
