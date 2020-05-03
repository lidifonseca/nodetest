import { Moment } from 'moment';

export interface IPadItemHistDataIncComp {
  id?: string;
  idPadItem?: string;
  dataPadItemIncompleto?: Moment;
  dataPadItemCompleto?: Moment;
}

export const defaultValue: Readonly<IPadItemHistDataIncComp> = {};
