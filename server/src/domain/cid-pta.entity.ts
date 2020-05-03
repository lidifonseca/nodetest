/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { validate, Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, Min, Max } from 'class-validator';

/**
 * A CidPta.
 */
@Entity('cid_pta')
export default class CidPta extends BaseEntity {
  @Column({ type: 'integer', name: 'id_desc_pta', nullable: false })
  idDescPta: number;

  @Column({ type: 'integer', name: 'id_cid', nullable: false })
  idCid: number;

  @Column({ type: 'integer', name: 'id_atividade', nullable: false })
  idAtividade: number;

  @Column({ type: 'integer', name: 'ativo', nullable: false })
  ativo: number;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
