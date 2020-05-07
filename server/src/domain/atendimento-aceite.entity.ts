/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { validate, Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, Min, Max } from 'class-validator';

/**
 * A AtendimentoAceite.
 */
@Entity('tb_atendimento_aceite')
export default class AtendimentoAceite extends BaseEntity {
  @Column({ name: 'MSG_PUSH', length: 255 })
  msgPush: string;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
