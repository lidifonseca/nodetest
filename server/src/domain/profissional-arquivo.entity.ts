/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { validate, Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, Min, Max } from 'class-validator';

/**
 * A ProfissionalArquivo.
 */
@Entity('tb_profissional_arquivo')
export default class ProfissionalArquivo extends BaseEntity {
  @Column({ name: 'ID_PROFISSIONAL' })
  idProfissional: string;

  @Column({ name: 'ARQUIVO', length: 100 })
  arquivo: string;

  @Column({ type: 'integer', name: 'ATIVO' })
  ativo: number;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
