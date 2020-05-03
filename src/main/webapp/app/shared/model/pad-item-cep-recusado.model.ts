import { Moment } from 'moment';
import { IPadItem } from 'app/shared/model/pad-item.model';

export interface IPadItemCepRecusado {
  id?: string;
  cep?: string;
  dataPost?: Moment;
  idPadItem?: string | any;
}

export const defaultValue: Readonly<IPadItemCepRecusado> = {};
