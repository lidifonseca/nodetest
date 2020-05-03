/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { validate, Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, Min, Max } from 'class-validator';

/**
 * A FilesPanico.
 */
@Entity('files_panico')
export default class FilesPanico extends BaseEntity {
  @Column({ type: 'integer', name: 'id_panico', nullable: false })
  idPanico: number;

  @Column({ type: 'integer', name: 'id_paciente', nullable: false })
  idPaciente: number;

  @Column({ name: 'tipo', length: 3 })
  tipo: string;

  @Column({ name: 'imagem', length: 100, nullable: false })
  imagem: string;

  @Column({ type: 'timestamp', name: 'criado_em', nullable: false })
  criadoEm: any;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
