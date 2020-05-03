/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { validate, Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, Min, Max } from 'class-validator';

/**
 * A ProfissionalComplexidadeAtual.
 */
@Entity('profissional_complexidade_atual')
export default class ProfissionalComplexidadeAtual extends BaseEntity {
  @Column({ type: 'integer', name: 'id_profissional', nullable: false })
  idProfissional: number;

  @Column({ type: 'integer', name: 'baixa' })
  baixa: number;

  @Column({ type: 'integer', name: 'media' })
  media: number;

  @Column({ type: 'integer', name: 'alta' })
  alta: number;

  @Column({ type: 'integer', name: 'ventilacao_mecanica' })
  ventilacaoMecanica: number;

  @Column({ type: 'integer', name: 'telemonitoramente', nullable: false })
  telemonitoramente: number;

  @Column({ type: 'integer', name: 'id_usuario' })
  idUsuario: number;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
