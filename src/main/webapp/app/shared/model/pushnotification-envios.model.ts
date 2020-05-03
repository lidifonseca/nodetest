import { Moment } from 'moment';

export interface IPushnotificationEnvios {
  id?: string;
  referencia?: string;
  ultimoEnvio?: Moment;
}

export const defaultValue: Readonly<IPushnotificationEnvios> = {};
