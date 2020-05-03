import { IFranquiaAreaAtuacao } from 'app/shared/model/franquia-area-atuacao.model';
import { IFranquiaStatusAtual } from 'app/shared/model/franquia-status-atual.model';
import { IFranquiaUsuario } from 'app/shared/model/franquia-usuario.model';

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
  franquiaAreaAtuacaos?: IFranquiaAreaAtuacao[];
  franquiaStatusAtuals?: IFranquiaStatusAtual[];
  franquiaUsuarios?: IFranquiaUsuario[];
}

export const defaultValue: Readonly<IFranquia> = {};
