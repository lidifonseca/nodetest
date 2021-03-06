import { Moment } from 'moment';
import { IAtendimentoAceite } from 'app/shared/model/atendimento-aceite.model';
import { IAtendimentoAssinaturas } from 'app/shared/model/atendimento-assinaturas.model';
import { IUnidadeEasy } from 'app/shared/model/unidade-easy.model';
import { IEspecialidade } from 'app/shared/model/especialidade.model';

export interface IProfissional {
  id?: string;
  idCidade?: string;
  idTempoExperiencia?: number;
  idBanco?: number;
  senha?: string;
  nome?: string;
  email?: string;
  cpf?: string;
  rg?: string;
  nomeEmpresa?: string;
  cnpj?: string;
  registro?: string;
  nascimento?: Moment;
  sexo?: number;
  telefone1?: string;
  telefone2?: string;
  celular1?: string;
  celular2?: string;
  cep?: string;
  endereco?: string;
  numero?: string;
  complemento?: string;
  bairro?: string;
  cidade?: string;
  uf?: string;
  atendeCrianca?: number;
  atendeIdoso?: number;
  ag?: string;
  conta?: string;
  tipoConta?: string;
  origemCadastro?: string;
  obs?: any;
  chavePrivada?: string;
  ativo?: boolean;
  senhaOriginal?: string;
  dataSenha?: Moment;
  expoToken?: string;
  preferenciaAtendimento?: number;
  atendimentoAceites?: IAtendimentoAceite[];
  atendimentoAssinaturas?: IAtendimentoAssinaturas[];
  unidadeRazaoSocial?: string;
  unidade?: string | any;
  especialidades?: IEspecialidade[];
}

export const defaultValue: Readonly<IProfissional> = {
  ativo: false
};
