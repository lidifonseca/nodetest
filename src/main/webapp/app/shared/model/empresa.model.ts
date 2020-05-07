import { Moment } from 'moment';

export interface IEmpresa {
  id?: string;
  empresa?: string;
  nome?: string;
  email?: string;
  cpf?: string;
  rg?: string;
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
  tipo?: number;
}

export const defaultValue: Readonly<IEmpresa> = {};
