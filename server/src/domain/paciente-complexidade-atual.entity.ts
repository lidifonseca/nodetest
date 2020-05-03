/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

/**
 * A PacienteComplexidadeAtual.
 */
@Entity('paciente_complexidade_atual')
export default class PacienteComplexidadeAtual extends BaseEntity {
  @Column({ type: 'integer', name: 'id_paciente' })
  idPaciente: number;

  @Column({ type: 'integer', name: 'id_paciente_complexidade' })
  idPacienteComplexidade: number;

  @Column({ type: 'integer', name: 'baixa' })
  baixa: number;

  @Column({ type: 'integer', name: 'media' })
  media: number;

  @Column({ type: 'integer', name: 'alta' })
  alta: number;

  @Column({ type: 'integer', name: 'ventilacao_mecanica' })
  ventilacaoMecanica: number;

  @Column({ type: 'integer', name: 'telemonitoramente' })
  telemonitoramente: number;

  @Column({ type: 'integer', name: 'id_usuario' })
  idUsuario: number;

  @Column({ type: 'timestamp', name: 'data_post' })
  dataPost: any;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
