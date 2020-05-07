/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { validate, Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, Min, Max } from 'class-validator';

/**
 * A ProfissionalDispositivoAtual.
 */
@Entity('tb_profissional_dispositivo_atual')
export default class ProfissionalDispositivoAtual extends BaseEntity {
  @Column({ type: 'integer', name: 'ID_PROFISSIONAL', nullable: false })
  idProfissional: number;

  @Column({ type: 'integer', name: 'TQT_TRAQUEOSTOMIA' })
  tqtTraqueostomia: number;

  @Column({ type: 'integer', name: 'GTT_GASTROSTOMIA' })
  gttGastrostomia: number;

  @Column({ type: 'integer', name: 'SNE_SONDA_NASOENTERAL' })
  sneSondaNasoenteral: number;

  @Column({ type: 'integer', name: 'SVD_SONDA_VESICAL_DE_DEMORA' })
  svdSondaVesicalDeDemora: number;

  @Column({ type: 'integer', name: 'SVA_SONDA_VESICAL_DE_ALIVIO' })
  svaSondaVesicalDeAlivio: number;

  @Column({ type: 'integer', name: 'PORT_A_CATH' })
  portACath: number;

  @Column({ type: 'integer', name: 'PICC_ACESSO_VENOSO_CENTRAL' })
  piccAcessoVenosoCentral: number;

  @Column({ type: 'integer', name: 'VENTILADORES' })
  ventiladores: number;

  @Column({ type: 'integer', name: 'UPP_ULCERA_POR_PRESSAO' })
  uppUlceraPorPressao: number;

  @Column({ type: 'integer', name: 'AVP_ACESSO_VENOSO_PERIFERICO' })
  avpAcessoVenosoPeriferico: number;

  @Column({ type: 'integer', name: 'URIPEN' })
  uripen: number;

  @Column({ type: 'integer', name: 'FRALDA_GERIATRICA' })
  fraldaGeriatrica: number;

  @Column({ type: 'integer', name: 'SNG_SONDA_NASOGASTRICA' })
  sngSondaNasogastrica: number;

  @Column({ type: 'integer', name: 'BIPAP' })
  bipap: number;

  @Column({ type: 'integer', name: 'CPAP' })
  cpap: number;

  @Column({ type: 'integer', name: 'CISTOSTOMIA' })
  cistostomia: number;

  @Column({ type: 'integer', name: 'CATETER_NASAL_DE_OXIGENIO' })
  cateterNasalDeOxigenio: number;

  @Column({ type: 'integer', name: 'MASCARA_DE_VENTILACAO' })
  mascaraDeVentilacao: number;

  @Column({ type: 'integer', name: 'ENTUBACAO_OROTRAQUEAL', nullable: false })
  entubacaoOrotraqueal: number;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
