/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { validate, Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, Min, Max } from 'class-validator';

import Diario from './diario.entity';
import PacienteDiario from './paciente-diario.entity';
import UnidadeEasy from './unidade-easy.entity';
import TipoUsuario from './tipo-usuario.entity';

/**
 * A Usuario.
 */
@Entity('tb_usuario')
export default class Usuario extends BaseEntity {
  @Column({ name: 'ID_OPERADORA', length: 1000 })
  idOperadora: string;

  @Column({ name: 'SENHA', length: 100 })
  senha: string;

  @Column({ name: 'NOME', length: 60 })
  nome: string;

  @Column({ name: 'EMAIL', length: 100 })
  email: string;

  @Column({ name: 'TELEFONE', length: 20 })
  telefone: string;

  @Column({ name: 'CELULAR', length: 20 })
  celular: string;

  @Column({ name: 'CPF', length: 20 })
  cpf: string;

  @Column({ name: 'RG', length: 30 })
  rg: string;

  @Column({ type: 'integer', name: 'SEXO' })
  sexo: number;

  @Column({ type: 'date', name: 'NASCIMENTO' })
  nascimento: any;

  @Column({ type: 'integer', name: 'VER_ATENDIMENTO' })
  verAtendimento: number;

  @Column({ type: 'integer', name: 'CAD_ATENDIMENTO' })
  cadAtendimento: number;

  @Column({ type: 'integer', name: 'EDI_ATENDIMENTO' })
  ediAtendimento: number;

  @Column({ type: 'integer', name: 'BAIXA_MANUAL_ATENDIMENTO' })
  baixaManualAtendimento: number;

  @Column({ type: 'integer', name: 'DEL_ATENDIMENTO' })
  delAtendimento: number;

  @Column({ type: 'integer', name: 'REL_ATENDIMENTO' })
  relAtendimento: number;

  @Column({ type: 'integer', name: 'VER_PAD' })
  verPad: number;

  @Column({ type: 'integer', name: 'CAD_PAD' })
  cadPad: number;

  @Column({ type: 'integer', name: 'EDI_PAD' })
  ediPad: number;

  @Column({ type: 'integer', name: 'DEL_PAD' })
  delPad: number;

  @Column({ type: 'integer', name: 'REL_PAD' })
  relPad: number;

  @Column({ type: 'integer', name: 'VER_DIARIO' })
  verDiario: number;

  @Column({ type: 'integer', name: 'CAD_DIARIO' })
  cadDiario: number;

  @Column({ type: 'integer', name: 'EDI_DIARIO' })
  ediDiario: number;

  @Column({ type: 'integer', name: 'DEL_DIARIO' })
  delDiario: number;

  @Column({ type: 'integer', name: 'REL_DIARIO' })
  relDiario: number;

  @Column({ type: 'integer', name: 'VER_CATEGORIA' })
  verCategoria: number;

  @Column({ type: 'integer', name: 'CAD_CATEGORIA' })
  cadCategoria: number;

  @Column({ type: 'integer', name: 'EDI_CATEGORIA' })
  ediCategoria: number;

  @Column({ type: 'integer', name: 'DEL_CATEGORIA' })
  delCategoria: number;

  @Column({ type: 'integer', name: 'VER_ESPECIALIDADE' })
  verEspecialidade: number;

  @Column({ type: 'integer', name: 'CAD_ESPECIALIDADE' })
  cadEspecialidade: number;

  @Column({ type: 'integer', name: 'EDI_ESPECIALIDADE' })
  ediEspecialidade: number;

  @Column({ type: 'integer', name: 'DEL_ESPECIALIDADE' })
  delEspecialidade: number;

  @Column({ type: 'integer', name: 'REL_ESPECIALIDADE' })
  relEspecialidade: number;

  @Column({ type: 'integer', name: 'VER_ESPECIALIDADE_VALOR' })
  verEspecialidadeValor: number;

  @Column({ type: 'integer', name: 'CAD_ESPECIALIDADE_VALOR' })
  cadEspecialidadeValor: number;

  @Column({ type: 'integer', name: 'EDI_ESPECIALIDADE_VALOR' })
  ediEspecialidadeValor: number;

  @Column({ type: 'integer', name: 'DEL_ESPECIALIDADE_VALOR' })
  delEspecialidadeValor: number;

  @Column({ type: 'integer', name: 'REL_ESPECIALIDADE_VALOR' })
  relEspecialidadeValor: number;

  @Column({ type: 'integer', name: 'VER_OPERADORA' })
  verOperadora: number;

  @Column({ type: 'integer', name: 'CAD_OPERADORA' })
  cadOperadora: number;

  @Column({ type: 'integer', name: 'EDI_OPERADORA' })
  ediOperadora: number;

  @Column({ type: 'integer', name: 'DEL_OPERADORA' })
  delOperadora: number;

  @Column({ type: 'integer', name: 'VER_PACIENTE' })
  verPaciente: number;

  @Column({ type: 'integer', name: 'CAD_PACIENTE' })
  cadPaciente: number;

  @Column({ type: 'integer', name: 'EDI_PACIENTE' })
  ediPaciente: number;

  @Column({ type: 'integer', name: 'DEL_PACIENTE' })
  delPaciente: number;

  @Column({ type: 'integer', name: 'REL_PACIENTE' })
  relPaciente: number;

  @Column({ type: 'integer', name: 'VER_PROFISSIONAL' })
  verProfissional: number;

  @Column({ type: 'integer', name: 'CAD_PROFISSIONAL' })
  cadProfissional: number;

  @Column({ type: 'integer', name: 'EDI_PROFISSIONAL' })
  ediProfissional: number;

  @Column({ type: 'integer', name: 'DEL_PROFISSIONAL' })
  delProfissional: number;

  @Column({ type: 'integer', name: 'ATIV_PROFISSIONAL' })
  ativProfissional: number;

  @Column({ type: 'integer', name: 'REL_PROFISSIONAL' })
  relProfissional: number;

  @Column({ type: 'integer', name: 'VER_PUSH' })
  verPush: number;

  @Column({ type: 'integer', name: 'CAD_PUSH_PACIENTE' })
  cadPushPaciente: number;

  @Column({ type: 'integer', name: 'CAD_PUSH_PROFISSIONAL' })
  cadPushProfissional: number;

  @Column({ type: 'integer', name: 'VER_TERMO_PACIENTE' })
  verTermoPaciente: number;

  @Column({ type: 'integer', name: 'EDI_TERMO_PACIENTE' })
  ediTermoPaciente: number;

  @Column({ type: 'integer', name: 'VER_TERMO_PROFISSIONAL' })
  verTermoProfissional: number;

  @Column({ type: 'integer', name: 'EDI_TERMO_PROFISSIONAL' })
  ediTermoProfissional: number;

  @Column({ type: 'integer', name: 'VER_OUTROS' })
  verOutros: number;

  @Column({ type: 'integer', name: 'CAD_OUTROS' })
  cadOutros: number;

  @Column({ type: 'integer', name: 'EDI_OUTROS' })
  ediOutros: number;

  @Column({ type: 'integer', name: 'DEL_OUTROS' })
  delOutros: number;

  @Column({ type: 'integer', name: 'REL_OUTROS' })
  relOutros: number;

  @Column({ type: 'integer', name: 'VER_UNIDADE_EASY' })
  verUnidadeEasy: number;

  @Column({ type: 'integer', name: 'CAD_UNIDADE_EASY' })
  cadUnidadeEasy: number;

  @Column({ type: 'integer', name: 'EDI_UNIDADE_EASY' })
  ediUnidadeEasy: number;

  @Column({ type: 'integer', name: 'DEL_UNIDADE_EASY' })
  delUnidadeEasy: number;

  @Column({ type: 'integer', name: 'VER_USUARIO' })
  verUsuario: number;

  @Column({ type: 'integer', name: 'CAD_USUARIO' })
  cadUsuario: number;

  @Column({ type: 'integer', name: 'EDI_USUARIO' })
  ediUsuario: number;

  @Column({ type: 'integer', name: 'DEL_USUARIO' })
  delUsuario: number;

  @Column({ type: 'integer', name: 'VER_PTA_RESULTADO' })
  verPtaResultado: number;

  @Column({ type: 'integer', name: 'CAD_PTA_RESULTADO' })
  cadPtaResultado: number;

  @Column({ type: 'integer', name: 'DEL_PTA_RESULTADO' })
  delPtaResultado: number;

  @Column({ type: 'integer', name: 'VER_PTA_ATIVIDADE' })
  verPtaAtividade: number;

  @Column({ type: 'integer', name: 'CAD_PTA_ATIVIDADE' })
  cadPtaAtividade: number;

  @Column({ type: 'integer', name: 'DEL_PTA_ATIVIDADE' })
  delPtaAtividade: number;

  @Column({ type: 'integer', name: 'PERMISSAO_USUARIO' })
  permissaoUsuario: number;

  @Column({ type: 'integer', name: 'VER_PRONTUARIO' })
  verProntuario: number;

  @Column({ type: 'integer', name: 'CAD_PRONTUARIO' })
  cadProntuario: number;

  @Column({ type: 'integer', name: 'EDI_PRONTUARIO' })
  ediProntuario: number;

  @Column({ type: 'integer', name: 'DEL_PRONTUARIO' })
  delProntuario: number;

  @Column({ type: 'integer', name: 'DEL_PRONTUARIO_FOTO' })
  delProntuarioFoto: number;

  @Column({ type: 'integer', name: 'VALORES_FINANCEIRO' })
  valoresFinanceiro: number;

  @Column({ type: 'integer', name: 'AUTORIZACAO_VALOR_FINANCEIRO' })
  autorizacaoValorFinanceiro: number;

  @Column({ type: 'integer', name: 'CONFIRMAR_PAGAMENTO_FINANCEIRO' })
  confirmarPagamentoFinanceiro: number;

  @Column({ type: 'integer', name: 'GERENCIAR_SORTEIOS' })
  gerenciarSorteios: number;

  @Column({ type: 'integer', name: 'ENVIO_RECUSA' })
  envioRecusa: number;

  @Column({ type: 'integer', name: 'ENVIO_INTERCORRENCIA' })
  envioIntercorrencia: number;

  @Column({ type: 'integer', name: 'ENVIO_CANCELAMENTO' })
  envioCancelamento: number;

  @Column({ type: 'integer', name: 'ENVIO_AVALIACAO' })
  envioAvaliacao: number;

  @Column({ type: 'integer', name: 'ENVIO_PEDIDO' })
  envioPedido: number;

  @Column({ type: 'integer', name: 'ALERTA_ATENDIMENTO' })
  alertaAtendimento: number;

  @Column({ type: 'integer', name: 'ATIVO' })
  ativo: number;

  @Column({ type: 'integer', name: 'ENVIO_GLOSADO' })
  envioGlosado: number;

  @Column({ type: 'integer', name: 'EMERGENCIA' })
  emergencia: number;

  @Column({ type: 'integer', name: 'TOKEN' })
  token: number;

  @Column({ type: 'integer', name: 'EDIT_ATENDIMENTO' })
  editAtendimento: number;

  @Column({ type: 'integer', name: 'OUVIR_LIGACAO', nullable: false })
  ouvirLigacao: number;

  @Column({ type: 'integer', name: 'VER_PAINEL_INDICADORES' })
  verPainelIndicadores: number;

  @Column({ type: 'integer', name: 'PRORROGAR_PAD' })
  prorrogarPad: number;

  @Column({ type: 'integer', name: 'CANCELAR_ATEND_MASSA' })
  cancelarAtendMassa: number;

  @Column({ type: 'integer', name: 'CAD_MAT_MED' })
  cadMatMed: number;

  @Column({ type: 'integer', name: 'EDI_MAT_MED' })
  ediMatMed: number;

  @Column({ type: 'integer', name: 'DEL_MAT_MED' })
  delMatMed: number;

  @Column({ type: 'integer', name: 'VER_COL_PTA' })
  verColPta: number;

  @Column({ type: 'integer', name: 'VER_COL_FOTO' })
  verColFoto: number;

  @Column({ type: 'integer', name: 'VER_COL_LC' })
  verColLc: number;

  @Column({ type: 'integer', name: 'VER_ATEND_CANCELADO' })
  verAtendCancelado: number;

  @Column({ type: 'integer', name: 'VER_ATEND_AG_CONFIRMACAO' })
  verAtendAgConfirmacao: number;

  @Column({ type: 'integer', name: 'EDI_GEO_LOCALIZACAO_ATENDIMENTO' })
  ediGeoLocalizacaoAtendimento: number;

  @Column({ type: 'integer', name: 'COPIAR_EVOLUCAO' })
  copiarEvolucao: number;

  @Column({ type: 'integer', name: 'COPIAR_NOME_PROF' })
  copiarNomeProf: number;

  @Column({ type: 'integer', name: 'COPIAR_REGISTRO_PROF' })
  copiarRegistroProf: number;

  @Column({ name: 'ID_AREA_ATUACAO', length: 100 })
  idAreaAtuacao: string;

  @OneToMany(
    type => Diario,
    other => other.usuario
  )
  diarios: Diario[];

  @OneToMany(
    type => PacienteDiario,
    other => other.usuario
  )
  pacienteDiarios: PacienteDiario[];

  @ManyToOne(type => UnidadeEasy)
  @JoinColumn({ name: 'ID_UNIDADE', referencedColumnName: 'id' })
  unidade: UnidadeEasy;

  @ManyToOne(type => TipoUsuario)
  @JoinColumn({ name: 'ID_TIPO_USUARIO', referencedColumnName: 'id' })
  tipoUsuario: TipoUsuario;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
