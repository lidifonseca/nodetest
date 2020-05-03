/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { validate, Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, Min, Max } from 'class-validator';

import StatusAtualProf from './status-atual-prof.entity';

/**
 * A ProfissionalStatusAtual.
 */
@Entity('profissional_status_atual')
export default class ProfissionalStatusAtual extends BaseEntity {
  @Column({ name: 'id_profissional' })
  idProfissional: string;

  @Column({ name: 'obs', length: 255 })
  obs: string;

  @Column({ type: 'integer', name: 'ativo' })
  ativo: number;

  @Column({ type: 'timestamp', name: 'data_post', nullable: false })
  dataPost: any;

  @Column({ name: 'id_usuario', nullable: false })
  idUsuario: string;

  @ManyToOne(type => StatusAtualProf)
  idStatusAtualProf: StatusAtualProf;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
