import { IFranquia } from 'app/shared/model/franquia.model';

export interface IFranquiaAreaAtuacao {
  id?: string;
  cepIni?: string;
  cepFim?: string;
  ativo?: boolean;
  franquia?: string | any;
}

export const defaultValue: Readonly<IFranquiaAreaAtuacao> = {
  ativo: false
};
