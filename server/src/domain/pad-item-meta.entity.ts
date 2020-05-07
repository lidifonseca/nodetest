/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { validate, Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, Min, Max } from 'class-validator';

/**
 * A PadItemMeta.
 */
@Entity('tb_pad_item_meta')
export default class PadItemMeta extends BaseEntity {
  @Column({ type: 'integer', name: 'UNIDADE_MEDIDA_ID' })
  unidadeMedidaId: number;

  @Column({ type: 'integer', name: 'INDICADOR_ID', nullable: false })
  indicadorId: number;

  @Column({ type: 'integer', name: 'ID_PACIENTE', nullable: false })
  idPaciente: number;

  @Column({ type: 'integer', name: 'ID_PAD' })
  idPad: number;

  @Column({ type: 'integer', name: 'ID_PAD_ITEM' })
  idPadItem: number;

  @Column({ name: 'MINIMO', length: 50 })
  minimo: string;

  @Column({ name: 'MAXIMO', length: 50 })
  maximo: string;

  @Column({ name: 'META', length: 50 })
  meta: string;

  @Column({ name: 'VALOR_ATUAL', length: 50 })
  valorAtual: string;

  @Column({ type: 'timestamp', name: 'ATUALIZADO_EM' })
  atualizadoEm: any;

  @Column({ type: 'timestamp', name: 'DATA_LIMITE' })
  dataLimite: any;

  @Column({ type: 'integer', name: 'FREQUENCIA_MEDICAO_HORAS' })
  frequenciaMedicaoHoras: number;

  /**
   * melhoria ou manutencao
   */
  @Column({ name: 'TIPO_ACOMPANHAMENTO', length: 255 })
  tipoAcompanhamento: string;

  @Column({ type: 'integer', name: 'ATENDIMENTO_ID' })
  atendimentoId: number;

  @Column({ type: 'integer', name: 'EMAIL', nullable: false })
  email: number;

  @Column({ name: 'MINIMO_SISTOLICA', length: 20 })
  minimoSistolica: string;

  @Column({ name: 'MAXIMO_SISTOLICA', length: 20 })
  maximoSistolica: string;

  @Column({ name: 'MINIMO_DIASTOLICA', length: 20 })
  minimoDiastolica: string;

  @Column({ name: 'MAXIMO_DIASTOLICA', length: 20 })
  maximoDiastolica: string;

  @Column({ type: 'double', name: 'SCORE' })
  score: number;

  @Column({ type: 'boolean', name: 'ALTERACAO_ESPERADA' })
  alteracaoEsperada: boolean;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
