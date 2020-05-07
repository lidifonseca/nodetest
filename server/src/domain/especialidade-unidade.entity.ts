/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { validate, Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, Min, Max } from 'class-validator';

import UnidadeEasy from './unidade-easy.entity';

/**
 * A EspecialidadeUnidade.
 */
@Entity('tb_especialidade_unidade')
export default class EspecialidadeUnidade extends BaseEntity {
  @Column({ type: 'float', name: 'VALOR_BAIXA_URG' })
  valorBaixaUrg: number;

  @Column({ type: 'float', name: 'VALOR_ALTA_URG' })
  valorAltaUrg: number;

  @Column({ type: 'float', name: 'VALOR_PAGAR' })
  valorPagar: number;

  @Column({ type: 'integer', name: 'PUBLICAR' })
  publicar: number;

  @Column({ name: 'COMENTARIO_PRECO', length: 255 })
  comentarioPreco: string;

  @ManyToOne(type => UnidadeEasy)
  @JoinColumn({ name: 'ID_UNIDADE', referencedColumnName: 'id' })
  unidade: UnidadeEasy;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
