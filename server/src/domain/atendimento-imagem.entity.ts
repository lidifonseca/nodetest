/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { validate, Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, Min, Max } from 'class-validator';

/**
 * A AtendimentoImagem.
 */
@Entity('tb_atendimento_imagem')
export default class AtendimentoImagem extends BaseEntity {
  @Column({ type: 'integer', name: 'ATENDIMENTO_ID', nullable: false })
  atendimentoId: number;

  @Column({ name: 'IMAGEM', length: 200, nullable: false })
  imagem: string;

  @Column({ type: 'timestamp', name: 'CRIADO_EM', nullable: false })
  criadoEm: any;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
