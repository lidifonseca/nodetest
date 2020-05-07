/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

/**
 * A AtendimentoAtividades.
 */
@Entity('tb_atendimento_atividades')
export default class AtendimentoAtividades extends BaseEntity {
  @Column({ type: 'integer', name: 'FEITO' })
  feito: number;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
