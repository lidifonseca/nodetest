import { Moment } from 'moment';

export interface IIncidente {
  id?: number;
  recebedoEm?: Moment;
  clase?: string;
  processoId?: number;
}

export const defaultValue: Readonly<IIncidente> = {};
