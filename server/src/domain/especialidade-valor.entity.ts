/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { validate, Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, Min, Max } from 'class-validator';

import Especialidade from './especialidade.entity';

/**
 * A EspecialidadeValor.
 */
@Entity('especialidade_valor')
export default class EspecialidadeValor extends BaseEntity {
  @Column({ name: 'id_franquia' })
  idFranquia: string;

  @Column({ type: 'float', name: 'valor' })
  valor: number;

  @Column({ type: 'integer', name: 'ativo' })
  ativo: number;

  @Column({ type: 'timestamp', name: 'data_post', nullable: false })
  dataPost: any;

  @ManyToOne(type => Especialidade)
  idEspecialidade: Especialidade;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
