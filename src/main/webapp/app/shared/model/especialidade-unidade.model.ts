import { Moment } from 'moment';
import { IUnidadeEasy } from 'app/shared/model/unidade-easy.model';
import { IEspecialidade } from 'app/shared/model/especialidade.model';

export interface IEspecialidadeUnidade {
  id?: string;
  valorBaixaUrg?: number;
  valorAltaUrg?: number;
  valorPagar?: number;
  publicar?: number;
  comentarioPreco?: string;
  dataPost?: Moment;
  idUnidade?: string | any;
  idEspecialidade?: string | any;
}

export const defaultValue: Readonly<IEspecialidadeUnidade> = {};
