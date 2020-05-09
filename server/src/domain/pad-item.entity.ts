/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { validate, Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, Min, Max } from 'class-validator';

import AtendimentoCepRecusado from './atendimento-cep-recusado.entity';
import AtendimentoSorteioFeito from './atendimento-sorteio-feito.entity';
import PadItemAtividade from './pad-item-atividade.entity';
import PadItemCepRecusado from './pad-item-cep-recusado.entity';
import PadItemResultado from './pad-item-resultado.entity';
import PadItemSorteioFeito from './pad-item-sorteio-feito.entity';
import Pad from './pad.entity';
import Especialidade from './especialidade.entity';
import Periodicidade from './periodicidade.entity';
import Periodo from './periodo.entity';

/**
 * A PadItem.
 */
@Entity('tb_pad_item')
export default class PadItem extends BaseEntity {
  @Column({ name: 'ID_PEDIDO' })
  idPedido: string;

  @Column({ type: 'date', name: 'DATA_INICIO' })
  dataInicio: any;

  @Column({ type: 'date', name: 'DATA_FIM' })
  dataFim: any;

  @Column({ type: 'integer', name: 'QTD_SESSOES' })
  qtdSessoes: number;

  @Column({ name: 'OBSERVACAO' })
  observacao: string;

  @Column({ type: 'integer', name: 'SUB' })
  sub: number;

  @Column({ type: 'boolean', name: 'ATIVO' })
  ativo: boolean;

  @Column({ type: 'timestamp', name: 'DATA_PAD_ITEM_INCOMPLETO' })
  dataPadItemIncompleto: any;

  @Column({ type: 'timestamp', name: 'DATA_PAD_ITEM_COMPLETO' })
  dataPadItemCompleto: any;

  @Column({ name: 'NUM_GHC', length: 40 })
  numGhc: string;

  @OneToMany(
    type => AtendimentoCepRecusado,
    other => other.padItem
  )
  atendimentoCepRecusados: AtendimentoCepRecusado[];

  @OneToMany(
    type => AtendimentoSorteioFeito,
    other => other.padItem
  )
  atendimentoSorteioFeitos: AtendimentoSorteioFeito[];

  @OneToMany(
    type => PadItemAtividade,
    other => other.padItem
  )
  padItemAtividades: PadItemAtividade[];

  @OneToMany(
    type => PadItemCepRecusado,
    other => other.padItem
  )
  padItemCepRecusados: PadItemCepRecusado[];

  @OneToMany(
    type => PadItemResultado,
    other => other.padItem
  )
  padItemResultados: PadItemResultado[];

  @OneToMany(
    type => PadItemSorteioFeito,
    other => other.padItem
  )
  padItemSorteioFeitos: PadItemSorteioFeito[];

  @ManyToOne(type => Pad)
  @JoinColumn({ name: 'ID_PAD', referencedColumnName: 'id' })
  pad: Pad;

  @ManyToOne(type => Especialidade)
  @JoinColumn({ name: 'ID_ESPECIALIDADE', referencedColumnName: 'id' })
  especialidade: Especialidade;

  @ManyToOne(type => Periodicidade)
  @JoinColumn({ name: 'ID_PERIODICIDADE', referencedColumnName: 'id' })
  periodicidade: Periodicidade;

  @ManyToOne(type => Periodo)
  @JoinColumn({ name: 'ID_PERIODO', referencedColumnName: 'id' })
  periodo: Periodo;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
