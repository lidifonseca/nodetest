/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { validate, Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, Min, Max } from 'class-validator';

import UnidadeEasy from './unidade-easy.entity';

/**
 * A Atendimento.
 */
@Entity('tb_atendimento')
export default class Atendimento extends BaseEntity {
  @Column({ name: 'ID_FRANQUIA' })
  idFranquia: string;

  @Column({ name: 'ID_PROFISSIONAL' })
  idProfissional: string;

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

  @Column({ name: 'CIDADE', length: 100 })
  cidade: string;

  @Column({ name: 'UF', length: 5 })
  uf: string;

  @Column({ name: 'LATITUDE', length: 60 })
  latitude: string;

  @Column({ name: 'LONGITUDE', length: 60 })
  longitude: string;

  @Column({ type: 'timestamp', name: 'DATA_AGENDA' })
  dataAgenda: any;

  @Column({ name: 'HORARIO', length: 10 })
  horario: string;

  @Column({ type: 'timestamp', name: 'DATA_CHEGADA' })
  dataChegada: any;

  @Column({ name: 'LATITUDE_CHEGADA', length: 60 })
  latitudeChegada: string;

  @Column({ name: 'LONGITUDE_CHEGADA', length: 60 })
  longitudeChegada: string;

  @Column({ type: 'timestamp', name: 'DATA_SAIDA' })
  dataSaida: any;

  @Column({ name: 'LATITUDE_SAIDA', length: 60 })
  latitudeSaida: string;

  @Column({ name: 'LONGITUDE_SAIDA', length: 60 })
  longitudeSaida: string;

  @Column({ name: 'EVOLUCAO', length: 255 })
  evolucao: string;

  @Column({ name: 'OBSERVACAO', length: 255 })
  observacao: string;

  @Column({ type: 'integer', name: 'INTERCORRENCIA' })
  intercorrencia: number;

  @Column({ type: 'integer', name: 'AVALIACAO' })
  avaliacao: number;

  @Column({ type: 'integer', name: 'ACEITO' })
  aceito: number;

  @Column({ name: 'MOTIVO', length: 255 })
  motivo: string;

  @Column({ type: 'float', name: 'VALOR' })
  valor: number;

  @Column({ type: 'integer', name: 'ORDEM_ATENDIMENTO' })
  ordemAtendimento: number;

  @Column({ type: 'integer', name: 'ATIVO' })
  ativo: number;

  @Column({ type: 'timestamp', name: 'DATA_FORA_HORA' })
  dataForaHora: any;

  @Column({ type: 'integer', name: 'ID_USUARIO_CANCELAMENTO' })
  idUsuarioCancelamento: number;

  @Column({ type: 'date', name: 'DATA_CANCELAMENTO' })
  dataCancelamento: any;

  @Column({ name: 'TIPO_USUARIO_CANCELAMENTO', length: 5 })
  tipoUsuarioCancelamento: string;

  @Column({ name: 'CONFIDENCIAL_PROFISSIONAL', length: 255 })
  confidencialProfissional: string;

  @Column({ name: 'CONFIDENCIAL_PACIENTE', length: 255 })
  confidencialPaciente: string;

  @Column({ name: 'IMAGEM_ASSINATURA', length: 245 })
  imagemAssinatura: string;

  @ManyToOne(type => UnidadeEasy)
  @JoinColumn({ name: 'ID_UNIDADE', referencedColumnName: 'id' })
  unidade: UnidadeEasy;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
