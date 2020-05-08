/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { validate, Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, Min, Max } from 'class-validator';

import Profissional from './profissional.entity';
import Atendimento from './atendimento.entity';

/**
 * A AtendimentoAceite.
 */
@Entity('tb_atendimento_aceite')
export default class AtendimentoAceite extends BaseEntity {
  @Column({ name: 'MSG_PUSH', length: 255 })
  msgPush: string;

  @ManyToOne(type => Profissional)
  @JoinColumn({ name: 'ID_PROFISSIONAL', referencedColumnName: 'id' })
  profissional: Profissional;

  @ManyToOne(type => Atendimento)
  @JoinColumn({ name: 'ID_ATENDIMENTO', referencedColumnName: 'id' })
  atendimento: Atendimento;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
