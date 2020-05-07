/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { validate, Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, Min, Max } from 'class-validator';

/**
 * A CidPta.
 */
@Entity('tb_cid_pta')
export default class CidPta extends BaseEntity {
  @Column({ type: 'integer', name: 'ID_DESC_PTA', nullable: false })
  idDescPta: number;

  @Column({ type: 'integer', name: 'ID_CID', nullable: false })
  idCid: number;

  @Column({ type: 'integer', name: 'ID_ATIVIDADE', nullable: false })
  idAtividade: number;

  @Column({ type: 'integer', name: 'ATIVO', nullable: false })
  ativo: number;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
