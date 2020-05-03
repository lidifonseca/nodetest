/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { validate, Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, Min, Max } from 'class-validator';

/**
 * A UsuarioPainelGerencial.
 */
@Entity('usuario_painel_gerencial')
export default class UsuarioPainelGerencial extends BaseEntity {
  @Column({ type: 'integer', name: 'id_usuario', nullable: false })
  idUsuario: number;

  @Column({ type: 'integer', name: 'ver_cronicos' })
  verCronicos: number;

  @Column({ type: 'integer', name: 'ver_pacientes_ativos_cr' })
  verPacientesAtivosCr: number;

  @Column({ type: 'integer', name: 'filtro_pacientes_ativos_cr' })
  filtroPacientesAtivosCr: number;

  @Column({ type: 'integer', name: 'ver_num_hosp_cr' })
  verNumHospCr: number;

  @Column({ type: 'integer', name: 'filtro_num_hosp_cr' })
  filtroNumHospCr: number;

  @Column({ type: 'integer', name: 'ver_num_desosp_cr' })
  verNumDesospCr: number;

  @Column({ type: 'integer', name: 'filtro_num_desosp_cr' })
  filtroNumDesospCr: number;

  @Column({ type: 'integer', name: 'ver_num_ps_cr' })
  verNumPsCr: number;

  @Column({ type: 'integer', name: 'filtro_num_ps_cr' })
  filtroNumPsCr: number;

  @Column({ type: 'integer', name: 'ver_num_obito_cr' })
  verNumObitoCr: number;

  @Column({ type: 'integer', name: 'filtro_num_obito_cr' })
  filtroNumObitoCr: number;

  @Column({ type: 'integer', name: 'ver_ind_cli_estaveis_cr' })
  verIndCliEstaveisCr: number;

  @Column({ type: 'integer', name: 'filtro_ind_cli_estaveis_cr' })
  filtroIndCliEstaveisCr: number;

  @Column({ type: 'integer', name: 'ver_num_cons_med_internas_cr' })
  verNumConsMedInternasCr: number;

  @Column({ type: 'integer', name: 'filtro_num_cons_med_internas_cr' })
  filtroNumConsMedInternasCr: number;

  @Column({ type: 'integer', name: 'ver_num_cons_med_externas_cr' })
  verNumConsMedExternasCr: number;

  @Column({ type: 'integer', name: 'filtro_num_cons_med_externas_cr' })
  filtroNumConsMedExternasCr: number;

  @Column({ type: 'integer', name: 'ver_num_laboratorial_cr' })
  verNumLaboratorialCr: number;

  @Column({ type: 'integer', name: 'filtro_num_laboratorial_cr' })
  filtroNumLaboratorialCr: number;

  @Column({ type: 'integer', name: 'ver_num_imagem_cr' })
  verNumImagemCr: number;

  @Column({ type: 'integer', name: 'filtro_num_imagem_cr' })
  filtroNumImagemCr: number;

  @Column({ type: 'integer', name: 'ver_num_outros_cr' })
  verNumOutrosCr: number;

  @Column({ type: 'integer', name: 'filtro_num_outros_cr' })
  filtroNumOutrosCr: number;

  @Column({ type: 'integer', name: 'ver_num_at_cat_cr' })
  verNumAtCatCr: number;

  @Column({ type: 'integer', name: 'filtro_num_at_cat_cr' })
  filtroNumAtCatCr: number;

  @Column({ type: 'integer', name: 'ver_num_cat_comp_cr' })
  verNumCatCompCr: number;

  @Column({ type: 'integer', name: 'filtro_num_cat_comp_cr' })
  filtroNumCatCompCr: number;

  @Column({ type: 'integer', name: 'ver_at_cm_sucesso_cr' })
  verAtCmSucessoCr: number;

  @Column({ type: 'integer', name: 'filtro_at_cm_sucesso_cr' })
  filtroAtCmSucessoCr: number;

  @Column({ type: 'integer', name: 'ver_media_pad_aberto_cr' })
  verMediaPadAbertoCr: number;

  @Column({ type: 'integer', name: 'filtro_media_pad_aberto_cr' })
  filtroMediaPadAbertoCr: number;

  @Column({ type: 'integer', name: 'ver_at_intercorrencia_cr' })
  verAtIntercorrenciaCr: number;

  @Column({ type: 'integer', name: 'filtro_at_intercorrencia_cr' })
  filtroAtIntercorrenciaCr: number;

  @Column({ type: 'integer', name: 'ver_tempo_medio_at_cr' })
  verTempoMedioAtCr: number;

  @Column({ type: 'integer', name: 'filtro_tempo_medio_at_cr' })
  filtroTempoMedioAtCr: number;

  @Column({ type: 'integer', name: 'ver_media_pta_cr' })
  verMediaPtaCr: number;

  @Column({ type: 'integer', name: 'filtro_media_pta_cr' })
  filtroMediaPtaCr: number;

  @Column({ type: 'integer', name: 'ver_indicador_uso_app_cr' })
  verIndicadorUsoAppCr: number;

  @Column({ type: 'integer', name: 'filtro_indicador_uso_app_cr' })
  filtroIndicadorUsoAppCr: number;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
