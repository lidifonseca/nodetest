/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { validate, Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, Min, Max } from 'class-validator';

/**
 * VIEW
 */
@Entity('vw_api_atendimentos_aceite')
export default class VwApiAtendimentosAceite extends BaseEntity {
  @Column({ type: 'integer', name: 'id_pad_item', nullable: false })
  idPadItem: number;

  @Column({ type: 'integer', name: 'id_paciente', nullable: false })
  idPaciente: number;

  @Column({ type: 'integer', name: 'id_periodo', nullable: false })
  idPeriodo: number;

  @Column({ type: 'integer', name: 'id_periodicidade', nullable: false })
  idPeriodicidade: number;

  @Column({ type: 'integer', name: 'id_profissional', nullable: false })
  idProfissional: number;

  @Column({ type: 'integer', name: 'aceito', nullable: false })
  aceito: number;

  @Column({ type: 'integer', name: 'bairro', nullable: false })
  bairro: number;

  @Column({ type: 'integer', name: 'cep', nullable: false })
  cep: number;

  @Column({ type: 'integer', name: 'cidade', nullable: false })
  cidade: number;

  @Column({ type: 'integer', name: 'complemento', nullable: false })
  complemento: number;

  @Column({ type: 'integer', name: 'endereco', nullable: false })
  endereco: number;

  @Column({ type: 'integer', name: 'especialidade', nullable: false })
  especialidade: number;

  @Column({ type: 'integer', name: 'latitude', nullable: false })
  latitude: number;

  @Column({ type: 'integer', name: 'longitude', nullable: false })
  longitude: number;

  @Column({ type: 'integer', name: 'numero', nullable: false })
  numero: number;

  @Column({ type: 'integer', name: 'paciente', nullable: false })
  paciente: number;

  @Column({ type: 'integer', name: 'periodo', nullable: false })
  periodo: number;

  @Column({ type: 'integer', name: 'periodicidade', nullable: false })
  periodicidade: number;

  @Column({ type: 'integer', name: 'qtd_sessoes', nullable: false })
  qtdSessoes: number;

  @Column({ type: 'integer', name: 'uf', nullable: false })
  uf: number;

  @Column({ type: 'integer', name: 'valor', nullable: false })
  valor: number;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
