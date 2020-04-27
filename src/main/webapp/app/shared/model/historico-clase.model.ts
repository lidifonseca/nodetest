import { Moment } from 'moment';

export interface IHistoricoClase {
  id?: number;
  data?: Moment;
  tipo?: string;
  classe?: string;
  area?: string;
  motivo?: string;
  processoId?: number;
}

export const defaultValue: Readonly<IHistoricoClase> = {};
