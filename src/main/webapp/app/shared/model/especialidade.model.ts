import { IUnidadeEasy } from 'app/shared/model/unidade-easy.model';

export interface IEspecialidade {
  id?: string;
  icon?: string;
  especialidade?: string;
  descricao?: any;
  duracao?: number;
  importante?: string;
  ativo?: number;
  unidadeRazaoSocial?: string;
  unidade?: string | any;
}

export const defaultValue: Readonly<IEspecialidade> = {};
