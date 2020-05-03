/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { validate, Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, Min, Max } from 'class-validator';

import Profissional from './profissional.entity';
import Atendimento from './atendimento.entity';

/**
 * A AtendimentoAceite.
 */
@Entity('atendimento_aceite')
export default class AtendimentoAceite extends BaseEntity {
  @Column({ name: 'msg_push', length: 255 })
  msgPush: string;

  @Column({ type: 'timestamp', name: 'data_post', nullable: false })
  dataPost: any;

  @ManyToOne(type => Profissional)
  idProfissional: Profissional;

  @ManyToOne(type => Atendimento)
  idAtendimento: Atendimento;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
