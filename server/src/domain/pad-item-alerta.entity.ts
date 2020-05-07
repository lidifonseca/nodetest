/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { validate, Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, Min, Max } from 'class-validator';

/**
 * A PadItemAlerta.
 */
@Entity('tb_pad_item_alerta')
export default class PadItemAlerta extends BaseEntity {
  @Column({ type: 'integer', name: 'PAD_ITEM_META_ID', nullable: false })
  padItemMetaId: number;

  @Column({ type: 'timestamp', name: 'ENVIO_EMAIL_EM' })
  envioEmailEm: any;

  @Column({ type: 'timestamp', name: 'VISUALIZADO_EM' })
  visualizadoEm: any;

  @Column({ type: 'timestamp', name: 'CRIADO_EM' })
  criadoEm: any;

  @Column({ type: 'boolean', name: 'ATIVO', nullable: false })
  ativo: boolean;

  @Column({ name: 'MENSAGEM', length: 100 })
  mensagem: string;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
