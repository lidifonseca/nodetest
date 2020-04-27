import { Moment } from 'moment';

export interface IApenso {
  id?: number;
  numero?: string;
  clase?: string;
  apensamento?: Moment;
  motivo?: string;
  processoId?: number;
}

export const defaultValue: Readonly<IApenso> = {};
