/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { validate, Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, Min, Max } from 'class-validator';

import Movimentacao from './movimentacao.entity';
import Parte from './parte.entity';
import Peticao from './peticao.entity';
import Incidente from './incidente.entity';
import Apenso from './apenso.entity';
import Audiencia from './audiencia.entity';
import HistoricoClase from './historico-clase.entity';
import Comarca from './comarca.entity';
import Pesquisa from './pesquisa.entity';

/**
 * A Processo.
 */
@Entity('processo')
export default class Processo extends BaseEntity {
  @Column({ name: 'numero', nullable: false })
  numero: string;

  @Column({ name: 'cnpj', nullable: false })
  cnpj: string;

  @Column({ name: 'razao_social' })
  razaoSocial: string;

  @Column({ name: 'classe', nullable: false })
  classe: string;

  @Column({ name: 'assunto' })
  assunto: string;

  @Column({ name: 'vara' })
  vara: string;

  @Column({ name: 'juiz' })
  juiz: string;

  @Column({ type: 'date', name: 'data_distribuicao' })
  dataDistribuicao: any;

  @Column({ name: 'distribuicao' })
  distribuicao: string;

  @Column({ name: 'local_fisico' })
  localFisico: string;

  @Column({ name: 'controle' })
  controle: string;

  @Column({ name: 'area' })
  area: string;

  @Column({ name: 'estado', nullable: false })
  estado: string;

  @Column({ type: 'blob', name: 'observacao' })
  observacao: any;

  @Column({ type: 'boolean', name: 'interesse' })
  interesse: boolean;

  @Column({ type: 'timestamp', name: 'data_criacao', nullable: false })
  dataCriacao: any;

  @Column({ type: 'timestamp', name: 'data_atualicacao' })
  dataAtualicacao: any;

  @Column({ type: 'timestamp', name: 'data_exclusao' })
  dataExclusao: any;

  @Column({ type: 'blob', name: 'link', nullable: false })
  link: any;

  @Column({ type: 'double', name: 'valor' })
  valor: number;

  @Column({ name: 'moeda' })
  moeda: string;

  @OneToMany(
    type => Movimentacao,
    other => other.processo
  )
  movimentacoes: Movimentacao[];

  @OneToMany(
    type => Parte,
    other => other.processo
  )
  partes: Parte[];

  @OneToMany(
    type => Peticao,
    other => other.processo
  )
  peticoes: Peticao[];

  @OneToMany(
    type => Incidente,
    other => other.processo
  )
  incidentes: Incidente[];

  @OneToMany(
    type => Apenso,
    other => other.processo
  )
  apensos: Apenso[];

  @OneToMany(
    type => Audiencia,
    other => other.processo
  )
  audioencias: Audiencia[];

  @OneToMany(
    type => HistoricoClase,
    other => other.processo
  )
  historicos: HistoricoClase[];

  @ManyToOne(type => Comarca)
  comarca: Comarca;

  @ManyToMany(type => Pesquisa)
  pesquisas: Pesquisa[];

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
