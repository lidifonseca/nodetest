/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { validate, Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, Min, Max } from 'class-validator';

import Pad from './pad.entity';
import Cid from './cid.entity';

/**
 * A PadCid.
 */
@Entity('tb_pad_cid')
export default class PadCid extends BaseEntity {
  @Column({ name: 'OBSERVACAO', length: 255 })
  observacao: string;

  @Column({ type: 'boolean', name: 'ATIVO' })
  ativo: boolean;

  @ManyToOne(type => Pad)
  @JoinColumn({ name: 'ID_PAD', referencedColumnName: 'id' })
  pad: Pad;

  @ManyToOne(type => Cid)
  @JoinColumn({ name: 'ID_CID', referencedColumnName: 'id' })
  cid: Cid;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
