/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import Paciente from './paciente.entity';
import StatusAtual from './status-atual.entity';

/**
 * A PacienteStatusAtual.
 */
@Entity('tb_paciente_status_atual')
export default class PacienteStatusAtual extends BaseEntity {
  @Column({ type: 'date', name: 'DATA_STATUS' })
  dataStatus: any;

  @Column({ name: 'OBSERVACAO' })
  observacao: string;

  @Column({ type: 'boolean', name: 'ATIVO' })
  ativo: boolean;

  @ManyToOne(type => Paciente)
  @JoinColumn({ name: 'ID_PACIENTE', referencedColumnName: 'id' })
  paciente: Paciente;

  @ManyToOne(type => StatusAtual)
  @JoinColumn({ name: 'ID_STATUS', referencedColumnName: 'id' })
  status: StatusAtual;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
