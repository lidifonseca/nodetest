/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { validate, Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, Min, Max } from 'class-validator';

/**
 * A ProntuarioMotivoManifestacao.
 */
@Entity('tb_prontuario_motivo_manifestacao')
export default class ProntuarioMotivoManifestacao extends BaseEntity {
  @Column({ type: 'integer', name: 'ID_PRONTUARIO', nullable: false })
  idProntuario: number;

  @Column({ type: 'integer', name: 'ID_PACIENTE', nullable: false })
  idPaciente: number;

  @Column({ type: 'integer', name: 'ID_MOTIVO' })
  idMotivo: number;

  @Column({ type: 'integer', name: 'ID_MOTIVO_FILHO' })
  idMotivoFilho: number;

  @Column({ type: 'integer', name: 'ID_MANIFESTACAO' })
  idManifestacao: number;

  @Column({ type: 'integer', name: 'ID_MANIFESTACAO_FILHO' })
  idManifestacaoFilho: number;

  @Column({ name: 'SUGESTAO' })
  sugestao: string;

  @Column({ name: 'INFORMACAO_ADICIONAL' })
  informacaoAdicional: string;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
