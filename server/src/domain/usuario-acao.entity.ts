/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import Tela from './tela.entity';
import Acao from './acao.entity';

/**
 * A UsuarioAcao.
 */
@Entity('tb_usuario_acao')
export default class UsuarioAcao extends BaseEntity {
  @Column({ type: 'integer', name: 'ID_ATENDIMENTO' })
  idAtendimento: number;

  @Column({ name: 'DESCRICAO' })
  descricao: string;

  @ManyToOne(type => Tela)
  @JoinColumn({ name: 'ID_TELA', referencedColumnName: 'id' })
  tela: Tela;

  @ManyToOne(type => Acao)
  @JoinColumn({ name: 'ID_ACAO', referencedColumnName: 'id' })
  acao: Acao;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
