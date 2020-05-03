/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { validate, Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, Min, Max } from 'class-validator';

/**
 * A PacienteDispositivoAtual.
 */
@Entity('paciente_dispositivo_atual')
export default class PacienteDispositivoAtual extends BaseEntity {
  @Column({ type: 'integer', name: 'id_paciente', nullable: false })
  idPaciente: number;

  @Column({ type: 'integer', name: 'id_paciente_dispositivo', nullable: false })
  idPacienteDispositivo: number;

  @Column({ type: 'integer', name: 'tqt_traqueostomia', nullable: false })
  tqtTraqueostomia: number;

  @Column({ type: 'integer', name: 'gtt_gastrostomia', nullable: false })
  gttGastrostomia: number;

  @Column({ type: 'integer', name: 'sne_sonda_nasoenteral', nullable: false })
  sneSondaNasoenteral: number;

  @Column({ type: 'integer', name: 'svd_sonda_vesical_de_demora', nullable: false })
  svdSondaVesicalDeDemora: number;

  @Column({ type: 'integer', name: 'sva_sonda_vesical_de_alivio', nullable: false })
  svaSondaVesicalDeAlivio: number;

  @Column({ type: 'integer', name: 'port_a_cath', nullable: false })
  portACath: number;

  @Column({ type: 'integer', name: 'picc_acesso_venoso_central', nullable: false })
  piccAcessoVenosoCentral: number;

  @Column({ type: 'integer', name: 'ventiladores', nullable: false })
  ventiladores: number;

  @Column({ type: 'integer', name: 'upp_ulcera_por_pressao', nullable: false })
  uppUlceraPorPressao: number;

  @Column({ type: 'integer', name: 'avp_acesso_venoso_periferico', nullable: false })
  avpAcessoVenosoPeriferico: number;

  @Column({ type: 'integer', name: 'uripen', nullable: false })
  uripen: number;

  @Column({ type: 'integer', name: 'fralda_geriatrica', nullable: false })
  fraldaGeriatrica: number;

  @Column({ type: 'integer', name: 'sng_sonda_nasogastrica', nullable: false })
  sngSondaNasogastrica: number;

  @Column({ type: 'integer', name: 'bipap', nullable: false })
  bipap: number;

  @Column({ type: 'integer', name: 'cpap', nullable: false })
  cpap: number;

  @Column({ type: 'integer', name: 'cistostomia', nullable: false })
  cistostomia: number;

  @Column({ type: 'integer', name: 'cateter_nasal_de_oxigenio', nullable: false })
  cateterNasalDeOxigenio: number;

  @Column({ type: 'integer', name: 'mascara_de_ventilacao', nullable: false })
  mascaraDeVentilacao: number;

  @Column({ type: 'integer', name: 'entubacao_orotraqueal', nullable: false })
  entubacaoOrotraqueal: number;

  @Column({ type: 'integer', name: 'ileostomia', nullable: false })
  ileostomia: number;

  @Column({ type: 'integer', name: 'jejunostomia', nullable: false })
  jejunostomia: number;

  @Column({ type: 'integer', name: 'colostomia', nullable: false })
  colostomia: number;

  @Column({ type: 'integer', name: 'id_usuario', nullable: false })
  idUsuario: number;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
