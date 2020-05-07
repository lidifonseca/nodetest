/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { validate, Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, Min, Max } from 'class-validator';

/**
 * A ControleDisparoAviso.
 */
@Entity('tb_controle_disparo_aviso')
export default class ControleDisparoAviso extends BaseEntity {
  @Column({ type: 'integer', name: 'ID_ATENDIMENTO', nullable: false })
  idAtendimento: number;

  @Column({ type: 'integer', name: 'QTD_DISPARO' })
  qtdDisparo: number;

  @Column({ type: 'integer', name: 'AVISOPUSH' })
  avisopush: number;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
