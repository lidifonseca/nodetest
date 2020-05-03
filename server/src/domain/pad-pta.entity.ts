/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { validate, Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, Min, Max } from 'class-validator';

/**
 * A PadPta.
 */
@Entity('pad_pta')
export default class PadPta extends BaseEntity {
  @Column({ name: 'id_pad', nullable: false })
  idPad: string;

  @Column({ name: 'id_desc_pta' })
  idDescPta: string;

  @Column({ name: 'id_cid', nullable: false })
  idCid: string;

  @Column({ name: 'id_usuario', nullable: false })
  idUsuario: string;

  @Column({ type: 'timestamp', name: 'data_post', nullable: false })
  dataPost: any;

  @Column({ type: 'integer', name: 'id_cid_x_pta_novo', nullable: false })
  idCidXPtaNovo: number;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
