/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { validate, Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, Min, Max } from 'class-validator';

/**
 * A PushnotificationEnvios.
 */
@Entity('tb_pushnotification_envios')
export default class PushnotificationEnvios extends BaseEntity {
  @Column({ name: 'REFERENCIA', length: 50, nullable: false })
  referencia: string;

  @Column({ type: 'timestamp', name: 'ULTIMO_ENVIO' })
  ultimoEnvio: any;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
