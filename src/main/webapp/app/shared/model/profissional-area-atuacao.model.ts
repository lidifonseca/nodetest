import { Moment } from 'moment';

export interface IProfissionalAreaAtuacao {
  id?: string;
  idProfissional?: string;
  cepArea?: string;
  cepFim?: string;
  ativo?: number;
  dataPost?: Moment;
  cepIni?: string;
}

export const defaultValue: Readonly<IProfissionalAreaAtuacao> = {};
