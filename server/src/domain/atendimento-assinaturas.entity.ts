/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { validate, Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, Min, Max } from 'class-validator';

/**
 * A AtendimentoAssinaturas.
 */
@Entity('tb_atendimento_assinaturas')
export default class AtendimentoAssinaturas extends BaseEntity {
  @Column({ name: 'ARQUIVO_ASSINATURA', length: 150 })
  arquivoAssinatura: string;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
