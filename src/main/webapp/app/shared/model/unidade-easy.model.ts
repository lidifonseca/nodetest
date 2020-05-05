export interface IUnidadeEasy {
  id?: string;
  razaoSocial?: string;
  nomeFantasia?: string;
  cnpj?: string;
  ie?: string;
  telefone1?: string;
  telefone2?: string;
  endereco?: string;
  numero?: string;
  complemento?: string;
  bairro?: string;
  cidade?: string;
  uf?: string;
  cep?: string;
  regans?: string;
  regcnes?: string;
  tissresponsavel?: string;
  tissconselho?: string;
  tissinscricao?: string;
  tisscbo?: string;
  tisscoduf?: string;
  ativo?: number;
}

export const defaultValue: Readonly<IUnidadeEasy> = {};