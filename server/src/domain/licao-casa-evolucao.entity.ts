/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { validate, Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, Min, Max } from 'class-validator';

/**
 * A LicaoCasaEvolucao.
 */
@Entity('licao_casa_evolucao')
export default class LicaoCasaEvolucao extends BaseEntity {
  @Column({ type: 'integer', name: 'licao_casa_id', nullable: false })
  licaoCasaId: number;

  @Column({ type: 'timestamp', name: 'atualizado_em', nullable: false })
  atualizadoEm: any;

  @Column({ type: 'boolean', name: 'realizada', nullable: false })
  realizada: boolean;

  @Column({ type: 'timestamp', name: 'realizada_em' })
  realizadaEm: any;

  @Column({ name: 'observacoes', length: 100 })
  observacoes: string;

  @Column({ name: 'instrucoes', length: 100 })
  instrucoes: string;

  @Column({ type: 'timestamp', name: 'data_agenda' })
  dataAgenda: any;

  @Column({ type: 'boolean', name: 'qtd_lembrete', nullable: false })
  qtdLembrete: boolean;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
