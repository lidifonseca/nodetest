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
@Entity('atendimento_assinaturas')
export default class AtendimentoAssinaturas extends BaseEntity {
  @Column({ name: 'arquivo_assinatura', length: 150 })
  arquivoAssinatura: string;

  @Column({ type: 'timestamp', name: 'data_post', nullable: false })
  dataPost: any;

  @ManyToOne(type => Atendimento)
  idAtendimento: Atendimento;

  @ManyToOne(type => Profissional)
  idProfissional: Profissional;

  @ManyToOne(type => Paciente)
  idPaciente: Paciente;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
