import { IPadItem } from 'app/shared/model/pad-item.model';

export interface IPadItemCepRecusado {
  id?: string;
  cep?: string;
  idPadItem?: string | any;
}

export const defaultValue: Readonly<IPadItemCepRecusado> = {};
