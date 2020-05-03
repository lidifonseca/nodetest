/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { validate, Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, Min, Max } from 'class-validator';

/**
 * A PadItemAlerta.
 */
@Entity('pad_item_alerta')
export default class PadItemAlerta extends BaseEntity {
  @Column({ type: 'integer', name: 'pad_item_meta_id', nullable: false })
  padItemMetaId: number;

  @Column({ type: 'timestamp', name: 'envio_email_em' })
  envioEmailEm: any;

  @Column({ type: 'timestamp', name: 'visualizado_em' })
  visualizadoEm: any;

  @Column({ type: 'timestamp', name: 'criado_em' })
  criadoEm: any;

  @Column({ type: 'boolean', name: 'ativo', nullable: false })
  ativo: boolean;

  @Column({ name: 'mensagem', length: 100 })
  mensagem: string;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
