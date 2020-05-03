import { Moment } from 'moment';

export interface ITipoMatMed {
  id?: string;
  tipo?: string;
  ativo?: number;
  dataPost?: Moment;
}

export const defaultValue: Readonly<ITipoMatMed> = {};
