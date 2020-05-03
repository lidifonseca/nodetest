/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

/**
 * A Migracao.
 */
@Entity('migracao')
export default class Migracao extends BaseEntity {
  @Column({ type: 'integer', name: 'id_pad' })
  idPad: number;

  @Column({ type: 'timestamp', name: 'data_hora_migracao' })
  dataHoraMigracao: any;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
