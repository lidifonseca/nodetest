/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { validate, Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, Min, Max } from 'class-validator';

/**
 * A AtendimentoGlosado.
 */
@Entity('atendimento_glosado')
export default class AtendimentoGlosado extends BaseEntity {
  @Column({ type: 'integer', name: 'id_atendimento', nullable: false })
  idAtendimento: number;

  @Column({ name: 'glosado', length: 1 })
  glosado: string;

  @Column({ type: 'integer', name: 'id_usuario' })
  idUsuario: number;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
