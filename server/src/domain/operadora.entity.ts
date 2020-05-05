/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { validate, Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, Min, Max } from 'class-validator';

import Atendimento from './atendimento.entity';
import EspecialidadeOperadora from './especialidade-operadora.entity';
import PacienteOperadora from './paciente-operadora.entity';
import UnidadeEasy from './unidade-easy.entity';
import TipoOperadora from './tipo-operadora.entity';

/**
 * @toStringFields nomeFantasia@@\n@listTableLayout nomeFantasia@@\n@listFilterLayout nomeFantasia{Label:top,Size:3}@@\n@formLayout\ntipoOperadora{Label:top,Size:12}\nunidade{Label:top,Size:12}\nnomeFantasia{Label:top,Size:12}\nrazaoSocial{Label:top,Size:12}\nendereco{Label:top,Size:12}\ncnpj{Label:top,Size:6}\nie{Label:top,Size:6}\nsite{Label:top,Size:12}\ncontatoCentralAtendimento{Label:top,Size:8}\nemailCentralAtendimento{Label:top,Size:4}\nnomeContatoComercial{Label:top,Size:4}\ncontatoComercial{Label:top,Size:4}\nemailComercial{Label:top,Size:4}\nnomeContatoFinanceiro{Label:top,Size:4}\ncontatoFinanceiro{Label:top,Size:4}\nemailFinanceiro{Label:top,Size:4}\n@@\n@viewLayout\nnomeFantasia{Label:left,Size:12}\nrazaoSocial{Label:left,Size:12}\ncnpj{Label:left,Size:12}\nie{Label:left,Size:12}\nrg{Label:left,Size:12}\nsite{Label:left,Size:12}\n@@
 */
@Entity('operadora')
export default class Operadora extends BaseEntity {
  @Column({ name: 'nome_fantasia', length: 100 })
  nomeFantasia: string;

  @Column({ name: 'razao_social', length: 150 })
  razaoSocial: string;

  @Column({ name: 'cnpj', length: 20 })
  cnpj: string;

  @Column({ name: 'ie', length: 30 })
  ie: string;

  @Column({ name: 'site', length: 100 })
  site: string;

  @Column({ type: 'integer', name: 'ativo' })
  ativo: number;

  @Column({ name: 'endereco', length: 200 })
  endereco: string;

  @Column({ name: 'contato_central_atendimento', length: 20 })
  contatoCentralAtendimento: string;

  @Column({ name: 'email_central_atendimento', length: 50 })
  emailCentralAtendimento: string;

  @Column({ name: 'nome_contato_comercial', length: 200 })
  nomeContatoComercial: string;

  @Column({ name: 'contato_comercial', length: 20 })
  contatoComercial: string;

  @Column({ name: 'email_comercial', length: 50 })
  emailComercial: string;

  @Column({ name: 'nome_contato_financeiro', length: 200 })
  nomeContatoFinanceiro: string;

  @Column({ name: 'contato_financeiro', length: 20 })
  contatoFinanceiro: string;

  @Column({ name: 'email_financeiro', length: 50 })
  emailFinanceiro: string;

  @OneToMany(
    type => Atendimento,
    other => other.idOperadora
  )
  atendimentos: Atendimento[];

  @OneToMany(
    type => EspecialidadeOperadora,
    other => other.idOperadora
  )
  especialidadeOperadoras: EspecialidadeOperadora[];

  @OneToMany(
    type => PacienteOperadora,
    other => other.idOperadora
  )
  pacienteOperadoras: PacienteOperadora[];

  @ManyToOne(type => UnidadeEasy)
  unidade: UnidadeEasy;

  @ManyToOne(type => TipoOperadora)
  tipoOperadora: TipoOperadora;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}