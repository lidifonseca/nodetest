/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { validate, Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, Min, Max } from 'class-validator';

/**
 * A ProntuarioTipoMotivo.
 */
@Entity('tb_prontuario_tipo_motivo')
export default class ProntuarioTipoMotivo extends BaseEntity {
  @Column({ name: 'NOME', length: 45 })
  nome: string;

  @Column({ type: 'integer', name: 'ID_PAI' })
  idPai: number;

  @Column({ type: 'integer', name: 'ATIVO' })
  ativo: number;

  @Column({ name: 'CLASSE', length: 45 })
  classe: string;

  @Column({ name: 'NAME', length: 45 })
  name: string;

  @Column({ type: 'integer', name: 'ID_TIPO_PRONTUARIO' })
  idTipoProntuario: number;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
