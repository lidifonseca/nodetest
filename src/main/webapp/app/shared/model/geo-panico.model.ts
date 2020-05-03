import { Moment } from 'moment';

export interface IGeoPanico {
  id?: string;
  idPanico?: number;
  idPaciente?: number;
  latitude?: string;
  longitude?: string;
  dataPost?: Moment;
}

export const defaultValue: Readonly<IGeoPanico> = {};
