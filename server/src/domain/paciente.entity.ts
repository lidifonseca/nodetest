/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { validate, Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, Min, Max } from 'class-validator';

/**
 * @toStringFields nome cpf@@\n@listTableLayout nome email cpf rg registro@@\n@listFilterLayout nome<top;6> email<top;6> cpf<top;6> rg<top;6> registro<top;6>@@\n@formLayout nome<top;6> email<top;6> cpf<top;6> rg<top;6> registro<top;6>@@\n@viewLayout nome<top;6> email<top;6> cpf<top;6> rg<top;6> registro<top;6>@@
 */
@Entity('paciente')
export default class Paciente extends BaseEntity {
  @Column({ name: 'senha', length: 100 })
  senha: string;

  @Column({ name: 'nome', length: 60 })
  nome: string;

  @Column({ name: 'email', length: 100 })
  email: string;

  @Column({ name: 'cpf', length: 20 })
  cpf: string;

  @Column({ name: 'rg', length: 30 })
  rg: string;

  @Column({ name: 'registro', length: 50 })
  registro: string;

  @Column({ type: 'date', name: 'nascimento' })
  nascimento: any;

  @Column({ type: 'integer', name: 'sexo' })
  sexo: number;

  @Column({ name: 'telefone', length: 20 })
  telefone: string;

  @Column({ name: 'telefone_2', length: 20 })
  telefone2: string;

  @Column({ name: 'celular', length: 20 })
  celular: string;

  @Column({ name: 'celular_1', length: 20 })
  celular1: string;

  @Column({ name: 'cep', length: 10 })
  cep: string;

  @Column({ name: 'endereco', length: 100 })
  endereco: string;

  @Column({ name: 'numero', length: 30 })
  numero: string;

  @Column({ name: 'complemento', length: 20 })
  complemento: string;

  @Column({ name: 'bairro', length: 40 })
  bairro: string;

  @Column({ name: 'cidade', length: 100 })
  cidade: string;

  @Column({ name: 'uf', length: 5 })
  uf: string;

  @Column({ name: 'latitude', length: 60 })
  latitude: string;

  @Column({ name: 'longitude', length: 60 })
  longitude: string;

  @Column({ name: 'responsavel_familiar', length: 60 })
  responsavelFamiliar: string;

  @Column({ name: 'email_familiar', length: 100 })
  emailFamiliar: string;

  @Column({ name: 'cpf_familiar', length: 20 })
  cpfFamiliar: string;

  @Column({ name: 'rg_familiar', length: 30 })
  rgFamiliar: string;

  @Column({ type: 'date', name: 'nascimento_familiar' })
  nascimentoFamiliar: any;

  @Column({ type: 'integer', name: 'sexo_familiar' })
  sexoFamiliar: number;

  @Column({ name: 'telefone_familiar', length: 20 })
  telefoneFamiliar: string;

  @Column({ name: 'telefone_2_familiar', length: 20 })
  telefone2Familiar: string;

  @Column({ name: 'celular_familiar', length: 20 })
  celularFamiliar: string;

  @Column({ name: 'celular_2_familiar', length: 20 })
  celular2Familiar: string;

  @Column({ name: 'cep_familiar', length: 10 })
  cepFamiliar: string;

  @Column({ name: 'endereco_familiar', length: 100 })
  enderecoFamiliar: string;

  @Column({ name: 'numero_familiar', length: 30 })
  numeroFamiliar: string;

  @Column({ name: 'complemento_familiar', length: 20 })
  complementoFamiliar: string;

  @Column({ name: 'bairro_familiar', length: 40 })
  bairroFamiliar: string;

  @Column({ name: 'cidade_familiar', length: 100 })
  cidadeFamiliar: string;

  @Column({ name: 'uf_familiar', length: 5 })
  ufFamiliar: string;

  @Column({ name: 'latitude_familiar', length: 60 })
  latitudeFamiliar: string;

  @Column({ name: 'longitude_familiar', length: 60 })
  longitudeFamiliar: string;

  @Column({ name: 'observacao', length: 255 })
  observacao: string;

  @Column({ type: 'integer', name: 'aph', nullable: false })
  aph: number;

  @Column({ type: 'integer', name: 'nivel_complexidade' })
  nivelComplexidade: number;

  @Column({ type: 'integer', name: 'passagem_ps' })
  passagemPs: number;

  @Column({ name: 'obs_ps', length: 255 })
  obsPs: string;

  @Column({ type: 'integer', name: 'passagem_internacao' })
  passagemInternacao: number;

  @Column({ name: 'obs_internacao', length: 255 })
  obsInternacao: string;

  @Column({ type: 'float', name: 'custo_total' })
  custoTotal: number;

  @Column({ name: 'observacao_familiar', length: 255 })
  observacaoFamiliar: string;

  @Column({ type: 'integer', name: 'mesmo_endereco' })
  mesmoEndereco: number;

  @Column({ type: 'integer', name: 'acesso_familiar' })
  acessoFamiliar: number;

  @Column({ type: 'integer', name: 'com_responsavel' })
  comResponsavel: number;

  @Column({ type: 'integer', name: 'cadastro_completo' })
  cadastroCompleto: number;

  @Column({ type: 'integer', name: 'ativo' })
  ativo: number;

  @Column({ type: 'timestamp', name: 'data_post', nullable: false })
  dataPost: any;

  @Column({ name: 'detalhes', length: 255 })
  detalhes: string;

  @Column({ type: 'integer', name: 'tipohospital' })
  tipohospital: number;

  @Column({ name: 'liminar', length: 50 })
  liminar: string;

  @Column({ name: 'expo_token', length: 255 })
  expoToken: string;

  @Column({ type: 'integer', name: 'profissional_pref' })
  profissionalPref: number;

  @Column({ name: 'senha_chat', length: 45 })
  senhaChat: string;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
