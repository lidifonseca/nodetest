import { ICategoriaUnidade } from 'app/shared/model/categoria-unidade.model';
import { IEspecialidadeUnidade } from 'app/shared/model/especialidade-unidade.model';
import { IPacientePedido } from 'app/shared/model/paciente-pedido.model';
import { IUnidadeEasyAreaAtuacao } from 'app/shared/model/unidade-easy-area-atuacao.model';

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
  categoriaUnidades?: ICategoriaUnidade[];
  especialidadeUnidades?: IEspecialidadeUnidade[];
  pacientePedidos?: IPacientePedido[];
  unidadeEasyAreaAtuacaos?: IUnidadeEasyAreaAtuacao[];
}

export const defaultValue: Readonly<IUnidadeEasy> = {};
