/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { validate, Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, Min, Max } from 'class-validator';

/**
 * A ProfissionalComplexidadeAtual.
 */
@Entity('tb_profissional_complexidade_atual')
export default class ProfissionalComplexidadeAtual extends BaseEntity {
  @Column({ type: 'integer', name: 'ID_PROFISSIONAL', nullable: false })
  idProfissional: number;

  @Column({ type: 'integer', name: 'BAIXA' })
  baixa: number;

  @Column({ type: 'integer', name: 'MEDIA' })
  media: number;

  @Column({ type: 'integer', name: 'ALTA' })
  alta: number;

  @Column({ type: 'integer', name: 'VENTILACAO_MECANICA' })
  ventilacaoMecanica: number;

  @Column({ type: 'integer', name: 'TELEMONITORAMENTE', nullable: false })
  telemonitoramente: number;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
