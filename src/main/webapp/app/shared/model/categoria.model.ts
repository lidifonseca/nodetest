import { IUnidadeEasy } from 'app/shared/model/unidade-easy.model';

export interface ICategoria {
  id?: string;
  categoria?: string;
  styleCategoria?: string;
  icon?: string;
  publicar?: number;
  ordem?: number;
  publicarSite?: number;
  unidades?: IUnidadeEasy[];
}

export const defaultValue: Readonly<ICategoria> = {};
