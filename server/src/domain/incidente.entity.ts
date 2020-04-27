/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import Processo from './processo.entity';

/**
 * A Incidente.
 */
@Entity('incidente')
export default class Incidente extends BaseEntity {
  @Column({ type: 'date', name: 'recebedo_em' })
  recebedoEm: any;

  @Column({ name: 'clase' })
  clase: string;

  @ManyToOne(type => Processo)
  processo: Processo;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
