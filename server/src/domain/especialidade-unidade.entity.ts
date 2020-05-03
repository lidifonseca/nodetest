/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { validate, Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, Min, Max } from 'class-validator';

import UnidadeEasy from './unidade-easy.entity';
import Especialidade from './especialidade.entity';

/**
 * A EspecialidadeUnidade.
 */
@Entity('especialidade_unidade')
export default class EspecialidadeUnidade extends BaseEntity {
  @Column({ type: 'float', name: 'valor_baixa_urg' })
  valorBaixaUrg: number;

  @Column({ type: 'float', name: 'valor_alta_urg' })
  valorAltaUrg: number;

  @Column({ type: 'float', name: 'valor_pagar' })
  valorPagar: number;

  @Column({ type: 'integer', name: 'publicar' })
  publicar: number;

  @Column({ name: 'comentario_preco', length: 255 })
  comentarioPreco: string;

  @Column({ type: 'timestamp', name: 'data_post', nullable: false })
  dataPost: any;

  @ManyToOne(type => UnidadeEasy)
  idUnidade: UnidadeEasy;

  @ManyToOne(type => Especialidade)
  idEspecialidade: Especialidade;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
