/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import Acao from './acao.entity';
import Tela from './tela.entity';
import FranquiaUsuario from './franquia-usuario.entity';

/**
 * A LogUserFranquia.
 */
@Entity('tb_log_user_franquia')
export default class LogUserFranquia extends BaseEntity {
  @Column({ name: 'DESCRICAO' })
  descricao: string;

  @ManyToOne(type => Acao)
  @JoinColumn({ name: 'ID_ACAO', referencedColumnName: 'id' })
  acao: Acao;

  @ManyToOne(type => Tela)
  @JoinColumn({ name: 'ID_TELA', referencedColumnName: 'id' })
  tela: Tela;

  @ManyToOne(type => FranquiaUsuario)
  @JoinColumn({ name: 'ID_USUARIO', referencedColumnName: 'id' })
  usuario: FranquiaUsuario;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
