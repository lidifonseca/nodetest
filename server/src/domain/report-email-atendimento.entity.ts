/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

/**
 * A ReportEmailAtendimento.
 */
@Entity('report_email_atendimento')
export default class ReportEmailAtendimento extends BaseEntity {
  @Column({ type: 'integer', name: 'id_atendimento' })
  idAtendimento: number;

  @Column({ type: 'integer', name: 'tipo_report' })
  tipoReport: number;

  @Column({ type: 'timestamp', name: 'data_post' })
  dataPost: any;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
