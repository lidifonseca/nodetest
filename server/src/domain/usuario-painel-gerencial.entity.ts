/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

/**
 * A UsuarioPainelGerencial.
 */
@Entity('tb_usuario_painel_gerencial')
export default class UsuarioPainelGerencial extends BaseEntity {
  @Column({ type: 'integer', name: 'VER_CRONICOS' })
  verCronicos: number;

  @Column({ type: 'integer', name: 'VER_PACIENTES_ATIVOS_CR' })
  verPacientesAtivosCr: number;

  @Column({ type: 'integer', name: 'FILTRO_PACIENTES_ATIVOS_CR' })
  filtroPacientesAtivosCr: number;

  @Column({ type: 'integer', name: 'VER_NUM_HOSP_CR' })
  verNumHospCr: number;

  @Column({ type: 'integer', name: 'FILTRO_NUM_HOSP_CR' })
  filtroNumHospCr: number;

  @Column({ type: 'integer', name: 'VER_NUM_DESOSP_CR' })
  verNumDesospCr: number;

  @Column({ type: 'integer', name: 'FILTRO_NUM_DESOSP_CR' })
  filtroNumDesospCr: number;

  @Column({ type: 'integer', name: 'VER_NUM_PS_CR' })
  verNumPsCr: number;

  @Column({ type: 'integer', name: 'FILTRO_NUM_PS_CR' })
  filtroNumPsCr: number;

  @Column({ type: 'integer', name: 'VER_NUM_OBITO_CR' })
  verNumObitoCr: number;

  @Column({ type: 'integer', name: 'FILTRO_NUM_OBITO_CR' })
  filtroNumObitoCr: number;

  @Column({ type: 'integer', name: 'VER_IND_CLI_ESTAVEIS_CR' })
  verIndCliEstaveisCr: number;

  @Column({ type: 'integer', name: 'FILTRO_IND_CLI_ESTAVEIS_CR' })
  filtroIndCliEstaveisCr: number;

  @Column({ type: 'integer', name: 'VER_NUM_CONS_MED_INTERNAS_CR' })
  verNumConsMedInternasCr: number;

  @Column({ type: 'integer', name: 'FILTRO_NUM_CONS_MED_INTERNAS_CR' })
  filtroNumConsMedInternasCr: number;

  @Column({ type: 'integer', name: 'VER_NUM_CONS_MED_EXTERNAS_CR' })
  verNumConsMedExternasCr: number;

  @Column({ type: 'integer', name: 'FILTRO_NUM_CONS_MED_EXTERNAS_CR' })
  filtroNumConsMedExternasCr: number;

  @Column({ type: 'integer', name: 'VER_NUM_LABORATORIAL_CR' })
  verNumLaboratorialCr: number;

  @Column({ type: 'integer', name: 'FILTRO_NUM_LABORATORIAL_CR' })
  filtroNumLaboratorialCr: number;

  @Column({ type: 'integer', name: 'VER_NUM_IMAGEM_CR' })
  verNumImagemCr: number;

  @Column({ type: 'integer', name: 'FILTRO_NUM_IMAGEM_CR' })
  filtroNumImagemCr: number;

  @Column({ type: 'integer', name: 'VER_NUM_OUTROS_CR' })
  verNumOutrosCr: number;

  @Column({ type: 'integer', name: 'FILTRO_NUM_OUTROS_CR' })
  filtroNumOutrosCr: number;

  @Column({ type: 'integer', name: 'VER_NUM_AT_CAT_CR' })
  verNumAtCatCr: number;

  @Column({ type: 'integer', name: 'FILTRO_NUM_AT_CAT_CR' })
  filtroNumAtCatCr: number;

  @Column({ type: 'integer', name: 'VER_NUM_CAT_COMP_CR' })
  verNumCatCompCr: number;

  @Column({ type: 'integer', name: 'FILTRO_NUM_CAT_COMP_CR' })
  filtroNumCatCompCr: number;

  @Column({ type: 'integer', name: 'VER_AT_CM_SUCESSO_CR' })
  verAtCmSucessoCr: number;

  @Column({ type: 'integer', name: 'FILTRO_AT_CM_SUCESSO_CR' })
  filtroAtCmSucessoCr: number;

  @Column({ type: 'integer', name: 'VER_MEDIA_PAD_ABERTO_CR' })
  verMediaPadAbertoCr: number;

  @Column({ type: 'integer', name: 'FILTRO_MEDIA_PAD_ABERTO_CR' })
  filtroMediaPadAbertoCr: number;

  @Column({ type: 'integer', name: 'VER_AT_INTERCORRENCIA_CR' })
  verAtIntercorrenciaCr: number;

  @Column({ type: 'integer', name: 'FILTRO_AT_INTERCORRENCIA_CR' })
  filtroAtIntercorrenciaCr: number;

  @Column({ type: 'integer', name: 'VER_TEMPO_MEDIO_AT_CR' })
  verTempoMedioAtCr: number;

  @Column({ type: 'integer', name: 'FILTRO_TEMPO_MEDIO_AT_CR' })
  filtroTempoMedioAtCr: number;

  @Column({ type: 'integer', name: 'VER_MEDIA_PTA_CR' })
  verMediaPtaCr: number;

  @Column({ type: 'integer', name: 'FILTRO_MEDIA_PTA_CR' })
  filtroMediaPtaCr: number;

  @Column({ type: 'integer', name: 'VER_INDICADOR_USO_APP_CR' })
  verIndicadorUsoAppCr: number;

  @Column({ type: 'integer', name: 'FILTRO_INDICADOR_USO_APP_CR' })
  filtroIndicadorUsoAppCr: number;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
