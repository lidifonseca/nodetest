import { Moment } from 'moment';

export interface IResultados {
  id?: string;
  objetivo?: string;
  valor?: string;
  prazo?: string;
  complemento?: string;
  dataCadastro?: Moment;
  dataVencimentoPrazo?: Moment;
}

export const defaultValue: Readonly<IResultados> = {};
