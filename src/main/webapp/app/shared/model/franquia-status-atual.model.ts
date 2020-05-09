import { IFranquia } from 'app/shared/model/franquia.model';

export interface IFranquiaStatusAtual {
  id?: string;
  statusAtual?: number;
  obs?: string;
  ativo?: boolean;
  franquia?: string | any;
}

export const defaultValue: Readonly<IFranquiaStatusAtual> = {
  ativo: false
};
