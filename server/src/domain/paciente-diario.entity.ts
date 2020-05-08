/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import Paciente from './paciente.entity';
import Usuario from './usuario.entity';

/**
 * A PacienteDiario.
 */
@Entity('tb_paciente_diario')
export default class PacienteDiario extends BaseEntity {
  @Column({ type: 'integer', name: 'ID_OPERADORA' })
  idOperadora: number;

  @Column({ name: 'HISTORICO' })
  historico: string;

  @Column({ type: 'integer', name: 'ATIVO' })
  ativo: number;

  @ManyToOne(type => Paciente)
  @JoinColumn({ name: 'ID_PACIENTE', referencedColumnName: 'id' })
  paciente: Paciente;

  @ManyToOne(type => Usuario)
  @JoinColumn({ name: 'ID_USUARIO', referencedColumnName: 'id' })
  usuario: Usuario;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
