export interface IFranquia {
  id?: string;
  idCidade?: string;
  nomeFantasia?: string;
  razaoSocial?: string;
  cnpj?: string;
  ie?: string;
  site?: string;
  telefone1?: string;
  telefone2?: string;
  celular?: string;
  cep?: string;
  endereco?: string;
  numero?: string;
  complemento?: string;
  bairro?: string;
  cidade?: string;
  uf?: string;
  observacao?: string;
  ativo?: number;
}

export const defaultValue: Readonly<IFranquia> = {};
