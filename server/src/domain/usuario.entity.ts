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
@Entity('usuario')
export default class Usuario extends BaseEntity {
  @Column({ name: 'id_operadora', length: 1000 })
  idOperadora: string;

  @Column({ name: 'senha', length: 100 })
  senha: string;

  @Column({ name: 'nome', length: 60 })
  nome: string;

  @Column({ name: 'email', length: 100 })
  email: string;

  @Column({ name: 'telefone', length: 20 })
  telefone: string;

  @Column({ name: 'celular', length: 20 })
  celular: string;

  @Column({ name: 'cpf', length: 20 })
  cpf: string;

  @Column({ name: 'rg', length: 30 })
  rg: string;

  @Column({ type: 'integer', name: 'sexo' })
  sexo: number;

  @Column({ type: 'date', name: 'nascimento' })
  nascimento: any;

  @Column({ type: 'integer', name: 'ver_atendimento' })
  verAtendimento: number;

  @Column({ type: 'integer', name: 'cad_atendimento' })
  cadAtendimento: number;

  @Column({ type: 'integer', name: 'edi_atendimento' })
  ediAtendimento: number;

  @Column({ type: 'integer', name: 'baixa_manual_atendimento' })
  baixaManualAtendimento: number;

  @Column({ type: 'integer', name: 'del_atendimento' })
  delAtendimento: number;

  @Column({ type: 'integer', name: 'rel_atendimento' })
  relAtendimento: number;

  @Column({ type: 'integer', name: 'ver_pad' })
  verPad: number;

  @Column({ type: 'integer', name: 'cad_pad' })
  cadPad: number;

  @Column({ type: 'integer', name: 'edi_pad' })
  ediPad: number;

  @Column({ type: 'integer', name: 'del_pad' })
  delPad: number;

  @Column({ type: 'integer', name: 'rel_pad' })
  relPad: number;

  @Column({ type: 'integer', name: 'ver_diario' })
  verDiario: number;

  @Column({ type: 'integer', name: 'cad_diario' })
  cadDiario: number;

  @Column({ type: 'integer', name: 'edi_diario' })
  ediDiario: number;

  @Column({ type: 'integer', name: 'del_diario' })
  delDiario: number;

  @Column({ type: 'integer', name: 'rel_diario' })
  relDiario: number;

  @Column({ type: 'integer', name: 'ver_categoria' })
  verCategoria: number;

  @Column({ type: 'integer', name: 'cad_categoria' })
  cadCategoria: number;

  @Column({ type: 'integer', name: 'edi_categoria' })
  ediCategoria: number;

  @Column({ type: 'integer', name: 'del_categoria' })
  delCategoria: number;

  @Column({ type: 'integer', name: 'ver_especialidade' })
  verEspecialidade: number;

  @Column({ type: 'integer', name: 'cad_especialidade' })
  cadEspecialidade: number;

  @Column({ type: 'integer', name: 'edi_especialidade' })
  ediEspecialidade: number;

  @Column({ type: 'integer', name: 'del_especialidade' })
  delEspecialidade: number;

  @Column({ type: 'integer', name: 'rel_especialidade' })
  relEspecialidade: number;

  @Column({ type: 'integer', name: 'ver_especialidade_valor' })
  verEspecialidadeValor: number;

  @Column({ type: 'integer', name: 'cad_especialidade_valor' })
  cadEspecialidadeValor: number;

  @Column({ type: 'integer', name: 'edi_especialidade_valor' })
  ediEspecialidadeValor: number;

  @Column({ type: 'integer', name: 'del_especialidade_valor' })
  delEspecialidadeValor: number;

  @Column({ type: 'integer', name: 'rel_especialidade_valor' })
  relEspecialidadeValor: number;

  @Column({ type: 'integer', name: 'ver_operadora' })
  verOperadora: number;

  @Column({ type: 'integer', name: 'cad_operadora' })
  cadOperadora: number;

  @Column({ type: 'integer', name: 'edi_operadora' })
  ediOperadora: number;

  @Column({ type: 'integer', name: 'del_operadora' })
  delOperadora: number;

  @Column({ type: 'integer', name: 'ver_paciente' })
  verPaciente: number;

  @Column({ type: 'integer', name: 'cad_paciente' })
  cadPaciente: number;

  @Column({ type: 'integer', name: 'edi_paciente' })
  ediPaciente: number;

  @Column({ type: 'integer', name: 'del_paciente' })
  delPaciente: number;

  @Column({ type: 'integer', name: 'rel_paciente' })
  relPaciente: number;

  @Column({ type: 'integer', name: 'ver_profissional' })
  verProfissional: number;

  @Column({ type: 'integer', name: 'cad_profissional' })
  cadProfissional: number;

  @Column({ type: 'integer', name: 'edi_profissional' })
  ediProfissional: number;

  @Column({ type: 'integer', name: 'del_profissional' })
  delProfissional: number;

  @Column({ type: 'integer', name: 'ativ_profissional' })
  ativProfissional: number;

  @Column({ type: 'integer', name: 'rel_profissional' })
  relProfissional: number;

  @Column({ type: 'integer', name: 'ver_push' })
  verPush: number;

  @Column({ type: 'integer', name: 'cad_push_paciente' })
  cadPushPaciente: number;

  @Column({ type: 'integer', name: 'cad_push_profissional' })
  cadPushProfissional: number;

  @Column({ type: 'integer', name: 'ver_termo_paciente' })
  verTermoPaciente: number;

  @Column({ type: 'integer', name: 'edi_termo_paciente' })
  ediTermoPaciente: number;

  @Column({ type: 'integer', name: 'ver_termo_profissional' })
  verTermoProfissional: number;

  @Column({ type: 'integer', name: 'edi_termo_profissional' })
  ediTermoProfissional: number;

  @Column({ type: 'integer', name: 'ver_outros' })
  verOutros: number;

  @Column({ type: 'integer', name: 'cad_outros' })
  cadOutros: number;

  @Column({ type: 'integer', name: 'edi_outros' })
  ediOutros: number;

  @Column({ type: 'integer', name: 'del_outros' })
  delOutros: number;

  @Column({ type: 'integer', name: 'rel_outros' })
  relOutros: number;

  @Column({ type: 'integer', name: 'ver_unidade_easy' })
  verUnidadeEasy: number;

  @Column({ type: 'integer', name: 'cad_unidade_easy' })
  cadUnidadeEasy: number;

  @Column({ type: 'integer', name: 'edi_unidade_easy' })
  ediUnidadeEasy: number;

  @Column({ type: 'integer', name: 'del_unidade_easy' })
  delUnidadeEasy: number;

  @Column({ type: 'integer', name: 'ver_usuario' })
  verUsuario: number;

  @Column({ type: 'integer', name: 'cad_usuario' })
  cadUsuario: number;

  @Column({ type: 'integer', name: 'edi_usuario' })
  ediUsuario: number;

  @Column({ type: 'integer', name: 'del_usuario' })
  delUsuario: number;

  @Column({ type: 'integer', name: 'ver_pta_resultado' })
  verPtaResultado: number;

  @Column({ type: 'integer', name: 'cad_pta_resultado' })
  cadPtaResultado: number;

  @Column({ type: 'integer', name: 'del_pta_resultado' })
  delPtaResultado: number;

  @Column({ type: 'integer', name: 'ver_pta_atividade' })
  verPtaAtividade: number;

  @Column({ type: 'integer', name: 'cad_pta_atividade' })
  cadPtaAtividade: number;

  @Column({ type: 'integer', name: 'del_pta_atividade' })
  delPtaAtividade: number;

  @Column({ type: 'integer', name: 'permissao_usuario' })
  permissaoUsuario: number;

  @Column({ type: 'integer', name: 'ver_prontuario' })
  verProntuario: number;

  @Column({ type: 'integer', name: 'cad_prontuario' })
  cadProntuario: number;

  @Column({ type: 'integer', name: 'edi_prontuario' })
  ediProntuario: number;

  @Column({ type: 'integer', name: 'del_prontuario' })
  delProntuario: number;

  @Column({ type: 'integer', name: 'del_prontuario_foto' })
  delProntuarioFoto: number;

  @Column({ type: 'integer', name: 'valores_financeiro' })
  valoresFinanceiro: number;

  @Column({ type: 'integer', name: 'autorizacao_valor_financeiro' })
  autorizacaoValorFinanceiro: number;

  @Column({ type: 'integer', name: 'confirmar_pagamento_financeiro' })
  confirmarPagamentoFinanceiro: number;

  @Column({ type: 'integer', name: 'gerenciar_sorteios' })
  gerenciarSorteios: number;

  @Column({ type: 'integer', name: 'envio_recusa' })
  envioRecusa: number;

  @Column({ type: 'integer', name: 'envio_intercorrencia' })
  envioIntercorrencia: number;

  @Column({ type: 'integer', name: 'envio_cancelamento' })
  envioCancelamento: number;

  @Column({ type: 'integer', name: 'envio_avaliacao' })
  envioAvaliacao: number;

  @Column({ type: 'integer', name: 'envio_pedido' })
  envioPedido: number;

  @Column({ type: 'integer', name: 'alerta_atendimento' })
  alertaAtendimento: number;

  @Column({ type: 'integer', name: 'ativo' })
  ativo: number;

  @Column({ type: 'integer', name: 'envio_glosado' })
  envioGlosado: number;

  @Column({ type: 'integer', name: 'emergencia' })
  emergencia: number;

  @Column({ type: 'integer', name: 'token' })
  token: number;

  @Column({ type: 'integer', name: 'edit_atendimento' })
  editAtendimento: number;

  @Column({ type: 'integer', name: 'ouvir_ligacao', nullable: false })
  ouvirLigacao: number;

  @Column({ type: 'integer', name: 'ver_painel_indicadores' })
  verPainelIndicadores: number;

  @Column({ type: 'integer', name: 'prorrogar_pad' })
  prorrogarPad: number;

  @Column({ type: 'integer', name: 'cancelar_atend_massa' })
  cancelarAtendMassa: number;

  @Column({ type: 'integer', name: 'cad_mat_med' })
  cadMatMed: number;

  @Column({ type: 'integer', name: 'edi_mat_med' })
  ediMatMed: number;

  @Column({ type: 'integer', name: 'del_mat_med' })
  delMatMed: number;

  @Column({ type: 'integer', name: 'ver_col_pta' })
  verColPta: number;

  @Column({ type: 'integer', name: 'ver_col_foto' })
  verColFoto: number;

  @Column({ type: 'integer', name: 'ver_col_lc' })
  verColLc: number;

  @Column({ type: 'integer', name: 'ver_atend_cancelado' })
  verAtendCancelado: number;

  @Column({ type: 'integer', name: 'ver_atend_ag_confirmacao' })
  verAtendAgConfirmacao: number;

  @Column({ type: 'integer', name: 'edi_geo_localizacao_atendimento' })
  ediGeoLocalizacaoAtendimento: number;

  @Column({ type: 'integer', name: 'copiar_evolucao' })
  copiarEvolucao: number;

  @Column({ type: 'integer', name: 'copiar_nome_prof' })
  copiarNomeProf: number;

  @Column({ type: 'integer', name: 'copiar_registro_prof' })
  copiarRegistroProf: number;

  @Column({ name: 'id_area_atuacao', length: 100 })
  idAreaAtuacao: string;

  @Column({ type: 'integer', name: 'envio_cid_sem_pta' })
  envioCidSemPta: number;

  @Column({ type: 'integer', name: 'envio_analise_resultado_esperado' })
  envioAnaliseResultadoEsperado: number;

  @Column({ type: 'integer', name: 'envio_descumprimento' })
  envioDescumprimento: number;

  @Column({ type: 'boolean', name: 'envio_melhora_tempo' })
  envioMelhoraTempo: boolean;

  @Column({ name: 'senha_chat', length: 45 })
  senhaChat: string;

  @OneToMany(
    type => Diario,
    other => other.idUsuario
  )
  diarios: Diario[];

  @OneToMany(
    type => PacienteDiario,
    other => other.idUsuario
  )
  pacienteDiarios: PacienteDiario[];

  @ManyToOne(type => UnidadeEasy)
  unidade: UnidadeEasy;

  @ManyToOne(type => TipoUsuario)
  idTipoUsuario: TipoUsuario;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
