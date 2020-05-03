/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { validate, Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, Min, Max } from 'class-validator';

/**
 * A ProfissionalDispositivoAtual.
 */
@Entity('profissional_dispositivo_atual')
export default class ProfissionalDispositivoAtual extends BaseEntity {
  @Column({ type: 'integer', name: 'id_profissional', nullable: false })
  idProfissional: number;

  @Column({ type: 'integer', name: 'tqt_traqueostomia' })
  tqtTraqueostomia: number;

  @Column({ type: 'integer', name: 'gtt_gastrostomia' })
  gttGastrostomia: number;

  @Column({ type: 'integer', name: 'sne_sonda_nasoenteral' })
  sneSondaNasoenteral: number;

  @Column({ type: 'integer', name: 'svd_sonda_vesical_de_demora' })
  svdSondaVesicalDeDemora: number;

  @Column({ type: 'integer', name: 'sva_sonda_vesical_de_alivio' })
  svaSondaVesicalDeAlivio: number;

  @Column({ type: 'integer', name: 'port_a_cath' })
  portACath: number;

  @Column({ type: 'integer', name: 'picc_acesso_venoso_central' })
  piccAcessoVenosoCentral: number;

  @Column({ type: 'integer', name: 'ventiladores' })
  ventiladores: number;

  @Column({ type: 'integer', name: 'upp_ulcera_por_pressao' })
  uppUlceraPorPressao: number;

  @Column({ type: 'integer', name: 'avp_acesso_venoso_periferico' })
  avpAcessoVenosoPeriferico: number;

  @Column({ type: 'integer', name: 'uripen' })
  uripen: number;

  @Column({ type: 'integer', name: 'fralda_geriatrica' })
  fraldaGeriatrica: number;

  @Column({ type: 'integer', name: 'sng_sonda_nasogastrica' })
  sngSondaNasogastrica: number;

  @Column({ type: 'integer', name: 'bipap' })
  bipap: number;

  @Column({ type: 'integer', name: 'cpap' })
  cpap: number;

  @Column({ type: 'integer', name: 'cistostomia' })
  cistostomia: number;

  @Column({ type: 'integer', name: 'cateter_nasal_de_oxigenio' })
  cateterNasalDeOxigenio: number;

  @Column({ type: 'integer', name: 'mascara_de_ventilacao' })
  mascaraDeVentilacao: number;

  @Column({ type: 'integer', name: 'entubacao_orotraqueal' })
  entubacaoOrotraqueal: number;

  @Column({ type: 'integer', name: 'id_usuario', nullable: false })
  idUsuario: number;

  @Column({ type: 'timestamp', name: 'data_post', nullable: false })
  dataPost: any;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
