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
import UnidadeEasy from './unidade-easy.entity';
import Categoria from './categoria.entity';
import TipoEspecialidade from './tipo-especialidade.entity';
import TipoUnidade from './tipo-unidade.entity';

/**
 * A Especialidade.
 */
@Entity('tb_especialidade')
export default class Especialidade extends BaseEntity {
  @Column({ name: 'ICON', length: 100 })
  icon: string;

  @Column({ name: 'ESPECIALIDADE', length: 150 })
  especialidade: string;

  @Column({ name: 'DESCRICAO' })
  descricao: string;

  @Column({ type: 'integer', name: 'DURACAO' })
  duracao: number;

  @Column({ name: 'IMPORTANTE', length: 255 })
  importante: string;

  @Column({ type: 'integer', name: 'ATIVO' })
  ativo: number;

  @OneToMany(
    type => Atendimento,
    other => other.especialidade
  )
  atendimentos: Atendimento[];

  @OneToMany(
    type => EspecialidadeOperadora,
    other => other.especialidade
  )
  especialidadeOperadoras: EspecialidadeOperadora[];

  @OneToMany(
    type => EspecialidadeUnidade,
    other => other.especialidade
  )
  especialidadeUnidades: EspecialidadeUnidade[];

  @OneToMany(
    type => EspecialidadeValor,
    other => other.especialidade
  )
  especialidadeValors: EspecialidadeValor[];

  @OneToMany(
    type => PacientePedido,
    other => other.especialidade
  )
  pacientePedidos: PacientePedido[];

  @OneToMany(
    type => PadItem,
    other => other.especialidade
  )
  padItems: PadItem[];

  @ManyToOne(type => UnidadeEasy)
  @JoinColumn({ name: 'ID_UNIDADE', referencedColumnName: 'id' })
  unidade: UnidadeEasy;

  @ManyToOne(type => Categoria)
  @JoinColumn({ name: 'ID_CATEGORIA', referencedColumnName: 'id' })
  categoria: Categoria;

  @ManyToOne(type => TipoEspecialidade)
  @JoinColumn({ name: 'ID_TIPO_ESPECIALIDADE', referencedColumnName: 'id' })
  tipoEspecialidade: TipoEspecialidade;

  @ManyToOne(type => TipoUnidade)
  @JoinColumn({ name: 'ID_TIPO_UNIDADE', referencedColumnName: 'id' })
  tipoUnidade: TipoUnidade;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
