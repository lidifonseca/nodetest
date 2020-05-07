/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

/**
 * A LogUser.
 */
@Entity('tb_log_user')
export default class LogUser extends BaseEntity {
  @Column({ name: 'DESCRICAO' })
  descricao: string;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
