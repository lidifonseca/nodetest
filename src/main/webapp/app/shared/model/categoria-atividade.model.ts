import { IUnidadeEasy } from 'app/shared/model/unidade-easy.model';

export interface ICategoriaAtividade {
  id?: string;
  atividade?: string;
  unidadeRazaoSocial?: string;
  unidade?: string | any;
}

export const defaultValue: Readonly<ICategoriaAtividade> = {};
