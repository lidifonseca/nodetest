/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { validate, Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, Min, Max } from 'class-validator';

/**
 * A UsuarioPanico.
 */
@Entity('tb_usuario_panico')
export default class UsuarioPanico extends BaseEntity {
  @Column({ type: 'integer', name: 'ID_PACIENTE', nullable: false })
  idPaciente: number;

  @Column({ type: 'integer', name: 'ID_PROFISSIONAL', nullable: false })
  idProfissional: number;

  @Column({ name: 'OBSERVACAO', length: 255 })
  observacao: string;

  @Column({ type: 'integer', name: 'RESOLVIDO' })
  resolvido: number;

  @Column({ type: 'integer', name: 'ID_USER_RESOLVIDO' })
  idUserResolvido: number;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
