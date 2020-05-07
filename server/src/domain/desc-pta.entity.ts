/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { validate, Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, Min, Max } from 'class-validator';

/**
 * A DescPta.
 */
@Entity('tb_desc_pta')
export default class DescPta extends BaseEntity {
  @Column({ name: 'NOME', length: 45 })
  nome: string;

  @Column({ name: 'RESULTADO_ESPERADO', length: 255 })
  resultadoEsperado: string;

  @Column({ type: 'integer', name: 'ATIVO', nullable: false })
  ativo: number;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
