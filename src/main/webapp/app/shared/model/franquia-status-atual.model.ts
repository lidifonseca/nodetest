import { IFranquia } from 'app/shared/model/franquia.model';

export interface IFranquiaStatusAtual {
  id?: string;
  statusAtual?: number;
  obs?: string;
  ativo?: number;
  idFranquia?: string | any;
}

export const defaultValue: Readonly<IFranquiaStatusAtual> = {};
