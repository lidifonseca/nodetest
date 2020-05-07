/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

/**
 * A UsuarioAcao.
 */
@Entity('tb_usuario_acao')
export default class UsuarioAcao extends BaseEntity {
  @Column({ type: 'integer', name: 'ID_ATENDIMENTO' })
  idAtendimento: number;

  @Column({ name: 'DESCRICAO' })
  descricao: string;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
