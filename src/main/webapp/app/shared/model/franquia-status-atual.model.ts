import { Moment } from 'moment';
import { IFranquia } from 'app/shared/model/franquia.model';

export interface IFranquiaStatusAtual {
  id?: string;
  statusAtual?: number;
  obs?: string;
  ativo?: number;
  dataPost?: Moment;
  idFranquia?: string | any;
}

export const defaultValue: Readonly<IFranquiaStatusAtual> = {};
