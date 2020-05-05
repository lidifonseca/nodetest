import { Moment } from 'moment';
import { IPadItem } from 'app/shared/model/pad-item.model';

export interface IPadItemResultado {
  id?: string;
  resultado?: any;
  dataFim?: Moment;
  resultadoAnalisado?: boolean;
  usuarioId?: number;
  idPadItem?: string | any;
}

export const defaultValue: Readonly<IPadItemResultado> = {
  resultadoAnalisado: false
};