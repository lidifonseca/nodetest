/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

/**
 * A EspecialidadeValor.
 */
@Entity('tb_especialidade_valor')
export default class EspecialidadeValor extends BaseEntity {
  @Column({ name: 'ID_FRANQUIA' })
  idFranquia: string;

  @Column({ type: 'float', name: 'VALOR' })
  valor: number;

  @Column({ type: 'integer', name: 'ATIVO' })
  ativo: number;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
