/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import Paciente from './paciente.entity';

/**
 * A PacienteArquivo.
 */
@Entity('tb_paciente_arquivo')
export default class PacienteArquivo extends BaseEntity {
  @Column({ name: 'ARQUIVO' })
  arquivo: string;

  @Column({ name: 'ARQUIVO_CONTENT_TYPE' })
  arquivoContentType: string;
  @Column({ type: 'integer', name: 'ATIVO' })
  ativo: number;

  @ManyToOne(type => Paciente)
  @JoinColumn({ name: 'ID_PACIENTE', referencedColumnName: 'id' })
  paciente: Paciente;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
