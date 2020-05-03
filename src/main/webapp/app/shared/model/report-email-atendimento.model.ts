import { Moment } from 'moment';

export interface IReportEmailAtendimento {
  id?: string;
  idAtendimento?: number;
  tipoReport?: number;
  dataPost?: Moment;
}

export const defaultValue: Readonly<IReportEmailAtendimento> = {};
