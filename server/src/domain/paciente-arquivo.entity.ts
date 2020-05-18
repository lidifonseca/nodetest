/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import Paciente from './paciente.entity';

/**
 * \n\n\n
 */
@Entity('tb_paciente_arquivo')
export default class PacienteArquivo extends BaseEntity {
  @Column({ name: 'ARQUIVO' })
  arquivo: string;

  @Column({ name: 'ARQUIVO_CONTENT_TYPE' })
  arquivoContentType: string;
  @Column({ type: 'boolean', name: 'ATIVO' })
  ativo: boolean;

  @ManyToOne(type => Paciente)
  @JoinColumn({ name: 'ID_PACIENTE', referencedColumnName: 'id' })
  paciente: Paciente;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
