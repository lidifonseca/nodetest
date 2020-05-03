/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { validate, Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, Min, Max } from 'class-validator';

import CidXPtaNovoPadItemIndi from './cid-x-pta-novo-pad-item-indi.entity';
import Cid from './cid.entity';

/**
 * A CidXPtaNovo.
 */
@Entity('cid_x_pta_novo')
export default class CidXPtaNovo extends BaseEntity {
  @Column({ name: 'complexidade', length: 45 })
  complexidade: string;

  @Column({ type: 'integer', name: 'versao' })
  versao: number;

  @Column({ type: 'integer', name: 'score' })
  score: number;

  @Column({ name: 'titulo', length: 245 })
  titulo: string;

  @OneToMany(
    type => CidXPtaNovo,
    other => other.cidXPtaNovoId
  )
  cidXPtaNovos: CidXPtaNovo[];

  @OneToMany(
    type => CidXPtaNovoPadItemIndi,
    other => other.cidXPtaNovoId
  )
  cidXPtaNovoPadItemIndis: CidXPtaNovoPadItemIndi[];

  @ManyToOne(type => Cid)
  cidId: Cid;

  @ManyToOne(type => CidXPtaNovo)
  cidXPtaNovoId: CidXPtaNovo;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
