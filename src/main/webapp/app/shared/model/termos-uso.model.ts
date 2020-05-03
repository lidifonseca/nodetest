import { Moment } from 'moment';

export interface ITermosUso {
  id?: string;
  termosUso?: string;
  tipo?: number;
  dataPost?: Moment;
}

export const defaultValue: Readonly<ITermosUso> = {};
