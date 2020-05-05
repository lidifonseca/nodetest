/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import Acao from './acao.entity';
import Tela from './tela.entity';

/**
 * A LogUser.
 */
@Entity('log_user')
export default class LogUser extends BaseEntity {
  @Column({ name: 'id_usuario' })
  idUsuario: string;

  @Column({ type: 'blob', name: 'descricao' })
  descricao: any;

  @ManyToOne(type => Acao)
  idAcao: Acao;

  @ManyToOne(type => Tela)
  idTela: Tela;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
