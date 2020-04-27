import { Moment } from 'moment';

export interface IPeticao {
  id?: number;
  data?: Moment;
  tipo?: any;
  processoId?: number;
}

export const defaultValue: Readonly<IPeticao> = {};
