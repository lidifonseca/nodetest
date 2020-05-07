import { IUnidadeEasy } from 'app/shared/model/unidade-easy.model';
import { ITipoOperadora } from 'app/shared/model/tipo-operadora.model';

export interface IOperadora {
  id?: string;
  nomeFantasia?: string;
  razaoSocial?: string;
  cnpj?: string;
  ie?: string;
  site?: string;
  ativo?: number;
  endereco?: string;
  contatoCentralAtendimento?: string;
  emailCentralAtendimento?: string;
  nomeContatoComercial?: string;
  contatoComercial?: string;
  emailComercial?: string;
  nomeContatoFinanceiro?: string;
  contatoFinanceiro?: string;
  emailFinanceiro?: string;
  unidadeRazaoSocial?: string;
  unidade?: string | any;
  tipoOperadoraTipo?: string;
  tipoOperadora?: string | any;
}

export const defaultValue: Readonly<IOperadora> = {};
