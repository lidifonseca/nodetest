/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { validate, Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, Min, Max } from 'class-validator';

/**
 * A ProfissionalDispositivoComplexidadeAtual.
 */
@Entity('profissional_dispositivo_complexidade_atual')
export default class ProfissionalDispositivoComplexidadeAtual extends BaseEntity {
  @Column({ type: 'integer', name: 'id_profissional', nullable: false })
  idProfissional: number;

  @Column({ type: 'integer', name: 'id_profissional_dispositivo_complexidade', nullable: false })
  idProfissionalDispositivoComplexidade: number;

  @Column({ type: 'integer', name: 'id_usuario', nullable: false })
  idUsuario: number;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
