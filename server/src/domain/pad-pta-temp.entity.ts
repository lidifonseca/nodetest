/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { validate, Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, Min, Max } from 'class-validator';

/**
 * A PadPtaTemp.
 */
@Entity('tb_pad_pta_temp')
export default class PadPtaTemp extends BaseEntity {
  @Column({ name: 'SESSION_ID', length: 100 })
  sessionId: string;

  @Column({ type: 'integer', name: 'ID_PTA', nullable: false })
  idPta: number;

  @Column({ type: 'integer', name: 'ID_CID', nullable: false })
  idCid: number;

  @Column({ type: 'integer', name: 'CID_X_PTA_NOVO_ID' })
  cidXPtaNovoId: number;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
