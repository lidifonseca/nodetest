/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { validate, Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, Min, Max } from 'class-validator';

/**
 * A NotificacaoConfig.
 */
@Entity('tb_notificacao_config')
export default class NotificacaoConfig extends BaseEntity {
  @Column({ type: 'timestamp', name: 'CRIADO_EM', nullable: false })
  criadoEm: any;

  @Column({ name: 'TITULO', length: 50, nullable: false })
  titulo: string;

  /**
   * Este campo é usado como uma chave para identificar qual a notificação à ser tratada. Pode ser o nome da função que controla o envio de push/email para o paciente e/ou profissionais.
   */
  @Column({ name: 'REFERENCIA', length: 50, nullable: false })
  referencia: string;

  @Column({ name: 'DESCRICAO' })
  descricao: string;

  /**
   * 0 = Inativo / 1 = Ativo
   */
  @Column({ type: 'boolean', name: 'ATIVO', nullable: false })
  ativo: boolean;

  /**
   * Caso valor=1 o app obriga o usário escolher envios por push e/ou email.
   */
  @Column({ type: 'boolean', name: 'ENVIO_OBRIGATORIO', nullable: false })
  envioObrigatorio: boolean;

  @Column({ type: 'boolean', name: 'SERVE_PROFISSIONAL', nullable: false })
  serveProfissional: boolean;

  @Column({ type: 'boolean', name: 'SERVE_PACIENTE', nullable: false })
  servePaciente: boolean;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
