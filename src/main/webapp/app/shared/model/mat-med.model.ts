import { Moment } from 'moment';

export interface IMatMed {
  id?: string;
  nome?: string;
  idTipoMatMed?: number;
  valor?: number;
  ativo?: number;
  dataPost?: Moment;
}

export const defaultValue: Readonly<IMatMed> = {};
