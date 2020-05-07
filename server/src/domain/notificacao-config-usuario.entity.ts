/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { validate, Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, Min, Max } from 'class-validator';

/**
 * A NotificacaoConfigUsuario.
 */
@Entity('tb_notificacao_config_usuario')
export default class NotificacaoConfigUsuario extends BaseEntity {
  @Column({ type: 'integer', name: 'NOTIFICACAO_CONFIG_ID', nullable: false })
  notificacaoConfigId: number;

  @Column({ type: 'integer', name: 'PROFISSIONAL_ID' })
  profissionalId: number;

  @Column({ type: 'integer', name: 'PACIENTE_ID' })
  pacienteId: number;

  @Column({ type: 'timestamp', name: 'ATUALIZADO_EM', nullable: false })
  atualizadoEm: any;

  @Column({ type: 'integer', name: 'ATUALIZADO_POR' })
  atualizadoPor: number;

  @Column({ type: 'boolean', name: 'ENVIAR_PUSH', nullable: false })
  enviarPush: boolean;

  @Column({ type: 'boolean', name: 'ENVIAR_EMAIL', nullable: false })
  enviarEmail: boolean;

  @Column({ name: 'OBSERVACAO', length: 100 })
  observacao: string;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
