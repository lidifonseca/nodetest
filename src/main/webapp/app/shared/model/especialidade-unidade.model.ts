import { IUnidadeEasy } from 'app/shared/model/unidade-easy.model';

export interface IEspecialidadeUnidade {
  id?: string;
  valorBaixaUrg?: number;
  valorAltaUrg?: number;
  valorPagar?: number;
  publicar?: number;
  comentarioPreco?: string;
  unidadeRazaoSocial?: string;
  unidade?: string | any;
}

export const defaultValue: Readonly<IEspecialidadeUnidade> = {};
