/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

/**
 * A LogUserFranquia.
 */
@Entity('tb_log_user_franquia')
export default class LogUserFranquia extends BaseEntity {
  @Column({ name: 'DESCRICAO' })
  descricao: string;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
