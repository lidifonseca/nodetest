/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { validate, Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, Min, Max } from 'class-validator';

/**
 * A ProntuarioTipoManifestacao.
 */
@Entity('prontuario_tipo_manifestacao')
export default class ProntuarioTipoManifestacao extends BaseEntity {
  @Column({ name: 'nome', length: 45 })
  nome: string;

  @Column({ type: 'integer', name: 'id_pai' })
  idPai: number;

  @Column({ type: 'integer', name: 'ativo' })
  ativo: number;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
