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

  @Column({ type: 'boolean', name: 'VER_ATENDIMENTO' })
  verAtendimento: boolean;

  @Column({ type: 'boolean', name: 'CAD_ATENDIMENTO' })
  cadAtendimento: boolean;

  @Column({ type: 'boolean', name: 'EDI_ATENDIMENTO' })
  ediAtendimento: boolean;

  @Column({ type: 'boolean', name: 'BAIXA_MANUAL_ATENDIMENTO' })
  baixaManualAtendimento: boolean;

  @Column({ type: 'boolean', name: 'DEL_ATENDIMENTO' })
  delAtendimento: boolean;

  @Column({ type: 'boolean', name: 'REL_ATENDIMENTO' })
  relAtendimento: boolean;

  @Column({ type: 'boolean', name: 'VER_PAD' })
  verPad: boolean;

  @Column({ type: 'boolean', name: 'CAD_PAD' })
  cadPad: boolean;

  @Column({ type: 'boolean', name: 'EDI_PAD' })
  ediPad: boolean;

  @Column({ type: 'boolean', name: 'DEL_PAD' })
  delPad: boolean;

  @Column({ type: 'boolean', name: 'REL_PAD' })
  relPad: boolean;

  @Column({ type: 'boolean', name: 'VER_DIARIO' })
  verDiario: boolean;

  @Column({ type: 'boolean', name: 'CAD_DIARIO' })
  cadDiario: boolean;

  @Column({ type: 'boolean', name: 'EDI_DIARIO' })
  ediDiario: boolean;

  @Column({ type: 'boolean', name: 'DEL_DIARIO' })
  delDiario: boolean;

  @Column({ type: 'boolean', name: 'REL_DIARIO' })
  relDiario: boolean;

  @Column({ type: 'boolean', name: 'VER_CATEGORIA' })
  verCategoria: boolean;

  @Column({ type: 'boolean', name: 'CAD_CATEGORIA' })
  cadCategoria: boolean;

  @Column({ type: 'boolean', name: 'EDI_CATEGORIA' })
  ediCategoria: boolean;

  @Column({ type: 'boolean', name: 'DEL_CATEGORIA' })
  delCategoria: boolean;

  @Column({ type: 'boolean', name: 'VER_ESPECIALIDADE' })
  verEspecialidade: boolean;

  @Column({ type: 'boolean', name: 'CAD_ESPECIALIDADE' })
  cadEspecialidade: boolean;

  @Column({ type: 'boolean', name: 'EDI_ESPECIALIDADE' })
  ediEspecialidade: boolean;

  @Column({ type: 'boolean', name: 'DEL_ESPECIALIDADE' })
  delEspecialidade: boolean;

  @Column({ type: 'boolean', name: 'REL_ESPECIALIDADE' })
  relEspecialidade: boolean;

  @Column({ type: 'boolean', name: 'VER_ESPECIALIDADE_VALOR' })
  verEspecialidadeValor: boolean;

  @Column({ type: 'boolean', name: 'CAD_ESPECIALIDADE_VALOR' })
  cadEspecialidadeValor: boolean;

  @Column({ type: 'boolean', name: 'EDI_ESPECIALIDADE_VALOR' })
  ediEspecialidadeValor: boolean;

  @Column({ type: 'boolean', name: 'DEL_ESPECIALIDADE_VALOR' })
  delEspecialidadeValor: boolean;

  @Column({ type: 'boolean', name: 'REL_ESPECIALIDADE_VALOR' })
  relEspecialidadeValor: boolean;

  @Column({ type: 'boolean', name: 'VER_OPERADORA' })
  verOperadora: boolean;

  @Column({ type: 'boolean', name: 'CAD_OPERADORA' })
  cadOperadora: boolean;

  @Column({ type: 'boolean', name: 'EDI_OPERADORA' })
  ediOperadora: boolean;

  @Column({ type: 'boolean', name: 'DEL_OPERADORA' })
  delOperadora: boolean;

  @Column({ type: 'boolean', name: 'VER_PACIENTE' })
  verPaciente: boolean;

  @Column({ type: 'boolean', name: 'CAD_PACIENTE' })
  cadPaciente: boolean;

  @Column({ type: 'boolean', name: 'EDI_PACIENTE' })
  ediPaciente: boolean;

  @Column({ type: 'boolean', name: 'DEL_PACIENTE' })
  delPaciente: boolean;

  @Column({ type: 'boolean', name: 'REL_PACIENTE' })
  relPaciente: boolean;

  @Column({ type: 'boolean', name: 'VER_PROFISSIONAL' })
  verProfissional: boolean;

  @Column({ type: 'boolean', name: 'CAD_PROFISSIONAL' })
  cadProfissional: boolean;

  @Column({ type: 'boolean', name: 'EDI_PROFISSIONAL' })
  ediProfissional: boolean;

  @Column({ type: 'boolean', name: 'DEL_PROFISSIONAL' })
  delProfissional: boolean;

  @Column({ type: 'boolean', name: 'ATIV_PROFISSIONAL' })
  ativProfissional: boolean;

  @Column({ type: 'boolean', name: 'REL_PROFISSIONAL' })
  relProfissional: boolean;

  @Column({ type: 'boolean', name: 'VER_PUSH' })
  verPush: boolean;

  @Column({ type: 'boolean', name: 'CAD_PUSH_PACIENTE' })
  cadPushPaciente: boolean;

  @Column({ type: 'boolean', name: 'CAD_PUSH_PROFISSIONAL' })
  cadPushProfissional: boolean;

  @Column({ type: 'boolean', name: 'VER_TERMO_PACIENTE' })
  verTermoPaciente: boolean;

  @Column({ type: 'boolean', name: 'EDI_TERMO_PACIENTE' })
  ediTermoPaciente: boolean;

  @Column({ type: 'boolean', name: 'VER_TERMO_PROFISSIONAL' })
  verTermoProfissional: boolean;

  @Column({ type: 'boolean', name: 'EDI_TERMO_PROFISSIONAL' })
  ediTermoProfissional: boolean;

  @Column({ type: 'boolean', name: 'VER_OUTROS' })
  verOutros: boolean;

  @Column({ type: 'boolean', name: 'CAD_OUTROS' })
  cadOutros: boolean;

  @Column({ type: 'boolean', name: 'EDI_OUTROS' })
  ediOutros: boolean;

  @Column({ type: 'boolean', name: 'DEL_OUTROS' })
  delOutros: boolean;

  @Column({ type: 'boolean', name: 'REL_OUTROS' })
  relOutros: boolean;

  @Column({ type: 'boolean', name: 'VER_UNIDADE_EASY' })
  verUnidadeEasy: boolean;

  @Column({ type: 'boolean', name: 'CAD_UNIDADE_EASY' })
  cadUnidadeEasy: boolean;

  @Column({ type: 'boolean', name: 'EDI_UNIDADE_EASY' })
  ediUnidadeEasy: boolean;

  @Column({ type: 'boolean', name: 'DEL_UNIDADE_EASY' })
  delUnidadeEasy: boolean;

  @Column({ type: 'boolean', name: 'VER_USUARIO' })
  verUsuario: boolean;

  @Column({ type: 'boolean', name: 'CAD_USUARIO' })
  cadUsuario: boolean;

  @Column({ type: 'boolean', name: 'EDI_USUARIO' })
  ediUsuario: boolean;

  @Column({ type: 'boolean', name: 'DEL_USUARIO' })
  delUsuario: boolean;

  @Column({ type: 'boolean', name: 'VER_PTA_RESULTADO' })
  verPtaResultado: boolean;

  @Column({ type: 'boolean', name: 'CAD_PTA_RESULTADO' })
  cadPtaResultado: boolean;

  @Column({ type: 'boolean', name: 'DEL_PTA_RESULTADO' })
  delPtaResultado: boolean;

  @Column({ type: 'boolean', name: 'VER_PTA_ATIVIDADE' })
  verPtaAtividade: boolean;

  @Column({ type: 'boolean', name: 'CAD_PTA_ATIVIDADE' })
  cadPtaAtividade: boolean;

  @Column({ type: 'boolean', name: 'DEL_PTA_ATIVIDADE' })
  delPtaAtividade: boolean;

  @Column({ type: 'boolean', name: 'PERMISSAO_USUARIO' })
  permissaoUsuario: boolean;

  @Column({ type: 'boolean', name: 'VER_PRONTUARIO' })
  verProntuario: boolean;

  @Column({ type: 'boolean', name: 'CAD_PRONTUARIO' })
  cadProntuario: boolean;

  @Column({ type: 'boolean', name: 'EDI_PRONTUARIO' })
  ediProntuario: boolean;

  @Column({ type: 'boolean', name: 'DEL_PRONTUARIO' })
  delProntuario: boolean;

  @Column({ type: 'boolean', name: 'DEL_PRONTUARIO_FOTO' })
  delProntuarioFoto: boolean;

  @Column({ type: 'boolean', name: 'VALORES_FINANCEIRO' })
  valoresFinanceiro: boolean;

  @Column({ type: 'boolean', name: 'AUTORIZACAO_VALOR_FINANCEIRO' })
  autorizacaoValorFinanceiro: boolean;

  @Column({ type: 'boolean', name: 'CONFIRMAR_PAGAMENTO_FINANCEIRO' })
  confirmarPagamentoFinanceiro: boolean;

  @Column({ type: 'boolean', name: 'GERENCIAR_SORTEIOS' })
  gerenciarSorteios: boolean;

  @Column({ type: 'boolean', name: 'ENVIO_RECUSA' })
  envioRecusa: boolean;

  @Column({ type: 'boolean', name: 'ENVIO_INTERCORRENCIA' })
  envioIntercorrencia: boolean;

  @Column({ type: 'boolean', name: 'ENVIO_CANCELAMENTO' })
  envioCancelamento: boolean;

  @Column({ type: 'boolean', name: 'ENVIO_AVALIACAO' })
  envioAvaliacao: boolean;

  @Column({ type: 'boolean', name: 'ENVIO_PEDIDO' })
  envioPedido: boolean;

  @Column({ type: 'boolean', name: 'ALERTA_ATENDIMENTO' })
  alertaAtendimento: boolean;

  @Column({ type: 'boolean', name: 'ATIVO' })
  ativo: boolean;

  @Column({ type: 'boolean', name: 'ENVIO_GLOSADO' })
  envioGlosado: boolean;

  @Column({ type: 'boolean', name: 'EMERGENCIA' })
  emergencia: boolean;

  @Column({ type: 'boolean', name: 'TOKEN' })
  token: boolean;

  @Column({ type: 'boolean', name: 'EDIT_ATENDIMENTO' })
  editAtendimento: boolean;

  @Column({ type: 'boolean', name: 'OUVIR_LIGACAO' })
  ouvirLigacao: boolean;

  @Column({ type: 'boolean', name: 'VER_PAINEL_INDICADORES' })
  verPainelIndicadores: boolean;

  @Column({ type: 'boolean', name: 'PRORROGAR_PAD' })
  prorrogarPad: boolean;

  @Column({ type: 'boolean', name: 'CANCELAR_ATEND_MASSA' })
  cancelarAtendMassa: boolean;

  @Column({ type: 'boolean', name: 'CAD_MAT_MED' })
  cadMatMed: boolean;

  @Column({ type: 'boolean', name: 'EDI_MAT_MED' })
  ediMatMed: boolean;

  @Column({ type: 'boolean', name: 'DEL_MAT_MED' })
  delMatMed: boolean;

  @Column({ type: 'boolean', name: 'VER_COL_PTA' })
  verColPta: boolean;

  @Column({ type: 'boolean', name: 'VER_COL_FOTO' })
  verColFoto: boolean;

  @Column({ type: 'boolean', name: 'VER_COL_LC' })
  verColLc: boolean;

  @Column({ type: 'boolean', name: 'VER_ATEND_CANCELADO' })
  verAtendCancelado: boolean;

  @Column({ type: 'boolean', name: 'VER_ATEND_AG_CONFIRMACAO' })
  verAtendAgConfirmacao: boolean;

  @Column({ type: 'boolean', name: 'EDI_GEO_LOCALIZACAO_ATENDIMENTO' })
  ediGeoLocalizacaoAtendimento: boolean;

  @Column({ type: 'boolean', name: 'COPIAR_EVOLUCAO' })
  copiarEvolucao: boolean;

  @Column({ type: 'boolean', name: 'COPIAR_NOME_PROF' })
  copiarNomeProf: boolean;

  @Column({ type: 'boolean', name: 'COPIAR_REGISTRO_PROF' })
  copiarRegistroProf: boolean;

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
