import { Moment } from 'moment';

export interface IControleDisparoAviso {
  id?: string;
  idAtendimento?: number;
  qtdDisparo?: number;
  avisopush?: number;
  dataPost?: Moment;
}

export const defaultValue: Readonly<IControleDisparoAviso> = {};
