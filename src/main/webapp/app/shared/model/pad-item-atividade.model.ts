import { Moment } from 'moment';

export interface IPadItemAtividade {
  id?: string;
  dataInicio?: Moment;
  dataFim?: Moment;
}

export const defaultValue: Readonly<IPadItemAtividade> = {};
