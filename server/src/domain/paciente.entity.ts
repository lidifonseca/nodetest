/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { validate, Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, Min, Max } from 'class-validator';

import UnidadeEasy from './unidade-easy.entity';
import Franquia from './franquia.entity';
import Cidade from './cidade.entity';
import GrauParentesco from './grau-parentesco.entity';
import Profissional from './profissional.entity';
import PacienteHospital from './paciente-hospital.entity';

/**
 * @toStringFields nome@@\n@listTableLayout nome cep bairro rg registro@@\n@listFilterLayout\nnome{Label:top,Size:6}\nemail{Label:top,Size:6}\ncpf{Label:top,Size:6}\nrg{Label:top,Size:6}\nregistro{Label:top,Size:6}\n@@\n@formTab DadosDoPaciente<unidade,email,nome,cpf,rg,cep,nascimento,sexo,endereco,telefone,celular,bairro,numero,complemento,cidade,uf,profissionalPref,tipohospital,liminar,detalhes,observacao>@@\n@formTab DadosDoFamiliar<cepFamiliar,enderecoFamiliar,numeroFamiliar,complementoFamiliar,cidadeFamiliar,bairroFamiliar,ufFamiliar,latitudeFamiliar,longitudeFamiliar,acessoFamiliar,emailFamiliar,cpfFamiliar,rgFamiliar,nascimentoFamiliar,sexoFamiliar,telefoneFamiliar,celularFamiliar,observacaoFamiliar>@@\n@listButtons\nview{inDropdown:true,tag:Link,to:`${match.url}/${paciente.id}`,color:info,size:sm,icon:eye,text:View}\nedit{inDropdown:true,tag:Link,to:`${match.url}/${paciente.id}/edit`,color:info,size:sm,icon:pencil-alt,text:Edit}\ndelete{inDropdown:true,tag:Link,to:`${match.url}/${paciente.id}/delete`,color:info,size:sm,icon:trash,text:Delete}\nRelatoriodeInformacoes{inDropdown:true,tag:Link,to:`${match.url}/${paciente.id}/delete`,color:info,size:sm,icon:file-text-o,text:RelatoriodeInformacoes}\nIndicadoresClinicos{inDropdown:true,tag:Link,to:`${match.url}/${paciente.id}/delete`,color:info,size:sm,icon:list,text:IndicadoresClinicos}\nMonitoramento{inDropdown:true,tag:Link,to:`${match.url}/${paciente.id}/delete`,color:info,size:sm,icon:list,text:Monitoramento}\nVisualizarProntuario{inDropdown:true,tag:Link,to:`${match.url}/${paciente.id}/delete`,color:info,size:sm,icon:search,text:VisualizarProntuario}\nStatus{inDropdown:true,tag:Link,to:`/paciente-status-atual?baseFilters=paciente&paciente=${paciente.id}`,color:info,size:sm,icon:pencil,text:Status}\nArquivos{inDropdown:true,tag:Link,to:`/paciente-arquivo?baseFilters=paciente&paciente=${paciente.id}`,color:info,size:sm,icon:upload,text:Arquivos}\nDiagnostico{inDropdown:true,tag:Link,to:`/paciente-diagnostico?baseFilters=paciente&paciente=${paciente.id}`,color:info,size:sm,icon:stethoscope,text:Diagnostico}\nOperadora{inDropdown:true,tag:Link,to:`/paciente-operadora?baseFilters=paciente&paciente=${paciente.id}`,color:info,size:sm,icon:medkit,text:Operadora}\nResetSenha{inDropdown:true,tag:Link,to:`/reset-senha?baseFilters=paciente&paciente=${paciente.id}`,color:info,size:sm,icon:refresh,text:ResetSenha}\nProntuarioEletronico{inDropdown:true,tag:Link,to:`/paciente-prontuario?baseFilters=paciente&paciente=${paciente.id}`,color:info,size:sm,icon:stethoscope,text:ProntuarioEletronico}\nToken{inDropdown:true,tag:Link,to:`/paciente-?baseFilters=paciente&paciente=${paciente.id}`,color:info,size:sm,icon:key,text:Token}\nQuestionario{inDropdown:true,tag:Link,to:`/questionarios?baseFilters=paciente&paciente=${paciente.id}`,color:info,size:sm,icon:question,text:Questionario}\nTratamentoIndicado{inDropdown:true,tag:Link,to:`/paciente-?baseFilters=paciente&paciente=${paciente.id}`,color:info,size:sm,icon:fa-list-ol,text:TratamentoIndicado}\n@@\n@viewButtons\nview{tag:Link,to:`/paciente/${pacienteEntity.id}`,color:info,size:sm,icon:eye,text:View}\nedit{tag:Link,to:`/paciente/${pacienteEntity.id}/edit`,color:primary,size:sm,icon:pencil-alt,text:Edit}\ndelete{tag:Link,to:`/paciente/${pacienteEntity.id}/delete`,color:danger,size:sm,icon:trash,text:Delete}\n@@\n@formLayout\nunidade{Label:top,Size:6}\nemail{Label:top,Size:6}\nnome{Label:top,Size:6}\ncpf{Label:top,Size:3}\nrg{Label:top,Size:3}\ncep{Label:top,Size:6}\nnascimento{Label:top,Size:3}\nsexo{Label:top,Size:3}\nendereco{Label:top,Size:6}\ntelefone{Label:top,Size:3}\ncelular{Label:top,Size:3}\nbairro{Label:top,Size:4}\nnumero{Label:top,Size:6}\ncomplemento{Label:top,Size:6}\ncidade{Label:top,Size:8}\nuf{Label:top,Size:4}\nprofissionalPref{Label:top,Size:6}\ntipohospital{Label:top,Size:6}\nliminar{Label:top,Size:12}\ndetalhes{Label:top,Size:12}\nobservacao{Label:top,Size:12}\ncomResponsavel{Label:top,Size:12}\n\ngrauParentesco{Label:top,Size:12}\nresponsavelFamiliar{Label:top,Size:12}\n\n\n\ncepFamiliar{Label:top,Size:12}\nenderecoFamiliar{Label:top,Size:12}\nnumeroFamiliar{Label:top,Size:12}\ncomplementoFamiliar{Label:top,Size:12}\ncidadeFamiliar{Label:top,Size:12}\nbairroFamiliar{Label:top,Size:12}\nufFamiliar{Label:top,Size:12}\nlatitudeFamiliar{Label:top,Size:12}\nlongitudeFamiliar{Label:top,Size:12}\nacessoFamiliar{Label:top,Size:12}\nemailFamiliar{Label:top,Size:12}\ncpfFamiliar{Label:top,Size:12}\nrgFamiliar{Label:top,Size:12}\nnascimentoFamiliar{Label:top,Size:12}\nsexoFamiliar{Label:top,Size:12}\ntelefoneFamiliar{Label:top,Size:12}\ncelularFamiliar{Label:top,Size:12}\nobservacaoFamiliar{Label:top,Size:12}\n\n\nfranquia{Label:top,Size:12}\nsenha{Label:top,Size:12}\nregistro{Label:top,Size:12}\nlatitude{Label:top,Size:12}\nlongitude{Label:top,Size:12}\naph{Label:top,Size:12}\nnivelComplexidade{Label:top,Size:12}\npassagemPs{Label:top,Size:12}\nobsPs{Label:top,Size:12}\npassagemInternacao{Label:top,Size:12}\nobsInternacao{Label:top,Size:12}\ncustoTotal{Label:top,Size:12}\nmesmoEndereco{Label:top,Size:12}\ncadastroCompleto{Label:top,Size:12}\nativo{Label:top,Size:12}\nexpoToken{Label:top,Size:12}\n@@\n@viewLayout\ncidade{Label:top,Size:6}\nnome{Label:top,Size:6}\nemail{Label:top,Size:6}\ncpf{Label:top,Size:6}\nrg{Label:top,Size:6}\nregistro{Label:top,Size:6}\n@@
 */
@Entity('tb_paciente')
export default class Paciente extends BaseEntity {
  @Column({ name: 'SENHA', length: 100 })
  senha: string;

  @Column({ name: 'NOME', length: 60 })
  nome: string;

  @Column({ name: 'EMAIL', length: 100 })
  email: string;

  @Column({ name: 'CPF', length: 20 })
  cpf: string;

  @Column({ name: 'RG', length: 30 })
  rg: string;

  @Column({ name: 'REGISTRO', length: 50 })
  registro: string;

  @Column({ type: 'date', name: 'NASCIMENTO' })
  nascimento: any;

  @Column({ type: 'integer', name: 'SEXO' })
  sexo: number;

  @Column({ name: 'TELEFONE', length: 20 })
  telefone: string;

  /**
   * @dbName TELEFONE2@@
   */
  @Column({ name: 'TELEFONE2', length: 20 })
  telefone2: string;

  @Column({ name: 'CELULAR', length: 20 })
  celular: string;

  /**
   * @dbName CELULAR1@@
   */
  @Column({ name: 'CELULAR1', length: 20 })
  celular1: string;

  @Column({ name: 'CEP', length: 10 })
  cep: string;

  @Column({ name: 'ENDERECO', length: 100 })
  endereco: string;

  @Column({ name: 'NUMERO', length: 30 })
  numero: string;

  @Column({ name: 'COMPLEMENTO', length: 20 })
  complemento: string;

  @Column({ name: 'BAIRRO', length: 40 })
  bairro: string;

  @Column({ name: 'UF', length: 5 })
  uf: string;

  @Column({ name: 'LATITUDE', length: 60 })
  latitude: string;

  @Column({ name: 'LONGITUDE', length: 60 })
  longitude: string;

  @Column({ name: 'RESPONSAVEL_FAMILIAR', length: 60 })
  responsavelFamiliar: string;

  @Column({ name: 'EMAIL_FAMILIAR', length: 100 })
  emailFamiliar: string;

  @Column({ name: 'CPF_FAMILIAR', length: 20 })
  cpfFamiliar: string;

  @Column({ name: 'RG_FAMILIAR', length: 30 })
  rgFamiliar: string;

  @Column({ type: 'date', name: 'NASCIMENTO_FAMILIAR' })
  nascimentoFamiliar: any;

  @Column({ type: 'integer', name: 'SEXO_FAMILIAR' })
  sexoFamiliar: number;

  @Column({ name: 'TELEFONE_FAMILIAR', length: 20 })
  telefoneFamiliar: string;

  /**
   * @dbName TELEFONE2_FAMILIAR@@
   */
  @Column({ name: 'TELEFONE2_FAMILIAR', length: 20 })
  telefone2Familiar: string;

  @Column({ name: 'CELULAR_FAMILIAR', length: 20 })
  celularFamiliar: string;

  /**
   * @dbName CELULAR2_FAMILIAR@@
   */
  @Column({ name: 'CELULAR2_FAMILIAR', length: 20 })
  celular2Familiar: string;

  @Column({ name: 'CEP_FAMILIAR', length: 10 })
  cepFamiliar: string;

  @Column({ name: 'ENDERECO_FAMILIAR', length: 100 })
  enderecoFamiliar: string;

  @Column({ name: 'NUMERO_FAMILIAR', length: 30 })
  numeroFamiliar: string;

  @Column({ name: 'COMPLEMENTO_FAMILIAR', length: 20 })
  complementoFamiliar: string;

  @Column({ name: 'BAIRRO_FAMILIAR', length: 40 })
  bairroFamiliar: string;

  @Column({ name: 'UF_FAMILIAR', length: 5 })
  ufFamiliar: string;

  @Column({ name: 'LATITUDE_FAMILIAR', length: 60 })
  latitudeFamiliar: string;

  @Column({ name: 'LONGITUDE_FAMILIAR', length: 60 })
  longitudeFamiliar: string;

  @Column({ name: 'OBSERVACAO' })
  observacao: string;

  @Column({ type: 'integer', name: 'APH', nullable: false })
  aph: number;

  @Column({ type: 'integer', name: 'NIVEL_COMPLEXIDADE' })
  nivelComplexidade: number;

  @Column({ type: 'integer', name: 'PASSAGEM_PS' })
  passagemPs: number;

  @Column({ name: 'OBS_PS', length: 255 })
  obsPs: string;

  @Column({ type: 'integer', name: 'PASSAGEM_INTERNACAO' })
  passagemInternacao: number;

  @Column({ name: 'OBS_INTERNACAO', length: 255 })
  obsInternacao: string;

  @Column({ type: 'float', name: 'CUSTO_TOTAL' })
  custoTotal: number;

  @Column({ name: 'OBSERVACAO_FAMILIAR', length: 255 })
  observacaoFamiliar: string;

  @Column({ type: 'integer', name: 'MESMO_ENDERECO' })
  mesmoEndereco: number;

  @Column({ type: 'integer', name: 'ACESSO_FAMILIAR' })
  acessoFamiliar: number;

  @Column({ type: 'integer', name: 'COM_RESPONSAVEL' })
  comResponsavel: number;

  @Column({ type: 'integer', name: 'CADASTRO_COMPLETO' })
  cadastroCompleto: number;

  @Column({ type: 'integer', name: 'ATIVO' })
  ativo: number;

  @Column({ name: 'DETALHES' })
  detalhes: string;

  @Column({ name: 'LIMINAR', length: 50 })
  liminar: string;

  @Column({ name: 'EXPO_TOKEN', length: 255 })
  expoToken: string;

  @ManyToOne(type => UnidadeEasy)
  @JoinColumn({ name: 'ID_UNIDADE', referencedColumnName: 'id' })
  unidade: UnidadeEasy;

  @ManyToOne(type => Franquia)
  @JoinColumn({ name: 'ID_FRANQUIA', referencedColumnName: 'id' })
  franquia: Franquia;

  @ManyToOne(type => Cidade)
  @JoinColumn({ name: 'ID_CIDADE', referencedColumnName: 'id' })
  cidade: Cidade;

  @ManyToOne(type => Cidade)
  @JoinColumn({ name: 'ID_CIDADE_FAMILIAR', referencedColumnName: 'id' })
  cidadeFamiliar: Cidade;

  @ManyToOne(type => GrauParentesco)
  @JoinColumn({ name: 'ID_GRAU_PARENTESCO', referencedColumnName: 'id' })
  grauParentesco: GrauParentesco;

  @ManyToOne(type => Profissional)
  @JoinColumn({ name: 'ID_PROFISSIONAL_PREF', referencedColumnName: 'id' })
  profissionalPref: Profissional;

  @ManyToOne(type => PacienteHospital)
  @JoinColumn({ name: 'ID_TIPOHOSPITAL', referencedColumnName: 'id' })
  tipohospital: PacienteHospital;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
