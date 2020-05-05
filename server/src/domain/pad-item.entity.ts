/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { validate, Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, Min, Max } from 'class-validator';

import Atendimento from './atendimento.entity';
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
@Entity('pad_item')
export default class PadItem extends BaseEntity {
  @Column({ name: 'id_pedido' })
  idPedido: string;

  @Column({ type: 'date', name: 'data_inicio' })
  dataInicio: any;

  @Column({ type: 'date', name: 'data_fim' })
  dataFim: any;

  @Column({ type: 'integer', name: 'qtd_sessoes' })
  qtdSessoes: number;

  @Column({ name: 'observacao', length: 65535 })
  observacao: string;

  @Column({ type: 'integer', name: 'sub' })
  sub: number;

  @Column({ type: 'integer', name: 'ativo' })
  ativo: number;

  @Column({ type: 'timestamp', name: 'data_pad_item_incompleto' })
  dataPadItemIncompleto: any;

  @Column({ type: 'timestamp', name: 'data_pad_item_completo' })
  dataPadItemCompleto: any;

  @Column({ name: 'num_ghc', length: 40 })
  numGhc: string;

  @Column({ type: 'integer', name: 'cid_x_pta_novo' })
  cidXPtaNovo: number;

  @Column({ type: 'integer', name: 'categoria_id' })
  categoriaId: number;

  @Column({ type: 'double', name: 'score' })
  score: number;

  @OneToMany(
    type => Atendimento,
    other => other.idPadItem
  )
  atendimentos: Atendimento[];

  @OneToMany(
    type => AtendimentoCepRecusado,
    other => other.idPadItem
  )
  atendimentoCepRecusados: AtendimentoCepRecusado[];

  @OneToMany(
    type => AtendimentoSorteioFeito,
    other => other.idPadItem
  )
  atendimentoSorteioFeitos: AtendimentoSorteioFeito[];

  @OneToMany(
    type => PadItemAtividade,
    other => other.idPadItem
  )
  padItemAtividades: PadItemAtividade[];

  @OneToMany(
    type => PadItemCepRecusado,
    other => other.idPadItem
  )
  padItemCepRecusados: PadItemCepRecusado[];

  @OneToMany(
    type => PadItemResultado,
    other => other.idPadItem
  )
  padItemResultados: PadItemResultado[];

  @OneToMany(
    type => PadItemSorteioFeito,
    other => other.idPadItem
  )
  padItemSorteioFeitos: PadItemSorteioFeito[];

  @ManyToOne(type => Pad)
  idPad: Pad;

  @ManyToOne(type => Especialidade)
  idEspecialidade: Especialidade;

  @ManyToOne(type => Periodicidade)
  idPeriodicidade: Periodicidade;

  @ManyToOne(type => Periodo)
  idPeriodo: Periodo;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
