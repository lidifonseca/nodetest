/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { validate, Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, Min, Max } from 'class-validator';

/**
 * A PacienteDispositivoComplexidade.
 */
@Entity('tb_paciente_dispositivo_complexidade')
export default class PacienteDispositivoComplexidade extends BaseEntity {
  @Column({ name: 'CARACTERISTICA', length: 100, nullable: false })
  caracteristica: string;

  @Column({ type: 'boolean', name: 'ATIVO', nullable: false })
  ativo: boolean;

  @Column({ name: 'TIPO', length: 45 })
  tipo: string;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
