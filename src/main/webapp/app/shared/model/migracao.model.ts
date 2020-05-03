import { Moment } from 'moment';

export interface IMigracao {
  id?: string;
  idPad?: number;
  dataHoraMigracao?: Moment;
}

export const defaultValue: Readonly<IMigracao> = {};
