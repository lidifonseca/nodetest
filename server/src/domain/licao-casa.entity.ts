/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { validate, Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, Min, Max } from 'class-validator';

/**
 * A LicaoCasa.
 */
@Entity('tb_licao_casa')
export default class LicaoCasa extends BaseEntity {
  @Column({ type: 'integer', name: 'ATENDIMENTO_ID', nullable: false })
  atendimentoId: number;

  @Column({ type: 'integer', name: 'PACIENTE_ID', nullable: false })
  pacienteId: number;

  @Column({ type: 'integer', name: 'PROFISSIONAL_ID', nullable: false })
  profissionalId: number;

  @Column({ name: 'ATIVIDADE', length: 100, nullable: false })
  atividade: string;

  @Column({ type: 'timestamp', name: 'HORA_INICIO' })
  horaInicio: any;

  @Column({ type: 'boolean', name: 'REPETICAO_HORAS', nullable: false })
  repeticaoHoras: boolean;

  @Column({ type: 'boolean', name: 'QTD_DIAS', nullable: false })
  qtdDias: boolean;

  @Column({ type: 'boolean', name: 'INTERVALO_DIAS', nullable: false })
  intervaloDias: boolean;

  @Column({ type: 'timestamp', name: 'CRIADO_EM' })
  criadoEm: any;

  @Column({ type: 'timestamp', name: 'CONCLUIDA_EM' })
  concluidaEm: any;

  @Column({ type: 'boolean', name: 'ATIVO', nullable: false })
  ativo: boolean;

  @Column({ type: 'integer', name: 'ATIV' })
  ativ: number;

  @Column({ name: 'FORMA', length: 3 })
  forma: string;

  @Column({ name: 'ENVIAR_PARA', length: 2 })
  enviarPara: string;

  @Column({ name: 'NOTIFICAR_FAMILIAR', length: 1 })
  notificarFamiliar: string;

  @Column({ name: 'REPLICAR_ATIVIDADE', length: 1 })
  replicarAtividade: string;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
