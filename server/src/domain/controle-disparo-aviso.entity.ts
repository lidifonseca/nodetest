/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { validate, Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, Min, Max } from 'class-validator';

/**
 * A ControleDisparoAviso.
 */
@Entity('controle_disparo_aviso')
export default class ControleDisparoAviso extends BaseEntity {
  @Column({ type: 'integer', name: 'id_atendimento', nullable: false })
  idAtendimento: number;

  @Column({ type: 'integer', name: 'qtd_disparo' })
  qtdDisparo: number;

  @Column({ type: 'integer', name: 'avisopush' })
  avisopush: number;

  @Column({ type: 'timestamp', name: 'data_post', nullable: false })
  dataPost: any;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
