/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { validate, Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, Min, Max } from 'class-validator';

import AtendimentoAssinaturas from './atendimento-assinaturas.entity';
import Diario from './diario.entity';
import PacienteDadosCartao from './paciente-dados-cartao.entity';
import PacienteDiagnostico from './paciente-diagnostico.entity';
import PacienteDiario from './paciente-diario.entity';
import PacienteEnqueteApp from './paciente-enquete-app.entity';
import PacienteOperadora from './paciente-operadora.entity';
import PacientePedido from './paciente-pedido.entity';
import PacientePush from './paciente-push.entity';
import UnidadeEasy from './unidade-easy.entity';
import Franquia from './franquia.entity';
import Cidade from './cidade.entity';
import GrauParentesco from './grau-parentesco.entity';
import Profissional from './profissional.entity';
import PacienteHospital from './paciente-hospital.entity';

/**
 * \n\n\n\n\n\n\n\n\n
 */
@Entity('tb_paciente')
export default class Paciente extends BaseEntity {
  @Column({ name: 'SENHA', length: 100 })
  senha: string;

  @Column({ name: 'NOME', length: 60 })
  nome: string;

  @Column({ name: 'EMAIL', length: 100 })
  email: string;

  @Column({ name: 'CPF', length: 20 })
  cpf: string;

  @Column({ name: 'RG', length: 30 })
  rg: string;

  @Column({ name: 'REGISTRO', length: 50 })
  registro: string;

  @Column({ type: 'date', name: 'NASCIMENTO' })
  nascimento: any;

  @Column({ type: 'integer', name: 'SEXO' })
  sexo: number;

  @Column({ name: 'TELEFONE', length: 20 })
  telefone: string;

  /**
   *
   */
  @Column({ name: 'TELEFONE2', length: 20 })
  telefone2: string;

  @Column({ name: 'CELULAR', length: 20 })
  celular: string;

  /**
   *
   */
  @Column({ name: 'CELULAR1', length: 20 })
  celular1: string;

  @Column({ name: 'CEP', length: 10 })
  cep: string;

  @Column({ name: 'ENDERECO', length: 100 })
  endereco: string;

  @Column({ name: 'NUMERO', length: 30 })
  numero: string;

  @Column({ name: 'COMPLEMENTO', length: 20 })
  complemento: string;

  @Column({ name: 'BAIRRO', length: 40 })
  bairro: string;

  @Column({ name: 'UF', length: 5 })
  uf: string;

  @Column({ name: 'LATITUDE', length: 60 })
  latitude: string;

  @Column({ name: 'LONGITUDE', length: 60 })
  longitude: string;

  @Column({ name: 'RESPONSAVEL_FAMILIAR', length: 60 })
  responsavelFamiliar: string;

  @Column({ name: 'EMAIL_FAMILIAR', length: 100 })
  emailFamiliar: string;

  @Column({ name: 'CPF_FAMILIAR', length: 20 })
  cpfFamiliar: string;

  @Column({ name: 'RG_FAMILIAR', length: 30 })
  rgFamiliar: string;

  @Column({ type: 'date', name: 'NASCIMENTO_FAMILIAR' })
  nascimentoFamiliar: any;

  @Column({ type: 'integer', name: 'SEXO_FAMILIAR' })
  sexoFamiliar: number;

  @Column({ name: 'TELEFONE_FAMILIAR', length: 20 })
  telefoneFamiliar: string;

  /**
   *
   */
  @Column({ name: 'TELEFONE2_FAMILIAR', length: 20 })
  telefone2Familiar: string;

  @Column({ name: 'CELULAR_FAMILIAR', length: 20 })
  celularFamiliar: string;

  /**
   *
   */
  @Column({ name: 'CELULAR2_FAMILIAR', length: 20 })
  celular2Familiar: string;

  @Column({ name: 'CEP_FAMILIAR', length: 10 })
  cepFamiliar: string;

  @Column({ name: 'ENDERECO_FAMILIAR', length: 100 })
  enderecoFamiliar: string;

  @Column({ name: 'NUMERO_FAMILIAR', length: 30 })
  numeroFamiliar: string;

  @Column({ name: 'COMPLEMENTO_FAMILIAR', length: 20 })
  complementoFamiliar: string;

  @Column({ name: 'BAIRRO_FAMILIAR', length: 40 })
  bairroFamiliar: string;

  @Column({ name: 'UF_FAMILIAR', length: 5 })
  ufFamiliar: string;

  @Column({ name: 'LATITUDE_FAMILIAR', length: 60 })
  latitudeFamiliar: string;

  @Column({ name: 'LONGITUDE_FAMILIAR', length: 60 })
  longitudeFamiliar: string;

  @Column({ name: 'OBSERVACAO' })
  observacao: string;

  @Column({ type: 'integer', name: 'APH', nullable: false })
  aph: number;

  @Column({ type: 'integer', name: 'NIVEL_COMPLEXIDADE' })
  nivelComplexidade: number;

  @Column({ type: 'integer', name: 'PASSAGEM_PS' })
  passagemPs: number;

  @Column({ name: 'OBS_PS', length: 255 })
  obsPs: string;

  @Column({ type: 'integer', name: 'PASSAGEM_INTERNACAO' })
  passagemInternacao: number;

  @Column({ name: 'OBS_INTERNACAO', length: 255 })
  obsInternacao: string;

  @Column({ type: 'float', name: 'CUSTO_TOTAL' })
  custoTotal: number;

  @Column({ name: 'OBSERVACAO_FAMILIAR', length: 255 })
  observacaoFamiliar: string;

  @Column({ type: 'integer', name: 'MESMO_ENDERECO' })
  mesmoEndereco: number;

  @Column({ type: 'integer', name: 'ACESSO_FAMILIAR' })
  acessoFamiliar: number;

  @Column({ type: 'integer', name: 'COM_RESPONSAVEL' })
  comResponsavel: number;

  @Column({ type: 'integer', name: 'CADASTRO_COMPLETO' })
  cadastroCompleto: number;

  @Column({ type: 'boolean', name: 'ATIVO' })
  ativo: boolean;

  @Column({ name: 'DETALHES' })
  detalhes: string;

  @Column({ name: 'LIMINAR', length: 50 })
  liminar: string;

  @Column({ name: 'EXPO_TOKEN', length: 255 })
  expoToken: string;

  @OneToMany(
    type => AtendimentoAssinaturas,
    other => other.paciente
  )
  atendimentoAssinaturas: AtendimentoAssinaturas[];

  @OneToMany(
    type => Diario,
    other => other.paciente
  )
  diarios: Diario[];

  @OneToMany(
    type => PacienteDadosCartao,
    other => other.paciente
  )
  pacienteDadosCartaos: PacienteDadosCartao[];

  @OneToMany(
    type => PacienteDiagnostico,
    other => other.paciente
  )
  pacienteDiagnosticos: PacienteDiagnostico[];

  @OneToMany(
    type => PacienteDiario,
    other => other.paciente
  )
  pacienteDiarios: PacienteDiario[];

  @OneToMany(
    type => PacienteEnqueteApp,
    other => other.paciente
  )
  pacienteEnqueteApps: PacienteEnqueteApp[];

  @OneToMany(
    type => PacienteOperadora,
    other => other.paciente
  )
  pacienteOperadoras: PacienteOperadora[];

  @OneToMany(
    type => PacientePedido,
    other => other.paciente
  )
  pacientePedidos: PacientePedido[];

  @OneToMany(
    type => PacientePush,
    other => other.paciente
  )
  pacientePushes: PacientePush[];

  @ManyToOne(type => UnidadeEasy)
  @JoinColumn({ name: 'ID_UNIDADE', referencedColumnName: 'id' })
  unidade: UnidadeEasy;

  @ManyToOne(type => Franquia)
  @JoinColumn({ name: 'ID_FRANQUIA', referencedColumnName: 'id' })
  franquia: Franquia;

  @ManyToOne(type => Cidade)
  @JoinColumn({ name: 'ID_CIDADE', referencedColumnName: 'id' })
  cidade: Cidade;

  @ManyToOne(type => Cidade)
  @JoinColumn({ name: 'ID_CIDADE_FAMILIAR', referencedColumnName: 'id' })
  cidadeFamiliar: Cidade;

  @ManyToOne(type => GrauParentesco)
  @JoinColumn({ name: 'ID_GRAU_PARENTESCO', referencedColumnName: 'id' })
  grauParentesco: GrauParentesco;

  @ManyToOne(type => Profissional)
  @JoinColumn({ name: 'ID_PROFISSIONAL_PREF', referencedColumnName: 'id' })
  profissionalPref: Profissional;

  @ManyToOne(type => PacienteHospital)
  @JoinColumn({ name: 'ID_TIPOHOSPITAL', referencedColumnName: 'id' })
  tipohospital: PacienteHospital;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
