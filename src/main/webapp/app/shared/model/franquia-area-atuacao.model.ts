import { IFranquia } from 'app/shared/model/franquia.model';

export interface IFranquiaAreaAtuacao {
  id?: string;
  cepIni?: string;
  cepFim?: string;
  ativo?: number;
  franquia?: string | any;
}

export const defaultValue: Readonly<IFranquiaAreaAtuacao> = {};
