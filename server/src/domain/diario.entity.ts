/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import Usuario from './usuario.entity';
import Paciente from './paciente.entity';

/**
 * A Diario.
 */
@Entity('tb_diario')
export default class Diario extends BaseEntity {
  @Column({ name: 'HISTORICO' })
  historico: string;

  @Column({ type: 'boolean', name: 'GERAR_PDF' })
  gerarPdf: boolean;

  @ManyToOne(type => Usuario)
  @JoinColumn({ name: 'ID_USUARIO', referencedColumnName: 'id' })
  usuario: Usuario;

  @ManyToOne(type => Paciente)
  @JoinColumn({ name: 'ID_PACIENTE', referencedColumnName: 'id' })
  paciente: Paciente;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
