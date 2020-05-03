import { Moment } from 'moment';

export interface IProfissionalCategoriaContrato {
  id?: string;
  idProfissional?: string;
  idCategoriaContrato?: number;
  aceito?: number;
  dataPost?: Moment;
}

export const defaultValue: Readonly<IProfissionalCategoriaContrato> = {};
