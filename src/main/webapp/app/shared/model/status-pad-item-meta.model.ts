import { Moment } from 'moment';

export interface IStatusPadItemMeta {
  id?: string;
  statusItemMeta?: string;
  styleLabel?: string;
  ordenacao?: number;
  ativo?: number;
  dataPost?: Moment;
}

export const defaultValue: Readonly<IStatusPadItemMeta> = {};
