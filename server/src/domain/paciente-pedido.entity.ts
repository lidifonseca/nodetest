/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import UnidadeEasy from './unidade-easy.entity';

/**
 * A PacientePedido.
 */
@Entity('tb_paciente_pedido')
export default class PacientePedido extends BaseEntity {
  @Column({ type: 'date', name: 'DATA_PEDIDO' })
  dataPedido: any;

  @Column({ type: 'timestamp', name: 'DATA_AGENDA' })
  dataAgenda: any;

  @Column({ type: 'integer', name: 'QTD_SESSOES' })
  qtdSessoes: number;

  @Column({ type: 'integer', name: 'PARCELAS' })
  parcelas: number;

  @Column({ type: 'float', name: 'VALOR' })
  valor: number;

  @Column({ type: 'float', name: 'DESCONTO' })
  desconto: number;

  @Column({ type: 'integer', name: 'TIPO_VALOR' })
  tipoValor: number;

  @ManyToOne(type => UnidadeEasy)
  @JoinColumn({ name: 'ID_UNIDADE', referencedColumnName: 'id' })
  unidade: UnidadeEasy;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
