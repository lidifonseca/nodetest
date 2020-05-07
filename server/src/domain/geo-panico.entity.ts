/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { validate, Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, Min, Max } from 'class-validator';

/**
 * A GeoPanico.
 */
@Entity('tb_geo_panico')
export default class GeoPanico extends BaseEntity {
  @Column({ type: 'integer', name: 'ID_PANICO', nullable: false })
  idPanico: number;

  @Column({ type: 'integer', name: 'ID_PACIENTE', nullable: false })
  idPaciente: number;

  @Column({ name: 'LATITUDE', length: 300 })
  latitude: string;

  @Column({ name: 'LONGITUDE', length: 300 })
  longitude: string;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
