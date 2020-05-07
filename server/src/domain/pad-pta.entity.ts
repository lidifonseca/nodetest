/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { validate, Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, Min, Max } from 'class-validator';

/**
 * A PadPta.
 */
@Entity('tb_pad_pta')
export default class PadPta extends BaseEntity {
  @Column({ name: 'ID_PAD', nullable: false })
  idPad: string;

  @Column({ name: 'ID_DESC_PTA' })
  idDescPta: string;

  @Column({ name: 'ID_CID', nullable: false })
  idCid: string;

  @Column({ type: 'integer', name: 'ID_CID_X_PTA_NOVO', nullable: false })
  idCidXPtaNovo: number;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
