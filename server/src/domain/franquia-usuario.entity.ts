/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { validate, Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, Min, Max } from 'class-validator';

import LogUserFranquia from './log-user-franquia.entity';
import Franquia from './franquia.entity';

/**
 * A FranquiaUsuario.
 */
@Entity('franquia_usuario')
export default class FranquiaUsuario extends BaseEntity {
  @Column({ name: 'senha', length: 100 })
  senha: string;

  @Column({ name: 'nome', length: 60 })
  nome: string;

  @Column({ name: 'email', length: 100 })
  email: string;

  @Column({ type: 'integer', name: 'ver_profissional' })
  verProfissional: number;

  @Column({ type: 'integer', name: 'cad_profissional' })
  cadProfissional: number;

  @Column({ type: 'integer', name: 'edi_profissional' })
  ediProfissional: number;

  @Column({ type: 'integer', name: 'del_profissional' })
  delProfissional: number;

  @Column({ type: 'integer', name: 'rel_profissional' })
  relProfissional: number;

  @Column({ type: 'integer', name: 'ver_paciente' })
  verPaciente: number;

  @Column({ type: 'integer', name: 'cad_paciente' })
  cadPaciente: number;

  @Column({ type: 'integer', name: 'edi_paciente' })
  ediPaciente: number;

  @Column({ type: 'integer', name: 'del_paciente' })
  delPaciente: number;

  @Column({ type: 'integer', name: 'rel_paciente' })
  relPaciente: number;

  @Column({ type: 'integer', name: 'ver_pad' })
  verPad: number;

  @Column({ type: 'integer', name: 'cad_pad' })
  cadPad: number;

  @Column({ type: 'integer', name: 'edi_pad' })
  ediPad: number;

  @Column({ type: 'integer', name: 'del_pad' })
  delPad: number;

  @Column({ type: 'integer', name: 'rel_pad' })
  relPad: number;

  @Column({ type: 'integer', name: 'ver_atendimento' })
  verAtendimento: number;

  @Column({ type: 'integer', name: 'cad_atendimento' })
  cadAtendimento: number;

  @Column({ type: 'integer', name: 'edi_atendimento' })
  ediAtendimento: number;

  @Column({ type: 'integer', name: 'del_atendimento' })
  delAtendimento: number;

  @Column({ type: 'integer', name: 'rel_atendimento' })
  relAtendimento: number;

  @Column({ type: 'integer', name: 'ver_push' })
  verPush: number;

  @Column({ type: 'integer', name: 'cad_push' })
  cadPush: number;

  @Column({ type: 'integer', name: 'ver_especialidade_valor' })
  verEspecialidadeValor: number;

  @Column({ type: 'integer', name: 'cad_especialidade_valor' })
  cadEspecialidadeValor: number;

  @Column({ type: 'integer', name: 'edi_especialidade_valor' })
  ediEspecialidadeValor: number;

  @Column({ type: 'integer', name: 'del_especialidade_valor' })
  delEspecialidadeValor: number;

  @Column({ type: 'integer', name: 'ver_usuario' })
  verUsuario: number;

  @Column({ type: 'integer', name: 'cad_usuario' })
  cadUsuario: number;

  @Column({ type: 'integer', name: 'edi_usuario' })
  ediUsuario: number;

  @Column({ type: 'integer', name: 'del_usuario' })
  delUsuario: number;

  @Column({ type: 'integer', name: 'envio_recusa' })
  envioRecusa: number;

  @Column({ type: 'integer', name: 'envio_intercorrencia' })
  envioIntercorrencia: number;

  @Column({ type: 'integer', name: 'envio_cancelamento' })
  envioCancelamento: number;

  @Column({ type: 'integer', name: 'ativo' })
  ativo: number;

  @OneToMany(
    type => LogUserFranquia,
    other => other.idUsuario
  )
  logUserFranquias: LogUserFranquia[];

  @ManyToOne(type => Franquia)
  idFranquia: Franquia;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
