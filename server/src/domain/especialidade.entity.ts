/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { validate, Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, Min, Max } from 'class-validator';

import Atendimento from './atendimento.entity';
import EspecialidadeOperadora from './especialidade-operadora.entity';
import EspecialidadeUnidade from './especialidade-unidade.entity';
import EspecialidadeValor from './especialidade-valor.entity';
import PacientePedido from './paciente-pedido.entity';
import PadItem from './pad-item.entity';
import Categoria from './categoria.entity';
import TipoEspecialidade from './tipo-especialidade.entity';
import TipoUnidade from './tipo-unidade.entity';

/**
 * A Especialidade.
 */
@Entity('especialidade')
export default class Especialidade extends BaseEntity {
  @Column({ name: 'icon', length: 100 })
  icon: string;

  @Column({ name: 'especialidade', length: 150 })
  especialidade: string;

  @Column({ name: 'descricao', length: 255 })
  descricao: string;

  @Column({ type: 'integer', name: 'duracao' })
  duracao: number;

  @Column({ name: 'importante', length: 255 })
  importante: string;

  @Column({ type: 'integer', name: 'ativo' })
  ativo: number;

  @Column({ type: 'timestamp', name: 'data_post', nullable: false })
  dataPost: any;

  @Column({ type: 'integer', name: 'id_unidade' })
  idUnidade: number;

  @OneToMany(
    type => Atendimento,
    other => other.idEspecialidade
  )
  atendimentos: Atendimento[];

  @OneToMany(
    type => EspecialidadeOperadora,
    other => other.idEspecialidade
  )
  especialidadeOperadoras: EspecialidadeOperadora[];

  @OneToMany(
    type => EspecialidadeUnidade,
    other => other.idEspecialidade
  )
  especialidadeUnidades: EspecialidadeUnidade[];

  @OneToMany(
    type => EspecialidadeValor,
    other => other.idEspecialidade
  )
  especialidadeValors: EspecialidadeValor[];

  @OneToMany(
    type => PacientePedido,
    other => other.idEspecialidade
  )
  pacientePedidos: PacientePedido[];

  @OneToMany(
    type => PadItem,
    other => other.idEspecialidade
  )
  padItems: PadItem[];

  @ManyToOne(type => Categoria)
  idCategoria: Categoria;

  @ManyToOne(type => TipoEspecialidade)
  idTipoEspecialidade: TipoEspecialidade;

  @ManyToOne(type => TipoUnidade)
  idTipoUnidade: TipoUnidade;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
