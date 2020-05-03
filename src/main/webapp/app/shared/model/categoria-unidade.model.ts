import { Moment } from 'moment';
import { IUnidadeEasy } from 'app/shared/model/unidade-easy.model';
import { ICategoria } from 'app/shared/model/categoria.model';

export interface ICategoriaUnidade {
  id?: string;
  dataPost?: Moment;
  unidadeRazaoSocial?: string;
  unidade?: string | any;
  idCategoria?: string | any;
}

export const defaultValue: Readonly<ICategoriaUnidade> = {};
