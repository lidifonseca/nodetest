/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

/**
 * A ReportEmailAtendimento.
 */
@Entity('tb_report_email_atendimento')
export default class ReportEmailAtendimento extends BaseEntity {
  @Column({ type: 'integer', name: 'ID_ATENDIMENTO' })
  idAtendimento: number;

  @Column({ type: 'integer', name: 'TIPO_REPORT' })
  tipoReport: number;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
