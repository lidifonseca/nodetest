/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { validate, Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, Min, Max } from 'class-validator';

/**
 * A Phinxlog.
 */
@Entity('phinxlog')
export default class Phinxlog extends BaseEntity {
  @Column({ name: 'version', nullable: false })
  version: string;

  @Column({ name: 'migration_name', length: 100 })
  migrationName: string;

  @Column({ type: 'timestamp', name: 'start_time' })
  startTime: any;

  @Column({ type: 'timestamp', name: 'end_time' })
  endTime: any;

  @Column({ type: 'boolean', name: 'breakpoint', nullable: false })
  breakpoint: boolean;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
