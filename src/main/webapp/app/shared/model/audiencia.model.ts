import { Moment } from 'moment';

export interface IAudiencia {
  id?: number;
  data?: Moment;
  audencia?: string;
  situacao?: string;
  quatidadePessoas?: number;
  processoId?: number;
}

export const defaultValue: Readonly<IAudiencia> = {};
