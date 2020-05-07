/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { validate, Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, Min, Max } from 'class-validator';

/**
 * A LicaoCasaEvolucao.
 */
@Entity('tb_licao_casa_evolucao')
export default class LicaoCasaEvolucao extends BaseEntity {
  @Column({ type: 'integer', name: 'LICAO_CASA_ID', nullable: false })
  licaoCasaId: number;

  @Column({ type: 'timestamp', name: 'ATUALIZADO_EM', nullable: false })
  atualizadoEm: any;

  @Column({ type: 'boolean', name: 'REALIZADA', nullable: false })
  realizada: boolean;

  @Column({ type: 'timestamp', name: 'REALIZADA_EM' })
  realizadaEm: any;

  @Column({ name: 'OBSERVACOES', length: 100 })
  observacoes: string;

  @Column({ name: 'INSTRUCOES', length: 100 })
  instrucoes: string;

  @Column({ type: 'timestamp', name: 'DATA_AGENDA' })
  dataAgenda: any;

  @Column({ type: 'boolean', name: 'QTD_LEMBRETE', nullable: false })
  qtdLembrete: boolean;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
