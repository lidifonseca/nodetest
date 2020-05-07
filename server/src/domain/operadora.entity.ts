/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { validate, Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, Min, Max } from 'class-validator';

import UnidadeEasy from './unidade-easy.entity';
import TipoOperadora from './tipo-operadora.entity';

/**
 * @toStringFields nomeFantasia@@\n@listTableLayout nomeFantasia@@\n@listFilterLayout nomeFantasia{Label:top,Size:3}@@\n@formLayout\ntipoOperadora{Label:top,Size:12}\nunidade{Label:top,Size:12}\nnomeFantasia{Label:top,Size:12}\nrazaoSocial{Label:top,Size:12}\nendereco{Label:top,Size:12}\ncnpj{Label:top,Size:6}\nie{Label:top,Size:6}\nsite{Label:top,Size:12}\ncontatoCentralAtendimento{Label:top,Size:8}\nemailCentralAtendimento{Label:top,Size:4}\nnomeContatoComercial{Label:top,Size:4}\ncontatoComercial{Label:top,Size:4}\nemailComercial{Label:top,Size:4}\nnomeContatoFinanceiro{Label:top,Size:4}\ncontatoFinanceiro{Label:top,Size:4}\nemailFinanceiro{Label:top,Size:4}\n@@\n@viewLayout\nnomeFantasia{Label:left,Size:12}\nrazaoSocial{Label:left,Size:12}\ncnpj{Label:left,Size:12}\nie{Label:left,Size:12}\nrg{Label:left,Size:12}\nsite{Label:left,Size:12}\n@@
 */
@Entity('tb_operadora')
export default class Operadora extends BaseEntity {
  @Column({ name: 'NOME_FANTASIA', length: 100 })
  nomeFantasia: string;

  @Column({ name: 'RAZAO_SOCIAL', length: 150 })
  razaoSocial: string;

  @Column({ name: 'CNPJ', length: 20 })
  cnpj: string;

  @Column({ name: 'IE', length: 30 })
  ie: string;

  @Column({ name: 'SITE', length: 100 })
  site: string;

  @Column({ type: 'integer', name: 'ATIVO' })
  ativo: number;

  @Column({ name: 'ENDERECO', length: 200 })
  endereco: string;

  @Column({ name: 'CONTATO_CENTRAL_ATENDIMENTO', length: 20 })
  contatoCentralAtendimento: string;

  @Column({ name: 'EMAIL_CENTRAL_ATENDIMENTO', length: 50 })
  emailCentralAtendimento: string;

  @Column({ name: 'NOME_CONTATO_COMERCIAL', length: 200 })
  nomeContatoComercial: string;

  @Column({ name: 'CONTATO_COMERCIAL', length: 20 })
  contatoComercial: string;

  @Column({ name: 'EMAIL_COMERCIAL', length: 50 })
  emailComercial: string;

  @Column({ name: 'NOME_CONTATO_FINANCEIRO', length: 200 })
  nomeContatoFinanceiro: string;

  @Column({ name: 'CONTATO_FINANCEIRO', length: 20 })
  contatoFinanceiro: string;

  @Column({ name: 'EMAIL_FINANCEIRO', length: 50 })
  emailFinanceiro: string;

  @ManyToOne(type => UnidadeEasy)
  @JoinColumn({ name: 'ID_UNIDADE', referencedColumnName: 'id' })
  unidade: UnidadeEasy;

  @ManyToOne(type => TipoOperadora)
  @JoinColumn({ name: 'ID_TIPO_OPERADORA', referencedColumnName: 'id' })
  tipoOperadora: TipoOperadora;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
