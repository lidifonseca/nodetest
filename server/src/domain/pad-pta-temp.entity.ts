/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { validate, Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, Min, Max } from 'class-validator';

/**
 * A PadPtaTemp.
 */
@Entity('pad_pta_temp')
export default class PadPtaTemp extends BaseEntity {
  @Column({ name: 'session_id', length: 100 })
  sessionId: string;

  @Column({ type: 'integer', name: 'id_pta', nullable: false })
  idPta: number;

  @Column({ type: 'integer', name: 'id_cid', nullable: false })
  idCid: number;

  @Column({ type: 'integer', name: 'id_usuario', nullable: false })
  idUsuario: number;

  @Column({ type: 'integer', name: 'cid_x_pta_novo_id' })
  cidXPtaNovoId: number;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
