/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { validate, Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, Min, Max } from 'class-validator';

/**
 * A PadItemMeta.
 */
@Entity('pad_item_meta')
export default class PadItemMeta extends BaseEntity {
  @Column({ type: 'integer', name: 'unidade_medida_id' })
  unidadeMedidaId: number;

  @Column({ type: 'integer', name: 'indicador_id', nullable: false })
  indicadorId: number;

  @Column({ type: 'integer', name: 'id_paciente', nullable: false })
  idPaciente: number;

  @Column({ type: 'integer', name: 'id_pad' })
  idPad: number;

  @Column({ type: 'integer', name: 'id_pad_item' })
  idPadItem: number;

  @Column({ name: 'minimo', length: 50 })
  minimo: string;

  @Column({ name: 'maximo', length: 50 })
  maximo: string;

  @Column({ name: 'meta', length: 50 })
  meta: string;

  @Column({ name: 'valor_atual', length: 50 })
  valorAtual: string;

  @Column({ type: 'timestamp', name: 'atualizado_em' })
  atualizadoEm: any;

  @Column({ type: 'timestamp', name: 'data_limite' })
  dataLimite: any;

  @Column({ type: 'integer', name: 'frequencia_medicao_horas' })
  frequenciaMedicaoHoras: number;

  /**
   * melhoria ou manutencao
   */
  @Column({ name: 'tipo_acompanhamento', length: 255 })
  tipoAcompanhamento: string;

  @Column({ type: 'integer', name: 'atendimento_id' })
  atendimentoId: number;

  @Column({ type: 'integer', name: 'email', nullable: false })
  email: number;

  @Column({ name: 'minimo_sistolica', length: 20 })
  minimoSistolica: string;

  @Column({ name: 'maximo_sistolica', length: 20 })
  maximoSistolica: string;

  @Column({ name: 'minimo_diastolica', length: 20 })
  minimoDiastolica: string;

  @Column({ name: 'maximo_diastolica', length: 20 })
  maximoDiastolica: string;

  @Column({ type: 'integer', name: 'id_usuario' })
  idUsuario: number;

  @Column({ type: 'double', name: 'score' })
  score: number;

  @Column({ type: 'boolean', name: 'alteracao_esperada' })
  alteracaoEsperada: boolean;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
