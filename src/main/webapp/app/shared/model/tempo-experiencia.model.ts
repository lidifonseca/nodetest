import { Moment } from 'moment';

export interface ITempoExperiencia {
  id?: string;
  tempoExperiencia?: string;
  dataPost?: Moment;
}

export const defaultValue: Readonly<ITempoExperiencia> = {};
