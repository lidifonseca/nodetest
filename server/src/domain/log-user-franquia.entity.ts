/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import Acao from './acao.entity';
import Tela from './tela.entity';
import FranquiaUsuario from './franquia-usuario.entity';

/**
 * A LogUserFranquia.
 */
@Entity('log_user_franquia')
export default class LogUserFranquia extends BaseEntity {
  @Column({ type: 'blob', name: 'descricao' })
  descricao: any;

  @ManyToOne(type => Acao)
  idAcao: Acao;

  @ManyToOne(type => Tela)
  idTela: Tela;

  @ManyToOne(type => FranquiaUsuario)
  idUsuario: FranquiaUsuario;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
