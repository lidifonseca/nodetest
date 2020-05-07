/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

/**
 * A Migracao.
 */
@Entity('tb_migracao')
export default class Migracao extends BaseEntity {
  @Column({ type: 'integer', name: 'ID_PAD' })
  idPad: number;

  @Column({ type: 'timestamp', name: 'DATA_HORA_MIGRACAO' })
  dataHoraMigracao: any;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
