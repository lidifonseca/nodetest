/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { validate, Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, Min, Max } from 'class-validator';

/**
 * A OcorrenciaProntuario.
 */
@Entity('ocorrencia_prontuario')
export default class OcorrenciaProntuario extends BaseEntity {
  @Column({ name: 'nome', length: 45 })
  nome: string;

  @Column({ name: 'ativo', length: 1 })
  ativo: string;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
