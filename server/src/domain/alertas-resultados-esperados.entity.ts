/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { validate, Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, Min, Max } from 'class-validator';

import Resultados from './resultados.entity';

/**
 * A AlertasResultadosEsperados.
 */
@Entity('alertas_resultados_esperados')
export default class AlertasResultadosEsperados extends BaseEntity {
  @Column({ type: 'double', name: 'pontuacao' })
  pontuacao: number;

  @Column({ type: 'boolean', name: 'alteracao_esperada' })
  alteracaoEsperada: boolean;

  @Column({ name: 'observacoes', length: 255 })
  observacoes: string;

  @Column({ type: 'integer', name: 'usuario_id' })
  usuarioId: number;

  @Column({ type: 'integer', name: 'valor' })
  valor: number;

  @ManyToOne(type => Resultados)
  resultadosId: Resultados;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
