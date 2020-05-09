/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { validate, Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, Min, Max } from 'class-validator';

import LogUserFranquia from './log-user-franquia.entity';
import Franquia from './franquia.entity';

/**
 * A FranquiaUsuario.
 */
@Entity('tb_franquia_usuario')
export default class FranquiaUsuario extends BaseEntity {
  @Column({ name: 'SENHA', length: 100 })
  senha: string;

  @Column({ name: 'NOME', length: 60 })
  nome: string;

  @Column({ name: 'EMAIL', length: 100 })
  email: string;

  @Column({ type: 'integer', name: 'VER_PROFISSIONAL' })
  verProfissional: number;

  @Column({ type: 'integer', name: 'CAD_PROFISSIONAL' })
  cadProfissional: number;

  @Column({ type: 'integer', name: 'EDI_PROFISSIONAL' })
  ediProfissional: number;

  @Column({ type: 'integer', name: 'DEL_PROFISSIONAL' })
  delProfissional: number;

  @Column({ type: 'integer', name: 'REL_PROFISSIONAL' })
  relProfissional: number;

  @Column({ type: 'integer', name: 'VER_PACIENTE' })
  verPaciente: number;

  @Column({ type: 'integer', name: 'CAD_PACIENTE' })
  cadPaciente: number;

  @Column({ type: 'integer', name: 'EDI_PACIENTE' })
  ediPaciente: number;

  @Column({ type: 'integer', name: 'DEL_PACIENTE' })
  delPaciente: number;

  @Column({ type: 'integer', name: 'REL_PACIENTE' })
  relPaciente: number;

  @Column({ type: 'integer', name: 'VER_PAD' })
  verPad: number;

  @Column({ type: 'integer', name: 'CAD_PAD' })
  cadPad: number;

  @Column({ type: 'integer', name: 'EDI_PAD' })
  ediPad: number;

  @Column({ type: 'integer', name: 'DEL_PAD' })
  delPad: number;

  @Column({ type: 'integer', name: 'REL_PAD' })
  relPad: number;

  @Column({ type: 'integer', name: 'VER_ATENDIMENTO' })
  verAtendimento: number;

  @Column({ type: 'integer', name: 'CAD_ATENDIMENTO' })
  cadAtendimento: number;

  @Column({ type: 'integer', name: 'EDI_ATENDIMENTO' })
  ediAtendimento: number;

  @Column({ type: 'integer', name: 'DEL_ATENDIMENTO' })
  delAtendimento: number;

  @Column({ type: 'integer', name: 'REL_ATENDIMENTO' })
  relAtendimento: number;

  @Column({ type: 'integer', name: 'VER_PUSH' })
  verPush: number;

  @Column({ type: 'integer', name: 'CAD_PUSH' })
  cadPush: number;

  @Column({ type: 'integer', name: 'VER_ESPECIALIDADE_VALOR' })
  verEspecialidadeValor: number;

  @Column({ type: 'integer', name: 'CAD_ESPECIALIDADE_VALOR' })
  cadEspecialidadeValor: number;

  @Column({ type: 'integer', name: 'EDI_ESPECIALIDADE_VALOR' })
  ediEspecialidadeValor: number;

  @Column({ type: 'integer', name: 'DEL_ESPECIALIDADE_VALOR' })
  delEspecialidadeValor: number;

  @Column({ type: 'integer', name: 'VER_USUARIO' })
  verUsuario: number;

  @Column({ type: 'integer', name: 'CAD_USUARIO' })
  cadUsuario: number;

  @Column({ type: 'integer', name: 'EDI_USUARIO' })
  ediUsuario: number;

  @Column({ type: 'integer', name: 'DEL_USUARIO' })
  delUsuario: number;

  @Column({ type: 'integer', name: 'ENVIO_RECUSA' })
  envioRecusa: number;

  @Column({ type: 'integer', name: 'ENVIO_INTERCORRENCIA' })
  envioIntercorrencia: number;

  @Column({ type: 'integer', name: 'ENVIO_CANCELAMENTO' })
  envioCancelamento: number;

  @Column({ type: 'boolean', name: 'ATIVO' })
  ativo: boolean;

  @OneToMany(
    type => LogUserFranquia,
    other => other.usuario
  )
  logUserFranquias: LogUserFranquia[];

  @ManyToOne(type => Franquia)
  @JoinColumn({ name: 'ID_FRANQUIA', referencedColumnName: 'id' })
  franquia: Franquia;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
