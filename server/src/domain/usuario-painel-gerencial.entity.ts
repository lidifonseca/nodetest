/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

/**
 * A UsuarioPainelGerencial.
 */
@Entity('tb_usuario_painel_gerencial')
export default class UsuarioPainelGerencial extends BaseEntity {
  @Column({ type: 'boolean', name: 'VER_CRONICOS' })
  verCronicos: boolean;

  @Column({ type: 'boolean', name: 'VER_PACIENTES_ATIVOS_CR' })
  verPacientesAtivosCr: boolean;

  @Column({ type: 'boolean', name: 'FILTRO_PACIENTES_ATIVOS_CR' })
  filtroPacientesAtivosCr: boolean;

  @Column({ type: 'boolean', name: 'VER_NUM_HOSP_CR' })
  verNumHospCr: boolean;

  @Column({ type: 'boolean', name: 'FILTRO_NUM_HOSP_CR' })
  filtroNumHospCr: boolean;

  @Column({ type: 'boolean', name: 'VER_NUM_DESOSP_CR' })
  verNumDesospCr: boolean;

  @Column({ type: 'boolean', name: 'FILTRO_NUM_DESOSP_CR' })
  filtroNumDesospCr: boolean;

  @Column({ type: 'boolean', name: 'VER_NUM_PS_CR' })
  verNumPsCr: boolean;

  @Column({ type: 'boolean', name: 'FILTRO_NUM_PS_CR' })
  filtroNumPsCr: boolean;

  @Column({ type: 'boolean', name: 'VER_NUM_OBITO_CR' })
  verNumObitoCr: boolean;

  @Column({ type: 'boolean', name: 'FILTRO_NUM_OBITO_CR' })
  filtroNumObitoCr: boolean;

  @Column({ type: 'boolean', name: 'VER_IND_CLI_ESTAVEIS_CR' })
  verIndCliEstaveisCr: boolean;

  @Column({ type: 'boolean', name: 'FILTRO_IND_CLI_ESTAVEIS_CR' })
  filtroIndCliEstaveisCr: boolean;

  @Column({ type: 'boolean', name: 'VER_NUM_CONS_MED_INTERNAS_CR' })
  verNumConsMedInternasCr: boolean;

  @Column({ type: 'boolean', name: 'FILTRO_NUM_CONS_MED_INTERNAS_CR' })
  filtroNumConsMedInternasCr: boolean;

  @Column({ type: 'boolean', name: 'VER_NUM_CONS_MED_EXTERNAS_CR' })
  verNumConsMedExternasCr: boolean;

  @Column({ type: 'boolean', name: 'FILTRO_NUM_CONS_MED_EXTERNAS_CR' })
  filtroNumConsMedExternasCr: boolean;

  @Column({ type: 'boolean', name: 'VER_NUM_LABORATORIAL_CR' })
  verNumLaboratorialCr: boolean;

  @Column({ type: 'boolean', name: 'FILTRO_NUM_LABORATORIAL_CR' })
  filtroNumLaboratorialCr: boolean;

  @Column({ type: 'boolean', name: 'VER_NUM_IMAGEM_CR' })
  verNumImagemCr: boolean;

  @Column({ type: 'boolean', name: 'FILTRO_NUM_IMAGEM_CR' })
  filtroNumImagemCr: boolean;

  @Column({ type: 'boolean', name: 'VER_NUM_OUTROS_CR' })
  verNumOutrosCr: boolean;

  @Column({ type: 'boolean', name: 'FILTRO_NUM_OUTROS_CR' })
  filtroNumOutrosCr: boolean;

  @Column({ type: 'boolean', name: 'VER_NUM_AT_CAT_CR' })
  verNumAtCatCr: boolean;

  @Column({ type: 'boolean', name: 'FILTRO_NUM_AT_CAT_CR' })
  filtroNumAtCatCr: boolean;

  @Column({ type: 'boolean', name: 'VER_NUM_CAT_COMP_CR' })
  verNumCatCompCr: boolean;

  @Column({ type: 'boolean', name: 'FILTRO_NUM_CAT_COMP_CR' })
  filtroNumCatCompCr: boolean;

  @Column({ type: 'boolean', name: 'VER_AT_CM_SUCESSO_CR' })
  verAtCmSucessoCr: boolean;

  @Column({ type: 'boolean', name: 'FILTRO_AT_CM_SUCESSO_CR' })
  filtroAtCmSucessoCr: boolean;

  @Column({ type: 'boolean', name: 'VER_MEDIA_PAD_ABERTO_CR' })
  verMediaPadAbertoCr: boolean;

  @Column({ type: 'boolean', name: 'FILTRO_MEDIA_PAD_ABERTO_CR' })
  filtroMediaPadAbertoCr: boolean;

  @Column({ type: 'boolean', name: 'VER_AT_INTERCORRENCIA_CR' })
  verAtIntercorrenciaCr: boolean;

  @Column({ type: 'boolean', name: 'FILTRO_AT_INTERCORRENCIA_CR' })
  filtroAtIntercorrenciaCr: boolean;

  @Column({ type: 'boolean', name: 'VER_TEMPO_MEDIO_AT_CR' })
  verTempoMedioAtCr: boolean;

  @Column({ type: 'boolean', name: 'FILTRO_TEMPO_MEDIO_AT_CR' })
  filtroTempoMedioAtCr: boolean;

  @Column({ type: 'boolean', name: 'VER_MEDIA_PTA_CR' })
  verMediaPtaCr: boolean;

  @Column({ type: 'boolean', name: 'FILTRO_MEDIA_PTA_CR' })
  filtroMediaPtaCr: boolean;

  @Column({ type: 'boolean', name: 'VER_INDICADOR_USO_APP_CR' })
  verIndicadorUsoAppCr: boolean;

  @Column({ type: 'boolean', name: 'FILTRO_INDICADOR_USO_APP_CR' })
  filtroIndicadorUsoAppCr: boolean;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
