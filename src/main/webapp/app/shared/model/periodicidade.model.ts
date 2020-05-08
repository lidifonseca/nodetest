import { IPadItem } from 'app/shared/model/pad-item.model';

export interface IPeriodicidade {
  id?: string;
  periodicidade?: string;
  ativo?: number;
  padItems?: IPadItem[];
}

export const defaultValue: Readonly<IPeriodicidade> = {};
