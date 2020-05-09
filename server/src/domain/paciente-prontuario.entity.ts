/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { validate, Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, Min, Max } from 'class-validator';

/**
 * A PacienteProntuario.
 */
@Entity('tb_paciente_prontuario')
export default class PacienteProntuario extends BaseEntity {
  @Column({ name: 'ID_PACIENTE', nullable: false })
  idPaciente: string;

  @Column({ type: 'integer', name: 'ID_TIPO_PRONTUARIO', nullable: false })
  idTipoProntuario: number;

  @Column({ name: 'O_QUE' })
  oQue: string;

  @Column({ name: 'RESULTADO' })
  resultado: string;

  @Column({ type: 'boolean', name: 'ATIVO', nullable: false })
  ativo: boolean;

  @Column({ type: 'integer', name: 'ID_ESPECIALIDADE' })
  idEspecialidade: number;

  @Column({ type: 'timestamp', name: 'DATA_CONSULTA' })
  dataConsulta: any;

  @Column({ type: 'integer', name: 'ID_EXAME' })
  idExame: number;

  @Column({ type: 'integer', name: 'ID_TIPO_EXAME' })
  idTipoExame: number;

  @Column({ type: 'date', name: 'DATA_EXAME' })
  dataExame: any;

  @Column({ type: 'date', name: 'DATA_INTERNACAO' })
  dataInternacao: any;

  @Column({ type: 'date', name: 'DATA_ALTA' })
  dataAlta: any;

  @Column({ type: 'date', name: 'DATA_PS' })
  dataPs: any;

  @Column({ type: 'date', name: 'DATA_OCORRENCIA' })
  dataOcorrencia: any;

  @Column({ type: 'integer', name: 'ID_OCORRENCIA_PRONTUARIO' })
  idOcorrenciaProntuario: number;

  @Column({ type: 'date', name: 'DATA_MANIFESTACAO' })
  dataManifestacao: any;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
