/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { validate, Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, Min, Max } from 'class-validator';

/**
 * A NotificacaoConfig.
 */
@Entity('notificacao_config')
export default class NotificacaoConfig extends BaseEntity {
  @Column({ type: 'timestamp', name: 'criado_em', nullable: false })
  criadoEm: any;

  @Column({ name: 'titulo', length: 50, nullable: false })
  titulo: string;

  /**
   * Este campo é usado como uma chave para identificar qual a notificação à ser tratada. Pode ser o nome da função que controla o envio de push/email para o paciente e/ou profissionais.
   */
  @Column({ name: 'referencia', length: 50, nullable: false })
  referencia: string;

  @Column({ name: 'descricao', length: 255 })
  descricao: string;

  /**
   * 0 = Inativo / 1 = Ativo
   */
  @Column({ type: 'boolean', name: 'ativo', nullable: false })
  ativo: boolean;

  /**
   * Caso valor=1 o app obriga o usário escolher envios por push e/ou email.
   */
  @Column({ type: 'boolean', name: 'envio_obrigatorio', nullable: false })
  envioObrigatorio: boolean;

  @Column({ type: 'boolean', name: 'serve_profissional', nullable: false })
  serveProfissional: boolean;

  @Column({ type: 'boolean', name: 'serve_paciente', nullable: false })
  servePaciente: boolean;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
