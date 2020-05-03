/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { validate, Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, Min, Max } from 'class-validator';

/**
 * A ProntuarioMotivoManifestacao.
 */
@Entity('prontuario_motivo_manifestacao')
export default class ProntuarioMotivoManifestacao extends BaseEntity {
  @Column({ type: 'integer', name: 'id_prontuario', nullable: false })
  idProntuario: number;

  @Column({ type: 'integer', name: 'id_paciente', nullable: false })
  idPaciente: number;

  @Column({ type: 'integer', name: 'id_motivo' })
  idMotivo: number;

  @Column({ type: 'integer', name: 'id_motivo_filho' })
  idMotivoFilho: number;

  @Column({ type: 'integer', name: 'id_manifestacao' })
  idManifestacao: number;

  @Column({ type: 'integer', name: 'id_manifestacao_filho' })
  idManifestacaoFilho: number;

  @Column({ type: 'blob', name: 'sugestao' })
  sugestao: any;

  @Column({ type: 'integer', name: 'id_usuario' })
  idUsuario: number;

  @Column({ type: 'date', name: 'data_post' })
  dataPost: any;

  @Column({ type: 'blob', name: 'informacao_adicional' })
  informacaoAdicional: any;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
