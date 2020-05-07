/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

/**
 * A ProfissionalStatusAtualNew.
 */
@Entity('tb_profissional_status_atual_new')
export default class ProfissionalStatusAtualNew extends BaseEntity {
  @Column({ name: 'ID_PROFISSIONAL' })
  idProfissional: string;

  @Column({ type: 'integer', name: 'ID_STATUS_ATUAL_PROF' })
  idStatusAtualProf: number;

  @Column({ name: 'OBS' })
  obs: string;

  @Column({ type: 'integer', name: 'ATIVO' })
  ativo: number;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
