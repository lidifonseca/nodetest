import { Moment } from 'moment';

export interface ITipoOperadora {
  id?: string;
  tipo?: string;
  ativo?: string;
  dataPost?: Moment;
}

export const defaultValue: Readonly<ITipoOperadora> = {};
