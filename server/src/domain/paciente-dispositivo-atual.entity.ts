/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { validate, Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, Min, Max } from 'class-validator';

/**
 * A PacienteDispositivoAtual.
 */
@Entity('tb_paciente_dispositivo_atual')
export default class PacienteDispositivoAtual extends BaseEntity {
  @Column({ type: 'integer', name: 'ID_PACIENTE', nullable: false })
  idPaciente: number;

  @Column({ type: 'integer', name: 'ID_PACIENTE_DISPOSITIVO', nullable: false })
  idPacienteDispositivo: number;

  @Column({ type: 'integer', name: 'TQT_TRAQUEOSTOMIA', nullable: false })
  tqtTraqueostomia: number;

  @Column({ type: 'integer', name: 'GTT_GASTROSTOMIA', nullable: false })
  gttGastrostomia: number;

  @Column({ type: 'integer', name: 'SNE_SONDA_NASOENTERAL', nullable: false })
  sneSondaNasoenteral: number;

  @Column({ type: 'integer', name: 'SVD_SONDA_VESICAL_DE_DEMORA', nullable: false })
  svdSondaVesicalDeDemora: number;

  @Column({ type: 'integer', name: 'SVA_SONDA_VESICAL_DE_ALIVIO', nullable: false })
  svaSondaVesicalDeAlivio: number;

  @Column({ type: 'integer', name: 'PORT_A_CATH', nullable: false })
  portACath: number;

  @Column({ type: 'integer', name: 'PICC_ACESSO_VENOSO_CENTRAL', nullable: false })
  piccAcessoVenosoCentral: number;

  @Column({ type: 'integer', name: 'VENTILADORES', nullable: false })
  ventiladores: number;

  @Column({ type: 'integer', name: 'UPP_ULCERA_POR_PRESSAO', nullable: false })
  uppUlceraPorPressao: number;

  @Column({ type: 'integer', name: 'AVP_ACESSO_VENOSO_PERIFERICO', nullable: false })
  avpAcessoVenosoPeriferico: number;

  @Column({ type: 'integer', name: 'URIPEN', nullable: false })
  uripen: number;

  @Column({ type: 'integer', name: 'FRALDA_GERIATRICA', nullable: false })
  fraldaGeriatrica: number;

  @Column({ type: 'integer', name: 'SNG_SONDA_NASOGASTRICA', nullable: false })
  sngSondaNasogastrica: number;

  @Column({ type: 'integer', name: 'BIPAP', nullable: false })
  bipap: number;

  @Column({ type: 'integer', name: 'CPAP', nullable: false })
  cpap: number;

  @Column({ type: 'integer', name: 'CISTOSTOMIA', nullable: false })
  cistostomia: number;

  @Column({ type: 'integer', name: 'CATETER_NASAL_DE_OXIGENIO', nullable: false })
  cateterNasalDeOxigenio: number;

  @Column({ type: 'integer', name: 'MASCARA_DE_VENTILACAO', nullable: false })
  mascaraDeVentilacao: number;

  @Column({ type: 'integer', name: 'ENTUBACAO_OROTRAQUEAL', nullable: false })
  entubacaoOrotraqueal: number;

  @Column({ type: 'integer', name: 'ILEOSTOMIA', nullable: false })
  ileostomia: number;

  @Column({ type: 'integer', name: 'JEJUNOSTOMIA', nullable: false })
  jejunostomia: number;

  @Column({ type: 'integer', name: 'COLOSTOMIA', nullable: false })
  colostomia: number;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
