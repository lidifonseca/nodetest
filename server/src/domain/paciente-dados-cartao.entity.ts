/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { validate, Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, Min, Max } from 'class-validator';

import PacientePedido from './paciente-pedido.entity';
import Paciente from './paciente.entity';

/**
 * A PacienteDadosCartao.
 */
@Entity('tb_paciente_dados_cartao')
export default class PacienteDadosCartao extends BaseEntity {
  @Column({ name: 'BANDEIRA', length: 40 })
  bandeira: string;

  @Column({ name: 'NUMERO_CARTAO', length: 30 })
  numeroCartao: string;

  @Column({ type: 'date', name: 'VALIDADE' })
  validade: any;

  @Column({ type: 'integer', name: 'COD_ATIVACAO' })
  codAtivacao: number;

  @Column({ type: 'boolean', name: 'ATIVO' })
  ativo: boolean;

  @OneToMany(
    type => PacientePedido,
    other => other.cartao
  )
  pacientePedidos: PacientePedido[];

  @ManyToOne(type => Paciente)
  @JoinColumn({ name: 'ID_PACIENTE', referencedColumnName: 'id' })
  paciente: Paciente;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
