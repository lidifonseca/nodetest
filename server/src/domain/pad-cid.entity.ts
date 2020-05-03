/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { validate, Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, Min, Max } from 'class-validator';

import Pad from './pad.entity';
import Cid from './cid.entity';

/**
 * A PadCid.
 */
@Entity('pad_cid')
export default class PadCid extends BaseEntity {
  @Column({ name: 'observacao', length: 255 })
  observacao: string;

  @Column({ type: 'integer', name: 'ativo' })
  ativo: number;

  @Column({ type: 'timestamp', name: 'data_post', nullable: false })
  dataPost: any;

  @ManyToOne(type => Pad)
  idPad: Pad;

  @ManyToOne(type => Cid)
  idCid: Cid;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
