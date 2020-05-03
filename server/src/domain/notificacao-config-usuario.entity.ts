/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { validate, Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, Min, Max } from 'class-validator';

/**
 * A NotificacaoConfigUsuario.
 */
@Entity('notificacao_config_usuario')
export default class NotificacaoConfigUsuario extends BaseEntity {
  @Column({ type: 'integer', name: 'notificacao_config_id', nullable: false })
  notificacaoConfigId: number;

  @Column({ type: 'integer', name: 'profissional_id' })
  profissionalId: number;

  @Column({ type: 'integer', name: 'paciente_id' })
  pacienteId: number;

  @Column({ type: 'timestamp', name: 'atualizado_em', nullable: false })
  atualizadoEm: any;

  @Column({ type: 'integer', name: 'atualizado_por' })
  atualizadoPor: number;

  @Column({ type: 'boolean', name: 'enviar_push', nullable: false })
  enviarPush: boolean;

  @Column({ type: 'boolean', name: 'enviar_email', nullable: false })
  enviarEmail: boolean;

  @Column({ name: 'observacao', length: 100 })
  observacao: string;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
