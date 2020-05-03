/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { validate, Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, Min, Max } from 'class-validator';

/**
 * A ModulosPadConfig.
 */
@Entity('modulos_pad_config')
export default class ModulosPadConfig extends BaseEntity {
  @Column({ type: 'integer', name: 'id_modulos_pad', nullable: false })
  idModulosPad: number;

  @Column({ type: 'integer', name: 'id_especialidade' })
  idEspecialidade: number;

  @Column({ type: 'integer', name: 'id_periodicidade' })
  idPeriodicidade: number;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
