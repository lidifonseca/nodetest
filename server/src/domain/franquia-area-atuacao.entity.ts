/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { validate, Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, Min, Max } from 'class-validator';

import Franquia from './franquia.entity';

/**
 * A FranquiaAreaAtuacao.
 */
@Entity('tb_franquia_area_atuacao')
export default class FranquiaAreaAtuacao extends BaseEntity {
  @Column({ name: 'CEP_INI', length: 10 })
  cepIni: string;

  @Column({ name: 'CEP_FIM', length: 10 })
  cepFim: string;

  @Column({ type: 'boolean', name: 'ATIVO' })
  ativo: boolean;

  @ManyToOne(type => Franquia)
  @JoinColumn({ name: 'ID_FRANQUIA', referencedColumnName: 'id' })
  franquia: Franquia;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
