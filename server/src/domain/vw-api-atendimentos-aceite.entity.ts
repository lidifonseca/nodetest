/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { validate, Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, Min, Max } from 'class-validator';

/**
 * VIEW
 */
@Entity('tb_vw_api_atendimentos_aceite')
export default class VwApiAtendimentosAceite extends BaseEntity {
  @Column({ type: 'integer', name: 'ID_PAD_ITEM', nullable: false })
  idPadItem: number;

  @Column({ type: 'integer', name: 'ID_PACIENTE', nullable: false })
  idPaciente: number;

  @Column({ type: 'integer', name: 'ID_PERIODO', nullable: false })
  idPeriodo: number;

  @Column({ type: 'integer', name: 'ID_PERIODICIDADE', nullable: false })
  idPeriodicidade: number;

  @Column({ type: 'integer', name: 'ID_PROFISSIONAL', nullable: false })
  idProfissional: number;

  @Column({ type: 'integer', name: 'ACEITO', nullable: false })
  aceito: number;

  @Column({ type: 'integer', name: 'BAIRRO', nullable: false })
  bairro: number;

  @Column({ type: 'integer', name: 'CEP', nullable: false })
  cep: number;

  @Column({ type: 'integer', name: 'CIDADE', nullable: false })
  cidade: number;

  @Column({ type: 'integer', name: 'COMPLEMENTO', nullable: false })
  complemento: number;

  @Column({ type: 'integer', name: 'ENDERECO', nullable: false })
  endereco: number;

  @Column({ type: 'integer', name: 'ESPECIALIDADE', nullable: false })
  especialidade: number;

  @Column({ type: 'integer', name: 'LATITUDE', nullable: false })
  latitude: number;

  @Column({ type: 'integer', name: 'LONGITUDE', nullable: false })
  longitude: number;

  @Column({ type: 'integer', name: 'NUMERO', nullable: false })
  numero: number;

  @Column({ type: 'integer', name: 'PACIENTE', nullable: false })
  paciente: number;

  @Column({ type: 'integer', name: 'PERIODO', nullable: false })
  periodo: number;

  @Column({ type: 'integer', name: 'PERIODICIDADE', nullable: false })
  periodicidade: number;

  @Column({ type: 'integer', name: 'QTD_SESSOES', nullable: false })
  qtdSessoes: number;

  @Column({ type: 'integer', name: 'UF', nullable: false })
  uf: number;

  @Column({ type: 'integer', name: 'VALOR', nullable: false })
  valor: number;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
