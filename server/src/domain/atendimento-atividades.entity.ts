/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import Atendimento from './atendimento.entity';
import CategoriaAtividade from './categoria-atividade.entity';

/**
 * A AtendimentoAtividades.
 */
@Entity('tb_atendimento_atividades')
export default class AtendimentoAtividades extends BaseEntity {
  @Column({ type: 'integer', name: 'FEITO' })
  feito: number;

  @ManyToOne(type => Atendimento)
  @JoinColumn({ name: 'ID_ATENDIMENTO', referencedColumnName: 'id' })
  atendimento: Atendimento;

  @ManyToOne(type => CategoriaAtividade)
  @JoinColumn({ name: 'ID_ATIVIDADE', referencedColumnName: 'id' })
  atividade: CategoriaAtividade;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
