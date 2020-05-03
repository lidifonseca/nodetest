import { Moment } from 'moment';

export interface IProfissionalNew {
  id?: string;
  idUnidade?: string;
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
  ativo?: number;
}

export const defaultValue: Readonly<IProfissionalNew> = {};
