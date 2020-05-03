/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { validate, Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, Min, Max } from 'class-validator';

/**
 * A UsuarioPanico.
 */
@Entity('usuario_panico')
export default class UsuarioPanico extends BaseEntity {
  @Column({ type: 'integer', name: 'id_paciente', nullable: false })
  idPaciente: number;

  @Column({ type: 'integer', name: 'id_usuario', nullable: false })
  idUsuario: number;

  @Column({ type: 'integer', name: 'id_profissional', nullable: false })
  idProfissional: number;

  @Column({ name: 'observacao', length: 255 })
  observacao: string;

  @Column({ type: 'integer', name: 'resolvido' })
  resolvido: number;

  @Column({ type: 'integer', name: 'id_user_resolvido' })
  idUserResolvido: number;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
