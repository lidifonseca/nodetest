/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import UnidadeEasy from './unidade-easy.entity';
import Paciente from './paciente.entity';
import PacienteDadosCartao from './paciente-dados-cartao.entity';
import Especialidade from './especialidade.entity';

/**
 * A PacientePedido.
 */
@Entity('paciente_pedido')
export default class PacientePedido extends BaseEntity {
  @Column({ type: 'date', name: 'data_pedido' })
  dataPedido: any;

  @Column({ type: 'timestamp', name: 'data_agenda' })
  dataAgenda: any;

  @Column({ type: 'integer', name: 'qtd_sessoes' })
  qtdSessoes: number;

  @Column({ type: 'integer', name: 'parcelas' })
  parcelas: number;

  @Column({ type: 'float', name: 'valor' })
  valor: number;

  @Column({ type: 'float', name: 'desconto' })
  desconto: number;

  @Column({ type: 'integer', name: 'tipo_valor' })
  tipoValor: number;

  @ManyToOne(type => UnidadeEasy)
  unidade: UnidadeEasy;

  @ManyToOne(type => Paciente)
  idPaciente: Paciente;

  @ManyToOne(type => PacienteDadosCartao)
  idCartao: PacienteDadosCartao;

  @ManyToOne(type => Especialidade)
  idEspecialidade: Especialidade;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}