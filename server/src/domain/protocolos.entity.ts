/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { validate, Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, Min, Max } from 'class-validator';

/**
 * A Protocolos.
 */
@Entity('tb_protocolos')
export default class Protocolos extends BaseEntity {
  @Column({ type: 'integer', name: 'PROTOCOLO', nullable: false })
  protocolo: number;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
