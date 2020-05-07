import { Moment } from 'moment';

export interface IPadItemResultado {
  id?: string;
  resultado?: any;
  dataFim?: Moment;
  resultadoAnalisado?: boolean;
  usuarioId?: number;
}

export const defaultValue: Readonly<IPadItemResultado> = {
  resultadoAnalisado: false
};
