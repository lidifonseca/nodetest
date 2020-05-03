/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { validate, Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, Min, Max } from 'class-validator';

/**
 * A PacienteProntuario.
 */
@Entity('paciente_prontuario')
export default class PacienteProntuario extends BaseEntity {
  @Column({ name: 'id_paciente', nullable: false })
  idPaciente: string;

  @Column({ type: 'integer', name: 'id_tipo_prontuario', nullable: false })
  idTipoProntuario: number;

  @Column({ name: 'o_que', length: 255 })
  oQue: string;

  @Column({ name: 'resultado', length: 255 })
  resultado: string;

  @Column({ type: 'integer', name: 'ativo', nullable: false })
  ativo: number;

  @Column({ name: 'id_usuario' })
  idUsuario: string;

  @Column({ type: 'integer', name: 'id_especialidade' })
  idEspecialidade: number;

  @Column({ type: 'timestamp', name: 'data_consulta' })
  dataConsulta: any;

  @Column({ type: 'integer', name: 'id_exame' })
  idExame: number;

  @Column({ type: 'integer', name: 'id_tipo_exame' })
  idTipoExame: number;

  @Column({ type: 'date', name: 'data_exame' })
  dataExame: any;

  @Column({ type: 'date', name: 'data_internacao' })
  dataInternacao: any;

  @Column({ type: 'date', name: 'data_alta' })
  dataAlta: any;

  @Column({ type: 'date', name: 'data_ps' })
  dataPs: any;

  @Column({ type: 'date', name: 'data_ocorrencia' })
  dataOcorrencia: any;

  @Column({ type: 'integer', name: 'id_ocorrencia_prontuario' })
  idOcorrenciaProntuario: number;

  @Column({ type: 'timestamp', name: 'data_post' })
  dataPost: any;

  @Column({ type: 'date', name: 'data_manifestacao' })
  dataManifestacao: any;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
