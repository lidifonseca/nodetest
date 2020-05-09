/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import StatusAtualProf from './status-atual-prof.entity';

/**
 * A ProfissionalStatusAtual.
 */
@Entity('tb_profissional_status_atual')
export default class ProfissionalStatusAtual extends BaseEntity {
  @Column({ name: 'ID_PROFISSIONAL' })
  idProfissional: string;

  @Column({ name: 'OBS' })
  obs: string;

  @Column({ type: 'boolean', name: 'ATIVO' })
  ativo: boolean;

  @ManyToOne(type => StatusAtualProf)
  @JoinColumn({ name: 'ID_STATUS_ATUAL_PROF', referencedColumnName: 'id' })
  statusAtualProf: StatusAtualProf;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
