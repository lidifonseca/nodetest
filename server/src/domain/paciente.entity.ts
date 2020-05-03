/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { validate, Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, Min, Max } from 'class-validator';

import Atendimento from './atendimento.entity';
import AtendimentoAssinaturas from './atendimento-assinaturas.entity';
import Diario from './diario.entity';
import PacienteDadosCartao from './paciente-dados-cartao.entity';
import PacienteDiagnostico from './paciente-diagnostico.entity';
import PacienteDiario from './paciente-diario.entity';
import PacienteEnqueteApp from './paciente-enquete-app.entity';
import PacienteOperadora from './paciente-operadora.entity';
import PacientePedido from './paciente-pedido.entity';
import PacientePush from './paciente-push.entity';
import PacienteStatusAtual from './paciente-status-atual.entity';
import Pad from './pad.entity';
import Questionarios from './questionarios.entity';
import UnidadeEasy from './unidade-easy.entity';
import Franquia from './franquia.entity';
import Cidade from './cidade.entity';
import GrauParentesco from './grau-parentesco.entity';
import Profissional from './profissional.entity';
import PacienteHospital from './paciente-hospital.entity';

/**
 * @toStringFields nome@@\n@listTableLayout nome cep bairro rg registro@@\n@listFilterLayout\nnome{Label:top,Size:6>\nemail{Label:top,Size:6}\ncpf{Label:top,Size:6}\nrg{Label:top,Size:6}\nregistro{Label:top,Size:6}\n@@\n@formTab DadosDoPaciente<unidade,email,nome,cpf,rg,cep,nascimento,sexo,endereco,telefone,celular,bairro,numero,complemento,cidade,uf,profissionalPref,tipohospital,liminar,detalhes,observacao>@@\n@formTab DadosDoFamiliar<cepFamiliar,enderecoFamiliar,numeroFamiliar,complementoFamiliar,cidadeFamiliar,bairroFamiliar,ufFamiliar,latitudeFamiliar,longitudeFamiliar,acessoFamiliar,emailFamiliar,cpfFamiliar,rgFamiliar,nascimentoFamiliar,sexoFamiliar,telefoneFamiliar,celularFamiliar,observacaoFamiliar>@@\n@formLayout\nunidade{Label:top,Size:6}\nemail{Label:top,Size:6}\nnome{Label:top,Size:6}\ncpf{Label:top,Size:3}\nrg{Label:top,Size:3}\ncep{Label:top,Size:6}\nnascimento{Label:top,Size:3}\nsexo{Label:top,Size:3}\nendereco{Label:top,Size:6}\ntelefone{Label:top,Size:3}\ncelular{Label:top,Size:3}\nbairro{Label:top,Size:4}\nnumero{Label:top,Size:6}\ncomplemento{Label:top,Size:6}\ncidade{Label:top,Size:8}\nuf{Label:top,Size:4}\nprofissionalPref{Label:top,Size:6}\ntipohospital{Label:top,Size:6}\nliminar{Label:top,Size:12}\ndetalhes{Label:top,Size:12}\nobservacao{Label:top,Size:12}\ncomResponsavel{Label:top,Size:12}\n\ngrauParentesco{Label:top,Size:12}\nresponsavelFamiliar{Label:top,Size:12}\n\n\n\ncepFamiliar{Label:top,Size:12}\nenderecoFamiliar{Label:top,Size:12}\nnumeroFamiliar{Label:top,Size:12}\ncomplementoFamiliar{Label:top,Size:12}\ncidadeFamiliar{Label:top,Size:12}\nbairroFamiliar{Label:top,Size:12}\nufFamiliar{Label:top,Size:12}\nlatitudeFamiliar{Label:top,Size:12}\nlongitudeFamiliar{Label:top,Size:12}\nacessoFamiliar{Label:top,Size:12}\nemailFamiliar{Label:top,Size:12}\ncpfFamiliar{Label:top,Size:12}\nrgFamiliar{Label:top,Size:12}\nnascimentoFamiliar{Label:top,Size:12}\nsexoFamiliar{Label:top,Size:12}\ntelefoneFamiliar{Label:top,Size:12}\ncelularFamiliar{Label:top,Size:12}\nobservacaoFamiliar{Label:top,Size:12}\n\n\nfranquia{Label:top,Size:12}\nsenha{Label:top,Size:12}\nregistro{Label:top,Size:12}\nlatitude{Label:top,Size:12}\nlongitude{Label:top,Size:12}\naph{Label:top,Size:12}\nnivelComplexidade{Label:top,Size:12}\npassagemPs{Label:top,Size:12}\nobsPs{Label:top,Size:12}\npassagemInternacao{Label:top,Size:12}\nobsInternacao{Label:top,Size:12}\ncustoTotal{Label:top,Size:12}\nmesmoEndereco{Label:top,Size:12}\ncadastroCompleto{Label:top,Size:12}\nativo{Label:top,Size:12}\nexpoToken{Label:top,Size:12}\nsenhaChat{Label:top,Size:12}\n@@\n@viewLayout\ncidade{Label:top,Size:6}\nnome{Label:top,Size:6}\nemail{Label:top,Size:6}\ncpf{Label:top,Size:6}\nrg{Label:top,Size:6}\nregistro{Label:top,Size:6}\n@@
 */
@Entity('paciente')
export default class Paciente extends BaseEntity {
  @Column({ name: 'senha', length: 100 })
  senha: string;

  @Column({ name: 'nome', length: 60 })
  nome: string;

  @Column({ name: 'email', length: 100 })
  email: string;

  @Column({ name: 'cpf', length: 20 })
  cpf: string;

  @Column({ name: 'rg', length: 30 })
  rg: string;

  @Column({ name: 'registro', length: 50 })
  registro: string;

  @Column({ type: 'date', name: 'nascimento' })
  nascimento: any;

  @Column({ type: 'integer', name: 'sexo' })
  sexo: number;

  @Column({ name: 'telefone', length: 20 })
  telefone: string;

  @Column({ name: 'telefone_2', length: 20 })
  telefone2: string;

  @Column({ name: 'celular', length: 20 })
  celular: string;

  @Column({ name: 'celular_1', length: 20 })
  celular1: string;

  @Column({ name: 'cep', length: 10 })
  cep: string;

  @Column({ name: 'endereco', length: 100 })
  endereco: string;

  @Column({ name: 'numero', length: 30 })
  numero: string;

  @Column({ name: 'complemento', length: 20 })
  complemento: string;

  @Column({ name: 'bairro', length: 40 })
  bairro: string;

  @Column({ name: 'uf', length: 5 })
  uf: string;

  @Column({ name: 'latitude', length: 60 })
  latitude: string;

  @Column({ name: 'longitude', length: 60 })
  longitude: string;

  @Column({ name: 'responsavel_familiar', length: 60 })
  responsavelFamiliar: string;

  @Column({ name: 'email_familiar', length: 100 })
  emailFamiliar: string;

  @Column({ name: 'cpf_familiar', length: 20 })
  cpfFamiliar: string;

  @Column({ name: 'rg_familiar', length: 30 })
  rgFamiliar: string;

  @Column({ type: 'date', name: 'nascimento_familiar' })
  nascimentoFamiliar: any;

  @Column({ type: 'integer', name: 'sexo_familiar' })
  sexoFamiliar: number;

  @Column({ name: 'telefone_familiar', length: 20 })
  telefoneFamiliar: string;

  @Column({ name: 'telefone_2_familiar', length: 20 })
  telefone2Familiar: string;

  @Column({ name: 'celular_familiar', length: 20 })
  celularFamiliar: string;

  @Column({ name: 'celular_2_familiar', length: 20 })
  celular2Familiar: string;

  @Column({ name: 'cep_familiar', length: 10 })
  cepFamiliar: string;

  @Column({ name: 'endereco_familiar', length: 100 })
  enderecoFamiliar: string;

  @Column({ name: 'numero_familiar', length: 30 })
  numeroFamiliar: string;

  @Column({ name: 'complemento_familiar', length: 20 })
  complementoFamiliar: string;

  @Column({ name: 'bairro_familiar', length: 40 })
  bairroFamiliar: string;

  @Column({ name: 'uf_familiar', length: 5 })
  ufFamiliar: string;

  @Column({ name: 'latitude_familiar', length: 60 })
  latitudeFamiliar: string;

  @Column({ name: 'longitude_familiar', length: 60 })
  longitudeFamiliar: string;

  @Column({ type: 'blob', name: 'observacao' })
  observacao: any;

  @Column({ type: 'integer', name: 'aph', nullable: false })
  aph: number;

  @Column({ type: 'integer', name: 'nivel_complexidade' })
  nivelComplexidade: number;

  @Column({ type: 'integer', name: 'passagem_ps' })
  passagemPs: number;

  @Column({ name: 'obs_ps', length: 255 })
  obsPs: string;

  @Column({ type: 'integer', name: 'passagem_internacao' })
  passagemInternacao: number;

  @Column({ name: 'obs_internacao', length: 255 })
  obsInternacao: string;

  @Column({ type: 'float', name: 'custo_total' })
  custoTotal: number;

  @Column({ name: 'observacao_familiar', length: 255 })
  observacaoFamiliar: string;

  @Column({ type: 'integer', name: 'mesmo_endereco' })
  mesmoEndereco: number;

  @Column({ type: 'integer', name: 'acesso_familiar' })
  acessoFamiliar: number;

  @Column({ type: 'integer', name: 'com_responsavel' })
  comResponsavel: number;

  @Column({ type: 'integer', name: 'cadastro_completo' })
  cadastroCompleto: number;

  @Column({ type: 'integer', name: 'ativo' })
  ativo: number;

  @Column({ type: 'blob', name: 'detalhes' })
  detalhes: any;

  @Column({ name: 'liminar', length: 50 })
  liminar: string;

  @Column({ name: 'expo_token', length: 255 })
  expoToken: string;

  @Column({ name: 'senha_chat', length: 45 })
  senhaChat: string;

  @OneToMany(
    type => Atendimento,
    other => other.idPaciente
  )
  atendimentos: Atendimento[];

  @OneToMany(
    type => AtendimentoAssinaturas,
    other => other.idPaciente
  )
  atendimentoAssinaturas: AtendimentoAssinaturas[];

  @OneToMany(
    type => Diario,
    other => other.idPaciente
  )
  diarios: Diario[];

  @OneToMany(
    type => PacienteDadosCartao,
    other => other.idPaciente
  )
  pacienteDadosCartaos: PacienteDadosCartao[];

  @OneToMany(
    type => PacienteDiagnostico,
    other => other.idPaciente
  )
  pacienteDiagnosticos: PacienteDiagnostico[];

  @OneToMany(
    type => PacienteDiario,
    other => other.idPaciente
  )
  pacienteDiarios: PacienteDiario[];

  @OneToMany(
    type => PacienteEnqueteApp,
    other => other.idPaciente
  )
  pacienteEnqueteApps: PacienteEnqueteApp[];

  @OneToMany(
    type => PacienteOperadora,
    other => other.idPaciente
  )
  pacienteOperadoras: PacienteOperadora[];

  @OneToMany(
    type => PacientePedido,
    other => other.idPaciente
  )
  pacientePedidos: PacientePedido[];

  @OneToMany(
    type => PacientePush,
    other => other.idPaciente
  )
  pacientePushes: PacientePush[];

  @OneToMany(
    type => PacienteStatusAtual,
    other => other.idPaciente
  )
  pacienteStatusAtuals: PacienteStatusAtual[];

  @OneToMany(
    type => Pad,
    other => other.idPaciente
  )
  pads: Pad[];

  @OneToMany(
    type => Questionarios,
    other => other.pacienteId
  )
  questionarios: Questionarios[];

  @ManyToOne(type => UnidadeEasy)
  unidade: UnidadeEasy;

  @ManyToOne(type => Franquia)
  franquia: Franquia;

  @ManyToOne(type => Cidade)
  cidade: Cidade;

  @ManyToOne(type => Cidade)
  cidadeFamiliar: Cidade;

  @ManyToOne(type => GrauParentesco)
  grauParentesco: GrauParentesco;

  @ManyToOne(type => Profissional)
  profissionalPref: Profissional;

  @ManyToOne(type => PacienteHospital)
  tipohospital: PacienteHospital;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
