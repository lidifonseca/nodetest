/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { validate, Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, Min, Max } from 'class-validator';

import PacientePedido from './paciente-pedido.entity';
import Paciente from './paciente.entity';

/**
 * A PacienteDadosCartao.
 */
@Entity('paciente_dados_cartao')
export default class PacienteDadosCartao extends BaseEntity {
  @Column({ name: 'bandeira', length: 40 })
  bandeira: string;

  @Column({ name: 'numero_cartao', length: 30 })
  numeroCartao: string;

  @Column({ type: 'date', name: 'validade' })
  validade: any;

  @Column({ type: 'integer', name: 'cod_ativacao' })
  codAtivacao: number;

  @Column({ type: 'integer', name: 'ativo' })
  ativo: number;

  @OneToMany(
    type => PacientePedido,
    other => other.idCartao
  )
  pacientePedidos: PacientePedido[];

  @ManyToOne(type => Paciente)
  idPaciente: Paciente;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
