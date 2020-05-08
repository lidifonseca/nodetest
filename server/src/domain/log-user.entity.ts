/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import Acao from './acao.entity';
import Tela from './tela.entity';

/**
 * A LogUser.
 */
@Entity('tb_log_user')
export default class LogUser extends BaseEntity {
  @Column({ name: 'DESCRICAO' })
  descricao: string;

  @ManyToOne(type => Acao)
  @JoinColumn({ name: 'ID_ACAO', referencedColumnName: 'id' })
  acao: Acao;

  @ManyToOne(type => Tela)
  @JoinColumn({ name: 'ID_TELA', referencedColumnName: 'id' })
  tela: Tela;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
