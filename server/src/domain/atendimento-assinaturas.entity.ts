/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { validate, Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, Min, Max } from 'class-validator';

import Atendimento from './atendimento.entity';
import Profissional from './profissional.entity';
import Paciente from './paciente.entity';

/**
 * A AtendimentoAssinaturas.
 */
@Entity('tb_atendimento_assinaturas')
export default class AtendimentoAssinaturas extends BaseEntity {
  @Column({ name: 'ARQUIVO_ASSINATURA', length: 150 })
  arquivoAssinatura: string;

  @ManyToOne(type => Atendimento)
  @JoinColumn({ name: 'ID_ATENDIMENTO', referencedColumnName: 'id' })
  atendimento: Atendimento;

  @ManyToOne(type => Profissional)
  @JoinColumn({ name: 'ID_PROFISSIONAL', referencedColumnName: 'id' })
  profissional: Profissional;

  @ManyToOne(type => Paciente)
  @JoinColumn({ name: 'ID_PACIENTE', referencedColumnName: 'id' })
  paciente: Paciente;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
