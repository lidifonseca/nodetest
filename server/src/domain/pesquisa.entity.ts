/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { validate, Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, Min, Max } from 'class-validator';

import Processo from './processo.entity';
import Comarca from './comarca.entity';
import Estado from './estado.entity';
import { Situacao } from './enumeration/situacao';

import { User } from './user.entity';

/**
 * A Pesquisa.
 */
@Entity('pesquisa')
export default class Pesquisa extends BaseEntity {
  @Column({ name: 'nome' })
  nome: string;

  @Column({ type: 'blob', name: 'classes_incluir' })
  classesIncluir: any;

  @Column({ type: 'blob', name: 'incluir_movimentacoes' })
  incluirMovimentacoes: any;

  @Column({ type: 'blob', name: 'descartar_movimentacoes' })
  descartarMovimentacoes: any;

  @Column({ type: 'boolean', name: 'incluir_movimentacoes_all' })
  incluirMovimentacoesAll: boolean;

  @Column({ type: 'integer', name: 'ano_inicial' })
  anoInicial: number;

  @Column({ type: 'integer', name: 'ano_final' })
  anoFinal: number;

  @Column({ type: 'blob', name: 'csv' })
  csv: any;

  @Column({ type: 'timestamp', name: 'data_criacao', nullable: false })
  dataCriacao: any;

  @Column({ type: 'timestamp', name: 'data_finalizacao' })
  dataFinalizacao: any;

  @Column({ type: 'enum', name: 'situacao', enum: Situacao })
  situacao: Situacao;

  @Column({ name: 'observacoes' })
  observacoes: string;

  @Column({ type: 'integer', name: 'csv_total' })
  csvTotal: number;

  @Column({ type: 'integer', name: 'csv_verificados' })
  csvVerificados: number;

  @Column({ type: 'boolean', name: 'comarca_por_comarca' })
  comarcaPorComarca: boolean;

  @ManyToOne(type => User)
  user: User;

  @ManyToMany(type => Processo)
  @JoinTable({
    name: 'pesquisa_processo',
    joinColumn: { name: 'pesquisa_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'processo_id', referencedColumnName: 'id' }
  })
  processos: Processo[];

  @ManyToOne(type => Comarca)
  comarcas: Comarca;

  @ManyToOne(type => Estado)
  estado: Estado;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
