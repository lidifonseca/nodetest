/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import Paciente from './paciente.entity';

/**
 * A PacienteArquivo.
 */
@Entity('paciente_arquivo')
export default class PacienteArquivo extends BaseEntity {
  @Column({ type: 'blob', name: 'arquivo' })
  arquivo: any;

  @Column({ name: 'arquivo_content_type' })
  arquivoContentType: string;
  @Column({ type: 'integer', name: 'ativo' })
  ativo: number;

  @ManyToOne(type => Paciente)
  paciente: Paciente;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
