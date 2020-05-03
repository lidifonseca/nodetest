/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { validate, Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, Min, Max } from 'class-validator';

import AtendimentoAceite from './atendimento-aceite.entity';
import AtendimentoAssinaturas from './atendimento-assinaturas.entity';
import AtendimentoAtividades from './atendimento-atividades.entity';
import Paciente from './paciente.entity';
import Operadora from './operadora.entity';
import Especialidade from './especialidade.entity';
import PadItem from './pad-item.entity';
import StatusAtendimento from './status-atendimento.entity';
import Periodo from './periodo.entity';
import Cidade from './cidade.entity';

/**
 * A Atendimento.
 */
@Entity('atendimento')
export default class Atendimento extends BaseEntity {
  @Column({ name: 'id_unidade', nullable: false })
  idUnidade: string;

  @Column({ name: 'id_franquia' })
  idFranquia: string;

  @Column({ name: 'id_profissional' })
  idProfissional: string;

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

  @Column({ type: 'timestamp', name: 'data_agenda' })
  dataAgenda: any;

  @Column({ name: 'horario', length: 10 })
  horario: string;

  @Column({ type: 'timestamp', name: 'data_chegada' })
  dataChegada: any;

  @Column({ name: 'latitude_chegada', length: 60 })
  latitudeChegada: string;

  @Column({ name: 'longitude_chegada', length: 60 })
  longitudeChegada: string;

  @Column({ type: 'timestamp', name: 'data_saida' })
  dataSaida: any;

  @Column({ name: 'latitude_saida', length: 60 })
  latitudeSaida: string;

  @Column({ name: 'longitude_saida', length: 60 })
  longitudeSaida: string;

  @Column({ name: 'evolucao', length: 255 })
  evolucao: string;

  @Column({ name: 'observacao', length: 255 })
  observacao: string;

  @Column({ type: 'integer', name: 'intercorrencia' })
  intercorrencia: number;

  @Column({ type: 'integer', name: 'avaliacao' })
  avaliacao: number;

  @Column({ type: 'integer', name: 'aceito' })
  aceito: number;

  @Column({ name: 'motivo', length: 255 })
  motivo: string;

  @Column({ type: 'float', name: 'valor' })
  valor: number;

  @Column({ type: 'integer', name: 'ordem_atendimento' })
  ordemAtendimento: number;

  @Column({ type: 'integer', name: 'ativo' })
  ativo: number;

  @Column({ type: 'timestamp', name: 'data_post', nullable: false })
  dataPost: any;

  @Column({ type: 'timestamp', name: 'data_fora_hora' })
  dataForaHora: any;

  @Column({ type: 'integer', name: 'id_usuario_cancelamento' })
  idUsuarioCancelamento: number;

  @Column({ type: 'date', name: 'data_cancelamento' })
  dataCancelamento: any;

  @Column({ name: 'tipo_usuario_cancelamento', length: 5 })
  tipoUsuarioCancelamento: string;

  @Column({ name: 'confidencial_profissional', length: 255 })
  confidencialProfissional: string;

  @Column({ name: 'confidencial_paciente', length: 255 })
  confidencialPaciente: string;

  @Column({ name: 'imagem_assinatura', length: 245 })
  imagemAssinatura: string;

  @OneToMany(
    type => AtendimentoAceite,
    other => other.idAtendimento
  )
  atendimentoAceites: AtendimentoAceite[];

  @OneToMany(
    type => AtendimentoAssinaturas,
    other => other.idAtendimento
  )
  atendimentoAssinaturas: AtendimentoAssinaturas[];

  @OneToMany(
    type => AtendimentoAtividades,
    other => other.idAtendimento
  )
  atendimentoAtividades: AtendimentoAtividades[];

  @ManyToOne(type => Paciente)
  idPaciente: Paciente;

  @ManyToOne(type => Operadora)
  idOperadora: Operadora;

  @ManyToOne(type => Especialidade)
  idEspecialidade: Especialidade;

  @ManyToOne(type => PadItem)
  idPadItem: PadItem;

  @ManyToOne(type => StatusAtendimento)
  idStatusAtendimento: StatusAtendimento;

  @ManyToOne(type => Periodo)
  idPeriodo: Periodo;

  @ManyToOne(type => Cidade)
  idCidade: Cidade;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
