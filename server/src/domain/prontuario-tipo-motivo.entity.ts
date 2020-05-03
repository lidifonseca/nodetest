/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { validate, Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, Min, Max } from 'class-validator';

/**
 * A ProntuarioTipoMotivo.
 */
@Entity('prontuario_tipo_motivo')
export default class ProntuarioTipoMotivo extends BaseEntity {
  @Column({ name: 'nome', length: 45 })
  nome: string;

  @Column({ type: 'integer', name: 'id_pai' })
  idPai: number;

  @Column({ type: 'integer', name: 'ativo' })
  ativo: number;

  @Column({ name: 'classe', length: 45 })
  classe: string;

  @Column({ name: 'name', length: 45 })
  name: string;

  @Column({ type: 'integer', name: 'id_tipo_prontuario' })
  idTipoProntuario: number;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
