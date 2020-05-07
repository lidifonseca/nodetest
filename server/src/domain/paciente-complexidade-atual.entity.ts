/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

/**
 * A PacienteComplexidadeAtual.
 */
@Entity('tb_paciente_complexidade_atual')
export default class PacienteComplexidadeAtual extends BaseEntity {
  @Column({ type: 'integer', name: 'ID_PACIENTE' })
  idPaciente: number;

  @Column({ type: 'integer', name: 'ID_PACIENTE_COMPLEXIDADE' })
  idPacienteComplexidade: number;

  @Column({ type: 'integer', name: 'BAIXA' })
  baixa: number;

  @Column({ type: 'integer', name: 'MEDIA' })
  media: number;

  @Column({ type: 'integer', name: 'ALTA' })
  alta: number;

  @Column({ type: 'integer', name: 'VENTILACAO_MECANICA' })
  ventilacaoMecanica: number;

  @Column({ type: 'integer', name: 'TELEMONITORAMENTE' })
  telemonitoramente: number;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
