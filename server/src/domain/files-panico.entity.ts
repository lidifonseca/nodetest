/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { validate, Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, Min, Max } from 'class-validator';

/**
 * A FilesPanico.
 */
@Entity('tb_files_panico')
export default class FilesPanico extends BaseEntity {
  @Column({ type: 'integer', name: 'ID_PANICO', nullable: false })
  idPanico: number;

  @Column({ type: 'integer', name: 'ID_PACIENTE', nullable: false })
  idPaciente: number;

  @Column({ name: 'TIPO', length: 3 })
  tipo: string;

  @Column({ name: 'IMAGEM', length: 100, nullable: false })
  imagem: string;

  @Column({ type: 'timestamp', name: 'CRIADO_EM', nullable: false })
  criadoEm: any;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
