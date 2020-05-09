/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { validate, Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, Min, Max } from 'class-validator';

/**
 * A TipoPreferenciaAtendimento.
 */
@Entity('tb_tipo_preferencia_atendimento')
export default class TipoPreferenciaAtendimento extends BaseEntity {
  @Column({ name: 'NOME', length: 80 })
  nome: string;

  @Column({ type: 'boolean', name: 'ATIVO' })
  ativo: boolean;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
