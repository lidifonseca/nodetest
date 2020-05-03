import { Moment } from 'moment';

export interface IProfissionalFranquia {
  id?: string;
  idProfissional?: string;
  idFranquia?: string;
  dataPost?: Moment;
}

export const defaultValue: Readonly<IProfissionalFranquia> = {};
